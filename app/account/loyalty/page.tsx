import { Suspense } from 'react';
import { Box, Typography, Grid, Paper, CircularProgress } from '@mui/material';
import LoyaltyPoints from '@/app/components/account/loyalty/LoyaltyPoints';
import ReferralCode from '@/app/components/account/loyalty/ReferralCode';
import LoyaltyHistory from '@/app/components/account/loyalty/LoyaltyHistory';

export default function LoyaltyPage() {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
        Referral & Loyalty Program
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Suspense fallback={<Paper sx={{ p: 3, textAlign: 'center' }}><CircularProgress /></Paper>}>
            <LoyaltyPoints />
          </Suspense>
        </Grid>
        <Grid item xs={12} md={6}>
          <Suspense fallback={<Paper sx={{ p: 3, textAlign: 'center' }}><CircularProgress /></Paper>}>
            <ReferralCode />
          </Suspense>
        </Grid>
        <Grid item xs={12}>
          <Suspense fallback={<Paper sx={{ p: 3, textAlign: 'center' }}><CircularProgress /></Paper>}>
            <LoyaltyHistory />
          </Suspense>
        </Grid>
      </Grid>
    </Box>
  );
}
