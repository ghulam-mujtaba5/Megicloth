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
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SizeGuideDialog from "../../components/product/SizeGuideDialog";
import ProductCard from "../../components/product/ProductCard";
import ReviewForm from "../../components/product/ReviewForm";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductImageGallery from '../../components/product/ProductImageGallery';
import ProductInfo from '../../components/product/ProductInfo';
import { Product } from '../../data/products';

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
  product: Product | undefined;
  relatedProducts: Product[];
}

export default function ProductClientPage({ product, relatedProducts }: ProductClientPageProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [addStitching, setAddStitching] = useState(false);
  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const finalPrice = useMemo(() => {
    if (!product) return 0;
    const basePrice = product.salePrice || product.price;
    return addStitching ? basePrice + (product.stitchingCost || 0) : basePrice;
  }, [product, addStitching]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  }, [reviews]);

  useEffect(() => {
    if (product) {
      setReviews(product.reviews || []);
    }
  }, [product]);

  if (!product) {
    return (
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h4" component="h1">Product Not Found</Typography>
        <Typography sx={{ mt: 2 }}>The product you are looking for does not exist or may have been moved.</Typography>
        <Link href="/products" passHref>
          <Button variant="contained" sx={{ mt: 3 }}>Back to Shop</Button>
        </Link>
      </Box>
    );
  }

  const handleStitchingChange = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setAddStitching(checked);
  };

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      showSnackbar(`${product.name} added to cart!`);
    } else {
      showSnackbar("Could not add product to cart.");
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= (product?.stock || 0)) {
      setQuantity(newQuantity);
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    showSnackbar(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  const handleReviewSubmit = (newReview: any) => {
    setReviews([newReview, ...reviews]);
    showSnackbar("Thank you for your review!");
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      router.push('/cart');
    } else {
      showSnackbar("Could not process purchase.");
    }
  };

  const handleShare = async () => {
    if (navigator.share && product) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this amazing product: ${product.name}`,
          url: window.location.href,
        });
        showSnackbar("Product shared successfully!");
      } catch (error) {
        showSnackbar("Failed to share product.");
      }
    }
  };

  return (
    <>
      <Box sx={{ background: '#f8fafc', py: { xs: 2, md: 3 } }}>
        <Container maxWidth="xl">
          <Link href="/products" passHref>
            <Button startIcon={<ArrowBackIcon />} sx={{ mb: 2, color: 'text.secondary', fontWeight: 600 }}>
              Back to Products
            </Button>
          </Link>
          <Grid container spacing={{ xs: 3, md: 5 }}>
            <Grid item xs={12} md={6}>
              <ProductImageGallery images={product.images} productName={product.name} />
            </Grid>
            <Grid item xs={12} md={6}>
              <ProductInfo
                product={product}
                reviews={reviews}
                averageRating={averageRating}
                finalPrice={finalPrice}
                quantity={quantity}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={isFavorite}
                onShare={handleShare}
                addStitching={addStitching}
                onStitchingChange={handleStitchingChange}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={(_, val) => setTabValue(val)} aria-label="product details tabs">
              <Tab label="Description" />
              <Tab label="Specifications" />
              <Tab label="Reviews" />
              <Tab label="Shipping & Returns" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              {product.description}
            </Typography>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Fabric</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{product.fabricType}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Measurements</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{product.measurements}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">SKU</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{product.sku}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Care</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      Machine wash cold, tumble dry low
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <ReviewForm onSubmit={handleReviewSubmit} />
            <Divider sx={{ my: 4 }} />
            <Box>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <Card key={index} sx={{ mb: 2, p: 2, background: '#f8fafc' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6">{review.author}</Typography>
                      <Rating value={review.rating} readOnly />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {review.text}
                    </Typography>
                  </Card>
                ))
              ) : (
                <Typography>No reviews yet. Be the first to review!</Typography>
              )}
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>Shipping Information</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <LocalShippingIcon sx={{ color: '#10b981' }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Standard Delivery: {product.deliveryTime || '2-3 business days'}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Free shipping on all orders above PKR 2,500.
              </Typography>

              <Typography variant="h6" sx={{ mb: 2 }}>Return Policy</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <RefreshIcon sx={{ color: '#2563eb' }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  7-Day Return Policy
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Easy returns within 7 days. Return shipping is free
              </Typography>
            </Box>
          </TabPanel>
        </Container>
      </Box>

      <Box sx={{ mt: { xs: 5, md: 8 }, mb: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, textAlign: 'center' }}>
            You Might Also Like
          </Typography>
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={isMobile ? 1 : 4}
            navigation
          >
            {relatedProducts.map(relatedProduct => (
              <SwiperSlide key={relatedProduct.id}>
                <ProductCard product={relatedProduct} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        TransitionComponent={Slide}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <SizeGuideDialog open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </>
  );
}
