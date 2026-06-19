"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Trade } from "@/lib/supabase/queries";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { TradeForm } from "@/features/journal/components/TradeForm";
import { TradeCard } from "@/features/journal/components/TradeCard";
import { TradeDetailsModal } from "@/features/journal/components/TradeDetailsModal";
import { EmptyState } from "@/components/shared/EmptyState";
import { BookOpen } from "lucide-react";

interface JournalClientProps {
  trades: Trade[];
}

export function JournalClient({ trades }: JournalClientProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-text-primary tracking-tight">
            Trades
          </h2>
          <p className="text-sm text-text-secondary mt-1">
            {trades.length} {trades.length === 1 ? "entry" : "entries"} logged
          </p>
        </div>
        
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="w-auto px-4"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Trade
        </Button>
      </div>

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Log New Trade"
      >
        <TradeForm 
          onCancel={() => setIsFormOpen(false)} 
          onSuccess={() => setIsFormOpen(false)} 
        />
      </Modal>

      <TradeDetailsModal 
        trade={selectedTrade} 
        onClose={() => setSelectedTrade(null)} 
      />

      {trades.length === 0 ? (
        <div className="rounded-xl border border-border bg-bg-secondary mt-8">
          <EmptyState
            icon={BookOpen}
            title="Trade Journal"
            description="Log your trades, attach screenshots, tag setups, and track outcomes. Your structured journaling space will be available here."
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {trades.map((trade) => (
            <div key={trade.id} onClick={() => setSelectedTrade(trade)} className="cursor-pointer">
              <TradeCard trade={trade} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
