"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Trade } from "@/lib/supabase/queries";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { TradeForm } from "@/features/journal/components/TradeForm";

interface JournalClientProps {
  trades: Trade[];
}

export function JournalClient({ trades }: JournalClientProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

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
    </>
  );
}
