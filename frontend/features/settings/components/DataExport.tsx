"use client";

import { Download, Database } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function DataExport() {
  const handleExport = () => {
    // Simulated export logic
    alert("Data export functionality will generate a CSV of your trades and snapshots.");
  };

  return (
    <div className="w-full bg-bg-secondary border border-border rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Database className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-semibold text-text-primary">Data Export</h3>
      </div>

      <div className="space-y-4 max-w-md">
        <p className="text-sm text-text-secondary">
          Download a complete CSV export of your trading journal, including all trades, confluence tags, and market snapshots.
        </p>

        <Button onClick={handleExport} variant="outline" className="w-full flex items-center justify-center gap-2">
          <Download className="w-4 h-4" />
          Export to CSV
        </Button>
      </div>
    </div>
  );
}
