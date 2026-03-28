import React, { useState, useEffect } from 'react';
import { Shield, Zap, Scan, Globe, Lock, ChevronRight, CheckCircle2, Check, X, Play, ArrowRight, Mail, Star, Activity, History, FileText, Cpu, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface LandingProps {
  onGetAccess: (plan: string, price: string) => void;
  onLogin: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onGetAccess, onLogin }) => {
  const [annualBilling, setAnnualBilling] = useState(false);
  const [wlCount, setWlCount] = useState(247);
  const [videoUrl, setVideoUrl] = useState('');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isWaitlistSubmitted, setIsWaitlistSubmitted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.15) {
        setWlCount(prev => prev + 1);
      }
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const prices = {
    starter: { mo: '$899', yr: '$719' },
    pro: { mo: '$3,499', yr: '$2,799' }
  };

  const getEmbedUrl = (url: string) => {
    let m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (m) return `https://www.youtube.com/embed/${m[1]}?autoplay=0&rel=0&modestbranding=1`;
    m = url.match(/vimeo\.com\/(\d+)/);
    if (m) return `https://player.vimeo.com/video/${m[1]}?title=0&byline=0&portrait=0`;
    m = url.match(/loom\.com\/share\/([a-f0-9]+)/);
    if (m) return `https://www.loom.com/embed/${m[1]}`;
    return null;
  };

  const embedUrl = videoUrl ? getEmbedUrl(videoUrl) : null;

  return (
    <div className="min-h-screen bg-bg text-text font-sans selection:bg-blue/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-bg/90 border-b border-white/10 h-16 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue animate-pulse" />
            <span className="font-bold text-2xl tracking-tighter uppercase italic">
              VeriMedia <span className="text-blue">AI</span>
              <sup className="text-[10px] text-green ml-1 font-mono not-italic tracking-widest">v2</sup>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-blue transition-colors">Features</a>
            <a href="#pricing" className="text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-blue transition-colors">Pricing</a>
            <a href="#waitlist" className="text-xs font-mono uppercase tracking-widest text-green hover:text-green/80 transition-colors">Early Access</a>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onLogin} className="text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Login</button>
            <button 
              onClick={() => onGetAccess('PRO LEAGUE', annualBilling ? prices.pro.yr : prices.pro.mo)}
              className="bg-blue text-black px-6 py-2 rounded-md font-bold text-xs uppercase tracking-widest hover:bg-blue/90 transition-all shadow-[0_0_20px_rgba(0,180,255,0.3)]"
            >
              Get Access →
            </button>
          </div>
        </div>
      </nav>

      {/* Ticker */}
      <div className="mt-16 bg-blue/5 border-b border-white/5 h-10 flex items-center overflow-hidden whitespace-nowrap">
        <div className="flex animate-ticker">
          {[1, 2].map(i => (
            <div key={i} className="flex items-center gap-12 px-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue animate-ping" /> AI ENGINE v2 ACTIVE
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">TRIPLE HASH CONSENSUS <b className="text-blue">ONLINE</b></span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">MOBILENET NEURAL <b className="text-blue">LOADED</b></span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">SSIM ENGINE <b className="text-blue">READY</b></span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">BING VISUAL SEARCH <b className="text-blue">INTEGRATED</b></span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">DMCA GENERATOR <b className="text-blue">ENABLED</b></span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">CASE HISTORY <b className="text-blue">SYNCED</b></span>
            </div>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,180,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,180,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue/10 border border-blue/20 text-blue text-[10px] font-mono uppercase tracking-[0.2em]"
            >
              <Zap className="w-3 h-3" /> Real AI · Triple Hash · Neural · Web Search
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase italic"
            >
              <span className="text-blue">VeriMedia</span><br />
              <span className="text-slate-500">AI</span><br />
              <span className="text-3xl md:text-5xl text-purple tracking-normal normal-case font-bold block mt-4 italic">Digital Asset War Room</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg max-w-xl leading-relaxed"
            >
              The most advanced AI image forensics platform ever built. Triple perceptual hash consensus, SSIM, MobileNet neural embeddings, and real Bing web search.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button 
                onClick={() => onGetAccess('PRO LEAGUE', annualBilling ? prices.pro.yr : prices.pro.mo)}
                className="bg-blue text-black px-8 py-4 rounded-md font-bold text-sm uppercase tracking-widest hover:bg-blue/90 transition-all shadow-[0_0_30px_rgba(0,180,255,0.4)]"
              >
                Launch War Room →
              </button>
              <button className="border border-white/20 text-white px-8 py-4 rounded-md font-bold text-sm uppercase tracking-widest hover:border-blue hover:text-blue transition-all">
                Start Free Trial
              </button>
            </motion.div>
            
            <div className="grid grid-cols-4 gap-8 pt-12 border-t border-white/5">
              {[
                { n: '3x', l: 'Hash Consensus' },
                { n: 'SSIM', l: 'Industry Standard' },
                { n: 'Neural', l: 'MobileNet AI' },
                { n: 'Auto', l: 'DMCA Generator' }
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl font-black text-blue tracking-tighter uppercase italic">{s.n}</div>
                  <div className="text-[9px] font-mono uppercase tracking-widest text-slate-500 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-4">
            {[
              { icon: '🧬', title: 'Triple Hash (dHash + pHash + aHash)', sub: 'Consensus scoring across 3 algorithms' },
              { icon: '📐', title: 'SSIM + Histogram Analysis', sub: 'Industry-standard structural similarity' },
              { icon: '🤖', title: 'MobileNet Neural Embeddings', sub: 'Deep feature comparison via TensorFlow.js' },
              { icon: '✂️', title: 'Crop & Watermark Detection', sub: 'Region-level manipulation analysis' }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="bg-s1/50 backdrop-blur-md border border-white/5 p-4 rounded-lg flex items-center gap-4 hover:border-blue/30 transition-colors group"
              >
                <div className="text-2xl group-hover:scale-110 transition-transform">{f.icon}</div>
                <div>
                  <div className="font-bold text-sm text-white">{f.title}</div>
                  <div className="text-xs text-slate-500">{f.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-s1/30 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <span className="text-blue font-mono text-xs uppercase tracking-[0.3em] block mb-4">v2 Capabilities</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
              Every Metric.<br />Every Engine.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {[
              { icon: '🧬', title: 'Triple Hash Consensus', desc: 'dHash + pHash (DCT-based) + aHash. Weighted consensus score across all three.' },
              { icon: '📐', title: 'SSIM Analysis', desc: 'Structural Similarity Index — accounts for luminance, contrast, and structure simultaneously.' },
              { icon: '🎨', title: 'Histogram Analysis', desc: 'Bhattacharyya coefficient on RGB channel histograms. Detects color grading filters.' },
              { icon: '🤖', title: 'MobileNet Neural', desc: 'TensorFlow.js MobileNet extracts deep feature embeddings to find semantic matches.' },
              { icon: '✂️', title: 'Crop Detection', desc: 'Region-by-region diff analysis. Flags border areas that differ from center.' },
              { icon: '⚡', title: 'Web Workers', desc: 'All heavy pixel computation runs in a Web Worker thread for a responsive UI.' },
              { icon: '📁', title: 'Case History', desc: 'Every analysis saved locally. Browse past cases, reload results, track violations.' },
              { icon: '📦', title: 'Batch Analysis', desc: 'Queue multiple image pairs for sequential analysis with aggregate reporting.' },
              { icon: '📜', title: 'Auto DMCA Generator', desc: 'One-click legally-formatted DMCA notice pre-filled with forensic evidence.' }
            ].map((f, i) => (
              <div key={i} className="bg-bg p-10 border-t-2 border-transparent hover:bg-s1 hover:border-blue transition-all group">
                <div className="text-3xl mb-6 group-hover:scale-110 transition-transform inline-block">{f.icon}</div>
                <h3 className="text-xl font-black tracking-tighter uppercase italic mb-4">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Demo */}
      <section id="video-demo" className="py-32 bg-bg border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple/10 border border-purple/20 text-purple text-[10px] font-mono uppercase tracking-widest">
              Product Demo
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
              Watch it<br /><span className="text-blue">Live.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              See VeriMedia AI detect a modified sports image in under 60 seconds — from upload to full forensic report, heatmap, and DMCA notice.
            </p>
            <div className="space-y-4">
              {[
                { n: 1, t: 'Upload original + suspected image' },
                { n: 2, t: 'AI runs 6 forensic algorithms simultaneously' },
                { n: 3, t: 'Heatmap shows exact edited regions' },
                { n: 4, t: 'Bing finds live web copies, risk scored' },
                { n: 5, t: 'DMCA notice generated and ready to send' }
              ].map((s) => (
                <div key={s.n} className="flex items-center gap-4 text-slate-400">
                  <div className="w-8 h-8 rounded-full bg-blue/10 border border-blue/20 flex items-center justify-center text-blue text-xs font-bold">{s.n}</div>
                  <span className="text-sm">{s.t}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => onGetAccess('PRO LEAGUE', annualBilling ? prices.pro.yr : prices.pro.mo)}
                className="bg-blue text-black px-8 py-4 rounded-md font-bold text-sm uppercase tracking-widest hover:bg-blue/90 transition-all"
              >
                Try It Free →
              </button>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-blue/20 rounded-[2rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative aspect-video bg-s1 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              {!embedUrl ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-blue/5 to-purple/5">
                  <div 
                    onClick={() => setShowVideoModal(true)}
                    className="w-20 h-20 rounded-full bg-blue/10 border-2 border-blue/30 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                  >
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-blue border-b-[10px] border-b-transparent ml-2" />
                  </div>
                  <div className="text-center">
                    <div className="font-black text-xl tracking-tighter uppercase italic text-white">Demo Video</div>
                    <div className="text-xs text-slate-500 mt-2">Record your screen demo and embed it here</div>
                  </div>
                  <button 
                    onClick={() => setShowVideoModal(true)}
                    className="bg-blue/10 text-blue border border-blue/20 px-4 py-2 rounded text-[10px] font-mono uppercase tracking-widest hover:bg-blue/20 transition-colors"
                  >
                    + Add Video URL
                  </button>
                </div>
              ) : (
                <iframe 
                  src={embedUrl} 
                  className="w-full h-full" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen 
                />
              )}
              {embedUrl && (
                <button 
                  onClick={() => setShowVideoModal(true)}
                  className="absolute top-4 right-4 bg-bg/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded text-[9px] font-mono uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                >
                  ✎ Change Video
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowVideoModal(false)}
              className="absolute inset-0 bg-bg/95 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-s1 border border-white/10 p-10 rounded-2xl shadow-2xl space-y-8"
            >
              <button onClick={() => setShowVideoModal(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">✕</button>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded bg-purple/10 border border-purple/20 text-purple text-[10px] font-mono uppercase tracking-widest">Add Demo Video</div>
                <h3 className="text-3xl font-black tracking-tighter uppercase italic text-white">Embed Your Demo</h3>
                <p className="text-slate-500 text-sm">Paste a YouTube or Vimeo URL. It will display in the demo section.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">YouTube or Vimeo URL</label>
                  <input 
                    type="url" 
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..." 
                    className="w-full bg-bg border border-white/10 rounded p-3 text-sm outline-none focus:border-blue transition-colors" 
                  />
                </div>
                <div className="bg-bg border border-white/5 p-4 rounded space-y-2">
                  <div className="text-[9px] font-mono uppercase tracking-widest text-slate-500">Supported Formats</div>
                  <div className="text-[11px] text-slate-400 space-y-1">
                    <p><span className="text-white">YouTube:</span> youtube.com/watch?v=ID or youtu.be/ID</p>
                    <p><span className="text-white">Vimeo:</span> vimeo.com/ID</p>
                    <p><span className="text-white">Loom:</span> loom.com/share/ID</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setShowVideoModal(false)}
                className="w-full bg-blue text-black py-4 rounded font-black text-xs uppercase tracking-[0.2em] hover:bg-blue/90 transition-all"
              >
                Embed Video →
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Pricing */}
      <section id="pricing" className="py-32 bg-s1/30 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <span className="text-blue font-mono text-xs uppercase tracking-[0.3em]">Plans & Pricing</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">Access the War Room.</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Every plan includes a <strong className="text-white">14-day free trial</strong>. No credit card charged until trial ends. Cancel anytime.</p>
            
            <div className="flex items-center justify-center gap-4 pt-8">
              <span className={cn("text-[10px] font-mono uppercase tracking-widest transition-colors", !annualBilling ? "text-white" : "text-slate-500")}>Monthly</span>
              <button 
                onClick={() => setAnnualBilling(!annualBilling)}
                className="w-12 h-6 rounded-full bg-blue/20 border border-blue/40 relative transition-colors"
              >
                <div className={cn("absolute top-1 w-4 h-4 rounded-full bg-blue transition-all", annualBilling ? "left-7" : "left-1")} />
              </button>
              <span className={cn("text-[10px] font-mono uppercase tracking-widest transition-colors", annualBilling ? "text-white" : "text-slate-500")}>Annual</span>
              <span className="bg-green/10 text-green text-[9px] font-mono px-2 py-0.5 rounded-full border border-green/20">Save 20%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10 rounded-2xl overflow-hidden">
            {/* Starter */}
            <div className="p-12 bg-bg border-r border-white/10 space-y-8">
              <div className="space-y-2">
                <div className="text-xl font-black tracking-tighter uppercase italic text-slate-400">Starter</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black tracking-tighter italic">{annualBilling ? prices.starter.yr : prices.starter.mo}</span>
                  <span className="text-xs text-slate-500 font-mono uppercase tracking-widest">/mo</span>
                </div>
                <div className="text-[10px] text-green font-mono uppercase tracking-widest">14-day free trial</div>
                <div className="text-xs text-slate-500">500 assets · 100 platforms</div>
              </div>
              <div className="h-px bg-white/5 w-full" />
              <ul className="space-y-4">
                {['dHash + aHash fingerprinting', 'Pixel diff heatmap', 'ELA compression analysis', '8-metric forensic report', 'Case history (50 cases)', 'Direct search (all engines)'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-green" /> {f}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => onGetAccess('STARTER', annualBilling ? prices.starter.yr : prices.starter.mo)}
                className="w-full border border-white/20 text-white py-4 rounded font-bold text-xs uppercase tracking-widest hover:border-blue hover:text-blue transition-all"
              >
                Start Free Trial
              </button>
            </div>

            {/* Pro */}
            <div className="p-12 bg-blue/5 border-r border-white/10 space-y-8 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-blue text-black px-4 py-1 rounded-b text-[9px] font-black uppercase tracking-widest">Most Popular</div>
              <div className="space-y-2">
                <div className="text-xl font-black tracking-tighter uppercase italic text-blue">Pro League</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black tracking-tighter italic text-blue">{annualBilling ? prices.pro.yr : prices.pro.mo}</span>
                  <span className="text-xs text-slate-500 font-mono uppercase tracking-widest">/mo</span>
                </div>
                <div className="text-[10px] text-green font-mono uppercase tracking-widest">14-day free trial included</div>
                <div className="text-xs text-slate-500">10,000 assets · 340+ platforms</div>
              </div>
              <div className="h-px bg-white/5 w-full" />
              <ul className="space-y-4">
                {['Everything in Starter', 'Triple hash (dHash + pHash + aHash)', 'SSIM + RGB Histogram analysis', 'MobileNet neural embeddings', 'Crop + watermark detection', 'Auto Bing web search + scoring', 'Auto DMCA notice generator', 'Batch analysis queue'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className={cn("w-4 h-4", i === 0 ? "text-green" : "text-blue")} /> {f}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => onGetAccess('PRO LEAGUE', annualBilling ? prices.pro.yr : prices.pro.mo)}
                className="w-full bg-blue text-black py-4 rounded font-black text-xs uppercase tracking-widest hover:bg-blue/90 transition-all shadow-[0_0_30px_rgba(0,180,255,0.3)]"
              >
                Start Free Trial →
              </button>
            </div>

            {/* Federation */}
            <div className="p-12 bg-bg space-y-8">
              <div className="space-y-2">
                <div className="text-xl font-black tracking-tighter uppercase italic text-slate-400">Federation</div>
                <div className="text-5xl font-black tracking-tighter italic">Custom</div>
                <div className="text-[10px] text-gold font-mono uppercase tracking-widest">Custom onboarding included</div>
                <div className="text-xs text-slate-500">Unlimited assets · All platforms</div>
              </div>
              <div className="h-px bg-white/5 w-full" />
              <ul className="space-y-4">
                {['Everything in Pro League', 'Deepfake AI detection', 'White-label dashboard', 'Dedicated SLA guarantee', 'Court-ready evidence packages', 'Custom API integrations', 'On-premise deployment option', '24/7 dedicated support'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-400">
                    <CheckCircle2 className={cn("w-4 h-4", i === 0 ? "text-green" : "text-gold")} /> {f}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => onGetAccess('FEDERATION', 'Custom')}
                className="w-full border border-gold/40 text-gold py-4 rounded font-bold text-xs uppercase tracking-widest hover:bg-gold/10 transition-all"
              >
                Contact Sales
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mt-1 border-x border-b border-white/10 rounded-b-2xl overflow-hidden">
            {[
              { i: '🔒', t: 'SSL ENCRYPTED', s: 'All data secured' },
              { i: '↩️', t: '14-DAY FREE TRIAL', s: 'No charge until day 15' },
              { i: '❌', t: 'CANCEL ANYTIME', s: 'No lock-in contracts' },
              { i: '🏆', t: 'TRUSTED BY 340+', s: 'Global sports orgs' }
            ].map((g, i) => (
              <div key={i} className="bg-s1/50 p-6 flex items-center gap-4 border-r border-white/10 last:border-0">
                <span className="text-2xl">{g.i}</span>
                <div>
                  <div className="text-[9px] font-mono text-white uppercase tracking-widest">{g.t}</div>
                  <div className="text-[10px] text-slate-500">{g.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="py-32 bg-bg border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green/10 border border-green/20 text-green text-[10px] font-mono uppercase tracking-widest">
              Limited Access
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
              Join the<br /><span className="text-blue">Waitlist.</span>
            </h2>
            <p className="text-slate-400 text-lg">
              We're onboarding 5 new federations per week. Secure your spot in the queue.
            </p>
          </div>

          {!isWaitlistSubmitted ? (
            <form 
              onSubmit={(e) => { e.preventDefault(); setIsWaitlistSubmitted(true); }}
              className="bg-s1 border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl space-y-8 text-left relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Queue Position</div>
                <div className="text-2xl font-black text-blue tracking-tighter italic">#{wlCount + 124}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Full Name</label>
                  <input type="text" required placeholder="John Doe" className="w-full bg-bg border border-white/10 rounded p-4 text-sm outline-none focus:border-blue transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Work Email</label>
                  <input type="email" required placeholder="john@federation.gov" className="w-full bg-bg border border-white/10 rounded p-4 text-sm outline-none focus:border-blue transition-colors" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Primary Interest</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Deepfake Detection', 'Social Media Monitoring', 'DMCA Automation', 'API Integration', 'Forensic Analysis', 'Dataset Access'].map((interest) => (
                    <label key={interest} className="flex items-center gap-2 p-3 bg-bg border border-white/5 rounded cursor-pointer hover:border-blue/30 transition-colors">
                      <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-bg text-blue focus:ring-blue" />
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="w-full bg-blue text-black py-5 rounded-xl font-black text-sm uppercase tracking-[0.3em] hover:bg-blue/90 transition-all shadow-[0_0_30px_rgba(0,180,255,0.2)]">
                Secure Early Access →
              </button>

              <p className="text-center text-[10px] text-slate-500 uppercase tracking-widest">
                Currently <span className="text-white font-bold">{wlCount}</span> professionals in queue
              </p>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-s1 border border-white/10 p-12 rounded-3xl shadow-2xl space-y-6"
            >
              <div className="w-20 h-20 bg-green/10 border border-green/20 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-10 h-10 text-green" />
              </div>
              <h3 className="text-3xl font-black tracking-tighter uppercase italic text-white">You're in the Queue!</h3>
              <p className="text-slate-400">We've received your application. A VeriMedia representative will reach out to your work email within 48 hours.</p>
              <div className="pt-6">
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">Your Position</div>
                <div className="text-5xl font-black text-blue tracking-tighter italic">#{wlCount + 124}</div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-32 bg-s1/30 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <span className="text-blue font-mono text-xs uppercase tracking-[0.3em]">User Reviews</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
              Trusted by<br /><span className="text-blue">The Best.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Jenkins",
                role: "Digital Forensic Lead @ Interpol",
                content: "VeriMedia AI has completely transformed our workflow. The Triple Hash Consensus is a game-changer for evidentiary integrity.",
                avatar: "SJ"
              },
              {
                name: "Marcus Thorne",
                role: "Head of Content @ Global Sports",
                content: "We track thousands of assets daily. The automated DMCA generator and Bing integration save us hundreds of hours every month.",
                avatar: "MT"
              },
              {
                name: "Dr. Elena Rossi",
                role: "AI Ethics Researcher",
                content: "The Explainable AI (XAI) features provide the transparency needed in modern forensics. It's not just a black box; it's a tool for truth.",
                avatar: "ER"
              }
            ].map((review, i) => (
              <div key={i} className="bg-bg p-8 rounded-2xl border border-white/5 hover:border-blue/30 transition-all group">
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="w-4 h-4 text-blue fill-blue" />
                  ))}
                </div>
                <p className="text-slate-300 text-lg italic mb-8 leading-relaxed">"{review.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue/10 flex items-center justify-center text-blue font-black italic border border-blue/20">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white uppercase tracking-tighter italic">{review.name}</div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-bg border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <Shield className="w-8 h-8 text-blue" />
                <span className="font-bold text-2xl tracking-tighter uppercase italic">
                  VeriMedia <span className="text-blue">AI</span>
                </span>
              </div>
              <p className="text-slate-500 max-w-sm leading-relaxed">
                The world's leading digital asset war room. Providing enterprise-grade forensic analysis and real-time threat intelligence for the modern web.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map(social => (
                  <a key={social} href="#" className="text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-blue transition-colors">{social}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white mb-6">Platform</h4>
              <ul className="space-y-4">
                {['Features', 'Forensics', 'Neural Engine', 'Web Search', 'API Access'].map(item => (
                  <li key={item}><a href="#" className="text-sm text-slate-500 hover:text-blue transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white mb-6">Company</h4>
              <ul className="space-y-4">
                {['About Us', 'Waitlist', 'Pricing', 'Legal', 'Contact'].map(item => (
                  <li key={item}><a href="#" className="text-sm text-slate-500 hover:text-blue transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
              © 2026 VeriMedia AI Federation. All Rights Reserved.
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-[10px] font-mono text-slate-600 uppercase tracking-widest hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-[10px] font-mono text-slate-600 uppercase tracking-widest hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-[10px] font-mono text-slate-600 uppercase tracking-widest hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
