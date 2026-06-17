import { z } from "zod";

export const tradeSchema = z.object({
  instrument: z.string().min(1, "Instrument is required").max(20),
  direction: z.enum(["long", "short"]),
  status: z.enum(["open", "closed", "cancelled"]),
  outcome: z.enum(["win", "loss", "breakeven"]).nullable(),
  entry_price: z.number().positive("Must be positive"),
  stop_loss: z.number().positive("Must be positive").nullable(),
  take_profit: z.number().positive("Must be positive").nullable(),
  exit_price: z.number().positive("Must be positive").nullable(),
  position_size: z.number().positive("Must be positive").nullable(),
  risk_amount: z.number().nonnegative().nullable(),
  reward_amount: z.number().nullable(),
  risk_reward_ratio: z.number().nullable(),
  entry_time: z.string().datetime(),
  exit_time: z.string().datetime().nullable(),
  session: z.enum(["asia", "london", "new_york", "overlap_london_ny"]).nullable(),
  timeframe: z.string().max(10).nullable(),
  setup_type: z.string().max(100).nullable(),
  notes: z.string().nullable(),
  rating: z.number().min(1).max(5).nullable(),
  // For relations
  tags: z.array(z.string().uuid()).default([]),
});

export type TradeFormValues = z.infer<typeof tradeSchema>;

export const marketSnapshotSchema = z.object({
  session: z.enum(["asia", "london", "new_york", "overlap_london_ny"]),
  volatility: z.enum(["low", "medium", "high", "extreme"]).nullable(),
  bias: z.string().max(20).nullable(),
  notes: z.string().nullable(),
  trade_id: z.string().uuid().nullable(),
});

export type MarketSnapshotFormValues = z.infer<typeof marketSnapshotSchema>;
