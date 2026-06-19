import { createClient } from "@/lib/supabase/server";
import { unstable_noStore as noStore } from "next/cache";
import { Target, TrendingUp, TrendingDown, Percent } from "lucide-react";

async function getAnalytics() {
  noStore();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: trades, error } = await supabase
    .from('trades')
    .select('outcome, risk_reward_ratio, direction')
    .eq('user_id', user.id);

  if (error || !trades) return null;

  const total = trades.length;
  const wins = trades.filter(t => t.outcome === 'win').length;
  const losses = trades.filter(t => t.outcome === 'loss').length;
  const breakevens = trades.filter(t => t.outcome === 'breakeven').length;
  const winRate = total > 0 ? (wins / (wins + losses)) * 100 : 0; // Exclude breakevens from win rate

  // Calculate average Risk/Reward of winning setups
  const winningRRs = trades
    .filter(t => t.outcome === 'win' && t.risk_reward_ratio != null)
    .map(t => Number(t.risk_reward_ratio));
  
  const avgRR = winningRRs.length > 0 
    ? (winningRRs.reduce((a, b) => a + b, 0) / winningRRs.length).toFixed(2) 
    : '0.00';

  return {
    total,
    wins,
    losses,
    breakevens,
    winRate: winRate.toFixed(1),
    avgRR
  };
}

export async function MarketAnalytics() {
  const stats = await getAnalytics();

  if (!stats) return null;

  return (
    <div className="bg-bg-primary rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border bg-bg-secondary/50">
        <h3 className="font-semibold flex items-center gap-2 text-text-primary">
          <Target className="w-4 h-4 text-accent" />
          AI Extracted Trade Analytics
        </h3>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-bg-secondary p-3 rounded-lg border border-border">
            <div className="flex items-center gap-2 text-text-secondary mb-1">
              <Percent className="w-4 h-4" />
              <span className="text-xs font-medium">Win Rate</span>
            </div>
            <div className="text-2xl font-bold text-text-primary">
              {stats.winRate}%
            </div>
          </div>
          
          <div className="bg-bg-secondary p-3 rounded-lg border border-border">
            <div className="flex items-center gap-2 text-text-secondary mb-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-xs font-medium">Wins</span>
            </div>
            <div className="text-2xl font-bold text-green-500">
              {stats.wins}
            </div>
          </div>

          <div className="bg-bg-secondary p-3 rounded-lg border border-border">
            <div className="flex items-center gap-2 text-text-secondary mb-1">
              <TrendingDown className="w-4 h-4 text-red-500" />
              <span className="text-xs font-medium">Losses</span>
            </div>
            <div className="text-2xl font-bold text-red-500">
              {stats.losses}
            </div>
          </div>

          <div className="bg-bg-secondary p-3 rounded-lg border border-border">
            <div className="flex items-center gap-2 text-text-secondary mb-1">
              <Target className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-medium">Avg R:R (Wins)</span>
            </div>
            <div className="text-2xl font-bold text-text-primary">
              1:{stats.avgRR}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
