"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import Seo from "../components/Seo";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", message: "" });
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
                <Paper elevation={0} sx={{
                  borderRadius: 4,
                  background: '#ffffff',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
                  p: { xs: 3, md: 4 },
                  height: '100%'
                }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#1e293b' }}>Send Us a Message</Typography>
                  <form onSubmit={handleSubmit} aria-label="Contact form">
                    <TextField fullWidth label="Name" name="name" value={form.name} onChange={handleChange} sx={{ mb: 2 }} required />
                    <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} sx={{ mb: 2 }} required type="email" />
                    <TextField fullWidth label="Message" name="message" value={form.message} onChange={handleChange} sx={{ mb: 2 }} required multiline minRows={5} />
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    {submitted && <Alert severity="success" sx={{ mb: 2 }}>Thank you for your message! We'll be in touch soon.</Alert>}
                    <Button type="submit" variant="contained" fullWidth sx={{ background: '#2563eb', color: '#fff', fontWeight: 700, borderRadius: 2, py: 1.5, fontSize: '1.1rem', '&:hover': { background: '#1e40af' } }}>
                      Submit
                    </Button>
                  </form>
                </Paper>
              </Fade>
            </Grid>
            <Grid item xs={12} md={5}>
              <Fade in={true} timeout={1100}>
                <Paper elevation={0} sx={{
                  borderRadius: 4,
                  background: '#ffffff',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
                  p: { xs: 3, md: 4 },
                  height: '100%'
                }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#1e293b' }}>Contact Information</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                    <EmailIcon sx={{ color: '#2563eb', mr: 1.5 }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>Email</Typography>
                      <Typography variant="body1" sx={{ color: '#475569' }}>support@megicloth.com</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                    <WhatsAppIcon sx={{ color: '#10b981', mr: 1.5 }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>WhatsApp Support</Typography>
                      <Typography variant="body1" sx={{ color: '#475569' }}>+92 300 1234567</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                    <LocationOnIcon sx={{ color: '#f59e0b', mr: 1.5 }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>Store Location</Typography>
                      <Typography variant="body1" sx={{ color: '#475569' }}>123 Textile Avenue, Lahore, Pakistan (Not a real address)</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
                    <AccessTimeIcon sx={{ color: '#ef4444', mr: 1.5 }} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>Business Hours</Typography>
                      <Typography variant="body1" sx={{ color: '#475569' }}>Monday - Saturday: 10:00 AM - 8:00 PM</Typography>
                      <Typography variant="body1" sx={{ color: '#475569' }}>Sunday: Closed</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}