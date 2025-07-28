"use client";
import { products } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import ImageZoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import RefreshIcon from "@mui/icons-material/Refresh";
import SecurityIcon from "@mui/icons-material/Security";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import Zoom from '@mui/material/Zoom';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LockIcon from '@mui/icons-material/Lock';
import Seo from "../../components/Seo";
import SizeGuideDialog from "../../components/SizeGuideDialog";
import ProductCard from "../../components/ProductCard";
import ReviewForm from "../../components/ReviewForm";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

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

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart, isInCart, getCartItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
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

  const enhancedProduct = useMemo(() => {
    if (!product) return null;
    return {
      ...product,
      tags: product.category === 'Men' ? ['Premium', 'Comfortable', 'Lawn'] : ['Elegant', 'Stylish', 'Embroidered'],
      fabricType: product.category === 'Men' ? 'Lawn' : 'Embroidered Lawn',
      measurements: product.category === 'Men' ? '3.5 meters' : '3-piece set',
      deliveryTime: '2-3 days',
      returnPolicy: '7 days',
      brand: 'Megicloth',
      material: product.category === 'Men' ? '100% Cotton Lawn' : 'Premium Embroidered Lawn',
      care: 'Machine wash cold, tumble dry low',
      origin: 'Pakistan',
      images: [
        product.image,
        product.image.replace('.jpg', '-2.jpg'),
        product.image.replace('.jpg', '-3.jpg'),
        product.image.replace('.jpg', '-4.jpg'),
      ],
      reviews: product.reviews || [],
      specifications: {
        'Fabric': product.category === 'Men' ? 'Premium Lawn' : 'Embroidered Lawn',
        'Pieces': product.category === 'Men' ? '1' : '3',
        'Category': product.category,
        'SKU': `MGC-${product.id.slice(0, 4).toUpperCase()}`,
        'Weight': '120 GSM',
        'Width': '2.5 meters',
        'Length': product.category === 'Men' ? '3.5 meters' : '3-piece set',
        'Care Instructions': 'Machine wash cold, tumble dry low',
        'Origin': 'Pakistan',
        'Brand': 'Megicloth',
      },
    };
  }, [product]);

  useEffect(() => {
    if (enhancedProduct) {
      setReviews(enhancedProduct.reviews);
    }
  }, [enhancedProduct]);

  const finalPrice = useMemo(() => {
    if (!product) return 0;
    const basePrice = product.salePrice || product.price;
    return addStitching ? basePrice + (product.stitchingCost || 0) : basePrice;
  }, [product, addStitching]);

  // Related products
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  // Initialize quantity from cart
  useEffect(() => {
    if (product) {
      const cartItem = getCartItem(product.id);
      if (cartItem) {
        setQuantity(cartItem.quantity);
      }
    }
  }, [product, getCartItem]);

  if (!product || !enhancedProduct) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h5" color="text.secondary">
          Product not found
        </Typography>
      </Box>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const discountPercentage = product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  }, [reviews]);

  const handleAddToCart = () => {
    if (!product) return;

    const productToAdd = {
      ...product,
      name: addStitching ? `${product.name} (Stitched)` : product.name,
      price: finalPrice,
      salePrice: addStitching ? finalPrice : product.salePrice,
    };

    addToCart(productToAdd, quantity);
    setSnackbarMessage("Added to cart successfully!");
    setSnackbarOpen(true);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    setSnackbarMessage(isFavorite ? "Removed from favorites" : "Added to favorites");
    setSnackbarOpen(true);
  };

  const handleReviewSubmit = (newReview: any) => {
    setReviews(prevReviews => [newReview, ...prevReviews]);
    setSnackbarMessage("Review submitted successfully!");
    setSnackbarOpen(true);
  };

  const handleBuyNow = () => {
    if (!product) return;

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
      setSnackbarMessage("Link copied to clipboard!");
      setSnackbarOpen(true);
    }
  };

  // Glassmorphism style for main product info card
  const glassCardSx = {
    borderRadius: 4,
    background: 'rgba(255,255,255,0.65)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.25)',
    overflow: 'hidden',
    p: { xs: 2, md: 4 },
  };

  // Neomorphic style for image gallery and info chips
  const neoBoxSx = {
    borderRadius: 4,
    background: '#f7fafc',
    boxShadow: '8px 8px 24px #e2e8f0, -8px -8px 24px #ffffff',
    border: '1.5px solid #e2e8f0',
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
    '&:hover': {
      boxShadow: '0 12px 32px rgba(31,38,135,0.10), 0 1.5px 8px #e0e7ef',
      borderColor: '#cbd5e1',
    },
  };

  // Neomorphic style for buttons
  const neoButtonSx = {
    background: '#f7fafc',
    boxShadow: '2px 2px 8px #e2e8f0, -2px -2px 8px #ffffff',
    borderRadius: 2,
    fontWeight: 700,
    color: '#2563eb',
    '&:hover': {
      background: '#e2e8f0',
      color: '#1e40af',
      boxShadow: '0 4px 16px #2563eb22',
    },
  };

  return (
    <>
      <Seo
        title={product ? `${product.name} | Megicloth` : "Product Not Found | Megicloth"}
        description={product ? product.description : "This product could not be found."}
        ogImage={product ? product.image : "/file.svg"}
        canonical={`https://megicloth.com/products/${params.id}`}
      />
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
        <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
          {/* Back Button */}
          <Slide direction="right" in={true} timeout={600}>
            <Button
              component={Link}
              href="/shop"
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              sx={{ ...neoButtonSx, mb: 3 }}
            >
              Back to Products
            </Button>
          </Slide>
          <Grid container spacing={4}>
            {/* Product Images (Neomorphic) */}
            <Grid item xs={12} md={6}>
              <Box sx={neoBoxSx}>
                {/* Main Image */}
                <Card
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    mb: 2,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  }}
                >
                  <ImageZoom>
                    <CardMedia
                      component="img"
                      height={isMobile ? 300 : 400}
                      image={enhancedProduct.images[selectedImage]}
                      alt={product.name}
                      sx={{ objectFit: 'cover' }}
                    />
                  </ImageZoom>
                </Card>

                {/* Thumbnail Images */}
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {enhancedProduct.images.map((image, index) => (
                    <Card
                      key={index}
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 2,
                        cursor: 'pointer',
                        border: selectedImage === index ? '3px solid #2563eb' : '1px solid #e2e8f0',
                        overflow: 'hidden',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                      onClick={() => setSelectedImage(index)}
                    >
                      <CardMedia
                        component="img"
                        height={80}
                        image={image}
                        alt={`${product.name} ${index + 1}`}
                        sx={{ objectFit: 'cover' }}
                      />
                    </Card>
                  ))}
                </Box>
              </Box>
            </Grid>
            {/* Product Info (Glassmorphism) */}
            <Grid item xs={12} md={6}>
              <Box sx={glassCardSx}>
                {/* Product Tags */}
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  {enhancedProduct.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        borderColor: '#e2e8f0',
                        color: '#64748b',
                      }}
                    />
                  ))}
                </Box>

                {/* Product Name */}
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '1.75rem', md: '2.5rem' },
                    fontWeight: 800,
                    mb: 2,
                    color: '#1e293b',
                    lineHeight: 1.2,
                  }}
                >
                  {product.name}
                </Typography>

                {/* Rating */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating
                    value={averageRating}
                    precision={0.1}
                    readOnly
                    sx={{
                      '& .MuiRating-iconFilled': {
                        color: '#fbbf24',
                      },
                    }}
                  />
                  <Typography variant="body2" sx={{ ml: 1, color: '#64748b' }}>
                    ({reviews.length} reviews)
                  </Typography>
                </Box>

                {/* Price */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: '#10b981',
                        fontSize: { xs: '1.75rem', md: '2rem' },
                      }}
                    >
                      {formatPrice(finalPrice)}
                    </Typography>
                    {product.salePrice && (
                      <Typography
                        variant="h5"
                        sx={{
                          textDecoration: 'line-through',
                          color: '#94a3b8',
                          fontWeight: 600,
                        }}
                      >
                        {formatPrice(product.price + (addStitching ? (product.stitchingCost || 0) : 0))}
                      </Typography>
                    )}
                  </Box>
                  {product.deliveryTime && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 2, color: 'text.secondary' }}>
                      <LocalShippingIcon fontSize="small" />
                      <Typography variant="body2">Estimated Delivery: {product.deliveryTime}</Typography>
                    </Box>
                  )}
                  {product.salePrice && (
                    <Chip
                      label={`${discountPercentage}% OFF`}
                      color="error"
                      sx={{
                        fontWeight: 700,
                        background: 'linear-gradient(45deg, #ef4444, #dc2626)',
                        color: '#ffffff',
                      }}
                    />
                  )}
                </Box>

                {/* Description */}
                <Typography
                  variant="body1"
                  sx={{
                    color: '#475569',
                    lineHeight: 1.6,
                    mb: 3,
                  }}
                >
                  {product.description}
                </Typography>

                {/* Product Details */}
                <Box sx={{ mb: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Fabric Type
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {enhancedProduct.fabricType}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Measurements
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {enhancedProduct.measurements}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Stock
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: product.stock > 0 ? '#10b981' : '#ef4444' }}>
                        {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Brand
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {enhancedProduct.brand}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>

                {/* Quantity and Actions */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Quantity
                    </Typography>
                    <Button variant="text" onClick={() => setSizeGuideOpen(true)} sx={{ textTransform: 'none' }}>
                      Size Guide
                    </Button>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <TextField
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      inputProps={{
                        min: 1,
                        max: product.stock,
                        style: { textAlign: 'center' },
                      }}
                      sx={{
                        width: 100,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        },
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      of {product.stock} available
                    </Typography>
                  </Box>
                  {product.stitchingAvailable && (
                    <Box sx={{ my: 2 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={addStitching}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddStitching(e.target.checked)}
                            name="stitching"
                          />
                        }
                        label={`Add Stitching (+${formatPrice(product.stitchingCost || 0)})`}
                      />
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                      onClick={handleBuyNow}
                      variant="contained"
                      color="secondary"
                      disabled={product.stock === 0}
                      sx={{
                        background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        fontWeight: 700,
                        fontSize: '1rem',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #d97706, #b45309)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      Buy Now
                    </Button>
                    <Button
                      onClick={handleAddToCart}
                      variant="contained"
                      disabled={product.stock === 0}
                      startIcon={<ShoppingCartIcon />}
                      sx={{
                        background: 'linear-gradient(45deg, #2563eb, #1e40af)',
                        color: '#ffffff',
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        fontWeight: 700,
                        fontSize: '1rem',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #1e40af, #1e3a8a)',
                          transform: 'translateY(-2px)',
                        },
                        '&:disabled': {
                          background: '#e2e8f0',
                          color: '#94a3b8',
                          transform: 'none',
                        },
                      }}
                    >
                      {isInCart(product.id) ? 'Update Cart' : 'Add to Cart'}
                    </Button>

                    <IconButton
                      onClick={handleToggleFavorite}
                      sx={{
                        border: '2px solid #e2e8f0',
                        color: isFavorite ? '#ef4444' : '#64748b',
                        '&:hover': {
                          borderColor: isFavorite ? '#ef4444' : '#2563eb',
                          color: isFavorite ? '#dc2626' : '#2563eb',
                        },
                      }}
                    >
                      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>

                    <IconButton
                      onClick={handleShare}
                      sx={{
                        border: '2px solid #e2e8f0',
                        color: '#64748b',
                        '&:hover': {
                          borderColor: '#2563eb',
                          color: '#2563eb',
                        },
                      }}
                    >
                      <ShareIcon />
                    </IconButton>
                    <SizeGuideDialog open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
                  </Box>
                </Box>

                {/* Delivery Info */}
                <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <LocalShippingIcon />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Free delivery on orders over Rs. 2,000
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Estimated delivery: {enhancedProduct.deliveryTime}
                  </Typography>
                </Alert>

                {/* Security Info */}
                <Alert severity="success" sx={{ borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SecurityIcon />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Secure payment & {enhancedProduct.returnPolicy} returns
                    </Typography>
                  </Box>
                </Alert>
              </Box>
            </Grid>
          </Grid>

          {/* Trust badges above product info */}
          <Box aria-label="Trust badges" role="region" sx={{ display: 'flex', gap: 3, justifyContent: 'center', mb: 4 }}>
            <Zoom in={true}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, borderRadius: 2, background: '#f0fdf4', boxShadow: 1, transition: 'transform 0.2s', '&:hover, &:focus': { transform: 'scale(1.08)', background: '#bbf7d0' } }} tabIndex={0}><VerifiedUserIcon sx={{ color: '#10b981', fontSize: 22 }} /><Typography variant="body2" sx={{ color: '#64748b' }}>100% Authentic</Typography></Box></Zoom>
            <Zoom in={true}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, borderRadius: 2, background: '#eff6ff', boxShadow: 1, transition: 'transform 0.2s', '&:hover, &:focus': { transform: 'scale(1.08)', background: '#bae6fd' } }} tabIndex={0}><LocalShippingIcon sx={{ color: '#2563eb', fontSize: 22 }} /><Typography variant="body2" sx={{ color: '#64748b' }}>Fast Delivery</Typography></Box></Zoom>
            <Zoom in={true}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, borderRadius: 2, background: '#fef9c3', boxShadow: 1, transition: 'transform 0.2s', '&:hover, &:focus': { transform: 'scale(1.08)', background: '#fde68a' } }} tabIndex={0}><LockIcon sx={{ color: '#f59e0b', fontSize: 22 }} /><Typography variant="body2" sx={{ color: '#64748b' }}>Secure Payments</Typography></Box></Zoom>
          </Box>

          {/* Product Details Tabs */}
          <Box sx={{ mt: 6 }}>
            <Fade in={true} timeout={1200}>
              <Card sx={{ borderRadius: 3, background: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Tabs
                    value={tabValue}
                    onChange={(_, newValue) => setTabValue(newValue)}
                    sx={{
                      borderBottom: 1,
                      borderColor: 'divider',
                      mb: 3,
                      '& .MuiTab-root': {
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '1rem',
                      },
                    }}
                  >
                    <Tab label="Description" />
                    <Tab label="Specifications" />
                    <Tab label="Reviews" />
                    <Tab label="Shipping & Returns" />
                  </Tabs>

                  <TabPanel value={tabValue} index={0}>
                    <Typography variant="body1" sx={{ lineHeight: 1.8, color: '#475569' }}>
                      {product.description}
                      <br /><br />
                      This premium fabric is carefully selected to provide the best quality and comfort. 
                      Perfect for creating beautiful traditional and modern garments. The fabric is 
                      breathable, durable, and easy to maintain, making it ideal for everyday wear.
                    </Typography>
                  </TabPanel>

                                    <TabPanel value={tabValue} index={1}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        Product Specifications
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary">Fabric Type</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>{enhancedProduct.fabricType}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary">Material</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>{enhancedProduct.material}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary">Measurements</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>{enhancedProduct.measurements}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary">Origin</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>{enhancedProduct.origin}</Typography>
                        </Grid>
                      </Grid>
                      <Divider sx={{ my: 3 }} />
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        Care Instructions
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#475569' }}>
                        {enhancedProduct.care}
                      </Typography>
                    </Box>
                  </TabPanel>

                                    <TabPanel value={tabValue} index={2}>
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Rating value={averageRating} precision={0.1} readOnly />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {averageRating.toFixed(1)} out of 5
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Based on {reviews.length} reviews
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      {reviews.map((review) => (
                        <Box key={review.id}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              {review.name}
                            </Typography>
                            <Rating value={review.rating} readOnly size="small" />
                          </Box>
                          <Typography variant="body2" sx={{ color: '#475569', mb: 1 }}>
                            {review.comment}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(review.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    <Divider sx={{ my: 4 }} />

                    <ReviewForm productId={product.id} onSubmit={handleReviewSubmit} />
                  </TabPanel>

                  <TabPanel value={tabValue} index={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                          Shipping Information
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <LocalShippingIcon sx={{ color: '#10b981' }} />
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            Standard Delivery: {enhancedProduct.deliveryTime}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          Free shipping on orders over Rs. 2,000. Orders below Rs. 2,000 have a 
                          shipping fee of Rs. 200.
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                          Return Policy
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <RefreshIcon sx={{ color: '#3b82f6' }} />
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {enhancedProduct.returnPolicy} Return Policy
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          Easy returns within {enhancedProduct.returnPolicy}. Return shipping is free 
                          for defective items. Contact our customer support for assistance.
                        </Typography>
                      </Grid>
                    </Grid>
                  </TabPanel>
                </CardContent>
              </Card>
            </Fade>
          </Box>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <Box sx={{ mt: 8 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#1e293b' }}>
                Related Products
              </Typography>
              <Swiper
                modules={[Navigation]}
                spaceBetween={30}
                slidesPerView={4}
                navigation
                breakpoints={{
                  320: { slidesPerView: 1, spaceBetween: 10 },
                  640: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 4, spaceBetween: 30 },
                }}
              >
                {relatedProducts.map((rp) => (
                  <SwiperSlide key={rp.id}>
                    <ProductCard product={rp} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          )}
        </Container>

        {/* Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
} 