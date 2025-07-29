"use client";

import { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Select, MenuItem } from '@mui/material';
import { Delete } from '@mui/icons-material';
import type { User } from '@/app/types';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch('/api/admin/users')
      .then(res => res.json())
      .then((data: User[]) => {
        setUsers(data || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch users.');
        setLoading(false);
      });
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    const res = await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, newRole })
    }).then(r => r.json());
    if (res.success) {
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } else {
      alert(res.error || 'Failed to update user role.');
    }
  };

  const handleDelete = async (userId: string) => {
    if (!window.confirm('Delete this user?')) return;
    const res = await fetch('/api/admin/users', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    }).then(r => r.json());
    if (res.success) {
      setUsers(users.filter(u => u.id !== userId));
    } else {
      alert(res.error || 'Failed to delete user.');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
        Manage Users
      </Typography>
      {loading && <Typography>Loading users...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && (
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
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.firstName} {user.lastName}</TableCell>
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
                    <IconButton size="small" color="error" onClick={() => handleDelete(user.id)}>
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
