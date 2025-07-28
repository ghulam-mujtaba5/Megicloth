
"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [shippingCost] = useState(150); // Mock shipping cost
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [dialogOpen, setDialogOpen] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.salePrice ?? item.price) * item.quantity, 0);
  const total = subtotal - discount + shippingCost;

  const handleApplyPromoCode = () => {
    if (promoCode.toUpperCase() === 'MEGI10') {
      setDiscount(subtotal * 0.1);
      setSnackbar({ open: true, message: 'Promo code applied successfully!' });
    } else {
      setSnackbar({ open: true, message: 'Invalid promo code.' });
    }
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
    setSnackbar({ open: true, message: "Item removed from cart." });
  };

  const handleClearCart = () => {
    clearCart();
    setDialogOpen(false);
    setSnackbar({ open: true, message: "Cart cleared." });
  };

  return (
    <Container maxWidth="md" sx={{ minHeight: "80vh", py: { xs: 1, sm: 4 }, px: { xs: 0.5, sm: 2 } }}>
      <Typography variant="h3" sx={{ fontWeight: 900, fontSize: { xs: 20, sm: 32, md: 40 }, mb: { xs: 2, sm: 5 }, mt: { xs: 1, sm: 4 }, textAlign: "center" }}>
        Your Cart
      </Typography>
      {cart.length === 0 ? (
        <Box sx={{ color: "#888", fontSize: { xs: 16, sm: 20 }, textAlign: "center", my: { xs: 4, sm: 8 } }}>
          Your cart is empty.<br />
          <Link href="/products" style={{ color: "#2563eb", textDecoration: "underline" }}>Browse products</Link>
        </Box>
      ) : (
        <>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <TableContainer component={Paper} sx={{ borderRadius: { xs: 2, sm: 3 }, boxShadow: { xs: "0 1px 4px rgba(0,0,0,0.04)", sm: "0 2px 8px rgba(0,0,0,0.04)" } }}>
            <Table size={window.innerWidth < 600 ? "small" : "medium"}>
              <TableHead>
                <TableRow sx={{ background: "#f1f5f9" }}>
                  <TableCell sx={{ fontWeight: 700, fontSize: { xs: 13, sm: 16 } }}>Product</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, fontSize: { xs: 13, sm: 16 } }}>Price</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, fontSize: { xs: 13, sm: 16 } }}>Quantity</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, fontSize: { xs: 13, sm: 16 } }}>Total</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map(item => (
                  <TableRow key={item.id} sx={{ borderBottom: "1px solid #e5e7eb" }}>
                    <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar
                          src={item.image?.startsWith('http') ? item.image : 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80'}
                          alt={item.name}
                          sx={{ width: { xs: 32, sm: 40 }, height: { xs: 32, sm: 40 }, bgcolor: '#f3f4f6', mr: 1 }}
                        />
                        <Link href={`/products/${item.id}`} style={{ color: "#2563eb", textDecoration: "none", fontWeight: 600, fontSize: 15 }}>{item.name}</Link>
                      </Box>
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: { xs: 14, sm: 16 } }}>Rs. {item.salePrice ?? item.price}</TableCell>
                    <TableCell align="center">
                      <TextField
                        type="number"
                        size="small"
                        inputProps={{ min: 1, style: { textAlign: "center", width: 40 } }}
                        value={item.quantity}
                        onChange={e => updateQuantity(item.id, Number(e.target.value))}
                        sx={{ width: { xs: 44, sm: 60 } }}
                        aria-label={`Change quantity for ${item.name}`}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: { xs: 14, sm: 16 } }}>Rs. {(item.salePrice ?? item.price) * item.quantity}</TableCell>
                    <TableCell align="center">
                      <Button onClick={() => handleRemove(item.id)} color="error" size="small" sx={{ fontWeight: 600, fontSize: { xs: 13, sm: 15 }, px: { xs: 1, sm: 2 } }} aria-label={`Remove ${item.name} from cart`}>Remove</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
            <Button onClick={() => setDialogOpen(true)} color="error" variant="outlined" sx={{ mt: 2 }}>Clear Cart</Button>
          </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Order Summary</Typography>
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
                <Box sx={{ display: 'flex', gap: 1, my: 2 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="contained" onClick={handleApplyPromoCode}>Apply</Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, borderTop: '1px solid #e5e7eb', pt: 2 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 18 }}>Total</Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: 18 }}>Rs. {total.toLocaleString()}</Typography>
                </Box>
                <Link href="/checkout" passHref style={{ textDecoration: 'none' }}>
                  <Button fullWidth variant="contained" size="large" sx={{ mt: 2, background: '#10b981', '&:hover': { background: '#059669' } }}>
                    Proceed to Checkout
                  </Button>
                </Link>
              </Paper>
            </Grid>
          </Grid>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={2500}
            onClose={() => setSnackbar({ open: false, message: "" })}
            message={snackbar.message}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          />
          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>Clear Cart?</DialogTitle>
            <DialogContent>
              <Typography>Are you sure you want to remove all items from your cart?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)} color="primary">Cancel</Button>
              <Button onClick={handleClearCart} color="error" variant="contained">Clear</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Container>
  );
}
