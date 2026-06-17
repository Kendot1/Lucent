"use client";

import { useState, useTransition } from "react";
import { createTradeAction } from "../../../app/(dashboard)/journal/actions";
import { Button } from "@/components/ui/Button";

interface TradeFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function TradeForm({ onSuccess, onCancel }: TradeFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await createTradeAction(formData);
      if (result.error) {
        setError(result.error);
        console.error(result.details);
      } else {
        onSuccess();
      }
    });
  };

  // Helper styles
  const inputClass = "w-full rounded-lg border border-border bg-bg-primary px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors";
  const labelClass = "block text-xs font-medium text-text-secondary mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 text-sm text-danger bg-danger-muted border border-danger/20 rounded-lg">
          {error}
        </div>
      )}

      {/* Row 1: Core */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="instrument">Instrument *</label>
          <input required type="text" id="instrument" name="instrument" placeholder="e.g. EURUSD, NQ, BTC" className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="direction">Direction *</label>
          <select required id="direction" name="direction" className={inputClass}>
            <option value="long">Long</option>
            <option value="short">Short</option>
          </select>
        </div>
      </div>

      {/* Row 2: Prices */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className={labelClass} htmlFor="entry_price">Entry Price *</label>
          <input required type="number" step="any" id="entry_price" name="entry_price" className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="stop_loss">Stop Loss</label>
          <input type="number" step="any" id="stop_loss" name="stop_loss" className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="take_profit">Take Profit</label>
          <input type="number" step="any" id="take_profit" name="take_profit" className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="exit_price">Exit Price</label>
          <input type="number" step="any" id="exit_price" name="exit_price" className={inputClass} />
        </div>
      </div>

      {/* Row 3: Context & Timing */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="entry_time">Entry Time *</label>
          {/* Default to current time, formatted for datetime-local */}
          <input required type="datetime-local" id="entry_time" name="entry_time" defaultValue={new Date().toISOString().slice(0, 16)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="exit_time">Exit Time</label>
          <input type="datetime-local" id="exit_time" name="exit_time" className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="session">Session</label>
          <select id="session" name="session" className={inputClass}>
            <option value="">-- Select --</option>
            <option value="asia">Asia</option>
            <option value="london">London</option>
            <option value="new_york">New York</option>
            <option value="overlap_london_ny">London/NY Overlap</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="outcome">Outcome</label>
          <select id="outcome" name="outcome" className={inputClass}>
            <option value="">-- Pending --</option>
            <option value="win">Win</option>
            <option value="loss">Loss</option>
            <option value="breakeven">Break Even</option>
          </select>
        </div>
      </div>

      {/* Row 4: Notes */}
      <div>
        <label className={labelClass} htmlFor="notes">Journal Notes</label>
        <textarea id="notes" name="notes" rows={4} placeholder="What was your thesis? How did you manage the trade?" className={inputClass} />
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border mt-6">
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <Button type="submit" isLoading={isPending} className="w-auto px-6">
          Save Trade
        </Button>
      </div>
    </form>
  );
}
