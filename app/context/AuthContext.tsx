"use client";
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import type { Product, User as AppUser, Address } from "../types";
import type { User as SupabaseUser } from "@supabase/supabase-js";



interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

// Context type definition
interface AuthContextType {
  user: AppUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string; }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<AppUser>) => Promise<{ success: boolean; error?: string; }>;
  addAddress: (address: Omit<Address, 'id'>) => Promise<{ success: boolean; error?: string; }>;
  removeAddress: (addressId: string) => Promise<{ success: boolean; error?: string; }>;
  addToWishlist: (product: Product) => Promise<{ success: boolean; error?: string; }>;
  removeFromWishlist: (productId: string) => Promise<{ success: boolean; error?: string; }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

// The Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchFullUserProfile = useCallback(async (supabaseUser: SupabaseUser): Promise<AppUser | null> => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (profileError || !profileData) {
        console.error('Error fetching profile:', profileError?.message);
        return null;
      }



      let wishlistProducts: Product[] = [];
      if (profileData.wishlist && profileData.wishlist.length > 0) {
        const { data: products, error } = await supabase.from('products').select('*').in('id', profileData.wishlist);
        if (error) {
          console.error('Error fetching wishlist products:', error.message);
        } else {
          wishlistProducts = products as Product[];
        }
      }

      const fullUser: AppUser = {
        id: profileData.id,
        firstName: profileData.first_name,
        lastName: profileData.last_name,
        phone: profileData.phone,
        avatarUrl: profileData.avatar_url,
        createdAt: profileData.created_at,
        lastLogin: profileData.last_login,
        isEmailVerified: profileData.isEmailVerified,
        addresses: profileData.addresses?.map((addr: any): Address => ({ id: addr.id, type: addr.type, firstName: addr.first_name, lastName: addr.last_name, address: addr.address, city: addr.city, state: addr.state, postalCode: addr.postal_code, country: addr.country, phone: addr.phone, isDefault: addr.is_default })) || [],
        preferences: profileData.preferences,
        email: supabaseUser.email || '',
        role: supabaseUser.role || 'user',
        wishlist: profileData.wishlist || [],
        wishlistProducts: wishlistProducts,
      };

      return fullUser;
    } catch (error) {
      console.error('Error in fetchFullUserProfile:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const fullUser = await fetchFullUserProfile(session.user);
        setUser(fullUser);
      }
      setIsLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const fullUser = await fetchFullUserProfile(session.user);
        setUser(fullUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchFullUserProfile]);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { success: !error, error: error?.message };
  };

  const register = async (userData: RegisterData) => {
    const { error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName,
          phone: userData.phone,
        },
      },
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  const updateProfile = async (data: Partial<AppUser>) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    
    const updateData: { [key: string]: any } = {};
    if (data.firstName !== undefined) updateData.first_name = data.firstName;
    if (data.lastName !== undefined) updateData.last_name = data.lastName;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.avatarUrl !== undefined) updateData.avatar_url = data.avatarUrl;
    if (data.addresses !== undefined) updateData.addresses = data.addresses.map((addr: Address) => ({ id: addr.id, type: addr.type, first_name: addr.firstName, last_name: addr.lastName, address: addr.address, city: addr.city, state: addr.state, postal_code: addr.postalCode, country: addr.country, phone: addr.phone, is_default: addr.isDefault }));
    if (data.preferences !== undefined) updateData.preferences = data.preferences;

    const { error } = await supabase.from('profiles').update(updateData).eq('id', user.id);
    if (error) return { success: false, error: error.message };

    const { data: { session } } = await supabase.auth.getSession();
    if(session?.user) {
        const fullUser = await fetchFullUserProfile(session.user);
        setUser(fullUser);
    }
    return { success: true };
  };

  const addAddress = async (address: Omit<Address, 'id'>) => {
    if (!user || !user.addresses) return { success: false, error: 'User or addresses not loaded' };
    const newAddress = { ...address, id: `addr_${Date.now()}` };
    const updatedAddresses = [...user.addresses, newAddress];
    return await updateProfile({ addresses: updatedAddresses });
  };

  const removeAddress = async (addressId: string) => {
    if (!user || !user.addresses) return { success: false, error: 'User or addresses not loaded' };
    const updatedAddresses = user.addresses.filter(addr => addr.id !== addressId);
    return await updateProfile({ addresses: updatedAddresses });
  };

  const addToWishlist = async (product: Product) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    const currentWishlist = user.wishlist || [];
    if (currentWishlist.includes(product.id)) return { success: true };
    const newWishlist = [...currentWishlist, product.id];
    const { error } = await supabase.from('profiles').update({ wishlist: newWishlist }).eq('id', user.id);
    if (error) return { success: false, error: error.message };
    setUser(prev => prev ? { 
        ...prev, 
        wishlist: newWishlist,
        wishlistProducts: [...(prev.wishlistProducts || []), product]
    } : null);
    return { success: true };
  };

  const removeFromWishlist = async (productId: string) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    const newWishlist = (user.wishlist || []).filter(id => id !== productId);
    const { error } = await supabase.from('profiles').update({ wishlist: newWishlist }).eq('id', user.id);
    if (error) return { success: false, error: error.message };
    setUser(prev => prev ? { 
        ...prev, 
        wishlist: newWishlist,
        wishlistProducts: (prev.wishlistProducts || []).filter((p: Product) => p.id !== productId)
    } : null);
    return { success: true };
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user && !isLoading,
    loading: isLoading,
    login,
    register,
    logout,
    updateProfile,
    addAddress,
    removeAddress,
    addToWishlist,
    removeFromWishlist,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}