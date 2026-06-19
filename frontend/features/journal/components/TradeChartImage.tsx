"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { ImageIcon, ExternalLink } from "lucide-react";

interface TradeChartImageProps {
  tradeId: string;
}

export function TradeChartImage({ tradeId }: TradeChartImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchSnapshot = async () => {
      setIsLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("chart_snapshots")
        .select("image_url")
        .eq("trade_id", tradeId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!error && data?.image_url) {
        setImageUrl(data.image_url);
      }
      setIsLoading(false);
    };

    fetchSnapshot();
  }, [tradeId]);

  if (isLoading) {
    return (
      <div className="mt-6 mb-4">
        <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-2 flex items-center gap-2">
          <ImageIcon className="w-3.5 h-3.5" />
          Chart Snapshot
        </h3>
        <div className="w-full h-48 rounded-lg bg-bg-tertiary/50 border border-border/50 animate-pulse" />
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className="mt-6 mb-4">
        <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-2 flex items-center gap-2">
          <ImageIcon className="w-3.5 h-3.5" />
          Chart Snapshot
        </h3>
        <div className="w-full h-32 rounded-lg bg-bg-tertiary/30 border border-border border-dashed flex items-center justify-center">
          <p className="text-xs text-text-tertiary">No chart snapshot attached</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-6 mb-4">
        <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-2 flex items-center gap-2">
          <ImageIcon className="w-3.5 h-3.5" />
          Chart Snapshot
        </h3>
        <div 
          className="relative w-full rounded-lg overflow-hidden border border-border/50 cursor-pointer group"
          onClick={() => setIsExpanded(true)}
        >
          <img
            src={imageUrl}
            alt="Trade chart snapshot"
            className="w-full h-auto max-h-64 object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <ExternalLink className="w-3 h-3" />
              View full size
            </div>
          </div>
        </div>
      </div>

      {/* Full-size lightbox */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-8 cursor-pointer"
          onClick={() => setIsExpanded(false)}
        >
          <img
            src={imageUrl}
            alt="Trade chart snapshot (full size)"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
          <p className="absolute bottom-6 text-white/60 text-sm">Click anywhere to close</p>
        </div>
      )}
    </>
  );
}
