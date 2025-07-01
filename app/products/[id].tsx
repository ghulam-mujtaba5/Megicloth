import { useRouter } from 'next/navigation';

export default function ProductDetail() {
  const router = useRouter();
  // You can fetch product details using router.query.id
  return (
    <main>
      <h1>Product Detail</h1>
      <p>Details for the selected product will appear here.</p>
    </main>
  );
}
