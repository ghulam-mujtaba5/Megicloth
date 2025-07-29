'use client';

import { FormControl, FormControlLabel, Paper, Radio, RadioGroup, Typography } from '@mui/material';

interface PaymentOptionsProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

export default function PaymentOptions({ paymentMethod, setPaymentMethod }: PaymentOptionsProps) {
  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 2, mt: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Payment Method
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          row
          name="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
          <FormControlLabel value="jazzcash" control={<Radio />} label="JazzCash" disabled />
          <FormControlLabel value="card" control={<Radio />} label="Debit/Credit Card" disabled />
        </RadioGroup>
      </FormControl>
    </Paper>
  );
}
