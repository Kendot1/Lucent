-- ═══ ENUMS ═══
CREATE TYPE trade_direction AS ENUM ('long', 'short');
CREATE TYPE trade_outcome AS ENUM ('win', 'loss', 'breakeven');
CREATE TYPE trade_status AS ENUM ('open', 'closed', 'cancelled');
CREATE TYPE market_session AS ENUM ('asia', 'london', 'new_york', 'overlap_london_ny');
CREATE TYPE volatility_state AS ENUM ('low', 'medium', 'high', 'extreme');
CREATE TYPE confluence_category AS ENUM (
  'market_structure', 'order_flow', 'supply_demand',
  'liquidity', 'time_price', 'indicator', 'fundamental'
);

-- ═══ TRADES ═══
CREATE TABLE trades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Core fields
  instrument VARCHAR(20) NOT NULL,          -- e.g. 'EURUSD', 'NQ', 'BTC'
  direction trade_direction NOT NULL,
  status trade_status NOT NULL DEFAULT 'open',
  outcome trade_outcome,

  -- Prices
  entry_price NUMERIC(18,8) NOT NULL,
  stop_loss NUMERIC(18,8),
  take_profit NUMERIC(18,8),
  exit_price NUMERIC(18,8),

  -- Size & risk
  position_size NUMERIC(18,8),
  risk_amount NUMERIC(18,2),                -- dollar risk
  reward_amount NUMERIC(18,2),              -- dollar reward (calculated on close)
  risk_reward_ratio NUMERIC(6,2),           -- calculated

  -- Timing
  entry_time TIMESTAMPTZ NOT NULL,
  exit_time TIMESTAMPTZ,

  -- Context
  session market_session,
  timeframe VARCHAR(10),                    -- e.g. '15m', '1h', '4h'
  setup_type VARCHAR(100),                  -- free-text setup name
  notes TEXT,
  rating SMALLINT CHECK (rating BETWEEN 1 AND 5),

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_trades_user_created ON trades(user_id, created_at DESC);
CREATE INDEX idx_trades_user_instrument ON trades(user_id, instrument);
CREATE INDEX idx_trades_user_outcome ON trades(user_id, outcome);

-- ═══ TRADE SCREENSHOTS ═══
CREATE TABLE trade_screenshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trade_id UUID NOT NULL REFERENCES trades(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  label VARCHAR(100),                       -- e.g. 'entry', 'exit', 'context'
  sort_order SMALLINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_screenshots_trade ON trade_screenshots(trade_id);

-- ═══ CONFLUENCE TAGS ═══
CREATE TABLE confluence_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,                -- e.g. 'BOS', 'FVG', 'OB'
  category confluence_category NOT NULL,
  description TEXT,
  color VARCHAR(7),                         -- hex color for UI badge
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX idx_tags_user_name ON confluence_tags(user_id, name);

-- ═══ TRADE ↔ TAG JUNCTION ═══
CREATE TABLE trade_confluences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trade_id UUID NOT NULL REFERENCES trades(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES confluence_tags(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(trade_id, tag_id)
);

CREATE INDEX idx_trade_confluences_trade ON trade_confluences(trade_id);
CREATE INDEX idx_trade_confluences_tag ON trade_confluences(tag_id);

-- ═══ MARKET SNAPSHOTS ═══
CREATE TABLE market_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  trade_id UUID REFERENCES trades(id) ON DELETE SET NULL,

  session market_session NOT NULL,
  volatility volatility_state,
  notes TEXT,
  key_levels JSONB,                         -- { "support": [1.0800], "resistance": [1.0900] }
  bias VARCHAR(20),                         -- 'bullish', 'bearish', 'neutral'
  snapshot_time TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_snapshots_user ON market_snapshots(user_id, snapshot_time DESC);

-- ═══ UPDATED_AT TRIGGER ═══
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trades_updated_at
  BEFORE UPDATE ON trades
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
