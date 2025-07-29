"use client";

import { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem } from '@mui/material';
import { useProducts } from '../../context/ProductContext';
import { useCategories } from '../../context/CategoryContext';
import { Product } from '../../types';

interface ProductDialogProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function ProductDialog({ open, onClose, product }: ProductDialogProps) {
  const { addProduct, updateProduct } = useProducts();
  const { categories } = useCategories();
  const getInitialFormData = (): Product => {
    if (product) {
      return { ...product };
    }
    return {
      id: '',
      name: '',
      description: '',
      price: 0,
      images: [],
      category: '',
      stock: 0,
      createdAt: new Date().toISOString(),
      salePrice: 0,
      rating: 0,
      reviews: [],
    };
  };

  const [formData, setFormData] = useState(getInitialFormData());

  useEffect(() => {
    setFormData(getInitialFormData());
  }, [product, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = () => {
    if (product) {
      updateProduct({ ...formData });
    } else {
      // Only pass allowed fields to addProduct
      const { id, rating, reviews, reviewsCount, ...newProductData } = formData;
      addProduct(newProductData);
    }
    onClose();
  };  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
      <DialogContent>
        <TextField name="name" label="Product Name" value={formData.name} onChange={handleChange} fullWidth margin="dense" />
        <TextField name="description" label="Description" value={formData.description} onChange={handleChange} fullWidth margin="dense" multiline rows={4} />
        <TextField name="price" label="Price" type="number" value={formData.price} onChange={handleChange} fullWidth margin="dense" />
        <TextField name="stock" label="Stock" type="number" value={formData.stock} onChange={handleChange} fullWidth margin="dense" />
                <TextField name="category" label="Category" value={formData.category} onChange={handleChange} select fullWidth margin="dense">
          {categories.map(cat => <MenuItem key={cat.id} value={cat.name}>{cat.name}</MenuItem>)}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">{product ? 'Save Changes' : 'Add Product'}</Button>
      </DialogActions>
    </Dialog>
  );
}
