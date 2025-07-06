"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
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
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import RefreshIcon from "@mui/icons-material/Refresh";

interface ProductCardProps {
  product: Product & {
    tags?: string[];
    fabricType?: string;
    measurements?: string;
    deliveryTime?: string;
    returnPolicy?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [hovered, setHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Enhanced image handling with fallback
  const imageUrl = imageError 
    ? 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80'
    : product.image.startsWith('http') 
      ? product.image 
      : 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80';

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  }, [addToCart, product]);

  const handleToggleFavorite = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(prev => !prev);
  }, []);

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
    <Card
      component={Link}
      href={`/products/${product.id}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderRadius: 3,
        overflow: 'hidden',
        background: '#ffffff',
        boxShadow: hovered 
          ? '0 12px 40px rgba(0,0,0,0.15)' 
          : '0 4px 12px rgba(0,0,0,0.08)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        cursor: 'pointer',
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'none',
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`View details for ${product.name}`}
    >
      {/* Image Section */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height={isMobile ? 200 : 240}
          image={imageUrl}
          alt={product.name}
          onLoad={handleImageLoad}
          onError={handleImageError}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            filter: imageLoaded ? 'none' : 'blur(10px)',
            background: '#f8fafc',
          }}
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
          <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
            <IconButton
              onClick={handleToggleFavorite}
              size="small"
              sx={{
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                color: isFavorite ? '#ef4444' : '#64748b',
                '&:hover': {
                  background: 'rgba(255,255,255,0.95)',
                  color: isFavorite ? '#dc2626' : '#ef4444',
                },
              }}
            >
              {isFavorite ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Box>

        {/* Quick Actions Overlay */}
        <Fade in={hovered} timeout={200}>
          <Box
            sx={{
              position: 'absolute',
              bottom: 12,
              left: 12,
              right: 12,
              display: 'flex',
              gap: 1,
              zIndex: 2,
            }}
          >
            <Button
              onClick={handleAddToCart}
              variant="contained"
              size="small"
              startIcon={<ShoppingCartIcon />}
              sx={{
                flex: 1,
                background: 'linear-gradient(45deg, #10b981, #059669)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.875rem',
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #059669, #047857)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 6px 16px rgba(16,185,129,0.4)',
                },
              }}
            >
              Quick Add
            </Button>
            <Tooltip title="View details">
              <IconButton
                size="small"
                sx={{
                  background: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(10px)',
                  color: '#2563eb',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.95)',
                    color: '#1e40af',
                  },
                }}
              >
                <VisibilityIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Fade>
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
          disabled={product.stock === 0}
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
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardActions>
    </Card>
  );
}
