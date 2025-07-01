import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Products() {
  return (
    <main>
      <h1>Products</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
