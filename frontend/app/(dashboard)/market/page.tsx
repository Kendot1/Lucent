import { Globe } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { MarketTicker } from "@/features/market/components/MarketTicker";
import { SessionClock } from "@/features/market/components/SessionClock";
import { TradingViewChart } from "@/features/market/components/TradingViewChart";
import { SnapshotGallery } from "@/features/market/components/SnapshotGallery";

export default function MarketPage() {
  return (
    <div className="w-full max-w-[1800px] mx-auto space-y-6">
      <MarketTicker />
      
      {/* Interactive Chart */}
      <TradingViewChart />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SessionClock />
          <SnapshotGallery />
        </div>
        
        <div className="lg:col-span-1">
          {/* Future: Snapshot Form or Current Session Stats */}
          <div className="rounded-xl border border-border bg-bg-secondary p-5 min-h-[400px]">
            <h3 className="font-semibold text-text-primary mb-4">Record Context</h3>
            <p className="text-sm text-text-secondary">Snapshot form coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
