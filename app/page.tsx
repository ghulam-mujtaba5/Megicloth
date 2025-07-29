"use client";

import { useState } from 'react';
import Box from '@mui/material/Box';
import HeroCarousel from './components/HeroCarousel';
import TrendingProducts from './components/TrendingProducts';
import Testimonials from './components/Testimonials';
import InstagramFeed from './components/InstagramFeed';
import BlogPreview from './components/BlogPreview';
import HighlightedFeatures from './components/HighlightedFeatures';
import QuickAccessCategories from './components/QuickAccessCategories';
import Newsletter from './components/Newsletter';
import ScrollTopButton from './components/ScrollTopButton';
import FabricSearch from './components/FabricSearch';
import FeaturedBrands from './components/FeaturedBrands';
import ProductsGrid from './components/ProductsGrid';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  // This will be replaced with real data fetching logic
  const loading = false;

  return (
    <>
      <Box component="main" sx={{ backgroundColor: 'var(--neutral-50)' }}>
        <HeroCarousel />
        <QuickAccessCategories />
        <TrendingProducts />
        <HighlightedFeatures />
        <FabricSearch onSearchChange={setSearchQuery} />
        <ProductsGrid searchQuery={searchQuery} loading={loading} />
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
