"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Globe,
  Layers,
  BarChart3,
  Settings,
  PanelLeftClose,
  PanelLeft,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/Logo";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Journal", href: "/journal", icon: BookOpen },
  { label: "Market", href: "/market", icon: Globe },
  { label: "Confluence", href: "/confluence", icon: Layers },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
];

const bottomItems: NavItem[] = [
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Keyboard shortcut: [ to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "[" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const target = e.target as HTMLElement;
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return;
        e.preventDefault();
        setCollapsed((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div
        className={cn(
          "h-16 flex items-center border-b border-border flex-shrink-0",
          collapsed ? "justify-center px-2" : "px-5"
        )}
      >
        <Logo collapsed={collapsed} />
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-3 px-3 space-y-1 overflow-y-auto" aria-label="Main navigation">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-200",
                collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5",
                active
                  ? "bg-accent-muted text-accent-text"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
              )}
              title={collapsed ? item.label : undefined}
              aria-current={active ? "page" : undefined}
            >
              <div className="relative">
                {active && (
                  <div
                    className="absolute -left-[19px] top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-r-full"
                    style={{ backgroundColor: "var(--accent)" }}
                  />
                )}
                <item.icon
                  className={cn(
                    "w-5 h-5 flex-shrink-0 transition-colors duration-200",
                    active ? "text-accent-text" : "text-text-tertiary group-hover:text-text-secondary"
                  )}
                  strokeWidth={active ? 2 : 1.5}
                />
              </div>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-border py-3 px-3 space-y-1 flex-shrink-0">
        {bottomItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-200",
                collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5",
                active
                  ? "bg-accent-muted text-accent-text"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 flex-shrink-0 transition-colors duration-200",
                  active ? "text-accent-text" : "text-text-tertiary group-hover:text-text-secondary"
                )}
                strokeWidth={1.5}
              />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}

        {/* Sign Out */}
        <button
          onClick={handleSignOut}
          className={cn(
            "group flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-200 w-full",
            collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5",
            "text-text-secondary hover:text-danger hover:bg-danger-muted cursor-pointer"
          )}
          title={collapsed ? "Sign out" : undefined}
        >
          <LogOut
            className="w-5 h-5 flex-shrink-0 text-text-tertiary group-hover:text-danger transition-colors duration-200"
            strokeWidth={1.5}
          />
          {!collapsed && <span>Sign out</span>}
        </button>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "flex items-center gap-3 rounded-lg text-sm font-medium transition-all duration-200 w-full mt-2",
            collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5",
            "text-text-tertiary hover:text-text-secondary hover:bg-bg-tertiary cursor-pointer"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand (press [)" : "Collapse (press [)"}
        >
          {collapsed ? (
            <PanelLeft className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
          ) : (
            <>
              <PanelLeftClose className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ backgroundColor: "var(--bg-overlay)" }}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden w-10 h-10 rounded-lg bg-bg-secondary border border-border flex items-center justify-center hover:bg-bg-tertiary transition-colors cursor-pointer"
        aria-label="Open navigation"
      >
        <PanelLeft className="w-5 h-5 text-text-secondary" strokeWidth={1.5} />
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 z-50 flex flex-col",
          "bg-bg-secondary border-r border-border",
          "transition-all duration-300 ease-out",
          // Mobile
          "lg:relative lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{
          width: collapsed ? "var(--sidebar-collapsed-width)" : "var(--sidebar-width)",
        }}
        aria-label="Sidebar navigation"
      >
        {sidebarContent}
      </aside>
    </>
  );
}
