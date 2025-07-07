"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Seo from "../components/Seo";

export default function ShippingPage() {
  return (
    <>
      <Seo
        title="Shipping Information | Megicloth"
        description="Learn about Megicloth's shipping policies, delivery times, and charges. Fast, reliable delivery across Pakistan."
        ogImage="/file.svg"
        canonical="https://megicloth.com/shipping"
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
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <LocalShippingIcon sx={{ color: '#2563eb', fontSize: 40, mr: 1 }} />
                <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: '2rem', md: '2.5rem' }, color: '#1e293b', letterSpacing: '-1.5px', textAlign: 'center' }}>
                  Shipping Information
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 3, textAlign: 'center' }}>
                Last updated: April 2024
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#2563eb' }}>1. Delivery Time</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                We deliver nationwide in Pakistan within 2-3 business days after order confirmation. Orders placed on weekends or holidays will be processed the next business day.
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#2563eb' }}>2. Shipping Charges</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Shipping is free for orders above PKR 2,000. For orders below this amount, a flat shipping fee of PKR 200 applies. Cash on Delivery (COD) orders may incur an additional PKR 50 fee.
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#2563eb' }}>3. Order Tracking</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Once your order is shipped, you will receive a tracking link via email and SMS. You can also track your order status in your account dashboard.
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#2563eb' }}>4. Delivery Partners</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                We partner with leading courier services to ensure safe and timely delivery of your orders.
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#2563eb' }}>5. International Shipping</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Currently, we only deliver within Pakistan. For international orders, please contact our support team for special arrangements.
              </Typography>
              <Divider sx={{ my: 4 }} />
              <Typography variant="body2" sx={{ color: '#64748b', textAlign: 'center' }}>
                For any shipping-related questions, please contact us at support@megicloth.com.
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Box>
    </>
  );
} 