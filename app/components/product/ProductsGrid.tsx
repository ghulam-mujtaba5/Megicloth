'use client';

import { useEffect, useState } from 'react';
import { Box, Container, Grid, Skeleton } from '@mui/material';
import ProductCard from './ProductCard';
import { supabase } from '@/app/lib/supabaseClient';
import type { Product } from '@/app/types';

interface ProductsGridProps {
  searchQuery: string;
}

const ProductsGrid = ({ searchQuery }: ProductsGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const fetchProducts = async () => {
      let query = supabase
        .from('products')
        .select('*')
        .eq('isPublished', true)
        .order('createdAt', { ascending: false });
      const { data, error } = await query;
      if (isMounted) {
        if (error) {
          setProducts([]);
        } else {
          setProducts(data || []);
        }
        setLoading(false);
      }
    };
    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = searchQuery
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  return (
    <Box component="section" aria-label="Our Products" sx={{ pb: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {(loading ? Array.from(new Array(8)) : filteredProducts).map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product ? product.id : index}>
              {product ? (
                <ProductCard product={product} />
              ) : (
                <Skeleton variant="rectangular" height={380} sx={{ borderRadius: '12px' }} />
              )}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductsGrid;
