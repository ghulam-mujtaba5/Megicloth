"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { AdminOrder } from '@/app/types';
import { getAllOrders, updateOrderStatus, deleteOrder } from '../../lib/actions/orders';
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Select, 
  MenuItem, 
  SelectChangeEvent,
  IconButton,
  TextField,
  InputAdornment,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material';
import { Visibility, Search, Delete } from '@mui/icons-material';
import styles from './Orders.module.css';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Filtering and Pagination State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Delete Confirmation State
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getAllOrders()
      .then(data => {
        setOrders(data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch orders.');
        setLoading(false);
      });
  }, []);

  const handleStatusChange = async (orderId: string, event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value;
    const res = await updateOrderStatus(orderId, newStatus);
    if (res.success && res.order) {
      setOrders(orders => orders.map(order => order.id === orderId ? { ...order, status: res.order.status } : order));
    } else {
      alert(res.error || 'Failed to update order status.');
    }
  };

  const handleOpenDeleteDialog = (orderId: string) => {
    setOrderToDelete(orderId);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setOrderToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleDeleteOrder = async () => {
    if (!orderToDelete) return;
    const res = await deleteOrder(orderToDelete);
    if (res.success) {
      setOrders(orders => orders.filter(order => order.id !== orderToDelete));
    } else {
      alert(res.error || 'Failed to delete order.');
    }
    handleCloseDeleteDialog();
  };


    const handleViewOrder = (orderId: string) => {
    router.push(`/admin/orders/${orderId}`);
  };

  const filteredOrders = useMemo(() => {
    return orders
      .filter(order => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          order.id.toLowerCase().includes(searchLower) ||
          (order.users?.first_name || '').toLowerCase().includes(searchLower) ||
          (order.users?.last_name || '').toLowerCase().includes(searchLower) ||
          (order.users?.email || '').toLowerCase().includes(searchLower) ||
          (order.shipping_name || '').toLowerCase().includes(searchLower);
        
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

        return matchesSearch && matchesStatus;
      });
  }, [orders, searchTerm, statusFilter]);

  const paginatedOrders = useMemo(() => {
    return filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredOrders, page, rowsPerPage]);

  return (
    <Box className={styles.pageContainer}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Manage Orders
        </Typography>
      </Box>

      <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by Order ID, Name, Email..."
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
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          displayEmpty
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="all">All Statuses</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="processing">Processing</MenuItem>
          <MenuItem value="shipped">Shipped</MenuItem>
          <MenuItem value="delivered">Delivered</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </Select>
      </Paper>
      {loading ? (
        <Box className={styles.centeredBox}>
          <Typography>Loading orders...</Typography>
        </Box>
      ) : error ? (
        <Box className={styles.centeredBox}>
          <Typography color="error">{error}</Typography>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    {order.users?.first_name || order.shipping_name || '-'} {order.users?.last_name || ''}
                    <br />
                    <span className={styles.customerSubtext}>{order.users?.email || order.shipping_email || '-'}</span>
                  </TableCell>
                  <TableCell>{order.created_at ? new Date(order.created_at).toLocaleDateString() : '-'}</TableCell>
                  <TableCell>Rs. {order.total?.toLocaleString?.() ?? '-'}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status || 'pending'}
                      onChange={(e) => handleStatusChange(order.id, e)}
                      size="small"
                      className={styles.statusSelect}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="processing">Processing</MenuItem>
                      <MenuItem value="shipped">Shipped</MenuItem>
                      <MenuItem value="delivered">Delivered</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" title="View Details" onClick={() => handleViewOrder(order.id)}>
                      <Visibility />
                    </IconButton>
                    <IconButton size="small" title="Delete Order" color="error" onClick={() => handleOpenDeleteDialog(order.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredOrders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </TableContainer>
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete order {orderToDelete}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteOrder} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}
