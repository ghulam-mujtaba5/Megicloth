'use client';

import React from 'react';
import { Box, Container, Grid, Typography, Fade } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReplayIcon from '@mui/icons-material/Replay';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import styles from './HighlightedFeatures.module.css';

const features = [
  {
    icon: <LocalShippingIcon fontSize="large" />,
    title: 'Free Delivery',
    description: 'On orders over Rs. 2500',
    className: styles.iconBg1,
  },
  {
    icon: <MonetizationOnIcon fontSize="large" />,
    title: 'Cash on Delivery',
    description: 'Pay when you receive your order',
    className: styles.iconBg2,
  },
  {
    icon: <ReplayIcon fontSize="large" />,
    title: 'Easy Returns',
    description: '7-day return policy',
    className: styles.iconBg3,
  },
  {
    icon: <VerifiedUserIcon fontSize="large" />,
    title: 'Quality Assured',
    description: 'Authentic and high-quality products',
    className: styles.iconBg4,
  },
];

const HighlightedFeatures = () => {
  return (
    <Box component="section" className={styles.section}>
      <Container maxWidth="lg">
        <div className={styles.titleContainer}>
          <Typography variant="h4" component="h2" className={styles.title}>
            Why Choose Megicloth?
          </Typography>
          <Typography variant="body1" className={styles.subtitle}>
            We provide the best service and quality products.
          </Typography>
        </div>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Fade in={true} timeout={1000 + index * 300}>
                <div className={styles.featureCard}>
                  <div className={`${styles.iconWrapper} ${feature.className}`}>
                    {feature.icon}
                  </div>
                  <Typography variant="h6" component="h3" className={styles.featureTitle}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" className={styles.featureDescription}>
                    {feature.description}
                  </Typography>
                </div>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HighlightedFeatures;
