"use client";

import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/journal": "Journal",
  "/market": "Market Context",
  "/confluence": "Confluence",
  "/analytics": "Analytics",
  "/settings": "Settings",
};

export function DashboardHeader() {
  const pathname = usePathname();

  const title = pageTitles[pathname] || "Dashboard";

  return (
    <header
      className="h-16 flex items-center justify-between px-6 border-b border-border bg-bg-secondary/50 backdrop-blur-sm flex-shrink-0"
      role="banner"
    >
      {/* Left: Page title */}
      <div className="flex items-center gap-3">
        {/* Spacer for mobile menu button */}
        <div className="w-10 lg:hidden" />
        <div>
          <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>
    </header>
  );
}
