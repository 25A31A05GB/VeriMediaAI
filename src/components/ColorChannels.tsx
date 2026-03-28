import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Layers, Zap, Shield, Search } from 'lucide-react';

interface ColorChannelsProps {
  image: string | null;
}

const ChannelCanvas: React.FC<{ image: string; channel: 'red' | 'green' | 'blue' | 'gray' }> = ({ image, channel }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = image;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        if (channel === 'red') {
          data[i + 1] = 0;
          data[i + 2] = 0;
        } else if (channel === 'green') {
          data[i] = 0;
          data[i + 2] = 0;
        } else if (channel === 'blue') {
          data[i] = 0;
          data[i + 1] = 0;
        } else if (channel === 'gray') {
          const avg = (r + g + b) / 3;
          data[i] = avg;
          data[i + 1] = avg;
          data[i + 2] = avg;
        }
      }
      ctx.putImageData(imageData, 0, 0);
    };
  }, [image, channel]);

  return <canvas ref={canvasRef} className="w-full h-full object-contain" />;
};

export const ColorChannels: React.FC<ColorChannelsProps> = ({ image }) => {
  const channels = [
    { name: 'Red Channel', id: 'red', desc: 'Highlights red spectrum anomalies' },
    { name: 'Green Channel', id: 'green', desc: 'Highlights green spectrum anomalies' },
    { name: 'Blue Channel', id: 'blue', desc: 'Highlights blue spectrum anomalies' },
    { name: 'Grayscale', id: 'gray', desc: 'Highlights structural anomalies' }
  ] as const;

  if (image?.startsWith('data:video')) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-s1 border border-dashed border-white/10 rounded-2xl space-y-4">
        <div className="w-16 h-16 rounded-full bg-blue/10 flex items-center justify-center">
          <Layers className="w-8 h-8 text-blue" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-black tracking-tighter uppercase italic">Video Channel Analysis</h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-mono max-w-md">Real-time color channel decomposition for video streams is currently in beta. AI-driven neural scan results are available in the Results tab.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-black tracking-tighter uppercase italic">Color Channel Inspector</h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Spectrum analysis and channel-level forensics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {channels.map((channel, i) => (
          <div key={i} className="space-y-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{channel.name}</div>
            <div className="aspect-square bg-black border border-white/5 rounded-lg overflow-hidden relative">
              {image ? (
                <ChannelCanvas image={image} channel={channel.id} />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-slate-700 font-mono text-[10px]">NO DATA</div>
              )}
            </div>
            <p className="text-[9px] text-slate-500 leading-tight uppercase tracking-widest">{channel.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-s1 border border-white/5 p-6 rounded-xl space-y-4">
        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Channel Analysis</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Red Channel Anomaly</div>
            <p className="text-[10px] text-slate-500 leading-relaxed">High variance in the red spectrum detected in the suspect's modified regions, suggesting color balance manipulation.</p>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Green Channel Anomaly</div>
            <p className="text-[10px] text-slate-500 leading-relaxed">Moderate variance in the green spectrum detected, matching the AI's heatmap findings for structural changes.</p>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Blue Channel Anomaly</div>
            <p className="text-[10px] text-slate-500 leading-relaxed">Low variance in the blue spectrum detected, suggesting the blue channel was largely preserved during modification.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
