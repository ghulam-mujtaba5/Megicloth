'use server';

import { createClient } from '@/app/lib/supabase/server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

// Define the schema for a single campaign
const CampaignSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  slug: z.string().min(3, 'Slug must be at least 3 characters.').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens.'),
  description: z.string().optional(),
  heroImageUrl: z.string().url('Must be a valid URL.').optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  isPublished: z.boolean().default(false),
});

// Action to get a campaign by its slug for the public-facing page
export async function getCampaignBySlug(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) {
    console.error('Error fetching campaign:', error);
    return null;
  }
  return data;
}

// Action to get a campaign by its ID for the admin edit page
export async function getCampaignById(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching campaign by ID:', error);
        return null;
    }
    return data;
}

// Action to get all campaigns for the admin panel
export async function getAllCampaigns() {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching campaigns:', error);
        throw new Error('Could not fetch campaigns.');
    }
    return data;
}

// Action to create a new campaign
export async function createCampaign(values: z.infer<typeof CampaignSchema>) {
    const supabase = createClient();
    const validated = CampaignSchema.safeParse(values);

    if (!validated.success) {
        return { success: false, error: validated.error.flatten().fieldErrors };
    }

    const { slug, title, description, heroImageUrl, startDate, endDate, isPublished } = validated.data;
    const { data, error } = await supabase.from('campaigns').insert([{
      slug,
      title,
      description,
      hero_image_url: heroImageUrl,
      start_date: startDate,
      end_date: endDate,
      is_published: isPublished,
    }]).select().single();

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/campaigns');
    revalidatePath(`/campaigns/${validated.data.slug}`);
    return { success: true, campaign: data };
}

// Action to update an existing campaign
export async function updateCampaign(id: string, values: z.infer<typeof CampaignSchema>) {
    const supabase = createClient();
    const validated = CampaignSchema.safeParse(values);

    if (!validated.success) {
        return { success: false, error: validated.error.flatten().fieldErrors };
    }

    const { slug, title, description, heroImageUrl, startDate, endDate, isPublished } = validated.data;
    const { data, error } = await supabase.from('campaigns').update({
      slug,
      title,
      description,
      hero_image_url: heroImageUrl,
      start_date: startDate,
      end_date: endDate,
      is_published: isPublished,
    }).eq('id', id).select().single();

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/campaigns');
    revalidatePath(`/campaigns/${validated.data.slug}`);
    return { success: true, campaign: data };
}

// Action to delete a campaign
export async function deleteCampaign(id: string) {
    const supabase = createClient();
    const { error } = await supabase.from('campaigns').delete().eq('id', id);

    if (error) {
        return { success: false, error: error.message };
    }

    revalidatePath('/admin/campaigns');
    return { success: true };
}
