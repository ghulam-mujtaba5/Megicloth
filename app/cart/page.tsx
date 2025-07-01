
"use client";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + (item.salePrice ?? item.price) * item.quantity, 0);

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 32 }}>
      <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 32 }}>Your Cart</h1>
      {cart.length === 0 ? (
        <div style={{ color: "#888", fontSize: 20, textAlign: "center", margin: 60 }}>
          Your cart is empty.<br />
          <Link href="/products" style={{ color: "#2563eb", textDecoration: "underline" }}>Browse products</Link>
        </div>
      ) : (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 32 }}>
            <thead>
              <tr style={{ background: "#f1f5f9" }}>
                <th style={{ padding: 12, textAlign: "left" }}>Product</th>
                <th style={{ padding: 12 }}>Price</th>
                <th style={{ padding: 12 }}>Quantity</th>
                <th style={{ padding: 12 }}>Total</th>
                <th style={{ padding: 12 }}></th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: 12 }}>
                    <Link href={`/products/${item.id}`} style={{ color: "#2563eb", textDecoration: "none" }}>{item.name}</Link>
                  </td>
                  <td style={{ padding: 12 }}>Rs. {item.salePrice ?? item.price}</td>
                  <td style={{ padding: 12 }}>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={e => updateQuantity(item.id, Number(e.target.value))}
                      style={{ width: 50, padding: 4, borderRadius: 4, border: "1px solid #cbd5e1" }}
                    />
                  </td>
                  <td style={{ padding: 12 }}>Rs. {(item.salePrice ?? item.price) * item.quantity}</td>
                  <td style={{ padding: 12 }}>
                    <button onClick={() => removeFromCart(item.id)} style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <button onClick={clearCart} style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: 6, padding: "10px 24px", fontWeight: 600, cursor: "pointer" }}>Clear Cart</button>
            <div style={{ fontSize: 22, fontWeight: 700 }}>Total: Rs. {total}</div>
          </div>
          <Link href="/checkout" style={{ background: "#10b981", color: "#fff", padding: "14px 40px", borderRadius: 8, fontWeight: 700, fontSize: 18, textDecoration: "none" }}>Proceed to Checkout</Link>
        </>
      )}
    </main>
  );
}
