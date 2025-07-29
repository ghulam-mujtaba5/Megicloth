"use client";

import { useState } from 'react';
import { subscribeToNewsletter } from '@/app/lib/actions/newsletter';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    const result = await subscribeToNewsletter(email);

    if (result.success) {
      setMessage(result.message);
      setEmail('');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
        Subscribe to our Newsletter
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Get the latest updates on new products and upcoming sales.
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          type="email"
          label="Your email address"
          variant="outlined"
          size="small"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <Button type="submit" variant="contained" disabled={loading} sx={{ minWidth: 100 }}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Subscribe'}
        </Button>
      </Box>
      {message && (
        <Typography color="success.main" sx={{ mt: 1 }}>
          {message}
        </Typography>
      )}
      {error && (
        <Typography color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
