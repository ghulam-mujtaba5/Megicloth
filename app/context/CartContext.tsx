"use client";
import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from "react";
import type { Product, CartItem } from "../types";
import { useAuth } from './AuthContext';
import { createClient } from "@/app/lib/supabase/client";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  getCartTotal: () => number;
  getCartCount: () => number;
  isInCart: (id: string) => boolean;
  getCartItem: (id: string) => CartItem | undefined;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const supabase = createClient();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load cart from localStorage for guest users
  useEffect(() => {
    if (!user) {
      try {
        const stored = localStorage.getItem('megicloth_cart');
        if (stored) {
          setCart(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem('megicloth_cart');
      }
      setLoading(false);
    }
  }, [user]);

  // Save cart to localStorage for guest users
  useEffect(() => {
    if (!user) {
      localStorage.setItem('megicloth_cart', JSON.stringify(cart));
    }
  }, [cart, user]);

  // Fetch, merge, and manage cart for logged-in users
  useEffect(() => {
    if (user) {
      const syncCart = async () => {
        setLoading(true);

        // 1. Fetch DB cart
        const { data: dbCartItems, error: dbError } = await supabase
          .from('cart_items')
          .select('quantity, products(*)')
          .eq('user_id', user.id);

        if (dbError) {
          console.error('Error fetching cart from DB:', dbError);
          setLoading(false);
          return;
        }

        const dbCart = dbCartItems
          .map(item => {
            // Supabase returns the related product in an array, so we take the first element.
            const product = Array.isArray(item.products) ? item.products[0] : item.products;
            if (!product) return null;
            return { ...(product as Product), quantity: item.quantity };
          })
          .filter((item): item is CartItem => item !== null);

        // 2. Get local cart
        const localCart: CartItem[] = JSON.parse(localStorage.getItem('megicloth_cart') || '[]');

        // 3. Merge carts
        const mergedCart = [...dbCart];
        for (const localItem of localCart) {
          const dbItem = mergedCart.find(item => item.id === localItem.id);
          if (dbItem) {
            dbItem.quantity += localItem.quantity; // Combine quantities
          } else {
            mergedCart.push(localItem);
          }
        }

        // 4. Sync merged cart back to DB
        const upsertData = mergedCart.map(item => ({
          user_id: user.id,
          product_id: item.id,
          quantity: item.quantity,
        }));

        const { error: upsertError } = await supabase.from('cart_items').upsert(upsertData, { onConflict: 'user_id, product_id' });

        if (upsertError) {
          console.error('Error syncing merged cart to DB:', upsertError);
        } else {
          // 5. Clear local storage and update state
          localStorage.removeItem('megicloth_cart');
          setCart(mergedCart);
        }

        setLoading(false);
      };

      syncCart();
    }
  }, [user]);

  const addToCart = useCallback(async (product: Product, quantity: number = 1) => {
    if (user) {
      const { data, error } = await supabase
        .from('cart_items')
        .select('quantity')
        .eq('user_id', user.id)
        .eq('product_id', product.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116: row not found, which is fine
        console.error('Error fetching cart item:', error);
      }

      const newQuantity = (data?.quantity || 0) + quantity;

      const { error: upsertError } = await supabase
        .from('cart_items')
        .upsert({ user_id: user.id, product_id: product.id, quantity: newQuantity }, { onConflict: 'user_id, product_id' });

      if (upsertError) {
        console.error('Error adding to cart:', upsertError);
      } else {
        setCart(prev => {
          const existing = prev.find(item => item.id === product.id);
          if (existing) {
            return prev.map(item => item.id === product.id ? { ...item, quantity: newQuantity } : item);
          } else {
            return [...prev, { ...product, quantity: newQuantity }];
          }
        });
      }
    } else {
      // Guest user logic
      setCart(prev => {
        const existing = prev.find(item => item.id === product.id);
        if (existing) {
          return prev.map(item => item.id === product.id ? { ...item, quantity: existing.quantity + quantity } : item);
        } else {
          return [...prev, { ...product, quantity }];
        }
      });
    }
  }, [user]);

  const removeFromCart = useCallback(async (id: string) => {
    if (user) {
      const { error } = await supabase.from('cart_items').delete().match({ user_id: user.id, product_id: id });
      if (error) {
        console.error('Error removing from cart:', error);
      } else {
        setCart(prev => prev.filter(item => item.id !== id));
      }
    } else {
      setCart(prev => prev.filter(item => item.id !== id));
    }
  }, [user]);

  const updateQuantity = useCallback(async (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    if (user) {
      const { error } = await supabase.from('cart_items').update({ quantity }).match({ user_id: user.id, product_id: id });
      if (error) {
        console.error('Error updating quantity:', error);
      } else {
        setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
      }
    } else {
      setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
    }
  }, [user, removeFromCart]);

  const clearCart = useCallback(async () => {
    if (user) {
      const { error } = await supabase.from('cart_items').delete().match({ user_id: user.id });
      if (error) {
        console.error('Error clearing cart:', error);
      } else {
        setCart([]);
      }
    } else {
      setCart([]);
    }
  }, [user]);

  // Memoized cart calculations
  const { subtotal, discount, shippingCost, total } = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + (item.salePrice ?? item.price) * item.quantity, 0);
    const discount = 0; // Placeholder for discount logic
    const shippingCost = subtotal > 50 ? 0 : 5; // Example shipping logic
    const total = subtotal - discount + shippingCost;
    return { subtotal, discount, shippingCost, total };
  }, [cart]);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const getCartTotal = useCallback(() => subtotal, [subtotal]);
  const getCartCount = useCallback(() => cartCount, [cartCount]);
  const isInCart = useCallback((id: string) => cart.some(item => item.id === id), [cart]);
  const getCartItem = useCallback((id: string) => cart.find(item => item.id === id), [cart]);

  const contextValue = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discount,
    shippingCost,
    total,
    getCartTotal,
    getCartCount,
    isInCart,
    getCartItem,
    loading,
  }), [cart, addToCart, removeFromCart, updateQuantity, clearCart, subtotal, discount, shippingCost, total, getCartTotal, getCartCount, isInCart, getCartItem, loading]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

