"use client";

import { Box, Button, TextField, Typography, Rating } from "@mui/material";
import { useState } from "react";

const ReviewForm = ({ productId, onSubmit }: { productId: string, onSubmit: (review: any) => void }) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState<number | null>(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newReview = {
      id: Date.now(),
      name,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
    };
    onSubmit(newReview);
    setName('');
    setRating(5);
    setComment('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>Write a Review</Typography>
      <TextField
        label="Your Name"
        fullWidth
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Box sx={{ mb: 2 }}>
        <Typography component="legend">Your Rating</Typography>
        <Rating
          name="rating"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      </Box>
      <TextField
        label="Your Review"
        fullWidth
        required
        multiline
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained">
        Submit Review
      </Button>
    </Box>
  );
};

export default ReviewForm;
