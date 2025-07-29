"use client";

import { useState } from "react";
import { getGuestOrder } from "../lib/actions/orderTracking";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  Alert,
} from "@mui/material";

export default function TrackOrderPage() {
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOrder(null);
    setError(null);
    const res = await getGuestOrder(email.trim(), orderId.trim());
    if (res && res.order) {
      setOrder(res.order);
    } else {
      setError(res?.error || "Order not found.");
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, textAlign: 'center' }}>
            Track Your Order
          </Typography>
          <Typography sx={{ mb: 3, color: 'text.secondary', textAlign: 'center' }}>
            Enter your email and order ID to view your order status.
          </Typography>
          <Box component="form" onSubmit={handleTrack} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Order ID"
              value={orderId}
              onChange={e => setOrderId(e.target.value)}
              required
              fullWidth
            />
            <Button variant="contained" type="submit" fullWidth disabled={loading}>
              {loading ? "Tracking..." : "Track Order"}
            </Button>
          </Box>
          {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}
        </CardContent>
      </Card>
      {order && (
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">Order #{order.id.slice(-6).toUpperCase()}</Typography>
              <Chip label={order.status || 'pending'} color={order.status === 'delivered' ? 'success' : order.status === 'cancelled' ? 'error' : 'warning'} size="small" />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Placed: {new Date(order.created_at).toLocaleString()}
            </Typography>
            <List dense>
              {order.order_items?.map((item: any) => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                  <Typography>{item.name} x{item.quantity}</Typography>
                  <Typography sx={{ fontWeight: 500 }}>
                    Rs {item.price.toLocaleString()} x {item.quantity} = Rs {(item.price * item.quantity).toLocaleString()}
                  </Typography>
                </Box>
              ))}
            </List>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Total: Rs {order.total.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
