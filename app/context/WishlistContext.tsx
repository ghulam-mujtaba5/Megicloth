"use client";
import { createContext, useContext, ReactNode, useCallback, useMemo, useState, useEffect } from "react";
import type { Product } from "../types";
import { useAuth } from "./AuthContext";
import toast from 'react-hot-toast';
import {
  getWishlist as getWishlistServer,
  addToWishlist as addToWishlistServer,
  removeFromWishlist as removeFromWishlistServer,
  clearWishlist as clearWishlistServer,
} from "@/app/lib/actions/wishlist";

export type WishlistItem = Product;

interface WishlistContextType {
  wishlist: WishlistItem[];
  loading: boolean;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  getWishlistCount: () => number;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load wishlist on mount or auth change
  useEffect(() => {
    const loadWishlist = async () => {
      setLoading(true);
      if (isAuthenticated) {
        // Merge guest wishlist into server on login
        const guestWishlistRaw = localStorage.getItem('megicloth_wishlist');
        if (guestWishlistRaw) {
          try {
            const guestWishlist: WishlistItem[] = JSON.parse(guestWishlistRaw);
            for (const item of guestWishlist) {
              await addToWishlistServer(item.id);
            }
            localStorage.removeItem('megicloth_wishlist');
          } catch (e) { localStorage.removeItem('megicloth_wishlist'); }
        }
        // Fetch from server
        const serverWishlist = await getWishlistServer();
        setWishlist(Array.isArray(serverWishlist[0]) ? serverWishlist[0] : serverWishlist);
      } else {
        // Guest: load from localStorage
        try {
          const stored = localStorage.getItem('megicloth_wishlist');
          setWishlist(stored ? JSON.parse(stored) : []);
        } catch {
          setWishlist([]);
        }
      }
      setLoading(false);
    };
    loadWishlist();
  }, [isAuthenticated]);

  // Persist guest wishlist to localStorage
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('megicloth_wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, isAuthenticated]);

  // Add to wishlist
  const addToWishlist = useCallback(async (product: Product) => {
    if (isAuthenticated) {
      setLoading(true);
      await addToWishlistServer(product.id);
      const updated = await getWishlistServer();
      setWishlist(Array.isArray(updated[0]) ? updated[0] : updated);
      setLoading(false);
      toast.success('Added to wishlist!');
    } else {
      setWishlist(prev => prev.some(p => p.id === product.id) ? prev : [...prev, product]);
      toast.success('Added to wishlist!');
    }
  }, [isAuthenticated]);

  // Remove from wishlist
  const removeFromWishlist = useCallback(async (id: string) => {
    if (isAuthenticated) {
      setLoading(true);
      await removeFromWishlistServer(id);
      const updated = await getWishlistServer();
      setWishlist(Array.isArray(updated[0]) ? updated[0] : updated);
      setLoading(false);
      toast.success('Removed from wishlist.');
    } else {
      setWishlist(prev => prev.filter(p => p.id !== id));
      toast.success('Removed from wishlist.');
    }
  }, [isAuthenticated]);

  // Clear wishlist
  const clearWishlist = useCallback(async () => {
    if (isAuthenticated) {
      setLoading(true);
      await clearWishlistServer();
      setWishlist([]);
      setLoading(false);
      toast.success('Wishlist cleared.');
    } else {
      setWishlist([]);
      toast.success('Wishlist cleared.');
    }
  }, [isAuthenticated]);

  const isInWishlist = useCallback((id: string) => wishlist.some(p => p.id === id), [wishlist]);
  const getWishlistCount = useCallback(() => wishlist.length, [wishlist]);

  const contextValue = useMemo(() => ({
    wishlist,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getWishlistCount,
    clearWishlist,
  }), [wishlist, loading, addToWishlist, removeFromWishlist, isInWishlist, getWishlistCount, clearWishlist]);

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
}