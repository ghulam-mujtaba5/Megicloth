"use client";

import { useCart } from "../../context/CartContext";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import ProductCard from "../../components/product/ProductCard";
import ReviewForm from "../../components/product/ReviewForm";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductImageGallery from '../../components/product/ProductImageGallery';
import ProductInfo from '../../components/product/ProductInfo';
import { Product } from '../../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

interface ProductClientPageProps {
  product: Product | null;
  relatedProducts: Product[];
}

export default function ProductClientPage({ product, relatedProducts }: ProductClientPageProps) {
  const { addToCart } = useCart();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addStitching, setAddStitching] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [tabValue, setTabValue] = useState(0);
  
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'info' | 'warning' });

  useEffect(() => {
    if (product) setReviews(product.reviews || []);
  }, [product]);

    const finalPrice = useMemo(() => {
    if (!product) return 0;
    const basePrice = product.salePrice ?? product.price;
    return addStitching ? basePrice + (product.stitchingCost ?? 0) : basePrice;
  }, [product, addStitching]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return product?.rating || 0;
    return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  }, [reviews, product?.rating]);

  if (!product) {
    return (
      <Container sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h4" component="h1">Product Not Found</Typography>
        <Typography sx={{ mt: 2 }}>The product you are looking for does not exist.</Typography>
        <Link href="/products" passHref>
          <Button variant="contained" sx={{ mt: 3 }}>Back to Shop</Button>
        </Link>
      </Container>
    );
  }

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleAddToCart = () => {
    addToCart({ ...product, price: finalPrice });
    showSnackbar(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, price: finalPrice });
    router.push('/cart');
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) setQuantity(newQuantity);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    showSnackbar(isFavorite ? 'Removed from favorites' : 'Added to favorites', 'info');
  };

  const handleShare = async () => {
    try {
      await navigator.share({ title: product.name, text: product.description, url: window.location.href });
    } catch (error) {
      navigator.clipboard.writeText(window.location.href);
      showSnackbar('Link copied to clipboard!', 'info');
    }
  };

  const handleReviewSubmit = (newReview: any) => {
    setReviews([newReview, ...reviews]);
    showSnackbar('Thank you for your review!');
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box mb={3}>
          <Link href="/products" passHref>
            <Button startIcon={<ArrowBackIcon />} variant="text">Back to Collection</Button>
          </Link>
        </Box>
        <Grid container spacing={{ xs: 2, md: 6 }}>
          <Grid item xs={12} md={6} lg={7}>
            <ProductImageGallery images={product.images} productName={product.name} />
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <ProductInfo 
              product={product}
              reviews={reviews}
              averageRating={averageRating}
              finalPrice={finalPrice}
              isFavorite={isFavorite}
              addStitching={addStitching}
              quantity={quantity}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onQuantityChange={handleQuantityChange}
              onToggleFavorite={handleToggleFavorite}
              onShare={handleShare}
              onStitchingChange={(_, checked) => setAddStitching(checked)}
            />
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ bgcolor: 'grey.50', py: { xs: 5, md: 8 } }}>
        <Container maxWidth="lg">
          <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} centered sx={{ mb: 4, borderBottom: 1, borderColor: 'divider' }}>
            <Tab label="Details & Care" />
            <Tab label={`Reviews (${reviews.length})`} />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}><Typography><strong>Fabric:</strong> {product.fabric}</Typography></Grid>
                <Grid item xs={12} sm={6}><Typography><strong>Collection:</strong> {product.collection}</Typography></Grid>
                <Grid item xs={12}><Typography><strong>Care:</strong> Machine wash cold, tumble dry low.</Typography></Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <ReviewForm onSubmit={handleReviewSubmit} />
            <Divider sx={{ my: 4 }} />
            <Stack spacing={2}>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <Card key={index} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="subtitle1" fontWeight={600}>{review.author}</Typography>
                      <Rating value={review.rating} readOnly size="small" />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">{review.text}</Typography>
                  </Card>
                ))
              ) : <Typography align="center" color="text.secondary">Be the first to review this product!</Typography>}
            </Stack>
          </TabPanel>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 5, md: 8 } }}>
        <Typography variant="h4" component="h2" fontWeight={700} textAlign="center" mb={4}>You Might Also Like</Typography>
        <Swiper modules={[Navigation]} spaceBetween={isMobile ? 16 : 24} slidesPerView={isMobile ? 2 : 4} navigation>
          {relatedProducts.map(p => <SwiperSlide key={p.id}><ProductCard product={p} /></SwiperSlide>)}
        </Swiper>
      </Container>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(prev => ({...prev, open: false}))} TransitionComponent={Slide} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setSnackbar(prev => ({...prev, open: false}))} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
