"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { products, Product } from "../data/products";
import { categoryData } from "../data/categories";
import ProductCard from "../components/product/ProductCard";
import {
  Container, Typography, Box, TextField, Grid, Select, MenuItem, 
  FormControl, InputLabel, Slider, Paper, useTheme, useMediaQuery, Button
} from "@mui/material";
import Seo from "../components/common/Seo";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

export default function ProductsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State for filters
  const [search, setSearch] = useState(searchParams.get('q') || "");
  const [selectedGroup, setSelectedGroup] = useState(searchParams.get('group') || 'All');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [priceRange, setPriceRange] = useState<number[]>([parseInt(searchParams.get('minPrice') || '0'), parseInt(searchParams.get('maxPrice') || '5000')]);
  const [sortOption, setSortOption] = useState(searchParams.get('sort') || 'newest');
  
  const debouncedSearch = useDebounce(search, 300);

  const availableCategories = useMemo(() => {
    if (selectedGroup === 'All') return [];
    return categoryData.find(g => g.name === selectedGroup)?.categories || [];
  }, [selectedGroup]);

  const updateURL = useCallback(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('q', debouncedSearch);
    if (selectedGroup !== 'All') params.set('group', selectedGroup);
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    if (priceRange[0] > 0) params.set('minPrice', priceRange[0].toString());
    if (priceRange[1] < 5000) params.set('maxPrice', priceRange[1].toString());
    if (sortOption !== 'newest') params.set('sort', sortOption);
    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedSearch, selectedGroup, selectedCategory, priceRange, sortOption, pathname, router]);

  useEffect(() => {
    updateURL();
  }, [updateURL]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(p => {
      const searchMatch = debouncedSearch ? p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || p.description.toLowerCase().includes(debouncedSearch.toLowerCase()) : true;
      const groupMatch = selectedGroup === 'All' || p.group === selectedGroup;
      const categoryMatch = selectedCategory === 'All' || p.category === selectedCategory;
      const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1];
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

  return (
    <>
    <Seo title="Shop All Products | Megicloth" description="Browse our full collection of men's and women's unstitched fabrics. Filter by category, price, and more to find your perfect style."/>
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}>
        Shop Collection
      </Typography>

      <Paper elevation={0} variant="outlined" sx={{ p: 2, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}><TextField fullWidth label="Search products..." value={search} onChange={e => setSearch(e.target.value)} size="small" /></Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Group</InputLabel>
              <Select value={selectedGroup} label="Group" onChange={e => { setSelectedGroup(e.target.value); setSelectedCategory('All'); }}>
                <MenuItem value="All">All Groups</MenuItem>
                {categoryData.map(g => <MenuItem key={g.name} value={g.name}>{g.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small" disabled={selectedGroup === 'All'}>
              <InputLabel>Category</InputLabel>
              <Select value={selectedCategory} label="Category" onChange={e => setSelectedCategory(e.target.value)}>
                <MenuItem value="All">All Categories</MenuItem>
                {availableCategories.map(c => <MenuItem key={c.name} value={c.name}>{c.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="body2" gutterBottom>Price: Rs{priceRange[0]} - Rs{priceRange[1]}</Typography>
            <Slider value={priceRange} onChange={(_, val) => setPriceRange(val as number[])} valueLabelDisplay="auto" min={0} max={5000} step={100} />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Sort By</InputLabel>
              <Select value={sortOption} label="Sort By" onChange={e => setSortOption(e.target.value)}>
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="price-asc">Price: Low to High</MenuItem>
                <MenuItem value="price-desc">Price: High to Low</MenuItem>
                <MenuItem value="rating">Top Rated</MenuItem>
              </Select>
            </FormControl>
          </Grid>
           <Grid item xs={12} sm={6} md={1} sx={{ textAlign: 'right' }}>
            <Button onClick={handleResetFilters} size="medium">Reset</Button>
          </Grid>
        </Grid>
      </Paper>

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
    </Container>
    </>
  );
}
