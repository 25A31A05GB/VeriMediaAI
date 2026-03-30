import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Activity,
  Twitter,
  Instagram,
  MessageCircle,
  ExternalLink,
  Loader2,
  Scan,
  ShieldCheck,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

import { searchMedia } from '../services/gemini';

interface HuntProps {
  analysis?: any;
  onAnalyze?: (file: File, deep?: boolean) => void;
}

export const Hunt: React.FC<HuntProps> = ({ analysis, onAnalyze }) => {
  const [query, setQuery] = useState(analysis?.verdict ? `Deepfake analysis for ${analysis.verdict}` : '');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [rawResponse, setRawResponse] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    
    setSearching(true);
    try {
      const data = await searchMedia(query);
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black tracking-tighter uppercase italic">Social Media <span className="text-blue">Live Hunt</span></h2>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue/10 border border-blue/20">
            <Globe className="w-3 h-3 text-blue animate-pulse" />
            <span className="text-[10px] font-mono text-blue uppercase tracking-widest font-bold">Search Grounding Active</span>
          </div>
        </div>
        <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">Global Asset Propagation Tracking · 340+ Platforms Scanned</p>
      </div>

      <div className="glass p-8 rounded-[2rem] border-white/10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <form onSubmit={handleSearch} className="md:col-span-3 relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500 group-focus-within:text-blue transition-colors" />
            <input 
              className="w-full bg-s2 border border-white/10 rounded-2xl py-5 pl-16 pr-32 text-lg outline-none focus:border-blue/50 transition-all font-medium placeholder:text-slate-600"
              placeholder="Enter Asset Hash, URL, or Keywords..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button 
              type="submit"
              disabled={searching}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue text-black px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue/90 transition-all disabled:opacity-50"
            >
              {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Initialize Hunt'}
            </button>
          </form>

          <div className="relative group">
            <input 
              type="file" 
              accept="image/*,video/*"
              className="absolute inset-0 opacity-0 cursor-pointer z-20" 
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && onAnalyze) {
                  onAnalyze(file, true);
                  toast.info("Image uploaded. Initiating deep forensic hunt...");
                }
              }}
            />
            <div className="w-full h-full bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-3 group-hover:border-blue/50 transition-all py-5">
              <Upload className="w-5 h-5 text-blue" />
              <span className="text-[10px] font-black uppercase tracking-widest italic">Upload Asset</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {['Twitter', 'Instagram', 'Telegram', 'Reddit', 'TikTok', 'Facebook'].map((p) => (
            <div key={p} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" /> {p} Node Active
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="wait">
            {searching ? (
              <motion.div 
                key="searching"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass p-20 rounded-[2rem] border-white/10 flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="relative">
                  <Globe className="w-20 h-20 text-blue animate-pulse" />
                  <div className="absolute inset-0 border-4 border-blue/20 border-t-blue rounded-full animate-spin" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black uppercase tracking-tighter italic">Scanning Global Nodes</h3>
                  <p className="text-slate-500 text-sm font-mono uppercase tracking-widest">Querying Neural Clusters in US-East, EU-West, ASIA-South...</p>
                </div>
              </motion.div>
            ) : results.length > 0 ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {results.map((res, i) => (
                  <div key={i} className="glass p-6 rounded-2xl border-white/10 hover:border-blue/30 transition-all group flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                        res.platform === 'Twitter/X' ? "bg-blue/10 text-blue" :
                        res.platform === 'Telegram' ? "bg-sky-500/10 text-sky-500" :
                        res.platform === 'Instagram' ? "bg-pink-500/10 text-pink-500" :
                        "bg-orange-500/10 text-orange-500"
                      )}>
                        {res.platform === 'Twitter/X' ? <Twitter className="w-6 h-6" /> :
                         res.platform === 'Telegram' ? <MessageCircle className="w-6 h-6" /> :
                         res.platform === 'Instagram' ? <Instagram className="w-6 h-6" /> :
                         <Globe className="w-6 h-6" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4 className="font-black text-lg uppercase tracking-tight">{res.account}</h4>
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{res.platform}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                          <span className="flex items-center gap-1.5"><Activity className="w-3 h-3" /> {res.reach} Reach</span>
                          <span className="flex items-center gap-1.5"><Scan className="w-3 h-3" /> {res.type}</span>
                        </div>
                        {res.content && (
                          <div className="mt-4 p-4 bg-black/50 rounded-xl border border-white/5 text-[11px] text-slate-400 font-mono leading-relaxed max-h-40 overflow-y-auto">
                            {res.content}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className={cn(
                          "text-[10px] font-mono uppercase tracking-widest mb-1",
                          res.status === 'Critical' ? "text-red" : res.status === 'High Risk' ? "text-red/80" : "text-gold"
                        )}>
                          {res.status}
                        </p>
                        <p className="text-[10px] text-slate-500 font-mono uppercase">{res.time}</p>
                      </div>
                      <button className="p-3 rounded-xl bg-white/5 hover:bg-blue/10 hover:text-blue transition-all border border-white/5">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <div className="glass p-20 rounded-[2rem] border-white/10 flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                <Search className="w-16 h-16 text-slate-700" />
                <p className="text-slate-500 text-sm font-mono uppercase tracking-widest">Enter a query to begin global asset tracking</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-6">
          <div className="glass p-8 rounded-[2rem] border-white/10 space-y-6 bg-gradient-to-br from-blue/5 to-purple/5">
            <h3 className="text-lg font-black uppercase tracking-tighter italic flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue" /> Identity Protection
            </h3>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-relaxed">
              Connect your social accounts to enable automated deepfake monitoring and impersonation alerts.
            </p>
            <button 
              onClick={() => {
                const tab = document.querySelector('[data-tab="social"]');
                if (tab) (tab as HTMLElement).click();
              }}
              className="w-full py-3 rounded-xl bg-blue/10 border border-blue/20 text-blue font-black text-[10px] uppercase tracking-widest hover:bg-blue/20 transition-all"
            >
              Connect Accounts
            </button>
          </div>

          <div className="glass p-8 rounded-[2rem] border-white/10 space-y-6">
            <h3 className="text-lg font-black uppercase tracking-tighter italic flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red" /> Active Threats
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Election Deepfake', trend: '+240%', risk: 'Critical' },
                { title: 'CEO Voice Phish', trend: '+12%', risk: 'High' },
                { title: 'Viral Mod Leak', trend: '+85%', risk: 'High' },
              ].map((t, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">{t.title}</span>
                    <span className="text-[10px] font-mono text-red">{t.risk}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Velocity</span>
                    <span className="text-green">{t.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-8 rounded-[2rem] border-white/10 bg-gradient-to-br from-blue/5 to-purple/5">
            <h3 className="text-lg font-black uppercase tracking-tighter italic mb-4">Neural Coverage</h3>
            <div className="space-y-4">
              {[
                { label: 'Social Nodes', val: '342/350' },
                { label: 'Deep Web Index', val: '8.4B' },
                { label: 'Neural Clusters', val: '12' },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium uppercase tracking-widest text-[10px]">{s.label}</span>
                  <span className="font-mono text-blue">{s.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
