import { createClient } from '../supabase/server';
import type { User } from '@/app/types';
import { revalidatePath } from 'next/cache';

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

export async function updateUser(userId: string, userData: Partial<User>): Promise<{ success: boolean; user?: User; error?: string }> {
  const supabase = createClient();

  // Ensure non-editable fields are not passed to update
  const { id, email, role, ...updatableData } = userData;

  const { data, error } = await supabase
    .from('users')
    .update(updatableData)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating user:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/users');
  return { success: true, user: data as User };
}
