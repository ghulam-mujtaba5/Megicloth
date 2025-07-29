import { getLoyaltyPoints } from '@/app/lib/actions/loyalty';
import { Typography, Paper } from '@mui/material';
import { Stars } from '@mui/icons-material';

export default async function LoyaltyPoints() {
  const { success, points, error } = await getLoyaltyPoints();

  if (!success) {
    return (
      <Paper sx={{ p: 3, backgroundColor: 'error.light' }}>
        <Typography color="error.contrastText">{error || 'Could not load loyalty points.'}</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
      <Stars sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
      <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
        Your Loyalty Points
      </Typography>
      <Typography variant="h3" component="p" sx={{ fontWeight: 'bold', color: 'primary.main', my: 1 }}>
        {points}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
        Earn points on every purchase and redeem them for exclusive discounts.
      </Typography>
    </Paper>
  );
}
