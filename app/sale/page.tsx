"use client";

import React from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Product } from '../types';
import ProductCard from '../components/product/ProductCard';
import Seo from '../components/common/Seo';
import Breadcrumbs from '../components/common/Breadcrumbs';

const SalePage = () => {
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const fetchSaleProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('isPublished', true)
        .not('salePrice', 'is', null)
        .lt('salePrice', 'price');
      if (isMounted) {
        setSaleProducts(data || []);
        setLoading(false);
      }
    };
    fetchSaleProducts();
    return () => { isMounted = false; };
  }, []);

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

        {loading ? (
          <Grid container spacing={3}>
            {Array.from({ length: 8 }).map((_, idx) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                <Box sx={{ height: 380, borderRadius: '12px', bgcolor: 'grey.200' }} />
              </Grid>
            ))}
          </Grid>
        ) : saleProducts.length > 0 ? (
          <Grid container spacing={3}>
            {saleProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h6">No sale products found</Typography>
            <Typography color="text.secondary">Check back later for more deals!</Typography>
          </Box>
        )}
      </Container>
    </>
  );
};

export default SalePage;
