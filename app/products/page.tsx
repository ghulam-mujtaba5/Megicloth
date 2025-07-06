"use client";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
import Pagination from "@mui/material/Pagination";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { Product } from "../data/products";

// Enhanced product data with more realistic information
const enhancedProducts = products.map((product) => ({
  ...product,
  tags: product.category === 'Men' ? ['Premium', 'Comfortable'] : ['Elegant', 'Stylish'],
  fabricType: product.category === 'Men' ? 'Lawn' : 'Embroidered Lawn',
  measurements: product.category === 'Men' ? '3.5 meters' : '3-piece set',
  deliveryTime: '2-3 days',
  returnPolicy: '7 days',
}));

// Type for enhanced products
type EnhancedProduct = Product & {
  tags: string[];
  fabricType: string;
  measurements: string;
  deliveryTime: string;
  returnPolicy: string;
};

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'newest';

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Memoized filtered and sorted products for better performance
  const filteredProducts = useMemo(() => {
    let filtered = enhancedProducts.filter(product => {
      const matchesSearch = search === "" || 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) ||
        product.fabricType.toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      
      const matchesPriceRange = !selectedPriceRange || (() => {
        const price = product.salePrice ?? product.price;
        switch (selectedPriceRange) {
          case 'under-1000':
            return price < 1000;
          case '1000-2000':
            return price >= 1000 && price < 2000;
          case '2000-5000':
            return price >= 2000 && price < 5000;
          case 'over-5000':
            return price >= 5000;
          default:
            return true;
        }
      })();
      
      return matchesSearch && matchesCategory && matchesPriceRange;
    });
    
    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return (a.salePrice ?? a.price) - (b.salePrice ?? b.price);
        case 'price-desc':
          return (b.salePrice ?? b.price) - (a.salePrice ?? a.price);
        case 'newest':
        default:
          return b.id.localeCompare(a.id);
      }
    });
    
    return filtered;
  }, [search, selectedCategory, selectedPriceRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Simulate loading with better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, selectedPriceRange, sortBy]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearch("");
  }, []);

  const handleCategorySelect = useCallback((category: string | null) => {
    setSelectedCategory(category);
  }, []);

  const handlePriceRangeSelect = useCallback((range: string | null) => {
    setSelectedPriceRange(range);
  }, []);

  const handleSortChange = useCallback((sort: SortOption) => {
    setSortBy(sort);
  }, []);

  const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(enhancedProducts.map(p => p.category))];
    return uniqueCategories;
  }, []);

  const priceRanges = [
    { value: 'under-1000', label: 'Under Rs. 1,000' },
    { value: '1000-2000', label: 'Rs. 1,000 - 2,000' },
    { value: '2000-5000', label: 'Rs. 2,000 - 5,000' },
    { value: 'over-5000', label: 'Over Rs. 5,000' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'name-asc', label: 'Name A-Z' },
    { value: 'name-desc', label: 'Name Z-A' },
    { value: 'price-asc', label: 'Price Low to High' },
    { value: 'price-desc', label: 'Price High to Low' },
  ];

  // Loading skeleton component
  const ProductSkeleton = () => (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Box sx={{ p: 1 }}>
        <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2, mb: 1 }} />
        <Skeleton variant="text" width="80%" height={24} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="60%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="40%" height={16} sx={{ mb: 1 }} />
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
        </Box>
        <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: 2 }} />
      </Box>
    </Grid>
  );

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1e293b 0%, #2563eb 50%, #3b82f6 100%)',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              py: { xs: 6, md: 8 },
              px: { xs: 2, md: 4 },
              textAlign: 'center',
            }}
          >
            <Slide direction="up" in={true} timeout={800}>
              <Box>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                    fontWeight: 800,
                    mb: 2,
                    background: 'linear-gradient(45deg, #ffffff 30%, #e0e7ff 90%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  All Products
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                    fontWeight: 500,
                    mb: 3,
                    color: '#e0e7ff',
                    maxWidth: '600px',
                    mx: 'auto',
                    lineHeight: 1.4,
                  }}
                >
                  Discover our complete collection of premium unstitched fabrics
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    color: '#c7d2fe',
                    mb: 4,
                    maxWidth: '500px',
                    mx: 'auto',
                    lineHeight: 1.6,
                  }}
                >
                  Browse through our extensive collection of lawn, cotton, and embroidered fabrics for men and women.
                </Typography>
              </Box>
            </Slide>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Search and Filter Section */}
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          {/* Search Bar */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <TextField
              placeholder="Search products, fabrics, or categories..."
              value={search}
              onChange={handleSearchChange}
              size="medium"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                endAdornment: search && (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClearSearch} size="small">
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                maxWidth: 600,
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  background: '#ffffff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  },
                  '&.Mui-focused': {
                    boxShadow: '0 4px 12px rgba(37,99,235,0.15)',
                  },
                },
              }}
            />
          </Box>

          {/* Filters and Sort */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {/* Category Filters */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  label="All Categories"
                  onClick={() => handleCategorySelect(null)}
                  color={selectedCategory === null ? 'primary' : 'default'}
                  sx={{ fontWeight: 600 }}
                />
                {categories.map((category: string) => (
                  <Chip
                    key={category}
                    label={category}
                    onClick={() => handleCategorySelect(category)}
                    color={selectedCategory === category ? 'primary' : 'default'}
                    sx={{ fontWeight: 600 }}
                  />
                ))}
              </Box>
            </Grid>

            {/* Price Range Filters */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  label="All Prices"
                  onClick={() => handlePriceRangeSelect(null)}
                  color={selectedPriceRange === null ? 'primary' : 'default'}
                  sx={{ fontWeight: 600 }}
                />
                {priceRanges.map((range) => (
                  <Chip
                    key={range.value}
                    label={range.label}
                    onClick={() => handlePriceRangeSelect(range.value)}
                    color={selectedPriceRange === range.value ? 'primary' : 'default'}
                    sx={{ fontWeight: 600 }}
                  />
                ))}
              </Box>
            </Grid>

            {/* Sort Options */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => handleSortChange(e.target.value as SortOption)}
                  sx={{ borderRadius: 2 }}
                >
                  {sortOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Results Count */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="body1" color="text.secondary">
              Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
            </Typography>
            
            {/* Clear Filters Button */}
            {(selectedCategory || selectedPriceRange || search) && (
              <Button
                onClick={() => {
                  setSearch('');
                  setSelectedCategory(null);
                  setSelectedPriceRange(null);
                }}
                variant="outlined"
                size="small"
                sx={{ borderRadius: 2 }}
              >
                Clear Filters
              </Button>
            )}
          </Box>
        </Box>

        {/* Products Grid */}
        <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
          {loading ? (
            // Loading skeletons
            Array.from({ length: itemsPerPage }).map((_, i) => <ProductSkeleton key={i} />)
          ) : filteredProducts.length === 0 ? (
            // No results
            <Grid item xs={12}>
              <Box
                sx={{
                  textAlign: 'center',
                  py: 8,
                  px: 2,
                }}
              >
                <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>
                  No products found
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                  Try adjusting your search or filter criteria
                </Typography>
                <Button
                  onClick={() => {
                    setSearch('');
                    setSelectedCategory(null);
                    setSelectedPriceRange(null);
                  }}
                  variant="outlined"
                  sx={{ borderRadius: 2 }}
                >
                  Clear Filters
                </Button>
              </Box>
            </Grid>
          ) : (
            // Products
            paginatedProducts.map((product: EnhancedProduct, index: number) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Fade in={true} timeout={500 + index * 100}>
                  <Box sx={{ height: '100%' }}>
                    <ProductCard product={product} />
                  </Box>
                </Fade>
              </Grid>
            ))
          )}
        </Grid>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size={isMobile ? "small" : "large"}
              sx={{
                '& .MuiPaginationItem-root': {
                  borderRadius: 2,
                  fontWeight: 600,
                },
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}
