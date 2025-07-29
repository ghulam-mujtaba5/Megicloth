'use client';

import { Box, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';

const brands = [
  { name: 'Nike', src: 'https://images.unsplash.com/photo-1555952494-0408982e3e1b?w=150&h=80&fit=crop' },
  { name: 'Adidas', src: 'https://images.unsplash.com/photo-1519068916283-e28c74422002?w=150&h=80&fit=crop' },
  { name: 'Social Media', src: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=150&h=80&fit=crop' },
  { name: 'Apple', src: 'https://images.unsplash.com/photo-1570751057628-64941a54d20d?w=150&h=80&fit=crop' },
  { name: 'Instagram', src: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=150&h=80&fit=crop' },
  { name: 'Spotify', src: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=150&h=80&fit=crop' },
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
                    transition: 'transform 0.3s ease',
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
