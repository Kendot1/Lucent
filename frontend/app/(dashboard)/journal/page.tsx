import { getTrades } from "@/lib/supabase/queries";

import { JournalClient } from "./JournalClient";

export default async function JournalPage() {
  const trades = await getTrades();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header section with title and New Trade button handled by Client Component */}
      <JournalClient trades={trades} />

      {/* Trades grid and empty state are now managed entirely by JournalClient */}
    </div>
  );
}
