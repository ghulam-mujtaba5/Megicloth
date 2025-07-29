"use client";

import React, { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, List, ListItem, ListItemText, Divider, Chip } from '@mui/material';
import { getRecentOrders } from '@/app/lib/actions/analytics';
import Link from 'next/link';

interface RecentOrder {
  id: string;
  created_at: string;
  total: number;
  status: string;
  shipping_name: string;
}

export default function RecentOrders() {
  const [orders, setOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecentOrders()
      .then(data => {
        setOrders(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><CircularProgress /></Box>;
  }

  if (orders.length === 0) {
    return <Typography>No recent orders.</Typography>;
  }

  const statusColors: { [key: string]: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" } = {
    pending: 'warning',
    processing: 'info',
    shipped: 'primary',
    delivered: 'success',
    cancelled: 'error',
  };

  return (
    <List disablePadding>
      {orders.map((order, index) => (
        <React.Fragment key={order.id}>
          <ListItem 
            button 
            component={Link}
            href={`/admin/orders?search=${order.id}`}
          >
            <ListItemText
              primary={`Order #${order.id.substring(0, 8)}... by ${order.shipping_name}`}
              secondary={`$${order.total.toFixed(2)} - ${new Date(order.created_at).toLocaleDateString()}`}
            />
            <Chip label={order.status} color={statusColors[order.status] || 'default'} size="small" />
          </ListItem>
          {index < orders.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
}
