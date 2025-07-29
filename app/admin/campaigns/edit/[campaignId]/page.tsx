import { getCampaignById } from '../../../../lib/actions/campaigns';
import EditCampaignForm from './EditCampaignForm';
import { Box, Typography } from '@mui/material';
import { notFound } from 'next/navigation';

export default async function EditCampaignPage({ params }: { params: { campaignId: string } }) {
  const { campaignId } = params;
  const isNew = campaignId === 'new';

  let campaign = null;
  if (!isNew) {
    campaign = await getCampaignById(campaignId);
    if (!campaign) {
      notFound();
    }
  }

  const initialData = campaign ? {
    ...campaign,
    start_date: new Date(campaign.start_date).toISOString(),
    end_date: new Date(campaign.end_date).toISOString(),
  } : null;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
        {isNew ? 'Create New Campaign' : 'Edit Campaign'}
      </Typography>
      <EditCampaignForm campaignId={isNew ? undefined : campaignId} initialData={initialData} />
    </Box>
  );
}
