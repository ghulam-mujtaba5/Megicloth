"use client";

import { useState } from 'react';
import Box from '@mui/material/Box';
import HeroCarousel from './components/home/HeroCarousel';
import TrendingProducts from './components/home/TrendingProducts';
import Testimonials from './components/home/Testimonials';
import InstagramFeed from './components/home/InstagramFeed';
import BlogPreview from './components/home/BlogPreview';
import HighlightedFeatures from './components/home/HighlightedFeatures';
import QuickAccessCategories from './components/home/QuickAccessCategories';
import Newsletter from './components/home/Newsletter';
import FeaturedBrands from './components/home/FeaturedBrands';
import ScrollTopButton from './components/common/ScrollTopButton';
import FabricSearch from './components/common/FabricSearch';
import ProductsGrid from './components/product/ProductsGrid';

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
