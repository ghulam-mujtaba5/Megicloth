'use client';

import React from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Product } from '@/app/types';
import { Box, Typography, Grid, Button } from '@mui/material';
import ProductCard from '../product/ProductCard';
import Link from 'next/link';
import { FavoriteBorder } from '@mui/icons-material';

const Wishlist = () => {
  const { user } = useAuth();
  const wishlistItems = user?.wishlistProducts || [];

  if (wishlistItems.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <FavoriteBorder sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>Your Wishlist is Empty</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Looks like you haven’t added anything to your wishlist yet. <br />
          Start exploring and save your favorite items!
        </Typography>
        <Button component={Link} href="/products" variant="contained" color="primary">
          Browse Products
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>My Wishlist</Typography>
      <Grid container spacing={3}>
        {wishlistItems.map((product: Product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Wishlist;
