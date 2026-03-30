import React from 'react';
import { motion } from 'motion/react';
import { 
  Gavel, 
  AlertTriangle, 
  TrendingUp, 
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';

interface Decision {
  action: string;
  reasoning: string;
  confidence: number;
}

export const DecisionEngine: React.FC<{ decision: Decision }> = ({ decision }) => {
  const getIcon = (action: string) => {
    if (action.includes('DMCA')) return <Gavel className="w-6 h-6 text-red" />;
    if (action.includes('ALERT')) return <AlertTriangle className="w-6 h-6 text-red" />;
    if (action.includes('MONETIZE')) return <TrendingUp className="w-6 h-6 text-gold" />;
    return <ShieldCheck className="w-6 h-6 text-green" />;
  };

  const getColor = (action: string) => {
    if (action.includes('DMCA')) return 'text-red border-red/20 bg-red/5';
    if (action.includes('ALERT')) return 'text-red border-red/20 bg-red/5';
    if (action.includes('MONETIZE')) return 'text-gold border-gold/20 bg-gold/5';
    return 'text-green border-green/20 bg-green/5';
  };

  return (
    <div className="glass rounded-2xl p-6 border-l-4 border-l-blue/30 overflow-hidden relative">
      <div className="scan-line" />
      <div className="flex items-start gap-6">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border ${getColor(decision.action)}`}>
          {getIcon(decision.action)}
        </div>
        <div className="space-y-4 flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-blue mb-1 flex items-center gap-2">
                <Zap className="w-3 h-3" /> AI Decision Engine
              </h3>
              <h2 className={`text-2xl font-black italic uppercase tracking-tighter ${getColor(decision.action).split(' ')[0]}`}>
                {decision.action}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-mono text-slate-500 uppercase mb-1">Confidence</p>
              <h4 className="text-xl font-black italic text-white">{Math.round(decision.confidence * 100)}%</h4>
            </div>
          </div>
          
          <div className="glass-blue rounded-xl p-4 border border-blue/10">
            <p className="text-sm text-slate-300 leading-relaxed italic">
              "{decision.reasoning}"
            </p>
          </div>
          
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-blue text-black text-[10px] font-black rounded-lg uppercase tracking-widest hover:bg-white transition-all">
              Execute Action
            </button>
            <button className="px-4 py-2 glass text-white text-[10px] font-black rounded-lg uppercase tracking-widest hover:bg-white/10 transition-all">
              Override
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
