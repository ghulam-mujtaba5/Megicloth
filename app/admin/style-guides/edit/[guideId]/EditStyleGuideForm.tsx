"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  createStyleGuide, 
  updateStyleGuide 
} from '../../../../lib/actions/styleGuides';
import { 
  Box, Typography, TextField, Button, Paper, Grid, FormControlLabel, Switch 
} from '@mui/material';
import type { StyleGuide } from '@/app/types';

interface EditStyleGuideFormProps {
  guide?: StyleGuide | null;
}

export default function EditStyleGuideForm({ guide }: EditStyleGuideFormProps) {
  const router = useRouter();
  const [formState, setFormState] = useState({
    title: guide?.title || '',
    content: guide?.content || '',
    isPublished: guide?.isPublished || false,
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const isNew = !guide;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    setErrors({});

    const result = isNew
      ? await createStyleGuide(formState)
      : await updateStyleGuide(guide.id, formState);

    if (result.success) {
      router.push('/admin/style-guides');
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
        {isNew ? 'Create New Style Guide' : 'Edit Style Guide'}
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
              rows={6}
              variant="outlined"
              value={formState.content}
              onChange={handleChange}
              error={!!errors.content}
              helperText={errors.content?.[0]}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formState.isPublished}
                  onChange={handleChange}
                  name="isPublished"
                  color="primary"
                />
              }
              label="Publish Style Guide"
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => router.push('/admin/style-guides')} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit} disabled={saving}>
              {saving ? (isNew ? 'Creating...' : 'Saving...') : (isNew ? 'Create Guide' : 'Save Changes')}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
