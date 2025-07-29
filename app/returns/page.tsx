"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import Seo from "../components/common/Seo";

export default function ReturnsPage() {
  return (
    <>
      <Seo
        title="Returns & Exchanges | Megicloth"
        description="Read our returns and exchanges policy. Learn how to return or exchange your purchase at Megicloth."
        ogImage="/file.svg"
        canonical="https://megicloth.com/returns"
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
                Returns & Exchanges
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 3, textAlign: 'center' }}>
                Last updated: April 2024
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#2563eb' }}>1. Return Policy</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                We want you to love your purchase! If you are not satisfied, you may return unstitched fabric within 7 days of delivery. Items must be unused, unwashed, and in original packaging.
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#2563eb' }}>2. Exchange Policy</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Exchanges are allowed for size, color, or fabric issues, subject to stock availability. Please contact our support team to initiate an exchange.
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#2563eb' }}>3. How to Return or Exchange</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Email us at support@megicloth.com or use the Contact Us page with your order number and reason for return/exchange. Our team will guide you through the process.
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#2563eb' }}>4. Refunds</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Once your return is received and inspected, we will notify you of the approval or rejection of your refund. Approved refunds will be processed to your original payment method within 7 business days.
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#2563eb' }}>5. Non-Returnable Items</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Stitched, customized, or used fabrics are not eligible for return or exchange unless defective or damaged upon arrival.
              </Typography>
              <Divider sx={{ my: 4 }} />
              <Typography variant="body2" sx={{ color: '#64748b', textAlign: 'center' }}>
                For any questions or assistance, please contact us at support@megicloth.com.
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Box>
    </>
  );
} 