"use server";

import { createClient } from '@/app/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// Get all wishlist items for the current user
export async function getWishlist() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return [];

  const { data: wishlistItems, error } = await supabase
    .from('wishlists')
    .select('product_id, products(*)')
    .eq('user_id', session.user.id);

  if (error) {
    console.error('Error fetching wishlist:', error);
    return [];
  }

  return wishlistItems.map(item => item.products);
}

// Add a product to the user's wishlist
export async function addToWishlist(productId: string) {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return [];

  await supabase.from('wishlists').upsert({
    user_id: session.user.id,
    product_id: productId
  }, { onConflict: 'user_id, product_id' });

  revalidatePath('/wishlist');
  return getWishlist();
}

// Remove a product from the user's wishlist
export async function removeFromWishlist(productId: string) {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return [];

  await supabase.from('wishlists').delete().match({
    user_id: session.user.id,
    product_id: productId
  });

  revalidatePath('/wishlist');
  return getWishlist();
}

// Clear the user's wishlist
export async function clearWishlist() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return [];

  await supabase.from('wishlists').delete().match({
    user_id: session.user.id
  });

  revalidatePath('/wishlist');
  return getWishlist();
}
