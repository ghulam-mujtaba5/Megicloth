"use client";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Chip,
  Fade,
  Slide,
  Alert,
} from "@mui/material";
import {
  Favorite,
  ShoppingCart,
  Delete,
  ArrowBack,
  LocalShipping,
  Security,
  Refresh,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, moveToCart, moveAllToCart } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (productId: string) => {
    const product = wishlist.find(item => item.id === productId);
    if (product) {
      addToCart(product, 1);
      removeFromWishlist(productId);
      toast.success("Product moved to cart!");
    }
  };

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId);
    toast.success("Product removed from wishlist");
  };

  const handleMoveAllToCart = () => {
    wishlist.forEach(product => {
      addToCart(product, 1);
    });
    moveAllToCart();
    toast.success("All products moved to cart!");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (wishlist.length === 0) {
    return (
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
        <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
          <Fade in={true} timeout={800}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #e2e8f0, #cbd5e1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                }}
              >
                <Favorite sx={{ fontSize: 60, color: '#64748b' }} />
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
                Your wishlist is empty
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
                Start adding your favorite products to your wishlist. You can save items for later and get notified when they're back in stock.
              </Typography>
              
              <Button
                component={Link}
                href="/products"
                variant="contained"
                size="large"
                startIcon={<ArrowBack />}
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #1e293b 30%, #2563eb 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                My Wishlist
              </Typography>
              
              <Button
                variant="contained"
                startIcon={<ShoppingCart />}
                onClick={handleMoveAllToCart}
                sx={{
                  background: 'linear-gradient(45deg, #10b981, #059669)',
                  color: '#ffffff',
                  px: 3,
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #059669, #047857)',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                Move All to Cart
              </Button>
            </Box>
            
            <Typography
              variant="h6"
              sx={{
                color: '#64748b',
                mb: 3,
              }}
            >
              {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} in your wishlist
            </Typography>
          </Box>
        </Slide>

        {/* Features Banner */}
        <Slide direction="up" in={true} timeout={800}>
          <Alert 
            severity="info" 
            sx={{ 
              mb: 4, 
              borderRadius: 2,
              background: 'linear-gradient(45deg, #dbeafe, #bfdbfe)',
              border: '1px solid #93c5fd',
            }}
            icon={<Refresh />}
          >
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              <strong>Wishlist Features:</strong> Save your favorite products, get notified when they're back in stock, and easily move items to your cart when you're ready to purchase.
            </Typography>
          </Alert>
        </Slide>

        {/* Products Grid */}
        <Grid container spacing={3}>
          {wishlist.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  {/* Product Image */}
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.image}
                      alt={product.name}
                      sx={{ objectFit: 'cover' }}
                    />
                    
                    {/* Action Buttons */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveFromWishlist(product.id)}
                        sx={{
                          background: 'rgba(255,255,255,0.9)',
                          color: '#ef4444',
                          '&:hover': {
                            background: '#ef4444',
                            color: '#ffffff',
                          },
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>

                    {/* Sale Badge */}
                    {product.salePrice && (
                      <Chip
                        label={`${Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF`}
                        color="error"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          left: 8,
                          fontWeight: 600,
                        }}
                      />
                    )}
                  </Box>

                  {/* Product Info */}
                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        fontSize: '1rem',
                        lineHeight: 1.3,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {product.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        fontSize: '0.875rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {product.description}
                    </Typography>

                    {/* Price */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: product.salePrice ? '#ef4444' : '#1e293b',
                        }}
                      >
                        {formatPrice(product.salePrice || product.price)}
                      </Typography>
                      {product.salePrice && (
                        <Typography
                          variant="body2"
                          sx={{
                            textDecoration: 'line-through',
                            color: '#64748b',
                          }}
                        >
                          {formatPrice(product.price)}
                        </Typography>
                      )}
                    </Box>

                    {/* Stock Status */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Chip
                        label={product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        color={product.stock > 0 ? 'success' : 'error'}
                        size="small"
                        variant="outlined"
                      />
                      {product.stock > 0 && (
                        <Typography variant="caption" color="text.secondary">
                          {product.stock} left
                        </Typography>
                      )}
                    </Box>

                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<ShoppingCart />}
                        onClick={() => handleMoveToCart(product.id)}
                        disabled={product.stock === 0}
                        sx={{
                          background: 'linear-gradient(45deg, #2563eb, #1e40af)',
                          color: '#ffffff',
                          fontWeight: 600,
                          '&:hover': {
                            background: 'linear-gradient(45deg, #1e40af, #1e3a8a)',
                          },
                          '&:disabled': {
                            background: '#e2e8f0',
                            color: '#64748b',
                          },
                        }}
                      >
                        Move to Cart
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Bottom Features */}
        <Slide direction="up" in={true} timeout={1000}>
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: '#1e293b' }}>
              Why Use Wishlist?
            </Typography>
            
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #dbeafe, #bfdbfe)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    <Favorite sx={{ fontSize: 30, color: '#2563eb' }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Save Favorites
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Keep track of products you love and want to purchase later
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #dbeafe, #bfdbfe)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    <LocalShipping sx={{ fontSize: 30, color: '#2563eb' }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Stock Alerts
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Get notified when out-of-stock items become available again
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #dbeafe, #bfdbfe)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    <Security sx={{ fontSize: 30, color: '#2563eb' }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Easy Shopping
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Move items to cart with one click when you're ready to buy
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Slide>
      </Container>
    </Box>
  );
} 