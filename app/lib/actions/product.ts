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

export async function addReview(prevState: any, formData: FormData) {
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
