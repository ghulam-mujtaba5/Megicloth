'use client';

import React from 'react';
import { Box, Container, Grid, Typography, Paper, Fade } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReplayIcon from '@mui/icons-material/Replay';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const features = [
  {
    icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
    title: 'Free Delivery',
    description: 'On orders over Rs. 2500',
    color: 'primary.main',
    gradient: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  },
  {
    icon: <MonetizationOnIcon sx={{ fontSize: 40 }} />,
    title: 'Cash on Delivery',
    description: 'Pay when you receive your order',
    color: 'success.main',
    gradient: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
  },
  {
    icon: <ReplayIcon sx={{ fontSize: 40 }} />,
    title: 'Easy Returns',
    description: '7-day return policy',
    color: 'warning.main',
    gradient: 'linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)',
  },
  {
    icon: <VerifiedUserIcon sx={{ fontSize: 40 }} />,
    title: 'Quality Assured',
    description: 'Authentic and high-quality products',
    color: 'secondary.main',
    gradient: 'linear-gradient(45deg, #9C27B0 30%, #BA68C8 90%)',
  },
];

const HighlightedFeatures = () => {
  return (
    <Box component="section" sx={{ py: 8, backgroundColor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, mb: 2, color: 'text.primary' }}
          >
            Why Choose Megicloth?
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            We provide the best service and quality products.
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Fade in={true} timeout={1000 + index * 300}>
                <Paper 
                  elevation={3} 
                  sx={{
                    p: 3, 
                    textAlign: 'center', 
                    borderRadius: 3,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      color: 'white',
                      background: feature.gradient,
                      boxShadow: 3,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {feature.description}
                  </Typography>
                </Paper>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HighlightedFeatures;
