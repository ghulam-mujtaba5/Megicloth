import { getAllTestimonials } from '@/app/lib/actions/testimonials';
import TestimonialsClientPage from './TestimonialsClientPage';
import { Box, Typography } from '@mui/material';

export default async function AdminTestimonialsPage() {
  try {
    const testimonials = await getAllTestimonials();
    return <TestimonialsClientPage initialTestimonials={testimonials} />;
  } catch (error) {
    console.error(error);
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Failed to load testimonials. Please try again later.</Typography>
      </Box>
    );
  }
}
