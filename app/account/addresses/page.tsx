"use client";

import React from 'react';
import { Box, Typography, Grid, Paper, Button, Chip, Divider } from '@mui/material';
import { addresses } from '../../data/addresses';
import AddIcon from '@mui/icons-material/Add';

const AddressBookPage = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          Address Book
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add New Address
        </Button>
      </Box>

      {addresses.length > 0 ? (
        <Grid container spacing={3}>
          {addresses.map((address) => (
            <Grid item xs={12} md={6} key={address.id}>
              <Paper elevation={0} variant="outlined" sx={{ p: 2, borderRadius: 2, height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>{address.name}</Typography>
                  {address.isDefault && <Chip label="Default" color="primary" size="small" />}
                </Box>
                <Divider sx={{ my: 1.5 }} />
                <Typography variant="body2">{address.addressLine1}</Typography>
                {address.addressLine2 && <Typography variant="body2">{address.addressLine2}</Typography>}
                <Typography variant="body2">{address.city}, {address.state} {address.zip}</Typography>
                <Typography variant="body2">{address.country}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>Phone: {address.phone}</Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button size="small" variant="outlined">Edit</Button>
                  <Button size="small" variant="text" color="error">Delete</Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h6">You have no saved addresses.</Typography>
          <Typography color="text.secondary">Add an address to make checkout faster.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default AddressBookPage;
