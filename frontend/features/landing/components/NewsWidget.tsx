"use client";

import { useEffect, useRef } from "react";

export function NewsWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && containerRef.current.children.length > 0) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "feedMode": "all_symbols",
        "isTransparent": true,
        "displayMode": "regular",
        "height": "800",
        "colorTheme": "dark",
        "locale": "en"
      }
    `;

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="h-[600px] overflow-hidden relative">
      {/* 
        -mt-[65px] crops the top header (which contains the TradingView logo)
        Inner height: 800px. Visible height: 600px.
        800 - 65 (top) - 600 (visible) = 135px cropped at the bottom (hides 'Keep reading').
      */}
      <div className="h-[800px] -mt-[65px]">
        <div className="tradingview-widget-container h-full w-full">
          <div className="tradingview-widget-container__widget h-full w-full" ref={containerRef} />
        </div>
      </div>
    </div>
  );
}
