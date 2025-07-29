import { supabase } from './supabaseClient';
import { Product } from '../types/index';

export async function fetchProducts(
  filters: {
    categories: string[];
    priceRange: [number, number];
    availability: string;
  },
  sortOrder: string
): Promise<Product[]> {
  let query = supabase.from('products').select('*');

  // Apply filters
  if (filters.categories && filters.categories.length > 0) {
    query = query.in('category', filters.categories);
  }
  if (filters.priceRange) {
    query = query.gte('price', filters.priceRange[0]);
    query = query.lte('price', filters.priceRange[1]);
  }
  if (filters.availability === 'in-stock') {
    query = query.gt('stock', 0);
  } else if (filters.availability === 'out-of-stock') {
    query = query.eq('stock', 0);
  }

  // Apply sorting
  switch (sortOrder) {
    case 'price-asc':
      query = query.order('price', { ascending: true });
      break;
    case 'price-desc':
      query = query.order('price', { ascending: false });
      break;
    case 'newest':
    default:
      query = query.order('created_at', { ascending: false });
      break;
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    throw new Error('Could not fetch products.');
  }

  return data || [];
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    // In a real app, you might want to handle different errors differently
    // For now, we return null if not found or on error
    return null;
  }

  return data;
}

export async function fetchRelatedProducts(category: string, currentProductId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .neq('id', currentProductId)
    .limit(8);

  if (error) {
    console.error(`Error fetching related products for category ${category}:`, error);
    return [];
  }

  return data || [];
}

