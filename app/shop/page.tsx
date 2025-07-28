"use client";

import { Suspense } from 'react';
import { Box, Container, Grid, Typography, Breadcrumbs, Link as MuiLink, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import Link from 'next/link';
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import FiltersSidebar from "../components/FiltersSidebar";
import { useMemo, useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const ShopPageContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);

  const { filters, sortOrder } = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    const filters = {
      categories: params.get('categories')?.split(',') || [],
      priceRange: (params.get('price')?.split(',').map(Number) || [500, 15000]) as [number, number],
      availability: params.get('availability') || 'in-stock',
    };
    const sortOrder = params.get('sort') || 'newest';
    return { filters, sortOrder };
  }, [searchParams]);

  const sortedAndFilteredProducts = useMemo(() => {
    let sorted = [...products];

    switch (sortOrder) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return sorted.filter(product => {
      const { categories, priceRange, availability } = filters;
      const categoryMatch = categories.length === 0 || categories.includes(product.category);
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      const availabilityMatch = availability === 'in-stock' ? product.stock > 0 : product.stock === 0;
      return categoryMatch && priceMatch && availabilityMatch;
    });
  }, [filters, sortOrder]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [searchParams]);

  const handleFilterChange = (newFilters: any) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newFilters.categories.length > 0) {
      params.set('categories', newFilters.categories.join(','));
    } else {
      params.delete('categories');
    }
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
            ) : sortedAndFilteredProducts.length > 0 ? (
              sortedAndFilteredProducts.map((product) => (
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
