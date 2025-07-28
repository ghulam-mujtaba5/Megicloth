"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Image from 'next/image';
import styles from './page.module.css';
import HeroCarousel from './components/HeroCarousel';
import TrendingProducts from './components/TrendingProducts';
import Testimonials from './components/Testimonials';
import InstagramFeed from './components/InstagramFeed';
import BlogPreview from './components/BlogPreview';
import HighlightedFeatures from './components/HighlightedFeatures';
import QuickAccessCategories from './components/QuickAccessCategories';
import Newsletter from './components/Newsletter';
import { products } from "./data/products";
import ProductCard from "./components/ProductCard";
import Skeleton from "@mui/material/Skeleton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ScrollTopButton from "./components/ScrollTopButton";
import FabricSearch from "./components/FabricSearch";
import FeaturedBrands from './components/FeaturedBrands';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");



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

            <FabricSearch onSearchChange={setSearchQuery} />

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

            <Newsletter />

            <Testimonials />

            <FeaturedBrands />

            <InstagramFeed />
            <BlogPreview />

          </Box>
          <ScrollTopButton />
        </>
  );
}
