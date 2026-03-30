import React from 'react';
import { motion } from 'motion/react';
import { 
  Info, 
  ShieldAlert, 
  Activity, 
  Zap, 
  Search,
  CheckCircle2
} from 'lucide-react';

interface Explanation {
  forensicReasons: string[];
  technicalExplanation: string;
  confidenceBreakdown: string;
}

export const ExplainableAI: React.FC<{ explanation: Explanation }> = ({ explanation }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-blue/10 border border-blue/20 flex items-center justify-center">
          <Info className="w-5 h-5 text-blue" />
        </div>
        <div>
          <h2 className="text-xl font-black italic tracking-tighter uppercase text-white">Forensic Explanation</h2>
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Explainable AI Layer (XAI)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Forensic Reasons */}
        <div className="glass rounded-2xl p-6 border border-white/5 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-blue flex items-center gap-2">
            <Search className="w-3 h-3" /> Key Forensic Indicators
          </h3>
          <ul className="space-y-3">
            {explanation.forensicReasons.map((reason, idx) => (
              <motion.li 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3 text-xs text-slate-300 leading-relaxed"
              >
                <div className="w-4 h-4 rounded-full bg-blue/10 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-blue" />
                </div>
                {reason}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Confidence Breakdown */}
        <div className="glass rounded-2xl p-6 border border-white/5 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-blue flex items-center gap-2">
            <Activity className="w-3 h-3" /> Confidence Breakdown
          </h3>
          <div className="glass-blue rounded-xl p-4 border border-blue/10">
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "{explanation.confidenceBreakdown}"
            </p>
          </div>
          <div className="space-y-3">
            {[
              { label: "Neural Consistency", value: 94 },
              { label: "Metadata Integrity", value: 82 },
              { label: "Temporal Sync", value: 76 }
            ].map((stat, idx) => (
              <div key={stat.label} className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono uppercase">
                  <span className="text-slate-500">{stat.label}</span>
                  <span className="text-blue">{stat.value}%</span>
                </div>
                <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue"
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.value}%` }}
                    transition={{ duration: 1.5, delay: idx * 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Deep Dive */}
      <div className="glass rounded-2xl p-6 border border-white/5 space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-widest text-blue flex items-center gap-2">
          <Zap className="w-3 h-3" /> Technical Forensic Summary
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed font-light">
          {explanation.technicalExplanation}
        </p>
      </div>
    </div>
  );
};
