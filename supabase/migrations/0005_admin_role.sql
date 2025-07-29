-- Add a 'role' column to the profiles table to manage user permissions.
ALTER TABLE public.profiles
ADD COLUMN role TEXT DEFAULT 'customer';

-- Create a security-definer function to check if the currently authenticated user is an admin.
-- This function can be used in RLS policies to restrict access to protected resources.
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
-- Set a secure search path to prevent hijacking.
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;
