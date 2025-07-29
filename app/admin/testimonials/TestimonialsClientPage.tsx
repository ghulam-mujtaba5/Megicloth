"use client";

import { useState } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, 
  Switch, Button, Rating, Chip
} from '@mui/material';
import { Delete, CheckCircle, Cancel } from '@mui/icons-material';
import { updateTestimonial, deleteTestimonial } from '@/app/lib/actions/testimonials';
import type { Testimonial } from '@/app/types';

interface TestimonialsClientPageProps {
  initialTestimonials: Testimonial[];
}

export default function TestimonialsClientPage({ initialTestimonials }: TestimonialsClientPageProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedTestimonialId, setSelectedTestimonialId] = useState<string | null>(null);

  const handleTogglePublish = async (id: string, isPublished: boolean) => {
    const result = await updateTestimonial(id, { isPublished: !isPublished });
    if (result.success) {
      setTestimonials(prev => 
        prev.map(t => t.id === id ? { ...t, isPublished: !isPublished } : t)
      );
    } else {
      // TODO: Replace with a more robust notification system (e.g., Snackbar)
      alert(result.error || 'Failed to update testimonial status.');
    }
  };

  const handleDeleteClick = (testimonialId: string) => {
    setSelectedTestimonialId(testimonialId);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedTestimonialId) return;
    const result = await deleteTestimonial(selectedTestimonialId);
    if (result.success) {
      setTestimonials(prev => prev.filter(t => t.id !== selectedTestimonialId));
    } else {
      // TODO: Replace with a more robust notification system (e.g., Snackbar)
      alert(result.error || 'Failed to delete testimonial.');
    }
    setOpenDeleteDialog(false);
    setSelectedTestimonialId(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
        Manage Testimonials
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Author</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Submitted On</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {testimonials.map((testimonial) => (
              <TableRow key={testimonial.id}>
                <TableCell>{testimonial.author}</TableCell>
                <TableCell sx={{ maxWidth: 400 }}>{testimonial.content}</TableCell>
                <TableCell>
                  {testimonial.rating != null && <Rating value={testimonial.rating} readOnly />}
                </TableCell>
                <TableCell>{testimonial.createdAt ? new Date(testimonial.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell>
                  <Chip 
                    icon={testimonial.isPublished ? <CheckCircle /> : <Cancel />}
                    label={testimonial.isPublished ? 'Published' : 'Pending'}
                    color={testimonial.isPublished ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Switch
                    checked={!!testimonial.isPublished}
                    onChange={() => handleTogglePublish(testimonial.id, !!testimonial.isPublished)}
                    color="success"
                  />
                  <IconButton size="small" onClick={() => handleDeleteClick(testimonial.id)}>
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
            Are you sure you want to delete this testimonial? This action cannot be undone.
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
