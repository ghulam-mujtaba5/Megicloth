import React from 'react';
import { Box, Container, Grid, Typography, Fade } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReplayIcon from '@mui/icons-material/Replay';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const features = [
  {
    icon: <LocalShippingIcon sx={{ fontSize: 40, color: '#fff' }} />,
    title: 'Free Delivery',
    description: 'On orders over Rs. 2500',
    color: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  },
  {
    icon: <MonetizationOnIcon sx={{ fontSize: 40, color: '#fff' }} />,
    title: 'Cash on Delivery',
    description: 'Pay when you receive your order',
    color: 'linear-gradient(45deg, #4CAF50 30%, #81C784 90%)',
  },
  {
    icon: <ReplayIcon sx={{ fontSize: 40, color: '#fff' }} />,
    title: 'Easy Returns',
    description: '7-day return policy',
    color: 'linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)',
  },
  {
    icon: <VerifiedUserIcon sx={{ fontSize: 40, color: '#fff' }} />,
    title: 'Quality Assured',
    description: 'Authentic and high-quality products',
    color: 'linear-gradient(45deg, #9C27B0 30%, #BA68C8 90%)',
  },
];

const HighlightedFeatures = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: '#f9fafb' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
            Why Choose Megicloth?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            We provide the best service and quality products.
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Fade in={true} timeout={1000 + index * 300}>
                <Box sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: '16px',
                  backgroundColor: '#fff',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                  }
                }}>
                  <Box sx={{ 
                    width: 70, 
                    height: 70, 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    background: feature.color, 
                    mx: 'auto', 
                    mb: 2,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Box>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HighlightedFeatures;
