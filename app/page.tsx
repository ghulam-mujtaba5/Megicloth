import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import HeroCarousel from './components/home/HeroCarousel';
import TrendingProducts from './components/home/TrendingProducts';
import InstagramFeed from './components/home/InstagramFeed';
import BlogPreview from './components/home/BlogPreview';
import HighlightedFeatures from './components/home/HighlightedFeatures';
import QuickAccessCategories from './components/home/QuickAccessCategories';
import Newsletter from './components/home/Newsletter';
import FeaturedBrands from './components/home/FeaturedBrands';
import ScrollTopButton from './components/common/ScrollTopButton';
import TestimonialsList from './components/testimonials/TestimonialsList';
import TestimonialForm from './components/testimonials/TestimonialForm';
import ProductSearchSection from './components/home/ProductSearchSection';
import { getPublishedTestimonials } from './lib/actions/testimonials';

export default async function HomePage() {
  const testimonials = await getPublishedTestimonials();

  return (
    <>
      <Box component="main" sx={{ backgroundColor: 'var(--neutral-50)' }}>
        <HeroCarousel />
        <QuickAccessCategories />
        <TrendingProducts />
        <HighlightedFeatures />
        <ProductSearchSection />
        <FeaturedBrands />
        <TestimonialsList testimonials={testimonials} />
        <InstagramFeed />
        <BlogPreview />
        <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
          <TestimonialForm />
        </Container>
        <Newsletter />
      </Box>
      <ScrollTopButton />
    </>
  );
}
