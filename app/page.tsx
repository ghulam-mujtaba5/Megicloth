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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import StarIcon from "@mui/icons-material/Star";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EmailIcon from "@mui/icons-material/Email";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CelebrationIcon from '@mui/icons-material/Celebration';
import Seo from "./components/Seo";
import Image from 'next/image';
import Head from "next/head";

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
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<'idle'|'success'|'error'>('idle');
  const [showConfetti, setShowConfetti] = useState(false);

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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setNewsletterStatus('error');
      return;
    }
    setNewsletterStatus('success');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1800);
    setTimeout(() => setNewsletterStatus('idle'), 2500);
    setNewsletterEmail("");
  };

  return (
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
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
        {/* Hero Section */}
        <section aria-label="Hero" style={{ outline: 'none', position: 'relative', minHeight: '380px' }}>
          {/* Hero background image */}
          <Box sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            background: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80) center/cover no-repeat',
            opacity: 0.22,
            filter: 'blur(1.5px) saturate(1.2)',
          }} aria-hidden="true" />
          {/* Glassmorphism overlay for text readability */}
          <Box sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            background: 'linear-gradient(135deg, rgba(37,99,235,0.85) 0%, rgba(16,185,129,0.85) 100%)',
            backdropFilter: 'blur(6px)',
          }} aria-hidden="true" />
          <Box sx={{ py: { xs: 6, md: 10 }, color: '#fff', textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <Container maxWidth="md">
              <Fade in={true} timeout={800}>
                <Box>
                  <h1
                    style={{
                      fontWeight: 900,
                      fontSize: '2.5rem',
                      marginBottom: 16,
                      letterSpacing: '-2px',
                      background: 'linear-gradient(45deg, #fff 60%, #bbf7d0 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '0 4px 24px #10b98133',
                      animation: 'floatHero 3.5s ease-in-out infinite',
                    }}
                  >
                    Discover Premium Unstitched Fabrics
                  </h1>
                  {/* Special Offer Tagline/Callout */}
                  <Box sx={{
                    display: 'inline-block',
                    px: 3,
                    py: 1.2,
                    mb: 2.5,
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.18)',
                    boxShadow: '0 2px 12px #10b98122',
                    fontWeight: 800,
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    color: '#fff',
                    letterSpacing: '0.5px',
                    border: '1.5px solid #bbf7d0',
                    backdropFilter: 'blur(2px)',
                    textShadow: '0 2px 8px #2563eb33',
                    transition: 'background 0.2s',
                    outline: 'none',
                    mx: 'auto',
                    maxWidth: 420,
                  }}>
                    Summer Sale: <span style={{ color: '#bbf7d0', fontWeight: 900 }}>Up to 30% Off</span> – Limited Time Only!
                  </Box>
                  <Typography component="h2" variant="h5" sx={{ mb: 4, fontWeight: 500, color: 'rgba(255,255,255,0.92)' }}>
                    Elevate your wardrobe with the finest lawn, cotton, and embroidered fabrics. Fast delivery, easy returns, and unbeatable prices.
                  </Typography>
                  {/* Shop Now button removed as per request */}
                </Box>
              </Fade>
            </Container>
          </Box>
          {/* Floating animation keyframes */}
          <style>{`
            @keyframes floatHero {
              0% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
              100% { transform: translateY(0); }
            }
          `}</style>
        </section>
        {/* Featured Products */}
        <section aria-label="Featured Products">
          <Box sx={{ width: '100%', maxWidth: '1600px', mx: 'auto', py: { xs: 6, md: 10 }, px: { xs: 1, sm: 2, md: 4 } }}>
            <Slide direction="up" in={true} timeout={900}>
              <Box>
                <Typography component="h2" variant="h2" sx={{ fontWeight: 800, textAlign: 'center', mb: 4, letterSpacing: '-1px', background: 'linear-gradient(45deg, #1e293b 30%, #2563eb 90%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Featured Products
                </Typography>
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
                          <IconButton onClick={handleClearSearch} size="small" aria-label="Clear search">
                            <ClearIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{ 'aria-label': 'Search products' }}
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
                        outline: 'none',
                        transition: 'box-shadow 0.2s',
                      },
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 4, flexWrap: 'wrap' }}>
                  <Chip
                    label="All"
                    onClick={() => handleCategorySelect(null)}
                    color={selectedCategory === null ? 'primary' : 'default'}
                    sx={{ fontWeight: 600, outline: 'none', '&:focus, &:hover': { background: '#2563eb', color: '#fff' } }}
                    tabIndex={0}
                    aria-label="Show all categories"
                  />
                  {categories.map((category: string) => (
                    <Chip
                      key={category}
                      label={category}
                      onClick={() => handleCategorySelect(category)}
                      color={selectedCategory === category ? 'primary' : 'default'}
                      sx={{ fontWeight: 600, outline: 'none', '&:focus, &:hover': { background: '#2563eb', color: '#fff' } }}
                      tabIndex={0}
                      aria-label={`Show category: ${category}`}
                    />
                  ))}
                </Box>
                <Grid container spacing={{ xs: 2, sm: 4, md: 5 }} justifyContent="center" wrap="wrap">
                  {filteredProducts.length === 0 && !loading ? (
                    <Grid item xs={12}>
                      <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Image
                          src="/empty-state.svg"
                          alt="No products found"
                          width={180}
                          height={180}
                          style={{ opacity: 0.7 }}
                          loading="lazy"
                        />
                        <Typography variant="h5" sx={{ mt: 2, color: '#64748b', fontWeight: 600 }}>
                          No products found. Try a different search or category!
                        </Typography>
                      </Box>
                    </Grid>
                  ) : loading ? (
                    Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
                  ) : (
                    filteredProducts.map((product, idx) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                        <Card
                          sx={{
                            width: '100%',
                            minWidth: 300,
                            maxWidth: 360,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            background: 'rgba(255,255,255,0.25)',
                            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
                            backdropFilter: 'blur(8px)',
                            borderRadius: 4,
                            border: '1.5px solid rgba(255,255,255,0.18)',
                            transition: 'transform 0.18s, box-shadow 0.18s',
                            '&:hover': {
                              transform: 'translateY(-6px) scale(1.03)',
                              boxShadow: '0 16px 40px 0 rgba(16,185,129,0.18)',
                            },
                          }}
                        >
                          {/* Badge for Best Seller/New Arrival */}
                          {idx === 0 && (
                            <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>
                              <Chip label="Best Seller" color="success" sx={{ fontWeight: 700, fontSize: '0.95rem', px: 1.5, boxShadow: 2, background: 'linear-gradient(90deg,#10b981,#2563eb)', color: '#fff' }} />
                            </Box>
                          )}
                          {idx === 1 && (
                            <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>
                              <Chip label="New Arrival" color="primary" sx={{ fontWeight: 700, fontSize: '0.95rem', px: 1.5, boxShadow: 2, background: 'linear-gradient(90deg,#2563eb,#10b981)', color: '#fff' }} />
                            </Box>
                          )}
                          <CardContent>
                            <ProductCard product={product} />
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  )}
                </Grid>
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
                        outline: 'none',
                        transition: 'all 0.2s',
                        '&:hover, &:focus': {
                          borderWidth: 2,
                          transform: 'translateY(-2px) scale(1.04)',
                          borderColor: '#10b981',
                          color: '#10b981',
                        },
                      }}
                    >
                      View All Products
                    </Button>
                  </Box>
                )}
              </Box>
            </Slide>
          </Box>
        </section>
        {/* Trust & Testimonials */}
        <section aria-label="Trust and Testimonials">
          <Box sx={{ background: 'rgba(255,255,255,0.65)', py: { xs: 6, md: 10 }, borderTop: '1.5px solid #e2e8f0', borderBottom: '1.5px solid #e2e8f0' }}>
            <Container maxWidth="lg">
              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <VerifiedUserIcon sx={{ fontSize: 40, color: '#10b981', mb: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>100% Authentic Fabrics</Typography>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>All products are guaranteed original and premium quality.</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <LocalShippingIcon sx={{ fontSize: 40, color: '#2563eb', mb: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Fast Nationwide Delivery</Typography>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>Get your order delivered anywhere in Pakistan within 2-3 days.</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <StarIcon sx={{ fontSize: 40, color: '#f59e0b', mb: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Loved by Customers</Typography>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>Thousands of 5-star reviews from happy customers nationwide.</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </section>
        {/* Newsletter Signup */}
        <section aria-label="Newsletter Signup">
          <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
            <Fade in={true} timeout={900}>
              <Box sx={{ textAlign: 'center', background: 'rgba(255,255,255,0.65)', borderRadius: 4, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.08)', p: { xs: 3, md: 5 } }}>
                <Typography component="h2" variant="h4" sx={{ fontWeight: 800, mb: 2, color: '#1e293b' }}>
                  Join Our Newsletter
                </Typography>
                <Typography variant="body1" sx={{ color: '#64748b', mb: 3 }}>
                  Get exclusive offers, new arrivals, and style tips delivered to your inbox.
                </Typography>
                <Box aria-label="Newsletter signup" role="form" component="form" onSubmit={handleNewsletterSubmit} sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <TextField
                    type="email"
                    placeholder="Enter your email"
                    size="medium"
                    sx={{ minWidth: 260, background: '#f7fafc', borderRadius: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    required
                    inputProps={{ 'aria-label': 'Email address' }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      background: 'linear-gradient(45deg, #2563eb, #10b981)',
                      color: '#fff',
                      fontWeight: 700,
                      px: 4,
                      borderRadius: 2,
                      '&:hover': {
                        background: 'linear-gradient(45deg, #10b981, #2563eb)',
                      },
                    }}
                  >
                    Subscribe
                  </Button>
                </Box>
                {newsletterStatus === 'success' && (
                  <Fade in={newsletterStatus === 'success'}>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#10b981', mt: 2 }}>
                      <CheckCircleIcon sx={{ mr: 1 }} />
                      <Typography>Thank you for subscribing!</Typography>
                      {showConfetti && <CelebrationIcon sx={{ ml: 1, color: '#f59e0b', fontSize: 32, animation: 'spin 1.2s linear' }} />}
                    </Box>
                  </Fade>
                )}
                {newsletterStatus === 'error' && (
                  <Fade in={newsletterStatus === 'error'}>
                    <Typography sx={{ color: '#ef4444', mt: 2 }}>Please enter a valid email address.</Typography>
                  </Fade>
                )}
              </Box>
            </Fade>
          </Container>
        </section>
        {/* Features Section */}
        <section aria-label="Shop Features">
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
          </Container>
        </section>
      </Box>
      {/* Scroll to top button */}
      <ScrollTopButton />
    </>
  );
}
