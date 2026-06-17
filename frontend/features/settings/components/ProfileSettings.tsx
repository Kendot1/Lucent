"use client";

import { User } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ProfileSettings() {
  return (
    <div className="w-full bg-bg-secondary border border-border rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <User className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-semibold text-text-primary">Profile</h3>
      </div>

      <form className="space-y-4 max-w-md" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Email Address</label>
          <input 
            type="email" 
            disabled 
            value="user@example.com" 
            className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2 text-sm text-text-tertiary cursor-not-allowed" 
          />
          <p className="text-xs text-text-tertiary mt-1">Managed via Supabase Auth</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Display Name</label>
          <input 
            type="text" 
            placeholder="Trader Name" 
            className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors" 
          />
        </div>

        <Button type="submit" size="sm" className="mt-2">
          Save Changes
        </Button>
      </form>
    </div>
  );
}
