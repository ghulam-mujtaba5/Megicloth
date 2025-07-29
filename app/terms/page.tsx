"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import Seo from "../components/common/Seo";

export default function TermsPage() {
  return (
    <>
      <Seo
        title="Terms & Conditions | Megicloth"
        description="Read the terms and conditions for using Megicloth. Learn about our policies on orders, payments, returns, privacy, and more."
        ogImage="/file.svg"
        canonical="https://megicloth.com/terms"
      />
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', py: { xs: 4, md: 8 } }}>
        <Container maxWidth="md">
          <Fade in={true} timeout={700}>
            <Box sx={{
              borderRadius: 4,
              background: '#fff',
              boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.08)',
              p: { xs: 3, md: 6 },
              mb: 6,
            }}>
              <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, fontSize: { xs: '2rem', md: '2.5rem' }, color: '#1e293b', letterSpacing: '-1.5px', textAlign: 'center' }}>
                Terms & Conditions
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 3, textAlign: 'center' }}>
                Last updated: April 2024
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#2563eb' }}>1. Acceptance of Terms</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                By accessing or using the Megicloth website, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services.
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#2563eb' }}>2. Products & Orders</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                All products are subject to availability. We reserve the right to limit quantities or discontinue any product at any time. Prices and descriptions are subject to change without notice.
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#2563eb' }}>3. Payment & Billing</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                You agree to provide current, complete, and accurate purchase and account information. We accept various payment methods as displayed at checkout.
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#2563eb' }}>4. Shipping & Delivery</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Orders are shipped within 1-2 business days. Delivery times may vary based on location. We are not responsible for delays outside our control.
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#2563eb' }}>5. Returns & Exchanges</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Please review our Returns & Exchanges policy for details on how to return or exchange items.
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#2563eb' }}>6. Privacy</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#2563eb' }}>7. Changes to Terms</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                We reserve the right to update these Terms & Conditions at any time. Changes will be posted on this page with an updated effective date.
              </Typography>
              <Divider sx={{ my: 4 }} />
              <Typography variant="body2" sx={{ color: '#64748b', textAlign: 'center' }}>
                If you have any questions about these Terms & Conditions, please contact us at support@megicloth.com.
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Box>
    </>
  );
} 