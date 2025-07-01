import { products } from "./data/products";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <main>
      <h1>Welcome to Megicloth</h1>
      <p>Your one-stop shop for fashion in Pakistan.</p>
      <h2>Featured Products</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
