"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import type { Product } from "../../types";
import { Box, Card, CardContent, CardMedia, Typography, IconButton, Chip, Rating, Button, Tooltip, Fade } from "@mui/material";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock === 0) {
      toast.error("This product is out of stock");
      return;
    }
    setIsLoading(true);
    addToCart(product, 1);
    toast.success("Added to cart!");
    setTimeout(() => setIsLoading(false), 1000); // Simulate loading
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', minimumFractionDigits: 0 }).format(price);
  };

  const discountPercentage = product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <Card
      component={motion.div}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: 3,
        overflow: 'hidden',
        textDecoration: 'none',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        border: '1px solid',
        borderColor: 'grey.200',
        transition: 'box-shadow 0.3s, border-color 0.3s',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          borderColor: 'grey.300',
        },
      }}
    >
      <Box sx={{ position: 'relative', aspectRatio: '1 / 1', overflow: 'hidden' }}>
        <Link href={`/products/${product.slug}`} passHref legacyBehavior>
          <CardMedia
            component="img"
            image={Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"}
            alt={product.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
        </Link>

        <Box sx={{ position: 'absolute', top: 12, left: 12, right: 12, display: 'flex', justifyContent: 'space-between', zIndex: 2 }}>
          {product.salePrice && (
            <Chip label={`${discountPercentage}% OFF`} color="error" size="small" sx={{ fontWeight: 'bold' }} />
          )}
          <Tooltip title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"} placement="top">
            <IconButton
              onClick={handleToggleFavorite}
              size="small"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(4px)',
                color: isWishlisted ? 'error.main' : 'text.secondary',
                '&:hover': {
                  backgroundColor: 'white',
                  color: isWishlisted ? 'error.dark' : 'primary.main',
                },
              }}
            >
              {isWishlisted ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Box>

        <Fade in={isHovered} timeout={300} unmountOnExit>
          <Box sx={{ position: 'absolute', bottom: 12, left: 12, right: 12, zIndex: 2 }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddShoppingCartIcon />}
              onClick={handleAddToCart}
              disabled={isLoading || product.stock === 0}
              sx={{
                py: 1,
                fontWeight: 600,
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: 'black',
                backdropFilter: 'blur(4px)',
                '&:hover': {
                  backgroundColor: 'white',
                }
              }}
            >
              {product.stock === 0 ? 'Out of Stock' : (isLoading ? 'Adding...' : 'Quick Add')}
            </Button>
          </Box>
        </Fade>
      </Box>

      <CardContent sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Link href={`/products/${product.slug}`} passHref legacyBehavior>
          <Box sx={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, textTransform: 'capitalize' }}>
              {product.category}
            </Typography>
            <Typography
              component="h3"
              variant="h6"
              sx={{
                fontWeight: 600,
                lineHeight: 1.4,
                color: 'text.primary',
                mb: 1,
                height: '2.8em', // 2 lines with line-height 1.4
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              {product.name}
            </Typography>
          </Box>
        </Link>

        <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
          <Rating name="read-only" value={product.rating} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({product.reviewsCount} reviews)
          </Typography>
        </Box>

        <Box sx={{ mt: 'auto', pt: 1, display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography variant="h6" color="text.primary" sx={{ fontWeight: 'bold' }}>
            {formatPrice(product.salePrice || product.price)}
          </Typography>
          {product.salePrice && (
            <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
              {formatPrice(product.price)}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
