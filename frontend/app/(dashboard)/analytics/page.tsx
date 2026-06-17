import { getTrades } from "@/lib/supabase/queries";
import { BarChart2 } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { EquityCurve } from "@/features/analytics/components/EquityCurve";
import { WinRateChart } from "@/features/analytics/components/WinRateChart";

export default async function AnalyticsPage() {
  const trades = await getTrades();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {trades.length === 0 ? (
        <div className="rounded-xl border border-border bg-bg-secondary">
          <EmptyState
            icon={BarChart2}
            title="Analytics Engine"
            description="Visualize your equity curve, win rate distributions, and session performance. Data will appear once you log your first trades."
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <EquityCurve trades={trades} />
          </div>
          <div className="lg:col-span-1">
            <WinRateChart trades={trades} />
          </div>
        </div>
      )}
    </div>
  );
}
