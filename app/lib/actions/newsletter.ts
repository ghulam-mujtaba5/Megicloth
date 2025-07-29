'use server';

import { createClient } from '@/app/lib/supabase/server';
import { z } from 'zod';

const EmailSchema = z.string().email('Please enter a valid email address.');

export async function subscribeToNewsletter(email: string): Promise<{ success: boolean; message: string; }> {
  const supabase = createClient();

  const validation = EmailSchema.safeParse(email);
  if (!validation.success) {
    return { success: false, message: validation.error.errors[0].message };
  }

  const { error } = await supabase
    .from('newsletter_subscriptions')
    .insert([{ email: validation.data }]);

  if (error) {
    // Handle unique constraint violation (PostgreSQL error code 23505)
    if (error.code === '23505') {
      return { success: false, message: 'This email is already subscribed.' };
    }
    console.error('Error subscribing to newsletter:', error);
    return { success: false, message: 'An unexpected error occurred. Please try again.' };
  }

  return { success: true, message: 'Thank you for subscribing!' };
}
