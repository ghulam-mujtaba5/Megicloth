
"use client";
import { products } from "./data/products";
import ProductCard from "./components/ProductCard";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <main style={{ maxWidth: 1300, margin: "0 auto", padding: "0 0 48px 0", background: "#f8fafc" }}>
      <section
        style={{
          background: "linear-gradient(100deg, #1e293b 0%, #2563eb 100%)",
          color: "#fff",
          borderRadius: 24,
          padding: "32px 8px 32px 8px",
          margin: "20px 0 32px 0",
          textAlign: "center",
          boxShadow: "0 8px 32px rgba(37,99,235,0.10)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "url('https://www.transparenttextures.com/patterns/diamond-upholstery.png') repeat",
            opacity: 0.08,
            zIndex: 0
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 900,
              margin: 0,
              letterSpacing: 1,
              lineHeight: 1.1,
              maxWidth: 400,
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            Unstitched Luxury Fabrics
          </h1>
          <p style={{ fontSize: 18, margin: "18px 0 0 0", fontWeight: 500, color: "#e0e7ff" }}>
            Premium Men’s & Women’s Unstitched Clothes
          </p>
          <p style={{ fontSize: 15, margin: "12px 0 0 0", color: "#c7d2fe" }}>
            Shop the latest collections. Fast delivery, easy returns, and the best prices in Pakistan.
          </p>
          <Link
            href="/products"
            style={{
              display: "inline-block",
              marginTop: 24,
              padding: "12px 32px",
              background: "#fff",
              color: "#2563eb",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 16,
              textDecoration: "none",
              boxShadow: "0 2px 12px rgba(37,99,235,0.10)",
              transition: "background 0.2s, color 0.2s"
            }}
          >
            Shop Now
          </Link>
        </div>
      </section>
      <div style={{ width: "100%", textAlign: "center", margin: "0 0 32px 0" }}>
        <hr
          style={{
            border: 0,
            borderTop: "2px solid #e0e7ef",
            width: "90%",
            margin: "0 auto"
          }}
        />
      </div>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 800,
          marginBottom: 24,
          color: "#222",
          textAlign: "center",
          letterSpacing: 1
        }}
      >
        Featured Products
      </h2>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 24, padding: "0 8px" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            fontSize: 15,
            width: "100%",
            maxWidth: 340,
            outline: "none"
          }}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 24,
          justifyContent: "center",
          margin: "0 8px"
        }}
      >
        {filteredProducts.length === 0 ? (
          <div
            style={{
              gridColumn: "1/-1",
              textAlign: "center",
              color: "#888",
              fontSize: 18,
              padding: 32
            }}
          >
            No products found.
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
      <style>{`
        @media (min-width: 600px) {
          main > section {
            padding: 48px 24px 48px 24px !important;
            margin: 32px 16px 48px 16px !important;
          }
          main > div[style*='grid'] {
            grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)) !important;
            gap: 40px !important;
            margin: 0 24px !important;
          }
          main > h2 {
            font-size: 36px !important;
            margin-bottom: 32px !important;
          }
        }
      `}</style>
    </main>
  );
}
