"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Chip
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { deleteStyleGuide } from '@/app/lib/actions/styleGuides';
import type { StyleGuide } from '@/app/types';

interface StyleGuidesClientPageProps {
  initialGuides: StyleGuide[];
}

export default function StyleGuidesClientPage({ initialGuides }: StyleGuidesClientPageProps) {
  const [guides, setGuides] = useState<StyleGuide[]>(initialGuides);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);
  const router = useRouter();

  const handleAdd = () => {
    router.push('/admin/style-guides/edit/new');
  };

  const handleEdit = (guideId: string) => {
    router.push(`/admin/style-guides/edit/${guideId}`);
  };

  const handleDeleteClick = (guideId: string) => {
    setSelectedGuideId(guideId);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedGuideId) return;
    const result = await deleteStyleGuide(selectedGuideId);
    if (result.success) {
      setGuides(prev => prev.filter(g => g.id !== selectedGuideId));
    } else {
      // TODO: Replace with a more robust notification system (e.g., Snackbar)
      alert(result.error || 'Failed to delete style guide.');
    }
    setOpenDeleteDialog(false);
    setSelectedGuideId(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Manage Style Guides
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
          Add New Guide
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {guides.map((guide) => (
              <TableRow key={guide.id}>
                <TableCell>{guide.title}</TableCell>
                <TableCell>
                  <Chip 
                    label={guide.is_published ? 'Published' : 'Draft'}
                    color={guide.is_published ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{new Date(guide.created_at).toLocaleDateString()}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" onClick={() => handleEdit(guide.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeleteClick(guide.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this style guide? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
