"use server";

import { createClient } from '@/app/lib/supabase/server';
import { cookies } from 'next/headers';
import { z } from 'zod';

const OrderItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int().min(1),
});

const OrderSchema = z.object({
  cart: z.array(OrderItemSchema),
  total: z.number(),
  shipping: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    address: z.string().min(1),
    phone: z.string().min(5),
  }),
  paymentMethod: z.enum(["cod", "payfast", "stripe"]),
  orderNotes: z.string().optional(),
});

export async function getAllOrders() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*), users: user_id (id, email, first_name, last_name)')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
  return data;
}

export async function updateOrderStatus(orderId: string, status: string) {
  const supabase = createClient();
  const { error } = await supabase.from('orders').update({ status }).eq('id', orderId);
  if (error) {
    return { error: error.message };
  }
  // Optionally revalidate admin orders page
  // revalidatePath('/admin/orders');
  return { success: true };
}

export async function createOrder(_prevState: any, values: z.infer<typeof OrderSchema>) {
  const supabase = createClient(cookies());
  const { cart, total, shipping, paymentMethod, orderNotes } = values;
  const { data: { session } } = await supabase.auth.getSession();
  let userId: string | null = null;
  if (session) {
    userId = session.user.id;
  }
  // For guests, require name and email
  if (!userId && (!shipping.email || !shipping.name)) {
    return { error: 'Email and name are required for guest checkout.' };
  }
  // Insert order
  const { data: order, error: orderError } = await supabase.from('orders').insert({
    user_id: userId,
    total,
    shipping_name: shipping.name,
    shipping_email: shipping.email,
    shipping_address: shipping.address,
    shipping_phone: shipping.phone,
    payment_method: paymentMethod,
    notes: orderNotes || null,
    status: 'pending',
  }).select().single();
  if (orderError || !order) {
    return { error: 'Failed to create order.' };
  }
  // Insert order items
  const items = cart.map(item => ({
    order_id: order.id,
    product_id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));
  const { error: itemsError } = await supabase.from('order_items').insert(items);
  if (itemsError) {
    return { error: 'Failed to add order items.' };
  }
  return { success: true, orderId: order.id };
}
