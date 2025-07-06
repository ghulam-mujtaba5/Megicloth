"use client";
import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from "react";
import type { Product } from "../data/products";

export type WishlistItem = Product & {
  addedAt: string;
};

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
  getWishlistCount: () => number;
  moveToCart: (id: string) => void;
  moveAllToCart: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('megicloth_wishlist') : null;
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.every(item => 
          typeof item.id === 'string' && 
          typeof item.addedAt === 'string'
        )) {
          setWishlist(parsed);
        }
      }
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('megicloth_wishlist');
      }
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      try {
        localStorage.setItem('megicloth_wishlist', JSON.stringify(wishlist));
      } catch (error) {
        console.error('Error saving wishlist to localStorage:', error);
      }
    }
  }, [wishlist, isInitialized]);

  const addToWishlist = useCallback((product: Product) => {
    setWishlist((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev; // Already in wishlist
      }
      return [...prev, { ...product, addedAt: new Date().toISOString() }];
    });
  }, []);

  const removeFromWishlist = useCallback((id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearWishlist = useCallback(() => {
    setWishlist([]);
  }, []);

  const isInWishlist = useCallback((id: string) => {
    return wishlist.some(item => item.id === id);
  }, [wishlist]);

  const getWishlistCount = useCallback(() => {
    return wishlist.length;
  }, [wishlist]);

  const moveToCart = useCallback((id: string) => {
    // This would integrate with CartContext
    // For now, just remove from wishlist
    removeFromWishlist(id);
  }, [removeFromWishlist]);

  const moveAllToCart = useCallback(() => {
    // This would integrate with CartContext
    // For now, just clear wishlist
    clearWishlist();
  }, [clearWishlist]);

  // Validate wishlist data integrity
  useEffect(() => {
    if (isInitialized) {
      const validWishlist = wishlist.filter(item => 
        item.id && 
        item.name &&
        item.price > 0 &&
        item.addedAt
      );
      
      if (validWishlist.length !== wishlist.length) {
        console.warn('Invalid wishlist items detected, cleaning up...');
        setWishlist(validWishlist);
      }
    }
  }, [wishlist, isInitialized]);

  const contextValue = useMemo(() => ({
    wishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    getWishlistCount,
    moveToCart,
    moveAllToCart,
  }), [
    wishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    getWishlistCount,
    moveToCart,
    moveAllToCart,
  ]);

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
} 