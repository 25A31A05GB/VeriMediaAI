import React from 'react';
import { motion } from 'motion/react';
import { 
  Upload, 
  ShieldAlert, 
  Share2, 
  Gavel, 
  AlertCircle,
  Clock
} from 'lucide-react';

export interface TimelineEvent {
  id: string;
  timestamp: string;
  type: "upload" | "detection" | "spread" | "action" | "alert";
  title: string;
  description: string;
  riskScore?: number;
  platform?: string;
}

const getIcon = (type: string) => {
  switch (type) {
    case 'upload': return <Upload className="w-4 h-4" />;
    case 'detection': return <ShieldAlert className="w-4 h-4" />;
    case 'spread': return <Share2 className="w-4 h-4" />;
    case 'action': return <Gavel className="w-4 h-4" />;
    case 'alert': return <AlertCircle className="w-4 h-4" />;
    default: return <Clock className="w-4 h-4" />;
  }
};

const getColor = (type: string, risk?: number) => {
  if (risk && risk > 70) return 'text-red border-red/20 bg-red/5';
  switch (type) {
    case 'upload': return 'text-blue border-blue/20 bg-blue/5';
    case 'detection': return 'text-green border-green/20 bg-green/5';
    case 'spread': return 'text-gold border-gold/20 bg-gold/5';
    case 'action': return 'text-red border-red/20 bg-red/5';
    case 'alert': return 'text-red border-red/20 bg-red/5';
    default: return 'text-slate-500 border-slate-500/20 bg-slate-500/5';
  }
};

export const Timeline: React.FC<{ events: TimelineEvent[] }> = ({ events }) => {
  return (
    <div className="space-y-4 p-4">
      <h3 className="text-xs font-mono uppercase tracking-widest text-blue mb-6 flex items-center gap-2">
        <Clock className="w-3 h-3" /> Forensic Event Timeline
      </h3>
      <div className="relative border-l border-slate-800 ml-2 space-y-8">
        {events.map((event, idx) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative pl-8"
          >
            <div className={`absolute -left-3 top-0 w-6 h-6 rounded-full border flex items-center justify-center z-10 ${getColor(event.type, event.riskScore)}`}>
              {getIcon(event.type)}
            </div>
            <div className="glass rounded-xl p-4 border-l-2 border-l-blue/30 group hover:border-l-blue transition-all">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-bold text-white">{event.title}</h4>
                <span className="text-[10px] font-mono text-slate-500">
                  {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{event.description}</p>
              {event.riskScore !== undefined && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${event.riskScore > 70 ? 'bg-red' : 'bg-blue'}`}
                      style={{ width: `${event.riskScore}%` }}
                    />
                  </div>
                  <span className={`text-[10px] font-mono ${event.riskScore > 70 ? 'text-red' : 'text-blue'}`}>
                    {event.riskScore}% RISK
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
