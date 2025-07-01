
"use client";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + (item.salePrice ?? item.price) * item.quantity, 0);

  return (
    <main>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th style={{ padding: 10, border: "1px solid #e5e7eb" }}>Product</th>
                <th style={{ padding: 10, border: "1px solid #e5e7eb" }}>Price</th>
                <th style={{ padding: 10, border: "1px solid #e5e7eb" }}>Quantity</th>
                <th style={{ padding: 10, border: "1px solid #e5e7eb" }}>Total</th>
                <th style={{ padding: 10, border: "1px solid #e5e7eb" }}>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: 10, border: "1px solid #e5e7eb" }}>{item.name}</td>
                  <td style={{ padding: 10, border: "1px solid #e5e7eb" }}>Rs. {item.salePrice ?? item.price}</td>
                  <td style={{ padding: 10, border: "1px solid #e5e7eb" }}>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={e => updateQuantity(item.id, Number(e.target.value))}
                      style={{ width: 50, padding: 4, borderRadius: 4, border: "1px solid #ccc" }}
                    />
                  </td>
                  <td style={{ padding: 10, border: "1px solid #e5e7eb" }}>Rs. {(item.salePrice ?? item.price) * item.quantity}</td>
                  <td style={{ padding: 10, border: "1px solid #e5e7eb" }}>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: 4, padding: "6px 12px", cursor: "pointer" }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Total: Rs. {total}</h2>
            <button
              onClick={clearCart}
              style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: 4, padding: "8px 20px", cursor: "pointer" }}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </main>
  );
}
