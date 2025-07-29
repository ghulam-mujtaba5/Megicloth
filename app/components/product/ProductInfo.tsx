"use client";

import { Product } from "../../types";
import { 
  Typography, Button, Chip, Rating, Switch, FormControlLabel, 
  IconButton, Divider, Stack, Paper
} from "@mui/material";
import { 
  ShoppingCart, Favorite, FavoriteBorder, Share, Add, Remove, 
  LocalShipping, Security, Replay
} from "@mui/icons-material";

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

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
  }).format(price);
};

export default function ProductInfo({ 
  product, reviews, averageRating, finalPrice, isFavorite, addStitching, 
  quantity, onAddToCart, onBuyNow, onQuantityChange, onToggleFavorite, 
  onShare, onStitchingChange 
}: ProductInfoProps) {

  const discountPercentage = product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <Stack spacing={3} sx={{ pt: { xs: 2, md: 0 } }}>
      {/* Stock & SKU */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Chip 
          label={product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          color={product.stock > 0 ? 'success' : 'error'}
          size="small"
          sx={{ fontWeight: 700, borderRadius: '6px' }}
        />
        <Typography variant="caption" color="text.secondary">SKU: {product.sku}</Typography>
      </Stack>

      {/* Title */}
      <Typography variant="h4" component="h1" fontWeight={700}>
        {product.name}
      </Typography>

      {/* Rating */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <Rating value={averageRating} precision={0.1} readOnly />
        <Typography variant="body2" color="text.secondary">
          ({reviews.length} customer reviews)
        </Typography>
      </Stack>

      {/* Price */}
      <Stack direction="row" alignItems="flex-end" spacing={2}>
        <Typography variant="h3" fontWeight={700} color="primary.main">
          {formatPrice(finalPrice)}
        </Typography>
        {product.salePrice && (
          <Typography variant="h5" fontWeight={500} color="text.secondary" sx={{ textDecoration: 'line-through' }}>
            {formatPrice(product.price)}
          </Typography>
        )}
        {discountPercentage > 0 && (
          <Chip label={`${discountPercentage}% OFF`} color="error" size="small" sx={{ fontWeight: 700, height: 'auto', py: 0.5 }} />
        )}
      </Stack>

      <Divider />

      {/* Description */}
      <Typography variant="body1" color="text.secondary">
        {product.description}
      </Typography>

      {/* Options */}
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, borderColor: 'grey.200' }}>
        <Stack spacing={2}>
          {product.stitchingAvailable && (
            <FormControlLabel
              control={<Switch checked={addStitching} onChange={onStitchingChange} />}
              label={`Add Stitching (+${formatPrice(product.stitchingCost || 0)})`}
              sx={{ justifyContent: 'space-between', ml: 0 }}
            />
          )}
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography fontWeight={500}>Quantity:</Typography>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ border: '1px solid', borderColor: 'grey.300', borderRadius: '8px' }}>
              <IconButton size="small" onClick={() => onQuantityChange(Math.max(1, quantity - 1))} disabled={quantity <= 1}>
                <Remove fontSize="small" />
              </IconButton>
              <Typography fontWeight={700} sx={{ width: '2rem', textAlign: 'center' }}>{quantity}</Typography>
              <IconButton size="small" onClick={() => onQuantityChange(Math.min(product.stock, quantity + 1))} disabled={quantity >= product.stock}>
                <Add fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </Paper>

      {/* Actions */}
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<ShoppingCart />}
          onClick={onAddToCart}
          disabled={product.stock === 0}
          sx={{ flex: 2, py: 1.5, fontWeight: 700 }}
        >
          Add to Cart
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={onBuyNow}
          disabled={product.stock === 0}
          sx={{ flex: 1, py: 1.5, fontWeight: 700 }}
        >
          Buy Now
        </Button>
        <IconButton onClick={onToggleFavorite} sx={{ border: '1px solid', borderColor: 'grey.300', borderRadius: '8px' }}>
          {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
        <IconButton onClick={onShare} sx={{ border: '1px solid', borderColor: 'grey.300', borderRadius: '8px' }}>
          <Share />
        </IconButton>
      </Stack>

      <Divider />

      {/* Trust Badges */}
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ flexWrap: 'wrap', gap: 2 }}>
        <Stack alignItems="center" spacing={1}>
          <LocalShipping />
          <Typography variant="caption" align="center">Free Shipping on orders over {formatPrice(2500)}</Typography>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack alignItems="center" spacing={1}>
          <Replay />
          <Typography variant="caption" align="center">7-Day Easy Returns</Typography>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack alignItems="center" spacing={1}>
          <Security />
          <Typography variant="caption" align="center">100% Secure Payments</Typography>
        </Stack>
      </Stack>

    </Stack>
  );
}