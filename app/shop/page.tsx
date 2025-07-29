"use client";

import { Suspense } from 'react';
import { Box, Container, Grid, Typography, Breadcrumbs, Link as MuiLink, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import Link from 'next/link';
import ProductCard from "../components/product/ProductCard";
import { fetchProducts } from '../lib/data';
import { Product } from '../types/index';
import FiltersSidebar from "../components/common/FiltersSidebar";
import { useMemo, useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const ShopPageContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { filters, sortOrder } = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    const filters = {
      categories: params.get('categories')?.split(',').filter(Boolean) || [],
      priceRange: (params.get('price')?.split(',').map(Number) || [500, 15000]) as [number, number],
      availability: params.get('availability') || 'in-stock',
      colors: params.get('colors')?.split(',').filter(Boolean) || [],
      brands: params.get('brands')?.split(',').filter(Boolean) || [],
      fabrics: params.get('fabrics')?.split(',').filter(Boolean) || [],
      tags: params.get('tags')?.split(',').filter(Boolean) || [],
    };
    const sortOrder = params.get('sort') || 'newest';
    return { filters, sortOrder };
  }, [searchParams]);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await fetchProducts(filters, sortOrder);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        // Optionally, set an error state and display a message to the user
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [filters, sortOrder]);

  const handleFilterChange = (newFilters: any) => {
    const params = new URLSearchParams(searchParams.toString());

    // Handle all array-based filters dynamically
    ['categories', 'colors', 'brands', 'fabrics', 'tags'].forEach(filterKey => {
      if (newFilters[filterKey] && newFilters[filterKey].length > 0) {
        params.set(filterKey, newFilters[filterKey].join(','));
      } else {
        params.delete(filterKey);
      }
    });

    params.set('price', newFilters.priceRange.join(','));
    params.set('availability', newFilters.availability);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', event.target.value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link href="/" passHref>
          <MuiLink underline="hover" color="inherit">Home</MuiLink>
        </Link>
        <Typography color="text.primary">Shop</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <FiltersSidebar filters={filters} onFilterChange={handleFilterChange} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" component="h1">
              All Products
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortOrder}
                label="Sort By"
                onChange={handleSortChange}
              >
                <MenuItem value={'newest'}>Newest</MenuItem>
                <MenuItem value={'price-asc'}>Price: Low to High</MenuItem>
                <MenuItem value={'price-desc'}>Price: High to Low</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Grid container spacing={3}>
            {loading ? (
              Array.from(new Array(6)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Skeleton variant="rectangular" height={200} />
                  <Skeleton />
                  <Skeleton width="60%" />
                </Grid>
              ))
            ) : products.length > 0 ? (
              products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                  No products found matching your criteria.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const ShopPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ShopPageContent />
  </Suspense>
);

export default ShopPage;
