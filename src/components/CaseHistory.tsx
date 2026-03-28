import React from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Download, Plus, CheckCircle2, XCircle, Clock, FileText, MoreVertical } from 'lucide-react';

export const CaseHistory: React.FC = () => {
  const cases = [
    { id: 'CASE-4921', name: 'Sports Media v2', status: 'Closed', result: 'Modified', date: '2026-03-15', analyst: 'Jayram Sappa' },
    { id: 'CASE-4922', name: 'Deepfake Faces', status: 'Open', result: 'N/A', date: '2026-03-18', analyst: 'Jayram Sappa' },
    { id: 'CASE-4923', name: 'Metadata Forgery', status: 'Pending', result: 'N/A', date: '2026-03-20', analyst: 'Jayram Sappa' },
    { id: 'CASE-4924', name: 'Neural Similarity', status: 'Closed', result: 'Authentic', date: '2026-03-22', analyst: 'Jayram Sappa' },
    { id: 'CASE-4925', name: 'ELA Anomaly', status: 'Closed', result: 'Modified', date: '2026-03-25', analyst: 'Jayram Sappa' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-black tracking-tighter uppercase italic">Case History</h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Archive of forensic investigations and reports</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type="text" placeholder="Search cases..." className="bg-bg border border-white/10 rounded-md pl-10 pr-4 py-2 text-xs outline-none focus:border-blue transition-colors w-64" />
          </div>
          <button className="bg-white/5 border border-white/10 px-4 py-2 rounded font-bold text-[10px] font-mono uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
            <Filter className="w-3 h-3" /> Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-s1 border border-white/5 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <FileText className="w-5 h-5 text-blue" />
            <div className="text-[10px] font-mono text-green uppercase tracking-widest">+2 New</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black tracking-tighter uppercase italic text-white">124</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Total Cases</div>
          </div>
        </div>
        <div className="bg-s1 border border-white/5 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <CheckCircle2 className="w-5 h-5 text-green" />
            <div className="text-[10px] font-mono text-green uppercase tracking-widest">92% Closed</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black tracking-tighter uppercase italic text-white">114</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Closed Cases</div>
          </div>
        </div>
        <div className="bg-s1 border border-white/5 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <Clock className="w-5 h-5 text-orange" />
            <div className="text-[10px] font-mono text-orange uppercase tracking-widest">8% Active</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black tracking-tighter uppercase italic text-white">10</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Active Cases</div>
          </div>
        </div>
      </div>

      <div className="bg-s1 border border-white/5 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[10px] font-mono uppercase tracking-widest text-slate-500 border-b border-white/5">
                <th className="px-6 py-4 font-bold">Case ID</th>
                <th className="px-6 py-4 font-bold">Case Name</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Result</th>
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold">Analyst</th>
                <th className="px-6 py-4 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {cases.map((item, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-[10px] font-mono text-slate-400">{item.id}</td>
                  <td className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider">{item.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest border ${item.status === 'Closed' ? 'bg-green/10 border-green/20 text-green' : item.status === 'Open' ? 'bg-blue/10 border-blue/20 text-blue' : 'bg-orange/10 border-orange/20 text-orange'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest border ${item.result === 'Modified' ? 'bg-red/10 border-red/20 text-red' : item.result === 'Authentic' ? 'bg-green/10 border-green/20 text-green' : 'bg-white/5 border-white/10 text-slate-500'}`}>
                      {item.result}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[10px] font-mono text-slate-400">{item.date}</td>
                  <td className="px-6 py-4 text-[10px] font-mono text-slate-400">{item.analyst}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-blue hover:text-blue/80 transition-colors text-[10px] font-mono uppercase tracking-widest">View</button>
                      <button className="text-slate-500 hover:text-white transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
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
