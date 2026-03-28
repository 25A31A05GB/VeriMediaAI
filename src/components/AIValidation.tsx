import React from 'react';
import { motion } from 'motion/react';
import { Zap, Shield, Search, Layers, Brain, Cpu, BarChart3, TrendingUp, Target } from 'lucide-react';

export const AIValidation: React.FC = () => {
  const metrics = [
    { name: 'ACCURACY', value: 99.2, icon: Target, color: 'blue' },
    { name: 'PRECISION', value: 98.8, icon: Zap, color: 'purple' },
    { name: 'RECALL', value: 99.5, icon: Shield, color: 'green' },
    { name: 'F1 SCORE', value: 99.1, icon: Brain, color: 'blue' }
  ];

  const categories = [
    { name: 'Deepfake Detection', accuracy: 99.4, samples: 12400 },
    { name: 'Image Modification', accuracy: 98.9, samples: 8600 },
    { name: 'Metadata Forgery', accuracy: 99.8, samples: 4200 },
    { name: 'Neural Similarity', accuracy: 99.1, samples: 15800 }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-black tracking-tighter uppercase italic">AI Validation</h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Model performance and benchmarks</p>
        </div>
        <div className="bg-blue/10 border border-blue/20 px-3 py-1 rounded-full text-blue text-[10px] font-mono uppercase tracking-widest animate-pulse">
          Validation v2.1 Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-s1 border border-white/5 p-6 rounded-xl space-y-4 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-blue/5 rounded-full blur-2xl group-hover:bg-blue/10 transition-colors" />
            <div className="flex items-center justify-between relative z-10">
              <m.icon className={`w-5 h-5 text-${m.color}`} />
              <div className="flex items-center gap-1 text-green text-[10px] font-mono">
                <TrendingUp className="w-3 h-3" />
                +0.2%
              </div>
            </div>
            <div className="space-y-1 relative z-10">
              <div className="text-3xl font-black tracking-tighter uppercase italic text-white">{m.value}%</div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{m.name}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-s1 border border-white/5 p-8 rounded-xl space-y-8">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Confusion Matrix</div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue" />
                <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500">True Positive</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red" />
                <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500">False Positive</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-bg/50 border border-white/5 p-6 rounded-lg text-center space-y-2">
                <div className="text-4xl font-black text-blue tracking-tighter italic">99.2%</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">True Positive Rate</div>
              </div>
              <div className="bg-bg/50 border border-white/5 p-6 rounded-lg text-center space-y-2">
                <div className="text-4xl font-black text-red tracking-tighter italic">0.8%</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">False Negative Rate</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-bg/50 border border-white/5 p-6 rounded-lg text-center space-y-2">
                <div className="text-4xl font-black text-red tracking-tighter italic">1.2%</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">False Positive Rate</div>
              </div>
              <div className="bg-bg/50 border border-white/5 p-6 rounded-lg text-center space-y-2">
                <div className="text-4xl font-black text-blue tracking-tighter italic">98.8%</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">True Negative Rate</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-s1 border border-white/5 p-8 rounded-xl space-y-8">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Category Accuracy</div>
          <div className="space-y-6">
            {categories.map((c, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{c.name}</span>
                  <span className="text-[10px] font-mono text-blue">{c.accuracy}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${c.accuracy}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="h-full bg-blue"
                  />
                </div>
                <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{c.samples.toLocaleString()} Samples Tested</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
