import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Maximize2, Layers, Zap } from 'lucide-react';

interface HeatmapProps {
  original: string | null;
  suspect: string | null;
}

export const Heatmap: React.FC<HeatmapProps> = ({ original, suspect }) => {
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0, show: false });
  const [isScanning, setIsScanning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMagnifierPos({ x, y, show: true });
  };

  useEffect(() => {
    setIsScanning(true);
    const timer = setTimeout(() => setIsScanning(false), 3000);
    return () => clearTimeout(timer);
  }, [suspect]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-black tracking-tighter uppercase italic">Neural Heatmap</h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Pixel-level anomaly detection</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white/5 border border-white/10 p-2 rounded hover:bg-white/10 transition-colors">
            <Layers className="w-4 h-4 text-slate-400" />
          </button>
          <button className="bg-white/5 border border-white/10 p-2 rounded hover:bg-white/10 transition-colors">
            <Maximize2 className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Original Reference</div>
          <div className="aspect-square bg-black border border-white/5 rounded-lg overflow-hidden relative">
            {original ? (
              <img src={original} alt="Original" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-700 font-mono text-[10px]">NO DATA</div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Suspect Media</div>
          <div className="aspect-square bg-black border border-white/5 rounded-lg overflow-hidden relative">
            {suspect ? (
              <img src={suspect} alt="Suspect" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-700 font-mono text-[10px]">NO DATA</div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-widest text-blue">Diff Heatmap (AI)</div>
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMagnifierPos(prev => ({ ...prev, show: false }))}
            className="aspect-square bg-black border border-blue/20 rounded-lg overflow-hidden relative cursor-crosshair"
          >
            {suspect ? (
              <>
                <img src={suspect} alt="Heatmap" className="w-full h-full object-contain opacity-50 grayscale" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-br from-red/20 via-transparent to-blue/20 mix-blend-overlay" />
                
                {/* Simulated Heatmap Blobs */}
                <div className="absolute top-1/4 left-1/3 w-20 h-20 bg-red/40 blur-2xl rounded-full animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-orange/30 blur-xl rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                
                {/* Scanning Line */}
                {isScanning && (
                  <motion.div 
                    initial={{ top: '0%' }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-0.5 bg-blue shadow-[0_0_15px_rgba(0,180,255,0.8)] z-10"
                  />
                )}

                {/* Magnifier */}
                {magnifierPos.show && (
                  <div 
                    className="absolute w-32 h-32 border-2 border-blue rounded-full overflow-hidden pointer-events-none z-20 shadow-2xl bg-black"
                    style={{ 
                      left: `${magnifierPos.x}%`, 
                      top: `${magnifierPos.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <img 
                      src={suspect} 
                      alt="Zoom" 
                      className="absolute w-[400%] h-[400%] object-contain max-w-none"
                      style={{ 
                        left: `${-magnifierPos.x * 4 + 50}%`, 
                        top: `${-magnifierPos.y * 4 + 50}%`
                      }}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 border border-white/20 rounded-full" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-px bg-blue/30" />
                      <div className="h-full w-px bg-blue/30 absolute" />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-700 font-mono text-[10px]">AWAITING ANALYSIS</div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-s1 border border-white/5 p-4 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red shadow-[0_0_10px_rgba(255,0,0,0.5)]" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">High Anomaly</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange shadow-[0_0_10px_rgba(255,165,0,0.5)]" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Medium Anomaly</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue shadow-[0_0_10px_rgba(0,180,255,0.5)]" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Structural Change</span>
          </div>
        </div>
        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          Confidence: <span className="text-white">94.2%</span>
        </div>
      </div>
    </div>
  );
};
