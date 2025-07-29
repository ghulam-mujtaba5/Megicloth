"use client";

import { useEffect, useState } from 'react';
import ProductDialog from './ProductDialog';
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
  IconButton,
  Avatar
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

  const handleOpen = (product: Product | null = null) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleSave = async (productData: Partial<Product>) => {
    if (selectedProduct) {
            const updatedProductData = {
        name: productData.name || selectedProduct.name,
        description: productData.description || selectedProduct.description,
        category: productData.category || selectedProduct.category,
        price: productData.price ?? selectedProduct.price,
        stock: productData.stock ?? selectedProduct.stock,
        image: productData.images?.[0] || selectedProduct.images?.[0],
      };
      const res = await updateProduct(selectedProduct.id, updatedProductData);
      if (res.success && res.product) {
        setProducts(products.map(p => p.id === selectedProduct.id ? res.product : p));
      } else {
        alert(res.error || 'Failed to update product.');
      }
    } else {
            const newProductData = {
        name: productData.name || 'New Product',
        description: productData.description || 'No description',
        price: productData.price || 0,
        category: productData.category || 'Uncategorized',
        stock: productData.stock || 0,
        image: productData.images?.[0] || undefined,
      };
      const res = await createProduct(newProductData);
      if (res.success && res.product) {
        setProducts([res.product, ...products]);
      } else {
        alert(res.error || 'Failed to create product.');
      }
    }
    handleClose();
  };

  const handleDelete = async (productId: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    const res = await deleteProduct(productId);
    if (res.success) {
      setProducts(products.filter(p => p.id !== productId));
    } else {
      alert(res.error || 'Failed to delete product.');
    }
  };



  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Manage Products
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
          Add Product
        </Button>
      </Box>
      <ProductDialog 
        open={open} 
        onClose={handleClose} 
        onSave={handleSave} 
        product={selectedProduct} 
      />

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
                <TableCell>Image</TableCell>
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
                  <TableCell>
                    <Avatar src={product.images?.[0]} alt={product.name} variant="rounded" />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>Rs. {product.price.toLocaleString()}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="primary" onClick={() => handleOpen(product)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(product.id)}>
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
