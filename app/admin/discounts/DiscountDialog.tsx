"use client";

import { useEffect, useState } from 'react';
import { useDiscounts, Discount } from '../../context/DiscountContext';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, SelectChangeEvent } from '@mui/material';

interface DiscountDialogProps {
  open: boolean;
  onClose: () => void;
  discount: Discount | null;
}

const initialState: Omit<Discount, 'id' | 'timesUsed'> = {
  code: '',
  type: 'percentage',
  value: 0,
  expirationDate: '',
  usageLimit: 100,
};

export default function DiscountDialog({ open, onClose, discount }: DiscountDialogProps) {
  const { addDiscount, updateDiscount } = useDiscounts();
  const [formState, setFormState] = useState(initialState);

  useEffect(() => {
    if (discount) {
      setFormState({
        ...discount,
        expirationDate: discount.expirationDate ? new Date(discount.expirationDate).toISOString().split('T')[0] : '',
      });
    } else {
      setFormState(initialState);
    }
  }, [discount, open]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name as string]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name as string]: value }));
  };

  const handleSubmit = () => {
    if (discount) {
      updateDiscount({ ...formState, id: discount.id, timesUsed: discount.timesUsed });
    } else {
      addDiscount(formState);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{discount ? 'Edit Discount' : 'Add New Discount'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              name="code"
              label="Discount Code"
              type="text"
              fullWidth
              variant="outlined"
              value={formState.code}
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={formState.type}
                label="Type"
                onChange={handleSelectChange}
              >
                <MenuItem value="percentage">Percentage</MenuItem>
                <MenuItem value="fixed">Fixed Amount</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              name="value"
              label="Value"
              type="number"
              fullWidth
              variant="outlined"
              value={formState.value}
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              name="expirationDate"
              label="Expiration Date"
              type="date"
              fullWidth
              variant="outlined"
              value={formState.expirationDate}
              onChange={handleTextChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              name="usageLimit"
              label="Usage Limit"
              type="number"
              fullWidth
              variant="outlined"
              value={formState.usageLimit}
              onChange={handleTextChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">{discount ? 'Save Changes' : 'Add Discount'}</Button>
      </DialogActions>
    </Dialog>
  );
}
