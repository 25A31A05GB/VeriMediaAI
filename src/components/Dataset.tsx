import React from 'react';
import { motion } from 'motion/react';
import { Database, Search, Filter, Download, Plus, CheckCircle2, XCircle } from 'lucide-react';

export const Dataset: React.FC = () => {
  const datasetItems = [
    { id: 'DS-001', name: 'Sports Media v2', type: 'Image', samples: 12400, status: 'Verified', date: '2026-03-15' },
    { id: 'DS-002', name: 'Deepfake Faces', type: 'Video', samples: 8600, status: 'Verified', date: '2026-03-18' },
    { id: 'DS-003', name: 'Metadata Forgery', type: 'Metadata', samples: 4200, status: 'Processing', date: '2026-03-20' },
    { id: 'DS-004', name: 'Neural Similarity', type: 'Image', samples: 15800, status: 'Verified', date: '2026-03-22' },
    { id: 'DS-005', name: 'ELA Anomaly', type: 'Image', samples: 6400, status: 'Verified', date: '2026-03-25' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-black tracking-tighter uppercase italic">Dataset Management</h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Training and validation datasets</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-blue text-black px-4 py-2 rounded font-bold text-[10px] font-mono uppercase tracking-widest hover:bg-blue/90 transition-all flex items-center gap-2">
            <Plus className="w-3 h-3" /> Add Dataset
          </button>
          <button className="bg-white/5 border border-white/10 px-4 py-2 rounded font-bold text-[10px] font-mono uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
            <Download className="w-3 h-3" /> Export All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-s1 border border-white/5 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <Database className="w-5 h-5 text-blue" />
            <div className="text-[10px] font-mono text-green uppercase tracking-widest">+1.2k New</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black tracking-tighter uppercase italic text-white">47.4k</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Total Samples</div>
          </div>
        </div>
        <div className="bg-s1 border border-white/5 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <CheckCircle2 className="w-5 h-5 text-green" />
            <div className="text-[10px] font-mono text-green uppercase tracking-widest">94.2% Verified</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black tracking-tighter uppercase italic text-white">44.6k</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Verified Samples</div>
          </div>
        </div>
        <div className="bg-s1 border border-white/5 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <XCircle className="w-5 h-5 text-red" />
            <div className="text-[10px] font-mono text-red uppercase tracking-widest">5.8% Anomaly</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black tracking-tighter uppercase italic text-white">2.8k</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Anomaly Samples</div>
          </div>
        </div>
      </div>

      <div className="bg-s1 border border-white/5 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type="text" placeholder="Search datasets..." className="bg-bg border border-white/10 rounded-md pl-10 pr-4 py-2 text-xs outline-none focus:border-blue transition-colors w-64" />
            </div>
            <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-md font-bold text-[10px] font-mono uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
              <Filter className="w-3 h-3" /> Filter
            </button>
          </div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Showing 5 of 12 Datasets</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[10px] font-mono uppercase tracking-widest text-slate-500 border-b border-white/5">
                <th className="px-6 py-4 font-bold">ID</th>
                <th className="px-6 py-4 font-bold">Name</th>
                <th className="px-6 py-4 font-bold">Type</th>
                <th className="px-6 py-4 font-bold">Samples</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Last Updated</th>
                <th className="px-6 py-4 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {datasetItems.map((item, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-[10px] font-mono text-slate-400">{item.id}</td>
                  <td className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider">{item.name}</td>
                  <td className="px-6 py-4 text-[10px] font-mono text-slate-400 uppercase tracking-widest">{item.type}</td>
                  <td className="px-6 py-4 text-xs font-bold text-white tracking-tighter italic">{item.samples.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest border ${item.status === 'Verified' ? 'bg-green/10 border-green/20 text-green' : 'bg-orange/10 border-orange/20 text-orange'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[10px] font-mono text-slate-400">{item.date}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue hover:text-blue/80 transition-colors text-[10px] font-mono uppercase tracking-widest">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
