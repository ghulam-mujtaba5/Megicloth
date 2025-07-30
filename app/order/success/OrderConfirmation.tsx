'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Typography, CircularProgress, Alert, Button, Paper, Divider } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Link from 'next/link';
import { verifyCheckoutSession } from '@/app/lib/actions/payments';
import type { Order } from '@/app/types';

export default function OrderConfirmation() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID provided.');
      setLoading(false);
      return;
    }

    const verifySession = async () => {
      try {
        const result = await verifyCheckoutSession(sessionId);
        if (result.error) {
          setError(result.error);
        } else if (result.order) {
          setOrder(result.order);
        }
      } catch (e) {
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [sessionId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!order) {
    return <Alert severity="warning">Could not retrieve order details.</Alert>;
  }

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'success.main' }} />
        <Typography variant="h4" component="h1" sx={{ mt: 2 }}>
          Thank you for your order!
        </Typography>
        <Typography color="text.secondary">
          Your order has been placed successfully.
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Order Summary</Typography>
      <Box sx={{ my: 2 }}>
        <Typography><strong>Order ID:</strong> {order.id}</Typography>
        <Typography><strong>Total:</strong> ${order.total.toFixed(2)}</Typography>
      </Box>
      <Button component={Link} href="/profile/orders" variant="contained" fullWidth>
        View My Orders
      </Button>
    </Paper>
  );
}
