import { getTrades } from "@/lib/supabase/queries";
import { BookOpen, Plus } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { TradeCard } from "@/features/journal/components/TradeCard";
import { JournalClient } from "./JournalClient";

export default async function JournalPage() {
  const trades = await getTrades();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header section with title and New Trade button handled by Client Component */}
      <JournalClient trades={trades} />

      {trades.length === 0 ? (
        <div className="rounded-xl border border-border bg-bg-secondary mt-8">
          <EmptyState
            icon={BookOpen}
            title="Trade Journal"
            description="Log your trades, attach screenshots, tag setups, and track outcomes. Your structured journaling space will be available here."
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trades.map((trade) => (
            <TradeCard key={trade.id} trade={trade} onClick={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
}
