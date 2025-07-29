import { createClient } from '../supabase/server';
import type { User } from '@/app/types';

export async function getAllUsers(): Promise<User[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from('users').select('*');
  if (error) throw error;
  return data as User[];
}

export async function updateUserRole(userId: string, newRole: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();
  const { error } = await supabase.from('users').update({ role: newRole }).eq('id', userId);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function deleteUser(userId: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();
  const { error } = await supabase.from('users').delete().eq('id', userId);
  if (error) return { success: false, error: error.message };
  return { success: true };
}
