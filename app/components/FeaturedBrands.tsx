'use client';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import styles from './FeaturedBrands.module.css';

const brands = [
  { name: 'Brand 1', src: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=80&q=80&grayscale&1' },
  { name: 'Brand 2', src: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=80&q=80&grayscale&2' },
  { name: 'Brand 3', src: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=80&q=80&grayscale&3' },
  { name: 'Brand 4', src: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=80&q=80&grayscale&4' },
];

const FeaturedBrands = () => {
  return (
    <section className={styles.section}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" className={styles.title}>
          Featured Brands
        </Typography>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {brands.map((brand, index) => (
            <Grid item key={index} xs={6} sm={4} md={3} lg={2}>
              <div className={styles.logoBox}>
                <Image
                  src={brand.src}
                  alt={brand.name}
                  width={120}
                  height={50}
                  className={styles.brandImage}
                />
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default FeaturedBrands;
