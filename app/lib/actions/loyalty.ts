'use server';

import { createClient } from '@/app/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// --- Data Fetching Actions ---

/**
 * Fetches the currently authenticated user's profile, including their referral code.
 */
export async function getUserProfileWithReferral() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'User not authenticated.' };
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id, first_name, last_name, referral_code')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return { success: false, error: 'Could not fetch user profile.' };
  }

  return { success: true, profile };
}

/**
 * Fetches the loyalty points balance for the currently authenticated user.
 */
export async function getLoyaltyPoints() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'User not authenticated.' };
  }

  const { data: pointsData, error } = await supabase
    .from('loyalty_points')
    .select('points')
    .eq('user_id', user.id)
    .single();

  if (error) {
    // If no row exists, it's not a critical error, just means 0 points.
    if (error.code === 'PGRST116') {
        return { success: true, points: 0 };
    }
    console.error('Error fetching loyalty points:', error);
    return { success: false, error: 'Could not fetch loyalty points.' };
  }

  return { success: true, points: pointsData?.points ?? 0 };
}

/**
 * Fetches the loyalty points transaction history for the currently authenticated user.
 */
export async function getLoyaltyHistory() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'User not authenticated.' };
  }

  const { data: history, error } = await supabase
    .from('loyalty_history')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching loyalty history:', error);
    return { success: false, error: 'Could not fetch loyalty history.' };
  }

  return { success: true, history };
}

// --- Core Logic Actions ---

/**
 * Applies a referral code by creating a referral relationship.
 * This should be called after a new user has been successfully created.
 * @param newUserId The UUID of the newly registered user.
 * @param referralCode The referral code they used to sign up.
 */
export async function processReferral(newUserId: string, referralCode: string) {
  if (!newUserId || !referralCode?.trim()) {
    // No code provided, so nothing to do.
    return { success: true };
  }

  const supabase = createClient();

  // 1. Find the referrer by their code.
  const { data: referrerProfile, error: referrerError } = await supabase
    .from('profiles')
    .select('id')
    .eq('referral_code', referralCode.trim().toUpperCase())
    .single();

  if (referrerError || !referrerProfile) {
    // It's not a critical error if the code is invalid, so we just log it and move on.
    console.warn(`Invalid or non-existent referral code used: ${referralCode}`);
    return { success: true, message: 'Invalid referral code.' };
  }

  const referrerId = referrerProfile.id;

  // 2. Ensure the user is not referring themselves.
  if (referrerId === newUserId) {
    console.warn(`User ${newUserId} attempted to refer themselves.`);
    return { success: false, error: 'You cannot refer yourself.' };
  }

  // 3. Create the referral relationship.
  const { error: insertError } = await supabase.from('referrals').insert({
    referrer_id: referrerId,
    referred_id: newUserId,
    status: 'pending',
  });

  if (insertError) {
    // This might happen if a referral link already exists (e.g., race condition).
    // We can treat this as non-critical for the user's registration flow.
    console.error('Error creating referral link:', insertError);
    return { success: false, error: 'Could not apply referral code.' };
  }

  console.log(`Successfully created referral link: ${referrerId} -> ${newUserId}`);
  return { success: true };
}

/**
 * Adds a specified number of loyalty points to a user's account.
 * This function handles both adding points and logging the transaction.
 * It should only be called from trusted server-side logic (e.g., after a payment is confirmed).
 * @param userId The UUID of the user to award points to.
 * @param points The number of points to add (should be positive).
 * @param reason A description of why the points are being awarded (e.g., 'Completed Purchase').
 * @param orderId Optional: The ID of the order associated with this transaction.
 */
export async function addLoyaltyPoints(userId: string, points: number, reason: string, orderId?: string) {
  if (points <= 0) {
    return { success: false, error: 'Points to add must be positive.' };
  }

  const supabase = createClient();

  // Use an RPC call to a database function to ensure the transaction is atomic.
  const { error } = await supabase.rpc('award_loyalty_points', {
    p_user_id: userId,
    p_points_to_add: points,
    p_reason: reason,
    p_order_id: orderId,
  });

  if (error) {
    console.error('Error awarding loyalty points:', error);
    return { success: false, error: 'Failed to award loyalty points.' };
  }

  revalidatePath('/account/loyalty'); // Revalidate the user's loyalty page
  return { success: true };
}
