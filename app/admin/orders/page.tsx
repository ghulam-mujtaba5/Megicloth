"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus } from '../../lib/actions/orders';
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Select, 
  MenuItem, 
  SelectChangeEvent,
  IconButton
} from '@mui/material';
import { Visibility } from '@mui/icons-material';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    getAllOrders()
      .then(data => {
        setOrders(data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch orders.');
        setLoading(false);
      });
  }, []);

  const handleStatusChange = async (orderId: string, event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value;
    const res = await updateOrderStatus(orderId, newStatus);
    if (res.success) {
      setOrders(orders => orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
    } else {
      alert(res.error || 'Failed to update order status.');
    }
  };


  const handleViewOrder = (orderId: string) => {
    router.push(`/admin/orders/${orderId}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
        Manage Orders
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <Typography>Loading orders...</Typography>
        </Box>
      ) : error ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    {order.users?.first_name || order.shipping_name || '-'} {order.users?.last_name || ''}
                    <br />
                    <span style={{ color: '#888', fontSize: 12 }}>{order.users?.email || order.shipping_email || '-'}</span>
                  </TableCell>
                  <TableCell>{order.created_at ? new Date(order.created_at).toLocaleDateString() : '-'}</TableCell>
                  <TableCell>Rs. {order.total?.toLocaleString?.() ?? '-'}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status || 'pending'}
                      onChange={(e) => handleStatusChange(order.id, e)}
                      size="small"
                      sx={{ minWidth: 120 }}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="processing">Processing</MenuItem>
                      <MenuItem value="shipped">Shipped</MenuItem>
                      <MenuItem value="delivered">Delivered</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleViewOrder(order.id)}>
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

    </Box>
  );
}
