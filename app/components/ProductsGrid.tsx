'use client';

import { useMemo } from 'react';
import { Container, Grid, Skeleton } from '@mui/material';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import styles from './ProductsGrid.module.css';

interface ProductsGridProps {
  searchQuery: string;
  loading: boolean;
}

const ProductsGrid = ({ searchQuery, loading }: ProductsGridProps) => {
  const filteredProducts = useMemo(() => {
    if (!searchQuery) {
      return products; // Return all products if search query is empty
    }
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <section aria-label="Our Products" className={styles.section}>
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
    </section>
  );
};

export default ProductsGrid;
