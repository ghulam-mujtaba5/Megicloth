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
      <CartProvider>
        <WishlistProvider>
          <OrderProvider>
            <ProductProvider>
              <CategoryProvider>
                <HomepageProvider>
                  <BlogProvider>
                    {children}
                  </BlogProvider>
                </HomepageProvider>
              </CategoryProvider>
            </ProductProvider>
          </OrderProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
