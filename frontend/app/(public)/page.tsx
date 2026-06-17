import { MarketOverviewWidget } from "@/features/landing/components/MarketOverviewWidget";
import { NewsWidget } from "@/features/landing/components/NewsWidget";
import { Hero3D } from "@/features/landing/components/Hero3D";
import Link from "next/link";
import { Header } from "@/components/shared/Header";
import {
  ArrowRight,
  BookOpen,
  Layers,
  BarChart3,
  Globe,
  Target,
  TrendingUp,
  Shield,
  Zap,
  Clock,
  LineChart,
  Mail,
  MapPin,
  Phone,
  ChevronRight,
  Users,
  Award,
  Sparkles,
} from "lucide-react";


/* ── PRODUCTS / ASSETS ── */
const products = [
  {
    name: "Trade Journal",
    tag: "Core",
    description: "Structured journaling with risk metrics, session tagging, and screenshot attachments for every trade you take.",
    icon: BookOpen,
    gradient: "from-[#6C5CE7] to-[#A896FF]",
  },
  {
    name: "Market Terminal",
    tag: "Live Data",
    description: "Full TradingView integration with interactive charts, live ticker tape across crypto, forex, indices, and commodities.",
    icon: Globe,
    gradient: "from-[#3B82F6] to-[#60A5FA]",
  },
  {
    name: "Confluence Engine",
    tag: "Edge Finder",
    description: "Tag setups with custom technical criteria and discover which combinations produce your highest probability setups.",
    icon: Layers,
    gradient: "from-[#F59E0B] to-[#FBBF24]",
  },
  {
    name: "Analytics Suite",
    tag: "Insights",
    description: "Interactive equity curves, win/loss breakdowns, and session performance analysis that update in real time.",
    icon: BarChart3,
    gradient: "from-[#10B981] to-[#34D399]",
  },
];

/* ── FEATURES ── */
const features = [
  {
    icon: Target,
    title: "Win Rate Tracking",
    description: "Automatically calculate win rates across instruments, sessions, and setup types.",
  },
  {
    icon: LineChart,
    title: "Equity Curve",
    description: "Visualize your cumulative PnL over time with smooth, interactive area charts.",
  },
  {
    icon: Clock,
    title: "Session Clock",
    description: "Live UTC-mapped timeline showing Asia, London, and New York session activity.",
  },
  {
    icon: Shield,
    title: "Row Level Security",
    description: "Your data is encrypted and isolated with Supabase RLS policies. Only you can see it.",
  },
  {
    icon: Zap,
    title: "Instant Logging",
    description: "Server Actions with optimistic UI updates. Log a trade in under 5 seconds.",
  },
  {
    icon: TrendingUp,
    title: "Profit Factor",
    description: "Track your reward-to-risk efficiency across all trades with real-time profit factor calculation.",
  },
];

/* ── SERVICES ── */
const services = [
  {
    title: "Personal Trading Analytics",
    description: "Get a complete behavioral analytics dashboard tailored to your trading style. Identify patterns in your decision-making and refine your edge over time.",
    bullets: ["Custom confluence tagging", "Session-based performance breakdown", "Behavioral pattern detection"],
    icon: BarChart3,
  },
  {
    title: "Market Intelligence",
    description: "Access real-time global market data from a single command center. Track crypto, forex, indices, and commodities without switching tabs.",
    bullets: ["TradingView chart integration", "Live ticker tape for 7+ asset classes", "Multi-timeframe analysis"],
    icon: Globe,
  },
  {
    title: "Data Ownership & Export",
    description: "Your trading data belongs to you. Export everything to CSV at any time. No vendor lock-in, no hidden fees, no data harvesting.",
    bullets: ["Full CSV export", "Self-hosted option available", "GDPR compliant architecture"],
    icon: Shield,
  },
];

/* ── STATS ── */
const stats = [
  { value: "6", label: "Core Modules" },
  { value: "Real-time", label: "Market Data" },
  { value: "100%", label: "Data Ownership" },
  { value: "Dark", label: "Mode Native" },
];



export default function LandingPage() {
  return (
    <div className="relative w-full overflow-x-hidden selection:bg-[#6C5CE7]/30 bg-[#09090b]">

      {/* ═══════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <Hero3D />

        {/* Navigation */}
        <Header />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#6C5CE7]/30 bg-[#6C5CE7]/10 text-[#A896FF] text-xs font-semibold uppercase tracking-widest mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] animate-pulse" />
              Trade Intelligence Platform
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40 mb-6 leading-[0.95]">
              Trade with
              <br />
              Absolute Clarity.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/50 max-w-xl mb-10 leading-relaxed font-light">
              The behavioral analytics system for serious traders. Journal precisely, track your confluences, and discover your true edge.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/dashboard"
                className="group relative inline-flex items-center gap-2.5 px-8 py-4 bg-[#6C5CE7] text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(108,92,231,0.5)]"
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  Start Journaling
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <a href="#products" className="text-sm font-medium text-white/50 hover:text-white transition-colors flex items-center gap-1.5">
                Explore Products <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS BAR
          ═══════════════════════════════════════════ */}
      <section className="relative z-20 w-full border-y border-white/5 bg-[#09090b]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center py-8 md:py-10">
              <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">{stat.value}</span>
              <span className="text-xs text-white/40 mt-1 uppercase tracking-wider font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRODUCTS / ASSETS
          ═══════════════════════════════════════════ */}
      <section id="products" className="relative z-20 w-full py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-3 h-3" />
              Products
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Your Complete Trading Arsenal
            </h2>
            <p className="text-white/40 max-w-lg mx-auto text-sm md:text-base">
              Four integrated products working together to give you an unfair advantage.
            </p>
          </div>

          {/* Real-time Market Data Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Market Overview (Left Column) */}
            <div className="lg:col-span-2 bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/50 to-transparent" />
              <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <h3 className="text-white font-semibold tracking-tight">Live Global Market Feed</h3>
                </div>
                <span className="text-xs text-white/40 font-medium px-3 py-1 rounded-full bg-white/5">
                  Powered by TradingView
                </span>
              </div>
              <div className="p-1">
                <MarketOverviewWidget />
              </div>
              <div className="p-4 border-t border-white/[0.06] bg-white/[0.01] flex justify-center">
                <Link href="/market" className="text-sm font-medium text-[#3B82F6] hover:text-[#60A5FA] transition-colors flex items-center gap-1.5 group">
                  See more on full terminal <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Live News (Right Column) */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl relative flex flex-col">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F59E0B]/50 to-transparent" />
              <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <h3 className="text-white font-semibold tracking-tight">Market News Feed</h3>
                </div>
              </div>
              <div className="p-1 flex-1">
                <NewsWidget />
              </div>
              <div className="p-4 border-t border-white/[0.06] bg-white/[0.01] flex justify-center">
                <Link href="/market" className="text-sm font-medium text-[#F59E0B] hover:text-[#FBBF24] transition-colors flex items-center gap-1.5 group">
                  Read more news <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURES (BENTO GRID)
          ═══════════════════════════════════════════ */}
      <section id="features" className="relative z-20 w-full py-24 md:py-32 px-6 bg-[#09090b]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#6C5CE7]/30 bg-[#6C5CE7]/10 text-[#A896FF] text-xs font-semibold uppercase tracking-widest mb-4">
              <Zap className="w-3 h-3" />
              Platform Capabilities
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Everything You Need to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C5CE7] to-[#A896FF]">
                Refine Your Edge
              </span>
            </h2>
            <p className="text-white/40 max-w-lg mx-auto text-sm md:text-base">
              A meticulously crafted suite of tools designed to extract actionable insights from your raw trading data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[320px]">
            {/* Bento Item 1: Wide */}
            <div className="md:col-span-2 group relative bg-white/[0.02] border border-white/[0.06] rounded-3xl p-8 hover:bg-white/[0.04] transition-colors overflow-hidden flex flex-col justify-end">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-[#6C5CE7]/20 to-transparent rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <Target className="w-8 h-8 text-[#A896FF] mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Advanced Win Rate Tracking</h3>
              <p className="text-white/40 text-sm max-w-sm leading-relaxed">
                Automatically calculate your win rates across different instruments, sessions, and setup types in real-time. Stop guessing what works.
              </p>
            </div>

            {/* Bento Item 2: Square */}
            <div className="md:col-span-1 group relative bg-white/[0.02] border border-white/[0.06] rounded-3xl p-8 hover:bg-white/[0.04] transition-colors overflow-hidden flex flex-col justify-end">
              <LineChart className="w-8 h-8 text-[#3B82F6] mb-4" />
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Equity Curve</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Interactive area charts to visualize your cumulative PnL effortlessly.
              </p>
            </div>

            {/* Bento Item 3: Square */}
            <div className="md:col-span-1 group relative bg-white/[0.02] border border-white/[0.06] rounded-3xl p-8 hover:bg-white/[0.04] transition-colors overflow-hidden flex flex-col justify-end">
              <Clock className="w-8 h-8 text-[#F59E0B] mb-4" />
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Session Clock</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Live UTC-mapped timeline for tracking global market sessions.
              </p>
            </div>

            {/* Bento Item 4: Square */}
            <div className="md:col-span-1 group relative bg-white/[0.02] border border-white/[0.06] rounded-3xl p-8 hover:bg-white/[0.04] transition-colors overflow-hidden flex flex-col justify-end">
              <Shield className="w-8 h-8 text-[#10B981] mb-4" />
              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Bank-grade Security</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Supabase Row Level Security completely isolates your personal data.
              </p>
            </div>

            {/* Bento Item 5: Wide */}
            <div className="md:col-span-3 group relative bg-[#6C5CE7]/5 border border-[#6C5CE7]/20 rounded-3xl p-8 hover:bg-[#6C5CE7]/10 transition-colors overflow-hidden flex flex-col justify-end">
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#6C5CE7]/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="flex justify-between items-end relative z-10">
                <div>
                  <Zap className="w-8 h-8 text-[#A896FF] mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Instant Execution Logging</h3>
                  <p className="text-white/40 text-sm max-w-md leading-relaxed">
                    Built on Next.js Server Actions with optimistic UI. Log trades, attach screenshots, and tag confluences in under 5 seconds with zero loading spinners.
                  </p>
                </div>
                <div className="hidden lg:block text-[#6C5CE7]/20 font-mono text-8xl font-black -mb-4 -mr-4 tracking-tighter select-none">
                  0ms
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICES (COMPACT GRID)
          ═══════════════════════════════════════════ */}
      <section id="services" className="relative z-20 w-full py-16 md:py-24 px-6 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">
              <Award className="w-3 h-3" />
              Core Architecture
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              How Lucent Works for You
            </h2>
            <p className="text-white/40 max-w-lg mx-auto text-sm md:text-base">
              Three pillars of trading intelligence, delivered through a seamless, integrated environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div
                key={service.title}
                className="group relative bg-white/[0.02] border border-white/[0.06] rounded-[2rem] p-8 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden flex flex-col"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#6C5CE7]/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="w-12 h-12 rounded-2xl bg-[#6C5CE7]/10 border border-[#6C5CE7]/20 flex items-center justify-center mb-6 text-[#A896FF] group-hover:scale-110 transition-transform duration-500">
                  <service.icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                  {service.title}
                </h3>
                
                <p className="text-sm text-white/40 leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>
                
                <ul className="space-y-3">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0">
                        <div className="w-1 h-1 rounded-full bg-[#6C5CE7]" />
                      </div>
                      <span className="text-white/50 text-xs font-medium">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT US (EDITORIAL)
          ═══════════════════════════════════════════ */}
      <section id="about" className="relative w-full py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#6C5CE7]/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Story Text */}
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-semibold uppercase tracking-widest">
                <Users className="w-3 h-3" />
                The Origin
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.1]">
                Trading is hard. <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C5CE7] to-[#A896FF]">
                  Your tools shouldn't be.
                </span>
              </h2>
              
              <div className="space-y-6 text-base md:text-lg text-white/40 leading-relaxed font-medium">
                <p>
                  Lucent was born out of frustration. We were tired of scattered spreadsheets, disconnected charting tools, and journaling platforms that felt like an afterthought.
                </p>
                <p>
                  We believe every serious trader deserves a system that works exactly as hard as they do. A platform that doesn't just record data, but actively reveals the behavioral edge hidden within your history.
                </p>
              </div>
            </div>

            {/* Visual Abstract */}
            <div className="flex-1 w-full max-w-lg mx-auto lg:mx-0">
              <div className="relative w-full aspect-square md:aspect-[4/5] rounded-[2.5rem] border border-white/[0.08] bg-[#09090b] overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#6C5CE7]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
                
                {/* Generated Abstract Image */}
                <div className="absolute inset-0 w-full h-full">
                  <img 
                    src="/images/about-abstract.png" 
                    alt="Abstract data core representing trading intelligence"
                    className="w-full h-full object-cover object-center opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000 ease-out"
                  />
                </div>

                {/* Floating Metric Card */}
                <div className="absolute bottom-8 left-8 right-8 z-20">
                  <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 shadow-2xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/60 text-xs font-bold uppercase tracking-widest">System</span>
                      <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                    </div>
                    <div className="text-2xl font-bold text-white tracking-tight">
                      Clarity Achieved
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA SECTION
          ═══════════════════════════════════════════ */}
      <section className="relative z-20 w-full py-24 md:py-32 px-6 bg-white/[0.01]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#6C5CE7]/10 rounded-full blur-[120px] pointer-events-none" />
          <TrendingUp className="w-8 h-8 text-[#6C5CE7] mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Ready to Trade with Clarity?
          </h2>
          <p className="text-white/40 max-w-md mx-auto mb-10 text-sm md:text-base">
            Stop guessing. Start journaling with precision. Your edge is hiding in the data — Lucent helps you find it.
          </p>
          <Link
            href="/dashboard"
            className="group relative inline-flex items-center gap-2.5 px-10 py-5 bg-gradient-to-r from-[#6C5CE7] to-[#3B82F6] text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_80px_rgba(108,92,231,0.4)]"
          >
            <span className="relative z-10 flex items-center gap-2.5">
              Get Started — It&apos;s Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CONTACT (GLASS TERMINAL)
          ═══════════════════════════════════════════ */}
      <section id="contact" className="relative z-20 w-full py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">
              <Mail className="w-3 h-3" />
              Initialize Connection
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Get in Touch
            </h2>
            <p className="text-white/40 max-w-lg mx-auto text-sm md:text-base">
              Questions, feedback, or partnership inquiries. We respond with low latency.
            </p>
          </div>

          <div className="relative rounded-[2rem] border border-white/[0.08] bg-white/[0.01] overflow-hidden p-1">
            <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7]/5 via-transparent to-[#3B82F6]/5" />

            <div className="relative rounded-[1.8rem] bg-[#09090b] border border-white/[0.04] p-8 md:p-12 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6C5CE7]/10 blur-[120px] rounded-full pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
                {/* Terminal Form */}
                <div className="lg:col-span-3 relative z-10">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Name</label>
                        <input
                          type="text"
                          className="w-full bg-transparent border-b-2 border-white/10 px-0 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#6C5CE7] transition-colors font-medium"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Email</label>
                        <input
                          type="email"
                          className="w-full bg-transparent border-b-2 border-white/10 px-0 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#6C5CE7] transition-colors font-medium"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Subject</label>
                      <input
                        type="text"
                        className="w-full bg-transparent border-b-2 border-white/10 px-0 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#6C5CE7] transition-colors font-medium"
                        placeholder="Feature Request"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Payload</label>
                      <textarea
                        rows={4}
                        className="w-full bg-transparent border-b-2 border-white/10 px-0 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#6C5CE7] transition-colors resize-none font-medium"
                        placeholder="Transmit message..."
                      />
                    </div>
                    <button
                      type="button"
                      className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-white text-[#09090b] font-bold rounded-full hover:scale-105 transition-all duration-300 mt-4"
                    >
                      Execute Request
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </div>

                {/* Contact Info Sidebar */}
                <div className="lg:col-span-2 relative z-10 flex flex-col justify-between">
                  <div className="space-y-10">
                    <div>
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4 text-[#A896FF]">
                        <Mail className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">Direct Comm</h4>
                      <p className="text-white/40 text-sm">support@lucent.trade</p>
                    </div>
                    <div>
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] mb-4 text-[#A896FF]">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">Headquarters</h4>
                      <p className="text-white/40 text-sm">Decentralized, Global Node</p>
                    </div>
                  </div>

                  <div className="pt-10 border-t border-white/[0.06] mt-10 lg:mt-0">
                    <p className="text-xs text-white/30 font-mono tracking-wider">
                      SYSTEM STATUS: ONLINE
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                      <span className="text-[#10B981] text-xs font-bold uppercase tracking-widest">All systems operational</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
      <footer className="relative z-20 w-full border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#6C5CE7] to-[#A896FF] flex items-center justify-center">
                  <span className="font-bold text-white text-[10px]">L</span>
                </div>
                <span className="text-sm font-bold text-white">Lucent</span>
              </div>
              <p className="text-xs text-white/30 leading-relaxed">
                The behavioral analytics system for traders who take their craft seriously.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-2.5">
                {["Trade Journal", "Market Terminal", "Confluence Engine", "Analytics Suite"].map((item) => (
                  <li key={item}><a href="#products" className="text-xs text-white/30 hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2.5">
                {["About Us", "Careers", "Blog", "Press"].map((item) => (
                  <li key={item}><a href="#about" className="text-xs text-white/30 hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-2.5">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                  <li key={item}><a href="#" className="text-xs text-white/30 hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/20">
              &copy; {new Date().getFullYear()} Lucent. All rights reserved.
            </p>
            <p className="text-xs text-white/20">
              Built for traders who take their craft seriously.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
