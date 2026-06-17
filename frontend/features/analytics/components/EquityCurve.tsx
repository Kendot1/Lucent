"use client";

import { Trade } from "@/lib/supabase/queries";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { TrendingUp } from "lucide-react";

interface EquityCurveProps {
  trades: Trade[];
}

export function EquityCurve({ trades }: EquityCurveProps) {
  // Sort trades oldest to newest for the chart
  const sortedTrades = [...trades].sort(
    (a, b) => new Date(a.entry_time).getTime() - new Date(b.entry_time).getTime()
  );

  let cumulativePnl = 0;
  const data = sortedTrades.map((trade, index) => {
    // If it's a win, add reward, if loss subtract risk. This is a simplified PnL logic.
    let pnl = 0;
    if (trade.outcome === "win" && trade.reward_amount) {
      pnl = trade.reward_amount;
    } else if (trade.outcome === "loss" && trade.risk_amount) {
      pnl = -trade.risk_amount;
    }
    
    cumulativePnl += pnl;

    return {
      name: `Trade ${index + 1}`,
      pnl: cumulativePnl,
      date: new Date(trade.entry_time).toLocaleDateString(),
    };
  });

  // Ensure there's a starting point at 0
  if (data.length > 0) {
    data.unshift({ name: "Start", pnl: 0, date: "" });
  }

  return (
    <div className="w-full bg-bg-secondary border border-border rounded-xl p-5 shadow-sm h-[400px] flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-4 h-4 text-accent" />
        <h3 className="font-semibold text-text-primary">Cumulative PnL (Equity Curve)</h3>
      </div>
      
      {trades.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-border rounded-lg bg-bg-primary">
          <p className="text-sm text-text-secondary font-medium">No trading data</p>
          <p className="text-xs text-text-tertiary mt-1">Log trades to generate your equity curve</p>
        </div>
      ) : (
        <div className="flex-1 min-h-0 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: 'var(--text-tertiary)' }}
                dy={10}
                minTickGap={30}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: 'var(--text-tertiary)' }}
                tickFormatter={(val) => `$${val}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--bg-elevated)', 
                  borderColor: 'var(--border)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)'
                }}
                itemStyle={{ color: 'var(--accent)' }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'PnL']}
                labelStyle={{ color: 'var(--text-secondary)', marginBottom: '4px' }}
              />
              <Area 
                type="monotone" 
                dataKey="pnl" 
                stroke="var(--accent)" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorPnl)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
