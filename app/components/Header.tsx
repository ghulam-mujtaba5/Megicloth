import Link from "next/link";

export default function Header() {
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
      letterSpacing: 1
    }}>
      <Link href="/" style={{ color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 22 }}>
        Megicloth
      </Link>
      <Link href="/products" style={{ color: "#fff", textDecoration: "none" }}>
        Products
      </Link>
      <Link href="/cart" style={{ color: "#fff", textDecoration: "none" }}>
        Cart
      </Link>
      <Link href="/checkout" style={{ color: "#fff", textDecoration: "none" }}>
        Checkout
      </Link>
    </header>
  );
}
