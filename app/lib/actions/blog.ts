'use server';

import { createClient } from '@/app/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const PostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long.'),
  content: z.string().min(10, 'Content must be at least 10 characters long.'),
  author: z.string().min(2, 'Author name is required.'),
  imageUrl: z.string().url().optional().or(z.literal('')), // Allow empty string or valid URL
  tags: z.array(z.string()).optional(),
});

export async function getBlogPosts() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    throw new Error('Could not fetch blog posts.');
  }
  return data;
}

export async function getBlogPostById(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching post:', error);
        return null;
    }
    return data;
}

export async function createBlogPost(values: z.infer<typeof PostSchema>) {
  const supabase = createClient();
  const validated = PostSchema.safeParse(values);
  if (!validated.success) {
    return { success: false, error: validated.error.flatten().fieldErrors };
  }

  const { data, error } = await supabase.from('posts').insert([validated.data]).select().single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/blog');
  revalidatePath('/blog'); // Also revalidate public blog page
  return { success: true, post: data };
}

export async function updateBlogPost(id: string, values: z.infer<typeof PostSchema>) {
  const supabase = createClient();
  const validated = PostSchema.safeParse(values);
  if (!validated.success) {
    return { success: false, error: validated.error.flatten().fieldErrors };
  }

  const { data, error } = await supabase.from('posts').update(validated.data).eq('id', id).select().single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/blog');
  revalidatePath(`/blog/${id}`); // Revalidate specific post page
  return { success: true, post: data };
}

export async function deleteBlogPost(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('posts').delete().eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  return { success: true };
}
