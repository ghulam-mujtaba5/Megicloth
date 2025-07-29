"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBlogPost, updateBlogPost } from '../../../../lib/actions/blog';
import type { Post } from '@/app/types';
import { Box, Typography, TextField, Button, Paper, Grid } from '@mui/material';

interface EditPostFormProps {
  initialData: Omit<Post, 'id' | 'date'> | null;
  postId?: string;
}

const emptyState: Omit<Post, 'id' | 'date'> = {
  title: '',
  content: '',
  author: '',
  imageUrl: '',
  tags: [],
};

export default function EditPostForm({ initialData, postId }: EditPostFormProps) {
  const router = useRouter();
  const [formState, setFormState] = useState(initialData || emptyState);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const isNewPost = !postId;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'tags') {
      setFormState(prev => ({ ...prev, tags: value.split(',').map(tag => tag.trim()) }));
    } else {
      setFormState(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    setSaving(true);
    setErrors({});

    const result = isNewPost
      ? await createBlogPost(formState)
      : await updateBlogPost(postId as string, formState);

    if (result.success) {
      router.push('/admin/blog');
      router.refresh(); // Refresh the blog list page to show changes
    } else {
      if (result.error && typeof result.error !== 'string') {
        setErrors(result.error);
      } else {
        // TODO: Replace with a more robust notification system (e.g., Snackbar)
        alert(result.error || 'An unexpected error occurred.');
      }
      setSaving(false);
    }
  };

  return (
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
            error={!!errors.title}
            helperText={errors.title?.[0]}
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
            error={!!errors.content}
            helperText={errors.content?.[0]}
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
            error={!!errors.author}
            helperText={errors.author?.[0]}
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
            error={!!errors.imageUrl}
            helperText={errors.imageUrl?.[0]}
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
          <Button variant="contained" onClick={handleSubmit} disabled={saving}>
            {saving ? (isNewPost ? 'Publishing...' : 'Saving...') : (isNewPost ? 'Publish Post' : 'Save Changes')}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
