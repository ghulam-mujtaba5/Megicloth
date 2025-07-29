"use client";

import React from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import Seo from '../components/common/Seo';
import Breadcrumbs from '../components/common/Breadcrumbs';

const SalePage = () => {
  const saleProducts = products.filter(p => p.salePrice && p.salePrice < p.price);

  return (
    <>
      <Seo 
        title="Sale | Grab the Best Deals!"
        description="Don't miss out on the biggest sale of the season. Shop your favorite unstitched fabrics at unbeatable prices."
      />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Breadcrumbs />
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ fontWeight: 700, mb: 1 }}
          >
            Season Sale
          </Typography>
          <Typography variant="h6" color="text.secondary" component="p">
            Grab the best deals on your favorite collections before they&apos;re gone!
          </Typography>
        </Box>

        {saleProducts.length > 0 ? (
          <Grid container spacing={3}>
            {saleProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5">No items are currently on sale.</Typography>
            <Typography color="text.secondary">Please check back later for exciting deals!</Typography>
          </Box>
        )}
      </Container>
    </>
  );
};

export default SalePage;
