import { getAllCampaigns } from '@/app/lib/actions/campaigns';
import CampaignsClientPage from './CampaignsClientPage';
import { Box, Typography } from '@mui/material';

export default async function AdminCampaignsPage() {
  try {
    const campaigns = await getAllCampaigns();
    return <CampaignsClientPage initialCampaigns={campaigns} />;
  } catch (error) {
    console.error(error);
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Failed to load campaigns. Please try again later.</Typography>
      </Box>
    );
  }
}
