"use client";

import { useState, useTransition, useEffect } from "react";
import { Trade } from "@/lib/supabase/queries";
import { updateTradeAction } from "../../../app/(dashboard)/journal/actions";

interface JournalEntryEditorProps {
  trade: Trade;
}

export function JournalEntryEditor({ trade }: JournalEntryEditorProps) {
  const [isPending, startTransition] = useTransition();
  const rawNotes = trade.notes || "";
  const parts = rawNotes.split("\n\n--- AI Suggestion ---\n");
  const baseNotes = parts[0] || "";
  const aiPart = parts.length > 1 ? `\n\n--- AI Suggestion ---\n${parts[1]}` : "";

  const [localValue, setLocalValue] = useState(baseNotes);

  useEffect(() => {
    setLocalValue(baseNotes);
  }, [baseNotes]);

  const handleBlur = () => {
    if (localValue !== baseNotes) {
      startTransition(async () => {
        await updateTradeAction(trade.id, { notes: localValue + aiPart });
      });
    }
  };

  return (
    <div className="mt-8 mb-4">
      <h3 className="text-lg font-bold text-text-primary mb-3">Journal & Reflections</h3>
      <textarea
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        placeholder="Write your thoughts, technical analysis, and emotional state regarding this trade..."
        className="w-full h-64 bg-bg-primary/50 border border-border/50 hover:border-accent/50 focus:border-accent rounded-lg p-4 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent resize-y leading-relaxed transition-colors placeholder:text-text-tertiary"
      />
      {isPending && (
        <p className="text-xs text-text-tertiary mt-2 animate-pulse">Saving changes...</p>
      )}
    </div>
  );
}
