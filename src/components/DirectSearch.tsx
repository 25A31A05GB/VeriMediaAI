import React from 'react';
import { motion } from 'motion/react';
import { Search, ExternalLink, Globe, Shield, Zap, Search as SearchIcon } from 'lucide-react';

export const DirectSearch: React.FC = () => {
  const engines = [
    { name: 'Google Lens', url: 'https://lens.google.com/upload', icon: Globe, color: 'blue' },
    { name: 'Bing Visual', url: 'https://www.bing.com/visualsearch', icon: SearchIcon, color: 'purple' },
    { name: 'Yandex Images', url: 'https://yandex.com/images/search?rpt=imageview', icon: Globe, color: 'red' },
    { name: 'TinEye', url: 'https://tineye.com/', icon: Search, color: 'green' },
    { name: 'PimEyes', url: 'https://pimeyes.com/en', icon: Shield, color: 'orange' },
    { name: 'Social Search', url: 'https://socialsearcher.com/', icon: Zap, color: 'blue' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-black tracking-tighter uppercase italic">Direct Search Relay</h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Multi-engine visual search integration</p>
        </div>
        <div className="bg-blue/10 border border-blue/20 px-3 py-1 rounded-full text-blue text-[10px] font-mono uppercase tracking-widest animate-pulse">
          Relay v1.8 Active
        </div>
      </div>

      <div className="bg-blue/5 border border-blue/20 p-6 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue/10 border border-blue/20 flex items-center justify-center">
            <Shield className="w-6 h-6 text-blue" />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold text-white uppercase tracking-wider">AI Search Score: 98.4%</div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">High probability of finding web matches</div>
          </div>
        </div>
        <button className="bg-blue text-black px-6 py-2 rounded font-bold text-[10px] font-mono uppercase tracking-widest hover:bg-blue/90 transition-all">
          Run All Engines →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {engines.map((engine, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.02 }}
            className="bg-s1 border border-white/5 p-6 rounded-xl space-y-6 group cursor-pointer"
            onClick={() => window.open(engine.url, '_blank')}
          >
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-lg bg-${engine.color}/10 border border-${engine.color}/20 flex items-center justify-center`}>
                <engine.icon className={`w-5 h-5 text-${engine.color}`} />
              </div>
              <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-blue transition-colors" />
            </div>
            <div className="space-y-1">
              <div className="text-lg font-black tracking-tighter uppercase italic text-white group-hover:text-blue transition-colors">{engine.name}</div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Visual Search Engine</div>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Status: <span className="text-green">Online</span></div>
              <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Latency: <span className="text-white">~1.2s</span></div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-s1 border border-white/5 p-8 rounded-xl space-y-6">
        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">How it works</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-8 h-8 rounded-full bg-blue/10 border border-blue/20 flex items-center justify-center text-blue text-xs font-bold">1</div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">Image Normalization</div>
            <p className="text-[10px] text-slate-500 leading-relaxed">VeriMedia AI normalizes the suspect image for optimal search engine indexing.</p>
          </div>
          <div className="space-y-3">
            <div className="w-8 h-8 rounded-full bg-blue/10 border border-blue/20 flex items-center justify-center text-blue text-xs font-bold">2</div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">Engine Relay</div>
            <p className="text-[10px] text-slate-500 leading-relaxed">The image is relayed to multiple search engines simultaneously via secure tunnels.</p>
          </div>
          <div className="space-y-3">
            <div className="w-8 h-8 rounded-full bg-blue/10 border border-blue/20 flex items-center justify-center text-blue text-xs font-bold">3</div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">Result Aggregation</div>
            <p className="text-[10px] text-slate-500 leading-relaxed">Results are aggregated, risk-scored, and presented in the Web Search panel.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
