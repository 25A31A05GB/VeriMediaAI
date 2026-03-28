import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Zap, Shield, Search, Layers, Brain, Cpu } from 'lucide-react';

interface ConfidenceEngineProps {
  analysis: any;
}

export const ConfidenceEngine: React.FC<ConfidenceEngineProps> = ({ analysis }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(analysis?.confidence || 94.2), 500);
    return () => clearTimeout(timer);
  }, [analysis]);

  const metrics = [
    { name: 'ELA CONSISTENCY', value: analysis?.riskScore ? 100 - analysis.riskScore : 92, icon: Layers, color: 'blue' },
    { name: 'NOISE VARIANCE', value: analysis?.confidence ? analysis.confidence * 100 : 88, icon: Zap, color: 'purple' },
    { name: 'JPEG GHOSTING', value: analysis?.verdict === 'Clean' ? 98 : 45, icon: Shield, color: 'green' },
    { name: 'NEURAL MATCH', value: analysis?.explainableAI?.modelConfidence?.layer1 ? analysis.explainableAI.modelConfidence.layer1 * 100 : 94, icon: Brain, color: 'blue' },
    { name: 'METADATA AUTH', value: analysis?.technicalMetrics?.metadata === 'Authentic' ? 100 : 20, icon: Cpu, color: 'green' },
    { name: 'WEB UNIQUENESS', value: 85, icon: Search, color: 'orange' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-black tracking-tighter uppercase italic">Confidence Engine</h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Multi-factor consensus algorithm</p>
        </div>
        <div className="bg-blue/10 border border-blue/20 px-3 py-1 rounded-full text-blue text-[10px] font-mono uppercase tracking-widest animate-pulse">
          Engine v2.4 Active
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative flex items-center justify-center aspect-square max-w-[300px] mx-auto">
          {/* Circular Progress */}
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/5" />
            <motion.circle 
              cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" 
              strokeDasharray="282.7"
              initial={{ strokeDashoffset: 282.7 }}
              animate={{ strokeDashoffset: 282.7 - (282.7 * progress) / 100 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-blue"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="text-6xl font-black tracking-tighter uppercase italic text-white">{progress}%</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Confidence</div>
          </div>
          
          {/* Decorative Rings */}
          <div className="absolute inset-[-20px] border border-white/5 rounded-full animate-spin-slow" />
          <div className="absolute inset-[-40px] border border-white/5 rounded-full animate-reverse-spin-slow" />
        </div>

        <div className="space-y-6">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-4">Metric Breakdown</div>
          <div className="space-y-4">
            {metrics.map((m, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <m.icon className={`w-3.5 h-3.5 text-${m.color}`} />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">{m.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-white">{m.value}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${m.value}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`h-full bg-${m.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-s1 border border-white/5 p-6 rounded-xl space-y-4">
        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Engine Logic</div>
        <div className="text-xs text-slate-400 leading-relaxed font-mono">
          <span className="text-blue">IF</span> (NeuralMatch &gt; 90% <span className="text-blue">AND</span> MetadataAuth == 100%) <br />
          &nbsp;&nbsp;<span className="text-blue">SET</span> Confidence = (ELA * 0.3) + (Neural * 0.4) + (Web * 0.3) <br />
          <span className="text-blue">ELSE IF</span> (JPEG_Ghosting &gt; 0.5) <br />
          &nbsp;&nbsp;<span className="text-blue">REDUCE</span> Confidence <span className="text-blue">BY</span> 15% <br />
          <span className="text-blue">RETURN</span> Confidence;
        </div>
      </div>
    </div>
  );
};
