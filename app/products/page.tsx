"use client";

import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsClient />
    </Suspense>
  );
}

