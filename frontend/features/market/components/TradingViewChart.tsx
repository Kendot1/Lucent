"use client";

import { useEffect, useRef, useState } from "react";
import { Lightbulb } from "lucide-react";
import { SnapshotSaveModal } from "./SnapshotSaveModal";

export function TradingViewChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [symbol, setSymbol] = useState("NASDAQ:AAPL");
  const [inputValue, setInputValue] = useState("NASDAQ:AAPL");

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
        "save_image": true,
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
      {/* Tip Banner */}
      <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/20 text-blue-200 px-4 py-3 rounded-xl text-sm">
        <Lightbulb className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <p>
          <strong className="font-semibold text-blue-300">Pro Tip:</strong> Log into your free TradingView account using the chart menu to automatically save your drawings across sessions!
        </p>
      </div>
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
      
      {/* Action Bar */}
      <div className="flex items-center justify-end">
        <SnapshotSaveModal currentSymbol={symbol} />
      </div>
    </div>
  );
}
