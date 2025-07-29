-- 1. Create the profiles table
CREATE TABLE public.profiles (
  id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  updated_at timestamp with time zone,
  first_name text,
  last_name text,
  phone text,
  avatar_url text,
  -- The addresses column stores an array of address objects.
  addresses jsonb,
  -- The wishlist column stores an array of product IDs.
  wishlist text[]
);

-- 2. Set up Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Create policies for RLS
-- Policy: Allow individuals to view their own profile.
CREATE POLICY "Individuals can view their own profile." ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Policy: Allow individuals to update their own profile.
CREATE POLICY "Individuals can update their own profile." ON public.profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- 4. Create a function to handle new user sign-ups
-- This function inserts a new row into public.profiles when a new user signs up in Supabase Auth.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Create a trigger to call the function on new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 6. Set up storage policies (optional, but good practice)
-- Policy: Allow authenticated users to upload avatars into a bucket named 'avatars'
CREATE POLICY "Allow authenticated uploads to avatars" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');

-- Policy: Allow users to view their own avatars
CREATE POLICY "Allow view access to own avatar" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars' AND owner = auth.uid());

-- Policy: Allow users to update their own avatars
CREATE POLICY "Allow update access to own avatar" ON storage.objects
  FOR UPDATE USING (bucket_id = 'avatars' AND owner = auth.uid());
