'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { createCheckoutSession } from '@/app/lib/actions/payments';
import type { CartItem } from '@/app/types';
import { Box, Button, Paper, TextField, Typography, Divider } from '@mui/material';

interface OrderSummaryProps {
  subtotal: number;
  shippingCost: number;
  onApplyPromoCode: (code: string) => number; // Returns discount amount
  cartItems: CartItem[];
}

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

export default function OrderSummary({ subtotal, shippingCost, onApplyPromoCode, cartItems }: OrderSummaryProps) {
    const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleApplyPromo = () => {
        const discountAmount = onApplyPromoCode(promoCode);
    setDiscount(discountAmount);
  };

    const handleCheckout = async () => {
    if (!stripePromise) {
      alert('Payment processing is not configured.');
      return;
    }
    setIsCheckingOut(true);
    const { sessionId, error } = await createCheckoutSession(cartItems);

    if (error) {
      alert(`Error: ${error}`);
      setIsCheckingOut(false);
      return;
    }

    if (sessionId) {
        const stripe = await stripePromise;
        if (stripe) {
            const { error: stripeError } = await stripe.redirectToCheckout({ sessionId });
            if (stripeError) {
                alert(`Stripe Error: ${stripeError.message}`);
            }
        }
    }
    setIsCheckingOut(false);
  };

  const total = subtotal - discount + shippingCost;

  return (
    <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 2, height: '100%' }}>
      <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
        Order Summary
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography color="text.secondary">Subtotal</Typography>
        <Typography>Rs. {subtotal.toLocaleString()}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography color="text.secondary">Shipping</Typography>
        <Typography>Rs. {shippingCost.toLocaleString()}</Typography>
      </Box>
      {discount > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, color: 'success.main' }}>
          <Typography>Discount</Typography>
          <Typography>- Rs. {discount.toLocaleString()}</Typography>
        </Box>
      )}
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', gap: 1, my: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Enter Promo Code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
        />
        <Button variant="contained" onClick={handleApplyPromo} disabled={!promoCode}>
          Apply
        </Button>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Total</Typography>
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Rs. {total.toLocaleString()}</Typography>
      </Box>
            <Button 
        fullWidth 
        variant="contained" 
        size="large" 
        sx={{ mt: 2 }} 
        onClick={handleCheckout}
        disabled={isCheckingOut || cartItems.length === 0 || !stripePromise}
      >
        {isCheckingOut ? 'Processing...' : !stripePromise ? 'Payments Unavailable' : 'Proceed to Checkout'}
      </Button>
    </Paper>
  );
}
