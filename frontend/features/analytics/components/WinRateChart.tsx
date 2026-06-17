"use client";

import { Trade } from "@/lib/supabase/queries";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";

interface WinRateChartProps {
  trades: Trade[];
}

export function WinRateChart({ trades }: WinRateChartProps) {
  const completedTrades = trades.filter((t) => t.outcome !== null && t.outcome !== "breakeven");
  
  const wins = completedTrades.filter((t) => t.outcome === "win").length;
  const losses = completedTrades.filter((t) => t.outcome === "loss").length;

  const data = [
    { name: "Wins", value: wins },
    { name: "Losses", value: losses },
  ];

  const COLORS = ["var(--success)", "var(--danger)"];

  return (
    <div className="w-full bg-bg-secondary border border-border rounded-xl p-5 shadow-sm h-[400px] flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <PieChartIcon className="w-4 h-4 text-accent" />
        <h3 className="font-semibold text-text-primary">Win / Loss Ratio</h3>
      </div>
      
      {wins === 0 && losses === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-border rounded-lg bg-bg-primary">
          <p className="text-sm text-text-secondary font-medium">No completed trades</p>
        </div>
      ) : (
        <div className="flex-1 min-h-0 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={110}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--bg-elevated)', 
                  borderColor: 'var(--border)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)'
                }}
                itemStyle={{ color: 'var(--text-primary)' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                wrapperStyle={{ fontSize: '12px', color: 'var(--text-secondary)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
