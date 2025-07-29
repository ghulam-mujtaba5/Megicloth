'use client';

import { useState, useMemo } from 'react';
import { Container, Grid, Typography, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import type { CartItem } from '@/app/types';

import EmptyCart from '../components/cart/EmptyCart';
import OrderSummary from '../components/cart/OrderSummary';
import CartItemsTable from '../components/cart/CartItemsTable';

interface CartClientPageProps {
  initialCart: CartItem[];
}

export default function CartClientPage({ initialCart }: CartClientPageProps) {
  const [cart, setCart] = useState(initialCart);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [dialogOpen, setDialogOpen] = useState(false);

  const { subtotal, shippingCost } = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + (item.salePrice ?? item.price) * item.quantity, 0);
    const shippingCost = subtotal > 50 ? 0 : 5; // Example shipping logic
    return { subtotal, shippingCost };
  }, [cart]);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    // This will be replaced by a server action
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const handleRemoveItem = (id: string) => {
    // This will be replaced by a server action
    setCart(prev => prev.filter(item => item.id !== id));
    setSnackbar({ open: true, message: 'Item removed from cart' });
  };

  const handleClearCart = () => {
    // This will be replaced by a server action
    setCart([]);
    setDialogOpen(false);
    setSnackbar({ open: true, message: 'Cart has been cleared' });
  };

  const handleApplyPromoCode = (code: string) => {
    if (code === 'MEGI10') {
      setSnackbar({ open: true, message: 'Promo code applied!' });
      return subtotal * 0.1; // 10% discount
    }
    setSnackbar({ open: true, message: 'Invalid promo code.' });
    return 0;
  };

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
        Your Shopping Cart
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <CartItemsTable 
            items={cart} 
            onUpdateQuantity={handleUpdateQuantity} 
            onRemoveItem={handleRemoveItem}
            onClearCart={() => setDialogOpen(true)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <OrderSummary 
            subtotal={subtotal}
            shippingCost={shippingCost}
            onApplyPromoCode={handleApplyPromoCode}
          />
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity="info" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirm Clear Cart</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to remove all items from your cart?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleClearCart} color="error" variant="contained">
            Clear Cart
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

