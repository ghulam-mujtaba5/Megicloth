import type { Metadata, ResolvingMetadata } from 'next';
import { products } from "../../data/products";
import ProductClientPage from './ProductClientPage';

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = products.find(p => p.id === params.id);

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
          url: product.image,
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

export default function ProductDetailPage({ params }: Props) {
  const product = products.find(p => p.id === params.id);
  const relatedProducts = product ? products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 8) : [];

  return <ProductClientPage product={product} relatedProducts={relatedProducts} />;
}