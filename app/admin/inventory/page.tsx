"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  TextField, IconButton, Chip, CircularProgress, InputAdornment, Select, MenuItem, FormControl, InputLabel, Grid,
  Button, TablePagination
} from '@mui/material';
import { Save, Search, CloudUpload, Download } from '@mui/icons-material';
import { getAllProducts, updateStock, bulkUpdateStock } from '@/app/lib/actions/product';
import Papa from 'papaparse';
import type { Product } from '@/app/types';

const LOW_STOCK_THRESHOLD = 10;

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stockLevels, setStockLevels] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  
  useEffect(() => {
    setLoading(true);
    getAllProducts()
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load inventory.');
        setLoading(false);
      });
  }, []);

  const handleStockChange = (productId: string, newStock: string) => {
    setStockLevels(prev => ({ ...prev, [productId]: newStock }));
  };

    const handleExportCSV = () => {
    const csvData = Papa.unparse(products.map(p => ({
      id: p.id,
      name: p.name,
      sku: p.sku,
      stock: p.stock,
    })));

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'inventory.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const updates = results.data
          .map((row: any) => ({ 
            id: row.id, 
            stock: parseInt(row.stock, 10) 
          }))
          .filter(update => update.id && !isNaN(update.stock));

        if (updates.length === 0) {
          alert('No valid product updates found in the CSV file.');
          setIsImporting(false);
          return;
        }

        const result = await bulkUpdateStock(updates);
        if (result.success) {
          alert(`Successfully updated ${result.updatedCount} products.`);
          // Refetch data to show updated values
          getAllProducts().then(data => setProducts(data));
        } else {
          alert(result.error || 'An error occurred during bulk update.');
        }
        setIsImporting(false);
      },
      error: (error: any) => {
        alert('Failed to parse CSV file.');
        console.error('CSV Parsing Error:', error);
        setIsImporting(false);
      },
    });
    event.target.value = ''; // Reset file input
  };

const handleSaveStock = async (productId: string) => {
    const newStockValue = stockLevels[productId];
    if (newStockValue === undefined || isNaN(parseInt(newStockValue, 10))) return;

    const newStock = parseInt(newStockValue, 10);
    const result = await updateStock(productId, newStock);

    if (result.success && result.product) {
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: result.product!.stock } : p));
      const { [productId]: _, ...rest } = stockLevels;
      setStockLevels(rest);
    } else {
      alert(result.error || 'Failed to update stock.');
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock <= 0) return <Chip label="Out of Stock" color="error" size="small" />;
    if (stock <= LOW_STOCK_THRESHOLD) return <Chip label="Low Stock" color="warning" size="small" />;
    return <Chip label="In Stock" color="success" size="small" />;
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        const searchLower = searchTerm.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchLower) ||
          (product.sku || '').toLowerCase().includes(searchLower)
        );
      })
      .filter(product => {
        if (statusFilter === 'all') return true;
        if (statusFilter === 'in-stock') return product.stock > LOW_STOCK_THRESHOLD;
        if (statusFilter === 'low-stock') return product.stock > 0 && product.stock <= LOW_STOCK_THRESHOLD;
        if (statusFilter === 'out-of-stock') return product.stock <= 0;
        return true;
      });
  }, [products, searchTerm, statusFilter]);

  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredProducts, page, rowsPerPage]);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Typography color="error" sx={{ p: 3 }}>{error}</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
        Inventory Management
      </Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by product name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="in-stock">In Stock</MenuItem>
                <MenuItem value="low-stock">Low Stock</MenuItem>
                <MenuItem value="out-of-stock">Out of Stock</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Download />}
              onClick={handleExportCSV}
              sx={{ height: '100%' }}
            >
              Export
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
              aria-label="Upload CSV for bulk inventory update"
            />
            <Button
              fullWidth
              variant="contained"
              startIcon={<CloudUpload />}
              onClick={handleImportClick}
              disabled={isImporting}
              sx={{ height: '100%' }}
            >
              {isImporting ? 'Importing...' : 'Import'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
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
            {paginatedProducts.map((product) => (
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredProducts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage: number) => setPage(newPage)}
        onRowsPerPageChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </Box>
  );
}
