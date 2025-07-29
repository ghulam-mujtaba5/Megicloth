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
