import { getConfluenceTags, getTrades } from "@/lib/supabase/queries";
import { TagManager } from "@/features/confluence/components/TagManager";
import { TagStats } from "@/features/confluence/components/TagStats";

export default async function ConfluencePage() {
  const tags = await getConfluenceTags();
  const trades = await getTrades();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Edge Analysis Stats */}
          <TagStats trades={trades} tags={tags} />
        </div>
        <div className="space-y-6">
          {/* Tag Manager */}
          <TagManager tags={tags} />
        </div>
      </div>
    </div>
  );
}
