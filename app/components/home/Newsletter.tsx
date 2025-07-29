'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';
import Image from 'next/image';
import MailOutlineIcon from '@mui/icons-material/MailOutline';


const Newsletter = () => {
  return (
    <Box component="section" aria-label="Newsletter Signup" sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Fade in={true} timeout={1000}>
          <Box sx={{ backgroundColor: 'primary.50', borderRadius: '16px', p: { xs: 2, md: 4 }, overflow: 'hidden' }}>
            <Grid container alignItems="center">
              <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
                <Image
                  src="https://images.unsplash.com/photo-1551803091-e3e85b604c54?auto=format&fit=crop&w=627&q=80"
                  alt="Fashionable clothes on a rack"
                  width={627}
                  height={627}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', px: { xs: 1, md: 2 }, textAlign: { xs: 'center', md: 'left' } }}>
                  <Typography variant="h4" component="h2" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: 'neutral.800', mb: 0.5 }}>
                    Stay in the Loop
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'neutral.600', fontFamily: 'Inter, sans-serif', mb: 4 }}>
                    Subscribe to our newsletter for the latest updates, new arrivals, and exclusive offers.
                  </Typography>
                  <Box component="form" sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <TextField
                      label="Email Address"
                      variant="outlined"
                      fullWidth
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontFamily: 'Inter, sans-serif', backgroundColor: 'white' } }}
                    />
                    <Button
                      variant="contained"
                      type="submit"
                      size="large"
                      startIcon={<MailOutlineIcon />}
                      sx={{
                      borderRadius: '12px',
                      py: '15px',
                      px: 4,
                      whiteSpace: 'nowrap',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 600,
                      backgroundColor: 'primary.600',
                      '&:hover': {
                        backgroundColor: 'primary.700',
                      },
                    }}
                    >
                      Subscribe
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Newsletter;
