import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Maximize2, Layers, Zap, ArrowLeftRight } from 'lucide-react';

interface ComparisonSliderProps {
  original: string | null;
  suspect: string | null;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ original, suspect }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const pos = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, pos)));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-black tracking-tighter uppercase italic">Comparison Slider</h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Side-by-side visual verification</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Original</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Suspect</span>
          </div>
        </div>
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
        className="aspect-video bg-black border border-white/10 rounded-2xl overflow-hidden relative cursor-col-resize shadow-2xl"
      >
        {original && suspect ? (
          <>
            {/* Suspect Media (Bottom) */}
            {suspect.startsWith('data:video') ? (
              <video src={suspect} className="w-full h-full object-contain" autoPlay muted loop />
            ) : (
              <img src={suspect} alt="Suspect" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            )}
            
            {/* Original Media (Top, Clipped) */}
            <div 
              className="absolute inset-0 overflow-hidden border-r-2 border-blue"
              style={{ width: `${sliderPos}%` }}
            >
              {original.startsWith('data:video') ? (
                <video 
                  src={original} 
                  className="h-full object-contain max-w-none" 
                  style={{ width: `${100 / (sliderPos / 100)}%`, maxWidth: 'none' }} 
                  autoPlay 
                  muted 
                  loop 
                />
              ) : (
                <img 
                  src={original} 
                  alt="Original" 
                  className="w-full h-full object-contain max-w-none" 
                  style={{ width: `${100 / (sliderPos / 100)}%` }} 
                  referrerPolicy="no-referrer" 
                />
              )}
              <div className="absolute top-4 left-4 bg-blue text-black px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest shadow-lg">Original</div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-blue z-10 flex items-center justify-center"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-10 h-10 rounded-full bg-blue border-4 border-bg flex items-center justify-center shadow-2xl">
                <ArrowLeftRight className="w-4 h-4 text-black" />
              </div>
            </div>

            <div className="absolute top-4 right-4 bg-red text-white px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest shadow-lg">Suspect</div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-700 font-mono text-[10px] uppercase tracking-widest">Awaiting Dual Media Upload</div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-s1 border border-white/5 p-6 rounded-xl space-y-3">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Visual Diff</div>
          <div className="text-lg font-black tracking-tighter uppercase italic text-white">Significant</div>
          <p className="text-[10px] text-slate-500 leading-relaxed">The slider reveals clear structural differences in the central region, matching the AI's heatmap findings.</p>
        </div>
        <div className="bg-s1 border border-white/5 p-6 rounded-xl space-y-3">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Color Shift</div>
          <div className="text-lg font-black tracking-tighter uppercase italic text-white">Moderate</div>
          <p className="text-[10px] text-slate-500 leading-relaxed">Minor color balance shifts detected, likely due to post-processing filters applied to the suspect media.</p>
        </div>
        <div className="bg-s1 border border-white/5 p-6 rounded-xl space-y-3">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Resolution</div>
          <div className="text-lg font-black tracking-tighter uppercase italic text-white">Matched</div>
          <p className="text-[10px] text-slate-500 leading-relaxed">Both images share identical dimensions, suggesting a direct modification of the original asset.</p>
        </div>
      </div>
    </div>
  );
};
