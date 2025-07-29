// scripts/create-default-admin.ts
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_EMAIL = process.env.DEFAULT_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.DEFAULT_ADMIN_PASSWORD;

if (process.env.NODE_ENV === 'production') {
  console.error('This script should NOT be run in production.');
  process.exit(1);
}

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('Missing required environment variables.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function ensureAdminUser() {
  // Check if user exists
  const { data: users, error: userError } = await supabase.auth.admin.listUsers({
    perPage: 100,
    page: 1,
  });
  if (userError) {
    console.error('Error fetching users:', userError);
    process.exit(1);
  }
  let user = users?.users?.find((u: any) => u.email === ADMIN_EMAIL);

  if (!user) {
    // Create user
    const { data: createData, error: createError } = await supabase.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
    });
    if (createError) {
      console.error('Error creating admin user:', createError);
      process.exit(1);
    }
    user = createData.user;
    console.log('Admin user created:', ADMIN_EMAIL);
  } else {
    console.log('Admin user already exists:', ADMIN_EMAIL);
  }

  // Ensure role is set to 'admin' in profiles
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ role: 'admin' })
    .eq('id', user.id);
  if (updateError) {
    console.error('Error updating admin role in profiles:', updateError);
    process.exit(1);
  }
  console.log('Admin user role set to admin.');
}

ensureAdminUser().then(() => process.exit(0));
