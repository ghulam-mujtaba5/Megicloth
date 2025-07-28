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
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import Seo from "./components/Seo";
import Image from 'next/image';
import Head from "next/head";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styles from './page.module.css';
import HeroCarousel from './components/HeroCarousel';
import TrendingProducts from './components/TrendingProducts';
import Testimonials from './components/Testimonials';
import InstagramFeed from './components/InstagramFeed';
import BlogPreview from './components/BlogPreview';
import HighlightedFeatures from './components/HighlightedFeatures';
import QuickAccessCategories from './components/QuickAccessCategories';
import FeaturedBrands from './components/FeaturedBrands';
import { CategoryProvider } from './context/CategoryContext';
import { BlogProvider } from './context/BlogContext';

function ScrollTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <Zoom in={visible}>
      <Box sx={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1200 }}>
        <IconButton
          aria-label="Scroll to top"
          color="primary"
          sx={{ background: 'rgba(255,255,255,0.85)', boxShadow: 3, '&:hover': { background: '#e0e7ef' } }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <KeyboardArrowUpIcon fontSize="large" />
        </IconButton>
      </Box>
    </Zoom>
  );
}

export default function HomePage() {
  // Enhanced product data with more realistic information
  const enhancedProducts = useMemo(() => products.map((product) => ({
    ...product,
    tags: product.category === 'Men' ? ['Premium', 'Comfortable'] : ['Elegant', 'Stylish'],
    fabricType: product.category === 'Men' ? 'Lawn' : 'Embroidered Lawn',
    measurements: product.category === 'Men' ? '3.5 meters' : '3-piece set',
    deliveryTime: '2-3 days',
    returnPolicy: '7 days',
  })), []);
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

  // Featured products (top 4 by rating)
  const featured = [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4);



  return (
    <BlogProvider>
      <CategoryProvider>
    <>
      {/* SEO and structured data */}
      <Seo
        title="Megicloth | Premium Unstitched Fabrics Online in Pakistan"
        description="Shop premium lawn, cotton, and embroidered fabrics for men and women. Fast delivery, easy returns, and unbeatable prices at Megicloth."
        ogImage="/file.svg"
        canonical="https://megicloth.com/"
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Megicloth",
              "url": "https://megicloth.com/",
              "logo": "https://megicloth.com/file.svg",
              "sameAs": [
                "https://facebook.com/megicloth",
                "https://instagram.com/megicloth"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": featured.map((product, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "url": `https://megicloth.com/products/${product.id}`
              }))
            })
          }}
        />
      </Head>
      {/* Page layout */}
      <Box component="main" sx={{ flexGrow: 1, overflowX: 'hidden', background: 'linear-gradient(to bottom, #ffffff, #f0f2f5)' }}>
        <HeroCarousel />

        <QuickAccessCategories />
        <FeaturedBrands />

        {/* Featured Products Section */}
        <section aria-labelledby="featured-products-title">
          <Container maxWidth="lg" sx={{ py: 6 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography id="featured-products-title" variant="h4" component="h2" sx={{ fontWeight: 700, color: '#111827' }}>
                Featured Products
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Handpicked for you from our latest collection.
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {loading
                ? Array.from(new Array(8)).map((_, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <ProductSkeleton />
                    </Grid>
                  ))
                : enhancedProducts.slice(0, 8).map((product, index) => (
                    <Grid item xs={12} sm={6} md={3} key={product.id}>
                      <Fade in={true} timeout={800 + index * 100}>
                        <div>
                          <ProductCard product={product} />
                        </div>
                      </Fade>
                    </Grid>
                  ))}
            </Grid>
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button component={Link} href="/shop" variant="contained" size="large">
                View All Products
              </Button>
            </Box>
          </Container>
        </section>
        {/* Trust & Testimonials */}
        <section aria-label="Trust and Testimonials" className={styles.testimonialsSection}>
          <Box>
            <Container maxWidth="lg">
              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={4}>
                  <div className={styles.testimonialBox}>
                    <img src="/icons/Trust.svg" width={40} height={40} alt="Trust" className={styles.testimonialImage} />
                    <Typography variant="h6" className={styles.testimonialTitle}>100% Authentic Fabrics</Typography>
                    <Typography variant="body2" className={styles.testimonialText}>All products are guaranteed original and premium quality.</Typography>
                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div className={styles.testimonialBox}>
                    <img src="/icons/Delivery.svg" width={40} height={40} alt="Delivery" className={styles.testimonialImage} />
                    <Typography variant="h6" className={styles.testimonialTitle}>Fast Nationwide Delivery</Typography>
                    <Typography variant="body2" className={styles.testimonialText}>Get your order delivered anywhere in Pakistan within 2-3 days.</Typography>
                  </div>
                </Grid>
                <Grid item xs={12} md={4}>
                  <div className={styles.testimonialBox}>
                    <img src="/icons/Star.svg" width={40} height={40} alt="Star" className={styles.testimonialImage} />
                    <Typography variant="h6" className={styles.testimonialTitle}>Loved by Customers</Typography>
                    <Typography variant="body2" className={styles.testimonialText}>Thousands of 5-star reviews from happy customers nationwide.</Typography>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </section>

        {/* Trending Products Section */}
        <Fade in={!loading} timeout={1500}>
          <section aria-labelledby="trending-products-title">
            <Container maxWidth="lg" className={styles.newArrivalsSection}>
              <TrendingProducts />
            </Container>
          </section>
        </Fade>

        {/* Highlighted Features Section */}
        <HighlightedFeatures />

        {/* Newsletter Signup */}
        <section aria-label="Newsletter Signup">
          <Box sx={{ py: 8, backgroundColor: '#f9fafb' }}>
            <Container maxWidth="lg">
              <Fade in={true} timeout={1600}>
                <Box sx={{ backgroundColor: 'white', borderRadius: '24px', boxShadow: '0 8px 32px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
                  <Grid container alignItems="center">
                    <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
                      <Image
                        src="https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
                        alt="Fashionable clothes on a rack"
                        width={627}
                        height={627}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ p: { xs: 4, md: 6 }, textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography variant="h4" component="h2" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.5px' }}>
                          Stay in the Loop
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                          Subscribe to our newsletter for the latest updates, new arrivals, and exclusive offers.
                        </Typography>
                        <Box component="form" sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                          <TextField
                            label="Email Address"
                            variant="outlined"
                            fullWidth
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                          />
                          <Button 
                            variant="contained" 
                            type="submit" 
                            size="large"
                            startIcon={<MailOutlineIcon />}
                            sx={{ borderRadius: '12px', py: '15px', px: 4, whiteSpace: 'nowrap' }}
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
          </Box>
        </section>

        {/* Testimonials Section */}
        <Testimonials />

        {/* Featured Brands Section */}
        <section aria-label="Featured Brands">
          <Container maxWidth="lg" sx={{ py: 6 }}>
            <Typography variant="h4" component="h2" textAlign="center" gutterBottom sx={{ color: '#111827' }}>
              Featured Brands
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item>
                <div className={styles.brandLogoBox}>
  <img src="https://www.pngwing.com/pngs/180/120/png-transparent-digital-textile-printing-paper-logo-textile-text-logo.png" alt="Textile Digital Printing Logo" className={styles.brandImage} />
</div>
              </Grid>
              <Grid item>
                <div className={styles.brandLogoBox}>
  <img src="https://www.pngwing.com/pngs/1200/630/png-transparent-kerala-green-logo-global-organic-textile-standard.png" alt="Kerala Green Textile Logo" className={styles.brandImage} />
</div>
              </Grid>
              <Grid item>
                <div className={styles.brandLogoBox}>
  <img src="https://www.pngwing.com/pngs/4717/2606/png-transparent-textile-industry-stamp-logo.png" alt="Textile Industry Stamp Logo" className={styles.brandImage} />
</div>
              </Grid>
              <Grid item>
                <div className={styles.brandLogoBox}>
  <img src="https://www.pngwing.com/pngs/2299/937/png-transparent-super-cheap-fabrics-logo.png" alt="Super Cheap Fabrics Logo" className={styles.brandImage} />
</div>
              </Grid>
            </Grid>
          </Container>
        </section>

        {/* Instagram Feed */}
        <InstagramFeed />

        {/* Blog Preview */}
        <BlogPreview />

        {/* Features Section */}

      </Box>
      {/* Scroll to top button */}
      <ScrollTopButton />
    </>
      </CategoryProvider>
    </BlogProvider>
  );
}
