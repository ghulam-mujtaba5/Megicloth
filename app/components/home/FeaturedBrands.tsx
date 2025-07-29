'use client';

import { Box, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';

const brands = [
  { name: 'Nike', src: 'https://picsum.photos/seed/brandA/150/80' },
  { name: 'Adidas', src: 'https://picsum.photos/seed/brandB/150/80' },
  { name: 'Social Media', src: 'https://picsum.photos/seed/brandC/150/80' },
  { name: 'Apple', src: 'https://picsum.photos/seed/brandD/150/80' },
  { name: 'Instagram', src: 'https://picsum.photos/seed/brandE/150/80' },
  { name: 'Spotify', src: 'https://picsum.photos/seed/brandF/150/80' },
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
