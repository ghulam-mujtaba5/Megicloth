import { getAllReviews } from '@/app/lib/actions/reviews';
import ReviewsClientPage from './ReviewsClientPage';
import { Box, Typography } from '@mui/material';

export default async function AdminReviewsPage() {
  try {
    const reviews = await getAllReviews();
    return <ReviewsClientPage initialReviews={reviews} />;
  } catch (error) {
    console.error(error);
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Failed to load reviews. Please try again later.</Typography>
      </Box>
    );
  }
}
