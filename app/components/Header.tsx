
"use client";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <header style={{
      width: "100%",
      background: "#2563eb",
      color: "#fff",
      padding: "16px 0",
      marginBottom: 32,
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 32,
      fontSize: 18,
      fontWeight: 500,
      letterSpacing: 1,
      position: "relative"
    }}>
      <Link href="/" style={{ color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 22 }}>
        Megicloth
      </Link>
      <Link href="/products" style={{ color: "#fff", textDecoration: "none" }}>
        Products
      </Link>
      <Link href="/cart" style={{ color: "#fff", textDecoration: "none", position: "relative", display: "flex", alignItems: "center" }}>
        <FaShoppingCart style={{ marginRight: 6 }} />
        Cart
        {cartCount > 0 && (
          <span style={{
            position: "absolute",
            top: -8,
            right: -18,
            background: "#10b981",
            color: "#fff",
            borderRadius: "50%",
            fontSize: 13,
            fontWeight: 700,
            padding: "2px 7px",
            minWidth: 22,
            textAlign: "center",
            boxShadow: "0 1px 4px rgba(16,185,129,0.15)"
          }}>{cartCount}</span>
        )}
      </Link>
      <Link href="/checkout" style={{ color: "#fff", textDecoration: "none" }}>
        Checkout
      </Link>
    </header>
  );
}
