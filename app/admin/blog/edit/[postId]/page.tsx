"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useBlog, Post } from '../../../../context/BlogContext';
import { Box, Typography, TextField, Button, Paper, Grid } from '@mui/material';

const initialState: Omit<Post, 'id' | 'date'> = {
  title: '',
  content: '',
  author: '',
  imageUrl: '',
  tags: [],
};

export default function EditPostPage() {
  const { postId } = useParams();
  const router = useRouter();
  const { getPostById, addPost, updatePost } = useBlog();
  const [formState, setFormState] = useState(initialState);
  const isNewPost = postId === 'new';

  useEffect(() => {
    if (!isNewPost) {
      const post = getPostById(postId as string);
      if (post) {
        setFormState(post);
      } else {
        // Handle post not found, maybe redirect
        router.push('/admin/blog');
      }
    }
  }, [postId, getPostById, isNewPost, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'tags') {
      setFormState(prev => ({ ...prev, tags: value.split(',').map(tag => tag.trim()) }));
    } else {
      setFormState(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    if (isNewPost) {
      addPost(formState);
    } else {
      updatePost({ ...formState, id: postId as string, date: new Date().toISOString() });
    }
    router.push('/admin/blog');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
        {isNewPost ? 'Create New Post' : 'Edit Post'}
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Title"
              fullWidth
              variant="outlined"
              value={formState.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="content"
              label="Content"
              fullWidth
              multiline
              rows={10}
              variant="outlined"
              value={formState.content}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="author"
              label="Author"
              fullWidth
              variant="outlined"
              value={formState.author}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="imageUrl"
              label="Image URL"
              fullWidth
              variant="outlined"
              value={formState.imageUrl}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="tags"
              label="Tags (comma-separated)"
              fullWidth
              variant="outlined"
              value={formState.tags.join(', ')}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => router.push('/admin/blog')} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              {isNewPost ? 'Publish Post' : 'Save Changes'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
