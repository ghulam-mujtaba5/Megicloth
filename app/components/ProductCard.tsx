"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import type { Product } from "../data/products";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import RefreshIcon from "@mui/icons-material/Refresh";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Add } from "@mui/icons-material";

interface ProductCardProps {
  product: Product & {
    tags?: string[];
    fabricType?: string;
    measurements?: string;
    deliveryTime?: string;
    returnPolicy?: string;
  };
  showQuickAdd?: boolean;
}

export default function ProductCard({ product, showQuickAdd = true }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [hovered, setHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  // const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  // Enhanced image handling with fallback
  const imageUrl = imageError 
    ? 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80'
    : product.image.startsWith('http') 
      ? product.image 
      : 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80';

  const handleAddToCart = async () => {
    if (product.stock === 0) {
      toast.error("This product is out of stock");
      return;
    }

    setIsLoading(true);
    try {
      addToCart(product, 1);
      toast.success("Added to cart!");
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist!");
    }
  }, [addToWishlist, removeFromWishlist, product.id]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
    >
      <Card
        component={Link}
        href={`/products/${product.id}`}
        sx={{
          width: '100%',
          maxWidth: 340,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          borderRadius: 4,
          overflow: 'hidden',
          background: 'rgba(255,255,255,0.85)',
          boxShadow: hovered
            ? '0 12px 40px rgba(31,38,135,0.13), 0 2px 8px #e0e7ef'
            : '8px 8px 24px #e2e8f0, -8px -8px 24px #ffffff',
          border: '1.5px solid #e2e8f0',
          transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
          transform: hovered ? 'scale(1.025)' : 'scale(1)',
          cursor: 'pointer',
          textDecoration: 'none',
          '&:hover, &:focus': {
            boxShadow: '0 16px 48px rgba(31,38,135,0.18), 0 2px 8px #e0e7ef',
            borderColor: '#2563eb',
            outline: '2px solid #2563eb',
            outlineOffset: '2px',
            textDecoration: 'none',
          },
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={`View details for ${product.name}`}
      >
        {/* Image Section with improved aspect ratio */}
        <Box sx={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden', background: '#f8fafc' }}>
          <CardMedia
            component="img"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
              filter: imageLoaded ? 'none' : 'blur(10px)',
              background: '#f8fafc',
            }}
            height={undefined}
            image={imageUrl}
            alt={product.name}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          
          {/* Loading overlay */}
          {!imageLoaded && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
                backgroundSize: '200% 100%',
                animation: 'loading 1.5s infinite',
                '@keyframes loading': {
                  '0%': { backgroundPosition: '200% 0' },
                  '100%': { backgroundPosition: '-200% 0' },
                },
              }}
            />
          )}

          {/* Badges and Icons */}
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              right: 12,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              zIndex: 2,
            }}
          >
            {/* Sale Badge */}
            {product.salePrice && (
              <Chip
                label={`${discountPercentage}% OFF`}
                color="error"
                size="small"
                sx={{
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  background: 'linear-gradient(45deg, #ef4444, #dc2626)',
                  color: '#ffffff',
                  boxShadow: '0 2px 8px rgba(239,68,68,0.3)',
                }}
              />
            )}

            {/* Favorite Button */}
            <Tooltip title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}>
              <IconButton
                onClick={handleToggleFavorite}
                size="small"
                sx={{
                  background: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(10px)',
                  color: isWishlisted ? '#ef4444' : '#64748b',
                  '&:hover': {
                    background: isWishlisted ? '#ef4444' : '#2563eb',
                    color: '#ffffff',
                  },
                }}
              >
                {isWishlisted ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
          </Box>

          {/* Stock Badge */}
          <Chip
            label={product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            color={product.stock > 0 ? 'success' : 'error'}
            size="small"
            variant="outlined"
            sx={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              fontWeight: 600,
              fontSize: '0.75rem',
              background: 'rgba(255,255,255,0.9)',
            }}
          />

          {/* Rating */}
          {product.rating && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(0,0,0,0.7)',
                color: '#ffffff',
                px: 1,
                py: 0.5,
                borderRadius: 1,
                fontSize: '0.75rem',
              }}
            >
              <FavoriteIcon sx={{ fontSize: 16, color: '#fbbf24', mr: 0.5 }} />
              {product.rating}
            </Box>
          )}
        </Box>

        {/* Content Section */}
        <CardContent sx={{ flexGrow: 1, p: 2, display: 'flex', flexDirection: 'column' }}>
          {/* Product Tags */}
          {product.tags && product.tags.length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.5, mb: 1, flexWrap: 'wrap' }}>
              {product.tags.map((tag, index) => (
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
                    height: 20,
                  }}
                />
              ))}
            </Box>
          )}

          {/* Product Name */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: '1rem',
              lineHeight: 1.3,
              mb: 1,
              color: '#1e293b',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.6rem',
            }}
          >
            {product.name}
          </Typography>

          {/* Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating
              value={product.rating ?? 0}
              precision={0.1}
              readOnly
              size="small"
              sx={{
                '& .MuiRating-iconFilled': {
                  color: '#fbbf24',
                },
                '& .MuiRating-iconEmpty': {
                  color: '#e2e8f0',
                },
              }}
            />
            <Typography
              variant="body2"
              sx={{
                ml: 0.5,
                color: '#64748b',
                fontWeight: 500,
              }}
            >
              ({product.rating?.toFixed(1) || '0.0'})
            </Typography>
          </Box>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              color: '#64748b',
              fontSize: '0.875rem',
              lineHeight: 1.4,
              mb: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.8rem',
            }}
          >
            {product.description}
          </Typography>

          {/* Product Details */}
          <Box sx={{ mb: 2 }}>
            {product.fabricType && (
              <Typography
                variant="body2"
                sx={{
                  color: '#475569',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  mb: 0.5,
                }}
              >
                {product.fabricType} • {product.measurements}
              </Typography>
            )}
            
            {/* Delivery Info */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <LocalShippingIcon sx={{ fontSize: 16, color: '#10b981' }} />
              <Typography
                variant="body2"
                sx={{
                  color: '#64748b',
                  fontSize: '0.75rem',
                }}
              >
                {product.deliveryTime} delivery
              </Typography>
            </Box>

            {/* Return Policy */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <RefreshIcon sx={{ fontSize: 16, color: '#3b82f6' }} />
              <Typography
                variant="body2"
                sx={{
                  color: '#64748b',
                  fontSize: '0.75rem',
                }}
              >
                {product.returnPolicy} returns
              </Typography>
            </Box>
          </Box>

          {/* Price Section */}
          <Box sx={{ mt: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  color: '#10b981',
                }}
              >
                {formatPrice(product.salePrice ?? product.price)}
              </Typography>
              {product.salePrice && (
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: 'line-through',
                    color: '#94a3b8',
                    fontSize: '1rem',
                  }}
                >
                  {formatPrice(product.price)}
                </Typography>
              )}
            </Box>

            {/* Stock Status */}
            <Typography
              variant="body2"
              sx={{
                color: product.stock > 0 ? '#10b981' : '#ef4444',
                fontWeight: 500,
                fontSize: '0.875rem',
              }}
            >
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </Typography>
          </Box>
        </CardContent>

        {/* Actions Section */}
        <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
          <Button
            onClick={handleAddToCart}
            variant="contained"
            fullWidth
            disabled={product.stock === 0 || isLoading}
            startIcon={<ShoppingCartIcon />}
            sx={{
              background: 'linear-gradient(45deg, #2563eb, #1e40af)',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.875rem',
              borderRadius: 2,
              py: 1,
              boxShadow: '0 2px 8px rgba(37,99,235,0.2)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1e40af, #1e3a8a)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(37,99,235,0.3)',
              },
              '&:disabled': {
                background: '#e2e8f0',
                color: '#94a3b8',
                transform: 'none',
                boxShadow: 'none',
              },
            }}
          >
            {isLoading ? 'Adding...' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </CardActions>

        {/* Quick Add Overlay */}
        {showQuickAdd && hovered && product.stock > 0 && (
          <Fade in={hovered}>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
              }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<Add />}
                onClick={handleAddToCart}
                disabled={isLoading}
                sx={{
                  background: '#ffffff',
                  color: '#1e293b',
                  fontWeight: 600,
                  px: 3,
                  '&:hover': {
                    background: '#f8fafc',
                  },
                }}
              >
                Quick Add
              </Button>
            </Box>
          </Fade>
        )}
      </Card>
    </motion.div>
  );
}
