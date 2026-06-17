"use client";

import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function TradingPreferences() {
  return (
    <div className="w-full bg-bg-secondary border border-border rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Settings2 className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-semibold text-text-primary">Trading Preferences</h3>
      </div>

      <form className="space-y-6 max-w-md" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Default Instrument</label>
          <input 
            type="text" 
            placeholder="e.g. NQ, EURUSD" 
            className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors uppercase" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Standard Risk per Trade ($)</label>
          <input 
            type="number" 
            placeholder="500" 
            className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Base Currency</label>
          <select className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors">
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>

        <Button type="submit" size="sm">
          Save Preferences
        </Button>
      </form>
    </div>
  );
}
