-- Create chart_snapshots table
CREATE TABLE chart_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  symbol VARCHAR(30) NOT NULL,
  timeframe VARCHAR(10),
  notes TEXT,
  image_url TEXT NOT NULL,
  trade_id UUID REFERENCES trades(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast user queries
CREATE INDEX idx_chart_snapshots_user ON chart_snapshots(user_id, created_at DESC);

-- Updated at trigger
CREATE TRIGGER chart_snapshots_updated_at
  BEFORE UPDATE ON chart_snapshots
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Enable RLS
ALTER TABLE chart_snapshots ENABLE ROW LEVEL SECURITY;

-- Table RLS Policy
CREATE POLICY "Users manage own chart snapshots" ON chart_snapshots
  FOR ALL TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

-- Create Storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('chart_snapshots', 'chart_snapshots', false)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
CREATE POLICY "Users can upload their own chart snapshots"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'chart_snapshots' AND
    (select auth.uid()::text) = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own chart snapshots"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'chart_snapshots' AND
    (select auth.uid()::text) = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own chart snapshots"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'chart_snapshots' AND
    (select auth.uid()::text) = (storage.foldername(name))[1]
  )
  WITH CHECK (
    bucket_id = 'chart_snapshots' AND
    (select auth.uid()::text) = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own chart snapshots"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'chart_snapshots' AND
    (select auth.uid()::text) = (storage.foldername(name))[1]
  );
