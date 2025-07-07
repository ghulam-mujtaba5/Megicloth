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
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
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
        description="Contact Megicloth for support, questions, or feedback. We're here to help you with your premium fabric shopping experience."
        ogImage="/file.svg"
        canonical="https://megicloth.com/contact"
      />
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', py: { xs: 4, md: 8 } }}>
        <Container maxWidth="md">
          <Fade in={true} timeout={700}>
            <Box sx={{
              borderRadius: 4,
              background: '#f7fafc',
              boxShadow: '8px 8px 24px #e2e8f0, -8px -8px 24px #ffffff',
              p: { xs: 3, md: 6 },
              mb: 6,
              textAlign: 'center',
            }}>
              <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, fontSize: { xs: '2rem', md: '2.5rem' }, background: 'linear-gradient(45deg, #1e293b 30%, #2563eb 90%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-1.5px' }}>
                Contact Us
              </Typography>
              <Typography variant="h5" sx={{ color: '#64748b', mb: 3, fontWeight: 500, fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                We'd love to hear from you! Reach out with questions, feedback, or just to say hello.
              </Typography>
            </Box>
          </Fade>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Fade in={true} timeout={900}>
                <Paper elevation={0} sx={{
                  borderRadius: 4,
                  background: '#f7fafc',
                  boxShadow: '2px 2px 8px #e2e8f0, -2px -2px 8px #ffffff',
                  p: { xs: 2, md: 4 },
                  mb: 2,
                }}>
                  <form onSubmit={handleSubmit} aria-label="Contact form">
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      sx={{ mb: 2 }}
                      required
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      sx={{ mb: 2 }}
                      required
                      type="email"
                    />
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      sx={{ mb: 2 }}
                      required
                      multiline
                      minRows={4}
                    />
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    {submitted && <Alert severity="success" sx={{ mb: 2 }}>Thank you for contacting us! We'll get back to you soon.</Alert>}
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{
                        background: 'linear-gradient(45deg, #2563eb, #10b981)',
                        color: '#fff',
                        fontWeight: 700,
                        borderRadius: 2,
                        py: 1.2,
                        fontSize: '1.1rem',
                        boxShadow: '0 4px 16px #2563eb22',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #10b981, #2563eb)',
                        },
                      }}
                    >
                      Send Message
                    </Button>
                  </form>
                </Paper>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Fade in={true} timeout={1100}>
                <Box sx={{
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.85)',
                  boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.10)',
                  p: { xs: 2, md: 4 },
                  mb: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#1e293b' }}>Contact Information</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EmailIcon sx={{ color: '#2563eb', mr: 1 }} />
                    <Typography variant="body2">support@megicloth.com</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocalPhoneIcon sx={{ color: '#10b981', mr: 1 }} />
                    <Typography variant="body2">+92 300 1234567</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOnIcon sx={{ color: '#f59e0b', mr: 1 }} />
                    <Typography variant="body2">Lahore, Pakistan</Typography>
                  </Box>
                  <Box sx={{ width: '100%', height: 180, borderRadius: 3, overflow: 'hidden', boxShadow: 1, background: '#e0e7ef', display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                    <Typography variant="body2" sx={{ color: '#64748b' }}>
                      [Map Placeholder]
                    </Typography>
                  </Box>
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
} 