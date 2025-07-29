"use client";

import { useState, useMemo } from 'react';
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
  IconButton, 
  Select, 
  MenuItem, 
  TextField, 
  InputAdornment, 
  TablePagination 
} from '@mui/material';
import { Delete, Search, Edit } from '@mui/icons-material';
import type { User } from '@/app/types';
import { updateUserRole, deleteUser, updateUser } from '@/app/lib/actions/users';
import UserDialog from './UserDialog';

interface UsersClientPageProps {
  initialUsers: User[];
}

export default function UsersClientPage({ initialUsers }: UsersClientPageProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleRoleChange = async (userId: string, newRole: string) => {
    const res = await updateUserRole(userId, newRole);
    if (res.success) {
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } else {
      // TODO: Replace with a more robust notification system (e.g., Snackbar)
      alert(res.error || 'Failed to update user role.');
    }
  };

  const handleDelete = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    const res = await deleteUser(userId);
    if (res.success) {
      setUsers(users.filter(u => u.id !== userId));
    } else {
      // TODO: Replace with a more robust notification system (e.g., Snackbar)
      alert(res.error || 'Failed to delete user.');
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedUser(null);
    setIsDialogOpen(false);
  };

  const handleSaveUser = async (userData: Partial<User>) => {
    if (!selectedUser) return;

    const result = await updateUser(selectedUser.id, userData);

    if (result.success && result.user) {
      setUsers(users.map(u => u.id === result.user!.id ? result.user! : u));
      handleCloseDialog();
    } else {
      // TODO: Replace with a more robust notification system (e.g., Snackbar)
      alert(result.error || 'Failed to update user.');
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const searchLower = searchTerm.toLowerCase();
      return (
        user.email.toLowerCase().includes(searchLower) ||
        (user.firstName || '').toLowerCase().includes(searchLower) ||
        (user.lastName || '').toLowerCase().includes(searchLower)
      );
    });
  }, [users, searchTerm]);

  const paginatedUsers = useMemo(() => {
    return filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredUsers, page, rowsPerPage]);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Manage Users
        </Typography>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name or email..."
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
      </Paper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{`${user.firstName || ''} ${user.lastName || ''}`.trim()}</TableCell>
                <TableCell>
                  <Select
                    value={user.role}
                    onChange={e => handleRoleChange(user.id, e.target.value)}
                    size="small"
                    disabled={user.role === 'admin'}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" color="primary" onClick={() => handleEdit(user)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDelete(user.id)} disabled={user.role === 'admin'}>
                    <Delete />
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
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
      <UserDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveUser}
        user={selectedUser}
      />
    </Box>
  );
}
