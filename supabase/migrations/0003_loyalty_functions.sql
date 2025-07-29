-- This function atomically awards loyalty points to a user and logs the transaction.
-- It's designed to be called via RPC from the server.
CREATE OR REPLACE FUNCTION award_loyalty_points(
    p_user_id UUID,
    p_points_to_add INT,
    p_reason TEXT,
    p_order_id TEXT DEFAULT NULL
)
RETURNS void AS $$
BEGIN
    -- Insert a record into the loyalty_history table to log the transaction.
    INSERT INTO public.loyalty_history (user_id, points_change, reason, order_id)
    VALUES (p_user_id, p_points_to_add, p_reason, p_order_id);

    -- Atomically update the user's total points in the loyalty_points table.
    -- If the user does not have an entry, this will create one.
    INSERT INTO public.loyalty_points (user_id, points)
    VALUES (p_user_id, p_points_to_add)
    ON CONFLICT (user_id)
    DO UPDATE SET
        points = loyalty_points.points + p_points_to_add,
        last_updated = now();

END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
