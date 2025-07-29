"use client";

import { useState, useEffect, useRef } from 'react';
import { Box, Button, TextField, Rating, Typography, Stack, Alert } from '@mui/material';
import { useFormStatus } from 'react-dom';

interface ReviewFormProps {
  productId: string;
  formAction: (payload: FormData) => void;
  formState: { errors?: any; success?: boolean };
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="contained" disabled={pending} sx={{ alignSelf: 'flex-start' }}>
      {pending ? 'Submitting...' : 'Submit Review'}
    </Button>
  );
}

export default function ReviewForm({ productId, formAction, formState }: ReviewFormProps) {
  const [rating, setRating] = useState<number | null>(4);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.success) {
      formRef.current?.reset();
      setRating(4);
    }
  }, [formState]);

  return (
    <Box component="form" action={formAction} ref={formRef} noValidate sx={{ mt: 1 }}>
      <Typography variant="h6" gutterBottom>Write a Review</Typography>
      <Stack spacing={2}>
        <input type="hidden" name="productId" value={productId} />
        <input type="hidden" name="rating" value={rating || ''} />
        <Rating
          name="rating-display"
          value={rating}
          onChange={(_, newValue) => {
            setRating(newValue);
          }}
        />
        {formState.errors?.rating && <Alert severity="error">{formState.errors.rating[0]}</Alert>}
        
        <TextField
          label="Your Name"
          name="author"
          required
          fullWidth
          error={!!formState.errors?.author}
          helperText={formState.errors?.author?.[0]}
        />
        <TextField
          label="Your Review"
          name="text"
          required
          fullWidth
          multiline
          rows={4}
          error={!!formState.errors?.text}
          helperText={formState.errors?.text?.[0]}
        />

        {formState.errors?._form && <Alert severity="error">{formState.errors._form[0]}</Alert>}
        {formState.success && <Alert severity="success">Review submitted successfully!</Alert>}

        <SubmitButton />
      </Stack>
    </Box>
  );
}
