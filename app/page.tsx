"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Fade from "@mui/material/Fade";
import Zoom from '@mui/material/Zoom';
import Image from 'next/image';
import styles from './page.module.css';
import HeroCarousel from './components/HeroCarousel';
import TrendingProducts from './components/TrendingProducts';
import Testimonials from './components/Testimonials';
import InstagramFeed from './components/InstagramFeed';
import BlogPreview from './components/BlogPreview';
import HighlightedFeatures from './components/HighlightedFeatures';
import QuickAccessCategories from './components/QuickAccessCategories';
import { products } from "./data/products";
import ProductCard from "./components/ProductCard";
import Skeleton from "@mui/material/Skeleton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ScrollTopButton from "./components/ScrollTopButton";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const loading = false; // This will be replaced with real data fetching logic

  return (
    <>

          <Box component="main" sx={{ backgroundColor: 'var(--neutral-50)' }}>

            <HeroCarousel />
            <QuickAccessCategories />
            <TrendingProducts />
            <HighlightedFeatures />

            {/* Search and Filter Section */}
            <section aria-label="Product Search">
              <Container maxWidth="lg" sx={{ py: 6 }}>
                <Typography variant="h4" component="h2" textAlign="center" gutterBottom sx={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, color: 'var(--neutral-800)' }}>
                  Find Your Perfect Fabric
                </Typography>
                <Box sx={{ maxWidth: '600px', mx: 'auto', mt: 4 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search for fabrics, colors, brands..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                      endAdornment: searchQuery && (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setSearchQuery('')} edge="end">
                            <ClearIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: { borderRadius: '12px', fontFamily: 'var(--font-inter)' }
                    }}
                  />
                </Box>
              </Container>
            </section>

            {/* Products Grid */}
            <section aria-label="Our Products">
              <Container maxWidth="lg" sx={{ pb: 8 }}>
                <Grid container spacing={4}>
                  {(loading ? Array.from(new Array(8)) : filteredProducts).map((product, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product ? product.id : index}>
                      {product ? (
                        <ProductCard product={product} />
                      ) : (
                        <Skeleton variant="rectangular" height={380} sx={{ borderRadius: '12px' }} />
                      )}
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </section>

            {/* Newsletter Signup */}
            <section aria-label="Newsletter Signup">
              <Container maxWidth="lg" sx={{ py: 8 }}>
                <Fade in={true} timeout={1600}>
                  <Box className={styles.newsletterContainer}>
                    <Grid container alignItems="center">
                      <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Image
                          src="https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
                          alt="Fashionable clothes on a rack"
                          width={627}
                          height={627}
                          className={styles.newsletterImage}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box className={styles.newsletterContent}>
                          <Typography variant="h4" component="h2" sx={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, mb: 1, color: 'var(--neutral-800)' }}>
                            Stay in the Loop
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 4, color: 'var(--neutral-600)', fontFamily: 'var(--font-inter)' }}>
                            Subscribe to our newsletter for the latest updates, new arrivals, and exclusive offers.
                          </Typography>
                          <Box component="form" sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                            <TextField
                              label="Email Address"
                              variant="outlined"
                              fullWidth
                              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontFamily: 'var(--font-inter)' } }}
                            />
                            <Button 
                              variant="contained" 
                              type="submit" 
                              size="large"
                              startIcon={<MailOutlineIcon />}
                              sx={{ 
                                borderRadius: '12px', 
                                py: '15px', 
                                px: 4, 
                                whiteSpace: 'nowrap',
                                fontFamily: 'var(--font-poppins)',
                                fontWeight: 600,
                                backgroundColor: 'var(--primary-600)',
                                '&:hover': {
                                  backgroundColor: 'var(--primary-700)'
                                }
                              }}
                            >
                              Subscribe
                            </Button>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Fade>
              </Container>
            </section>

            <Testimonials />

            {/* Featured Brands Section */}
            <section aria-label="Featured Brands">
              <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="h4" component="h2" textAlign="center" gutterBottom sx={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, color: 'var(--neutral-800)', mb: 6 }}>
                  Featured Brands
                </Typography>
                <Grid container spacing={4} justifyContent="center" alignItems="center">
                  {[...Array(4)].map((_, index) => (
                    <Grid item key={index}>
                      <div className={styles.brandLogoBox}>
                        <Image 
                          src={`https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=80&q=80&grayscale&${index}`}
                          alt={`Brand Logo ${index + 1}`}
                          width={120}
                          height={50}
                          className={styles.brandImage}
                        />
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </section>

            <InstagramFeed />
            <BlogPreview />

          </Box>
          <ScrollTopButton />
        </>
  );
}
