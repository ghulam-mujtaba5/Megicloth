import { getBlogPosts } from '@/app/lib/actions/blog';
import BlogClientPage from './BlogClientPage';
import { Box, Typography } from '@mui/material';

export default async function AdminBlogPage() {
  // Fetch data on the server
  try {
    const posts = await getBlogPosts();
    return <BlogClientPage initialPosts={posts} />;
  } catch (error) {
    console.error(error);
    // Handle data fetching errors gracefully
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Failed to load blog posts. Please try again later.</Typography>
      </Box>
    );
  }
}
