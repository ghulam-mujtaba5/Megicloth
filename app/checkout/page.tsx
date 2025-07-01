
"use client";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const total = cart.reduce((sum, item) => sum + (item.salePrice ?? item.price) * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <main>
        <h1>Thank you for your order!</h1>
        <p>We have received your order and will contact you soon.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div style={{ display: "flex", gap: 40, alignItems: "flex-start", flexWrap: "wrap" }}>
          <form onSubmit={handleSubmit} style={{ minWidth: 320, maxWidth: 400, display: "flex", flexDirection: "column", gap: 16, background: "#f9fafb", padding: 24, borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <h2>Customer Info</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
            />
            <textarea
              placeholder="Shipping Address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
              style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc", minHeight: 60 }}
            />
            <button
              type="submit"
              style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 6, padding: "12px 0", fontWeight: 600, fontSize: 16, cursor: "pointer", marginTop: 8 }}
            >
              Place Order
            </button>
          </form>
          <div style={{ minWidth: 320, maxWidth: 400, background: "#f3f4f6", padding: 24, borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <h2>Order Summary</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {cart.map(item => (
                <li key={item.id} style={{ marginBottom: 12, borderBottom: "1px solid #e5e7eb", paddingBottom: 8 }}>
                  <div style={{ fontWeight: 500 }}>{item.name} x {item.quantity}</div>
                  <div style={{ color: "#666" }}>Rs. {(item.salePrice ?? item.price) * item.quantity}</div>
                </li>
              ))}
            </ul>
            <h3>Total: Rs. {total}</h3>
          </div>
        </div>
      )}
    </main>
  );
}
