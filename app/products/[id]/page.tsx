"use client";
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
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

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
import StarIcon from "@mui/icons-material/Star";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";

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
  const router = useRouter();
  const { addToCart, isInCart, getCartItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Find the product
  const product = useMemo(() => {
    return products.find(p => p.id === params.id);
  }, [params.id]);

  // Enhanced product data
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
        'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400&q=80',
      ],
      reviews: [
        { id: 1, name: 'Sarah K.', rating: 5, comment: 'Excellent quality fabric! Perfect for summer wear.', date: '2024-01-15' },
        { id: 2, name: 'Ahmed M.', rating: 4, comment: 'Good material, fast delivery. Will order again.', date: '2024-01-10' },
        { id: 3, name: 'Fatima R.', rating: 5, comment: 'Beautiful embroidery work. Highly recommended!', date: '2024-01-08' },
      ],
      specifications: {
        'Fabric Type': product.category === 'Men' ? 'Lawn' : 'Embroidered Lawn',
        'Material': product.category === 'Men' ? '100% Cotton Lawn' : 'Premium Embroidered Lawn',
        'Weight': '120 GSM',
        'Width': '2.5 meters',
        'Length': product.category === 'Men' ? '3.5 meters' : '3-piece set',
        'Care Instructions': 'Machine wash cold, tumble dry low',
        'Origin': 'Pakistan',
        'Brand': 'Megicloth',
      }
    };
  }, [product]);

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

  const averageRating = enhancedProduct.reviews.reduce((sum, review) => sum + review.rating, 0) / enhancedProduct.reviews.length;

  const handleAddToCart = () => {
    addToCart(product, quantity);
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

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
        {/* Back Button */}
        <Slide direction="right" in={true} timeout={600}>
          <Button
            component={Link}
            href="/products"
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            sx={{
              mb: 3,
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            Back to Products
          </Button>
        </Slide>

        <Grid container spacing={4}>
          {/* Product Images */}
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={800}>
              <Box>
                {/* Main Image */}
                <Card
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    mb: 2,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  }}
                >
                  <CardMedia
                    component="img"
                    height={isMobile ? 300 : 400}
                    image={enhancedProduct.images[selectedImage]}
                    alt={product.name}
                    sx={{ objectFit: 'cover' }}
                  />
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
            </Fade>
          </Grid>

          {/* Product Information */}
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={1000}>
              <Box>
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
                    ({enhancedProduct.reviews.length} reviews)
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
                      {formatPrice(product.salePrice ?? product.price)}
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
                        {formatPrice(product.price)}
                      </Typography>
                    )}
                  </Box>
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
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Quantity
                  </Typography>
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

                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
            </Fade>
          </Grid>
        </Grid>

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
                  <Grid container spacing={2}>
                    {Object.entries(enhancedProduct.specifications).map(([key, value]) => (
                      <Grid item xs={12} sm={6} key={key}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            {key}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {value}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
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
                      Based on {enhancedProduct.reviews.length} reviews
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {enhancedProduct.reviews.map((review) => (
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
          <Box sx={{ mt: 6 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 3,
                textAlign: 'center',
                color: '#1e293b',
              }}
            >
              Related Products
            </Typography>
            <Grid container spacing={3}>
              {relatedProducts.map((relatedProduct) => (
                <Grid item xs={12} sm={6} md={3} key={relatedProduct.id}>
                  <Fade in={true} timeout={800}>
                    <Card
                      component={Link}
                      href={`/products/${relatedProduct.id}`}
                      sx={{
                        borderRadius: 3,
                        overflow: 'hidden',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height={200}
                        image={relatedProduct.image}
                        alt={relatedProduct.name}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                          {relatedProduct.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {relatedProduct.description}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#10b981' }}>
                          {formatPrice(relatedProduct.salePrice ?? relatedProduct.price)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>
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
  );
} 