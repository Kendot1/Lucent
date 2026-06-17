"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function TradingViewChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [symbol, setSymbol] = useState("NASDAQ:NDX");
  const [inputValue, setInputValue] = useState("NASDAQ:NDX");

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous widget
    containerRef.current.innerHTML = '';

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "${symbol}",
        "interval": "15",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "backgroundColor": "rgba(9, 9, 11, 1)",
        "gridColor": "rgba(255, 255, 255, 0.06)",
        "hide_top_toolbar": false,
        "hide_legend": false,
        "save_image": false,
        "allow_symbol_change": true,
        "hide_side_toolbar": false,
        "withdateranges": true,
        "details": true,
        "hotlist": true,
        "studies": ["Volume@tv-basicstudies"],
        "container_id": "tradingview_advanced_chart_${symbol.replace(/[^a-zA-Z0-9]/g, '')}",
        "support_host": "https://www.tradingview.com"
      }
    `;

    containerRef.current.appendChild(script);
  }, [symbol]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Ensure there's no script injection vulnerability
      const cleanSymbol = inputValue.trim().replace(/"/g, '');
      setSymbol(cleanSymbol);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Symbol Selector */}
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toUpperCase())}
            placeholder="e.g. COINBASE:BTCUSD, AAPL"
            className="w-full rounded-lg border border-border bg-bg-secondary pl-9 pr-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors uppercase"
          />
        </div>
        <Button type="submit" size="sm" className="h-9">
          Load Chart
        </Button>
      </form>

      {/* Chart Container */}
      <div className="w-full h-[calc(100vh-200px)] min-h-[500px] bg-bg-secondary border border-border rounded-xl p-0.5 shadow-sm overflow-hidden">
        <div className="tradingview-widget-container" style={{ height: "100%", width: "100%" }}>
          <div 
            className="tradingview-widget-container__widget" 
            style={{ height: "100%", width: "100%" }} 
            ref={containerRef} 
          />
        </div>
      </div>
    </div>
  );
}
