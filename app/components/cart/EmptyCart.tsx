'use client';

import Link from 'next/link';
import { Box, Typography, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function EmptyCart() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        textAlign: 'center',
      }}
    >
      <ShoppingCartIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
      <Typography variant="h5" component="h2" sx={{ mb: 1, fontWeight: 'bold' }}>
        Your Cart is Empty
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Looks like you haven&#39;t added anything to your cart yet.
      </Typography>
      <Link href="/products" passHref>
        <Button variant="contained" size="large">
          Continue Shopping
        </Button>
      </Link>
    </Box>
  );
}
