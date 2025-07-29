'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Chip,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { Add, Delete, Home, Work } from '@mui/icons-material';
import toast from 'react-hot-toast';

export default function AddressManager() {
  const { user, addAddress, removeAddress } = useAuth();
  const [addAddressDialog, setAddAddressDialog] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: 'home' as const,
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Pakistan',
    phone: '',
    isDefault: false,
  });

  const handleAddAddress = async () => {
    if (!newAddress.address || !newAddress.city || !newAddress.phone) {
        toast.error('Please fill in all required fields.');
        return;
    }
    try {
      const result = await addAddress(newAddress);
      if (result.success) {
        toast.success('Address added successfully!');
        setAddAddressDialog(false);
        setNewAddress({
          type: 'home',
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          address: '',
          city: '',
          state: '',
          postalCode: '',
          country: 'Pakistan',
          phone: '',
          isDefault: false,
        });
      } else {
        toast.error(result.error || 'Failed to add address');
      }
    } catch (error) {
      toast.error('An error occurred while adding address');
    }
  };

  const handleRemoveAddress = async (id: string) => {
    try {
      const result = await removeAddress(id);
      if (result.success) {
        toast.success('Address removed successfully!');
      } else {
        toast.error(result.error || 'Failed to remove address');
      }
    } catch (error) {
      toast.error('An error occurred while removing address');
    }
  };

  const handleDialogInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <Card sx={{ p: { xs: 2, md: 3 }, boxShadow: 'none', borderRadius: 4 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            My Addresses
          </Typography>
          <Button variant="contained" startIcon={<Add />} onClick={() => setAddAddressDialog(true)}>
            Add New
          </Button>
        </Box>

        <Grid container spacing={3}>
          {user?.addresses && user.addresses.length > 0 ? (
            user.addresses.map(addr => (
              <Grid item xs={12} md={6} key={addr.id}>
                <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3 }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1}}>
                            {addr.type === 'home' ? <Home color="primary" /> : <Work color="secondary" />}
                            <Typography variant="h6" sx={{textTransform: 'capitalize'}}>{addr.type}</Typography>
                            {addr.isDefault && <Chip label="Default" size="small" color="primary" sx={{ml: 1}}/>}
                        </Box>
                        <IconButton size="small" onClick={() => handleRemoveAddress(addr.id)}><Delete /></IconButton>
                    </Box>
                    <Typography sx={{fontWeight: 600}}>{addr.firstName} {addr.lastName}</Typography>
                    <Typography color="text.secondary">{addr.address}, {addr.city}</Typography>
                    <Typography color="text.secondary">{addr.state}, {addr.postalCode}</Typography>
                    <Typography color="text.secondary">{addr.country}</Typography>
                    <Typography color="text.secondary">Phone: {addr.phone}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
                <Typography color="text.secondary" sx={{textAlign: 'center', py: 5}}>No addresses found. Add one to get started.</Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>

      <Dialog open={addAddressDialog} onClose={() => setAddAddressDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{fontWeight: 700}}>Add New Address</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{py: 1}}>
            <Grid item xs={12} sm={6}><TextField name="firstName" label="First Name" value={newAddress.firstName} onChange={handleDialogInputChange} fullWidth /></Grid>
            <Grid item xs={12} sm={6}><TextField name="lastName" label="Last Name" value={newAddress.lastName} onChange={handleDialogInputChange} fullWidth /></Grid>
            <Grid item xs={12}><TextField name="address" label="Address" value={newAddress.address} onChange={handleDialogInputChange} fullWidth required/></Grid>
            <Grid item xs={12} sm={6}><TextField name="city" label="City" value={newAddress.city} onChange={handleDialogInputChange} fullWidth required/></Grid>
            <Grid item xs={12} sm={6}><TextField name="state" label="State / Province" value={newAddress.state} onChange={handleDialogInputChange} fullWidth /></Grid>
            <Grid item xs={12} sm={6}><TextField name="postalCode" label="Postal Code" value={newAddress.postalCode} onChange={handleDialogInputChange} fullWidth /></Grid>
            <Grid item xs={12} sm={6}><TextField name="phone" label="Phone Number" value={newAddress.phone} onChange={handleDialogInputChange} fullWidth required/></Grid>
            <Grid item xs={12}><FormControlLabel control={<Switch name="isDefault" checked={newAddress.isDefault} onChange={handleDialogInputChange} />} label="Set as default address" /></Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{p: 2}}>
          <Button onClick={() => setAddAddressDialog(false)}>Cancel</Button>
          <Button onClick={handleAddAddress} variant="contained">Save Address</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
