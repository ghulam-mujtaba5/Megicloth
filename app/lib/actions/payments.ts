'use server';

import { createClient } from '@/app/lib/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';
import type { CartItem } from '@/app/types';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-06-30.basil',
    })
  : null;

export async function createCheckoutSession(cartItems: CartItem[]): Promise<{ sessionId?: string; error?: string; }> {
  if (!stripe) {
    console.error('Stripe secret key is not configured.');
    return { error: 'Payment processing is not available at the moment. Please contact support.' };
  }
  const supabase = createClient();
  const origin = headers().get('origin')!;

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const line_items = cartItems.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        images: item.images && item.images.length > 0 ? [item.images[0]] : [], // Corrected to use images array
        description: item.description,
        metadata: { productId: item.id },
      },
      unit_amount: item.price * 100, // Amount in cents
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      customer_email: user.email,
      metadata: {
        userId: user.id,
        cart: JSON.stringify(cartItems.map(item => ({ id: item.id, quantity: item.quantity }))),
      },
    });

    if (!session.id) {
        throw new Error('Could not create Stripe session');
    }

    return { sessionId: session.id };
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    return { error: 'Could not create checkout session. Please try again.' };
  }
}

export async function verifyCheckoutSession(sessionId: string): Promise<{ order?: any; error?: string; }> {
  if (!stripe) {
    return { error: 'Stripe is not configured.' };
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return { error: 'Payment not successful.' };
    }

    const supabase = createClient();
    const userId = session.metadata?.userId;

    if (!userId) {
      return { error: 'User ID not found in session metadata.' };
    }

    // Check if order already exists
    const { data: existingOrder } = await supabase
      .from('orders')
      .select('id')
      .eq('stripe_session_id', sessionId)
      .single();

    if (existingOrder) {
        const { data: orderData } = await supabase.from('orders').select('*').eq('id', existingOrder.id).single();
        return { order: orderData };
    }

    const cartItems: CartItem[] = JSON.parse(session.metadata?.cart || '[]');
    const total = session.amount_total ? session.amount_total / 100 : 0;

    const { data: newOrder, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        total,
        status: 'pending',
        stripe_session_id: sessionId,
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return { error: 'Failed to create order.' };
    }

    const orderItems = cartItems.map(item => ({
      order_id: newOrder.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      // Optionally, handle order cleanup if items fail to be created
      return { error: 'Failed to save order items.' };
    }

    // Clear user's cart
    await supabase.from('cart_items').delete().eq('user_id', userId);

    return { order: newOrder };

  } catch (error) {
    console.error('Error verifying checkout session:', error);
    return { error: 'Failed to verify checkout session.' };
  }
}
