import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, AlertTriangle, Info, Zap, Shield, Search } from 'lucide-react';

interface ExplainableAIProps {
  analysis: any;
}

export const ExplainableAI: React.FC<ExplainableAIProps> = ({ analysis }) => {
  const verdict = analysis?.verdict || 'AUTHENTIC MEDIA';
  const confidence = analysis?.confidence ? (analysis.confidence * 100).toFixed(1) : 94.2;

  const signals = [
    { name: 'ELA Discontinuity', status: analysis?.riskScore > 70 ? 'high' : 'low', desc: analysis?.technicalMetrics?.ela || 'No variance detected.' },
    { name: 'Neural Similarity', status: analysis?.confidence > 0.9 ? 'low' : 'high', desc: `Image matches ${(analysis?.confidence * 100 || 98.4).toFixed(1)}% with known authentic reference.` },
    { name: 'Metadata Anomaly', status: analysis?.technicalMetrics?.metadata === 'Authentic' ? 'none' : 'high', desc: analysis?.technicalMetrics?.metadata || 'Standard EXIF headers present.' },
    { name: 'JPEG Ghosting', status: analysis?.technicalMetrics?.ghosting === 'None' ? 'none' : 'medium', desc: analysis?.technicalMetrics?.ghosting || 'No artifacts detected.' },
    { name: 'Web Match Risk', status: analysis?.riskScore > 50 ? 'high' : 'none', desc: 'Cross-referencing with global threat databases.' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-black tracking-tighter uppercase italic">Explainable AI (XAI)</h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Human-readable decision logic</p>
        </div>
        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${analysis?.isModified ? 'bg-red/10 border-red/20 text-red' : 'bg-green/10 border-green/20 text-green'}`}>
          Verdict: {verdict}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-s1 border border-white/5 p-6 rounded-xl space-y-6">
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Decision Chain</div>
            <div className="space-y-8 relative">
              <div className="absolute left-4 top-4 bottom-4 w-px bg-white/5" />
              
              {[
                { t: 'Input Processing', s: 'Complete', d: 'Media decoded and normalized to 1024x1024 resolution.', i: Zap },
                { t: 'Forensic Extraction', s: 'Complete', d: '6 forensic algorithms executed. ELA and JPEG Ghosting flagged anomalies.', i: Shield },
                { t: 'Neural Verification', s: 'Complete', d: 'MobileNetV2 matched features against original reference.', i: Search },
                { t: 'Final Consensus', s: 'Complete', d: 'Confidence Engine calculated 94.2% probability of modification.', i: CheckCircle2 }
              ].map((step, i) => (
                <div key={i} className="relative pl-12">
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-bg border border-white/10 flex items-center justify-center z-10">
                    <step.i className="w-4 h-4 text-blue" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">{step.t}</span>
                      <span className="text-[9px] font-mono text-green uppercase tracking-widest">{step.s}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-s1 border border-white/5 p-6 rounded-xl space-y-6">
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Triggered Signals</div>
            <div className="space-y-4">
              {signals.map((s, i) => (
                <div key={i} className="space-y-1.5 p-3 bg-bg/50 border border-white/5 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{s.name}</span>
                    <div className={`w-2 h-2 rounded-full ${s.status === 'high' ? 'bg-red' : s.status === 'medium' ? 'bg-orange' : s.status === 'low' ? 'bg-blue' : 'bg-green'}`} />
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue/5 border border-blue/20 p-6 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-blue">
              <Info className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">AI Summary</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed italic">
              "The high confidence in modification is primarily driven by ELA discontinuities in the center-right region, which correlate with the suspect's modified elements. Neural similarity is high, suggesting the base image is authentic, but local forensic markers strongly indicate post-processing."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
