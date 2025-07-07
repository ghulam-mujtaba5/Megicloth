"use client";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Fade } from "@mui/material";

export default function NotFound() {
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <Container maxWidth="sm" sx={{ py: { xs: 6, md: 12 } }}>
        <Fade in={true} timeout={800}>
          <Box sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                width: 140,
                height: 140,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.45)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                border: '1.5px solid rgba(255,255,255,0.25)',
              }}
            >
              <ErrorOutlineIcon sx={{ fontSize: 70, color: '#ef4444' }} />
            </Box>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.2rem', md: '3.2rem' },
                fontWeight: 900,
                mb: 2,
                background: 'linear-gradient(45deg, #ef4444 30%, #f59e0b 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-1.5px',
              }}
            >
              404 - Page Not Found
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#64748b',
                mb: 3,
                maxWidth: 500,
                mx: 'auto',
                lineHeight: 1.6,
                fontWeight: 500,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
              }}
            >
              Sorry, the page you are looking for does not exist or has been moved. Please check the URL or return to the homepage.
            </Typography>
            <Button
              component={Link}
              href="/"
              variant="contained"
              size="large"
              sx={{
                background: 'linear-gradient(45deg, #2563eb, #1e40af)',
                color: '#ffffff',
                px: 4,
                py: 1.5,
                fontSize: '1.125rem',
                fontWeight: 700,
                borderRadius: 3,
                boxShadow: '0 4px 16px #2563eb22',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1e40af, #2563eb)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Go to Homepage
            </Button>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
} 