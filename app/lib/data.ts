import { supabase } from './supabaseClient';
import { Product } from '../types/index';

export async function fetchProducts(
  filters: {
    categories: string[];
    priceRange: [number, number];
    availability: string;
    colors?: string[];
    brands?: string[];
    fabrics?: string[];
    tags?: string[];
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

  // Handle new array-based filters
  if (filters.colors && filters.colors.length > 0) {
    query = query.in('color', filters.colors);
  }
  if (filters.brands && filters.brands.length > 0) {
    query = query.in('brand', filters.brands);
  }
  if (filters.fabrics && filters.fabrics.length > 0) {
    query = query.in('fabric', filters.fabrics);
  }
  if (filters.tags && filters.tags.length > 0) {
    query = query.overlaps('tags', filters.tags);
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

  // Manually map snake_case from DB to camelCase in the application
  const products: Product[] = (data || []).map(p => ({
    ...p,
    salePrice: p.sale_price,
    isPublished: p.is_published,
    isNew: p.is_new,
    onSale: p.on_sale,
    hasVariants: p.has_variants,
    reviewsCount: p.reviews_count,
    createdAt: p.created_at,
    updatedAt: p.updated_at,
    stitchingCost: p.stitching_cost,
    stitchingAvailable: p.stitching_available
  }));

  return products;
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*, reviews:reviews(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching product with id ${id}:`, error);
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

