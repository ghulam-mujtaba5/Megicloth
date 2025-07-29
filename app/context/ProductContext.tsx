"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { products as initialProducts } from '../data/products';
import type { Product } from '@/app/types';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviews'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateProductStock: (productId: string, newStock: number) => void;
  decreaseStock: (productId: string, quantity: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = useCallback((productData: Omit<Product, 'id' | 'rating' | 'reviews'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      rating: 0,
    };
    setProducts(prevProducts => [...prevProducts, newProduct]);
  }, []);

  const updateProduct = useCallback((updatedProduct: Product) => {
    setProducts(prevProducts => 
      prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
  }, []);

  const deleteProduct = useCallback((productId: string) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
  }, []);

  const updateProductStock = useCallback((productId: string, newStock: number) => {
    setProducts(prevProducts => prevProducts.map(p => p.id === productId ? { ...p, stock: newStock } : p));
  }, []);

  const decreaseStock = useCallback((productId: string, quantity: number) => {
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.id === productId ? { ...p, stock: p.stock - quantity } : p
      )
    );
  }, []);

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateProductStock,
    decreaseStock,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}
