"use client";

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Box, Typography, TextField, Button, Grid, Paper, Divider } from '@mui/material';

const ProfileSettingsPage = () => {
  const { user } = useAuth();

  // Mock handlers for form submission
  const handleProfileUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Logic to update user profile will go here
    alert('Profile updated successfully!');
  };

  const handlePasswordChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Logic to change password will go here
    alert('Password changed successfully!');
  };

  return (
    <Box>
      <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 3 }}>
        Profile Settings
      </Typography>

      {/* Profile Information Section */}
      <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>Personal Information</Typography>
        <form onSubmit={handleProfileUpdate}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                defaultValue={user?.name || 'John Doe'}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                defaultValue={user?.email || 'john.doe@example.com'}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained">Update Profile</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* Password Management Section */}
      <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>Change Password</Typography>
        <form onSubmit={handlePasswordChange}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained">Change Password</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default ProfileSettingsPage;
