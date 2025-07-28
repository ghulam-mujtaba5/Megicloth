"use client";
import React from 'react';
import { Box, Container, Grid, Typography, Card, CardActionArea, CardMedia } from '@mui/material';
import Link from 'next/link';
import { useHomepage } from '../context/HomepageContext';
import { useCategories } from '../context/CategoryContext';

const QuickAccessCategories: React.FC = () => {
  const { settings } = useHomepage();
  const { categories } = useCategories();

  const featuredCategories = categories.filter(c => settings.featuredCategories.includes(c.id));
  return (
    <Box sx={{ py: { xs: 4, md: 8 }, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
          Shop By Category
        </Typography>
        <Grid container spacing={4}>
          {featuredCategories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.id}>
              <Link href={`/products?category=${category.name}`} passHref style={{ textDecoration: 'none' }}>
                <CardActionArea sx={{ borderRadius: 2, overflow: 'hidden', display: 'block' }}>
                  <Card sx={{ position: 'relative', '&:hover .overlay': { opacity: 1 } }}>
                    <CardMedia
                      component="img"
                      image={category.imageUrl}
                      alt={category.name}
                      sx={{
                        height: 300,
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                        color: '#fff',
                        p: 2,
                        borderBottomLeftRadius: 'inherit',
                        borderBottomRightRadius: 'inherit',
                        zIndex: 1,
                        pointerEvents: 'none',
                      }}
                    >
                      <Typography variant="h5" component="h3" sx={{ fontWeight: 700, color: '#fff' }}>
                        {category.name}
                      </Typography>
                    </Box>
                  </Card>
                </CardActionArea>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default QuickAccessCategories;
