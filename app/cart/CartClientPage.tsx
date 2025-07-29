'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Container, Grid, Typography, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

import EmptyCart from '../components/cart/EmptyCart';
import OrderSummary from '../components/cart/OrderSummary';
import CartItemsTable from '../components/cart/CartItemsTable';

export default function CartClientPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, subtotal, shippingCost } = useCart();
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
    setSnackbar({ open: true, message: 'Item removed from cart' });
  };

  const handleClearCart = () => {
    clearCart();
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
            onUpdateQuantity={updateQuantity} 
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

