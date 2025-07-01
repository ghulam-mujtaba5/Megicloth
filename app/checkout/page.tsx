
"use client";

import { useCart } from "../context/CartContext";
import { useState } from "react";
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

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; address?: string }>({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const total = cart.reduce((sum, item) => sum + (item.salePrice ?? item.price) * item.quantity, 0);
  const steps = ["Info", "Review", "Done"];
  const [activeStep, setActiveStep] = useState(0);

  const validate = () => {
    const newErrors: { name?: string; email?: string; address?: string } = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) newErrors.email = "Invalid email address.";
    if (!address.trim()) newErrors.address = "Address is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setSnackbar({ open: true, message: "Please fix the errors in the form." });
      return;
    }
    setOrderPlaced(true);
    setActiveStep(2);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <Container maxWidth="sm" sx={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 6 }}>
        <Stepper activeStep={2} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, textAlign: "center" }}>Thank you for your order!</Typography>
        <Typography sx={{ fontSize: 18, color: "#666", textAlign: "center" }}>We have received your order and will contact you soon.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ minHeight: "80vh", py: { xs: 2, sm: 4 } }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>
      <Typography variant="h3" sx={{ fontWeight: 900, fontSize: { xs: 24, sm: 32, md: 40 }, mb: { xs: 3, sm: 5 }, mt: { xs: 2, sm: 4 }, textAlign: "center" }}>
        Checkout
      </Typography>
      {cart.length === 0 ? (
        <Typography sx={{ color: "#888", fontSize: 20, textAlign: "center", my: 8 }}>Your cart is empty.</Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 3, md: 6 }, alignItems: { xs: "center", md: "flex-start" }, justifyContent: "center" }}>
          <Paper elevation={2} sx={{ minWidth: 280, maxWidth: 400, width: "100%", p: { xs: 2, sm: 3 }, borderRadius: 3, mb: { xs: 2, md: 0 } }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Customer Info</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                size="small"
                sx={{ borderRadius: 2 }}
                error={!!errors.name}
                helperText={errors.name}
                autoComplete="name"
              />
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                size="small"
                sx={{ borderRadius: 2 }}
                error={!!errors.email}
                helperText={errors.email}
                autoComplete="email"
              />
              <TextField
                label="Shipping Address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
                size="small"
                multiline
                minRows={3}
                sx={{ borderRadius: 2 }}
                error={!!errors.address}
                helperText={errors.address}
                autoComplete="street-address"
              />
              <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                <Button component={Link} href="/cart" variant="outlined" sx={{ borderRadius: 2, fontWeight: 600, px: 3, py: 1.5, flex: 1 }}>Back to Cart</Button>
                <Button type="submit" variant="contained" sx={{ background: "#2563eb", color: "#fff", borderRadius: 2, fontWeight: 700, fontSize: 16, py: 1.5, flex: 1 }}>
                  Place Order
                </Button>
              </Box>
            </Box>
          </Paper>
          <Paper elevation={2} sx={{ minWidth: 280, maxWidth: 400, width: "100%", p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Order Summary</Typography>
            <Divider sx={{ mb: 2 }} />
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              {cart.map(item => (
                <Box component="li" key={item.id} sx={{ mb: 2, borderBottom: "1px solid #e5e7eb", pb: 1 }}>
                  <Typography sx={{ fontWeight: 500 }}>{item.name} x {item.quantity}</Typography>
                  <Typography sx={{ color: "#666" }}>Rs. {(item.salePrice ?? item.price) * item.quantity}</Typography>
                </Box>
              ))}
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mt: 2 }}>Total: Rs. {total}</Typography>
          </Paper>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={2500}
            onClose={() => setSnackbar({ open: false, message: "" })}
            message={snackbar.message}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          />
        </Box>
      )}
    </Container>
  );
}
// ...existing code...
