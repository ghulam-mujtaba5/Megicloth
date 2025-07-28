"use client";

import React from 'react';
import { Container, Box, Typography, Grid, Card, CardMedia, CardActionArea, Link as MuiLink, Breadcrumbs } from '@mui/material';
import Link from 'next/link';
import { categoryData } from '../data/categories';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Seo from '../components/Seo';

const CategoriesPage = () => {
  return (
    <>
      <Seo
        title="Product Categories | Megicloth"
        description="Explore all product categories at Megicloth, including Men's and Women's unstitched collections for every season."
      />
      <Box sx={{ py: 4, backgroundColor: '#f9fafb' }}>
        <Container maxWidth="lg">
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 4 }}>
            <Link href="/" passHref>
              <MuiLink underline="hover" color="inherit">Home</MuiLink>
            </Link>
            <Typography color="text.primary">Categories</Typography>
          </Breadcrumbs>

          <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 4, textAlign: 'center' }}>
            Product Categories
          </Typography>

          {categoryData.map((group) => (
            <Box key={group.name} sx={{ mb: 6 }}>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 600, mb: 3, borderBottom: '2px solid', borderColor: 'primary.main', pb: 1 }}>
                {group.name}
              </Typography>
              <Grid container spacing={3}>
                {group.categories.map((category) => (
                  <Grid item xs={12} sm={6} md={4} key={category.name}>
                    <Link href={category.href} passHref style={{ textDecoration: 'none' }}>
                      <Card sx={{ height: '100%', position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            image={category.image}
                            alt={category.name}
                            sx={{
                              height: 250,
                              transition: 'transform 0.4s ease',
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
                              width: '100%',
                              height: '100%',
                              bgcolor: 'rgba(0, 0, 0, 0.5)',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              textAlign: 'center',
                              transition: 'background-color 0.3s',
                              '&:hover': {
                                bgcolor: 'rgba(0, 0, 0, 0.6)',
                              }
                            }}
                          >
                            <Typography variant="h5" component="h3" sx={{ fontWeight: 700, p: 2, textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
                              {category.name}
                            </Typography>
                          </Box>
                        </CardActionArea>
                      </Card>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Container>
      </Box>
    </>
  );
};

export default CategoriesPage;
