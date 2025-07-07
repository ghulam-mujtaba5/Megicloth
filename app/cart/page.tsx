"use client";


import React, { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { alpha } from "@mui/material/styles";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import StraightenIcon from "@mui/icons-material/Straighten";
import { motion, AnimatePresence } from "framer-motion";
import Zoom from '@mui/material/Zoom';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LockIcon from '@mui/icons-material/Lock';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [removingItem, setRemovingItem] = useState<string | null>(null);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Calculate totals
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.salePrice ?? item.price) * item.quantity, 0);
  }, [cart]);

  const shipping = useMemo(() => {
    return subtotal > 2000 ? 0 : 200; // Free shipping over Rs. 2000
  }, [subtotal]);

  const tax = useMemo(() => {
    return subtotal * 0.15; // 15% tax
  }, [subtotal]);

  const total = useMemo(() => {
    return subtotal + shipping + tax;
  }, [subtotal, shipping, tax]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
    } else {
      updateQuantity(id, newQuantity);
      setSnackbarMessage("Quantity updated");
      setSnackbarOpen(true);
    }
  };

  const handleRemoveItem = (id: string) => {
    setRemovingItem(id);
    setTimeout(() => {
      removeFromCart(id);
      setRemovingItem(null);
      setSnackbarMessage("Item removed from cart");
      setSnackbarOpen(true);
    }, 300);
  };

  const handleClearCart = () => {
    clearCart();
    setSnackbarMessage("Cart cleared");
    setSnackbarOpen(true);
  };

  const handleCheckout = () => {
    // Navigate to checkout page
    window.location.href = '/checkout';
  };

  // Glassmorphism style for order summary
  const glassCardSx = {
    borderRadius: 4,
    background: 'rgba(255,255,255,0.55)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.25)',
    position: 'sticky',
    top: 100,
    overflow: 'hidden',
  };

  // Neomorphic style for cart item cards
  const neoCardSx = {
    mb: 3,
    borderRadius: 4,
    background: '#f7fafc',
    boxShadow: '8px 8px 24px #e2e8f0, -8px -8px 24px #ffffff',
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
    border: '1.5px solid #e2e8f0',
    '&:hover': {
      boxShadow: '0 12px 32px rgba(31,38,135,0.10), 0 1.5px 8px #e0e7ef',
      transform: 'scale(1.01)',
      borderColor: '#cbd5e1',
    },
    opacity: removingItem ? 0.7 : 1,
  };

  // Neomorphic style for quantity stepper
  const neoStepperSx = {
    background: '#f1f5f9',
    boxShadow: '2px 2px 6px #e2e8f0, -2px -2px 6px #ffffff',
    borderRadius: 2,
    px: 1,
    py: 0.5,
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  };

  if (cart.length === 0) {
    return (
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
        <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
          <Fade in={true} timeout={800}>
            <Box sx={{ textAlign: 'center' }}>
              {/* Glassy illustration container */}
              <Box
                sx={{
                  width: 140,
                  height: 140,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.45)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                  border: '1.5px solid rgba(255,255,255,0.25)',
                }}
              >
                <ShoppingCartIcon sx={{ fontSize: 70, color: '#64748b' }} />
              </Box>
              
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 700,
                  mb: 2,
                  color: '#1e293b',
                }}
              >
                Your cart is empty
              </Typography>
              
              <Typography
                variant="h6"
                sx={{
                  color: '#64748b',
                  mb: 4,
                  maxWidth: 500,
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                Looks like you haven't added any items to your cart yet. Start shopping to discover our premium collection.
              </Typography>
              
              <Button
                component={Link}
                href="/products"
                variant="contained"
                size="large"
                startIcon={<ArrowBackIcon />}
                sx={{
                  background: 'linear-gradient(45deg, #2563eb, #1e40af)',
                  color: '#ffffff',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1e40af, #1e3a8a)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Start Shopping
              </Button>
            </Box>
          </Fade>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
        {/* Page Header */}
        <Slide direction="down" in={true} timeout={600}>
          <Box sx={{ mb: { xs: 3, md: 4 } }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.2rem', md: '3.2rem' },
                fontWeight: 900,
                textAlign: 'center',
                mb: 2,
                background: 'linear-gradient(45deg, #1e293b 30%, #2563eb 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-1.5px',
              }}
            >
              Shopping Cart
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                color: '#64748b',
                mb: 3,
                fontWeight: 500,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
              }}
            >
              {cart.length} item{cart.length !== 1 ? 's' : ''} in your cart
            </Typography>
          </Box>
        </Slide>

        {/* Trust badges above cart */}
        <Box aria-label="Trust badges" role="region" sx={{ display: 'flex', gap: 3, justifyContent: 'center', mb: 4 }}>
          <Zoom in={true}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, borderRadius: 2, background: '#f0fdf4', boxShadow: 1, transition: 'transform 0.2s', '&:hover, &:focus': { transform: 'scale(1.08)', background: '#bbf7d0' } }} tabIndex={0}><VerifiedUserIcon sx={{ color: '#10b981', fontSize: 22 }} /><Typography variant="body2" sx={{ color: '#64748b' }}>100% Authentic</Typography></Box></Zoom>
          <Zoom in={true}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, borderRadius: 2, background: '#eff6ff', boxShadow: 1, transition: 'transform 0.2s', '&:hover, &:focus': { transform: 'scale(1.08)', background: '#bae6fd' } }} tabIndex={0}><LocalShippingIcon sx={{ color: '#2563eb', fontSize: 22 }} /><Typography variant="body2" sx={{ color: '#64748b' }}>Fast Delivery</Typography></Box></Zoom>
          <Zoom in={true}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, borderRadius: 2, background: '#fef9c3', boxShadow: 1, transition: 'transform 0.2s', '&:hover, &:focus': { transform: 'scale(1.08)', background: '#fde68a' } }} tabIndex={0}><LockIcon sx={{ color: '#f59e0b', fontSize: 22 }} /><Typography variant="body2" sx={{ color: '#64748b' }}>Secure Payments</Typography></Box></Zoom>
        </Box>

        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid item xs={12} lg={8}>
            <Fade in={true} timeout={800}>
              <Box>
                {/* Cart Items */}
                <AnimatePresence>
                  {cart.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 40 }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                    >
                      <Card sx={neoCardSx} aria-label={`Cart item: ${item.name}`} role="region">
                        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                          <Grid container spacing={2} alignItems="center">
                            {/* Product Image */}
                            <Grid item xs={4} sm={3} md={2}>
                              <CardMedia
                                component="img"
                                height={isMobile ? 80 : 100}
                                image={item.image}
                                alt={item.name}
                                sx={{
                                  borderRadius: 3,
                                  objectFit: 'cover',
                                  boxShadow: '0 2px 8px rgba(31,38,135,0.08)',
                                }}
                                loading="lazy"
                              />
                            </Grid>
                            {/* Product Details */}
                            <Grid item xs={8} sm={6} md={4}>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 800,
                                  fontSize: { xs: '1.08rem', md: '1.18rem' },
                                  mb: 0.5,
                                  color: '#1e293b',
                                  lineHeight: 1.3,
                                }}
                              >
                                {item.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: '#64748b',
                                  mb: 0.5,
                                  fontSize: '0.93rem',
                                }}
                              >
                                {item.description}
                              </Typography>
                              {/* Extra product details with icons */}
                              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 0.5 }}>
                                {('sku' in item) && (item as any).sku && (
                                  <Chip icon={<Inventory2Icon sx={{ fontSize: 16 }} />} label={`SKU: ${(item as any).sku}`} size="small" sx={{ fontSize: '0.75rem', borderRadius: 1, background: '#f1f5f9' }} />
                                )}
                                {('color' in item) && (item as any).color && (
                                  <Chip icon={<ColorLensIcon sx={{ fontSize: 16 }} />} label={(item as any).color} size="small" sx={{ fontSize: '0.75rem', borderRadius: 1, background: '#f1f5f9' }} />
                                )}
                                {('size' in item) && (item as any).size && (
                                  <Chip icon={<StraightenIcon sx={{ fontSize: 16 }} />} label={(item as any).size} size="small" sx={{ fontSize: '0.75rem', borderRadius: 1, background: '#f1f5f9' }} />
                                )}
                              </Box>
                              {/* Tags */}
                              {Array.isArray((item as any).tags) && (item as any).tags.length > 0 && (
                                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                  {(item as any).tags.slice(0, 2).map((tag: string, tagIndex: number) => (
                                    <Chip
                                      key={tagIndex}
                                      label={tag}
                                      size="small"
                                      variant="outlined"
                                      sx={{
                                        fontSize: '0.75rem',
                                        height: 20,
                                        borderColor: '#e2e8f0',
                                        color: '#64748b',
                                      }}
                                    />
                                  ))}
                                </Box>
                              )}
                            </Grid>
                            {/* Quantity Controls */}
                            <Grid item xs={12} sm={6} md={3}>
                              <Box sx={neoStepperSx}>
                                <IconButton
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  size="small"
                                  sx={{
                                    background: '#f1f5f9',
                                    boxShadow: '1px 1px 3px #e2e8f0, -1px -1px 3px #ffffff',
                                    '&:hover': {
                                      background: '#e2e8f0',
                                    },
                                    '&:disabled': {
                                      background: '#f8fafc',
                                      color: '#cbd5e1',
                                    },
                                  }}
                                  aria-label="Decrease quantity"
                                >
                                  <RemoveIcon fontSize="small" />
                                </IconButton>
                                <TextField
                                  value={item.quantity}
                                  onChange={(e) => {
                                    const value = parseInt(e.target.value) || 0;
                                    handleQuantityChange(item.id, value);
                                  }}
                                  size="small"
                                  sx={{
                                    width: 60,
                                    '& .MuiOutlinedInput-root': {
                                      borderRadius: 2,
                                      textAlign: 'center',
                                      background: '#f7fafc',
                                    },
                                  }}
                                  inputProps={{
                                    min: 1,
                                    max: item.stock,
                                    style: { textAlign: 'center' },
                                    'aria-label': 'Quantity',
                                  }}
                                />
                                <IconButton
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  disabled={item.quantity >= item.stock}
                                  size="small"
                                  sx={{
                                    background: '#f1f5f9',
                                    boxShadow: '1px 1px 3px #e2e8f0, -1px -1px 3px #ffffff',
                                    '&:hover': {
                                      background: '#e2e8f0',
                                    },
                                    '&:disabled': {
                                      background: '#f8fafc',
                                      color: '#cbd5e1',
                                    },
                                  }}
                                  aria-label="Increase quantity"
                                >
                                  <AddIcon fontSize="small" />
                                </IconButton>
                              </Box>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: '#64748b',
                                  fontSize: '0.75rem',
                                  mt: 0.5,
                                  textAlign: 'center',
                                }}
                              >
                                {item.stock} available
                              </Typography>
                            </Grid>
                            {/* Price */}
                            <Grid item xs={6} sm={3} md={2}>
                              <Box sx={{ textAlign: { xs: 'left', sm: 'center' } }}>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    fontWeight: 700,
                                    color: '#10b981',
                                    fontSize: { xs: '1.08rem', md: '1.18rem' },
                                  }}
                                >
                                  {formatPrice((item.salePrice ?? item.price) * item.quantity)}
                                </Typography>
                                {item.salePrice && (
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      textDecoration: 'line-through',
                                      color: '#94a3b8',
                                      fontSize: '0.875rem',
                                    }}
                                  >
                                    {formatPrice(item.price * item.quantity)}
                                  </Typography>
                                )}
                              </Box>
                            </Grid>
                            {/* Remove Button */}
                            <Grid item xs={6} sm={3} md={1}>
                              <Box sx={{ textAlign: { xs: 'right', sm: 'center' } }}>
                                <IconButton
                                  onClick={() => handleRemoveItem(item.id)}
                                  color="error"
                                  size="small"
                                  sx={{
                                    background: '#fef2f2',
                                    '&:hover': {
                                      background: '#fee2e2',
                                    },
                                    boxShadow: '0 1px 4px #fca5a5',
                                  }}
                                  aria-label="Remove item"
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {/* Clear Cart Button */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
                  <Button
                    component={Link}
                    href="/products"
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    sx={{
                      borderRadius: 2,
                      fontWeight: 600,
                      background: '#f7fafc',
                      boxShadow: '2px 2px 6px #e2e8f0, -2px -2px 6px #ffffff',
                      '&:hover': {
                        background: '#e2e8f0',
                      },
                    }}
                  >
                    Continue Shopping
                  </Button>
                  <Button
                    onClick={handleClearCart}
                    variant="outlined"
                    color="error"
                    sx={{
                      borderRadius: 2,
                      fontWeight: 600,
                      background: '#f7fafc',
                      boxShadow: '2px 2px 6px #e2e8f0, -2px -2px 6px #ffffff',
                      '&:hover': {
                        background: '#fee2e2',
                      },
                    }}
                  >
                    Clear Cart
                  </Button>
                </Box>
              </Box>
            </Fade>
          </Grid>
          {/* Order Summary */}
          <Grid item xs={12} lg={4}>
            <Fade in={true} timeout={1000}>
              <Card sx={glassCardSx}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      mb: 3,
                      color: '#1e293b',
                      letterSpacing: '-0.5px',
                    }}
                  >
                    Order Summary
                  </Typography>
                  {/* Price Breakdown */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1" color="text.secondary">
                        Subtotal
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        {formatPrice(subtotal)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1" color="text.secondary">
                        Shipping
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        {shipping === 0 ? 'Free' : formatPrice(shipping)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="body1" color="text.secondary">
                        Tax (15%)
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        {formatPrice(tax)}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 900 }}>
                        Total
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 900, color: '#10b981' }}>
                        {formatPrice(total)}
                      </Typography>
                    </Box>
                  </Box>
                  {/* Shipping Info */}
                  {shipping === 0 ? (
                    <Alert
                      severity="success"
                      icon={<LocalShippingIcon />}
                      sx={{ mb: 3, borderRadius: 2, background: alpha('#bbf7d0', 0.25) }}
                    >
                      Free shipping on orders over Rs. 2,000
                    </Alert>
                  ) : (
                    <Alert
                      severity="info"
                      icon={<LocalShippingIcon />}
                      sx={{ mb: 3, borderRadius: 2, background: alpha('#e0e7ef', 0.25) }}
                    >
                      Add Rs. {formatPrice(2000 - subtotal)} more for free shipping
                    </Alert>
                  )}
                  {/* Security Info */}
                  <Alert
                    severity="info"
                    icon={<SecurityIcon />}
                    sx={{ mb: 3, borderRadius: 2, background: alpha('#e0e7ef', 0.18) }}
                  >
                    Secure checkout with SSL encryption
                  </Alert>
                  {/* Checkout Button */}
                  <Button
                    onClick={handleCheckout}
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                      background: 'linear-gradient(45deg, #10b981, #059669)',
                      color: '#ffffff',
                      py: 1.5,
                      fontSize: '1.125rem',
                      fontWeight: 800,
                      borderRadius: 3,
                      mb: 2,
                      boxShadow: '0 4px 16px #05966944',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #059669, #047857)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                  {/* Return Policy */}
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#64748b',
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 0.5,
                      }}
                    >
                      <RefreshIcon sx={{ fontSize: 16 }} />
                      7-day return policy
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        </Grid>
      </Container>
      {/* Snackbar for notifications */}
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
