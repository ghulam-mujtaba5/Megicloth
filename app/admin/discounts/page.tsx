"use client";

import { useState } from 'react';
import { useDiscounts, Discount } from '../../context/DiscountContext';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Chip } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import DiscountDialog from './DiscountDialog';

export default function AdminDiscountsPage() {
  const { discounts, deleteDiscount } = useDiscounts();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null);

  const handleAdd = () => {
    setSelectedDiscount(null);
    setDialogOpen(true);
  };

  const handleEdit = (discount: Discount) => {
    setSelectedDiscount(discount);
    setDialogOpen(true);
  };

  const handleDelete = (discountId: string) => {
    if (window.confirm('Are you sure you want to delete this discount?')) {
      deleteDiscount(discountId);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Manage Discounts
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
          Add Discount
        </Button>
      </Box>

      <DiscountDialog 
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        discount={selectedDiscount}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Expiration Date</TableCell>
              <TableCell>Usage</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {discounts.map((discount) => (
              <TableRow key={discount.id}>
                <TableCell><Chip label={discount.code} variant="outlined" /></TableCell>
                <TableCell>{discount.type}</TableCell>
                <TableCell>{discount.type === 'percentage' ? `${discount.value}%` : `Rs. ${discount.value}`}</TableCell>
                <TableCell>{discount.expirationDate ? new Date(discount.expirationDate).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell>{`${discount.timesUsed} / ${discount.usageLimit ?? '∞'}`}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" onClick={() => handleEdit(discount)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(discount.id)}>
                    <Delete />
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
