"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";
import type { Product, User as AppUser, Address } from "@/app/types";
import type { User as SupabaseUser, AuthChangeEvent, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: AppUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<AppUser>) => Promise<{ success: boolean; error?: string; }>;
  addAddress: (address: Omit<Address, 'id'>) => Promise<{ success: boolean; error?: string; }>;
  removeAddress: (addressId: string) => Promise<{ success: boolean; error?: string; }>;
  updateAddress: (address: Address) => Promise<{ success: boolean; error?: string; }>;
  setDefaultAddress: (addressId: string) => Promise<{ success: boolean; error?: string; }>;
  addToWishlist: (product: Product) => Promise<{ success: boolean; error?: string; }>;
  removeFromWishlist: (productId: string) => Promise<{ success: boolean; error?: string; }>;
  changePassword: (password: string) => Promise<{ success: boolean; error?: string; }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  const fetchFullUserProfile = useCallback(async (supabaseUser: SupabaseUser): Promise<AppUser | null> => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*, addresses(*), wishlist(*)')
        .eq('id', supabaseUser.id)
        .single();

      if (profileError || !profileData) {
        console.error('Error fetching profile:', profileError?.message);
        return null;
      }

      let wishlistProducts: Product[] = [];
      if (profileData.wishlist && profileData.wishlist.length > 0) {
        const { data: products, error } = await supabase.from('products').select('*').in('id', profileData.wishlist.map((w: any) => w.product_id));
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
        isEmailVerified: supabaseUser.email_confirmed_at !== undefined,
        addresses: profileData.addresses || [],
        preferences: profileData.preferences,
        email: supabaseUser.email || '',
        role: profileData.role || 'user',
        wishlist: profileData.wishlist?.map((w: any) => w.product_id) || [],
        wishlistProducts: wishlistProducts,
      };

      return fullUser;
    } catch (error) {
      console.error('Error in fetchFullUserProfile:', error);
      return null;
    }
  }, [supabase]);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const fullUser = await fetchFullUserProfile(session.user);
        setUser(fullUser);
      } else {
        setUser(null);
      }
      setIsLoading(false); // This should be called regardless of session status
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event: AuthChangeEvent, session: Session | null) => {
      if (session?.user) {
        const fullUser = await fetchFullUserProfile(session.user);
        setUser(fullUser);
      } else {
        setUser(null);
      }
      // Refresh the router to ensure all components have the latest auth state
      router.refresh();
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [fetchFullUserProfile, supabase]);

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
    // Address updates should be handled by their own functions for clarity
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
    if (!user) return { success: false, error: 'Not authenticated' };
    const { data, error } = await supabase.from('addresses').insert([{ ...address, user_id: user.id }]).select().single();
    if (error) return { success: false, error: error.message };
    
    setUser((prevUser: AppUser | null) => prevUser ? { ...prevUser, addresses: [...(prevUser.addresses || []), data as Address] } : null);
    return { success: true };
  };

  const removeAddress = async (addressId: string) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    const { error } = await supabase.from('addresses').delete().eq('id', addressId);
    if (error) return { success: false, error: error.message };

    setUser((prevUser: AppUser | null) => prevUser ? { ...prevUser, addresses: (prevUser.addresses || []).filter((a: Address) => a.id !== addressId) } : null);
    return { success: true };
  };

  const updateAddress = async (address: Address) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    const { error } = await supabase.from('addresses').update(address).eq('id', address.id);
    if (error) return { success: false, error: error.message };

    setUser((prevUser: AppUser | null) => {
      if (!prevUser) return null;
      const updatedAddresses = (prevUser.addresses || []).map((a: Address) => a.id === address.id ? address : a);
      return { ...prevUser, addresses: updatedAddresses };
    });
    return { success: true };
  };

  const setDefaultAddress = async (addressId: string) => {
    if (!user) return { success: false, error: 'Not authenticated' };

    const currentDefault = user.addresses?.find(a => a.isDefault);
    if (currentDefault && currentDefault.id !== addressId) {
      const { error: unsetError } = await supabase.from('addresses').update({ isDefault: false }).eq('id', currentDefault.id);
      if (unsetError) return { success: false, error: `Failed to unset current default: ${unsetError.message}` };
    }

    const { error: setError } = await supabase.from('addresses').update({ isDefault: true }).eq('id', addressId);
    if (setError) return { success: false, error: `Failed to set new default: ${setError.message}` };

    setUser((prevUser: AppUser | null) => {
        if (!prevUser) return null;
        const updatedAddresses = (prevUser.addresses || []).map((a: Address) => ({
            ...a,
            isDefault: a.id === addressId,
        }));
        return { ...prevUser, addresses: updatedAddresses };
    });

    return { success: true };
  };

  const addToWishlist = async (product: Product) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    if (user.wishlist?.includes(product.id)) return { success: true }; // Already in wishlist

    const { error } = await supabase.from('wishlist').insert([{ user_id: user.id, product_id: product.id }]);
    if (error) return { success: false, error: error.message };

    setUser((prev: AppUser | null) => prev ? { 
        ...prev, 
        wishlist: [...(prev.wishlist || []), product.id],
        wishlistProducts: [...(prev.wishlistProducts || []), product]
    } : null);
    return { success: true };
  };

  const removeFromWishlist = async (productId: string) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    const { error } = await supabase.from('wishlist').delete().match({ user_id: user.id, product_id: productId });
    if (error) return { success: false, error: error.message };

    setUser((prev: AppUser | null) => prev ? { 
        ...prev, 
        wishlist: (prev.wishlist || []).filter((id: string) => id !== productId),
        wishlistProducts: (prev.wishlistProducts || []).filter((p: Product) => p.id !== productId)
    } : null);
    return { success: true };
  };

  const changePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user && !isLoading,
    logout,
    updateProfile,
    addAddress,
    removeAddress,
    updateAddress,
    setDefaultAddress,
    addToWishlist,
    removeFromWishlist,
    changePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}