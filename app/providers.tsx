"use client";

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { HomepageProvider } from './context/HomepageContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';
import { CategoryProvider } from './context/CategoryContext';
import { BlogProvider } from './context/BlogContext';
import { ReactNode } from 'react';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ProductProvider>
        <HomepageProvider>
          <CartProvider>
            <OrderProvider>
              <WishlistProvider>
                <CategoryProvider>
                  <BlogProvider>
                    {children}
                  </BlogProvider>
                </CategoryProvider>
              </WishlistProvider>
            </OrderProvider>
          </CartProvider>
        </HomepageProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
