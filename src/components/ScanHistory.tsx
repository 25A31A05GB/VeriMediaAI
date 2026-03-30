import React from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Download, 
  Clock, 
  Globe, 
  Twitter, 
  Instagram, 
  Facebook, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  Activity,
  Scan
} from 'lucide-react';
import { cn } from '../lib/utils';

interface ScanHistoryProps {
  scans: any[];
  onViewScan: (platform: string, accountId: string) => void;
}

export const ScanHistory: React.FC<ScanHistoryProps> = ({ scans, onViewScan }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-black tracking-tighter uppercase italic">Scan History</h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Archive of social media forensic scans and risk assessments</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search scans..." 
              className="bg-bg border border-white/10 rounded-md pl-10 pr-4 py-2 text-xs outline-none focus:border-blue transition-colors w-64" 
            />
          </div>
          <button className="bg-white/5 border border-white/10 px-4 py-2 rounded font-bold text-[10px] font-mono uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
            <Filter className="w-3 h-3" /> Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-s1 border border-white/5 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <Activity className="w-5 h-5 text-blue" />
            <div className="text-[10px] font-mono text-blue uppercase tracking-widest">Active</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black tracking-tighter uppercase italic text-white">{scans.length}</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Total Scans</div>
          </div>
        </div>
        <div className="bg-s1 border border-white/5 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <ShieldAlert className="w-5 h-5 text-red" />
            <div className="text-[10px] font-mono text-red uppercase tracking-widest">High Risk</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black tracking-tighter uppercase italic text-white">
              {scans.filter(s => s.results?.some((r: any) => r.status === 'Critical' || r.status === 'High Risk')).length}
            </div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Threats Detected</div>
          </div>
        </div>
        <div className="bg-s1 border border-white/5 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <ShieldCheck className="w-5 h-5 text-green" />
            <div className="text-[10px] font-mono text-green uppercase tracking-widest">Secure</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-black tracking-tighter uppercase italic text-white">
              {scans.filter(s => !s.results || s.results.length === 0).length}
            </div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Clean Profiles</div>
          </div>
        </div>
      </div>

      <div className="bg-s1 border border-white/5 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[10px] font-mono uppercase tracking-widest text-slate-500 border-b border-white/5">
                <th className="px-6 py-4 font-bold">Platform</th>
                <th className="px-6 py-4 font-bold">Account ID</th>
                <th className="px-6 py-4 font-bold">Risk Level</th>
                <th className="px-6 py-4 font-bold">Findings Summary</th>
                <th className="px-6 py-4 font-bold">Timestamp</th>
                <th className="px-6 py-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {scans.map((scan, i) => {
                const highestRisk = scan.results?.reduce((prev: string, curr: any) => {
                  const levels: Record<string, number> = { 'Critical': 4, 'High Risk': 3, 'Suspicious': 2, 'Safe': 1 };
                  return (levels[curr.status] || 0) > (levels[prev] || 0) ? curr.status : prev;
                }, 'Safe') || 'Safe';

                return (
                  <tr key={i} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {scan.platform === 'twitter' ? <Twitter className="w-4 h-4 text-blue" /> : 
                         scan.platform === 'instagram' ? <Instagram className="w-4 h-4 text-pink-500" /> : 
                         <Facebook className="w-4 h-4 text-blue-600" />}
                        <span className="text-[10px] font-mono text-white uppercase tracking-widest">{scan.platform}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-white uppercase tracking-wider">{scan.accountId}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest border",
                        highestRisk === 'Critical' ? 'bg-red/10 border-red/20 text-red' : 
                        highestRisk === 'High Risk' ? 'bg-orange/10 border-orange/20 text-orange' : 
                        highestRisk === 'Suspicious' ? 'bg-yellow/10 border-yellow/20 text-yellow' :
                        'bg-green/10 border-green/20 text-green'
                      )}>
                        {highestRisk}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {scan.results?.slice(0, 2).map((res: any, j: number) => (
                          <div key={j} className="text-[10px] text-slate-400 truncate max-w-[200px]">
                            • {res.type}
                          </div>
                        ))}
                        {(!scan.results || scan.results.length === 0) && (
                          <div className="text-[10px] text-green font-mono uppercase tracking-widest">No anomalies detected</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[10px] font-mono text-slate-400">
                      {scan.timestamp?.toDate().toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => onViewScan(scan.platform, scan.accountId)}
                        className="text-blue hover:text-blue/80 transition-colors text-[10px] font-mono uppercase tracking-widest flex items-center gap-2 ml-auto"
                      >
                        Details <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {scans.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3 opacity-20">
                      <Clock className="w-12 h-12" />
                      <p className="text-xs font-mono uppercase tracking-widest">No scan history available</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
