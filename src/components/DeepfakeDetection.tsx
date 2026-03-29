import React from 'react';
import { 
  ShieldAlert, 
  Cpu, 
  Eye, 
  Zap, 
  Scan, 
  AlertTriangle, 
  CheckCircle2,
  Layers,
  Search,
  Maximize2
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface DeepfakeDetectionProps {
  analysis: any;
  selectedImage: string | null;
}

export const DeepfakeDetection: React.FC<DeepfakeDetectionProps> = ({ analysis, selectedImage }) => {
  if (!analysis) return null;

  const isDeepfake = analysis.riskScore > 50;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tighter uppercase italic flex items-center gap-3">
            <ShieldAlert className={cn("w-8 h-8", isDeepfake ? "text-red" : "text-green")} />
            Deepfake Detection <span className="text-blue">Engine</span>
          </h2>
          <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mt-1">
            Neural Artifact & Manipulation Analysis v4.2
          </p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center">
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Risk Level</span>
            <span className={cn("text-xl font-black italic", isDeepfake ? "text-red" : "text-green")}>
              {isDeepfake ? 'CRITICAL' : 'LOW'}
            </span>
          </div>
          <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center">
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Confidence</span>
            <span className="text-xl font-black italic text-blue">
              {(analysis.confidence * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Visual Evidence Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-2xl overflow-hidden border-white/10 relative group">
            <div className="absolute top-4 left-4 z-20 flex gap-2">
              <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-widest text-blue flex items-center gap-2">
                <Eye className="w-3 h-3" /> Visual Evidence Map
              </span>
              {isDeepfake && (
                <span className="px-3 py-1 rounded-full bg-red/20 backdrop-blur-md border border-red/30 text-[10px] font-mono uppercase tracking-widest text-red flex items-center gap-2 animate-pulse">
                  <AlertTriangle className="w-3 h-3" /> Manipulation Detected
                </span>
              )}
            </div>
            
            <div className="aspect-video bg-black flex items-center justify-center relative overflow-hidden">
              {selectedImage?.startsWith('data:video') ? (
                <video 
                  src={selectedImage} 
                  className="max-w-full max-h-full object-contain" 
                  controls 
                  autoPlay 
                  muted 
                  loop 
                />
              ) : (
                <img src={selectedImage!} className="max-w-full max-h-full object-contain" alt="Deepfake Scan" />
              )}
              
              {/* Anomaly Overlays */}
              <div className="absolute inset-0 pointer-events-none">
                {analysis.anomalies?.map((anomaly: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.8 }}
                    className="absolute border-2 border-red shadow-[0_0_20px_rgba(255,59,92,0.5)] flex items-center justify-center"
                    style={{
                      left: `${anomaly.x}%`,
                      top: `${anomaly.y}%`,
                      width: `${anomaly.radius * 2}%`,
                      height: `${anomaly.radius * 2}%`,
                      transform: 'translate(-50%, -50%)',
                      borderRadius: anomaly.type === 'Face' ? '50%' : '4px'
                    }}
                  >
                    <div className="absolute -top-6 left-0 bg-red text-white text-[8px] font-mono px-2 py-0.5 rounded uppercase tracking-widest whitespace-nowrap">
                      {anomaly.type} Artifact
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-2">
                  <button className="p-2 rounded bg-white/10 hover:bg-white/20 text-white transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded bg-white/10 hover:bg-white/20 text-white transition-colors">
                    <Layers className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest">
                  Frame: 1242 / 4820 · Neural Scan Active
                </div>
              </div>
            </div>
          </div>

          {/* Explainable AI Reasoning */}
          <div className="glass p-8 rounded-2xl border-white/10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center border border-blue/20">
                <Cpu className="w-6 h-6 text-blue" />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tighter uppercase italic">Neural Reasoning Engine</h3>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Deep Learning Decision Path</p>
              </div>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4">
              <p className="text-sm text-slate-300 leading-relaxed italic">
                "{analysis.explainableAI?.reasoning || 'No reasoning available for this analysis.'}"
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(analysis.explainableAI?.modelConfidence || {}).map(([layer, val]: [string, any]) => (
                  <div key={layer} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-slate-500">
                      <span>{layer}</span>
                      <span>{(val * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-blue"
                        initial={{ width: 0 }}
                        animate={{ width: `${val * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Search className="w-3 h-3 text-blue" /> Identified Visual Cues
                </h4>
                <div className="space-y-2">
                  {analysis.explainableAI?.visualCues?.map((cue: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue shadow-[0_0_8px_rgba(0,180,255,0.5)]" />
                      <span className="text-xs text-slate-300 font-medium">{cue}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Zap className="w-3 h-3 text-gold" /> Neural Artifacts
                </h4>
                <div className="space-y-2">
                  {analysis.findings?.slice(0, 4).map((finding: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(255,184,0,0.5)]" />
                      <span className="text-xs text-slate-300 font-medium">{finding}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Sidebar */}
        <div className="space-y-6">
          {/* Verdict Summary */}
          <div className={cn(
            "glass p-8 rounded-2xl border-2 text-center space-y-6",
            isDeepfake ? "border-red/50 bg-red/5" : "border-green/50 bg-green/5"
          )}>
            <div className="inline-flex p-4 rounded-full bg-white/5">
              {isDeepfake ? <AlertTriangle className="w-10 h-10 text-red" /> : <CheckCircle2 className="w-10 h-10 text-green" />}
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">Detection Result</p>
              <h3 className={cn("text-3xl font-black tracking-tighter uppercase italic", isDeepfake ? "text-red" : "text-green")}>
                {analysis.verdict}
              </h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-black/20 border border-white/5 text-left">
                <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest mb-2">Manipulation Probability</div>
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-black italic text-white">{analysis.riskScore}%</div>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className={cn("h-full", isDeepfake ? "bg-red" : "bg-green")}
                      initial={{ width: 0 }}
                      animate={{ width: `${analysis.riskScore}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Forensic Metrics */}
          <div className="glass p-6 rounded-2xl border-white/10 space-y-6">
            <h3 className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Forensic Metrics</h3>
            <div className="space-y-4">
              {Object.entries(analysis.technicalMetrics || {}).map(([key, val]: [string, any]) => (
                <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                  <div className="space-y-1">
                    <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">{key}</div>
                    <div className="text-xs font-bold text-white">{val}</div>
                  </div>
                  <div className={cn(
                    "px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-widest",
                    val.toLowerCase().includes('critical') || val.toLowerCase().includes('detected') ? "bg-red/10 text-red" : "bg-blue/10 text-blue"
                  )}>
                    {val.toLowerCase().includes('critical') ? 'Alert' : 'Stable'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Panel */}
          <div className="glass p-6 rounded-2xl bg-gradient-to-br from-blue/10 to-purple/10 border-blue/20 space-y-4">
            <div className="flex items-center gap-3">
              <Scan className="w-5 h-5 text-blue" />
              <h3 className="font-black text-xs uppercase tracking-widest">Deepfake Response</h3>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              This asset shows significant neural artifacts consistent with GAN-based generation. We recommend immediate hashing and DMCA filing.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-blue text-black py-2 rounded font-black text-[8px] uppercase tracking-widest hover:bg-blue/90 transition-all">
                Hash Evidence
              </button>
              <button className="bg-red text-white py-2 rounded font-black text-[8px] uppercase tracking-widest hover:bg-red/90 transition-all">
                File DMCA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
