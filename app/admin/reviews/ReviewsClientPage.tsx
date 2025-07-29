"use client";

import { useState, useMemo } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  IconButton, Chip, Switch, Select, MenuItem, FormControl, InputLabel, TablePagination
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { updateReviewStatus, deleteReview } from '@/app/lib/actions/reviews';
import type { Review } from '@/app/types';
import Link from 'next/link';

interface ReviewsClientPageProps {
  initialReviews: Review[];
}

export default function ReviewsClientPage({ initialReviews }: ReviewsClientPageProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleStatusChange = async (reviewId: string, isApproved: boolean) => {
    const result = await updateReviewStatus(reviewId, isApproved);
    if (result.success) {
      setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, is_approved: isApproved } : r));
    } else {
      // TODO: Replace with a more robust notification system (e.g., Snackbar)
      alert(result.error || 'Failed to update status.');
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!window.confirm('Are you sure you want to delete this review permanently?')) return;
    const result = await deleteReview(reviewId);
    if (result.success) {
      setReviews(prev => prev.filter(r => r.id !== reviewId));
    } else {
      // TODO: Replace with a more robust notification system (e.g., Snackbar)
      alert(result.error || 'Failed to delete review.');
    }
  };

  const filteredReviews = useMemo(() => {
    return reviews.filter(review => {
      if (filter === 'all') return true;
      if (filter === 'approved') return review.is_approved;
      if (filter === 'pending') return !review.is_approved;
      return true;
    });
  }, [reviews, filter]);

  const paginatedReviews = useMemo(() => {
    return filteredReviews.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredReviews, page, rowsPerPage]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
        Review Moderation
      </Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <FormControl>
          <InputLabel>Filter by Status</InputLabel>
          <Select
            value={filter}
            label="Filter by Status"
            onChange={e => setFilter(e.target.value)}
            size="small"
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
          </Select>
        </FormControl>
      </Paper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Review</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Approve</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedReviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>
                  {review.products ? (
                    <Link href={`/products/${review.products.slug}`} passHref>
                      <Typography component="a" color="primary" sx={{ textDecoration: 'none' }}>
                        {review.products.name || 'N/A'}
                      </Typography>
                    </Link>
                  ) : 'N/A'}
                </TableCell>
                <TableCell>{review.author}</TableCell>
                <TableCell>{review.rating}/5</TableCell>
                <TableCell sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{review.text}</TableCell>
                <TableCell>
                  <Chip 
                    label={review.is_approved ? 'Approved' : 'Pending'}
                    color={review.is_approved ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Switch
                    checked={review.is_approved}
                    onChange={(e) => handleStatusChange(review.id, e.target.checked)}
                    color="success"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="error" onClick={() => handleDelete(review.id)}>
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
        count={filteredReviews.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </Box>
  );
}
