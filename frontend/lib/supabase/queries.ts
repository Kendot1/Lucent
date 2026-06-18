import { createClient } from "./client";
import { Database } from "@/types/database";

export type Trade = Database["public"]["Tables"]["trades"]["Row"];
export type ConfluenceTag = Database["public"]["Tables"]["confluence_tags"]["Row"];
export type MarketSnapshot = Database["public"]["Tables"]["market_snapshots"]["Row"];
export type TradeScreenshot = Database["public"]["Tables"]["trade_screenshots"]["Row"];
export type ChartSnapshot = Database["public"]["Tables"]["chart_snapshots"]["Row"];

export async function getTrades() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("trades")
    .select("*")
    .order("entry_time", { ascending: false });

  if (error) throw error;
  return data as Trade[];
}

export async function getTrade(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("trades")
    .select(`
      *,
      trade_screenshots (*),
      trade_confluences (
        *,
        confluence_tags (*)
      ),
      market_snapshots (*)
    `)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function getConfluenceTags() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("confluence_tags")
    .select("*")
    .order("category", { ascending: true })
    .order("name", { ascending: true });

  if (error) throw error;
  return data as ConfluenceTag[];
}

export async function getMarketSnapshots() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("market_snapshots")
    .select("*")
    .order("snapshot_time", { ascending: false });

  if (error) throw error;
  return data as MarketSnapshot[];
}

export async function getChartSnapshots() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("chart_snapshots")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as ChartSnapshot[];
}

export async function getDashboardStats() {
  const supabase = createClient();
  // Fetch only what we need for stats
  const { data, error } = await supabase
    .from("trades")
    .select("outcome, risk_reward_ratio, reward_amount, risk_amount");

  if (error) throw error;

  const totalTrades = data.length;
  const wins = data.filter((t) => t.outcome === "win").length;
  const losses = data.filter((t) => t.outcome === "loss").length;
  
  const winRate = totalTrades > 0 ? (wins / (wins + losses)) * 100 : 0;
  
  const totalReward = data.reduce((sum, t) => sum + (t.reward_amount || 0), 0);
  const totalRisk = data.reduce((sum, t) => sum + (t.risk_amount || 0), 0);
  const profitFactor = totalRisk > 0 ? totalReward / totalRisk : 0;

  const validRR = data.filter((t) => t.risk_reward_ratio !== null);
  const avgRR = validRR.length > 0 
    ? validRR.reduce((sum, t) => sum + (t.risk_reward_ratio || 0), 0) / validRR.length 
    : 0;

  return {
    totalTrades,
    winRate,
    profitFactor,
    avgRR,
  };
}
