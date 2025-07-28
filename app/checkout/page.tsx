"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useProducts } from '../context/ProductContext';
import styles from './checkout.module.css';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Divider, 
  Snackbar, 
  Stepper, 
  Step, 
  StepLabel, 
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl
} from '@mui/material';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, clearCart, subtotal, discount, shippingCost, total } = useCart();
  const { user } = useAuth();
  const { addOrder } = useOrders();
  const { decreaseStock } = useProducts();
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
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setSnackbar({ open: true, message: 'Please correct the errors before proceeding.' });
      return;
    }

    const shippingDetails = {
      name: formValues.name,
      email: formValues.email,
      address: formValues.address,
      phone: formValues.phone,
    };

    addOrder(cart, total, shippingDetails, paymentMethod, formValues.orderNotes);

    cart.forEach(item => {
      decreaseStock(item.id, item.quantity);
    });

    clearCart();
    setActiveStep(1);
    
    // Redirect to profile/orders page after a delay to show confirmation
    setTimeout(() => {
        router.push('/profile?tab=orders');
    }, 3000);
  };

  if (activeStep === 1) {
    return (
      <Container maxWidth="sm" sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', py: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 2 }}>Thank You!</Typography>
        <Typography sx={{ fontSize: 18, color: '#666' }}>Your order has been placed successfully.</Typography>
        <Typography sx={{ fontSize: 16, color: '#888', mt: 1 }}>You will be redirected to your orders page shortly.</Typography>
        <Button component={Link} href="/profile?tab=orders" variant="contained" sx={{ mt: 4 }}>View My Orders</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map(label => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
      </Stepper>

      <Typography variant="h3" sx={{ fontWeight: 900, textAlign: 'center', mb: 4 }}>Checkout</Typography>

      {cart.length === 0 ? (
        <Typography sx={{ textAlign: 'center', color: '#888', my: 8 }}>Your cart is empty.</Typography>
      ) : (
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Shipping Information</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField name="name" label="Full Name" value={formValues.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} required fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField name="email" label="Email Address" type="email" value={formValues.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} required fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField name="address" label="Full Shipping Address" value={formValues.address} onChange={handleChange} error={!!errors.address} helperText={errors.address} required fullWidth multiline rows={3} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField name="phone" label="Phone Number" value={formValues.phone} onChange={handleChange} error={!!errors.phone} helperText={errors.phone} required fullWidth />
                  </Grid>
                </Grid>
              </Paper>

              <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 2, mt: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Payment Method</Typography>
                <FormControl component="fieldset">
                  <RadioGroup row name="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
                    <FormControlLabel value="jazzcash" control={<Radio />} label="JazzCash" disabled />
                    <FormControlLabel value="card" control={<Radio />} label="Debit/Credit Card" disabled />
                  </RadioGroup>
                </FormControl>
              </Paper>

              <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 2, mt: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Order Notes (Optional)</Typography>
                <TextField name="orderNotes" label="Special instructions for your order..." value={formValues.orderNotes} onChange={handleChange} fullWidth multiline rows={4} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={5}>
               <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 2, position: 'sticky', top: 88 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Order Summary</Typography>
                {cart.map(item => (
                  <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img src={item.image} alt={item.name} width="60" height="60" className={styles.productImage} />
                      <Box>
                        <Typography sx={{ fontWeight: 500 }}>{item.name}</Typography>
                        <Typography color="text.secondary" variant="body2">Qty: {item.quantity}</Typography>
                      </Box>
                    </Box>
                    <Typography sx={{ fontWeight: 500 }}>Rs. {(item.salePrice ?? item.price) * item.quantity}</Typography>
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
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Rs. {total.toLocaleString()}</Typography>
                </Box>
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, py: 1.5, fontSize: 16 }}>Place Order</Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} message={snackbar.message} />
    </Container>
  );
}

