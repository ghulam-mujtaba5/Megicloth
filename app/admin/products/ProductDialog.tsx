"use client";

import { useEffect, useState, useCallback } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem, Grid, Switch, FormControlLabel } from '@mui/material';

import { useCategories } from '../../context/CategoryContext';
import type { Product } from '@/app/types';

interface ProductDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (product: Partial<Product>) => void;
  product: Product | null;
}

export default function ProductDialog({ open, onClose, onSave, product }: ProductDialogProps) {
  const { categories } = useCategories();
    const getInitialFormData = useCallback((): Partial<Product> => {
    if (product) {
      return { ...product };
    }
    return {
      name: '',
      slug: '',
      description: '',
      price: 0,
      salePrice: undefined,
      category: '',
      stock: 0,
      images: [],
      isPublished: true,
      brand: '',
      sku: '',
      tags: [],
    };
  }, [product]);

  const [formData, setFormData] = useState<Partial<Product>>(getInitialFormData());

  useEffect(() => {
    setFormData(getInitialFormData());
  }, [product, open, getInitialFormData]);

  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    let finalValue: any = type === 'checkbox' ? checked : value;

    if (name === 'name') {
      const slug = generateSlug(value);
      setFormData(prev => ({ ...prev, name: value, slug: slug }));
      return;
    }

    if (['price', 'stock', 'salePrice'].includes(name)) {
      finalValue = parseFloat(value) || 0;
    }

    if (name === 'tags' || name === 'images') {
      finalValue = value.split(',').map(item => item.trim());
    }

    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
      <DialogContent>
        <TextField name="name" label="Product Name" value={formData.name} onChange={handleChange} fullWidth margin="dense" />
        <TextField name="slug" label="Slug" value={formData.slug || ''} onChange={handleChange} fullWidth margin="dense" disabled sx={{ backgroundColor: '#f5f5f5' }} />
        <TextField name="description" label="Description" value={formData.description} onChange={handleChange} fullWidth margin="dense" multiline rows={4} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField name="price" label="Price" type="number" value={formData.price} onChange={handleChange} fullWidth margin="dense" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="salePrice" label="Sale Price" type="number" value={formData.salePrice || ''} onChange={handleChange} fullWidth margin="dense" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="stock" label="Stock" type="number" value={formData.stock} onChange={handleChange} fullWidth margin="dense" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="sku" label="SKU" value={formData.sku || ''} onChange={handleChange} fullWidth margin="dense" />
          </Grid>
        </Grid>
        <TextField name="category" label="Category" value={formData.category} onChange={handleChange} select fullWidth margin="dense">
          {categories.map(cat => <MenuItem key={cat.id} value={cat.name}>{cat.name}</MenuItem>)}
        </TextField>
        <TextField name="brand" label="Brand" value={formData.brand || ''} onChange={handleChange} fullWidth margin="dense" />
        <TextField name="tags" label="Tags (comma-separated)" value={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''} onChange={handleChange} fullWidth margin="dense" />
        <TextField name="images" label="Image URLs (comma-separated)" value={Array.isArray(formData.images) ? formData.images.join(', ') : ''} onChange={handleChange} fullWidth margin="dense" multiline rows={2} />
        <FormControlLabel
          control={<Switch checked={formData.isPublished || false} onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })} name="isPublished" />}
          label="Published"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">{product ? 'Save Changes' : 'Add Product'}</Button>
      </DialogActions>
    </Dialog>
  );
}
