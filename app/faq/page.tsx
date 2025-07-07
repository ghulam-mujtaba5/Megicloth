"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Seo from "../components/Seo";

const faqs = [
  {
    question: "What types of fabrics do you offer?",
    answer: "We offer a wide range of premium unstitched fabrics including lawn, cotton, embroidered lawn, and more for both men and women.",
  },
  {
    question: "How long does delivery take?",
    answer: "We deliver nationwide in Pakistan within 2-3 business days. You will receive a tracking link once your order is shipped.",
  },
  {
    question: "Can I return or exchange an item?",
    answer: "Yes! We offer a 7-day return and exchange policy. Please see our Returns & Exchanges page for details.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Cash on Delivery, PayFast (cards, wallets, bank), and other secure payment options.",
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach us via the Contact Us page, email at support@megicloth.com, or call our helpline at +92 300 1234567.",
  },
];

export default function FAQPage() {
  return (
    <>
      <Seo
        title="Frequently Asked Questions | Megicloth"
        description="Find answers to common questions about shopping at Megicloth, including delivery, returns, payment, and more."
        ogImage="/file.svg"
        canonical="https://megicloth.com/faq"
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
              <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, fontSize: { xs: '2rem', md: '2.5rem' }, background: 'linear-gradient(45deg, #1e293b 30%, #2563eb 90%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1.5px', textAlign: 'center' }}>
                Frequently Asked Questions
              </Typography>
              <Typography variant="h5" sx={{ color: '#64748b', mb: 3, fontWeight: 500, fontSize: { xs: '1.1rem', md: '1.25rem' }, textAlign: 'center' }}>
                Find answers to common questions about shopping at Megicloth.
              </Typography>
              {faqs.map((faq, idx) => (
                <Accordion key={idx} sx={{ mb: 2, borderRadius: 2, background: 'rgba(255,255,255,0.85)', boxShadow: '0 2px 8px 0 rgba(31, 38, 135, 0.08)', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.12)' } }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`faq-content-${idx}`}
                    id={`faq-header-${idx}`}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#2563eb' }}>{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" sx={{ color: '#334155' }}>{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Fade>
        </Container>
      </Box>
    </>
  );
} 