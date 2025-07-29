"use client";

import { useEffect, useState } from 'react';
import ProductForm from './ProductForm';
import type { Product } from '@/app/types';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../../lib/actions/product';
import { 
  Box, 
  Typography, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton 
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    setLoading(true);
    getAllProducts()
      .then(data => {
        setProducts(data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch products.');
        setLoading(false);
      });
  }, []);

  const handleOpen = (product: Product | null) => {
    setSelectedProduct(product);
    setOpen(true);
  };



  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Manage Products
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>
          Add Product
        </Button>
      </Box>
      {/* Product Creation/Edit Modal */}
      {open && (
        <Box sx={{ mb: 3, p: 3, border: '1px solid #e0e0e0', borderRadius: 2, background: '#fafbfc' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>{selectedProduct ? 'Edit Product' : 'Add Product'}</Typography>
          <ProductForm
            initialValues={selectedProduct}
            // ProductForm expects only the minimal fields for product creation/update
            onSubmit={async (values: { name: string; description: string; category: string; price: number; stock: number; image?: string }) => {
              if (selectedProduct) {
                // Edit
                const res = await updateProduct(selectedProduct.id, values);
                if (res.success) {
                  setProducts(products.map(p => p.id === selectedProduct.id ? res.product : p));
                  setOpen(false);
                  setSelectedProduct(null);
                } else {
                  alert(res.error ? JSON.stringify(res.error) : 'Failed to update product.');
                }
              } else {
                // Add
                const res = await createProduct(values);
                if (res.success) {
                  setProducts([res.product, ...products]);
                  setOpen(false);
                } else {
                  alert(res.error ? JSON.stringify(res.error) : 'Failed to create product.');
                }
              }
            }}
            onCancel={() => { setOpen(false); setSelectedProduct(null); }}
          />
        </Box>
      )}

      {/* Loading/Error States */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 120 }}>
          <Typography>Loading products...</Typography>
        </Box>
      )}
      {error && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 120 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}

      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>Rs. {product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="primary" onClick={() => handleOpen(product)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={async () => {
                      if (!window.confirm('Delete this product?')) return;
                      const res = await deleteProduct(product.id);
                      if (res.success) {
                        setProducts(products.filter(p => p.id !== product.id));
                      } else {
                        alert(res.error || 'Failed to delete product.');
                      }
                    }}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
