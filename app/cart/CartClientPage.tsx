'use client';

import { useState, useMemo, useTransition } from 'react';
import { Container, Grid, Typography, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Box } from '@mui/material';
import type { CartItem } from '@/app/types';
import { updateCartItem, removeFromCart, clearCart, addToCart, getCart } from '@/app/lib/actions/cart';
import { useAuth } from '../context/AuthContext';

import EmptyCart from '../components/cart/EmptyCart';
import OrderSummary from '../components/cart/OrderSummary';
import CartItemsTable from '../components/cart/CartItemsTable';

interface CartClientPageProps {
  initialCart: CartItem[];
}

export default function CartClientPage({ initialCart }: CartClientPageProps) {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>(initialCart);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Guest cart: load from localStorage on mount if not logged in
  useEffect(() => {
    if (!user) {
      try {
        const stored = localStorage.getItem('megicloth_cart');
        if (stored) {
          setCart(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem('megicloth_cart');
      }
    } else {
      setCart(initialCart);
    }
  }, [user, initialCart]);

  // On login, merge guest cart with server cart
  useEffect(() => {
    if (user) {
      const mergeGuestCart = async () => {
        const stored = localStorage.getItem('megicloth_cart');
        if (stored) {
          try {
            const guestCart: CartItem[] = JSON.parse(stored);
            for (const item of guestCart) {
              await addToCart(item.id, item.quantity);
            }
            localStorage.removeItem('megicloth_cart');
            // Refresh cart from server
            const updatedCart = await getCart();
            setCart(updatedCart);
          } catch (error) {
            console.error('Error merging guest cart:', error);
          }
        }
      };
      mergeGuestCart();
    }
  }, [user]);

  // Guest cart: persist to localStorage on change
  useEffect(() => {
    if (!user) {
      localStorage.setItem('megicloth_cart', JSON.stringify(cart));
    }
  }, [cart, user]);

  const { subtotal, shippingCost } = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + (item.salePrice ?? item.price) * item.quantity, 0);
    const shippingCost = subtotal > 50 ? 0 : 5; // Example shipping logic
    return { subtotal, shippingCost };
  }, [cart]);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (!user) {
      setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
    } else {
      startTransition(async () => {
        const updatedCart = await updateCartItem(id, quantity);
        setCart(updatedCart);
      });
    }
  };

  const handleRemoveItem = (id: string) => {
    if (!user) {
      setCart(prev => prev.filter(item => item.id !== id));
      setSnackbar({ open: true, message: 'Item removed from cart' });
    } else {
      startTransition(async () => {
        const updatedCart = await removeFromCart(id);
        setCart(updatedCart);
        setSnackbar({ open: true, message: 'Item removed from cart' });
      });
    }
  };

  const handleClearCart = () => {
    if (!user) {
      setCart([]);
      setDialogOpen(false);
      setSnackbar({ open: true, message: 'Cart has been cleared' });
    } else {
      startTransition(async () => {
        const updatedCart = await clearCart();
        setCart(updatedCart);
        setDialogOpen(false);
        setSnackbar({ open: true, message: 'Cart has been cleared' });
      });
    }
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
      {isPending && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      )}
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

