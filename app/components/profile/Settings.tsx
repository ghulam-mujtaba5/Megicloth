'use client';

import React from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Box, Typography, Card, CardContent, Grid, FormControlLabel, Switch, Button, Divider } from '@mui/material';
import toast from 'react-hot-toast';
import Link from 'next/link';

const Settings = () => {
  const { user, updateProfile, logout } = useAuth();

  if (!user) {
    return null;
  }

  const handlePreferenceChange = async (preference: 'newsletter' | 'marketing' | 'notifications', value: boolean) => {
    const currentPreferences = user.preferences || { newsletter: false, marketing: false, notifications: false };
    const updatedPreferences = { ...currentPreferences, [preference]: value };

    try {
      await updateProfile({ preferences: updatedPreferences });
      toast.success('Settings updated successfully!');
    } catch (error) {
      toast.error('Failed to update settings.');
      console.error('Preference update failed:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>Settings</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Notification Preferences
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <FormControlLabel
                control={
                  <Switch
                    checked={user.preferences?.notifications ?? true}
                    onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                  />
                }
                label="Order and Shipping Updates"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={user.preferences?.newsletter ?? false}
                    onChange={(e) => handlePreferenceChange('newsletter', e.target.checked)}
                  />
                }
                label="Newsletter and Promotions"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={user.preferences?.marketing ?? false}
                    onChange={(e) => handlePreferenceChange('marketing', e.target.checked)}
                  />
                }
                label="Marketing and Special Offers"
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Account Security
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Button
                component={Link}
                href="/auth/change-password"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              >
                Change Password
              </Button>
              {!user.isEmailVerified && (
                <Button
                  component={Link}
                  href="/auth/verify-email"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Verify Email Address
                </Button>
              )}
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={logout}
              >
                Logout
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
