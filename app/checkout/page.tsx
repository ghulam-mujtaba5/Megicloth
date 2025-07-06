"use client";

import { useCart } from "../context/CartContext";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Snackbar from "@mui/material/Snackbar";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Shipping Address
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  
  // Payment
  paymentMethod: string;
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  
  // Additional
  notes: string;
  termsAccepted: boolean;
}

const steps = ['Personal Information', 'Shipping Address', 'Payment', 'Review'];

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Pakistan',
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    notes: '',
    termsAccepted: false,
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      window.location.href = '/cart';
    }
  }, [cart]);

  // Calculate totals
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.salePrice ?? item.price) * item.quantity, 0);
  }, [cart]);

  const shipping = useMemo(() => {
    return subtotal > 2000 ? 0 : 200;
  }, [subtotal]);

  const tax = useMemo(() => {
    return subtotal * 0.15;
  }, [subtotal]);

  const total = useMemo(() => {
    return subtotal + shipping + tax;
  }, [subtotal, shipping, tax]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};

    switch (step) {
      case 0: // Personal Information
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Email is invalid';
        }
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        break;

      case 1: // Shipping Address
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
        break;

      case 2: // Payment
        if (formData.paymentMethod === 'card') {
          if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
          if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
          if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
          if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
        }
        break;

      case 3: // Review
        if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(activeStep)) return;

    setIsSubmitting(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsSubmitting(false);
      setSnackbarMessage("Order placed successfully!");
      setSnackbarOpen(true);
      
      // Clear cart and redirect to success page
      setTimeout(() => {
        clearCart();
        window.location.href = '/order-success';
      }, 2000);
    }, 3000);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Fade in={true} timeout={500}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
          </Fade>
        );

      case 1:
        return (
          <Fade in={true} timeout={500}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Street Address"
                  multiline
                  rows={3}
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  error={!!errors.address}
                  helperText={errors.address}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  error={!!errors.city}
                  helperText={errors.city}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="State/Province"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  error={!!errors.state}
                  helperText={errors.state}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Postal Code"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  error={!!errors.postalCode}
                  helperText={errors.postalCode}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Country</InputLabel>
                  <Select
                    value={formData.country}
                    label="Country"
                    onChange={(e) => handleInputChange('country', e.target.value)}
                  >
                    <MenuItem value="Pakistan">Pakistan</MenuItem>
                    <MenuItem value="India">India</MenuItem>
                    <MenuItem value="Bangladesh">Bangladesh</MenuItem>
                    <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Fade>
        );

      case 2:
        return (
          <Fade in={true} timeout={500}>
            <Box>
              <FormControl component="fieldset" sx={{ mb: 3 }}>
                <FormLabel component="legend">Payment Method</FormLabel>
                <RadioGroup
                  value={formData.paymentMethod}
                  onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                >
                  <FormControlLabel
                    value="card"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CreditCardIcon />
                        Credit/Debit Card
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="bank"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccountBalanceIcon />
                        Bank Transfer
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="cod"
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocalAtmIcon />
                        Cash on Delivery
                      </Box>
                    }
                  />
                </RadioGroup>
              </FormControl>

              {formData.paymentMethod === 'card' && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Card Number"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      error={!!errors.cardNumber}
                      helperText={errors.cardNumber}
                      placeholder="1234 5678 9012 3456"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Cardholder Name"
                      value={formData.cardName}
                      onChange={(e) => handleInputChange('cardName', e.target.value)}
                      error={!!errors.cardName}
                      helperText={errors.cardName}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Expiry Date"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      error={!!errors.expiryDate}
                      helperText={errors.expiryDate}
                      placeholder="MM/YY"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="CVV"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      error={!!errors.cvv}
                      helperText={errors.cvv}
                      placeholder="123"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                </Grid>
              )}

              {formData.paymentMethod === 'bank' && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  Bank transfer details will be sent to your email after order confirmation.
                </Alert>
              )}

              {formData.paymentMethod === 'cod' && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  Pay with cash when your order is delivered. Additional Rs. 50 COD fee applies.
                </Alert>
              )}
            </Box>
          </Fade>
        );

      case 3:
        return (
          <Fade in={true} timeout={500}>
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Order Summary
              </Typography>
              
              {cart.map((item) => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">
                    {item.name} x {item.quantity}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formatPrice((item.salePrice ?? item.price) * item.quantity)}
                  </Typography>
                </Box>
              ))}
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body1">{formatPrice(subtotal)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body1">Shipping</Typography>
                <Typography variant="body1">{shipping === 0 ? 'Free' : formatPrice(shipping)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body1">Tax (15%)</Typography>
                <Typography variant="body1">{formatPrice(tax)}</Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Total
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#10b981' }}>
                  {formatPrice(total)}
                </Typography>
              </Box>

              <TextField
                fullWidth
                label="Order Notes (Optional)"
                multiline
                rows={3}
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                sx={{ mb: 3 }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.termsAccepted}
                    onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                  />
                }
                label={
                  <Typography variant="body2">
                    I agree to the{' '}
                    <Link href="/terms" style={{ color: '#2563eb', textDecoration: 'none' }}>
                      Terms and Conditions
                    </Link>
                    {' '}and{' '}
                    <Link href="/privacy" style={{ color: '#2563eb', textDecoration: 'none' }}>
                      Privacy Policy
                    </Link>
                  </Typography>
                }
                sx={{ mb: 2 }}
              />
              
              {errors.termsAccepted && (
                <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                  {errors.termsAccepted}
                </Typography>
              )}
            </Box>
          </Fade>
        );

      default:
        return null;
    }
  };

  if (cart.length === 0) {
    return null; // Will redirect to cart
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
        {/* Page Header */}
        <Slide direction="down" in={true} timeout={600}>
          <Box sx={{ mb: { xs: 3, md: 4 } }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 800,
                textAlign: 'center',
                mb: 2,
                background: 'linear-gradient(45deg, #1e293b 30%, #2563eb 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Checkout
            </Typography>
          </Box>
        </Slide>

        <Grid container spacing={3}>
          {/* Checkout Form */}
          <Grid item xs={12} lg={8}>
            <Fade in={true} timeout={800}>
              <Card sx={{ borderRadius: 3, background: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  {/* Stepper */}
                  <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>

                  {/* Step Content */}
                  {renderStepContent(activeStep)}

                  {/* Navigation Buttons */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      variant="outlined"
                      sx={{ borderRadius: 2 }}
                    >
                      Back
                    </Button>
                    
                    <Box>
                      {activeStep === steps.length - 1 ? (
                        <Button
                          variant="contained"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          sx={{
                            background: 'linear-gradient(45deg, #10b981, #059669)',
                            color: '#ffffff',
                            px: 4,
                            py: 1.5,
                            borderRadius: 3,
                            fontWeight: 700,
                            '&:hover': {
                              background: 'linear-gradient(45deg, #059669, #047857)',
                            },
                            '&:disabled': {
                              background: '#e2e8f0',
                              color: '#94a3b8',
                            },
                          }}
                        >
                          {isSubmitting ? 'Processing...' : 'Place Order'}
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{
                            background: 'linear-gradient(45deg, #2563eb, #1e40af)',
                            color: '#ffffff',
                            px: 4,
                            py: 1.5,
                            borderRadius: 3,
                            fontWeight: 700,
                            '&:hover': {
                              background: 'linear-gradient(45deg, #1e40af, #1e3a8a)',
                            },
                          }}
                        >
                          Next
                        </Button>
                      )}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          {/* Order Summary Sidebar */}
          <Grid item xs={12} lg={4}>
            <Fade in={true} timeout={1000}>
              <Card
                sx={{
                  borderRadius: 3,
                  background: '#ffffff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  position: 'sticky',
                  top: 100,
                }}
              >
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                    Order Summary
                  </Typography>

                  {/* Items */}
                  {cart.map((item) => (
                    <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ flex: 1 }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, ml: 2 }}>
                        {formatPrice((item.salePrice ?? item.price) * item.quantity)}
                      </Typography>
                    </Box>
                  ))}

                  <Divider sx={{ my: 2 }} />

                  {/* Totals */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Subtotal</Typography>
                    <Typography variant="body1">{formatPrice(subtotal)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">Shipping</Typography>
                    <Typography variant="body1">{shipping === 0 ? 'Free' : formatPrice(shipping)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body1">Tax (15%)</Typography>
                    <Typography variant="body1">{formatPrice(tax)}</Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Total
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#10b981' }}>
                      {formatPrice(total)}
                    </Typography>
                  </Box>

                  {/* Security Info */}
                  <Alert severity="info" icon={<SecurityIcon />} sx={{ borderRadius: 2 }}>
                    Secure checkout with SSL encryption
                  </Alert>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        </Grid>
      </Container>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
