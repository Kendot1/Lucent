import { Trade } from "@/lib/supabase/queries";
import { Badge } from "@/components/ui/Badge";
import { Clock, ExternalLink } from "lucide-react";

interface TradeCardProps {
  trade: Trade;
  onClick: () => void;
}

export function TradeCard({ trade, onClick }: TradeCardProps) {
  // Helpers
  const isWin = trade.outcome === "win";
  const isLoss = trade.outcome === "loss";
  const isBreakeven = trade.outcome === "breakeven";
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div 
      onClick={onClick}
      className="group relative flex flex-col gap-3 rounded-xl border border-border bg-bg-secondary p-4 transition-all hover:border-border-hover hover:shadow-md cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Badge variant={trade.direction === "long" ? "success" : "danger"}>
            {trade.direction.toUpperCase()}
          </Badge>
          <span className="font-semibold text-text-primary tracking-wide">
            {trade.instrument}
          </span>
        </div>
        
        {trade.outcome && (
          <Badge 
            variant={isWin ? "success" : isLoss ? "danger" : "default"}
          >
            {trade.outcome.toUpperCase()}
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-6 text-sm">
        <div>
          <span className="text-text-tertiary block text-xs mb-0.5">Entry</span>
          <span className="text-text-primary font-mono">{trade.entry_price}</span>
        </div>
        {(trade.exit_price || trade.take_profit) && (
          <div>
            <span className="text-text-tertiary block text-xs mb-0.5">
              {trade.exit_price ? "Exit" : "Target"}
            </span>
            <span className="text-text-primary font-mono">
              {trade.exit_price || trade.take_profit}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-border border-dashed">
        <div className="flex items-center gap-1.5 text-xs text-text-tertiary">
          <Clock className="w-3.5 h-3.5" />
          <span>{formatDate(trade.entry_time)}</span>
        </div>
        <div className="flex items-center text-xs text-text-secondary group-hover:text-accent transition-colors">
          <span>View Details</span>
          <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </div>
  );
}
