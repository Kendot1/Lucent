import { Globe } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { MarketTicker } from "@/features/market/components/MarketTicker";
import { SessionClock } from "@/features/market/components/SessionClock";
import { TradingViewChart } from "@/features/market/components/TradingViewChart";
import { SnapshotGallery } from "@/features/market/components/SnapshotGallery";
import { MarketAnalytics } from "@/features/market/components/MarketAnalytics";

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
          <MarketAnalytics />
        </div>
      </div>
    </div>
  );
}
