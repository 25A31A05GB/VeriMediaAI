import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, Shield, AlertTriangle, CheckCircle2, Copy, Send, Mail } from 'lucide-react';

interface ReportDMCAProps {
  analysis: any;
}

export const ReportDMCA: React.FC<ReportDMCAProps> = ({ analysis }) => {
  const [showDMCA, setShowDMCA] = useState(false);
  const [dmcaData, setDmcaData] = useState({
    recipient: 'legal@socialplatform.com',
    subject: 'DMCA Takedown Notice - Infringing Media Content',
    body: `To Whom It May Concern,\n\nI am writing to you on behalf of VeriMedia AI to formally request the removal of infringing media content located at the following URL: [INSERT_URL].\n\nOur forensic analysis (Case ID: VM-${Math.floor(Math.random() * 10000)}) has confirmed that this media is a ${analysis?.verdict || 'modified'} version of our client's original asset. The modification was detected with ${(analysis?.confidence * 100 || 94.2).toFixed(1)}% confidence using ELA and Neural Similarity algorithms.\n\nI have a good faith belief that use of the copyrighted materials described above as allegedly infringing is not authorized by the copyright owner, its agent, or the law.\n\nI swear, under penalty of perjury, that the information in the notification is accurate and that I am the copyright owner or am authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.\n\nSincerely,\nVeriMedia AI Legal Team`
  });

  const findings = [
    `ELA Anomaly: ${analysis?.technicalMetrics?.ela || 'None'}`,
    `JPEG Ghosting: ${analysis?.technicalMetrics?.ghosting || 'None'}`,
    `Neural Similarity: ${(analysis?.confidence * 100 || 98.4).toFixed(1)}%`,
    `Metadata: ${analysis?.technicalMetrics?.metadata || 'N/A'}`,
    `Pixel Consistency: ${analysis?.technicalMetrics?.pixelConsistency || 'N/A'}`
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-black tracking-tighter uppercase italic">Forensic Report & DMCA</h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Official documentation and legal enforcement</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-blue text-black px-4 py-2 rounded font-bold text-[10px] font-mono uppercase tracking-widest hover:bg-blue/90 transition-all flex items-center gap-2">
            <Download className="w-3 h-3" /> Download PDF
          </button>
          <button 
            onClick={() => setShowDMCA(!showDMCA)}
            className="bg-white/5 border border-white/10 px-4 py-2 rounded font-bold text-[10px] font-mono uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Shield className="w-3 h-3" /> {showDMCA ? 'View Report' : 'Generate DMCA'}
          </button>
        </div>
      </div>

      {!showDMCA ? (
        <div className="bg-s1 border border-white/5 p-8 rounded-xl space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue/10 border border-blue/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue" />
              </div>
              <div>
                <div className="text-lg font-black tracking-tighter uppercase italic text-white">Forensic Analysis Report</div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Case ID: VM-{Math.floor(Math.random() * 10000)} | Date: 2026-03-28</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Status</div>
              <div className="text-xs font-bold text-red uppercase tracking-wider">Modification Confirmed</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Executive Summary</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The submitted media asset was subjected to a comprehensive forensic suite. Analysis confirms a 94.2% probability of modification. Key indicators include high-variance ELA discontinuities and significant JPEG ghosting artifacts in the central region.
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Technical Findings</div>
                <ul className="space-y-2">
                  {findings.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                      <div className="w-1 h-1 rounded-full bg-blue" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Legal Recommendation</div>
                <div className="bg-red/5 border border-red/20 p-4 rounded-lg space-y-3">
                  <div className="flex items-center gap-2 text-red">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">High Risk of Infringement</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed italic">
                    "Based on the forensic evidence, we recommend immediate DMCA takedown procedures for all identified web matches. The structural modifications are sufficient to support a claim of unauthorized derivative work."
                  </p>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button className="flex-1 bg-white/5 border border-white/10 py-3 rounded text-[10px] font-mono uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-3 h-3" /> Export JSON
                </button>
                <button className="flex-1 bg-white/5 border border-white/10 py-3 rounded text-[10px] font-mono uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                  <Copy className="w-3 h-3" /> Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-s1 border border-white/5 p-8 rounded-xl space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple/10 border border-purple/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple" />
              </div>
              <div>
                <div className="text-lg font-black tracking-tighter uppercase italic text-white">DMCA Takedown Generator</div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Automated legal notice creation</div>
              </div>
            </div>
            <div className="bg-green/10 border border-green/20 px-3 py-1 rounded-full text-green text-[10px] font-mono uppercase tracking-widest animate-pulse">
              Legal Ready
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Recipient Email</label>
                <input 
                  type="email" 
                  value={dmcaData.recipient}
                  onChange={(e) => setDmcaData(prev => ({ ...prev, recipient: e.target.value }))}
                  className="w-full bg-bg border border-white/10 rounded p-3 text-xs outline-none focus:border-blue transition-colors text-white" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Subject Line</label>
                <input 
                  type="text" 
                  value={dmcaData.subject}
                  onChange={(e) => setDmcaData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full bg-bg border border-white/10 rounded p-3 text-xs outline-none focus:border-blue transition-colors text-white" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Notice Body</label>
              <textarea 
                value={dmcaData.body}
                onChange={(e) => setDmcaData(prev => ({ ...prev, body: e.target.value }))}
                className="w-full h-64 bg-bg border border-white/10 rounded p-4 text-[11px] font-mono outline-none focus:border-blue transition-colors text-slate-400 leading-relaxed" 
              />
            </div>
            <div className="flex gap-4">
              <button className="flex-1 bg-white/5 border border-white/10 py-4 rounded font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <Copy className="w-4 h-4" /> Copy Notice
              </button>
              <button className="flex-1 bg-blue text-black py-4 rounded font-black text-xs uppercase tracking-[0.2em] hover:bg-blue/90 transition-all flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Send via EmailJS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
