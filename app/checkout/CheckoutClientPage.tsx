'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../lib/actions/orders';
import { Container, Typography, Box, Button, Snackbar, Stepper, Step, StepLabel, Grid, Alert } from '@mui/material';

import ShippingForm from '../components/checkout/ShippingForm';
import PaymentOptions from '../components/checkout/PaymentOptions';
import OrderNotes from '../components/checkout/OrderNotes';
import CheckoutOrderSummary from '../components/checkout/CheckoutOrderSummary';

export default function CheckoutClientPage() {
  const { cart, clearCart, total } = useCart();
  const { user } = useAuth();

  const router = useRouter();

  const [formValues, setFormValues] = useState({ 
    name: user ? `${user.firstName} ${user.lastName}` : '', 
    email: user?.email || '', 
    address: '',
    phone: user?.phone || '',
    orderNotes: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [errors, setErrors] = useState<{ name?: string; email?: string; address?: string; phone?: string }>({});
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' as 'info' | 'success' | 'error' });
  const steps = ['Shipping Info', 'Confirmation'];

  const validate = () => {
    const newErrors: { name?: string; email?: string; address?: string; phone?: string } = {};
    if (!formValues.name.trim()) newErrors.name = 'Name is required.';
    if (!formValues.email.trim()) newErrors.email = 'Email is required.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formValues.email)) newErrors.email = 'Invalid email address.';
    if (!formValues.address.trim()) newErrors.address = 'Address is required.';
    if (!formValues.phone.trim()) newErrors.phone = 'Phone number is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setSnackbar({ open: true, message: 'Please correct the errors before proceeding.', severity: 'error' });
      return;
    }
    setIsSubmitting(true);
    const shippingDetails = { ...formValues };
    const orderResult = await createOrder(undefined, {
      cart,
      total,
      shipping: {
        name: shippingDetails.name,
        email: shippingDetails.email,
        address: shippingDetails.address,
        phone: shippingDetails.phone,
      },
      paymentMethod,
      orderNotes: shippingDetails.orderNotes,
    });
    if (orderResult && orderResult.success) {
      clearCart();
      setActiveStep(1);
      setTimeout(() => {
        router.push('/profile?tab=orders');
      }, 4000);
    } else {
      setSnackbar({ open: true, message: orderResult.error || 'Failed to place order.', severity: 'error' });
    }
    setIsSubmitting(false);
  };

  if (activeStep === 1) {
    return (
      <Container maxWidth="sm" sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', py: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 2 }}>Thank You!</Typography>
        <Typography sx={{ fontSize: 18, color: 'text.secondary' }}>Your order has been placed successfully.</Typography>
        <Typography sx={{ fontSize: 16, color: 'text.secondary', mt: 1 }}>You will be redirected to your orders page shortly.</Typography>
        <Button component={Link} href="/profile?tab=orders" variant="contained" sx={{ mt: 4 }}>View My Orders</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map(label => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
      </Stepper>

      {cart.length === 0 && activeStep === 0 ? (
        <Box sx={{textAlign: 'center', py: 8}}>
          <Typography variant='h5' sx={{mb: 2}}>Your cart is empty.</Typography>
          <Button component={Link} href="/cart" variant='contained'>Return to Cart</Button>
        </Box>
      ) : (
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <ShippingForm formValues={formValues} errors={errors} handleChange={handleChange} />
              <PaymentOptions paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
              <OrderNotes orderNotes={formValues.orderNotes} handleChange={handleChange} />
            </Grid>

            <Grid item xs={12} md={5}>
              <CheckoutOrderSummary isSubmitting={isSubmitting} />
            </Grid>
          </Grid>
        </Box>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

