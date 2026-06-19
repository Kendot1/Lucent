"use client";

import { useState, useMemo } from "react";
import { Trade } from "@/lib/supabase/queries";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface TradingCalendarProps {
  trades: Trade[];
}

interface DayData {
  date: string;
  netPnl: number;
  tradeCount: number;
  wins: number;
  losses: number;
}

export function TradingCalendar({ trades }: TradingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Navigation
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToToday = () => setCurrentDate(new Date());

  // Aggregate trade data by date
  const aggregatedData = useMemo(() => {
    const data: Record<string, DayData> = {};

    trades.forEach((trade) => {
      // Create a local date string YYYY-MM-DD
      const dateObj = new Date(trade.entry_time);
      const dateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`;

      if (!data[dateStr]) {
        data[dateStr] = { date: dateStr, netPnl: 0, tradeCount: 0, wins: 0, losses: 0 };
      }

      data[dateStr].tradeCount += 1;

      if (trade.outcome === "win") {
        data[dateStr].wins += 1;
        data[dateStr].netPnl += trade.reward_amount || 0;
      } else if (trade.outcome === "loss") {
        data[dateStr].losses += 1;
        data[dateStr].netPnl -= trade.risk_amount || 0;
      }
    });

    return data;
  }, [trades]);

  // Calendar generation
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday

  // Padding days for grid
  const prefixDays = Array.from({ length: firstDayOfMonth }).map((_, i) => null);
  const monthDays = Array.from({ length: daysInMonth }).map((_, i) => i + 1);
  
  // To ensure the grid always has complete rows (usually 5 or 6 rows = 35 or 42 cells total)
  const totalCells = prefixDays.length + monthDays.length;
  const suffixCells = Math.ceil(totalCells / 7) * 7 - totalCells;
  const suffixDays = Array.from({ length: suffixCells }).map((_, i) => null);

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Calculate monthly stats
  const currentMonthPrefix = `${year}-${String(month + 1).padStart(2, "0")}`;
  const monthlyStats = useMemo(() => {
    let totalPnl = 0;
    let totalTrades = 0;
    Object.values(aggregatedData).forEach(day => {
      if (day.date.startsWith(currentMonthPrefix)) {
        totalPnl += day.netPnl;
        totalTrades += day.tradeCount;
      }
    });
    return { totalPnl, totalTrades };
  }, [aggregatedData, currentMonthPrefix]);

  return (
    <div className="rounded-xl border border-border bg-bg-secondary p-6 overflow-hidden relative">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-accent" />
            Trading Calendar
          </h2>
          <div className="text-sm text-text-secondary mt-1 flex gap-4">
            <span>{monthlyStats.totalTrades} Trades this month</span>
            <span className={`font-medium ${monthlyStats.totalPnl > 0 ? 'text-green-500' : monthlyStats.totalPnl < 0 ? 'text-red-500' : 'text-text-secondary'}`}>
              Net P&L: {monthlyStats.totalPnl > 0 ? '+' : ''}${monthlyStats.totalPnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={goToToday} className="mr-2">
            Today
          </Button>
          <div className="flex items-center bg-bg-primary rounded-lg border border-border">
            <button 
              onClick={prevMonth}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-l-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="px-4 text-sm font-semibold text-text-primary min-w-[120px] text-center">
              {monthName} {year}
            </div>
            <button 
              onClick={nextMonth}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-r-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="relative z-10">
        {/* Day headers */}
        <div className="grid grid-cols-7 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-xs font-semibold text-text-secondary uppercase tracking-wider py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {prefixDays.map((_, i) => (
            <div key={`prefix-${i}`} className="aspect-square rounded-lg bg-bg-primary/20 border border-border/20" />
          ))}
          
          {monthDays.map((day) => {
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const dayData = aggregatedData[dateStr];
            
            // Determine styles based on P&L
            let bgClass = "bg-bg-primary hover:bg-bg-tertiary border-border";
            let textClass = "text-text-primary";
            
            if (dayData) {
              if (dayData.netPnl > 0) {
                bgClass = "bg-green-500/10 hover:bg-green-500/20 border-green-500/30";
                textClass = "text-green-500 font-medium";
              } else if (dayData.netPnl < 0) {
                bgClass = "bg-red-500/10 hover:bg-red-500/20 border-red-500/30";
                textClass = "text-red-500 font-medium";
              } else {
                bgClass = "bg-yellow-500/10 hover:bg-yellow-500/20 border-yellow-500/30";
                textClass = "text-yellow-500 font-medium";
              }
            }
            
            // Is today?
            const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

            return (
              <div 
                key={day} 
                className={`relative aspect-square sm:aspect-[4/3] rounded-lg border p-1 sm:p-2 transition-colors flex flex-col justify-between group ${bgClass}`}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-xs sm:text-sm ${isToday ? 'bg-accent text-accent-text w-6 h-6 flex items-center justify-center rounded-full -mt-1 -ml-1' : 'text-text-secondary'}`}>
                    {day}
                  </span>
                  {dayData && (
                    <span className="text-[10px] sm:text-xs text-text-tertiary hidden sm:block">
                      {dayData.tradeCount} trade{dayData.tradeCount !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                
                {dayData && (
                  <div className={`text-right text-xs sm:text-sm truncate ${textClass}`}>
                    {dayData.netPnl > 0 ? '+' : ''}${Math.abs(dayData.netPnl).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                  </div>
                )}

                {/* Tooltip on hover for mobile/desktop */}
                {dayData && (
                  <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 p-2 bg-bg-tertiary border border-border shadow-xl rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex flex-col gap-1 hidden group-hover:flex">
                    <p className="text-xs font-semibold text-text-primary text-center pb-1 border-b border-border/50">
                      {new Date(year, month, day).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <div className="flex justify-between text-xs">
                      <span className="text-text-secondary">Trades</span>
                      <span className="text-text-primary font-medium">{dayData.tradeCount}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-text-secondary">W / L</span>
                      <span className="text-text-primary font-medium">{dayData.wins} / {dayData.losses}</span>
                    </div>
                    <div className="flex justify-between text-xs pt-1 border-t border-border/50">
                      <span className="text-text-secondary">Net P&L</span>
                      <span className={dayData.netPnl > 0 ? 'text-green-500 font-semibold' : dayData.netPnl < 0 ? 'text-red-500 font-semibold' : 'text-text-primary font-semibold'}>
                        {dayData.netPnl > 0 ? '+' : ''}${dayData.netPnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {suffixDays.map((_, i) => (
            <div key={`suffix-${i}`} className="aspect-square sm:aspect-[4/3] rounded-lg bg-bg-primary/20 border border-border/20" />
          ))}
        </div>
      </div>
    </div>
  );
}
