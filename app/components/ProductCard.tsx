"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import type { Product } from "../data/products";


interface ProductCardProps {
  product: Product;
}


export default function ProductCard({ product }: ProductCardProps) {
  // Use a reliable online placeholder if product.image is missing or broken
  const imageUrl = product.image.startsWith('http') ? product.image : 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80';
  const { addToCart } = useCart();
  return (
    <div style={{
      border: "1px solid #e5e7eb",
      borderRadius: 12,
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      padding: 20,
      width: 270,
      background: "#fff",
      transition: "box-shadow 0.2s",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
      cursor: "pointer",
      minHeight: 420,
    }}>
      <img
        src={imageUrl}
        alt={product.name}
        style={{
          width: "100%",
          height: 180,
          objectFit: "cover",
          borderRadius: 8,
          marginBottom: 12,
          background: "#f3f4f6"
        }}
        onError={e => (e.currentTarget.src = 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80')}
      />
      <h2 style={{ fontSize: 20, fontWeight: 600, margin: "8px 0 4px 0", color: "#222" }}>{product.name}</h2>
      <p style={{ color: "#666", fontSize: 14, margin: 0, textAlign: "center" }}>{product.description}</p>
      <p style={{ fontSize: 18, fontWeight: 500, margin: "10px 0 0 0" }}>
        <span style={{ color: "#10b981" }}>Rs. {product.salePrice ?? product.price}</span>{" "}
        {product.salePrice && (
          <span style={{ textDecoration: "line-through", color: "#888", fontSize: 15, marginLeft: 6 }}>
            Rs. {product.price}
          </span>
        )}
      </p>
      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <Link
          href={`/products/${product.id}`}
          style={{
            padding: "8px 20px",
            background: "#2563eb",
            color: "#fff",
            borderRadius: 6,
            textDecoration: "none",
            fontWeight: 500,
            fontSize: 15,
            boxShadow: "0 1px 4px rgba(37,99,235,0.08)",
            transition: "background 0.2s",
            display: "inline-block"
          }}
        >
          View Details
        </Link>
        <button
          onClick={() => addToCart(product)}
          style={{
            padding: "8px 20px",
            background: "#10b981",
            color: "#fff",
            borderRadius: 6,
            border: "none",
            fontWeight: 500,
            fontSize: 15,
            cursor: "pointer",
            boxShadow: "0 1px 4px rgba(16,185,129,0.08)",
            transition: "background 0.2s"
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
