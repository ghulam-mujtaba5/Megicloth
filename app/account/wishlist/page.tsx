"use client";

import React from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { Box, Typography, Grid, Button } from '@mui/material';
import ProductCard from '../../components/ProductCard';
import Link from 'next/link';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <Box>
      <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 3 }}>
        My Wishlist
      </Typography>
      {wishlist.length > 0 ? (
        <Grid container spacing={3}>
          {wishlist.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Box sx={{ position: 'relative' }}>
                <ProductCard product={product} />
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  size="small"
                  onClick={() => removeFromWishlist(product.id)}
                  sx={{ mt: 1, width: '100%' }}
                >
                  Remove
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6">Your wishlist is empty.</Typography>
          <Typography color="text.secondary">Add items you love to your wishlist to save them for later.</Typography>
          <Link href="/products" passHref>
            <Button variant="contained" sx={{ mt: 2 }}>Explore Products</Button>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default WishlistPage;
