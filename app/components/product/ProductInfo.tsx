"use client";

import { Product } from "../../data/products";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

interface ProductInfoProps {
  product: Product;
  reviews: any[];
  averageRating: number;
  finalPrice: number;
  isFavorite: boolean;
  addStitching: boolean;
  quantity: number;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onQuantityChange: (newQuantity: number) => void;
  onToggleFavorite: () => void;
  onShare: () => void;
  onStitchingChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

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

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
  }).format(price);
};

export default function ProductInfo({ 
  product, 
  reviews, 
  averageRating, 
  finalPrice, 
  isFavorite, 
  addStitching, 
  quantity, 
  onAddToCart, 
  onBuyNow, 
  onQuantityChange, 
  onToggleFavorite, 
  onShare, 
  onStitchingChange 
}: ProductInfoProps) {

  const discountPercentage = product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <Box sx={glassCardSx}>
      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
        {product.tags?.map((tag, index) => (
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
              {formatPrice(product.price)}
            </Typography>
          )}
          {discountPercentage > 0 && (
            <Chip label={`${discountPercentage}% OFF`} color="success" size="small" sx={{ fontWeight: 700 }} />
          )}
        </Box>
      </Box>

      {product.stitchingAvailable && (
        <FormControlLabel
          control={<Switch checked={addStitching} onChange={onStitchingChange} />}
          label={`Add Stitching (+${formatPrice(product.stitchingCost || 0)})`}
          sx={{ mb: 2 }}
        />
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <TextField
          type="number"
          label="Qty"
          value={quantity}
          onChange={(e) => onQuantityChange(parseInt(e.target.value, 10))}
          inputProps={{ min: 1, max: product.stock, step: 1 }}
          sx={{ width: '80px' }}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<ShoppingCartIcon />}
          onClick={onAddToCart}
          sx={{ flexGrow: 1, py: 1.5, fontWeight: 700 }}
        >
          Add to Cart
        </Button>
        <IconButton onClick={onToggleFavorite} sx={neoButtonSx}>
          {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
        <IconButton onClick={onShare} sx={neoButtonSx}>
          <ShareIcon />
        </IconButton>
      </Box>

      <Button
        variant="contained"
        color="secondary"
        fullWidth
        size="large"
        onClick={onBuyNow}
        sx={{ mb: 3, py: 1.5, fontWeight: 700 }}
      >
        Buy Now
      </Button>

      <Alert icon={<VerifiedUserIcon />} severity="success" sx={{ borderRadius: 2, background: '#eefbf3' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SecurityIcon />
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Secure payment & 7-day returns
          </Typography>
        </Box>
      </Alert>

      {product.deliveryTime && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 2, color: 'text.secondary' }}>
          <LocalShippingIcon />
          <Typography variant="body2">Estimated Delivery: {product.deliveryTime || '2-3 business days'}</Typography>
        </Box>
      )}
    </Box>
  );
}