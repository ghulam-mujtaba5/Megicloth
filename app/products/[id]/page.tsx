"use client";
import type { Metadata, ResolvingMetadata } from 'next';
import { products } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
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
import SizeGuideDialog from "../../components/SizeGuideDialog";
import ProductCard from "../../components/ProductCard";
import ReviewForm from "../../components/ReviewForm";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductImageGallery from '../../components/product/ProductImageGallery';
import ProductInfo from '../../components/product/ProductInfo';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = products.find(p => p.id === params.id);

  if (!product) {
    return {
      title: "Product Not Found | Megicloth",
      description: "The product you are looking for does not exist.",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${product.name} | Megicloth`,
    description: product.description,
    alternates: {
      canonical: `/products/${product.id}`,
    },
    openGraph: {
      title: product.name,
      description: product.description,
      url: `/products/${product.id}`,
      siteName: 'Megicloth',
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
        ...product.images.slice(1, 4).map(img => ({
          url: img,
          width: 800,
          height: 600,
          alt: `${product.name} image`,
        })),
        ...previousImages,
      ],
      locale: 'en_US',
      type: 'website',
    },
  };
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

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart, getCartItem } = useCart();
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

  const product = useMemo(() => products.find(p => p.id === params.id), [params.id]);

  useEffect(() => {
    if (product) {
      setReviews(product.reviews || []);
      const cartItem = getCartItem(product.id);
      if (cartItem) {
        setQuantity(cartItem.quantity);
      }
    }
  }, [product, getCartItem]);

  const finalPrice = useMemo(() => {
    if (!product) return 0;
    const basePrice = product.salePrice || product.price;
    return addStitching ? basePrice + (product.stitchingCost || 0) : basePrice;
  }, [product, addStitching]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  }, [reviews]);

  if (!product) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h5" color="text.secondary">
          Loading product...
        </Typography>
      </Box>
    );
  }

  const handleStitchingChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setAddStitching(checked);
  };

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      name: addStitching ? `${product.name} (Stitched)` : product.name,
      price: finalPrice,
      salePrice: addStitching ? finalPrice : product.salePrice,
    };
    addToCart(productToAdd, quantity);
    showSnackbar("Added to cart successfully!");
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    showSnackbar(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  const handleReviewSubmit = (newReview: any) => {
    setReviews(prevReviews => [newReview, ...prevReviews]);
    showSnackbar("Review submitted successfully!");
  };

  const handleBuyNow = () => {
    const productToAdd = {
      ...product,
      name: addStitching ? `${product.name} (Stitched)` : product.name,
      price: finalPrice,
      salePrice: addStitching ? finalPrice : product.salePrice,
    };
    addToCart(productToAdd, quantity);
    router.push('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showSnackbar("Link copied to clipboard!");
    }
  };

  return (
    <>
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
        <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
          <Slide direction="right" in={true} timeout={600}>
            <Button
              component={Link}
              href="/shop"
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              sx={{ mb: 3 }}
            >
              Back to Products
            </Button>
          </Slide>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <ProductImageGallery images={product.images} productName={product.name} />
            </Grid>
            <Grid item xs={12} md={6}>
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
                onStitchingChange={handleStitchingChange}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: { xs: 5, md: 8 }, border: '1px solid #e2e8f0', borderRadius: 4, p: { xs: 2, md: 4 }, background: '#ffffff' }}>
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
              aria-label="product details tabs"
              variant="fullWidth"
            >
              <Tab label="Description" />
              <Tab label="Specifications" />
              <Tab label="Reviews" />
              <Tab label="Shipping & Returns" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {product.description}
              </Typography>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Fabric Type</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{product.category}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Material</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{product.group}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Measurements</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{product.description}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Origin</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>Pakistan</Typography>
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
          </Box>

          <Box sx={{ mt: { xs: 5, md: 8 } }}>
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
          </Box>
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