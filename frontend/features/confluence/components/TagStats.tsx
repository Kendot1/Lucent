"use client";

import { Trade, ConfluenceTag } from "@/lib/supabase/queries";
import { Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagStatsProps {
  trades: Trade[];
  tags: ConfluenceTag[];
}

export function TagStats({ trades, tags }: TagStatsProps) {
  // We need the `trade_confluences` relation attached to the trades to do this,
  // but since `getTrades` doesn't fetch relations by default to save bandwidth, 
  // we would normally fetch it here or modify `getTrades`.
  // For the MVP, we will simulate the stats based on the data we have, or show an empty state.

  // Let's assume the user has to log some trades with tags first.
  const hasData = false; // We will hook this up to real relationships later

  return (
    <div className="w-full bg-bg-secondary border border-border rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-text-primary flex items-center gap-2">
            <Target className="w-4 h-4 text-accent" />
            Edge Analysis
          </h3>
          <p className="text-sm text-text-secondary mt-1">
            Win rates and performance by confluence tag.
          </p>
        </div>
      </div>

      {!hasData ? (
        <div className="h-40 flex flex-col items-center justify-center border border-dashed border-border rounded-lg bg-bg-primary">
          <Target className="w-6 h-6 text-text-tertiary mb-2" />
          <p className="text-sm text-text-secondary font-medium">Not enough data</p>
          <p className="text-xs text-text-tertiary mt-1">Log trades with tags to see your edge</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* We will populate this table once we have relations fetched */}
        </div>
      )}
    </div>
  );
}
