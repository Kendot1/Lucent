"use client";

import { useEffect, useState } from "react";
import { Trash2, ExternalLink, Calendar, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ChartSnapshot } from "@/lib/supabase/queries";
import { EmptyState } from "@/components/shared/EmptyState";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";

export function SnapshotGallery() {
  const [snapshots, setSnapshots] = useState<ChartSnapshot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadSnapshots() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("chart_snapshots")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (!error && data) {
        setSnapshots(data as ChartSnapshot[]);
      }
      setIsLoading(false);
    }
    loadSnapshots();
  }, []);

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this snapshot?")) return;
    
    try {
      const supabase = createClient();
      
      // Delete from DB
      await supabase.from("chart_snapshots").delete().eq("id", id);
      
      // Try to delete from storage
      try {
        const urlObj = new URL(imageUrl);
        const pathParts = urlObj.pathname.split('/chart_snapshots/');
        if (pathParts.length > 1) {
          const filePath = pathParts[1];
          await supabase.storage.from('chart_snapshots').remove([filePath]);
        }
      } catch (e) {
        console.error("Could not parse or delete image from storage:", e);
      }

      setSnapshots(prev => prev.filter(s => s.id !== id));
      router.refresh();
    } catch (error) {
      console.error("Error deleting snapshot:", error);
      alert("Failed to delete snapshot.");
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-xl border border-border bg-bg-secondary p-8 flex items-center justify-center min-h-[300px]">
        <div className="w-8 h-8 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (snapshots.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-bg-secondary">
        <EmptyState
          icon={Camera}
          title="No Snapshots Yet"
          description="Take a screenshot of your chart using the camera icon on TradingView, then click 'Save Chart Snapshot' below the chart to save your analysis here."
        />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-bg-secondary p-5 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-text-primary flex items-center gap-2">
          <Camera className="w-5 h-5 text-accent" />
          Saved Chart Analysis
        </h3>
        <span className="text-sm text-text-secondary bg-bg-primary px-3 py-1 rounded-full border border-border">
          {snapshots.length} saved
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {snapshots.map((snapshot) => {
          const date = new Date(snapshot.created_at);
          return (
            <div key={snapshot.id} className="group relative rounded-lg border border-border bg-bg-primary overflow-hidden transition-all hover:border-accent/40">
              {/* Image */}
              <div className="aspect-video w-full bg-black relative">
                <img 
                  src={snapshot.image_url} 
                  alt={`${snapshot.symbol} analysis`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                  <a 
                    href={snapshot.image_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"
                    title="Open full size"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <button 
                    onClick={() => handleDelete(snapshot.id, snapshot.image_url)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-full text-red-100 backdrop-blur-md transition-colors"
                    title="Delete snapshot"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Meta */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-text-primary">{snapshot.symbol}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-accent/10 text-accent font-medium border border-accent/20">
                      {snapshot.timeframe}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {date.toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                {snapshot.notes && (
                  <p className="text-sm text-text-secondary line-clamp-2" title={snapshot.notes}>
                    {snapshot.notes}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
