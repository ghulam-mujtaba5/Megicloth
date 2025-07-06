"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Drawer,
  IconButton,
  useTheme,
  useMediaQuery,
  Skeleton,
  Alert,
  Pagination,
} from "@mui/material";
import {
  Search,
  FilterList,
  Sort,
  Clear,
  ExpandMore,
  ViewList,
  ViewModule,
  GridView,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

type SortOption = "name" | "price-low" | "price-high" | "rating" | "newest";
type ViewMode = "grid" | "list";

interface FilterState {
  search: string;
  category: string;
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
}

export default function ProductsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const [filterState, setFilterState] = useState<FilterState>({
    search: "",
    category: "",
    priceRange: [0, 10000],
    rating: 0,
    inStock: false,
  });
  
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 12;

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(products.map(p => p.category)))];
  }, []);

  // Get price range
  const priceRange = useMemo(() => {
    const prices = products.map(p => p.salePrice || p.price);
    return [Math.min(...prices), Math.max(...prices)];
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search filter
      const searchMatch = !filterState.search || 
        product.name.toLowerCase().includes(filterState.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filterState.search.toLowerCase());

      // Category filter
      const categoryMatch = !filterState.category || 
        filterState.category === "All" || 
        product.category === filterState.category;

      // Price filter
      const productPrice = product.salePrice || product.price;
      const priceMatch = productPrice >= filterState.priceRange[0] && 
                        productPrice <= filterState.priceRange[1];

      // Rating filter
      const ratingMatch = !filterState.rating || 
        (product.rating && product.rating >= filterState.rating);

      // Stock filter
      const stockMatch = !filterState.inStock || product.stock > 0;

      return searchMatch && categoryMatch && priceMatch && ratingMatch && stockMatch;
    });

    // Sort products
    switch (sortBy) {
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-low":
        filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case "price-high":
        filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
        // Assuming newer products have higher IDs
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
    }

    return filtered;
  }, [filterState, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilterState(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleClearFilters = () => {
    setFilterState({
      search: "",
      category: "",
      priceRange: [0, 10000],
      rating: 0,
      inStock: false,
    });
    setSortBy("newest");
    setCurrentPage(1);
    toast.success("Filters cleared");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Loading skeleton
  const ProductSkeleton = () => (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Box sx={{ p: 1 }}>
        <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 2, mb: 1 }} />
        <Skeleton variant="text" width="80%" height={24} sx={{ mb: 0.5 }} />
        <Skeleton variant="text" width="60%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="40%" height={16} sx={{ mb: 1 }} />
        <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: 2 }} />
      </Box>
    </Grid>
  );

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 800,
              textAlign: 'center',
              mb: 2,
              background: 'linear-gradient(45deg, #1e293b 30%, #2563eb 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Our Products
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: '#64748b',
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Discover our premium collection of unstitched fabrics for men and women
          </Typography>
        </motion.div>

        {/* Search and Filters Bar */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            {/* Search */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search products..."
                value={filterState.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                sx={{ background: '#ffffff', borderRadius: 2 }}
              />
            </Grid>

            {/* Category Filter */}
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth sx={{ background: '#ffffff', borderRadius: 2 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={filterState.category}
                  label="Category"
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Sort */}
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth sx={{ background: '#ffffff', borderRadius: 2 }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                >
                  <MenuItem value="newest">Newest</MenuItem>
                  <MenuItem value="name">Name A-Z</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="rating">Highest Rated</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* View Mode */}
            <Grid item xs={6} md={1}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  onClick={() => setViewMode("grid")}
                  color={viewMode === "grid" ? "primary" : "default"}
                  sx={{ background: '#ffffff' }}
                >
                  <GridView />
                </IconButton>
                <IconButton
                  onClick={() => setViewMode("list")}
                  color={viewMode === "list" ? "primary" : "default"}
                  sx={{ background: '#ffffff' }}
                >
                  <ViewList />
                </IconButton>
              </Box>
            </Grid>

            {/* Filter Button */}
            <Grid item xs={6} md={2}>
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                onClick={() => setFilterDrawerOpen(true)}
                fullWidth
                sx={{ 
                  background: '#ffffff',
                  borderColor: '#2563eb',
                  color: '#2563eb',
                  '&:hover': {
                    background: 'rgba(37,99,235,0.1)',
                  },
                }}
              >
                Filters
              </Button>
            </Grid>

            {/* Clear Filters */}
            <Grid item xs={12} md={1}>
              <Button
                variant="text"
                startIcon={<Clear />}
                onClick={handleClearFilters}
                sx={{ color: '#64748b' }}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Results Summary */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="body1" color="text.secondary">
            Showing {filteredProducts.length} of {products.length} products
          </Typography>
          {filteredProducts.length === 0 && (
            <Alert severity="info" sx={{ flex: 1, ml: 2 }}>
              No products match your current filters. Try adjusting your search criteria.
            </Alert>
          )}
        </Box>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <Grid container spacing={3}>
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </Grid>
          ) : (
            <motion.div
              key={`${viewMode}-${currentPage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Grid 
                container 
                spacing={3}
                sx={{
                  gridTemplateColumns: viewMode === "list" ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))",
                }}
              >
                {paginatedProducts.map((product, index) => (
                  <Grid 
                    item 
                    xs={12} 
                    sm={viewMode === "list" ? 12 : 6} 
                    md={viewMode === "list" ? 12 : 4} 
                    lg={viewMode === "list" ? 12 : 3} 
                    key={product.id}
                  >
                    <ProductCard 
                      product={product} 
                      showQuickAdd={viewMode === "grid"}
                    />
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => setCurrentPage(page)}
              color="primary"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  borderRadius: 2,
                  fontWeight: 600,
                },
              }}
            />
          </Box>
        )}

        {/* Filter Drawer */}
        <Drawer
          anchor="right"
          open={filterDrawerOpen}
          onClose={() => setFilterDrawerOpen(false)}
          PaperProps={{
            sx: { width: { xs: '100%', sm: 350 } },
          }}
        >
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Filters
              </Typography>
              <IconButton onClick={() => setFilterDrawerOpen(false)}>
                <Clear />
              </IconButton>
            </Box>

            {/* Price Range */}
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Price Range
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ px: 2 }}>
                  <Slider
                    value={filterState.priceRange}
                    onChange={(_, value) => handleFilterChange("priceRange", value)}
                    valueLabelDisplay="auto"
                    min={priceRange[0]}
                    max={priceRange[1]}
                    valueLabelFormat={formatPrice}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {formatPrice(filterState.priceRange[0])}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatPrice(filterState.priceRange[1])}
                    </Typography>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>

            {/* Rating Filter */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Rating
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {[4, 3, 2, 1].map((rating) => (
                    <Button
                      key={rating}
                      variant={filterState.rating === rating ? "contained" : "outlined"}
                      onClick={() => handleFilterChange("rating", filterState.rating === rating ? 0 : rating)}
                      startIcon={<span>★</span>}
                      sx={{ justifyContent: 'flex-start' }}
                    >
                      {rating}+ Stars
                    </Button>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>

            {/* Stock Filter */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Availability
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Button
                  variant={filterState.inStock ? "contained" : "outlined"}
                  onClick={() => handleFilterChange("inStock", !filterState.inStock)}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  In Stock Only
                </Button>
              </AccordionDetails>
            </Accordion>

            {/* Apply Filters */}
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => setFilterDrawerOpen(false)}
              >
                Apply Filters
              </Button>
              <Button
                variant="outlined"
                onClick={handleClearFilters}
              >
                Clear
              </Button>
            </Box>
          </Box>
        </Drawer>
      </Container>
    </Box>
  );
}
