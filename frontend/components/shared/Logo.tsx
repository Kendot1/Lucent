"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  collapsed?: boolean;
  className?: string;
}

export function Logo({ collapsed = false, className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {/* Logo Mark */}
      <div className="relative flex-shrink-0">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, var(--accent), #8B5CF6)",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 1L16.5 5.5V12.5L9 17L1.5 12.5V5.5L9 1Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M9 6L13 8.5V13L9 15.5L5 13V8.5L9 6Z"
              fill="white"
              fillOpacity="0.9"
            />
          </svg>
        </div>
        {/* Subtle glow effect */}
        <div
          className="absolute inset-0 rounded-lg opacity-40 blur-md -z-10"
          style={{
            background: "linear-gradient(135deg, var(--accent), #8B5CF6)",
          }}
        />
      </div>

      {/* Logo Text */}
      {!collapsed && (
        <span className="text-lg font-semibold tracking-tight text-text-primary">
          Lucent
        </span>
      )}
    </div>
  );
}
