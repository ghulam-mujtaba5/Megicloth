'use client';

import { Paper, TextField, Typography } from '@mui/material';

interface OrderNotesProps {
  orderNotes: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function OrderNotes({ orderNotes, handleChange }: OrderNotesProps) {
  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 2, mt: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Order Notes (Optional)
      </Typography>
      <TextField
        name="orderNotes"
        label="Special instructions for your order..."
        value={orderNotes}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
      />
    </Paper>
  );
}
