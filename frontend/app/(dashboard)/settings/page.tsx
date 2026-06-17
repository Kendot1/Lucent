import { ProfileSettings } from "@/features/settings/components/ProfileSettings";
import { TradingPreferences } from "@/features/settings/components/TradingPreferences";
import { DataExport } from "@/features/settings/components/DataExport";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary">Settings</h2>
        <p className="text-sm text-text-secondary mt-1">
          Manage your account, preferences, and data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ProfileSettings />
          <DataExport />
        </div>
        <div className="space-y-6">
          <TradingPreferences />
        </div>
      </div>
    </div>
  );
}
