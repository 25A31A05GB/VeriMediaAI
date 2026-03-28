import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Search, Filter, Download, Plus, CheckCircle2, XCircle, Cpu, Zap, Shield, Search as SearchIcon } from 'lucide-react';

export const APIConsole: React.FC = () => {
  const endpoints = [
    { method: 'POST', path: '/v2/analyze', desc: 'Full forensic analysis of media', status: 'Active', latency: '240ms' },
    { method: 'GET', path: '/v2/search', desc: 'Visual search across web indices', status: 'Active', latency: '850ms' },
    { method: 'POST', path: '/v2/report', desc: 'Generate forensic PDF report', status: 'Active', latency: '1.2s' },
    { method: 'GET', path: '/v2/status', desc: 'Get neural engine health status', status: 'Active', latency: '45ms' },
    { method: 'POST', path: '/v2/dmca', desc: 'Generate automated DMCA notice', status: 'Active', latency: '150ms' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-black tracking-tighter uppercase italic">API Console</h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Backend integration and endpoints</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-blue text-black px-4 py-2 rounded font-bold text-[10px] font-mono uppercase tracking-widest hover:bg-blue/90 transition-all flex items-center gap-2">
            <Plus className="w-3 h-3" /> Create API Key
          </button>
          <button className="bg-white/5 border border-white/10 px-4 py-2 rounded font-bold text-[10px] font-mono uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
            <Download className="w-3 h-3" /> Documentation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-s1 border border-white/5 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <Cpu className="w-5 h-5 text-blue" />
            <div className="text-[10px] font-mono text-green uppercase tracking-widest">99.9% Uptime</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black tracking-tighter uppercase italic text-white">Online</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Backend Status</div>
          </div>
        </div>
        <div className="bg-s1 border border-white/5 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <Zap className="w-5 h-5 text-purple" />
            <div className="text-[10px] font-mono text-blue uppercase tracking-widest">Avg. 240ms</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black tracking-tighter uppercase italic text-white">Fast</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">API Latency</div>
          </div>
        </div>
        <div className="bg-s1 border border-white/5 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <Shield className="w-5 h-5 text-green" />
            <div className="text-[10px] font-mono text-green uppercase tracking-widest">TLS 1.3 Active</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black tracking-tighter uppercase italic text-white">Secure</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Connection</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-s1 border border-white/5 rounded-xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">API Endpoints</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Showing 5 Endpoints</div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-[10px] font-mono uppercase tracking-widest text-slate-500 border-b border-white/5">
                  <th className="px-6 py-4 font-bold">Method</th>
                  <th className="px-6 py-4 font-bold">Path</th>
                  <th className="px-6 py-4 font-bold">Description</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Latency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {endpoints.map((item, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest border ${item.method === 'POST' ? 'bg-blue/10 border-blue/20 text-blue' : 'bg-purple/10 border-purple/20 text-purple'}`}>
                        {item.method}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider">{item.path}</td>
                    <td className="px-6 py-4 text-[10px] font-mono text-slate-400 uppercase tracking-widest">{item.desc}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest border bg-green/10 border-green/20 text-green">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[10px] font-mono text-slate-400">{item.latency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-s1 border border-white/5 rounded-xl overflow-hidden shadow-2xl flex flex-col">
          <div className="p-6 border-b border-white/5 bg-white/5 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-blue" />
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">API Tester</div>
          </div>
          <div className="flex-1 p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Endpoint</label>
              <select className="w-full bg-bg border border-white/10 rounded p-3 text-xs outline-none focus:border-blue transition-colors text-white">
                {endpoints.map((e, i) => (
                  <option key={i} value={e.path}>{e.method} {e.path}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Request Body (JSON)</label>
              <textarea 
                className="w-full h-32 bg-bg border border-white/10 rounded p-3 text-[10px] font-mono outline-none focus:border-blue transition-colors text-blue"
                defaultValue={`{\n  "media_url": "https://...",\n  "options": {\n    "forensics": true,\n    "neural": true\n  }\n}`}
              />
            </div>
            <button className="w-full bg-blue text-black py-4 rounded font-black text-xs uppercase tracking-[0.2em] hover:bg-blue/90 transition-all">
              Send Request →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
