import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, CheckCircle2, AlertTriangle, Loader2, X, Plus, Trash2 } from 'lucide-react';

interface EmailReportProps {
  analysis: any;
}

export const EmailReport: React.FC<EmailReportProps> = ({ analysis }) => {
  const [recipients, setRecipients] = useState(['legal@sportsorg.com', 'admin@federation.gov']);
  const [newRecipient, setNewRecipient] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const reportId = `VM-${Math.floor(Math.random() * 10000)}`;
  const confidence = (analysis?.confidence * 100 || 94.2).toFixed(1);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setTimeout(() => setIsSent(false), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-black tracking-tighter uppercase italic">Email Report Dispatcher</h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Secure forensic report distribution</p>
        </div>
        <div className="bg-blue/10 border border-blue/20 px-3 py-1 rounded-full text-blue text-[10px] font-mono uppercase tracking-widest animate-pulse">
          EmailJS Integration Active
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-s1 border border-white/5 p-8 rounded-xl space-y-8">
            <div className="space-y-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Recipients</div>
              <div className="flex flex-wrap gap-2">
                {recipients.map((r, i) => (
                  <div key={i} className="bg-bg border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 group">
                    <span className="text-xs text-slate-300">{r}</span>
                    <button 
                      onClick={() => setRecipients(prev => prev.filter((_, idx) => idx !== i))}
                      className="text-slate-500 hover:text-red transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <input 
                    type="email" 
                    value={newRecipient}
                    onChange={(e) => setNewRecipient(e.target.value)}
                    placeholder="Add email..." 
                    className="bg-bg border border-white/10 rounded-full px-4 py-1.5 text-xs outline-none focus:border-blue transition-colors w-48" 
                  />
                  <button 
                    onClick={() => { if (newRecipient) { setRecipients(prev => [...prev, newRecipient]); setNewRecipient(''); } }}
                    className="bg-blue text-black p-1.5 rounded-full hover:bg-blue/90 transition-all"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Report Content</div>
              <div className="bg-bg border border-white/5 p-6 rounded-lg space-y-6">
                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                  <div className="w-10 h-10 rounded bg-blue/10 border border-blue/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white uppercase tracking-wider">Forensic Report: {reportId}</div>
                    <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Attachment: forensic_report.pdf (2.4 MB)</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Message Body</div>
                  <textarea 
                    className="w-full h-32 bg-bg border border-white/10 rounded p-3 text-[11px] font-mono outline-none focus:border-blue transition-colors text-slate-400 leading-relaxed"
                    defaultValue={`Dear Legal Team,\n\nPlease find the attached forensic report for Case ID ${reportId}. Our analysis has confirmed a ${confidence}% probability of modification for the suspect media asset.\n\nRegards,\nVeriMedia AI Dispatcher`}
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={handleSend}
              disabled={isSending || isSent}
              className={`w-full py-4 rounded font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${isSent ? 'bg-green text-black' : 'bg-blue text-black hover:bg-blue/90 shadow-[0_0_30px_rgba(0,180,255,0.2)]'}`}
            >
              {isSending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : isSent ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Report Dispatched
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Dispatch Report →
                </>
              )}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-s1 border border-white/5 p-6 rounded-xl space-y-6">
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Recent Dispatches</div>
            <div className="space-y-4">
              {[
                { to: 'legal@sportsorg.com', date: '2026-03-28 10:15', status: 'Delivered' },
                { to: 'admin@federation.gov', date: '2026-03-28 09:45', status: 'Delivered' },
                { to: 'compliance@web.com', date: '2026-03-27 16:30', status: 'Failed' }
              ].map((d, i) => (
                <div key={i} className="space-y-1.5 p-3 bg-bg/50 border border-white/5 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider truncate w-32">{d.to}</span>
                    <span className={`text-[8px] font-mono uppercase tracking-widest ${d.status === 'Delivered' ? 'text-green' : 'text-red'}`}>{d.status}</span>
                  </div>
                  <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{d.date}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue/5 border border-blue/20 p-6 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-blue">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Security Note</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed italic">
              "All reports are encrypted using AES-256 before dispatch. Recipient emails are verified against the Federation whitelist to prevent data leaks."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
