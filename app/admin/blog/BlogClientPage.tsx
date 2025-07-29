"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { deleteBlogPost } from '@/app/lib/actions/blog';
import type { Post } from '@/app/types';

interface BlogClientPageProps {
  initialPosts: Post[];
}

export default function BlogClientPage({ initialPosts }: BlogClientPageProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const router = useRouter();

  const handleAdd = () => {
    router.push('/admin/blog/edit/new');
  };

  const handleEdit = (postId: string) => {
    router.push(`/admin/blog/edit/${postId}`);
  };

  const handleDeleteClick = (postId: string) => {
    setSelectedPostId(postId);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedPostId) return;
    const result = await deleteBlogPost(selectedPostId);
    if (result.success) {
      setPosts(prev => prev.filter(p => p.id !== selectedPostId));
    } else {
      // TODO: Replace with a more robust notification system (e.g., Snackbar)
      alert(result.error || 'Failed to delete post.');
    }
    setOpenDeleteDialog(false);
    setSelectedPostId(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Manage Blog Posts
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
          Add New Post
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" onClick={() => handleEdit(post.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeleteClick(post.id)}>
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
            Are you sure you want to delete this blog post? This action cannot be undone.
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
