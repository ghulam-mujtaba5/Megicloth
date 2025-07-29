"use client";

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import Seo from "../components/common/Seo";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm, { ContactFormValues } from "../components/contact/ContactForm";
import { submitContactForm } from './actions';

const initialState = {
  message: '',
  errors: {},
};

export default function ContactPage() {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (state.message.startsWith('Success')) {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 4000);
    }
    setIsLoading(false);
  }, [state]);

  const handleFormSubmit = (data: ContactFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    setIsLoading(true);
    formAction(formData);
  };

  return (
    <>
      <Seo
        title="Contact Us | Megicloth"
        description="Get in touch with Megicloth for support, inquiries, or feedback. We're available via email, WhatsApp, and at our store location during business hours."
        ogImage="/file.svg"
        canonical="https://megicloth.com/contact"
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
                Get In Touch
              </Typography>
              <Typography variant="h6" sx={{ color: '#334155', mb: 3, fontWeight: 400, fontSize: { xs: '1.1rem', md: '1.25rem' }, maxWidth: '800px', mx: 'auto' }}>
                Have a question, comment, or feedback? Our team is here to help. Reach out to us through any of the channels below, and we'll get back to you as soon as possible.
              </Typography>
            </Box>
          </Fade>
          <Grid container spacing={6}>
            <Grid item xs={12} md={7}>
              <Fade in={true} timeout={900}>
                <ContactForm 
                  onSubmit={handleFormSubmit} 
                  isLoading={isLoading} 
                  isSuccess={isSuccess} 
                  error={state.message.startsWith('Error') ? state.message : null} 
                />
              </Fade>
            </Grid>
            <Grid item xs={12} md={5}>
              <Fade in={true} timeout={1100}>
                <ContactInfo />
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}