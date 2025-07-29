import type { Metadata, ResolvingMetadata } from 'next';
import { getProductById, getRelatedProducts } from "@/app/lib/data/products";
import ProductClientPage from './ProductClientPage';

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await getProductById(params.id);

  if (!product) {
    return {
      title: "Product Not Found | Megicloth",
      description: "The product you are looking for does not exist.",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${product.name} | Megicloth`,
    description: product.description,
    alternates: {
      canonical: `/products/${product.id}`,
    },
    openGraph: {
      title: product.name,
      description: product.description,
      url: `/products/${product.id}`,
      siteName: 'Megicloth',
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 600,
          alt: product.name,
        },
        ...product.images.slice(1, 4).map(img => ({
          url: img,
          width: 800,
          height: 600,
          alt: `${product.name} image`,
        })),
        ...previousImages,
      ],
      locale: 'en_US',
      type: 'website',
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductById(params.id);
  if (!product) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <p>The product you are looking for does not exist or could not be loaded.</p>
      </div>
    );
  }
  let relatedProducts = [];
  try {
    relatedProducts = await getRelatedProducts(product.category, product.id);
  } catch (error) {
    console.error('Error loading related products:', error);
    relatedProducts = [];
  }
  return <ProductClientPage product={product} relatedProducts={relatedProducts} />;
}