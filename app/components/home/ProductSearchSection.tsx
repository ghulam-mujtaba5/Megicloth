"use client";

import { useState } from 'react';
import FabricSearch from '../common/FabricSearch';
import ProductsGrid from '../product/ProductsGrid';

export default function ProductSearchSection() {
  const [searchQuery, setSearchQuery] = useState('');

  // This will be replaced with real data fetching logic
  const loading = false;

  return (
    <>
      <FabricSearch onSearchChange={setSearchQuery} />
      <ProductsGrid searchQuery={searchQuery} loading={loading} />
    </>
  );
}
