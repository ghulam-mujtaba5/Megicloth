'use client';

import { Grid, Paper, TextField, Typography } from '@mui/material';

interface ShippingFormProps {
  formValues: {
    name: string;
    email: string;
    address: string;
    phone: string;
  };
  errors: {
    name?: string;
    email?: string;
    address?: string;
    phone?: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ShippingForm({ formValues, errors, handleChange }: ShippingFormProps) {
  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Shipping Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="name"
            label="Full Name"
            value={formValues.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="email"
            label="Email Address"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="address"
            label="Full Shipping Address"
            value={formValues.address}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
            required
            fullWidth
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="phone"
            label="Phone Number"
            value={formValues.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
            required
            fullWidth
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
