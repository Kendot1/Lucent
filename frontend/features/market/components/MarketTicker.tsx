"use client";

import { useEffect, useRef } from "react";
import { Activity } from "lucide-react";

export function MarketTicker() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent multiple injections in strict mode
    if (containerRef.current && containerRef.current.children.length > 0) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "symbols": [
          {
            "proName": "FOREXCOM:SPXUSD",
            "title": "S&P 500"
          },
          {
            "proName": "FOREXCOM:NSXUSD",
            "title": "Nasdaq 100"
          },
          {
            "proName": "OANDA:XAUUSD",
            "title": "Gold"
          },
          {
            "proName": "FX:EURUSD",
            "title": "EUR/USD"
          },
          {
            "proName": "COINBASE:BTCUSD",
            "title": "Bitcoin"
          },
          {
            "proName": "COINBASE:ETHUSD",
            "title": "Ethereum"
          },
          {
            "proName": "COINBASE:SOLUSD",
            "title": "Solana"
          }
        ],
        "showSymbolLogo": true,
        "isTransparent": true,
        "displayMode": "adaptive",
        "colorTheme": "dark",
        "locale": "en"
      }
    `;

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full overflow-hidden bg-bg-secondary border border-border rounded-xl p-4 shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-3 px-1">
        <Activity className="w-4 h-4 text-success animate-pulse" />
        <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Global Market Data
        </span>
      </div>
      
      {/* TradingView Widget Container */}
      <div className="tradingview-widget-container" style={{ width: '100%', height: '46px' }}>
        <div className="tradingview-widget-container__widget" ref={containerRef}></div>
      </div>
    </div>
  );
}
