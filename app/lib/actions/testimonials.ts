'use server';

import { createClient } from '@/app/lib/supabase/server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

// Define the schema for a single testimonial
const TestimonialSchema = z.object({
  author: z.string().min(2, 'Author name must be at least 2 characters.'),
  content: z.string().min(10, 'Testimonial content must be at least 10 characters.'),
  rating: z.coerce.number().min(1).max(5).optional(),
  is_published: z.boolean().default(false),
});

// Action to get all testimonials for the admin panel
export async function getAllTestimonials() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching testimonials:', error);
    throw new Error('Could not fetch testimonials.');
  }
  return data;
}

// Action to get only published testimonials for the public-facing site
export async function getPublishedTestimonials() {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching published testimonials:', error);
        return [];
    }
    return data;
}

// Action for a user to submit a new testimonial (will be unpublished by default)
export async function createTestimonial(values: z.infer<typeof TestimonialSchema>) {
    const supabase = createClient();
    // Force is_published to false on creation, admin must approve
    const validated = TestimonialSchema.safeParse({ ...values, is_published: false });

    if (!validated.success) {
        return { success: false, error: validated.error.flatten().fieldErrors };
    }

    const { data, error } = await supabase.from('testimonials').insert([validated.data]).select().single();

    if (error) {
        return { success: false, error: error.message };
    }

    // No revalidation needed for public pages until it's published
    revalidatePath('/admin/testimonials');
    return { success: true, testimonial: data };
}

// Action for an admin to update a testimonial (e.g., publish it)
export async function updateTestimonial(id: string, values: { isPublished?: boolean }) {
    const supabase = createClient();
    
    // We don't need to validate the whole object, just the parts being updated
    const updateData: { is_published?: boolean } = {};
    if (values.isPublished !== undefined) {
      updateData.is_published = values.isPublished;
    }

    const { data, error } = await supabase.from('testimonials').update(updateData).eq('id', id).select().single();

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/testimonials');
    revalidatePath('/'); // Revalidate home page or wherever testimonials are shown
    return { success: true, testimonial: data };
}

// Action to delete a testimonial
export async function deleteTestimonial(id: string) {
    const supabase = createClient();
    const { error } = await supabase.from('testimonials').delete().eq('id', id);

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/testimonials');
    revalidatePath('/');
    return { success: true };
}
