"use client";

import { Box, Container, Grid, Typography, Breadcrumbs, Link as MuiLink, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import Link from 'next/link';
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import FiltersSidebar from "../components/FiltersSidebar";
import { useMemo, useState } from "react";

const ShopPage = () => {
  const [filters, setFilters] = useState({
    categories: [] as string[],
    fabricTypes: [] as string[],
    priceRange: [500, 15000] as [number, number],
    availability: "in-stock" as string,
  });
  const [sortOrder, setSortOrder] = useState('newest');

  const sortedAndFilteredProducts = useMemo(() => {
    let sorted = [...products];

    // Sorting logic
    switch (sortOrder) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        sorted.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
    }

    return sorted.filter(product => {
      const { categories, fabricTypes, priceRange, availability } = filters;

      const categoryMatch = categories.length === 0 || categories.includes(product.category);
      const fabricMatch = fabricTypes.length === 0 || fabricTypes.includes(product.fabricType);
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      const availabilityMatch = availability === "in-stock" ? product.inStock : !product.inStock;

      return categoryMatch && fabricMatch && priceMatch && availabilityMatch;
    });
  }, [filters, sortOrder]);

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortOrder(event.target.value as string);
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
          <FiltersSidebar filters={filters} setFilters={setFilters} />
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
            {sortedAndFilteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShopPage;
