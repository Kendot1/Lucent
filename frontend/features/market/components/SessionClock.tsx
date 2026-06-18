"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

// Sessions in UTC
const SESSIONS = [
  { name: "Asia", start: 0, end: 9, color: "bg-blue-500/20 text-blue-400 border-blue-500/30" }, // Midnight to 9 AM UTC
  { name: "London", start: 7, end: 16, color: "bg-orange-500/20 text-orange-400 border-orange-500/30" }, // 7 AM to 4 PM UTC
  { name: "New York", start: 13, end: 22, color: "bg-green-500/20 text-green-400 border-green-500/30" }, // 1 PM to 10 PM UTC
];

export function SessionClock() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentHourUTC = time.getUTCHours() + time.getUTCMinutes() / 60;

  return (
    <div className="w-full bg-bg-secondary border border-border rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-accent" />
          <h3 className="font-semibold text-text-primary">Market Sessions</h3>
        </div>
        <div className="text-sm font-mono text-text-secondary bg-bg-tertiary px-3 py-1 rounded-md min-w-[120px] text-center">
          {mounted ? time.toLocaleTimeString('en-US', { timeZoneName: 'short' }) : "Loading..."}
        </div>
      </div>

      <div className="relative h-16 w-full rounded-lg bg-bg-tertiary border border-border overflow-hidden">
        {/* Timeline indicators (0 to 24h) */}
        <div className="absolute inset-0 flex justify-between px-2 py-1 opacity-20 pointer-events-none">
          {[0, 6, 12, 18, 24].map((h) => (
            <div key={h} className="flex flex-col items-center">
              <div className="h-full w-px bg-text-primary absolute top-0" />
            </div>
          ))}
        </div>

        {/* Sessions */}
        {SESSIONS.map((session) => {
          const leftPercent = (session.start / 24) * 100;
          const widthPercent = ((session.end - session.start) / 24) * 100;
          const isActive = currentHourUTC >= session.start && currentHourUTC < session.end;

          return (
            <div
              key={session.name}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 h-10 rounded-md border flex items-center justify-center text-xs font-semibold backdrop-blur-sm transition-all",
                session.color,
                isActive ? "opacity-100 ring-2 ring-white/10 z-10 scale-[1.02] shadow-lg" : "opacity-40 grayscale-[50%]"
              )}
              style={{
                left: `${leftPercent}%`,
                width: `${widthPercent}%`,
              }}
            >
              {session.name}
            </div>
          );
        })}

        {/* Current Time Indicator */}
        {mounted && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-accent z-20 shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-1000 ease-linear"
            style={{ left: `${(currentHourUTC / 24) * 100}%` }}
          >
            <div className="absolute -top-1 -translate-x-1/2 w-2 h-2 rounded-full bg-accent" />
          </div>
        )}
      </div>
      
      <div className="flex justify-between mt-2 px-1 text-[10px] text-text-tertiary uppercase tracking-wider font-mono">
        <span>00:00 UTC</span>
        <span>12:00 UTC</span>
        <span>24:00 UTC</span>
      </div>
    </div>
  );
}
