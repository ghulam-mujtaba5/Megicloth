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
  revalidateUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  console.log("\n--- [AuthProvider] Mounting ---");

  const fetchFullUserProfile = useCallback(async (supabaseUser: SupabaseUser): Promise<AppUser | null> => {
    try {
      let { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (profileError) {
        console.error('[AuthProvider] Error fetching profile:', profileError.message);
      }

      // If no profile row exists, create one and refetch
      if (!profileData) {
        console.warn('[AuthProvider] No profile found for user. Attempting to create profile row...');
        const { error: insertError } = await supabase.from('profiles').insert([
          { id: supabaseUser.id, email: supabaseUser.email }
        ]);
        if (insertError) {
          console.error('[AuthProvider] Error creating profile row:', insertError.message);
          return null;
        }
        // Refetch after insert
        const { data: newProfile, error: newProfileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', supabaseUser.id)
          .single();
        if (newProfileError || !newProfile) {
          console.error('[AuthProvider] Failed to fetch profile after insert:', newProfileError?.message);
          return null;
        }
        profileData = newProfile;
      }

      // Fetch wishlist products if needed (optional, based on your schema)
      // let wishlistProducts: Product[] = [];
      // if (profileData.wishlist && profileData.wishlist.length > 0) {
      //   const { data: products, error } = await supabase.from('products').select('*').in('id', profileData.wishlist.map((w: any) => w.product_id));
      //   if (error) {
      //     console.error('Error fetching wishlist products:', error.message);
      //   } else {
      //     wishlistProducts = products || [];
      //   }
      //   profileData.wishlistProducts = wishlistProducts;
      // }

      const fullUser: AppUser = {
        id: profileData.id,
        firstName: profileData.first_name,
        lastName: profileData.last_name,
        phone: profileData.phone,
        avatarUrl: profileData.avatar_url,
        createdAt: profileData.created_at,
        lastLogin: profileData.last_login,
        isEmailVerified: !!supabaseUser.email_confirmed_at,
        addresses: profileData.addresses || [],
        preferences: profileData.preferences,
        email: supabaseUser.email || '',
        role: profileData.role || 'user',
        wishlist: profileData.wishlist?.map((w: any) => w.product_id) || [],
        // wishlistProducts: wishlistProducts, // Temporarily disabled to fix build error
      };

      return fullUser;
    } catch (error) {
      console.error('Error in fetchFullUserProfile:', error);
      return null;
    }
  }, [supabase]);

  useEffect(() => {
    console.log("[AuthProvider] useEffect running to get session and set up listener.");

    const getSession = async () => {
      console.log("[AuthProvider] getSession: Fetching initial session...");
      const { data: { session } } = await supabase.auth.getSession();
      console.log("[AuthProvider] getSession: Initial session object:", session);

      if (session?.user) {
        console.log("[AuthProvider] getSession: User found in session. Fetching full profile.");
        const fullUser = await fetchFullUserProfile(session.user);
        console.log("[AuthProvider] getSession: Setting user:", fullUser);
        setUser(fullUser);
      } else {
        console.log("[AuthProvider] getSession: No user in session. Setting user to null.");
        setUser(null);
      }
      setIsLoading(false);
      console.log("[AuthProvider] getSession: Finished. isLoading set to false.");
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event: AuthChangeEvent, session: Session | null) => {
      console.log(`%c[AuthContext] Event: ${_event}`, 'color: #2563eb; font-weight: bold;', { session });
      
      if (_event === 'INITIAL_SESSION' || _event === 'SIGNED_IN') {
        if (session?.user) {
          console.log('[AuthContext] User session detected. Fetching full profile...');
          const fullUser = await fetchFullUserProfile(session.user);
          setUser(fullUser);
          setIsAuthenticated(!!fullUser);
          console.log('[AuthContext] User profile loaded and set.', { user: fullUser, isAuthenticated: !!fullUser });
        } else {
          // This can happen on initial load with no session
          setUser(null);
          setIsAuthenticated(false);
        }
      } else if (_event === 'SIGNED_OUT') {
        console.log('[AuthContext] User signed out. Clearing user state.');
        setUser(null);
        setIsAuthenticated(false);
      } else if (_event === 'USER_UPDATED') {
        if (session?.user) {
            console.log('[AuthContext] User updated. Re-fetching profile.');
            const fullUser = await fetchFullUserProfile(session.user);
            setUser(fullUser);
            setIsAuthenticated(!!fullUser);
        }
      }
      
      console.log('%c[AuthContext] State update finished. isLoading: false', 'color: #16a34a; font-weight: bold;');
      setIsLoading(false);
    });

    return () => {
      console.log("[AuthProvider] Unsubscribing from onAuthStateChange.");
      subscription.unsubscribe();
    };
  }, [fetchFullUserProfile, supabase.auth]);

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
    if (user.wishlist?.includes(product.id)) return { success: true };

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

  const revalidateUser = async () => {
    console.log("[AuthProvider] revalidateUser: Forcing session refresh.");
    await supabase.auth.getSession();
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
    revalidateUser,
  };

  console.log("[AuthProvider] Providing value:", { user: value.user, isLoading: value.isLoading, isAuthenticated: value.isAuthenticated });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}