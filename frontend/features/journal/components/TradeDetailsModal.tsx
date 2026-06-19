"use client";

import { Modal } from "@/components/ui/Modal";
import { Trade } from "@/lib/supabase/queries";
import { TradePropertiesForm } from "./TradePropertiesForm";
import { TradeAIAssistant } from "./TradeAIAssistant";
import { JournalEntryEditor } from "./JournalEntryEditor";
import { TradeChartImage } from "./TradeChartImage";

interface TradeDetailsModalProps {
  trade: Trade | null;
  onClose: () => void;
}

export function TradeDetailsModal({ trade, onClose }: TradeDetailsModalProps) {
  if (!trade) return null;

  return (
    <Modal
      isOpen={!!trade}
      onClose={onClose}
      title={`${trade.instrument} Details`}
      className="max-w-5xl w-[90vw]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[calc(100vh-12rem)] md:h-[600px]">
        <div className="overflow-y-auto pr-4 border-r border-border/50">
          <TradePropertiesForm trade={trade} />
          <TradeChartImage tradeId={trade.id} />
          <JournalEntryEditor trade={trade} />
        </div>
        <div className="overflow-y-auto pl-2 h-full">
          <TradeAIAssistant trade={trade} />
        </div>
      </div>
    </Modal>
  );
}
