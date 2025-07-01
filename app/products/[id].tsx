"use client";
import { notFound } from "next/navigation";
import { products, Product } from "../data/products";
import { useCart } from "../context/CartContext";

type Props = { params: { id: string } };

export default function ProductDetail({ params }: Props) {
  const { addToCart } = useCart();
  const product = products.find((p: Product) => p.id === params.id);
  if (!product) return notFound();
  const imageUrl = product.image.startsWith('http') ? product.image : 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80';
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 32 }}>
      <div style={{ display: "flex", gap: 40, alignItems: "flex-start", flexWrap: "wrap" }}>
        <img src={imageUrl} alt={product.name} style={{ width: 340, height: 260, objectFit: "cover", borderRadius: 12, background: "#f3f4f6" }} />
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>{product.name}</h1>
          <p style={{ color: "#666", fontSize: 16 }}>{product.description}</p>
          <p style={{ fontSize: 22, fontWeight: 700, margin: "18px 0 8px 0" }}>
            <span style={{ color: "#10b981" }}>Rs. {product.salePrice ?? product.price}</span>{" "}
            {product.salePrice && <span style={{ textDecoration: "line-through", color: "#888", fontSize: 17, marginLeft: 8 }}>Rs. {product.price}</span>}
          </p>
          <div style={{ margin: "10px 0 18px 0", color: "#444" }}>
            <div>Category: {product.category}</div>
            <div>Stock: {product.stock > 0 ? "In Stock" : "Out of Stock"}</div>
            <div>SKU: {product.sku}</div>
            <div>Rating: {product.rating ?? "N/A"}</div>
          </div>
          <button
            onClick={() => addToCart(product)}
            style={{
              padding: "12px 36px",
              background: "#10b981",
              color: "#fff",
              borderRadius: 8,
              border: "none",
              fontWeight: 700,
              fontSize: 18,
              cursor: "pointer",
              boxShadow: "0 1px 4px rgba(16,185,129,0.08)",
              transition: "background 0.2s"
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
