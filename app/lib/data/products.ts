import { createClient } from '@/app/lib/supabase/server';
import { type Product } from '@/app/types';

export async function getProducts({
  query: searchQuery = '',
  category = 'All',
  minPrice = 0,
  maxPrice = 10000,
  sort = 'newest',
}: {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}) {
  const supabase = createClient();
  let queryBuilder = supabase.from('products').select('*');

  // Search filter
  if (searchQuery) {
    queryBuilder = queryBuilder.ilike('name', `%${searchQuery}%`);
  }

  // Category filter
  if (category && category !== 'All') {
    queryBuilder = queryBuilder.eq('category', category);
  }

  // Price filter
  queryBuilder = queryBuilder.gte('price', minPrice);
  queryBuilder = queryBuilder.lte('price', maxPrice);

  // Sorting
  const [sortKey, sortDirection] = sort.split('-');
  const ascending = sortDirection === 'asc';

  if (sortKey === 'price') {
    queryBuilder = queryBuilder.order('price', { ascending });
  } else if (sortKey === 'rating') {
    queryBuilder = queryBuilder.order('rating', { ascending: false, nullsFirst: false });
  } else {
    queryBuilder = queryBuilder.order('created_at', { ascending: false });
  }

  const { data, error } = await queryBuilder;

  if (error) {
    console.error('Error fetching products:', error);
    throw new Error('Could not fetch products.');
  }

  return data as Product[];
}

export async function getProductById(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            reviews (*)
        `)
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching product by id:', error);
        return null;
    }

    return data as Product;
}

export async function getCategories() {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('categories')
        .select('name');

    if (error) {
        console.error('Error fetching categories:', error);
        return [];
    }

    return data.map(c => c.name);
}

export async function getRelatedProducts(category: string, currentProductId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .neq('id', currentProductId)
        .limit(4);

    if (error) {
        console.error('Error fetching related products:', error);
        return [];
    }

    return data as Product[];
}
