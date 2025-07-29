"use client";
import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import Link from "next/link";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ReceiptIcon from "@mui/icons-material/Receipt";

// Removed unused imports

export default function OrderSuccessPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  
  // Generate order number and delivery date on mount
  useEffect(() => {
    const generateOrderNumber = () => {
      const timestamp = Date.now().toString().slice(-6);
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      return `MC${timestamp}${random}`;
    };

    const calculateDeliveryDate = () => {
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 3); // 3 days from now
      return deliveryDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    setOrderNumber(generateOrderNumber());
    setEstimatedDelivery(calculateDeliveryDate());
  }, []);

  // Glassmorphism style for main card and summary
  const glassCardSx = {
    borderRadius: 4,
    background: 'rgba(255,255,255,0.65)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.25)',
    overflow: 'hidden',
    p: { xs: 2, md: 4 },
  };

  // Neomorphic style for info cards and buttons
  const neoCardSx = {
    borderRadius: 4,
    background: '#f7fafc',
    boxShadow: '8px 8px 24px #e2e8f0, -8px -8px 24px #ffffff',
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
    border: '1.5px solid #e2e8f0',
    '&:hover': {
      boxShadow: '0 12px 32px rgba(31,38,135,0.10), 0 1.5px 8px #e0e7ef',
      transform: 'scale(1.01)',
      borderColor: '#cbd5e1',
    },
  };

// Removed unused variable neoButtonSx

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Success Header (Glassmorphism) */}
        <Slide direction="down" in={true} timeout={800}>
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
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
              <CheckCircleIcon sx={{ fontSize: 70, color: '#10b981' }} />
            </Box>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.2rem', md: '3.2rem' },
                fontWeight: 900,
                mb: 2,
                background: 'linear-gradient(45deg, #10b981 30%, #059669 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-1.5px',
              }}
            >
              Order Confirmed!
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#64748b',
                mb: 3,
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6,
                fontWeight: 500,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
              }}
            >
              Thank you for your order! We&apos;ve received your payment and your order is being processed.
            </Typography>
            <Chip
              label={`Order #${orderNumber}`}
              color="primary"
              sx={{
                fontSize: '1.125rem',
                fontWeight: 700,
                py: 1,
                px: 2,
                background: 'linear-gradient(45deg, #2563eb, #1e40af)',
                color: '#ffffff',
              }}
            />
          </Box>
        </Slide>
        <Grid container spacing={3}>
          {/* Order Details (Neomorphic) */}
          <Grid item xs={12} lg={8}>
            <Box sx={neoCardSx}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Order Details
              </Typography>

              {/* Order Summary */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Order Summary
                </Typography>
                <Box sx={{ background: '#f8fafc', p: 2, borderRadius: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" color="text.secondary">
                        Order Number
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {orderNumber}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" color="text.secondary">
                        Order Date
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {new Date().toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" color="text.secondary">
                        Payment Status
                      </Typography>
                      <Chip
                        label="Paid"
                        color="success"
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" color="text.secondary">
                        Order Status
                      </Typography>
                      <Chip
                        label="Processing"
                        color="primary"
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>

              {/* Delivery Information */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Delivery Information
                </Typography>
                <Box sx={{ background: '#f8fafc', p: 2, borderRadius: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <LocalShippingIcon sx={{ color: '#10b981', fontSize: 20 }} />
                        <Typography variant="body2" color="text.secondary">
                          Estimated Delivery
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {estimatedDelivery}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <ReceiptIcon sx={{ color: '#2563eb', fontSize: 20 }} />
                        <Typography variant="body2" color="text.secondary">
                          Shipping Method
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Standard Delivery (2-3 days)
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>

              {/* What's Next */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  What&apos;s Next?
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 1,
                        }}
                      >
                        <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 700 }}>
                          1
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        Order Processing
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        We&apos;ll prepare your order
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          background: 'linear-gradient(45deg, #3b82f6, #2563eb)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 1,
                        }}
                      >
                        <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 700 }}>
                          2
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        Shipped
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        We&apos;ll ship your order
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          background: 'linear-gradient(45deg, #10b981, #059669)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 1,
                        }}
                      >
                        <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 700 }}>
                          3
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        Delivered
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        You&apos;ll receive your order
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          background: 'linear-gradient(45deg, #8b5cf6, #7c3aed)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 1,
                        }}
                      >
                        <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 700 }}>
                          4
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        Enjoy!
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Start using your products
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>

          {/* Contact & Actions */}
          <Grid item xs={12} lg={4}>
            <Box sx={glassCardSx}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Need Help?
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <EmailIcon sx={{ color: '#2563eb' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Email Support
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    support@megicloth.com
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <PhoneIcon sx={{ color: '#10b981' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Phone Support
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    +92 300 1234567
                  </Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Our customer support team is available 24/7 to help you with any questions.
              </Typography>
            </Box>

            {/* Action Buttons */}
            <Card sx={{ borderRadius: 3, background: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                  What would you like to do?
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    component={Link}
                    href="/products"
                    variant="contained"
                    startIcon={<ShoppingBagIcon />}
                    fullWidth
                    sx={{
                      background: 'linear-gradient(45deg, #2563eb, #1e40af)',
                      color: '#ffffff',
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1e40af, #1e3a8a)',
                      },
                    }}
                  >
                    Continue Shopping
                  </Button>
                  
                  <Button
                    component={Link}
                    href="/"
                    variant="outlined"
                    startIcon={<HomeIcon />}
                    fullWidth
                    sx={{
                      borderColor: '#2563eb',
                      color: '#2563eb',
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: '#1e40af',
                        background: 'rgba(37,99,235,0.04)',
                      },
                    }}
                  >
                    Back to Home
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Important Information */}
            <Alert severity="info" sx={{ borderRadius: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                Important Information
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • You&apos;ll receive an email confirmation shortly<br/>
                • Track your order using the order number<br/>
                • Contact us if you have any questions
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 