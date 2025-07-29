"use client";

import { useState } from 'react';
import { createTestimonial } from '@/app/lib/actions/testimonials';
import { 
  Box, Typography, TextField, Button, Paper, Rating, CircularProgress, Alert 
} from '@mui/material';

const initialState = {
  author: '',
  content: '',
  rating: 4,
  is_published: false,
};

export default function TestimonialForm() {
  const [formState, setFormState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSuccessMessage('');
    setErrors({});

    const result = await createTestimonial(formState);

    if (result.success) {
      setSuccessMessage('Thank you! Your testimonial has been submitted for review.');
      setFormState(initialState);
    } else {
      if (result.error && typeof result.error !== 'string') {
        setErrors(result.error);
      } else {
        setErrors({ form: [result.error || 'An unexpected error occurred.'] });
      }
    }
    setLoading(false);
  };

  return (
    <Paper sx={{ p: { xs: 2, md: 4 }, mt: 4 }}>
      <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
        Share Your Experience
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField 
          name="author" 
          label="Your Name" 
          fullWidth 
          value={formState.author} 
          onChange={handleChange} 
          error={!!errors.author} 
          helperText={errors.author?.[0]} 
        />
        <TextField 
          name="content" 
          label="Your Testimonial" 
          fullWidth 
          multiline 
          rows={4} 
          value={formState.content} 
          onChange={handleChange} 
          error={!!errors.content} 
          helperText={errors.content?.[0]} 
        />
        <Box>
          <Typography component="legend">Rating</Typography>
          <Rating 
            name="rating" 
            value={formState.rating} 
            onChange={(_, newValue) => {
              setFormState(prev => ({ ...prev, rating: newValue || 0 }));
            }}
          />
        </Box>
        {errors.form && <Alert severity="error">{errors.form[0]}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        <Button variant="contained" onClick={handleSubmit} disabled={loading} sx={{ mt: 1 }}>
          {loading ? <CircularProgress size={24} /> : 'Submit Testimonial'}
        </Button>
      </Box>
    </Paper>
  );
}
