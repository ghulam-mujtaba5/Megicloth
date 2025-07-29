"use client";

import { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { useCategories } from '../../context/CategoryContext';
import { Category } from '../../context/CategoryContext';

interface CategoryDialogProps {
  open: boolean;
  onClose: () => void;
  category: Category | null;
}

export default function CategoryDialog({ open, onClose, category }: CategoryDialogProps) {
  const { addCategory, updateCategory } = useCategories();
  
  const getInitialFormData = () => {
    if (category) {
      // Ensure imageUrl is included even if missing from older data
      return { ...category, imageUrl: category.imageUrl ?? '' };
    }
    return {
      id: '',
      name: '',
      description: '',
      imageUrl: '',
      createdAt: '',
    };
  };

  const [formData, setFormData] = useState(getInitialFormData());

  useEffect(() => {
    setFormData(getInitialFormData());
  }, [category, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const { id, createdAt, ...categoryData } = formData;
    if (category) {
      updateCategory({ ...categoryData, id: category.id, createdAt: category.createdAt });
    } else {
      addCategory(categoryData);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{category ? 'Edit Category' : 'Add New Category'}</DialogTitle>
      <DialogContent>
        <TextField 
          name="name" 
          label="Category Name" 
          value={formData.name} 
          onChange={handleChange} 
          fullWidth 
          margin="dense" 
        />
        <TextField 
          name="description" 
          label="Description" 
          value={formData.description} 
          onChange={handleChange} 
          fullWidth 
          margin="dense" 
          multiline 
          rows={4} 
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">{category ? 'Save Changes' : 'Add Category'}</Button>
      </DialogActions>
    </Dialog>
  );
}
