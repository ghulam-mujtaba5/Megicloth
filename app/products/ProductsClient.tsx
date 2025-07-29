"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { products } from "../data/products";
import { categoryData } from "../data/categories";
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

export default function ProductsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State for filters
  const [search, setSearch] = useState(searchParams.get('q') || "");
  const [selectedGroup, setSelectedGroup] = useState(searchParams.get('group') || 'All');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [priceRange, setPriceRange] = useState<number[]>([parseInt(searchParams.get('minPrice') || '0'), parseInt(searchParams.get('maxPrice') || '5000')]);
  const [sortOption, setSortOption] = useState(searchParams.get('sort') || 'newest');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const debouncedSearch = useDebounce(search, 300);

  const availableCategories = useMemo(() => {
    if (selectedGroup === 'All') return [];
    return categoryData.find(g => g.name === selectedGroup)?.categories || [];
  }, [selectedGroup]);

  const updateURL = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) params.set('q', debouncedSearch); else params.delete('q');
    if (selectedGroup !== 'All') params.set('group', selectedGroup); else params.delete('group');
    if (selectedCategory !== 'All') params.set('category', selectedCategory); else params.delete('category');
    if (priceRange[0] > 0) params.set('minPrice', priceRange[0].toString()); else params.delete('minPrice');
    if (priceRange[1] < 5000) params.set('maxPrice', priceRange[1].toString()); else params.delete('maxPrice');
    if (sortOption !== 'newest') params.set('sort', sortOption); else params.delete('sort');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedSearch, selectedGroup, selectedCategory, priceRange, sortOption, pathname, router, searchParams]);

  useEffect(() => {
    updateURL();
  }, [updateURL]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(p => {
      const searchMatch = debouncedSearch ? p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || p.description.toLowerCase().includes(debouncedSearch.toLowerCase()) : true;
      const groupMatch = selectedGroup === 'All' || p.group === selectedGroup;
      const categoryMatch = selectedCategory === 'All' || p.category === selectedCategory;
      const priceMatch = (p.salePrice ?? p.price) >= priceRange[0] && (p.salePrice ?? p.price) <= priceRange[1];
      return searchMatch && groupMatch && categoryMatch && priceMatch;
    });

    switch (sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case 'price-desc':
        filtered.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return filtered;
  }, [debouncedSearch, selectedGroup, selectedCategory, priceRange, sortOption]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedGroup('All');
    setSelectedCategory('All');
    setPriceRange([0, 5000]);
    setSortOption('newest');
  };

  const filterProps = {
    search, setSearch,
    selectedGroup, setSelectedGroup,
    selectedCategory, setSelectedCategory,
    priceRange, setPriceRange,
    sortOption, setSortOption,
    handleResetFilters,
    availableCategories
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
                Showing {filteredAndSortedProducts.length} of {products.length} products
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
              {filteredAndSortedProducts.length > 0 ? (
                filteredAndSortedProducts.map((product) => (
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
