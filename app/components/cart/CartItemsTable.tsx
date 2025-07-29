'use client';

import Link from 'next/link';
import { 
  Box, Button, IconButton, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, TextField, Typography, Avatar 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { CartItem } from '../../types';

interface CartItemsTableProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartItemsTable({ items, onUpdateQuantity, onRemoveItem, onClearCart }: CartItemsTableProps) {
  return (
    <Paper sx={{ p: { xs: 1, md: 2 }, borderRadius: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={item.images && item.images.length > 0 ? item.images[0] : ''} alt={item.name} variant="rounded" />
                    <Box>
                      <Link href={`/products/${item.id}`} passHref>
                        <Typography component="a" variant="body1" sx={{ fontWeight: 'bold', textDecoration: 'none', color: 'text.primary' }}>
                          {item.name}
                        </Typography>
                      </Link>
                      <Typography variant="body2" color="text.secondary">
                        {item.category}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="right">Rs. {(item.salePrice ?? item.price).toLocaleString()}</TableCell>
                <TableCell align="center">
                  <TextField
                    type="number"
                    size="small"
                    value={item.quantity}
                    onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value, 10) || 1)}
                    inputProps={{ min: 1, max: item.stock, style: { textAlign: 'center', width: 40 } }}
                  />
                </TableCell>
                <TableCell align="right">Rs. {((item.salePrice ?? item.price) * item.quantity).toLocaleString()}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => onRemoveItem(item.id)} color="error" aria-label={`Remove ${item.name}`}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <Button variant="outlined" color="error" onClick={onClearCart}>
          Clear Cart
        </Button>
      </Box>
    </Paper>
  );
}
