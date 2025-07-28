"use client";

import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useBlog } from "../context/BlogContext";
import Link from 'next/link';

const BlogPreview = () => {
  const { posts } = useBlog();

  // Get the 3 most recent posts
    const latestPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);

  return (
    <Box sx={{ py: 8, backgroundColor: '#ffffff' }}>
      <Typography variant="h4" component="h2" textAlign="center" sx={{ fontWeight: 700, mb: 1 }}>
        From Our Blog
      </Typography>
      <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 5 }}>
        Get the latest tips, trends, and style inspiration.
      </Typography>
      <Grid container spacing={4} sx={{ px: { xs: 2, md: 4} }}>
        {latestPosts.map((post) => (
          <Grid item xs={12} md={4} key={post.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 4, transition: 'box-shadow 0.3s, transform 0.3s', '&:hover': { boxShadow: '0 12px 24px rgba(0,0,0,0.1)', transform: 'translateY(-4px)' } }}>
              <CardActionArea component={Link} href={`/blog/${post.id}`}>
                <CardMedia
                  component="img"
                  height="220"
                  image={post.imageUrl}
                  alt={post.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, minHeight: '64px' }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.content.substring(0, 100)}...
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Box sx={{ p: 2, pt: 0 }}>
                <Link href={`/blog/${post.id}`} passHref>
                  <Button component="a" endIcon={<ArrowForwardIcon />}>
                    Read More
                  </Button>
                </Link>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BlogPreview;
