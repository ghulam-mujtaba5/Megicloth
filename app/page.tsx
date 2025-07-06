"use client";
import { products } from "./data/products";
import ProductCard from "./components/ProductCard";
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
import { useTheme } from "@mui/material/styles";
import type { Product } from "./data/products";

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

export default function Home() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Memoized filtered products for better performance
  const filteredProducts = useMemo(() => {
    const filtered = enhancedProducts.filter(product => {
      const matchesSearch = search === "" || 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) ||
        product.fabricType.toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    return filtered;
  }, [search, selectedCategory]);

  // Simulate loading with better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearch("");
  }, []);

  const handleCategorySelect = useCallback((category: string | null) => {
    setSelectedCategory(category);
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(enhancedProducts.map(p => p.category))];
    return uniqueCategories;
  }, []);

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
              py: { xs: 6, md: 10 },
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
                  Premium Unstitched Fabrics
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
                  Discover Pakistan's finest collection of unstitched fabrics for men and women
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
                  Premium quality lawn, cotton, and embroidered fabrics. Fast delivery, easy returns, and the best prices in Pakistan.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Button
                    component={Link}
                    href="/products"
                    variant="contained"
                    size="large"
                    sx={{
                      background: '#ffffff',
                      color: '#2563eb',
                      px: { xs: 3, md: 4 },
                      py: { xs: 1.5, md: 2 },
                      fontSize: { xs: '1rem', md: '1.125rem' },
                      fontWeight: 700,
                      borderRadius: 3,
                      boxShadow: '0 4px 20px rgba(255,255,255,0.3)',
                      '&:hover': {
                        background: '#f8fafc',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 30px rgba(255,255,255,0.4)',
                      },
                    }}
                  >
                    Shop Now
                  </Button>
                  <Button
                    component={Link}
                    href="/products"
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: '#ffffff',
                      color: '#ffffff',
                      px: { xs: 3, md: 4 },
                      py: { xs: 1.5, md: 2 },
                      fontSize: { xs: '1rem', md: '1.125rem' },
                      fontWeight: 600,
                      borderRadius: 3,
                      '&:hover': {
                        borderColor: '#ffffff',
                        background: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    View Collections
                  </Button>
                </Box>
              </Box>
            </Slide>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={3} sx={{ mb: { xs: 4, md: 6 } }}>
          {[
            { icon: '🚚', title: 'Fast Delivery', desc: '2-3 days across Pakistan' },
            { icon: '🔄', title: 'Easy Returns', desc: '7-day return policy' },
            { icon: '💎', title: 'Premium Quality', desc: 'Finest fabric selection' },
            { icon: '💰', title: 'Best Prices', desc: 'Competitive pricing' },
          ].map((feature, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Fade in={true} timeout={1000 + index * 200}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    borderRadius: 3,
                    background: '#ffffff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
                    },
                  }}
                >
                  <Typography variant="h3" sx={{ mb: 1, fontSize: '2rem' }}>
                    {feature.icon}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.desc}
                  </Typography>
                </Box>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {/* Search and Filter Section */}
        <Box sx={{ mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              fontWeight: 700,
              textAlign: 'center',
              mb: 3,
              color: '#1e293b',
            }}
          >
            Featured Products
          </Typography>

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
                maxWidth: 500,
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

          {/* Category Filters */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 4, flexWrap: 'wrap' }}>
            <Chip
              label="All"
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
        </Box>

        {/* Products Grid */}
        <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
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
            filteredProducts.map((product: EnhancedProduct, index: number) => (
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

        {/* View All Button */}
        {!loading && filteredProducts.length > 0 && (
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              component={Link}
              href="/products"
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.125rem',
                fontWeight: 600,
                borderRadius: 3,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              View All Products
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
