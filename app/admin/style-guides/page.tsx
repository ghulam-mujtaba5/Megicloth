import { getStyleGuides } from '@/app/lib/actions/styleGuides';
import StyleGuidesClientPage from './StyleGuidesClientPage';
import { Box, Typography } from '@mui/material';

export default async function AdminStyleGuidesPage() {
  try {
    const guides = await getStyleGuides();
    return <StyleGuidesClientPage initialGuides={guides} />;
  } catch (error) {
    console.error(error);
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Failed to load style guides. Please try again later.</Typography>
      </Box>
    );
  }
}
