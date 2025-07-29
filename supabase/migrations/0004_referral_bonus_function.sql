-- This function checks if an order is from a referred user's first purchase.
-- If it is, it completes the referral and awards bonus points to the referrer.
-- It's designed to be called via RPC from the server after an order is created.
CREATE OR REPLACE FUNCTION process_first_order_referral(
    p_user_id UUID,
    p_order_id TEXT
)
RETURNS void AS $$
DECLARE
    referral_record RECORD;
    order_count INT;
    referral_bonus_points INT := 100; -- Define the referral bonus amount here
BEGIN
    -- 1. Check if this is the user's first order.
    SELECT count(*)::int INTO order_count FROM public.orders WHERE user_id = p_user_id;

    -- We check for count = 1 because this function runs *after* the order is created.
    IF order_count = 1 THEN
        -- 2. Find the pending referral record for this user.
        SELECT * INTO referral_record
        FROM public.referrals
        WHERE referred_id = p_user_id AND status = 'pending'
        LIMIT 1;

        -- 3. If a pending referral exists, process it.
        IF referral_record IS NOT NULL THEN
            -- Update the referral status to 'completed'.
            UPDATE public.referrals
            SET status = 'completed'
            WHERE id = referral_record.id;

            -- Award bonus points to the referrer.
            -- This re-uses the existing award_loyalty_points function for consistency.
            PERFORM award_loyalty_points(
                referral_record.referrer_id, 
                referral_bonus_points, 
                'Referral Bonus', 
                p_order_id
            );
        END IF;
    END IF;

END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
