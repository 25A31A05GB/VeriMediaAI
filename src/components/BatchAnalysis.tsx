import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, X, CheckCircle2, AlertTriangle, Loader2, Plus, Download } from 'lucide-react';

export const BatchAnalysis: React.FC = () => {
  const [queue, setQueue] = useState([
    { id: 'BA-001', name: 'Sports Media v2', status: 'Completed', progress: 100, result: 'Modified' },
    { id: 'BA-002', name: 'Deepfake Faces', status: 'Processing', progress: 65, result: 'N/A' },
    { id: 'BA-003', name: 'Metadata Forgery', status: 'Queued', progress: 0, result: 'N/A' },
    { id: 'BA-004', name: 'Neural Similarity', status: 'Queued', progress: 0, result: 'N/A' },
    { id: 'BA-005', name: 'ELA Anomaly', status: 'Queued', progress: 0, result: 'N/A' }
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-black tracking-tighter uppercase italic">Batch Analysis Queue</h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Sequential processing of multiple media assets</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-blue text-black px-4 py-2 rounded font-bold text-[10px] font-mono uppercase tracking-widest hover:bg-blue/90 transition-all flex items-center gap-2">
            <Plus className="w-3 h-3" /> Add to Queue
          </button>
          <button className="bg-white/5 border border-white/10 px-4 py-2 rounded font-bold text-[10px] font-mono uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
            <Play className="w-3 h-3" /> Start Batch
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-s1 border border-white/5 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <CheckCircle2 className="w-5 h-5 text-green" />
            <div className="text-[10px] font-mono text-green uppercase tracking-widest">1 Completed</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black tracking-tighter uppercase italic text-white">5 Assets</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Total in Queue</div>
          </div>
        </div>
        <div className="bg-s1 border border-white/5 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <Loader2 className="w-5 h-5 text-blue animate-spin" />
            <div className="text-[10px] font-mono text-blue uppercase tracking-widest">1 Processing</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black tracking-tighter uppercase italic text-white">65%</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Current Progress</div>
          </div>
        </div>
        <div className="bg-s1 border border-white/5 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <AlertTriangle className="w-5 h-5 text-red" />
            <div className="text-[10px] font-mono text-red uppercase tracking-widest">1 Anomaly</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black tracking-tighter uppercase italic text-white">Modified</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Last Result</div>
          </div>
        </div>
      </div>

      <div className="bg-s1 border border-white/5 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[10px] font-mono uppercase tracking-widest text-slate-500 border-b border-white/5">
                <th className="px-6 py-4 font-bold">Asset ID</th>
                <th className="px-6 py-4 font-bold">Name</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Progress</th>
                <th className="px-6 py-4 font-bold">Result</th>
                <th className="px-6 py-4 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {queue.map((item, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-[10px] font-mono text-slate-400">{item.id}</td>
                  <td className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider">{item.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest border ${item.status === 'Completed' ? 'bg-green/10 border-green/20 text-green' : item.status === 'Processing' ? 'bg-blue/10 border-blue/20 text-blue' : 'bg-white/5 border-white/10 text-slate-500'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ duration: 1 }}
                          className={`h-full ${item.status === 'Completed' ? 'bg-green' : 'bg-blue'}`}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">{item.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest border ${item.result === 'Modified' ? 'bg-red/10 border-red/20 text-red' : item.result === 'Authentic' ? 'bg-green/10 border-green/20 text-green' : 'bg-white/5 border-white/10 text-slate-500'}`}>
                      {item.result}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-slate-500 hover:text-white transition-colors">
                        <Pause className="w-4 h-4" />
                      </button>
                      <button className="text-slate-500 hover:text-red transition-colors">
                        <X className="w-4 h-4" />
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
