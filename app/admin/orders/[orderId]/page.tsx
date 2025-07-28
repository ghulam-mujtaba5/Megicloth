"use client";

import { useParams } from 'next/navigation';
import { useOrders } from '../../../context/OrderContext';
import { Box, Typography, Paper, Grid, List, ListItem, ListItemText, Divider, CircularProgress } from '@mui/material';

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const { getOrderById } = useOrders();
  const order = getOrderById(orderId as string);

  if (!order) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading order details...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
        Order Details
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Order ID: {order.id}</Typography>
            <Typography>Date: {new Date(order.date).toLocaleString()}</Typography>
            <Typography>Status: {order.status}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Customer: {order.customerName}</Typography>
            <Typography>Shipping Address: {order.shippingAddress}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Items</Typography>
            <List>
              {order.items.map(item => (
                <ListItem key={item.id}>
                  <ListItemText 
                    primary={item.name} 
                    secondary={`Quantity: ${item.quantity} - Price: Rs. ${item.price.toFixed(2)}`}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'right' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Total: Rs. {order.total.toFixed(2)}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
