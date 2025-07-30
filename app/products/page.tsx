import { Suspense } from "react";
import styles from './ProductsPage.module.css';
import ProductsClient from "./ProductsClient";
import { getProducts, getCategories } from "@/app/lib/data/products";

export const dynamic = 'force-dynamic';

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
  try {
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
        <ProductsClient initialProducts={products} categories={['All', ...categories.map(cat => cat.name)]} />
      </Suspense>
    );
  } catch (error) {
    console.error('Products page error:', error);
    return (
      <div className={styles.centered}>
        <h2>Something went wrong loading products.</h2>
        <p>Please try again later or contact support if the problem persists.</p>
      </div>
    );
  }
}

