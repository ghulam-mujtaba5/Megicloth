"use client";

import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip } from '@mui/material';
import { orders } from '../data/orders';
import Link from 'next/link';

const getStatusChipColor = (status: 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled') => {
  switch (status) {
    case 'Delivered': return 'success';
    case 'Shipped': return 'info';
    case 'Processing': return 'warning';
    case 'Cancelled': return 'error';
    default: return 'default';
  }
};

const OrdersPage = () => {
  return (
    <Box>
      <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 3 }}>
        Order History
      </Typography>
      {orders.length > 0 ? (
        <TableContainer component={Paper} elevation={0} variant="outlined">
          <Table aria-label="order history table">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell component="th" scope="row">
                    {order.id}
                  </TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Chip label={order.status} color={getStatusChipColor(order.status)} size="small" />
                  </TableCell>
                  <TableCell align="right">Rs{order.total.toLocaleString()}</TableCell>
                  <TableCell align="right">
                    <Link href={`/account/orders/${order.id}`} passHref>
                      <Button variant="outlined" size="small">View Details</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6">You haven't placed any orders yet.</Typography>
          <Typography color="text.secondary">When you do, your orders will appear here.</Typography>
          <Link href="/products" passHref>
            <Button variant="contained" sx={{ mt: 2 }}>Start Shopping</Button>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default OrdersPage;
