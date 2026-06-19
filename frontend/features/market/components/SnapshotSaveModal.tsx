"use client";

import { useState } from "react";
import { Camera, X, Upload, Target } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface SnapshotSaveModalProps {
  currentSymbol: string;
}

type TradeOutcome = "win" | "loss" | "breakeven" | "open" | null;
type TradeDirection = "long" | "short" | null;

interface TradeSetup {
  direction: TradeDirection;
  entry_price: number | null;
  take_profit: number | null;
  stop_loss: number | null;
  risk_reward_ratio: number | null;
  outcome: TradeOutcome;
}

export function SnapshotSaveModal({ currentSymbol }: SnapshotSaveModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [symbol, setSymbol] = useState(currentSymbol);
  const [timeframe, setTimeframe] = useState("15m");
  const [notes, setNotes] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [tradeSetup, setTradeSetup] = useState<TradeSetup | null>(null);
  
  const router = useRouter();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);

      // Analyze image with AI
      try {
        setIsAnalyzing(true);
        // Convert to base64
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = async () => {
          const base64Image = reader.result as string;
          
          const response = await fetch('/api/analyze-chart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64Image })
          });

          if (response.ok) {
            const data = await response.json();
            if (data.symbol) setSymbol(data.symbol);
            if (data.timeframe) setTimeframe(data.timeframe);
            if (data.analysis) setNotes(data.analysis);
            if (data.trade_setup && data.trade_setup.direction) {
              setTradeSetup(data.trade_setup);
            } else {
              setTradeSetup(null);
            }
          } else {
            console.error('Failed to analyze image:', await response.text());
          }
          setIsAnalyzing(false);
        };
      } catch (error) {
        console.error("Error initiating analysis:", error);
        setIsAnalyzing(false);
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      setIsUploading(true);
      const supabase = createClient();
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      let tradeId = null;

      // Create trade record if setup was detected
      if (tradeSetup && tradeSetup.direction) {
        const { data: tradeData, error: tradeError } = await supabase
          .from('trades')
          .insert({
            user_id: user.id,
            instrument: symbol,
            direction: tradeSetup.direction,
            status: tradeSetup.outcome === 'open' ? 'open' : 'closed',
            outcome: tradeSetup.outcome === 'open' ? null : tradeSetup.outcome,
            entry_price: tradeSetup.entry_price,
            take_profit: tradeSetup.take_profit,
            stop_loss: tradeSetup.stop_loss,
            risk_reward_ratio: tradeSetup.risk_reward_ratio,
            setup_type: 'AI Extracted',
            notes: notes,
            entry_time: new Date().toISOString()
          })
          .select('id')
          .single();

        if (tradeError) {
          console.error("Failed to insert trade:", tradeError);
        } else {
          tradeId = tradeData?.id;
        }
      }

      // Upload image to Cloudflare R2 via our API
      const formData = new FormData();
      formData.append('file', file);

      const uploadResponse = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image to R2');
      }

      const { url: publicUrl } = await uploadResponse.json();

      // Save snapshot to database
      const { error: dbError } = await supabase
        .from('chart_snapshots')
        .insert({
          user_id: user.id,
          symbol,
          timeframe,
          notes,
          image_url: publicUrl,
          trade_id: tradeId
        });

      if (dbError) throw dbError;

      setIsOpen(false);
      setFile(null);
      setPreviewUrl(null);
      setNotes("");
      setTradeSetup(null);
      router.refresh();
      
    } catch (error) {
      console.error("Error saving snapshot:", error);
      alert("Failed to save snapshot. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-accent/10 text-accent hover:bg-accent/20 transition-colors w-auto px-4 gap-2"
        style={{ backgroundColor: "var(--accent-muted)", color: "var(--accent-text)" }}
      >
        <Camera className="w-4 h-4" />
        Save Chart Snapshot
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-bg-primary border border-border rounded-xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 my-8">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold text-text-primary flex items-center gap-2">
                <Camera className="w-5 h-5 text-accent" />
                Save Chart Snapshot
              </h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-bg-secondary rounded-md transition-colors"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-text-secondary">Symbol</label>
                  <input 
                    type="text" 
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-text-secondary">Timeframe</label>
                  <select 
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                  >
                    <option value="1m">1m</option>
                    <option value="5m">5m</option>
                    <option value="15m">15m</option>
                    <option value="1h">1h</option>
                    <option value="4h">4h</option>
                    <option value="1D">1D</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-secondary flex items-center justify-between">
                  <span>Chart Image</span>
                  {isAnalyzing && (
                    <span className="text-accent flex items-center gap-1 text-xs animate-pulse">
                      <Camera className="w-3 h-3" /> Analyzing chart...
                    </span>
                  )}
                </label>
                {!previewUrl ? (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer bg-bg-secondary hover:bg-bg-secondary/80 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-text-secondary" />
                      <p className="text-sm text-text-secondary"><span className="font-semibold text-accent">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-text-secondary/70 mt-1">PNG, JPG, WEBP</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  </label>
                ) : (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden border border-border">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => { setFile(null); setPreviewUrl(null); }}
                      className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/80 rounded-md text-white transition-colors backdrop-blur-sm"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {tradeSetup && (
                <div className="space-y-3 bg-bg-secondary/50 p-3 rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-text-primary flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-accent" />
                      Trade Setup Detected
                    </h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                      tradeSetup.outcome === 'win' ? 'bg-green-500/10 text-green-500' :
                      tradeSetup.outcome === 'loss' ? 'bg-red-500/10 text-red-500' :
                      tradeSetup.outcome === 'breakeven' ? 'bg-yellow-500/10 text-yellow-500' :
                      'bg-blue-500/10 text-blue-500'
                    }`}>
                      {tradeSetup.outcome || 'open'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-text-secondary text-xs block">Direction</span>
                      <select
                        value={tradeSetup.direction || 'long'}
                        onChange={(e) => setTradeSetup({...tradeSetup, direction: e.target.value as TradeDirection})}
                        className="w-full bg-bg-primary border border-border rounded px-2 py-1 mt-1 focus:outline-none focus:border-accent capitalize"
                      >
                        <option value="long">Long</option>
                        <option value="short">Short</option>
                      </select>
                    </div>
                    <div>
                      <span className="text-text-secondary text-xs block">Outcome</span>
                      <select
                        value={tradeSetup.outcome || 'open'}
                        onChange={(e) => setTradeSetup({...tradeSetup, outcome: e.target.value as TradeOutcome})}
                        className="w-full bg-bg-primary border border-border rounded px-2 py-1 mt-1 focus:outline-none focus:border-accent capitalize"
                      >
                        <option value="open">Open</option>
                        <option value="win">Win</option>
                        <option value="loss">Loss</option>
                        <option value="breakeven">Breakeven</option>
                      </select>
                    </div>
                    <div>
                      <span className="text-text-secondary text-xs block">Entry Price</span>
                      <input 
                        type="number" 
                        step="any"
                        value={tradeSetup.entry_price || ''} 
                        onChange={(e) => setTradeSetup({...tradeSetup, entry_price: Number(e.target.value)})}
                        className="w-full bg-bg-primary border border-border rounded px-2 py-1 mt-1 focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <span className="text-text-secondary text-xs block">Risk/Reward (R:R)</span>
                      <input 
                        type="number" 
                        step="any"
                        value={tradeSetup.risk_reward_ratio || ''} 
                        onChange={(e) => setTradeSetup({...tradeSetup, risk_reward_ratio: Number(e.target.value)})}
                        className="w-full bg-bg-primary border border-border rounded px-2 py-1 mt-1 focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <span className="text-text-secondary text-xs block">Take Profit</span>
                      <input 
                        type="number" 
                        step="any"
                        value={tradeSetup.take_profit || ''} 
                        onChange={(e) => setTradeSetup({...tradeSetup, take_profit: Number(e.target.value)})}
                        className="w-full bg-bg-primary border border-border rounded px-2 py-1 mt-1 focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <span className="text-text-secondary text-xs block">Stop Loss</span>
                      <input 
                        type="number" 
                        step="any"
                        value={tradeSetup.stop_loss || ''} 
                        onChange={(e) => setTradeSetup({...tradeSetup, stop_loss: Number(e.target.value)})}
                        className="w-full bg-bg-primary border border-border rounded px-2 py-1 mt-1 focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-secondary">Analysis Notes</label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="E.g. Price rejected from the golden pocket fib level..."
                  className="w-full bg-bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-accent min-h-[80px] resize-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <Button 
                  type="button" 
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent border border-border hover:bg-bg-secondary text-text-primary"
                >
                  Cancel
                </Button>
                <Button type="submit" isLoading={isUploading} disabled={!file}>
                  Save Snapshot
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
