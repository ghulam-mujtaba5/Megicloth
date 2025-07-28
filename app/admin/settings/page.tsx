"use client";

import { useState, useEffect } from 'react';
import { useHomepage } from '../../context/HomepageContext';
import { useCategories } from '../../context/CategoryContext';
import { Box, Typography, TextField, Button, Paper, Grid, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Chip } from '@mui/material';

export default function HomepageSettingsPage() {
  const { settings, updateHeroBanner, updateFeaturedCategories } = useHomepage();
  const { categories } = useCategories();
  const [banner, setBanner] = useState(settings.heroBanner);
  const [featured, setFeatured] = useState(settings.featuredCategories);

  useEffect(() => {
    setBanner(settings.heroBanner);
    setFeatured(settings.featuredCategories);
  }, [settings]);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBanner(prev => ({ ...prev, [name]: value }));
  };

  const handleFeaturedChange = (event: any) => {
    const { target: { value } } = event;
    setFeatured(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSave = () => {
    updateHeroBanner(banner);
    updateFeaturedCategories(featured);
    alert('Settings saved!');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
        Homepage Settings
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Hero Banner</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField name="title" label="Title" fullWidth value={banner.title} onChange={handleBannerChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField name="subtitle" label="Subtitle" fullWidth value={banner.subtitle} onChange={handleBannerChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="imageUrl" label="Image URL" fullWidth value={banner.imageUrl} onChange={handleBannerChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="link" label="Link URL" fullWidth value={banner.link} onChange={handleBannerChange} />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Featured Categories</Typography>
        <FormControl fullWidth>
          <InputLabel>Categories</InputLabel>
          <Select
            multiple
            value={featured}
            onChange={handleFeaturedChange}
            input={<OutlinedInput label="Categories" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => {
                  const category = categories.find(c => c.id === value);
                  return <Chip key={value} label={category ? category.name : value} />;
                })}
              </Box>
            )}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Settings
        </Button>
      </Box>
    </Box>
  );
}
