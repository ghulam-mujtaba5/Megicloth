"use client";

import { useState } from 'react';
import FabricSearch from '../common/FabricSearch';
import ProductsGrid from '../product/ProductsGrid';

export default function ProductSearchSection() {
  const [searchQuery, setSearchQuery] = useState('');



  return (
    <>
      <FabricSearch onSearchChange={setSearchQuery} />
      <ProductsGrid searchQuery={searchQuery} />
    </>
  );
}
