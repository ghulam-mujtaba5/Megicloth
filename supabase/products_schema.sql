-- ==================================================================
-- PRODUCTS TABLE
-- Stores all product information.
-- ==================================================================

CREATE TABLE public.products (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  price numeric NOT NULL CHECK (price >= 0),
  image text, -- Main thumbnail image URL
  images text[], -- Array of product image URLs
  "group" text, -- e.g., "Men’s Unstitched"
  category text, -- e.g., "Summer Collection"
  stock integer NOT NULL DEFAULT 0 CHECK (stock >= 0),
  sku text UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  sale_price numeric CHECK (sale_price >= 0),
  delivery_time text,
  stitching_available boolean DEFAULT false,
  stitching_cost numeric CHECK (stitching_cost >= 0),
  tags text[],
  fabric_type text,
  measurements text
);

-- Add comments to columns
COMMENT ON COLUMN public.products.price IS 'The regular price of the product.';
COMMENT ON COLUMN public.products.sale_price IS 'The discounted price, if applicable.';
COMMENT ON COLUMN public.products.stock IS 'The available quantity of the product.';

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Policies for products table
-- 1. Allow public, anonymous read access to all products.
CREATE POLICY "Allow public read access to products" ON public.products
  FOR SELECT USING (true);

-- 2. Allow admin users (or service_role) to perform all actions.
--    This policy assumes you have a way to identify admins, e.g., via a custom claim.
--    For now, we will restrict it to service_role, which is secure.
CREATE POLICY "Allow full access for service_role" ON public.products
  FOR ALL USING (auth.role() = 'service_role');


-- ==================================================================
-- REVIEWS TABLE
-- Stores product reviews from authenticated users.
-- ==================================================================

CREATE TABLE public.reviews (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment text,
    created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_reviews_product_id ON public.reviews(product_id);
CREATE INDEX idx_reviews_user_id ON public.reviews(user_id);

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Policies for reviews table
-- 1. Allow public, anonymous read access to all reviews.
CREATE POLICY "Allow public read access to reviews" ON public.reviews
  FOR SELECT USING (true);

-- 2. Allow authenticated users to insert their own reviews.
CREATE POLICY "Allow authenticated users to insert reviews" ON public.reviews
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 3. Allow users to update their own reviews.
CREATE POLICY "Allow users to update their own reviews" ON public.reviews
  FOR UPDATE USING (auth.uid() = user_id);

-- 4. Allow users to delete their own reviews.
CREATE POLICY "Allow users to delete their own reviews" ON public.reviews
  FOR DELETE USING (auth.uid() = user_id);

-- 5. Allow admin users (service_role) to perform all actions.
CREATE POLICY "Allow full access for service_role on reviews" ON public.reviews
  FOR ALL USING (auth.role() = 'service_role');
