"use client";
import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from "react";
import type { Product } from "../data/products";

export type CartItem = Product & { quantity: number };

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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('megicloth_cart') : null;
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.every(item => 
          typeof item.id === 'string' && 
          typeof item.quantity === 'number' &&
          item.quantity > 0
        )) {
          setCart(parsed);
        }
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      // Clear corrupted cart data
      if (typeof window !== 'undefined') {
        localStorage.removeItem('megicloth_cart');
      }
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      try {
        localStorage.setItem('megicloth_cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cart, isInitialized]);

  // Memoized cart calculations
  const { subtotal, discount, shippingCost, total } = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + (item.salePrice ?? item.price) * item.quantity, 0);
    const discount = 0; // Placeholder for discount logic
    const shippingCost = subtotal > 5000 ? 0 : 200; // Example shipping logic
    const total = subtotal - discount + shippingCost;
    return { subtotal, discount, shippingCost, total };
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    if (product.stock === 0) {
      console.warn('Cannot add out-of-stock product to cart');
      return;
    }

    if (quantity <= 0) {
      console.warn('Quantity must be greater than 0');
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      
      if (existing) {
        // Check if adding more would exceed stock
        const newQuantity = existing.quantity + quantity;
        if (newQuantity > (product.stock ?? Infinity)) {
          console.warn('Cannot add more items than available stock');
          return prev;
        }
        
        return prev.map((item) =>
          item.id === product.id 
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        // Check if initial quantity exceeds stock
        if (quantity > (product.stock ?? Infinity)) {
          console.warn('Cannot add more items than available stock');
          return prev;
        }
        
        return [...prev, { ...product, quantity }];
      }
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          // Prevent exceeding stock
          const maxQty = item.stock ?? quantity;
          const newQuantity = Math.min(quantity, maxQty);
          
          if (newQuantity !== quantity) {
            console.warn('Quantity adjusted to available stock');
          }
          
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return subtotal;
  }, [subtotal]);

  const getCartCount = useCallback(() => {
    return cartCount;
  }, [cartCount]);

  const isInCart = useCallback((id: string) => {
    return cart.some(item => item.id === id);
  }, [cart]);

  const getCartItem = useCallback((id: string) => {
    return cart.find(item => item.id === id);
  }, [cart]);

  // Validate cart data integrity
  useEffect(() => {
    if (isInitialized) {
      const validCart = cart.filter(item => 
        item.id && 
        typeof item.quantity === 'number' && 
        item.quantity > 0 &&
        item.price > 0
      );
      
      if (validCart.length !== cart.length) {
        console.warn('Invalid cart items detected, cleaning up...');
        setCart(validCart);
      }
    }
  }, [cart, isInitialized]);

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
  }), [
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    isInCart,
    getCartItem,
  ]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

