"use client";

import { useEffect, useRef } from "react";

export function MarketOverviewWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && containerRef.current.children.length > 0) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "colorTheme": "dark",
        "dateRange": "1D",
        "showChart": true,
        "locale": "en",
        "largeChartUrl": "",
        "isTransparent": true,
        "showSymbolLogo": true,
        "showFloatingTooltip": true,
        "height": "670",
        "plotLineColorGrowing": "rgba(108, 92, 231, 1)",
        "plotLineColorFalling": "rgba(255, 71, 87, 1)",
        "gridLineColor": "rgba(255, 255, 255, 0.06)",
        "scaleFontColor": "rgba(255, 255, 255, 0.4)",
        "belowLineFillColorGrowing": "rgba(108, 92, 231, 0.12)",
        "belowLineFillColorFalling": "rgba(255, 71, 87, 0.12)",
        "belowLineFillColorGrowingBottom": "rgba(108, 92, 231, 0)",
        "belowLineFillColorFallingBottom": "rgba(255, 71, 87, 0)",
        "symbolActiveColor": "rgba(108, 92, 231, 0.12)",
        "tabs": [
          {
            "title": "Indices",
            "symbols": [
              { "s": "FOREXCOM:SPXUSD", "d": "S&P 500" },
              { "s": "FOREXCOM:NSXUSD", "d": "Nasdaq 100" },
              { "s": "FOREXCOM:DJI", "d": "Dow Jones" },
              { "s": "INDEX:NKY", "d": "Nikkei 225" },
              { "s": "INDEX:UKX", "d": "FTSE 100" }
            ],
            "originalTitle": "Indices"
          },
          {
            "title": "Forex",
            "symbols": [
              { "s": "FX:EURUSD", "d": "EUR/USD" },
              { "s": "FX:GBPUSD", "d": "GBP/USD" },
              { "s": "FX:USDJPY", "d": "USD/JPY" },
              { "s": "FX:AUDUSD", "d": "AUD/USD" },
              { "s": "FX:USDCAD", "d": "USD/CAD" }
            ],
            "originalTitle": "Forex"
          },
          {
            "title": "Crypto",
            "symbols": [
              { "s": "COINBASE:BTCUSD", "d": "Bitcoin" },
              { "s": "COINBASE:ETHUSD", "d": "Ethereum" },
              { "s": "COINBASE:SOLUSD", "d": "Solana" },
              { "s": "BINANCE:XRPUSDT", "d": "XRP" },
              { "s": "BINANCE:ADAUSDT", "d": "Cardano" }
            ],
            "originalTitle": "Crypto"
          },
          {
            "title": "Commodities",
            "symbols": [
              { "s": "OANDA:XAUUSD", "d": "Gold" },
              { "s": "OANDA:XAGUSD", "d": "Silver" },
              { "s": "TVC:USOIL", "d": "Crude Oil" },
              { "s": "NYMEX:NG1!", "d": "Natural Gas" },
              { "s": "COMEX:HG1!", "d": "Copper" }
            ],
            "originalTitle": "Commodities"
          }
        ]
      }
    `;

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="h-[600px] overflow-hidden">
      <div className="h-[670px] -mt-2.5">
        <div className="tradingview-widget-container h-full w-full">
          <div className="tradingview-widget-container__widget h-full w-full" ref={containerRef} />
        </div>
      </div>
    </div>
  );
}
