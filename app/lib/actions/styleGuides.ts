'use server';

import { createClient } from '@/app/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const StyleGuideSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long.'),
  content: z.string().min(10, 'Content must be at least 10 characters long.'),
  isPublished: z.boolean().default(false),
  // You can add more fields like author, cover_image, etc.
});

export async function getStyleGuides() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('style_guides')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching style guides:', error);
    throw new Error('Could not fetch style guides.');
  }
  return data;
}

export async function getStyleGuideById(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('style_guides')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching style guide:', error);
        return null;
    }
    return data;
}

export async function createStyleGuide(values: z.infer<typeof StyleGuideSchema>) {
  const supabase = createClient();
  const validated = StyleGuideSchema.safeParse(values);
  if (!validated.success) {
    return { success: false, error: validated.error.flatten().fieldErrors };
  }

  const { title, content, isPublished } = validated.data;
  const { data, error } = await supabase.from('style_guides').insert([
    { title, content, is_published: isPublished, slug: title.toLowerCase().replace(/\s+/g, '-') }
  ]).select().single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/style-guides');
  revalidatePath('/style-guides');
  return { success: true, guide: data };
}

export async function updateStyleGuide(id: string, values: z.infer<typeof StyleGuideSchema>) {
  const supabase = createClient();
  const validated = StyleGuideSchema.safeParse(values);
  if (!validated.success) {
    return { success: false, error: validated.error.flatten().fieldErrors };
  }

  const { title, content, isPublished } = validated.data;
  const { data, error } = await supabase.from('style_guides').update(
    { title, content, is_published: isPublished, slug: title.toLowerCase().replace(/\s+/g, '-') }
  ).eq('id', id).select().single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/style-guides');
  revalidatePath(`/style-guides/${id}`);
  return { success: true, guide: data };
}

export async function deleteStyleGuide(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from('style_guides').delete().eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/style-guides');
  revalidatePath('/style-guides');
  return { success: true };
}
