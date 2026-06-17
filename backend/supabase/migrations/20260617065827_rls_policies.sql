-- Enable RLS on all tables
ALTER TABLE trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE trade_screenshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE confluence_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE trade_confluences ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_snapshots ENABLE ROW LEVEL SECURITY;

-- Trades
CREATE POLICY "Users manage own trades" ON trades
  FOR ALL TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

-- Screenshots
CREATE POLICY "Users manage own screenshots" ON trade_screenshots
  FOR ALL TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

-- Confluence tags
CREATE POLICY "Users manage own tags" ON confluence_tags
  FOR ALL TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

-- Trade confluences
CREATE POLICY "Users manage own confluences" ON trade_confluences
  FOR ALL TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

-- Market snapshots
CREATE POLICY "Users manage own snapshots" ON market_snapshots
  FOR ALL TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);
