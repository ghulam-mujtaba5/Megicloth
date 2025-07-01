import { notFound } from "next/navigation";
import { products, Product } from "../data/products";

type Props = { params: { id: string } };

export default function ProductDetail({ params }: Props) {
  const product = products.find((p: Product) => p.id === params.id);
  if (!product) return notFound();
  return (
    <main>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} style={{ width: 300, height: 200, objectFit: "cover" }} />
      <p>{product.description}</p>
      <p>
        <b>Rs. {product.salePrice ?? product.price}</b>{" "}
        {product.salePrice && <span style={{ textDecoration: "line-through", color: "#888" }}>Rs. {product.price}</span>}
      </p>
      <p>Category: {product.category}</p>
      <p>Stock: {product.stock > 0 ? "In Stock" : "Out of Stock"}</p>
      <p>SKU: {product.sku}</p>
      <p>Rating: {product.rating ?? "N/A"}</p>
      {/* Add to Cart button will be added in next steps */}
    </main>
  );
}
