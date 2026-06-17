"use client";

import { useState } from "react";
import { BarChart3, Globe, Shield, type LucideIcon } from "lucide-react";

interface Service {
  title: string;
  description: string;
  bullets: string[];
  icon: LucideIcon;
}

const services: Service[] = [
  {
    title: "Personal Trading Analytics",
    description:
      "Get a complete behavioral analytics dashboard tailored to your trading style. Identify patterns in your decision-making and refine your edge over time.",
    bullets: [
      "Custom confluence tagging",
      "Session-based performance breakdown",
      "Behavioral pattern detection",
    ],
    icon: BarChart3,
  },
  {
    title: "Market Intelligence",
    description:
      "Access real-time global market data from a single command center. Track crypto, forex, indices, and commodities without switching tabs.",
    bullets: [
      "TradingView chart integration",
      "Live ticker tape for 7+ asset classes",
      "Multi-timeframe analysis",
    ],
    icon: Globe,
  },
  {
    title: "Data Ownership & Export",
    description:
      "Your trading data belongs to you. Export everything to CSV at any time. No vendor lock-in, no hidden fees, no data harvesting.",
    bullets: [
      "Full CSV export",
      "Self-hosted option available",
      "GDPR compliant architecture",
    ],
    icon: Shield,
  },
];

export function ServicesAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:h-[380px]">
      {services.map((service, i) => {
        const isActive = activeIndex === i;
        const Icon = service.icon;

        return (
          <div
            key={service.title}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
            className={`
              relative overflow-hidden rounded-2xl border transition-all duration-600 ease-[cubic-bezier(0.25,0.8,0.25,1)] cursor-pointer
              ${isActive
                ? "lg:flex-[1.5] border-white/[0.12] bg-white/[0.04]"
                : "lg:flex-[1] border-white/[0.06] bg-white/[0.02] hover:border-white/[0.08]"
              }
            `}
          >
            {/* Glow on active */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-[#6C5CE7]/10 via-transparent to-[#3B82F6]/5 transition-opacity duration-600 pointer-events-none ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            />

            <div className="relative z-10 p-6 md:p-8 h-full flex flex-col overflow-hidden">
              {/* Step number — positioned in background */}
              <span
                className={`absolute top-4 right-6 font-black tracking-tighter select-none transition-all duration-500 ${
                  isActive
                    ? "text-[#6C5CE7]/10 text-7xl md:text-8xl"
                    : "text-white/[0.04] text-8xl md:text-9xl"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Top accent bar */}
              <div
                className={`h-[2px] rounded-full mb-5 transition-all duration-500 ${
                  isActive
                    ? "bg-gradient-to-r from-[#6C5CE7] to-[#A896FF] w-12"
                    : "bg-white/10 w-8"
                }`}
              />

              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${
                  isActive
                    ? "bg-[#6C5CE7]/15 border border-[#6C5CE7]/30 text-[#A896FF]"
                    : "bg-white/[0.03] border border-white/[0.08] text-white/30"
                }`}
              >
                <Icon className="w-8 h-8" />
              </div>

              {/* Title — always visible and large */}
              <h3
                className={`font-bold tracking-tighter transition-colors duration-500 text-3xl md:text-4xl ${
                  isActive ? "text-white" : "text-white/70"
                }`}
              >
                {service.title}
              </h3>

              {/* Description & bullets — fade in on hover, fixed height prevents growth */}
              <div
                className={`overflow-hidden transition-all duration-600 ease-[cubic-bezier(0.25,0.8,0.25,1)] flex-grow ${
                  isActive
                    ? "opacity-100 mt-4"
                    : "opacity-0 mt-0 lg:opacity-0"
                }`}
              >
                <p className="text-sm md:text-base text-white/50 leading-relaxed font-medium">
                  {service.description}
                </p>


              </div>


            </div>
          </div>
        );
      })}
    </div>
  );
}
