"use client";

import { useState } from "react";
import { Camera, X, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface SnapshotSaveModalProps {
  currentSymbol: string;
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

      // Upload image to Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}_${currentSymbol}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('chart_snapshots')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('chart_snapshots')
        .getPublicUrl(fileName);

      // Save to database
      const { error: dbError } = await supabase
        .from('chart_snapshots')
        .insert({
          user_id: user.id,
          symbol,
          timeframe,
          notes,
          image_url: publicUrl
        });

      if (dbError) throw dbError;

      setIsOpen(false);
      setFile(null);
      setPreviewUrl(null);
      setNotes("");
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-bg-primary border border-border rounded-xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
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

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-secondary">Analysis Notes (Optional)</label>
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
