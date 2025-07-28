"use client";

import { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, IconButton, Chip } from '@mui/material';
import { Save } from '@mui/icons-material';

const LOW_STOCK_THRESHOLD = 10;

export default function InventoryPage() {
  const { products, updateProductStock } = useProducts();
  const [stockLevels, setStockLevels] = useState<Record<string, string>>({});

  const handleStockChange = (productId: string, newStock: string) => {
    setStockLevels(prev => ({ ...prev, [productId]: newStock }));
  };

  const handleSaveStock = (productId: string) => {
    const newStock = stockLevels[productId];
    if (newStock !== undefined && !isNaN(parseInt(newStock, 10))) {
      updateProductStock(productId, parseInt(newStock, 10));
      const { [productId]: _, ...rest } = stockLevels;
      setStockLevels(rest);
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock <= 0) return <Chip label="Out of Stock" color="error" size="small" />;
    if (stock <= LOW_STOCK_THRESHOLD) return <Chip label="Low Stock" color="warning" size="small" />;
    return <Chip label="In Stock" color="success" size="small" />;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
        Inventory Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Current Stock</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Update Stock</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} sx={{ '&:hover': { backgroundColor: 'action.hover' } }}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{getStockStatus(product.stock)}</TableCell>
                <TableCell>
                  <TextField 
                    type="number"
                    size="small"
                    variant="outlined"
                    placeholder={String(product.stock)}
                    value={stockLevels[product.id] ?? ''}
                    onChange={(e) => handleStockChange(product.id, e.target.value)}
                    sx={{ width: '100px' }}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton 
                    size="small" 
                    color="primary" 
                    onClick={() => handleSaveStock(product.id)} 
                    disabled={stockLevels[product.id] === undefined || stockLevels[product.id] === ''}
                  >
                    <Save />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
