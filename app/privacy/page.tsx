"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import Seo from "../components/common/Seo";

export default function PrivacyPage() {
  return (
    <>
      <Seo
        title="Privacy Policy | Megicloth"
        description="Learn how Megicloth collects, uses, and protects your personal information. Read our privacy policy for details."
        ogImage="/file.svg"
        canonical="https://megicloth.com/privacy"
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
                Privacy Policy
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 3, textAlign: 'center' }}>
                Last updated: April 2024
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#2563eb' }}>1. Information We Collect</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                We collect information you provide when you create an account, place an order, subscribe to our newsletter, or contact us. This may include your name, email, address, phone number, and payment details.
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#2563eb' }}>2. How We Use Your Information</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                We use your information to process orders, provide customer support, send updates, and improve our services. We may also use your email to send promotional offers, which you can opt out of at any time.
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#2563eb' }}>3. Sharing Your Information</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                We do not sell your personal information. We may share it with trusted partners for order fulfillment, payment processing, or legal compliance.
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#2563eb' }}>4. Data Security</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                We implement industry-standard security measures to protect your data. However, no method of transmission over the Internet is 100% secure.
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#2563eb' }}>5. Cookies & Tracking</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                We use cookies and similar technologies to enhance your experience, analyze site usage, and deliver personalized content.
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#2563eb' }}>6. Your Rights</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                You may request access to, correction of, or deletion of your personal information by contacting us at support@megicloth.com.
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#2563eb' }}>7. Changes to This Policy</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
              </Typography>
              <Divider sx={{ my: 4 }} />
              <Typography variant="body2" sx={{ color: '#64748b', textAlign: 'center' }}>
                If you have any questions about this Privacy Policy, please contact us at support@megicloth.com.
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Box>
    </>
  );
} 