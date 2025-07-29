'use server';

import { createClient } from '@/app/lib/supabase/server';
import { cookies } from 'next/headers';

export async function getCart() {
  const supabase = createClient(cookies());

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return [];
  }

  const { data: cartItems, error } = await supabase
    .from('cart_items')
    .select(`
      quantity,
      products (*)
    `)
    .eq('user_id', session.user.id);

  if (error) {
    console.error('Error fetching cart:', error);
    return [];
  }

  return cartItems.map(item => ({
    ...(item.products as any),
    quantity: item.quantity,
  }));
}

export async function addToCart(productId: string, quantity: number = 1) {
  const supabase = createClient(cookies());
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return [];

  // Check for existing item
  const { data } = await supabase
    .from('cart_items')
    .select('quantity')
    .eq('user_id', session.user.id)
    .eq('product_id', productId)
    .single();

  const newQuantity = (data?.quantity || 0) + quantity;

  await supabase.from('cart_items').upsert({
    user_id: session.user.id,
    product_id: productId,
    quantity: newQuantity
  }, { onConflict: 'user_id, product_id' });

  return getCart();
}

export async function updateCartItem(productId: string, quantity: number) {
  const supabase = createClient(cookies());
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return [];

  if (quantity <= 0) {
    return removeFromCart(productId);
  }

  await supabase.from('cart_items').update({ quantity }).match({
    user_id: session.user.id,
    product_id: productId
  });

  return getCart();
}

export async function removeFromCart(productId: string) {
  const supabase = createClient(cookies());
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return [];

  await supabase.from('cart_items').delete().match({
    user_id: session.user.id,
    product_id: productId
  });

  return getCart();
}

export async function clearCart() {
  const supabase = createClient(cookies());
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return [];

  await supabase.from('cart_items').delete().match({
    user_id: session.user.id
  });

  return getCart();
}

