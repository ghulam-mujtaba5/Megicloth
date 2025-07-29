'use server';

import { createClient } from '@/app/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const ReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  text: z.string().min(10, 'Review must be at least 10 characters long.'),
  author: z.string().min(2, 'Name is required.'),
  productId: z.string(),
});

// --- Product CRUD ---

const ProductSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  category: z.string().min(2),
  price: z.number().min(0),
  stock: z.number().int().min(0),
  image: z.string().url().optional(),
});

export async function getAllProducts() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data;
}

export async function createProduct(values: z.infer<typeof ProductSchema>) {
  const supabase = createClient();
  const validated = ProductSchema.safeParse(values);
  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors };
  }
  const { data, error } = await supabase.from('products').insert([validated.data]).select().single();
  if (error) {
    return { error: error.message };
  }
  revalidatePath('/admin/products');
  return { success: true, product: data };
}

export async function updateProduct(id: string, values: z.infer<typeof ProductSchema>) {
  const supabase = createClient();
  const validated = ProductSchema.safeParse(values);
  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors };
  }
  const { data, error } = await supabase.from('products').update(validated.data).eq('id', id).select().single();
  if (error) {
    return { error: error.message };
  }
  revalidatePath('/admin/products');
  return { success: true, product: data };
}

export async function deleteProduct(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) {
    return { error: error.message };
  }
  revalidatePath('/admin/products');
  return { success: true };
}

// --- Reviews ---

export async function addReview(_: any, formData: FormData) {
  const validatedFields = ReviewSchema.safeParse({
    rating: Number(formData.get('rating')),
    text: formData.get('text'),
    author: formData.get('author'),
    productId: formData.get('productId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { rating, text, author, productId } = validatedFields.data;
  const supabase = createClient();

  const { error } = await supabase.from('reviews').insert([
    {
      product_id: productId,
      rating,
      text,
      author,
    },
  ]);

  if (error) {
    console.error('Error adding review:', error);
    return {
      errors: { _form: ['Failed to submit review.'] },
    };
  }

  revalidatePath(`/products/${productId}`);
  return { success: true };
}
