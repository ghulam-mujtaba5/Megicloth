"use client";

import { Box, Typography, Paper, Grid, Rating, Avatar } from '@mui/material';
import { FormatQuote } from '@mui/icons-material';
import type { Testimonial } from '@/app/types';

// A simple function to generate a color from a string for the avatar
function stringToColor(string: string) {
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

interface TestimonialsListProps {
  testimonials: Testimonial[];
}

export default function TestimonialsList({ testimonials }: TestimonialsListProps) {
  if (!testimonials || testimonials.length === 0) {
    return null; // Don't render the section if there are no testimonials
  }

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
        What Our Customers Say
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {testimonials.map((testimonial) => (
          <Grid item key={testimonial.id} xs={12} sm={6} md={4}>
            <Paper 
              elevation={2} 
              sx={{
                p: 3, 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <FormatQuote sx={{ fontSize: 60, color: 'grey.300', position: 'absolute', top: 0, right: 0, transform: 'rotate(180deg)' }} />
              <Typography variant="body1" sx={{ fontStyle: 'italic', flexGrow: 1, mb: 2 }}>
                “{testimonial.content}”
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
                <Avatar sx={{ bgcolor: stringToColor(testimonial.author), mr: 2 }}>
                  {testimonial.author.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{testimonial.author}</Typography>
                  {testimonial.rating && <Rating value={testimonial.rating} readOnly size="small" />}
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
