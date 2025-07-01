"use client";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      {children}
    </CartProvider>
  );
}
