// supabase/seed.ts

import { createClient } from '@supabase/supabase-js';
import { products as mockProducts } from '../app/data/products';

// Load environment variables from .env.local
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Supabase URL or service key is not defined in .env.local');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedProducts() {
  console.log('Seeding products...');

  // 1. Delete all existing products to start fresh
  const { error: deleteError } = await supabase.from('products').delete().not('id', 'is', null);
  if (deleteError) {
    console.error('Error deleting existing products:', deleteError);
    return;
  }
  console.log('Deleted existing products.');

  // 2. Map mock data to the database schema
  const productsToInsert = mockProducts.map(product => ({
    name: product.name,
    description: product.description,
    price: product.price,
    images: product.images,
    category: product.category,
    stock: product.stock,
    sku: product.sku,
    tags: product.tags,
    sale_price: product.salePrice,
    stitching_cost: product.stitchingCost,
    stitching_available: product.stitchingAvailable,
    created_at: product.createdAt,
  }));

  // 3. Insert the new products
  const { data, error } = await supabase.from('products').insert(productsToInsert).select();

  if (error) {
    console.error('Error seeding products:', error);
  } else {
    console.log(`Seeded ${data.length} products successfully.`);
  }
}

seedProducts().catch(console.error);
