import fs from 'fs';
import path from 'path';

// List of static routes
const staticPages = [
  '/',
  '/about',
  '/account',
  '/account/addresses',
  '/account/settings',
  '/account/wishlist',
  '/admin',
  '/admin/blog',
  '/admin/categories',
  '/admin/dashboard',
  '/admin/discounts',
  '/admin/inventory',
  '/admin/orders',
  '/admin/products',
  '/admin/settings',
  '/admin/users',
  '/auth/login',
  '/auth/register',
  '/cart',
  '/categories',
  '/checkout',
  '/contact',
  '/faq',
  '/order-success',
  '/privacy',
  '/profile',
  '/returns',
  '/sale',
  '/shipping',
  '/shop',
  '/terms',
  '/track-order',
  '/wishlist',
];

// Optionally, you can add dynamic routes here or fetch them from your data source
// Example: products and categories
// For this example, we'll just use a couple as a demo
const dynamicPages = [
  '/products/1',
  '/products/2',
  '/categories/Summer%20Collection',
];

const allPages = [...staticPages, ...dynamicPages];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (route) => `  <url>\n    <loc>https://www.megicloth.com${route}</loc>\n  </url>`
  )
  .join('\n')}
</urlset>`;

const publicPath = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(publicPath, sitemap);

console.log('✅ sitemap.xml generated at public/sitemap.xml');
