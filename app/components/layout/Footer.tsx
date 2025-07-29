"use client";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LockIcon from "@mui/icons-material/Lock";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CelebrationIcon from '@mui/icons-material/Celebration';
import MuiLink from '@mui/material/Link';
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  // Newsletter state/logic (mirrored from homepage)
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<'idle'|'success'|'error'>('idle');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setNewsletterStatus('error');
      return;
    }
    setNewsletterStatus('success');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1800);
    setTimeout(() => setNewsletterStatus('idle'), 2500);
    setNewsletterEmail("");
  };

  const renderFooterLink = ({ href, label }: { href: string; label: string }) => (
    <Link key={href} href={href} passHref legacyBehavior>
      <Typography
        component="a"
        sx={{
          color: 'primary.main',
          fontWeight: 600,
          textDecoration: 'none',
          outline: 'none',
          '&:hover': {
            textDecoration: 'underline',
            color: 'primary.dark',
          },
        }}
      >
        {label}
      </Typography>
    </Link>
  );
  return (
    <Box sx={{ background: 'rgba(255,255,255,0.85)', borderTop: '1.5px solid #e2e8f0', mt: 8, backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={{ xs: 6, md: 4 }}>
          {/* Column 1: Brand Info & Newsletter */}
          <Grid item xs={12} md={4} lg={4}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  letterSpacing: '-2px',
                  background: 'linear-gradient(45deg, #2563eb 30%, #10b981 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: 'Poppins, Inter, sans-serif',
                  mb: 1,
                  userSelect: 'none',
                }}
                component={Link}
                href="/"
                aria-label="Megicloth Home"
              >
                Megicloth
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 2 }}>
                Premium Unstitched Fabrics. Elevate your wardrobe with quality and style.
              </Typography>
              <Box component="form" aria-label="Newsletter signup" role="form" onSubmit={handleNewsletterSubmit} sx={{ display: 'flex', gap: 1, maxWidth: 340 }}>
                <TextField
                  type="email"
                  placeholder="Your email"
                  size="small"
                  sx={{ background: '#f7fafc', borderRadius: 2, flex: 1 }}
                  InputProps={{
                    startAdornment: (
                      <EmailIcon color="action" sx={{ mr: 1 }} />
                    ),
                    'aria-label': 'Email address',
                  }}
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(45deg, #2563eb, #10b981)',
                    color: '#fff',
                    fontWeight: 700,
                    borderRadius: 2,
                    px: 3,
                    '&:hover, &:focus': {
                      background: 'linear-gradient(45deg, #10b981, #2563eb)',
                      boxShadow: '0 4px 16px #2563eb22',
                    },
                  }}
                >
                  Subscribe
                </Button>
              </Box>
              {newsletterStatus === 'success' && (
                <Fade in={newsletterStatus === 'success'} unmountOnExit>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: '#10b981', mt: 2 }}>
                    <CheckCircleIcon sx={{ mr: 1 }} />
                    <Typography>Thank you for subscribing!</Typography>
                    {showConfetti && <CelebrationIcon sx={{ ml: 1, color: '#f59e0b', fontSize: 32, animation: 'spin 1.2s linear' }} />}
                  </Box>
                </Fade>
              )}
              {newsletterStatus === 'error' && (
                <Fade in={newsletterStatus === 'error'} unmountOnExit>
                  <Typography sx={{ color: '#ef4444', mt: 2 }}>Please enter a valid email address.</Typography>
                </Fade>
              )}
            </Box>
            <Box aria-label="Social links" role="navigation" sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Zoom in={true}><IconButton component="a" href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook" sx={{ color: '#2563eb', transition: 'transform 0.2s', '&:hover, &:focus': { transform: 'scale(1.15)', background: '#e0e7ef' } }}><FacebookIcon /></IconButton></Zoom>
              <Zoom in={true}><IconButton component="a" href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" sx={{ color: '#10b981', transition: 'transform 0.2s', '&:hover, &:focus': { transform: 'scale(1.15)', background: '#e0e7ef' } }}><InstagramIcon /></IconButton></Zoom>
              <Zoom in={true}><IconButton component="a" href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter" sx={{ color: '#64748b', transition: 'transform 0.2s', '&:hover, &:focus': { transform: 'scale(1.15)', background: '#e0e7ef' } }}><TwitterIcon /></IconButton></Zoom>
            </Box>
          </Grid>

          {/* Links Section */}
          <Grid item xs={12} md={8} lg={5}>
            <Grid container spacing={4}>
              {/* Column 1: Shop */}
              <Grid item xs={6} sm={4}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1e293b' }}>Shop</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {[
                    { href: '/products', label: 'All Products' },
                    { href: '/categories', label: 'Categories' },
                    { href: '/sale', label: 'On Sale' },
                    { href: '/new-arrivals', label: 'New Arrivals' },
                  ].map(renderFooterLink)}
                </Box>
              </Grid>
              {/* Column 2: Customer Service */}
              <Grid item xs={6} sm={4}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1e293b' }}>Support</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {[
                    { href: '/contact', label: 'Contact Us' },
                    { href: '/faq', label: 'FAQ' },
                    { href: '/shipping', label: 'Shipping' },
                    { href: '/returns', label: 'Returns' },
                  ].map(renderFooterLink)}
                </Box>
              </Grid>
              {/* Column 3: Company */}
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1e293b' }}>Company</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {[
                    { href: '/about', label: 'About Us' },
                    { href: '/privacy', label: 'Privacy Policy' },
                    { href: '/terms', label: 'Terms of Service' },
                  ].map(renderFooterLink)}
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Contact & Trust Badges */}
          <Grid item xs={12} md={4} lg={3}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1e293b' }}>
                Contact Us
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>
                Email: <MuiLink href="mailto:support@megicloth.com" sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>support@megicloth.com</MuiLink>
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 3 }}>
                Phone: <MuiLink href="tel:+923001234567" sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>+92 300 1234567</MuiLink>
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1e293b' }}>
                Why Shop With Us?
              </Typography>
              <Box aria-label="Trust badges" role="region">
                <Zoom in={true}><Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, transition: 'transform 0.2s', '&:hover, &:focus': { transform: 'scale(1.08)', background: '#f0fdf4' } }} tabIndex={0}><VerifiedUserIcon sx={{ color: '#10b981', fontSize: 28 }} /><Typography variant="body2" sx={{ color: '#64748b' }}>100% Authentic Fabrics</Typography></Box></Zoom>
                <Zoom in={true}><Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, transition: 'transform 0.2s', '&:hover, &:focus': { transform: 'scale(1.08)', background: '#eff6ff' } }} tabIndex={0}><LocalShippingIcon sx={{ color: '#2563eb', fontSize: 28 }} /><Typography variant="body2" sx={{ color: '#64748b' }}>Fast Nationwide Delivery</Typography></Box></Zoom>
                <Zoom in={true}><Box sx={{ display: 'flex', alignItems: 'center', gap: 2, transition: 'transform 0.2s', '&:hover, &:focus': { transform: 'scale(1.08)', background: '#fef9c3' } }} tabIndex={0}><LockIcon sx={{ color: '#f59e0b', fontSize: 28 }} /><Typography variant="body2" sx={{ color: '#64748b' }}>Secure Payments</Typography></Box></Zoom>
              </Box>
            </Box>
          </Grid>

        </Grid>
        <Box sx={{ borderTop: '1.5px solid #e2e8f0', mt: 6, pt: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            &copy; {new Date().getFullYear()} Megicloth. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
} 