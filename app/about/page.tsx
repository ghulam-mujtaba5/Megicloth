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
        title="About Megicloth | Our Story, Mission & Values"
        description="Discover the story behind Megicloth. Learn about our mission to empower the Pakistani textile industry, our vision for the future, and our commitment to quality, authenticity, and innovation."
        ogImage="/file.svg"
        canonical="https://megicloth.com/about"
      />
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', py: { xs: 4, md: 8 } }}>
        <Container maxWidth="lg">
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
              <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, fontSize: { xs: '2.5rem', md: '3.5rem' }, background: 'linear-gradient(45deg, #1e293b 30%, #2563eb 90%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1.5px' }}>
                Our Story: Weaving the Future of Pakistani Textiles
              </Typography>
              <Typography variant="h6" sx={{ color: '#334155', mb: 3, fontWeight: 400, fontSize: { xs: '1.1rem', md: '1.25rem' }, maxWidth: '800px', mx: 'auto' }}>
                Megicloth was born from a desire to celebrate and elevate the rich, vibrant heritage of the Pakistani textile industry. We provide a modern, premium, and accessible platform that connects talented local artisans and manufacturers with a discerning audience, both at home and abroad.
              </Typography>
            </Box>
          </Fade>

          <Grid container spacing={6} alignItems="center" sx={{ mb: 6 }}>
            <Grid item xs={12} md={6}>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: '#1e293b' }}>Our Mission</Typography>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#475569' }}>
                  To empower the Pakistani textile industry by providing a modern, accessible, and premium e-commerce platform for unstitched fabrics. We aim to connect artisans and manufacturers with a broader audience, celebrating the rich heritage of Pakistani textiles.
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: '#1e293b' }}>Our Vision</Typography>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#475569' }}>
                  To become the leading online destination for premium unstitched fabrics in Pakistan, known for our quality, customer experience, and commitment to the local textile industry.
                </Typography>
            </Grid>
          </Grid>

          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, color: '#1e293b' }}>Our Values & Manufacturing Ethos</Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Avatar sx={{ bgcolor: '#2563eb', width: 64, height: 64, mx: 'auto', mb: 2 }}><VerifiedIcon fontSize="large" /></Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Quality</Typography>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>We are committed to offering only the highest quality fabrics and materials.</Typography>
                  </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Avatar sx={{ bgcolor: '#10b981', width: 64, height: 64, mx: 'auto', mb: 2 }}><Diversity3Icon fontSize="large" /></Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Authenticity</Typography>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>We celebrate the rich traditions and craftsmanship of Pakistani textiles.</Typography>
                  </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Avatar sx={{ bgcolor: '#f59e0b', width: 64, height: 64, mx: 'auto', mb: 2 }}><LocalShippingIcon fontSize="large" /></Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Innovation</Typography>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>We leverage modern technology to create a seamless and enjoyable shopping experience.</Typography>
                  </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Avatar sx={{ bgcolor: '#e11d48', width: 64, height: 64, mx: 'auto', mb: 2 }}><TeamIcon fontSize="large" /></Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Customer-Centricity</Typography>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>We put our customers at the heart of everything we do.</Typography>
                  </Box>
              </Grid>
            </Grid>
          </Box>

        </Container>
      </Box>
    </>
  );
} 
