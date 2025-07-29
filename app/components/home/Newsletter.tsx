'use client';

import React from 'react';
import { Box, Container, Grid, Typography, TextField, Button, SvgIcon } from '@mui/material';
import Image from 'next/image';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

// A simple, elegant SVG pattern for the background
const Pattern = () => (
  <SvgIcon
    sx={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: '100%',
      height: '100%',
      color: 'primary.light',
      opacity: 0.08,
      pointerEvents: 'none',
    }}
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
  >
    <defs>
      <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle fill="currentColor" cx="10" cy="10" r="1.5"></circle>
      </pattern>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
  </SvgIcon>
);

const Newsletter = () => {
  return (
    <Box component="section" aria-label="Newsletter Signup" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            position: 'relative',
            bgcolor: 'primary.50',
            borderRadius: 4,
            p: { xs: 3, sm: 4, md: 0 },
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
          }}
        >
          <Pattern />
          <Grid container alignItems="center" spacing={{ xs: 4, md: 0 }}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  height: '100%',
                  p: { md: 8 },
                  textAlign: { xs: 'center', md: 'left' },
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    fontFamily: 'var(--font-poppins)',
                    fontWeight: 700,
                    color: 'text.primary',
                    mb: 1,
                  }}
                >
                  Join Our Community
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, maxWidth: '450px', mx: { xs: 'auto', md: 0 } }}>
                  Subscribe for exclusive updates, new arrivals, and special offers delivered right to your inbox.
                </Typography>
                <Box
                  component="form"
                  sx={{
                    display: 'flex',
                    gap: 1.5,
                    flexDirection: { xs: 'column', sm: 'row' },
                    maxWidth: '450px',
                    mx: { xs: 'auto', md: 0 },
                  }}
                >
                  <TextField
                    label="Your Email Address"
                    variant="filled"
                    fullWidth
                    sx={{
                      '& .MuiFilledInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        '&:before, &:after': {
                          borderBottom: 'none',
                        },
                        '&:hover:not(.Mui-disabled):before': {
                          borderBottom: 'none',
                        },
                      },
                      '& .MuiFilledInput-input': {
                        py: '14px',
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    startIcon={<MailOutlineIcon />}
                    sx={{
                      borderRadius: 2,
                      py: '14px',
                      px: 4,
                      whiteSpace: 'nowrap',
                      fontFamily: 'var(--font-poppins)',
                      fontWeight: 600,
                      boxShadow: 'none',
                      transition: 'transform 0.2s, background-color 0.2s',
                      '&:hover': {
                        transform: 'scale(1.03)',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    Subscribe
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: 300, md: 500 },
                  width: '100%',
                  clipPath: {
                    xs: 'none',
                    md: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)',
                  },
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1551803091-e3e85b604c54?auto=format&fit=crop&w=800&q=80"
                  alt="Fashionable clothes on a rack"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Newsletter;
