'use client';

import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import { Post, posts } from '../../data/posts';
import styles from './BlogPreview.module.css';

const BlogPreview = () => {
  // Get the 3 most recent posts
  const latestPosts = posts
    .sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <Box component="section" className={styles.section}>
      <Typography variant="h4" component="h2" className={styles.title}>
        From Our Blog
      </Typography>
      <Typography variant="body1" className={styles.subtitle}>
        Get the latest tips, trends, and style inspiration.
      </Typography>
      <Grid container spacing={4} className={styles.gridContainer}>
        {latestPosts.map((post: Post) => (
          <Grid item xs={12} md={4} key={post.id}>
            <Card className={styles.card}>
              <CardActionArea component={Link} href={`/blog/${post.id}`} sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <div>
                  <CardMedia
                    component="img"
                    image={post.imageUrl}
                    alt={post.title}
                    className={styles.cardMedia}
                  />
                  <CardContent className={styles.cardContent}>
                    <Typography variant="h6" component="h3" gutterBottom className={styles.postTitle}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className={styles.postExcerpt}>
                      {post.content.substring(0, 100)}...
                    </Typography>
                  </CardContent>
                </div>
                <div className={styles.readMoreContainer}>
                  <Button
                    component="span" // Render as a span as the parent is the link
                    endIcon={<ArrowForwardIcon />}
                    className={styles.readMoreButton}
                  >
                    Read More
                  </Button>
                </div>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};


export default BlogPreview;
