import React from 'react';
import { useHomepage } from '../context/HomepageContext';
import { brands, Brand } from '@/app/data/brands';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import Image from 'next/image';

const FeaturedBrands: React.FC = () => {
  const { settings } = useHomepage();
  const featuredBrands = brands.filter((b: Brand) => settings.featuredBrands.includes(b.id));

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
          Featured Brands
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {featuredBrands.map((brand: Brand) => (
            <Grid item key={brand.id} xs={6} sm={4} md={2}>
              <Paper elevation={0} sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', border: '1px solid #e2e8f0' }}>
                <Image src={brand.logo} alt={brand.name} width={120} height={60} style={{ objectFit: 'contain' }} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturedBrands;
