-- Create the testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    author TEXT NOT NULL,
    content TEXT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    is_published BOOLEAN NOT NULL DEFAULT FALSE
);

-- Enable Row Level Security (RLS) for the new table
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Helper function to get the role of the currently logged-in user
-- This function checks the 'profiles' table as per our established admin access control pattern.
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role INTO user_role
  FROM public.profiles
  WHERE id = auth.uid();
  RETURN user_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS Policy: Allow public read access ONLY to published testimonials
CREATE POLICY "Allow public read access to published testimonials"
ON testimonials
FOR SELECT
USING (is_published = TRUE);

-- RLS Policy: Allow authenticated users to submit new testimonials
CREATE POLICY "Allow authenticated users to insert"
ON testimonials
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- RLS Policy: Allow users with the 'admin' role to have full access (select, insert, update, delete)
CREATE POLICY "Allow admin full access"
ON testimonials
FOR ALL
USING (get_user_role() = 'admin')
WITH CHECK (get_user_role() = 'admin');
