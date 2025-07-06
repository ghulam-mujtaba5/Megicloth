"use client";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useState, useEffect, useMemo, useCallback } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Fade from "@mui/material/Fade";
import Pagination from "@mui/material/Pagination";
import Slider from "@mui/material/Slider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Enhanced product data
const enhancedProducts = products.map((product, index) => ({
  ...product,
  tags: product.category === 'Men' ? ['Premium', 'Comfortable', 'Lawn'] : ['Elegant', 'Stylish', 'Embroidered'],
  fabricType: product.category === 'Men' ? 'Lawn' : 'Embroidered Lawn',
  measurements: product.category === 'Men' ? '3.5 meters' : '3-piece set',
  deliveryTime: '2-3 days',
  returnPolicy: '7 days',
  brand: 'Megicloth',
  material: product.category === 'Men' ? '100% Cotton Lawn' : 'Premium Embroidered Lawn',
  care: 'Machine wash cold, tumble dry low',
  origin: 'Pakistan',
}));

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'rating-desc' | 'newest';
type ViewMode = 'grid' | 'list';

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const itemsPerPage = 12;

  // Get unique categories and tags
  const categories = useMemo(() => {
    return [...new Set(enhancedProducts.map(p => p.category))];
  }, []);

  const allTags = useMemo(() => {
    const tags = enhancedProducts.flatMap(p => p.tags || []);
    return [...new Set(tags)];
  }, []);

  // Get price range
  const priceRangeData = useMemo(() => {
    const prices = enhancedProducts.map(p => p.salePrice ?? p.price);
    return [Math.min(...prices), Math.max(...prices)];
  }, []);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let filtered = enhancedProducts.filter(product => {
      // Search filter
      const matchesSearch = search === "" || 
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) ||
        product.fabricType?.toLowerCase().includes(search.toLowerCase()) ||
        product.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()));

      // Category filter
      const matchesCategory = !selectedCategory || product.category === selectedCategory;

      // Tags filter
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => product.tags?.includes(tag));

      // Price range filter
      const productPrice = product.salePrice ?? product.price;
      const matchesPrice = productPrice >= priceRange[0] && productPrice <= priceRange[1];

      return matchesSearch && matchesCategory && matchesTags && matchesPrice;
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
        case 'rating-desc':
          return (b.rating ?? 0) - (a.rating ?? 0);
        case 'newest':
        default:
          return 0; // Keep original order
      }
    });

    return filtered;
  }, [search, selectedCategory, selectedTags, priceRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, selectedTags, priceRange, sortBy]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearch("");
  }, []);

  const handleCategorySelect = useCallback((category: string | null) => {
    setSelectedCategory(category);
  }, []);

  const handleTagToggle = useCallback((tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  }, []);

  const handlePriceRangeChange = useCallback((event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
  }, []);

  const handleSortChange = useCallback((event: any) => {
    setSortBy(event.target.value as SortOption);
  }, []);

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearch("");
    setSelectedCategory(null);
    setSelectedTags([]);
    setPriceRange([priceRangeData[0], priceRangeData[1]]);
    setSortBy('newest');
  }, [priceRangeData]);

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
      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
        {/* Page Header */}
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
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
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Discover our premium collection of unstitched fabrics for men and women
          </Typography>
        </Box>

        {/* Search and Controls */}
        <Box sx={{ mb: 4 }}>
          {/* Search Bar */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <TextField
              placeholder="Search products, fabrics, or categories..."
              value={search}
              onChange={handleSearchChange}
              size="medium"
              sx={{ maxWidth: 600, width: '100%' }}
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

          {/* Controls Row */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'stretch', md: 'center' },
            justifyContent: 'space-between',
            gap: 2,
            mb: 3,
          }}>
            {/* Left Controls */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {/* Filter Toggle */}
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={() => setShowFilters(!showFilters)}
                sx={{ borderRadius: 2 }}
              >
                Filters
              </Button>

              {/* Category Chips */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  label="All"
                  onClick={() => handleCategorySelect(null)}
                  color={selectedCategory === null ? 'primary' : 'default'}
                  sx={{ fontWeight: 600 }}
                />
                {categories.map((category) => (
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

            {/* Right Controls */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {/* Sort */}
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Sort by</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort by"
                  onChange={handleSortChange}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="newest">Newest</MenuItem>
                  <MenuItem value="name-asc">Name A-Z</MenuItem>
                  <MenuItem value="name-desc">Name Z-A</MenuItem>
                  <MenuItem value="price-asc">Price Low-High</MenuItem>
                  <MenuItem value="price-desc">Price High-Low</MenuItem>
                  <MenuItem value="rating-desc">Highest Rated</MenuItem>
                </Select>
              </FormControl>

              {/* View Mode */}
              <Box sx={{ display: 'flex', border: 1, borderColor: 'divider', borderRadius: 2 }}>
                <IconButton
                  onClick={() => handleViewModeChange('grid')}
                  sx={{
                    borderRadius: 0,
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                    background: viewMode === 'grid' ? 'primary.main' : 'transparent',
                    color: viewMode === 'grid' ? 'white' : 'inherit',
                    '&:hover': {
                      background: viewMode === 'grid' ? 'primary.dark' : 'action.hover',
                    },
                  }}
                >
                  <ViewModuleIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleViewModeChange('list')}
                  sx={{
                    borderRadius: 0,
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                    background: viewMode === 'list' ? 'primary.main' : 'transparent',
                    color: viewMode === 'list' ? 'white' : 'inherit',
                    '&:hover': {
                      background: viewMode === 'list' ? 'primary.dark' : 'action.hover',
                    },
                  }}
                >
                  <ViewListIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* Results Count */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </Typography>
            {(selectedCategory || selectedTags.length > 0 || search) && (
              <Button
                onClick={handleClearFilters}
                variant="text"
                size="small"
                sx={{ color: 'primary.main' }}
              >
                Clear all filters
              </Button>
            )}
          </Box>
        </Box>

        {/* Filters Panel */}
        <Fade in={showFilters} timeout={300}>
          <Box sx={{ mb: 4 }}>
            <Accordion 
              expanded={showFilters} 
              onChange={() => setShowFilters(!showFilters)}
              sx={{ 
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Advanced Filters
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  {/* Tags Filter */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                      Tags
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {allTags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          onClick={() => handleTagToggle(tag)}
                          color={selectedTags.includes(tag) ? 'primary' : 'default'}
                          variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
                          sx={{ fontWeight: 500 }}
                        />
                      ))}
                    </Box>
                  </Grid>

                  {/* Price Range Filter */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                      Price Range
                    </Typography>
                    <Box sx={{ px: 2 }}>
                      <Slider
                        value={priceRange}
                        onChange={handlePriceRangeChange}
                        valueLabelDisplay="auto"
                        min={priceRangeData[0]}
                        max={priceRangeData[1]}
                        valueLabelFormat={formatPrice}
                        sx={{
                          '& .MuiSlider-thumb': {
                            background: 'linear-gradient(45deg, #2563eb, #1e40af)',
                          },
                          '& .MuiSlider-track': {
                            background: 'linear-gradient(45deg, #2563eb, #1e40af)',
                          },
                        }}
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          {formatPrice(priceRange[0])}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatPrice(priceRange[1])}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Fade>

        {/* Products Grid */}
        <Grid 
          container 
          spacing={{ xs: 2, md: 3 }} 
          justifyContent="center"
          sx={{ mb: 4 }}
        >
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
                  onClick={handleClearFilters}
                  variant="outlined"
                  sx={{ borderRadius: 2 }}
                >
                  Clear Filters
                </Button>
              </Box>
            </Grid>
          ) : (
            // Products
            paginatedProducts.map((product, index) => (
              <Grid 
                item 
                xs={12} 
                sm={viewMode === 'list' ? 12 : 6} 
                md={viewMode === 'list' ? 12 : 4} 
                lg={viewMode === 'list' ? 12 : 3} 
                key={product.id}
              >
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
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => setCurrentPage(page)}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
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
