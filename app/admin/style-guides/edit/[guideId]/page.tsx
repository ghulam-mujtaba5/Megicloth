import { getStyleGuideById } from '../../../../lib/actions/styleGuides';
import EditStyleGuideForm from './EditStyleGuideForm';
import { notFound } from 'next/navigation';
import { Box, Typography } from '@mui/material';

interface PageProps {
  params: {
    guideId: string;
  };
}

export default async function EditStyleGuidePage({ params }: PageProps) {
  const { guideId } = params;
  const isNew = guideId === 'new';

  if (isNew) {
    return <EditStyleGuideForm />;
  }

  try {
    const guide = await getStyleGuideById(guideId);
    if (!guide) {
      notFound();
    }
    return <EditStyleGuideForm guide={guide} />;
  } catch (error) {
    console.error(error);
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Failed to load style guide. Please try again later.</Typography>
      </Box>
    );
  }
}
