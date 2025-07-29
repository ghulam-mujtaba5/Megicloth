'use client';

import { useOrders } from '../../context/OrderContext';
import { Order } from '../../context/OrderContext';
import { Box, Typography, Card, CardContent, List, Divider, Chip, Accordion, AccordionSummary, AccordionDetails, Grid, Avatar, Button } from '@mui/material';
import Link from 'next/link';
import { ShoppingBag, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'success';
    case 'processing':
      return 'warning';
    case 'cancelled':
      return 'error';
    case 'shipped':
        return 'info';
    default:
      return 'default';
  }
};

const OrderItem = ({ order }: { order: Order }) => (
    <Accordion sx={{ 
        mb: 2, 
        boxShadow: 'none', 
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: '16px',
        '&:before': {
            display: 'none',
        },
        '&.Mui-expanded': {
            margin: '0 0 16px 0',
        }
    }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} sm={4} md={3}>
                    <Typography variant="subtitle2" color="text.secondary">Order ID</Typography>
                    <Typography sx={{ fontWeight: 600, fontFamily: 'monospace', fontSize: '0.9rem' }}>#{order.id.substring(0, 8)}...</Typography>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                    <Typography variant="subtitle2" color="text.secondary">Date</Typography>
                    <Typography sx={{ fontWeight: 500 }}>{new Date(order.date).toLocaleDateString()}</Typography>
                </Grid>
                <Grid item xs={6} sm={4} md={3}>
                    <Typography variant="subtitle2" color="text.secondary">Total</Typography>
                    <Typography sx={{ fontWeight: 700, color: 'primary.main' }}>Rs. {order.total.toLocaleString()}</Typography>
                </Grid>
                                <Grid item xs={12} sm={12} md={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 2, mt: { xs: 1, md: 0 } }}>
                    <Chip
                        label={order.status}
                        color={getStatusColor(order.status) as any}
                        size="small"
                        sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                    />
                    <Button component={Link} href={`/profile/orders/${order.id}`} variant="outlined" size="small">
                        View Details
                    </Button>
                </Grid>
            </Grid>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: 'action.hover', borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Items</Typography>
            {order.items.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={item.images[0]} alt={item.name} variant="rounded" />
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
            <Divider sx={{ my: 2 }} />
            <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Shipping Details</Typography>
                <Typography sx={{ fontWeight: 500 }}>{order.shippingAddress.name}</Typography>
                <Typography color="text.secondary">{order.shippingAddress.address}</Typography>
                <Typography color="text.secondary">{order.shippingAddress.phone}</Typography>
            </Box>
        </AccordionDetails>
    </Accordion>
);

export default function OrderHistory() {
  const { orders } = useOrders();

  return (
    <Card sx={{ p: { xs: 2, md: 3 }, boxShadow: 'none', borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
          Order History
        </Typography>
        {orders.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <ShoppingBag sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              No orders yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Start shopping to see your order history here.
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
}
