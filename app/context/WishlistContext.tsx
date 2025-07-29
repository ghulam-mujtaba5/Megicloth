"use client";
import { createContext, useContext, ReactNode, useCallback, useMemo, useState, useEffect } from "react";
import type { Product } from "../types";
import { useAuth } from "./AuthContext";
import toast from 'react-hot-toast';
import { supabase } from "../lib/supabaseClient";

export type WishlistItem = Product;

interface WishlistContextType {
  wishlist: WishlistItem[];
  loading: boolean;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  getWishlistCount: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user, addToWishlist: authAddToWishlist, removeFromWishlist: authRemoveFromWishlist, isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const wishlistIds = useMemo(() => user?.wishlist || [], [user?.wishlist]);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (wishlistIds.length === 0) {
        setWishlist([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .in('id', wishlistIds);

      if (error) {
        console.error("Error fetching wishlist products:", error);
        toast.error("Could not fetch your wishlist.");
        setWishlist([]);
      } else {
        setWishlist(data as WishlistItem[]);
      }
      setLoading(false);
    };

    if (isAuthenticated) {
      fetchWishlistProducts();
    }
     else {
      setWishlist([]);
      setLoading(false);
    }
  }, [wishlistIds, isAuthenticated]);

  const addToWishlist = useCallback(async (product: Product) => {
    if (!isAuthenticated) {
      toast.error("Please log in to add items to your wishlist.");
      return;
    }
    const toastId = toast.loading('Adding to wishlist...');
    const { success, error } = await authAddToWishlist(product);
    if (success) {
      toast.success('Added to wishlist!', { id: toastId });
    } else {
      toast.error(error || 'Failed to add to wishlist.', { id: toastId });
    }
  }, [isAuthenticated, authAddToWishlist]);

  const removeFromWishlist = useCallback(async (id: string) => {
    if (!isAuthenticated) return;
    const toastId = toast.loading('Removing from wishlist...');
    const { success, error } = await authRemoveFromWishlist(id);
    if (success) {
      toast.success('Removed from wishlist.', { id: toastId });
    } else {
      toast.error(error || 'Failed to remove from wishlist.', { id: toastId });
    }
  }, [isAuthenticated, authRemoveFromWishlist]);

  const isInWishlist = useCallback((id: string) => {
    return wishlistIds.includes(id);
  }, [wishlistIds]);

  const getWishlistCount = useCallback(() => {
    return wishlistIds.length;
  }, [wishlistIds]);

  const contextValue = useMemo(() => ({
    wishlist,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getWishlistCount,
  }), [
    wishlist,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getWishlistCount,
  ]);

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
}