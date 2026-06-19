"use client";

import { useState, useTransition } from "react";
import { Trade } from "@/lib/supabase/queries";
import { updateTradeAction } from "../../../app/(dashboard)/journal/actions";
import { 
  Type, 
  Calendar, 
  CheckCircle2, 
  ArrowUpDown, 
  Hash, 
  DollarSign, 
  Activity, 
  FileText,
  Image as ImageIcon
} from "lucide-react";

interface TradePropertiesFormProps {
  trade: Trade;
}

export function TradePropertiesForm({ trade }: TradePropertiesFormProps) {
  const [isPending, startTransition] = useTransition();

  const handleUpdate = (field: string, value: any) => {
    startTransition(async () => {
      if (field === "notes") {
        // If updating notes, preserve any existing AI suggestion
        const existingNotes = trade.notes || "";
        const parts = existingNotes.split("\n\n--- AI Suggestion ---\n");
        const aiPart = parts.length > 1 ? `\n\n--- AI Suggestion ---\n${parts[1]}` : "";
        await updateTradeAction(trade.id, { notes: value + aiPart });
      } else {
        await updateTradeAction(trade.id, { [field]: value });
      }
    });
  };

  const PropertyRow = ({ icon: Icon, label, value, type, field, options }: any) => {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value);

    const onSave = () => {
      setIsEditing(false);
      if (localValue !== value) {
        handleUpdate(field, localValue);
      }
    };

    return (
      <div className="flex items-start py-2 group border-b border-border/50 hover:bg-bg-tertiary/50 transition-colors rounded-md px-2 -mx-2">
        <div className="w-1/3 flex items-center text-text-secondary gap-2 pt-1 flex-shrink-0">
          <Icon className="w-4 h-4" />
          <span className="text-sm">{label}</span>
        </div>
        <div className="w-2/3 min-h-[32px] flex items-center">
          {isEditing ? (
            type === "select" ? (
              <select
                autoFocus
                className="w-full text-sm bg-bg-primary border border-accent/50 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-accent"
                value={localValue || ""}
                onChange={(e) => setLocalValue(e.target.value)}
                onBlur={onSave}
                onKeyDown={(e) => e.key === "Enter" && onSave()}
              >
                <option value="">-- Select --</option>
                {options.map((opt: any) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : type === "textarea" ? (
              <textarea
                autoFocus
                className="w-full text-sm bg-bg-primary border border-accent/50 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-accent min-h-[80px]"
                value={localValue || ""}
                onChange={(e) => setLocalValue(e.target.value)}
                onBlur={onSave}
              />
            ) : (
              <input
                autoFocus
                type={type}
                className="w-full text-sm bg-bg-primary border border-accent/50 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-accent"
                value={localValue || ""}
                onChange={(e) => setLocalValue(e.target.type === "number" ? Number(e.target.value) : e.target.value)}
                onBlur={onSave}
                onKeyDown={(e) => e.key === "Enter" && onSave()}
              />
            )
          ) : (
            <div 
              className="text-sm text-text-primary w-full cursor-pointer hover:bg-bg-tertiary p-1 rounded min-h-[28px] break-words flex items-center"
              onClick={() => setIsEditing(true)}
            >
              {type === "select" && options 
                ? options.find((o: any) => o.value === value)?.label || "Empty" 
                : (value !== null && value !== "" ? value : <span className="text-text-tertiary">Empty</span>)
              }
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-1 mt-2">
      <PropertyRow 
        icon={Type} 
        label="Pairs" 
        field="instrument" 
        value={trade.instrument} 
        type="text" 
      />
      <PropertyRow 
        icon={Calendar} 
        label="Date" 
        field="entry_time" 
        value={new Date(trade.entry_time).toLocaleString()} 
        type="text" 
        // Read-only logic could be added here, but keeping simple for now
      />
      <PropertyRow 
        icon={CheckCircle2} 
        label="Outcome" 
        field="outcome" 
        value={trade.outcome} 
        type="select"
        options={[
          { value: "win", label: "Win" },
          { value: "loss", label: "Loss" },
          { value: "breakeven", label: "Break Even" }
        ]}
      />
      <PropertyRow 
        icon={ArrowUpDown} 
        label="Position" 
        field="direction" 
        value={trade.direction} 
        type="select"
        options={[
          { value: "long", label: "Long" },
          { value: "short", label: "Short" }
        ]}
      />
      <PropertyRow 
        icon={Hash} 
        label="RRR" 
        field="risk_reward_ratio" 
        value={trade.risk_reward_ratio} 
        type="number" 
      />
      <PropertyRow 
        icon={DollarSign} 
        label="Risk Amount" 
        field="risk_amount" 
        value={trade.risk_amount} 
        type="number" 
      />
      <PropertyRow 
        icon={DollarSign} 
        label="Reward Amount" 
        field="reward_amount" 
        value={trade.reward_amount} 
        type="number" 
      />
      <PropertyRow 
        icon={Activity} 
        label="Status" 
        field="status" 
        value={trade.status} 
        type="select"
        options={[
          { value: "open", label: "Open" },
          { value: "closed", label: "Closed" },
          { value: "cancelled", label: "Cancelled" }
        ]}
      />
    </div>
  );
}
