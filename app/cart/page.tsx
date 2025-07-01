
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
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + (item.salePrice ?? item.price) * item.quantity, 0);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [dialogOpen, setDialogOpen] = useState(false);

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
    <Container maxWidth="md" sx={{ minHeight: "80vh", py: { xs: 2, sm: 4 } }}>
      <Typography variant="h3" sx={{ fontWeight: 900, fontSize: { xs: 24, sm: 32, md: 40 }, mb: { xs: 3, sm: 5 }, mt: { xs: 2, sm: 4 }, textAlign: "center" }}>
        Your Cart
      </Typography>
      {cart.length === 0 ? (
        <Box sx={{ color: "#888", fontSize: 20, textAlign: "center", my: 8 }}>
          Your cart is empty.<br />
          <Link href="/products" style={{ color: "#2563eb", textDecoration: "underline" }}>Browse products</Link>
        </Box>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#f1f5f9" }}>
                  <TableCell sx={{ fontWeight: 700 }}>Product</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>Price</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>Quantity</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700 }}>Total</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map(item => (
                  <TableRow key={item.id} sx={{ borderBottom: "1px solid #e5e7eb" }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar
                          src={item.image?.startsWith('http') ? item.image : 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80'}
                          alt={item.name}
                          sx={{ width: 40, height: 40, bgcolor: '#f3f4f6', mr: 1 }}
                        />
                        <Link href={`/products/${item.id}`} style={{ color: "#2563eb", textDecoration: "none", fontWeight: 600 }}>{item.name}</Link>
                      </Box>
                    </TableCell>
                    <TableCell align="center">Rs. {item.salePrice ?? item.price}</TableCell>
                    <TableCell align="center">
                      <TextField
                        type="number"
                        size="small"
                        inputProps={{ min: 1, style: { textAlign: "center", width: 50 } }}
                        value={item.quantity}
                        onChange={e => updateQuantity(item.id, Number(e.target.value))}
                        sx={{ width: 60 }}
                        aria-label={`Change quantity for ${item.name}`}
                      />
                    </TableCell>
                    <TableCell align="center">Rs. {(item.salePrice ?? item.price) * item.quantity}</TableCell>
                    <TableCell align="center">
                      <Button onClick={() => handleRemove(item.id)} color="error" size="small" sx={{ fontWeight: 600 }} aria-label={`Remove ${item.name} from cart`}>Remove</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: "center", mb: 4, gap: 2 }}>
            <Button onClick={() => setDialogOpen(true)} color="error" variant="contained" sx={{ borderRadius: 2, fontWeight: 600, px: 4, py: 1.5 }}>Clear Cart</Button>
            <Typography sx={{ fontSize: 22, fontWeight: 700, mt: { xs: 2, sm: 0 } }}>Total: Rs. {total}</Typography>
          </Box>
          <Link href="/checkout" style={{ background: "#10b981", color: "#fff", padding: "14px 40px", borderRadius: 8, fontWeight: 700, fontSize: 18, textDecoration: "none", display: "inline-block", textAlign: "center" }}>Proceed to Checkout</Link>
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
