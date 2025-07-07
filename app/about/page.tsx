"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import Avatar from "@mui/material/Avatar";
import TeamIcon from "@mui/icons-material/Groups";
import VerifiedIcon from "@mui/icons-material/VerifiedUser";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Seo from "../components/Seo";

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Megicloth | Our Story & Mission"
        description="Learn about Megicloth, our mission, values, and commitment to providing premium unstitched fabrics and exceptional service."
        ogImage="/file.svg"
        canonical="https://megicloth.com/about"
      />
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', py: { xs: 4, md: 8 } }}>
        <Container maxWidth="md">
          <Fade in={true} timeout={700}>
            <Box sx={{
              borderRadius: 4,
              background: 'rgba(255,255,255,0.65)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.25)',
              p: { xs: 3, md: 6 },
              mb: 6,
              textAlign: 'center',
            }}>
              <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, fontSize: { xs: '2rem', md: '2.8rem' }, background: 'linear-gradient(45deg, #1e293b 30%, #2563eb 90%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1.5px' }}>
                About Megicloth
              </Typography>
              <Typography variant="h5" sx={{ color: '#64748b', mb: 3, fontWeight: 500, fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                Your trusted destination for premium unstitched fabrics, fast delivery, and unbeatable value.
              </Typography>
              <Typography variant="body1" sx={{ color: '#334155', mb: 2, fontSize: { xs: '1rem', md: '1.15rem' } }}>
                At Megicloth, we believe in empowering your style with the finest selection of lawn, cotton, and embroidered fabrics. Our mission is to make luxury accessible, offering a seamless shopping experience, fast nationwide delivery, and a customer-first approach. We are passionate about quality, authenticity, and helping you express your individuality through fabric.
              </Typography>
            </Box>
          </Fade>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Fade in={true} timeout={900}>
                <Box sx={{
                  borderRadius: 3,
                  background: 'rgba(255,255,255,0.85)',
                  boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.10)',
                  p: 3,
                  textAlign: 'center',
                  mb: 2,
                }}>
                  <Avatar sx={{ bgcolor: '#2563eb', width: 56, height: 56, mx: 'auto', mb: 1 }}>
                    <TeamIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Our Team</Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    A passionate group of fabric enthusiasts, designers, and customer care experts dedicated to your satisfaction.
                  </Typography>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Fade in={true} timeout={1100}>
                <Box sx={{
                  borderRadius: 3,
                  background: 'rgba(255,255,255,0.85)',
                  boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.10)',
                  p: 3,
                  textAlign: 'center',
                  mb: 2,
                }}>
                  <Avatar sx={{ bgcolor: '#10b981', width: 56, height: 56, mx: 'auto', mb: 1 }}>
                    <VerifiedIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Authenticity</Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    100% original, premium fabrics sourced from trusted suppliers and brands.
                  </Typography>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Fade in={true} timeout={1300}>
                <Box sx={{
                  borderRadius: 3,
                  background: 'rgba(255,255,255,0.85)',
                  boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.10)',
                  p: 3,
                  textAlign: 'center',
                  mb: 2,
                }}>
                  <Avatar sx={{ bgcolor: '#f59e0b', width: 56, height: 56, mx: 'auto', mb: 1 }}>
                    <LocalShippingIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Fast Delivery</Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    Nationwide shipping in 2-3 days, with real-time order tracking and support.
                  </Typography>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Fade in={true} timeout={1500}>
                <Box sx={{
                  borderRadius: 3,
                  background: 'rgba(255,255,255,0.85)',
                  boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.10)',
                  p: 3,
                  textAlign: 'center',
                  mb: 2,
                }}>
                  <Avatar sx={{ bgcolor: '#e11d48', width: 56, height: 56, mx: 'auto', mb: 1 }}>
                    <Diversity3Icon fontSize="large" />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Community</Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    We support local artisans and foster a vibrant community of fabric lovers.
                  </Typography>
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
} 