import { getCampaignBySlug } from '@/app/lib/actions/campaigns';
import { notFound } from 'next/navigation';
import { Container, Typography, Box, Paper } from '@mui/material';

interface CampaignPageProps {
  params: { slug: string };
}

export default async function CampaignPage({ params }: CampaignPageProps) {
  const { slug } = params;
  const campaign = await getCampaignBySlug(slug);

  if (!campaign) {
    notFound();
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ overflow: 'hidden' }}>
        {campaign.hero_image_url && (
          <Box
            component="img"
            src={campaign.hero_image_url}
            alt={campaign.title}
            sx={{
              width: '100%',
              height: { xs: 200, sm: 300, md: 400 },
              objectFit: 'cover',
            }}
          />
        )}
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold', 
              mb: 2, 
              textAlign: 'center',
              fontSize: { xs: '2rem', sm: '3rem' }
            }}
          >
            {campaign.title}
          </Typography>
          {campaign.description && (
            <Typography variant="body1" sx={{ mt: 2, fontSize: '1.1rem', lineHeight: 1.7 }}>
              {campaign.description}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

// Optional: Generate metadata for SEO
export async function generateMetadata({ params }: CampaignPageProps) {
    const campaign = await getCampaignBySlug(params.slug);
    if (!campaign) {
        return { title: 'Campaign Not Found' };
    }
    return {
        title: campaign.title,
        description: campaign.description,
    };
}
