"use server";

import { createClient } from '@/app/lib/supabase/server';
import { z } from 'zod';
import { addLoyaltyPoints } from './loyalty';

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
  const { data: order, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select()
    .single();

  if (error) {
    console.error('Error updating order status:', error);
    return { success: false, error: error.message };
  }
  return { success: true, order };
}

export async function deleteOrder(orderId: string) {
  const supabase = createClient();
  
  // Assuming cascade delete is enabled on the 'order_id' foreign key in 'order_items'.
  // If not, you must delete items first.
  const { error } = await supabase.from('orders').delete().eq('id', orderId);

  if (error) {
    console.error('Error deleting order:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function createOrder(_prevState: any, values: z.infer<typeof OrderSchema>) {
  const supabase = createClient();
  const { cart, total, shipping, paymentMethod, orderNotes } = values;
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id ?? null;
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
    // In a real-world scenario, you might want to roll back the order creation here.
    return { error: 'Failed to add order items.' };
  }

  // If the order was successful and created by a logged-in user, award loyalty points.
  if (userId) {
    // Simple logic: 1 point for every dollar spent, rounded down.
    const pointsToAward = Math.floor(total);
    if (pointsToAward > 0) {
      // This is a fire-and-forget call; we don't want to block the checkout
      // process if awarding points fails for some reason.
      addLoyaltyPoints(userId, pointsToAward, `Purchase - Order #${order.id.substring(0, 8)}`, order.id);
    }

    // After awarding points for the purchase, check if this order completes a referral.
    // This is also a fire-and-forget call.
    supabase.rpc('process_first_order_referral', {
      p_user_id: userId,
      p_order_id: order.id,
    }).then(({ error }) => {
      if (error) {
        // Log the error but don't fail the checkout process.
        console.error('Error processing referral bonus:', error);
      }
    });
  }

  return { success: true, orderId: order.id };
}
