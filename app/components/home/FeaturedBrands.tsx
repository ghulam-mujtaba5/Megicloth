'use client';

import { Box, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';

const brands = [
  { name: 'Brand 1', src: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=80&q=80&grayscale&1' },
  { name: 'Brand 2', src: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=80&q=80&grayscale&2' },
  { name: 'Brand 3', src: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=80&q=80&grayscale&3' },
  { name: 'Brand 4', src: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=80&q=80&grayscale&4' },
  { name: 'Brand 5', src: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=80&q=80&grayscale&5' },
  { name: 'Brand 6', src: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=80&q=80&grayscale&6' },
];

const FeaturedBrands = () => {
  return (
    <Box component="section" sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            textAlign: 'center',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            color: 'neutral.800',
            mb: 6,
          }}
        >
          Featured Brands
        </Typography>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {brands.map((brand, index) => (
            <Grid item key={index} xs={6} sm={4} md={3} lg={2}>
              <Box
                sx={{
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  p: 2,
                  borderRadius: '12px',
                  backgroundColor: 'white',
                  boxShadow: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                    '& img': {
                      filter: 'grayscale(0%)',
                      opacity: 1,
                    },
                  },
                }}
              >
                <Image
                  src={brand.src}
                  alt={brand.name}
                  width={120}
                  height={50}
                  style={{
                    objectFit: 'contain',
                    filter: 'grayscale(80%)',
                    opacity: 0.7,
                    transition: 'filter 0.3s ease, opacity 0.3s ease',
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturedBrands;
