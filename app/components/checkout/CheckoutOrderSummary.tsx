'use client';

import { useCart } from '../../context/CartContext';
import { Avatar, Box, Button, Divider, Paper, Typography } from '@mui/material';

interface CheckoutOrderSummaryProps {
  isSubmitting: boolean;
}

export default function CheckoutOrderSummary({ isSubmitting }: CheckoutOrderSummaryProps) {
  const { cart, subtotal, discount, shippingCost, total } = useCart();

  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 2, position: 'sticky', top: 88 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Order Summary
      </Typography>
      {cart.map(item => (
        <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar src={item.images && item.images.length > 0 ? item.images[0] : ''} alt={item.name} variant="rounded" sx={{ width: 60, height: 60 }} />
            <Box>
              <Typography sx={{ fontWeight: 500 }}>{item.name}</Typography>
              <Typography color="text.secondary" variant="body2">
                Qty: {item.quantity}
              </Typography>
            </Box>
          </Box>
          <Typography sx={{ fontWeight: 500 }}>
            Rs. {((item.salePrice ?? item.price) * item.quantity).toLocaleString()}
          </Typography>
        </Box>
      ))}
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Subtotal</Typography>
        <Typography>Rs. {subtotal.toLocaleString()}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Shipping</Typography>
        <Typography>Rs. {shippingCost.toLocaleString()}</Typography>
      </Box>
      {discount > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, color: 'success.main' }}>
          <Typography>Discount</Typography>
          <Typography>- Rs. {discount.toLocaleString()}</Typography>
        </Box>
      )}
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Total
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Rs. {total.toLocaleString()}
        </Typography>
      </Box>
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, py: 1.5, fontSize: 16 }} disabled={isSubmitting}>
        {isSubmitting ? 'Placing Order...' : 'Place Order'}
      </Button>
    </Paper>
  );
}
