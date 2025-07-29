"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCampaign, updateCampaign } from '../../../../lib/actions/campaigns';
import type { Campaign } from '@/app/types';
import { 
  TextField, Button, Paper, Grid, FormControlLabel, Switch
} from '@mui/material';

interface EditCampaignFormProps {
  initialData: Omit<Campaign, 'id' | 'created_at' | 'updated_at'> | null;
  campaignId?: string;
}

const emptyState: Partial<Campaign> = {
  title: '',
  slug: '',
  description: '',
  heroImageUrl: '',
  startDate: new Date().toISOString().split('T')[0],
  endDate: new Date().toISOString().split('T')[0],
  isPublished: false,
};

export default function EditCampaignForm({ initialData, campaignId }: EditCampaignFormProps) {
  const router = useRouter();
  const [formState, setFormState] = useState(() => {
    if (!initialData) return emptyState;
    return {
        ...initialData,
        startDate: initialData.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : emptyState.startDate,
        endDate: initialData.endDate ? new Date(initialData.endDate).toISOString().split('T')[0] : emptyState.endDate,
    };
  });
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

    const payload = {
      ...formState,
      startDate: new Date(formState.startDate!),
      endDate: new Date(formState.endDate!),
    };

    const result = isNew
      ? await createCampaign(payload as any)
      : await updateCampaign(campaignId as string, payload as any);

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
          <TextField name="heroImageUrl" label="Hero Image URL" fullWidth value={formState.heroImageUrl || ''} onChange={handleChange} error={!!errors.heroImageUrl} helperText={errors.heroImageUrl?.[0]} />
        </Grid>
        <Grid item xs={12}>
          <TextField name="description" label="Description" fullWidth multiline rows={4} value={formState.description || ''} onChange={handleChange} error={!!errors.description} helperText={errors.description?.[0]} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="startDate" label="Start Date" type="date" fullWidth value={formState.startDate?.split('T')[0] || ''} onChange={handleChange} InputLabelProps={{ shrink: true }} error={!!errors.startDate} helperText={errors.startDate?.[0]} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="endDate" label="End Date" type="date" fullWidth value={formState.endDate?.split('T')[0] || ''} onChange={handleChange} InputLabelProps={{ shrink: true }} error={!!errors.endDate} helperText={errors.endDate?.[0]} />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel control={<Switch checked={formState.isPublished} onChange={handleChange} name="isPublished" />} label="Publish Campaign" />
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
