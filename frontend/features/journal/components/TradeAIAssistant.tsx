"use client";

import { useState, useTransition } from "react";
import { Trade } from "@/lib/supabase/queries";
import { updateTradeAction } from "../../../app/(dashboard)/journal/actions";
import { Sparkles, BrainCircuit, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface TradeAIAssistantProps {
  trade: Trade;
}

export function TradeAIAssistant({ trade }: TradeAIAssistantProps) {
  const [isPending, startTransition] = useTransition();
  const [isGenerating, setIsGenerating] = useState(false);

  // Parse notes to separate base notes from AI suggestion
  const rawNotes = trade.notes || "";
  const parts = rawNotes.split("\n\n--- AI Suggestion ---\n");
  const baseNotes = parts[0] || "No journal notes provided.";
  const existingSuggestion = parts.length > 1 ? parts[1] : null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/suggest-trade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trade),
      });

      if (!response.ok) {
        throw new Error('Failed to generate suggestion');
      }

      const { suggestion } = await response.json();

      // Append suggestion to notes and save to DB
      const newNotes = `${baseNotes}\n\n--- AI Suggestion ---\n${suggestion}`;
      
      startTransition(async () => {
        await updateTradeAction(trade.id, { notes: newNotes });
        setIsGenerating(false);
      });
    } catch (error) {
      console.error(error);
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-bg-secondary/30 rounded-xl p-4 border border-accent/20 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-accent/10 blur-3xl" />
      
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-accent/10 rounded-lg">
          <BrainCircuit className="w-5 h-5 text-accent-text" />
        </div>
        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
          AI Trade Intelligence
        </h3>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto pr-1">
        
        {/* AI Suggestion Area */}
        <div>
          <h4 className="text-xs font-medium text-accent-text mb-2 uppercase tracking-wide flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Coaching Suggestion
          </h4>
          
          {existingSuggestion && !isGenerating ? (
            <div className="text-sm text-text-primary whitespace-pre-wrap bg-accent/5 p-4 rounded-lg border border-accent/20 leading-relaxed relative">
              {existingSuggestion}
              <button 
                onClick={handleGenerate}
                disabled={isPending}
                className="absolute top-2 right-2 p-1.5 text-text-tertiary hover:text-accent-text transition-colors bg-bg-primary rounded-md shadow-sm border border-border disabled:opacity-50"
                title="Regenerate Suggestion"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>
          ) : isGenerating ? (
            <div className="text-sm text-text-secondary whitespace-pre-wrap bg-accent/5 p-4 rounded-lg border border-accent/20 animate-pulse flex items-center gap-3">
              <RefreshCw className="w-4 h-4 animate-spin text-accent-text" />
              Generating deep analysis...
            </div>
          ) : (
            <div className="text-sm text-text-secondary bg-bg-primary/30 p-4 rounded-lg border border-border border-dashed text-center">
              <p className="mb-3">No coaching suggestion generated yet.</p>
              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating || isPending}
                className="w-full text-xs py-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 mr-2" />
                Analyze Trade
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
