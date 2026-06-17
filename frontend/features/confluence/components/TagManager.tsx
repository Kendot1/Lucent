"use client";

import { ConfluenceTag } from "@/lib/supabase/queries";
import { Badge } from "@/components/ui/Badge";
import { Plus, Tag as TagIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface TagManagerProps {
  tags: ConfluenceTag[];
}

export function TagManager({ tags }: TagManagerProps) {
  // Group tags by category
  const groupedTags = tags.reduce((acc, tag) => {
    if (!acc[tag.category]) {
      acc[tag.category] = [];
    }
    acc[tag.category].push(tag);
    return acc;
  }, {} as Record<string, ConfluenceTag[]>);

  const formatCategory = (cat: string) => {
    return cat.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };

  return (
    <div className="w-full bg-bg-secondary border border-border rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-text-primary flex items-center gap-2">
            <TagIcon className="w-4 h-4 text-accent" />
            Setup Tags
          </h3>
          <p className="text-sm text-text-secondary mt-1">
            Manage the confluences you track for your setups.
          </p>
        </div>
        <Button variant="outline" size="sm" className="h-8 text-xs">
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          New Tag
        </Button>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedTags).map(([category, categoryTags]) => (
          <div key={category}>
            <h4 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">
              {formatCategory(category)}
            </h4>
            <div className="flex flex-wrap gap-2">
              {categoryTags.map((tag) => (
                <div 
                  key={tag.id}
                  className="flex items-center gap-2 bg-bg-primary border border-border/50 rounded-lg px-3 py-2 text-sm hover:border-border-hover transition-colors cursor-pointer group"
                >
                  <div 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: tag.color || "var(--accent)" }}
                  />
                  <span className="font-medium text-text-primary">{tag.name}</span>
                  {tag.description && (
                    <span className="text-text-tertiary text-xs hidden sm:inline-block ml-1">
                      — {tag.description}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {tags.length === 0 && (
          <div className="text-center py-8 text-text-tertiary text-sm">
            No tags found. Create some tags to start tracking your confluences!
          </div>
        )}
      </div>
    </div>
  );
}
