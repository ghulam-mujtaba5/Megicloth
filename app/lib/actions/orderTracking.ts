"use server";

import { createClient } from '@/app/lib/supabase/server';

// Get all orders for the authenticated user
export async function getUserOrders() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*), products:order_items(product_id, name, price)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }
  return data;
}

// Get a guest order by email and order ID
export async function getGuestOrder(email: string, orderId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*), products:order_items(product_id, name, price)')
    .eq('id', orderId)
    .eq('shipping_email', email)
    .single();
  if (error || !data) {
    return { error: 'Order not found.' };
  }
  return { order: data };
}
