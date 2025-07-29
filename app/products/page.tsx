import { Suspense } from "react";
import ProductsClient from "./ProductsClient";
import { getProducts, getCategories } from "@/app/lib/data/products";

export default async function ProductsPage({ 
  searchParams,
}: {
  searchParams: { 
    q?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
  };
}) {
  // Fetch initial products based on search params
  const products = await getProducts({
    query: searchParams.q,
    category: searchParams.category,
    minPrice: searchParams.minPrice ? parseInt(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? parseInt(searchParams.maxPrice) : undefined,
    sort: searchParams.sort,
  });

  // Fetch all available categories for the filter dropdown
  const categories = await getCategories();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsClient initialProducts={products} categories={['All', ...categories]} />
    </Suspense>
  );
}

