"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";
import type { Product, User as AppUser, Address } from "@/app/types";
import { AuthChangeEvent } from "@supabase/supabase-js";

interface AuthContextType {
  user: AppUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  revalidateUser: () => Promise<void>;
  updateProfile: (data: Partial<AppUser>) => Promise<{ success: boolean; error?: string; }>;
  addAddress: (address: Omit<Address, 'id' | 'user_id'>) => Promise<{ success: boolean; error?: string; data?: Address }>;
  removeAddress: (addressId: string) => Promise<{ success: boolean; error?: string; }>;
  updateAddress: (address: Address) => Promise<{ success: boolean; error?: string; }>;
  setDefaultAddress: (addressId: string) => Promise<{ success: boolean; error?: string; }>;
  changePassword: (password: string) => Promise<{ success: boolean; error?: string; }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  const fetchFullUserProfile = useCallback(async (userId: string): Promise<AppUser | null> => {
    console.log('[AuthContext] Fetching full user profile for:', userId);
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        if (profileError.code === 'PGRST116') {
          console.log('[AuthContext] No profile found for user, creating one...');
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({ id: userId, role: 'user' })
            .select()
            .single();
          if (createError) {
            console.error('[AuthContext] Error creating profile:', createError);
            return null;
          }
          console.log('[AuthContext] Profile created successfully.');
          // Casting here to include the methods that are not in the DB table
          const userProfile = newProfile as AppUser;
          userProfile.addresses = [];
          userProfile.wishlistProducts = [];
          return userProfile;
        }
        console.error('[AuthContext] Error fetching profile:', profileError);
        return null;
      }

      const { data: wishlistItems, error: wishlistError } = await supabase
        .from('wishlists')
        .select('product_id')
        .eq('user_id', userId);

      if (wishlistError) {
        console.error('[AuthContext] Error fetching wishlist:', wishlistError);
      }

      const productIds = wishlistItems?.map((item: { product_id: string }) => item.product_id) || [];
      let products: Product[] = [];

      if (productIds.length > 0) {
        const { data: productData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .in('id', productIds);
        if (productsError) {
          console.error('[AuthContext] Error fetching wishlist products:', productsError);
        } else {
          products = productData || [];
        }
      }

      const { data: addresses, error: addressesError } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', userId);

      if (addressesError) {
        console.error('[AuthContext] Error fetching addresses:', addressesError);
      }

      console.log(`[AuthContext] Profile fetched. Wishlist: ${products.length}, Addresses: ${addresses?.length || 0}`);
      const finalProfile = profile as AppUser;
      finalProfile.addresses = addresses || [];
      finalProfile.wishlistProducts = products;
      return finalProfile;

    } catch (error) {
      console.error('[AuthContext] Unexpected error in fetchFullUserProfile:', error);
      return null;
    }
  }, [supabase]);

  const revalidateUser = useCallback(async () => {
    setIsLoading(true);
    console.log('[AuthContext] Revalidating user session...');
    const { data: { user: sessionUser }, error } = await supabase.auth.getUser();

    if (error) {
      console.error('[AuthContext] Error revalidating user:', error.message);
      setUser(null);
      setIsAuthenticated(false);
    } else if (sessionUser) {
      const fullProfile = await fetchFullUserProfile(sessionUser.id);
      if (fullProfile) {
        setUser(fullProfile);
        setIsAuthenticated(true);
      } else {
        await supabase.auth.signOut();
        setUser(null);
        setIsAuthenticated(false);
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, [supabase, fetchFullUserProfile]);

  useEffect(() => {
    revalidateUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: AuthChangeEvent) => {
      console.log(`[AuthContext] Auth state changed. Event: ${event}`);
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        revalidateUser();
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsAuthenticated(false);
        router.push('/auth/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [revalidateUser, supabase.auth, router]);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const updateProfile = async (data: Partial<AppUser>) => {
    if (!user) return { success: false, error: 'Not authenticated' };

    const { error } = await supabase.from('profiles').update(data).eq('id', user.id);
    if (error) return { success: false, error: error.message };

    await revalidateUser();
    return { success: true };
  };

  const addAddress = async (address: Omit<Address, 'id' | 'user_id'>) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    const { data, error } = await supabase.from('addresses').insert([{ ...address, user_id: user.id }]).select().single();
    if (error) return { success: false, error: error.message };

    setUser(prev => prev ? { ...prev, addresses: [...(prev.addresses || []), data as Address] } : null);
    return { success: true, data: data as Address };
  };

  const removeAddress = async (addressId: string) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    const { error } = await supabase.from('addresses').delete().eq('id', addressId);
    if (error) return { success: false, error: error.message };

    setUser(prev => prev ? { ...prev, addresses: (prev.addresses || []).filter(a => a.id !== addressId) } : null);
    return { success: true };
  };

  const updateAddress = async (address: Address) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    const { error } = await supabase.from('addresses').update(address).eq('id', address.id);
    if (error) return { success: false, error: error.message };

    setUser(prev => {
      if (!prev) return null;
      const updatedAddresses = (prev.addresses || []).map(a => a.id === address.id ? address : a);
      return { ...prev, addresses: updatedAddresses };
    });
    return { success: true };
  };

  const setDefaultAddress = async (addressId: string) => {
    if (!user) return { success: false, error: 'Not authenticated' };

    // This should ideally be a transaction or a DB function for atomicity
    const currentDefault = user.addresses?.find(a => a.isDefault);
    if (currentDefault && currentDefault.id !== addressId) {
      const { error: unsetError } = await supabase.from('addresses').update({ is_default: false }).eq('id', currentDefault.id);
      if (unsetError) return { success: false, error: `Failed to unset current default: ${unsetError.message}` };
    }

    const { error: setError } = await supabase.from('addresses').update({ is_default: true }).eq('id', addressId);
    if (setError) return { success: false, error: `Failed to set new default: ${setError.message}` };

    await revalidateUser();
    return { success: true };
  };

  const changePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return { success: false, error: error.message };
    return { success: true };
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    logout,
    revalidateUser,
    updateProfile,
    addAddress,
    removeAddress,
    updateAddress,
    setDefaultAddress,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}