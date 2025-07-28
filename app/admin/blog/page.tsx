"use client";

import { useRouter } from 'next/navigation';
import { useBlog } from '../../context/BlogContext';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

export default function AdminBlogPage() {
  const { posts, deletePost } = useBlog();
  const router = useRouter();

  const handleAdd = () => {
    router.push('/admin/blog/edit/new');
  };

  const handleEdit = (postId: string) => {
    router.push(`/admin/blog/edit/${postId}`);
  };

  const handleDelete = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(postId);
    }
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
                  <IconButton size="small" onClick={() => handleDelete(post.id)}>
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
