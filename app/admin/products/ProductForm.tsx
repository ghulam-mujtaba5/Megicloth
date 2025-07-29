import { useState } from 'react';
import { Box, TextField, Button, Grid } from '@mui/material';

interface ProductFormProps {
  onSubmit: (values: any) => void;
  onCancel: () => void;
  initialValues?: any;
}

export default function ProductForm({ onSubmit, onCancel, initialValues }: ProductFormProps) {
  const [values, setValues] = useState({
    name: initialValues?.name || '',
    description: initialValues?.description || '',
    category: initialValues?.category || '',
    price: initialValues?.price || '',
    stock: initialValues?.stock || '',
    image: initialValues?.image || '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await onSubmit({
      ...values,
      price: Number(values.price),
      stock: Number(values.stock),
    });
    setSubmitting(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField name="name" label="Name" value={values.name} onChange={handleChange} required fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="category" label="Category" value={values.category} onChange={handleChange} required fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField name="description" label="Description" value={values.description} onChange={handleChange} required fullWidth multiline minRows={2} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField name="price" label="Price" type="number" value={values.price} onChange={handleChange} required fullWidth />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField name="stock" label="Stock" type="number" value={values.stock} onChange={handleChange} required fullWidth />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField name="image" label="Image URL" value={values.image} onChange={handleChange} fullWidth />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
        <Button onClick={onCancel} color="secondary" variant="outlined" disabled={submitting}>Cancel</Button>
        <Button type="submit" variant="contained" disabled={submitting}>Save</Button>
      </Box>
    </Box>
  );
}
