import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Box, CircularProgress } from '@mui/material';
import OrderConfirmation from './OrderConfirmation';

export const metadata: Metadata = {
  title: 'Order Successful | Megicloth',
  description: 'Thank you for your purchase!',
};

export default function OrderSuccessPage() {
  return (
    <Box sx={{ textAlign: 'center', py: { xs: 4, md: 8 } }}>
      <Suspense fallback={<CircularProgress />}>
        <OrderConfirmation />
      </Suspense>
    </Box>
  );
}
