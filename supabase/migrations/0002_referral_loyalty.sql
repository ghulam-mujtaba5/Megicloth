-- Step 1: Add a unique referral code to each user's profile
-- This will automatically generate a unique 8-character code for all existing and new users.
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE;

-- Populate referral codes for existing users who don't have one
UPDATE public.profiles
SET referral_code = 'REF' || upper(substring(md5(random()::text), 0, 9))
WHERE referral_code IS NULL;

-- Create an index for faster lookups on referral codes
CREATE UNIQUE INDEX IF NOT EXISTS profiles_referral_code_idx ON public.profiles (referral_code);


-- Step 2: Create a table to track referral relationships
CREATE TABLE IF NOT EXISTS public.referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referrer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    referred_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    status TEXT NOT NULL DEFAULT 'pending', -- e.g., 'pending', 'completed' (after first purchase)
    CONSTRAINT unique_referral UNIQUE (referrer_id, referred_id)
);

-- Step 3: Create a table to store user loyalty points
CREATE TABLE IF NOT EXISTS public.loyalty_points (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    points INT NOT NULL DEFAULT 0 CHECK (points >= 0),
    last_updated TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Step 4: Create a table to log all loyalty point transactions
CREATE TABLE IF NOT EXISTS public.loyalty_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    points_change INT NOT NULL,
    reason TEXT NOT NULL, -- e.g., 'initial_bonus', 'purchase', 'referral_bonus', 'redeemed'
    order_id TEXT, -- Optional, link to the order that generated/used the points
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Step 5: Enable Row Level Security for the new tables
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_history ENABLE ROW LEVEL SECURITY;

-- Step 6: Define RLS Policies

-- Referrals Table Policies
DROP POLICY IF EXISTS "Allow users to view their own referrals" ON public.referrals;
CREATE POLICY "Allow users to view their own referrals"
ON public.referrals
FOR SELECT
USING (auth.uid() = referrer_id OR auth.uid() = referred_id);

DROP POLICY IF EXISTS "Allow authenticated users to create referrals" ON public.referrals;
CREATE POLICY "Allow authenticated users to create referrals"
ON public.referrals
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Loyalty Points Table Policies
DROP POLICY IF EXISTS "Allow users to view their own loyalty points" ON public.loyalty_points;
CREATE POLICY "Allow users to view their own loyalty points"
ON public.loyalty_points
FOR SELECT
USING (auth.uid() = user_id);

-- Loyalty History Table Policies
DROP POLICY IF EXISTS "Allow users to view their own loyalty history" ON public.loyalty_history;
CREATE POLICY "Allow users to view their own loyalty history"
ON public.loyalty_history
FOR SELECT
USING (auth.uid() = user_id);

-- Admin Access Policies (using the get_user_role() function we created earlier)
DROP POLICY IF EXISTS "Allow admin full access to referrals" ON public.referrals;
CREATE POLICY "Allow admin full access to referrals"
ON public.referrals
FOR ALL
USING (get_user_role() = 'admin')
WITH CHECK (get_user_role() = 'admin');

DROP POLICY IF EXISTS "Allow admin full access to loyalty points" ON public.loyalty_points;
CREATE POLICY "Allow admin full access to loyalty points"
ON public.loyalty_points
FOR ALL
USING (get_user_role() = 'admin')
WITH CHECK (get_user_role() = 'admin');

DROP POLICY IF EXISTS "Allow admin full access to loyalty history" ON public.loyalty_history;
CREATE POLICY "Allow admin full access to loyalty history"
ON public.loyalty_history
FOR ALL
USING (get_user_role() = 'admin')
WITH CHECK (get_user_role() = 'admin');

-- Function to add initial loyalty points for a new user
CREATE OR REPLACE FUNCTION public.handle_new_user_loyalty()
RETURNS TRIGGER AS $$
BEGIN
  -- Use INSERT ... ON CONFLICT to prevent errors if the user already has an entry
  INSERT INTO public.loyalty_points (user_id, points)
  VALUES (new.id, 0) -- Start with 0 points, can be changed to give a signup bonus
  ON CONFLICT (user_id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a new user is created in auth.users
DROP TRIGGER IF EXISTS on_auth_user_created_loyalty ON auth.users;
CREATE TRIGGER on_auth_user_created_loyalty
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user_loyalty();
