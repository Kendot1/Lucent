-- Default confluence tags seeded per user on first login via Edge Function
-- This migration creates the function that does it

CREATE OR REPLACE FUNCTION seed_default_tags(p_user_id UUID)
RETURNS void AS $$
BEGIN
  INSERT INTO confluence_tags (user_id, name, category, description, color)
  VALUES
    (p_user_id, 'BOS', 'market_structure', 'Break of Structure', '#6C5CE7'),
    (p_user_id, 'CHOCH', 'market_structure', 'Change of Character', '#A896FF'),
    (p_user_id, 'FVG', 'supply_demand', 'Fair Value Gap', '#3B82F6'),
    (p_user_id, 'OB', 'supply_demand', 'Order Block', '#00C48C'),
    (p_user_id, 'EQH', 'liquidity', 'Equal Highs', '#FFAA33'),
    (p_user_id, 'EQL', 'liquidity', 'Equal Lows', '#FF4757'),
    (p_user_id, 'IDM', 'liquidity', 'Inducement', '#FF6B81'),
    (p_user_id, 'SMT', 'order_flow', 'Smart Money Technique', '#00C48C'),
    (p_user_id, 'MSS', 'market_structure', 'Market Structure Shift', '#6C5CE7'),
    (p_user_id, 'Killzone', 'time_price', 'Session Killzone', '#FFAA33')
  ON CONFLICT (user_id, name) DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY INVOKER;
