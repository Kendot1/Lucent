import {
  BookOpen,
  Globe,
  Layers,
  BarChart3,
  TrendingUp,
  Activity,
  Target,
  Clock,
  History,
} from "lucide-react";
import Link from "next/link";
import { getDashboardStats, getTrades } from "@/lib/supabase/queries";
import { SessionClock } from "@/features/market/components/SessionClock";
import { TradeCard } from "@/features/journal/components/TradeCard";

const quickLinks = [
  {
    label: "New Trade",
    description: "Log a new trade entry",
    href: "/journal",
    icon: BookOpen,
    color: "var(--accent)",
    bgColor: "var(--accent-muted)",
  },
  {
    label: "Market Context",
    description: "Check current session & conditions",
    href: "/market",
    icon: Globe,
    color: "var(--info)",
    bgColor: "var(--info-muted)",
  },
  {
    label: "Confluence",
    description: "Review setup conditions",
    href: "/confluence",
    icon: Layers,
    color: "var(--warning)",
    bgColor: "var(--warning-muted)",
  },
  {
    label: "Analytics",
    description: "View your performance",
    href: "/analytics",
    icon: BarChart3,
    color: "var(--success)",
    bgColor: "var(--success-muted)",
  },
];

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  const trades = await getTrades();
  const recentTrades = trades.slice(0, 3);

  const statCards = [
    { label: "Win Rate", value: `${stats.winRate.toFixed(1)}%`, icon: Target, trend: null },
    { label: "Total Trades", value: stats.totalTrades.toString(), icon: Activity, trend: null },
    { label: "Profit Factor", value: stats.profitFactor.toFixed(2), icon: TrendingUp, trend: null },
    { label: "Avg R:R", value: `1:${stats.avgRR.toFixed(2)}`, icon: Clock, trend: null },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl font-bold text-text-primary tracking-tight">
          Good to see you 👋
        </h2>
        <p className="text-text-secondary mt-1">
          Here&apos;s an overview of your trading activity.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-bg-secondary p-5 transition-all duration-200 hover:border-border-hover hover:shadow-md"
            style={{ boxShadow: "var(--shadow-sm)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-text-secondary">{stat.label}</span>
              <stat.icon
                className="w-4 h-4 text-text-tertiary"
                strokeWidth={1.5}
              />
            </div>
            <div className="text-2xl font-bold text-text-primary tracking-tight">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Left Column: Recent Trades */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-semibold text-text-primary flex items-center gap-2">
              <History className="w-4 h-4 text-accent" />
              Recent Trades
            </h3>
            <Link href="/journal" className="text-sm text-text-secondary hover:text-accent transition-colors">
              View All
            </Link>
          </div>

          {recentTrades.length === 0 ? (
            <div className="rounded-xl border border-border border-dashed bg-bg-secondary p-8 text-center flex flex-col items-center">
              <Activity className="w-6 h-6 text-text-tertiary mb-2" />
              <p className="text-sm font-medium text-text-secondary">No recent trades</p>
              <p className="text-xs text-text-tertiary mt-1">Log a trade in the Journal to see it here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentTrades.map((trade) => (
                <TradeCard key={trade.id} trade={trade} />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Session Clock */}
        <div className="xl:col-span-1">
          <SessionClock />
        </div>

      </div>



      {/* Recent Activity (empty state) */}
      <div>
        <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4">
          Recent Activity
        </h3>
        <div className="rounded-xl border border-border bg-bg-secondary p-12 text-center">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "var(--accent-muted)" }}
          >
            <BookOpen
              className="w-6 h-6"
              style={{ color: "var(--accent-text)" }}
              strokeWidth={1.5}
            />
          </div>
          <h4 className="text-sm font-semibold text-text-primary mb-1">
            No trades yet
          </h4>
          <p className="text-xs text-text-tertiary max-w-xs mx-auto">
            Start logging your trades to see activity here. Your journey to
            better trading begins with the first entry.
          </p>
        </div>
      </div>
    </div>
  );
}
