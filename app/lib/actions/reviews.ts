'use server';

import { createClient } from '@/app/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getAllReviews() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      products (id, name)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reviews:', error);
    throw new Error('Could not fetch reviews.');
  }

  return data;
}

export async function updateReviewStatus(reviewId: string, isApproved: boolean) {
  const supabase = createClient();
  const { error } = await supabase
    .from('reviews')
    .update({ is_approved: isApproved })
    .eq('id', reviewId);

  if (error) {
    console.error('Error updating review status:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/reviews');
  return { success: true };
}

export async function deleteReview(reviewId: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId);

  if (error) {
    console.error('Error deleting review:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/reviews');
  return { success: true };
}
