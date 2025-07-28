"use client";

import { useState } from 'react';
import { useCategories } from '../../context/CategoryContext';
import CategoryDialog from './CategoryDialog';
import { Category } from '../../context/CategoryContext';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

export default function AdminCategoriesPage() {
  const { categories, deleteCategory } = useCategories();
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleOpen = (category: Category | null) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Manage Categories
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen(null)}>
          Add Category
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" color="primary" onClick={() => handleOpen(category)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => deleteCategory(category.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CategoryDialog open={open} onClose={handleClose} category={selectedCategory} />
    </Box>
  );
}
