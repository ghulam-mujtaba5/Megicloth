'use client';

import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { Box, Typography, Card, CardContent, Grid, Chip } from '@mui/material';

export default function AccountDetails() {
  const { user } = useAuth();
  const { orders } = useOrders();

  if (!user) {
    return null;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card sx={{ boxShadow: 'none', borderRadius: 4, border: '1px solid rgba(0,0,0,0.12)' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Personal Information
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                First Name
              </Typography>
              <Typography variant="body1">{user.firstName}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Last Name
              </Typography>
              <Typography variant="body1">{user.lastName}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1">{user.email}</Typography>
              {!user.isEmailVerified && (
                <Chip label="Not Verified" color="warning" size="small" sx={{ ml: 1 }} />
              )}
            </Box>
            {user.phone && (
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Phone
                </Typography>
                <Typography variant="body1">{user.phone}</Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ boxShadow: 'none', borderRadius: 4, border: '1px solid rgba(0,0,0,0.12)' }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Account Statistics
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Member Since
              </Typography>
              <Typography variant="body1">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Last Login
              </Typography>
              <Typography variant="body1">
                {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Total Orders
              </Typography>
              <Typography variant="body1">{orders.length}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
