"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { type Product } from "@/app/types";

import ProductCard from "../components/product/ProductCard";
import ProductFilters from "../components/product/ProductFilters";
import {
  Container, Typography, Box, Grid, Paper, useTheme, useMediaQuery, Button, Drawer
} from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import Seo from "../components/common/Seo";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

export default function ProductsClient({ 
  initialProducts,
  categories,
}: { 
  initialProducts: Product[];
  categories: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State for filters, initialized from URL search params
  const [search, setSearch] = useState(searchParams.get('q') || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [priceRange, setPriceRange] = useState<number[]>([parseInt(searchParams.get('minPrice') || '0'), parseInt(searchParams.get('maxPrice') || '10000')]);
  const [sortOption, setSortOption] = useState(searchParams.get('sort') || 'newest');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const debouncedSearch = useDebounce(search, 500);

  // This callback updates the URL's search params whenever a filter changes.
  // The parent server component (`page.tsx`) will then re-fetch the data.
  const updateURL = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) params.set('q', debouncedSearch); else params.delete('q');
    if (selectedCategory !== 'All') params.set('category', selectedCategory); else params.delete('category');
    if (priceRange[0] > 0) params.set('minPrice', priceRange[0].toString()); else params.delete('minPrice');
    if (priceRange[1] < 10000) params.set('maxPrice', priceRange[1].toString()); else params.delete('maxPrice');
    if (sortOption !== 'newest') params.set('sort', sortOption); else params.delete('sort');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedSearch, selectedCategory, priceRange, sortOption, pathname, router, searchParams]);

  // Effect to trigger URL update when filters change
  useEffect(() => {
    updateURL();
  }, [updateURL]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setPriceRange([0, 10000]);
    setSortOption('newest');
  };

  const filterProps = {
    search, setSearch,
    selectedCategory, setSelectedCategory,
    priceRange, setPriceRange,
    sortOption, setSortOption,
    handleResetFilters,
    categories, // Pass categories from server to filters
  };

  return (
    <>
      <Seo title="Shop All Products | Megicloth" description="Browse our full collection of men's and women's unstitched fabrics. Filter by category, price, and more to find your perfect style."/>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
          Shop Collection
        </Typography>

        <Grid container spacing={4}>
          {/* Desktop Filters */}
          <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, position: 'sticky', top: 88 }}>
              <ProductFilters {...filterProps} />
            </Paper>
          </Grid>

          {/* Mobile Filters Drawer */}
          <Drawer anchor="left" open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)}>
            <Box sx={{ width: 300, p: 2 }}>
              <ProductFilters {...filterProps} />
            </Box>
          </Drawer>

          {/* Products Grid */}
          <Grid item xs={12} md={9}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography color="text.secondary">
                Showing {initialProducts.length} products
              </Typography>
              <Button
                variant="contained"
                onClick={() => setMobileFiltersOpen(true)}
                startIcon={<FilterListIcon />}
                sx={{ display: { xs: 'flex', md: 'none' } }}
              >
                Filters
              </Button>
            </Box>
            
            <Grid container spacing={isMobile ? 2 : 3}>
              {initialProducts.length > 0 ? (
                initialProducts.map((product) => (
                  <Grid item xs={6} sm={6} md={4} lg={3} key={product.id}>
                    <ProductCard product={product} />
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Box sx={{ textAlign: 'center', py: 10 }}>
                    <Typography variant="h6">No products found</Typography>
                    <Typography color="text.secondary">Try adjusting your filters or search term.</Typography>
                    <Button variant="outlined" onClick={handleResetFilters} sx={{ mt: 2 }}>Clear Filters</Button>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
