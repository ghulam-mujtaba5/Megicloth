import { getBlogPostById } from '../../../../lib/actions/blog';
import EditPostForm from './EditPostForm';
import { Box, Typography } from '@mui/material';
import { notFound } from 'next/navigation';

export default async function EditPostPage({ params }: { params: { postId: string } }) {
  const { postId } = params;
  const isNewPost = postId === 'new';

  let post = null;
  if (!isNewPost) {
    post = await getBlogPostById(postId);
    if (!post) {
      notFound();
    }
  }

  const initialData = post ? {
    title: post.title,
    content: post.content,
    author: post.author,
    imageUrl: post.imageUrl || '',
    tags: post.tags || [],
  } : null;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
        {isNewPost ? 'Create New Post' : 'Edit Post'}
      </Typography>
      <EditPostForm postId={isNewPost ? undefined : postId} initialData={initialData} />
    </Box>
  );
}
