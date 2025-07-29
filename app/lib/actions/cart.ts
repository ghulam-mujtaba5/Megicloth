'use server';

import { createClient } from '@/app/lib/supabase/server';
import { cookies } from 'next/headers';

export async function getCart() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

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
