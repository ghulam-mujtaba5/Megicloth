"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCampaign, updateCampaign } from '../../../../lib/actions/campaigns';
import type { Campaign } from '@/app/types';
import { 
  Box, TextField, Button, Paper, Grid, FormControlLabel, Switch 
} from '@mui/material';

interface EditCampaignFormProps {
  initialData: Omit<Campaign, 'id' | 'created_at' | 'updated_at'> | null;
  campaignId?: string;
}

const emptyState: Omit<Campaign, 'id' | 'created_at' | 'updated_at'> = {
  title: '',
  slug: '',
  description: '',
  hero_image_url: '',
  start_date: new Date().toISOString(),
  end_date: new Date().toISOString(),
  is_published: false,
};

export default function EditCampaignForm({ initialData, campaignId }: EditCampaignFormProps) {
  const router = useRouter();
  const [formState, setFormState] = useState(initialData || emptyState);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const isNew = !campaignId;

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
      ? await createCampaign(formState)
      : await updateCampaign(campaignId as string, formState);

    if (result.success) {
      router.push('/admin/campaigns');
      router.refresh();
    } else {
      if (result.error && typeof result.error !== 'string') {
        setErrors(result.error);
      } else {
        alert(result.error || 'An unexpected error occurred.');
      }
      setSaving(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField name="title" label="Title" fullWidth value={formState.title} onChange={handleChange} error={!!errors.title} helperText={errors.title?.[0]} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="slug" label="URL Slug" fullWidth value={formState.slug} onChange={handleChange} error={!!errors.slug} helperText={errors.slug?.[0]} />
        </Grid>
        <Grid item xs={12}>
          <TextField name="hero_image_url" label="Hero Image URL" fullWidth value={formState.hero_image_url || ''} onChange={handleChange} error={!!errors.hero_image_url} helperText={errors.hero_image_url?.[0]} />
        </Grid>
        <Grid item xs={12}>
          <TextField name="description" label="Description" fullWidth multiline rows={4} value={formState.description || ''} onChange={handleChange} error={!!errors.description} helperText={errors.description?.[0]} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="start_date" label="Start Date" type="date" fullWidth value={formState.start_date.split('T')[0]} onChange={handleChange} InputLabelProps={{ shrink: true }} error={!!errors.start_date} helperText={errors.start_date?.[0]} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="end_date" label="End Date" type="date" fullWidth value={formState.end_date.split('T')[0]} onChange={handleChange} InputLabelProps={{ shrink: true }} error={!!errors.end_date} helperText={errors.end_date?.[0]} />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel control={<Switch checked={formState.is_published} onChange={handleChange} name="is_published" />} label="Publish Campaign" />
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => router.push('/admin/campaigns')} sx={{ mr: 2 }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} disabled={saving}>
            {saving ? 'Saving...' : 'Save Campaign'}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
