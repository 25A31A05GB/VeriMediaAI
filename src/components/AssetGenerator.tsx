import React, { useState } from 'react';
import { Image as ImageIcon, Sparkles, Download, Loader2, Maximize2, RefreshCcw, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateForensicImage } from '../services/gemini';
import { toast } from 'sonner';

export const AssetGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<"1K" | "2K" | "4K">("1K");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      const imageUrl = await generateForensicImage(prompt, size);
      setGeneratedImage(imageUrl);
      toast.success("Forensic asset generated successfully.");
    } catch (error) {
      console.error("Generation Error:", error);
      toast.error("Failed to generate asset. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `forensic-asset-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Controls */}
      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
              <ImageIcon className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Neural Asset Generator</h3>
              <p className="text-xs text-white/50">Create high-fidelity forensic reconstructions</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the asset to generate (e.g., 'A high-resolution forensic reconstruction of a digital artifact with neural noise patterns...')"
              className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">Output Resolution</label>
            <div className="grid grid-cols-3 gap-2">
              {(["1K", "2K", "4K"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "py-2 rounded-lg text-xs font-medium border transition-all",
                    size === s 
                      ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20" 
                      : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-purple-500/20"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating Asset...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Forensic Asset
              </>
            )}
          </button>
        </div>

        <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex gap-3">
          <Shield className="w-5 h-5 text-blue-400 shrink-0" />
          <p className="text-[11px] text-blue-200/70 leading-relaxed">
            Assets generated are watermarked with neural metadata for tracking and ethical compliance. 
            Gemini 3 Pro Image Engine ensures high-fidelity results suitable for forensic documentation.
          </p>
        </div>
      </div>

      {/* Preview */}
      <div className="relative rounded-2xl bg-black/40 border border-white/10 overflow-hidden min-h-[400px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {generatedImage ? (
            <motion.div
              key="image"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="relative w-full h-full group"
            >
              <img 
                src={generatedImage} 
                alt="Generated Asset" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button 
                  onClick={handleDownload}
                  className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Download className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setGeneratedImage(null)}
                  className="w-12 h-12 rounded-full bg-white/10 text-white backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform border border-white/20"
                >
                  <RefreshCcw className="w-6 h-6" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Maximize2 className="w-3 h-3 text-white/50" />
                  <span className="text-[10px] text-white/70 uppercase tracking-widest">{size} Resolution</span>
                </div>
                <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">Verified Asset</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-4 text-white/20"
            >
              {isGenerating ? (
                <div className="relative">
                  <Loader2 className="w-12 h-12 animate-spin text-purple-500/50" />
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 animate-pulse" />
                </div>
              ) : (
                <ImageIcon className="w-16 h-16" />
              )}
              <p className="text-xs uppercase tracking-[0.2em] font-medium">
                {isGenerating ? "Synthesizing Neural Layers..." : "Awaiting Generation Parameters"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
