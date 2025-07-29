// supabase/seed.ts

import { createClient } from '@supabase/supabase-js';
import { products as mockProducts } from '../app/data/products';

// Load environment variables from .env.local
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('Supabase URL (NEXT_PUBLIC_SUPABASE_URL) is missing from .env.local');
}
if (!supabaseServiceKey) {
  throw new Error('Supabase Service Role Key (SUPABASE_SERVICE_ROLE_KEY) is missing from .env.local');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedProducts() {
  console.log('Starting to seed products...');

  // 1. Delete all existing products to ensure a clean slate
  const { error: deleteError } = await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (deleteError) {
    console.error('Error deleting existing products:', deleteError);
    return;
  }
  console.log('Successfully deleted existing products.');

  // 2. Map mock data to the database schema
  const productsToInsert = mockProducts.map(product => ({
    // We don't include 'id' so the database can generate a UUID
    name: product.name,
    description: product.description,
    price: product.price,

    images: product.images,

    category: product.category,
    stock: product.stock,
    sku: product.sku,
    created_at: product.createdAt, // Use the mock creation date
    sale_price: product.salePrice,

    stitching_available: product.stitchingAvailable,
    stitching_cost: product.stitchingCost,

    fabric: product.fabric,

  }));

  // 3. Insert the new products
  const { data, error } = await supabase.from('products').insert(productsToInsert).select();

  if (error) {
    console.error('Error seeding products:', error);
  } else {
    console.log(`Successfully seeded ${data.length} products.`);
  }
}

seedProducts().catch(console.error);
