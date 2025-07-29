'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useOrders } from '@/app/context/OrderContext';
import type { Order } from '@/app/context/OrderContext';
import { Box, Typography, Card, CardContent, Grid, Divider, Chip, Avatar, Button, Container, CircularProgress } from '@mui/material';
import Link from 'next/link';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'delivered': return 'success';
    case 'processing': return 'warning';
    case 'cancelled': return 'error';
    case 'shipped': return 'info';
    default: return 'default';
  }
};

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { getOrderById } = useOrders();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  const orderId = params.orderId as string;

  useEffect(() => {
    if (orderId) {
      const foundOrder = getOrderById(orderId);
      setOrder(foundOrder);
    }
  }, [orderId, getOrderById]);

  if (order === undefined) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (order === null) {
    return (
      <Container sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h4" gutterBottom>Order Not Found</Typography>
        <Typography color="text.secondary">The order you are looking for does not exist.</Typography>
        <Button component={Link} href="/profile/orders" variant="contained" sx={{ mt: 4 }}>
          Back to Order History
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()} sx={{ mb: 3 }}>
        Back to Orders
      </Button>

      <Card>
        <CardContent sx={{ p: { xs: 2, md: 4 } }}>
          <Grid container justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 3 }}>
            <Grid item>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Order Details
              </Typography>
              <Typography color="text.secondary">
                Order ID: #{order.id.substring(0, 8)}...
              </Typography>
            </Grid>
            <Grid item>
              <Chip 
                label={order.status} 
                color={getStatusColor(order.status) as any} 
                sx={{ textTransform: 'capitalize', fontWeight: 600 }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Items</Typography>
              {order.items.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={item.images[0]} alt={item.name} variant="rounded" sx={{ width: 64, height: 64 }} />
                    <Box>
                      <Link href={`/product/${item.slug}`} passHref>
                        <Typography component="a" sx={{ fontWeight: 500, textDecoration: 'none', color: 'inherit', '&:hover': { textDecoration: 'underline' } }}>
                          {item.name}
                        </Typography>
                      </Link>
                      <Typography variant="body2" color="text.secondary">Qty: {item.quantity}</Typography>
                    </Box>
                  </Box>
                  <Typography sx={{ fontWeight: 500 }}>Rs. {item.price.toLocaleString()}</Typography>
                </Box>
              ))}
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Order Summary</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography color="text.secondary">Subtotal:</Typography>
                  <Typography>Rs. {order.total.toLocaleString()}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography color="text.secondary">Shipping:</Typography>
                  <Typography>Free</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>Total:</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>Rs. {order.total.toLocaleString()}</Typography>
                </Box>
              </Box>
              <Box sx={{ p: 3, mt: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Shipping Address</Typography>
                <Typography sx={{ fontWeight: 500 }}>{order.shippingAddress.name}</Typography>
                <Typography color="text.secondary">{order.shippingAddress.address}</Typography>
                <Typography color="text.secondary">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</Typography>
                <Typography color="text.secondary">{order.shippingAddress.phone}</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
