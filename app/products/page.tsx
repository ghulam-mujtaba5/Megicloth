import Link from "next/link";
import { products } from "../data/products";

export default function Products() {
  return (
    <main>
      <h1>Products</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #eee", padding: 16, width: 250 }}>
            <img src={product.image} alt={product.name} style={{ width: "100%", height: 150, objectFit: "cover" }} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>
              <b>Rs. {product.salePrice ?? product.price}</b>{" "}
              {product.salePrice && <span style={{ textDecoration: "line-through", color: "#888" }}>Rs. {product.price}</span>}
            </p>
            <Link href={`/products/${product.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </main>
  );
}
