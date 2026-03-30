import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Activity, 
  Search, 
  History, 
  Globe, 
  CreditCard, 
  Zap, 
  FileText, 
  LogOut, 
  Scan, 
  Cpu,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Upload,
  Eye,
  Camera,
  Layers,
  FileSearch,
  Mail,
  Download,
  LayoutDashboard,
  Database,
  Terminal,
  Share2,
  FileCheck,
  MousePointer2,
  FileJson,
  X,
  Lock,
  Star,
  Menu,
  Bell,
  Loader2,
  Bot,
  Twitter,
  Instagram,
  Facebook,
  Image as ImageIcon,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  Settings as SettingsIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { cn } from '../lib/utils';
import { Footer } from './Footer';
import { Hunt } from './Hunt';
import { ConfidenceEngine } from './ConfidenceEngine';
import { ExplainableAI } from './ExplainableAI';
import { DeepfakeDetection } from './DeepfakeDetection';
import { AIValidation } from './AIValidation';
import { Dataset } from './Dataset';
import { APIConsole } from './APIConsole';
import { DirectSearch } from './DirectSearch';
import { ComparisonSlider } from './ComparisonSlider';
import { EXIFMetadata } from './EXIFMetadata';
import { ColorChannels } from './ColorChannels';
import { BatchAnalysis } from './BatchAnalysis';
import { CaseHistory } from './CaseHistory';
import { ReportDMCA } from './ReportDMCA';
import { EmailReport } from './EmailReport';
import { PDFExport } from './PDFExport';
import { Forensics } from './Forensics';
import { ForensicAssistant } from './ForensicAssistant';
import { AssetGenerator } from './AssetGenerator';
import { SocialGuard } from './SocialGuard';
import { Settings } from './Settings';
import { ScanHistory } from './ScanHistory';

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { getLiveIntelligence } from '../services/gemini';

const MonetizePopup: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
  >
    <div className="bg-s1 border border-white/10 p-8 rounded-2xl max-w-md w-full relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue via-purple to-red" />
      <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
        <X className="w-5 h-5" />
      </button>
      <div className="space-y-6 text-center">
        <div className="w-16 h-16 bg-blue/10 rounded-full flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8 text-blue" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black tracking-tighter uppercase italic">Unlock Federation Access</h3>
          <p className="text-slate-400 text-sm leading-relaxed">This feature is reserved for Federation level accounts. Upgrade now to access real-time deepfake detection and legal enforcement tools.</p>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <button className="bg-blue text-black py-3 rounded font-black text-xs uppercase tracking-[0.2em] hover:bg-blue/90 transition-all flex items-center justify-center gap-2">
            <Star className="w-4 h-4" /> Upgrade to Federation
          </button>
          <button onClick={onClose} className="text-slate-500 text-[10px] font-mono uppercase tracking-widest hover:text-white transition-colors">Maybe Later</button>
        </div>
      </div>
    </div>
  </motion.div>
);

const MobileBottomNav: React.FC<{ activeTab: string; setActiveTab: (id: string) => void }> = ({ activeTab, setActiveTab }) => (
  <div className="lg:hidden fixed bottom-0 left-0 w-full bg-s1 border-t border-white/10 px-6 py-3 flex items-center justify-between z-50 backdrop-blur-xl">
    {[
      { id: 'up', icon: Upload, label: 'Upload' },
      { id: 'hunt', icon: Search, label: 'Hunt' },
      { id: 'res', icon: Activity, label: 'Results' },
      { id: 'hist', icon: History, label: 'History' },
    ].map(item => (
      <button 
        key={item.id}
        onClick={() => setActiveTab(item.id)}
        className={cn(
          "flex flex-col items-center gap-1 transition-colors",
          activeTab === item.id ? "text-blue" : "text-slate-500"
        )}
      >
        <item.icon className="w-5 h-5" />
        <span className="text-[8px] font-mono uppercase tracking-widest">{item.label}</span>
      </button>
    ))}
  </div>
);

const LiveActivityFeed: React.FC<{ isOpen: boolean; setIsOpen: (open: boolean) => void; analysis?: any; notifications: any[] }> = ({ isOpen, setIsOpen, analysis, notifications }) => {
  const [activities, setActivities] = useState([
    { id: 1, type: 'Neural Scan', status: 'Active', target: 'Global Mesh', time: '1m ago', color: 'text-blue' },
    { id: 2, type: 'Deepfake', status: 'High Risk', target: 'video_01.mp4', time: '2m ago', color: 'text-red' },
    { id: 3, type: 'Edited', status: 'Modified', target: 'img_992.jpg', time: '5m ago', color: 'text-orange' },
    { id: 4, type: 'Cropped', status: 'Suspicious', target: 'profile_shot.png', time: '12m ago', color: 'text-yellow' },
  ]);

  useEffect(() => {
    if (notifications && notifications.length > 0) {
      const mapped = notifications.map(n => ({
        id: n.id || Math.random(),
        type: n.platform || 'Intelligence',
        status: n.msg || 'Alert',
        target: 'Global Scan',
        time: n.time || 'Just now',
        color: String(n.msg || "").toLowerCase().includes('critical') ? 'text-red' : 'text-blue'
      }));
      setActivities(prev => [...mapped, ...prev].slice(0, 8));
    }
  }, [notifications]);

  return (
    <div className="mb-6 overflow-hidden border border-white/10 rounded-xl bg-s1/30 backdrop-blur-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <Activity className="w-5 h-5 text-blue" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red rounded-full animate-ping" />
          </div>
          <span className="font-black tracking-tighter uppercase italic text-sm">Live Forensic Activity Feed</span>
          <div className="bg-blue/10 border border-blue/20 px-2 py-0.5 rounded text-[8px] font-mono text-blue uppercase tracking-widest">Real-time</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            <span className="w-1 h-1 rounded-full bg-green" /> 4 Active Scans
          </div>
          <ChevronRight className={cn("w-4 h-4 text-slate-500 transition-transform", isOpen && "rotate-90")} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/10"
          >
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {activities.map((activity) => (
                <div key={activity.id} className="p-3 bg-bg/50 border border-white/5 rounded-lg space-y-2 hover:border-blue/30 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <span className={cn("text-[10px] font-black uppercase tracking-widest italic", activity.color)}>
                      {activity.type} Detected
                    </span>
                    <span className="text-[9px] font-mono text-slate-500">{activity.time}</span>
                  </div>
                  <div className="text-xs font-bold truncate group-hover:text-blue transition-colors">{activity.target}</div>
                  <div className="flex items-center justify-between pt-1 border-t border-white/5">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Status</span>
                    <span className="text-[9px] font-mono text-white uppercase tracking-widest font-bold">{activity.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface DashboardProps {
  user: any;
  onLogout: () => void;
  onAnalyze: (file: File, deep?: boolean, originalFile?: File) => void;
  onViewCase: (id: string) => void;
  onWarRoom: () => void;
  loading: boolean;
  uploadProgress: number;
  analysis: any;
  selectedImage: string | null;
}

const SystemOverview: React.FC<{ 
  title: string; 
  onAction: () => void; 
  onSocialAction: (platform?: string, accountId?: string) => void;
  recentScans: any[];
}> = ({ title, onAction, onSocialAction, recentScans }) => {
  const [manualPlatform, setManualPlatform] = useState('twitter');
  const [manualAccountId, setManualAccountId] = useState('');
  
  const chartData = [
    { time: '00:00', threats: 12, activity: 45 },
    { time: '04:00', threats: 18, activity: 52 },
    { time: '08:00', threats: 25, activity: 88 },
    { time: '12:00', threats: 45, activity: 120 },
    { time: '16:00', threats: 32, activity: 95 },
    { time: '20:00', threats: 22, activity: 70 },
    { time: '23:59', threats: 15, activity: 50 },
  ];

  const barData = [
    { name: 'Twitter', value: 450, color: '#1DA1F2' },
    { name: 'Instagram', value: 320, color: '#E1306C' },
    { name: 'Facebook', value: 210, color: '#4267B2' },
    { name: 'TikTok', value: 580, color: '#000000' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tighter uppercase italic leading-none">Global Forensic Mesh</h2>
          <p className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em]">Real-time Neural Activity & Threat Detection</p>
        </div>
        <button 
          onClick={onAction}
          className="px-6 py-3 bg-blue text-black font-black text-xs uppercase tracking-widest hover:bg-blue/90 transition-all rounded-xl shadow-[0_0_30px_rgba(0,180,255,0.2)]"
        >
          Initialize New Scan →
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Activity Chart */}
        <div className="lg:col-span-2 glass p-8 rounded-2xl border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500">Neural Traffic (24h)</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue" />
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Activity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red" />
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Threats</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-1">
              <div className="text-[8px] font-mono uppercase tracking-widest text-slate-500">Avg. Detection Time</div>
              <div className="text-xl font-black text-blue tracking-tighter italic">0.42s</div>
            </div>
            <div className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-1">
              <div className="text-[8px] font-mono uppercase tracking-widest text-slate-500">Proactive Risk Score</div>
              <div className="text-xl font-black text-red tracking-tighter italic">89%</div>
            </div>
            <div className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-1">
              <div className="text-[8px] font-mono uppercase tracking-widest text-slate-500">Active Nodes</div>
              <div className="text-xl font-black text-white tracking-tighter italic">342</div>
            </div>
            <div className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-1">
              <div className="text-[8px] font-mono uppercase tracking-widest text-slate-500">Threats Neutralized</div>
              <div className="text-xl font-black text-green tracking-tighter italic">12.4k</div>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00B4FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00B4FF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="rgba(255,255,255,0.2)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.2)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '10px', textTransform: 'uppercase', fontFamily: 'monospace' }}
                />
                <Area type="monotone" dataKey="activity" stroke="#00B4FF" fillOpacity={1} fill="url(#colorActivity)" strokeWidth={2} />
                <Area type="monotone" dataKey="threats" stroke="#FF4444" fillOpacity={1} fill="url(#colorThreats)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Platform Distribution */}
        <div className="glass p-8 rounded-2xl border-white/10 space-y-6">
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500">Platform Exposure</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="rgba(255,255,255,0.5)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  width={80}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#050505', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-wider">
              Neural nodes are currently prioritizing TikTok and Twitter for high-risk deepfake propagation.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Scans', value: '12,482', icon: Activity, color: 'text-blue' },
          { label: 'Deepfakes Blocked', value: '842', icon: ShieldAlert, color: 'text-red' },
          { label: 'Neural Nodes', value: '1,204', icon: Cpu, color: 'text-purple-400' },
          { label: 'Global Rank', value: '#12', icon: Star, color: 'text-gold' },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-2xl border-white/10 flex items-center gap-4 group hover:border-white/20 transition-all">
            <div className={cn("w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform", stat.color)}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-black tracking-tighter italic">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Forensic Findings */}
      {recentScans.length > 0 && (
        <div className="glass p-8 rounded-2xl border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500">Recent Forensic Findings</h3>
            <button 
              onClick={() => onSocialAction()}
              className="text-[10px] font-mono text-blue uppercase tracking-widest hover:underline"
            >
              View All Findings →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentScans.map((scan, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3 hover:border-blue/30 transition-all cursor-pointer group" onClick={() => onSocialAction(scan.platform, scan.accountId)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {scan.platform === 'twitter' ? <Twitter className="w-3 h-3 text-blue" /> : 
                     scan.platform === 'instagram' ? <Instagram className="w-3 h-3 text-pink-500" /> : 
                     <Facebook className="w-3 h-3 text-blue-600" />}
                    <span className="text-[10px] font-mono text-white uppercase tracking-widest">{scan.accountId}</span>
                  </div>
                  <span className="text-[8px] font-mono text-slate-500">{new Date(scan.timestamp).toLocaleDateString()}</span>
                </div>
                <div className="space-y-1">
                  {scan.results?.slice(0, 1).map((res: any, j: number) => (
                    <div key={j} className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-300 truncate max-w-[150px]">{res.type}</span>
                      <span className={cn(
                        "text-[9px] font-mono px-2 py-0.5 rounded uppercase tracking-tighter",
                        res.status === 'Critical' ? 'bg-red/20 text-red' : 
                        res.status === 'High Risk' ? 'bg-orange/20 text-orange' : 
                        'bg-blue/20 text-blue'
                      )}>
                        {res.status}
                      </span>
                    </div>
                  ))}
                  {(!scan.results || scan.results.length === 0) && (
                    <div className="text-[10px] font-mono text-green uppercase tracking-widest">No Risks Detected</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Social Protection Quick Action */}
      <div className="glass p-8 rounded-2xl border-white/10 bg-gradient-to-br from-blue/10 via-transparent to-transparent relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldCheck className="w-32 h-32 text-blue" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue/10 border border-blue/20 text-blue text-[10px] font-mono uppercase tracking-widest">
              Identity Protection
            </div>
            <h3 className="text-3xl font-black tracking-tighter uppercase italic">Secure Your Social Mesh</h3>
            <p className="text-slate-400 text-sm max-w-xl">
              Connect your Instagram, Twitter, and Facebook accounts to enable real-time deepfake monitoring. 
              Our neural engine scans for impersonations and manipulated media targeting your profile.
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <div className="flex flex-col gap-3 bg-black/20 p-4 rounded-xl border border-white/5">
              <div className="flex gap-2">
                <select 
                  value={manualPlatform}
                  onChange={(e) => setManualPlatform(e.target.value)}
                  className="bg-bg border border-white/10 rounded px-3 py-2 text-[10px] font-mono uppercase tracking-widest outline-none focus:border-blue transition-colors"
                >
                  <option value="twitter">Twitter</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                </select>
                <input 
                  type="text"
                  value={manualAccountId}
                  onChange={(e) => setManualAccountId(e.target.value)}
                  placeholder="@username"
                  className="flex-1 bg-bg border border-white/10 rounded px-3 py-2 text-[10px] font-mono outline-none focus:border-blue transition-colors"
                />
              </div>
              <button 
                onClick={() => onSocialAction(manualPlatform, manualAccountId)}
                className="w-full bg-blue text-black py-3 rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-blue/90 transition-all flex items-center justify-center gap-2"
              >
                <Scan className="w-3 h-3" /> Start Forensic Scan
              </button>
              <div className="flex justify-center gap-4 pt-2 border-t border-white/5">
                <button 
                  onClick={() => onSocialAction('twitter', '@elonmusk')}
                  className="text-[8px] font-mono text-slate-500 hover:text-blue transition-colors uppercase tracking-widest"
                >
                  [Elon Musk]
                </button>
                <button 
                  onClick={() => onSocialAction('twitter', '@deepfake_demo')}
                  className="text-[8px] font-mono text-blue/60 hover:text-blue transition-colors uppercase tracking-widest"
                >
                  [Deepfake Demo]
                </button>
                <button 
                  onClick={() => onSocialAction('instagram', '@cristiano')}
                  className="text-[8px] font-mono text-slate-500 hover:text-pink-500 transition-colors uppercase tracking-widest"
                >
                  [Cristiano]
                </button>
                <button 
                  onClick={() => onSocialAction('instagram', '@leomessi')}
                  className="text-[8px] font-mono text-slate-500 hover:text-pink-500 transition-colors uppercase tracking-widest"
                >
                  [Leo Messi]
                </button>
              </div>
            </div>
            <div className="flex gap-4 justify-center md:justify-end">
              <div className="w-10 h-10 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                <Instagram className="w-5 h-5 text-pink-500" />
              </div>
              <div className="w-10 h-10 rounded-full bg-blue/10 border border-blue/20 flex items-center justify-center">
                <Twitter className="w-5 h-5 text-blue" />
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-600/10 border border-blue-600/20 flex items-center justify-center">
                <Facebook className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <button 
              onClick={onSocialAction}
              className="flex-1 md:flex-none bg-blue text-black px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue/90 transition-all shadow-[0_0_30px_rgba(0,180,255,0.3)]"
            >
              Connect Accounts →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnalysisResultSummary: React.FC<{ analysis: any; selectedImage: string | null; onFullReport: () => void }> = ({ analysis, selectedImage, onFullReport }) => {
  if (!analysis) return null;

  const isHighRisk = analysis.riskScore > 70;
  const isMediumRisk = analysis.riskScore > 30 && analysis.riskScore <= 70;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6 rounded-2xl border-white/10 space-y-6 bg-gradient-to-br from-blue/5 to-transparent mb-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {selectedImage && (
            <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 shrink-0 shadow-2xl">
              {selectedImage.startsWith('data:video') ? (
                <video src={selectedImage} className="w-full h-full object-cover" />
              ) : (
                <img src={selectedImage} className="w-full h-full object-cover" alt="Analyzed" />
              )}
            </div>
          )}
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shrink-0",
              isHighRisk ? "bg-red/20 text-red shadow-red/20" : 
              isMediumRisk ? "bg-gold/20 text-gold shadow-gold/20" : 
              "bg-green/20 text-green shadow-green/20"
            )}>
              {isHighRisk ? <AlertTriangle className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tighter uppercase italic">Analysis Verdict: {analysis.verdict}</h3>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Neural Scan Complete · Confidence: {analysis.confidence}%</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6 self-end md:self-auto">
          <div className="text-right">
            <div className={cn(
              "text-3xl font-black tracking-tighter italic",
              isHighRisk ? "text-red" : isMediumRisk ? "text-gold" : "text-green"
            )}>
              {analysis.riskScore}%
            </div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Risk Score</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {analysis.findings?.slice(0, 3).map((finding: string, i: number) => (
          <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue mt-1.5 shrink-0" />
            <p className="text-xs text-slate-300 leading-relaxed">{finding}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-white/5 gap-4">
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            <Zap className="w-3 h-3 text-blue" /> AI Processed
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            <Globe className="w-3 h-3 text-blue" /> Web Verified
          </div>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button 
            onClick={() => {
              // This is a bit of a hack since we don't have easy access to setIsChatOpen here
              // but we can assume it's handled by the parent or use a custom event
              window.dispatchEvent(new CustomEvent('open-ai-chat'));
            }}
            className="flex-1 sm:flex-none bg-blue/10 hover:bg-blue/20 text-blue border border-blue/20 px-4 py-2 rounded text-[10px] font-mono uppercase tracking-widest transition-all flex items-center justify-center gap-2"
          >
            <Bot className="w-3 h-3" /> Ask AI Assistant
          </button>
          <button 
            onClick={onFullReport}
            className="flex-1 sm:flex-none bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded text-[10px] font-mono uppercase tracking-widest transition-all flex items-center justify-center gap-2"
          >
            View Full Report <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  onLogout, 
  onAnalyze, 
  onViewCase,
  onWarRoom,
  loading,
  uploadProgress,
  analysis,
  selectedImage
}) => {
  const [activeTab, setActiveTab] = useState('up');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [analysisMode, setAnalysisMode] = useState<'ai' | 'manual'>('ai');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isActivityFeedOpen, setIsActivityFeedOpen] = useState(true);
  const [isDeepAnalysis, setIsDeepAnalysis] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isComparisonMode, setIsComparisonMode] = useState(false);
  const [suspectFile, setSuspectFile] = useState<File | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [connectedAccounts, setConnectedAccounts] = useState<{ platform: string; username: string }[]>([]);
  const [initialSocialScan, setInitialSocialScan] = useState<{ platform: string; accountId: string } | null>(null);
  const [recentSocialScans, setRecentSocialScans] = useState<any[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('verimedia_user');
    if (!savedUser) return;
    const user = JSON.parse(savedUser);

    const loadData = () => {
      const accounts = JSON.parse(localStorage.getItem(`verimedia_accounts_${user.uid}`) || '[]');
      setConnectedAccounts(accounts);

      const scans = JSON.parse(localStorage.getItem(`verimedia_history_${user.uid}`) || '[]');
      // Sort by timestamp descending
      scans.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setRecentSocialScans(scans);
    };

    loadData();

    // Listen for updates
    window.addEventListener('social-accounts-updated', loadData);
    return () => window.removeEventListener('social-accounts-updated', loadData);
  }, []);

  useEffect(() => {
    const handleOpenChat = () => setIsChatOpen(true);
    window.addEventListener('open-ai-chat', handleOpenChat);
    return () => window.removeEventListener('open-ai-chat', handleOpenChat);
  }, []);

  const forensicTabs = ['res', 'hm', 'for', 'neu', 'conf', 'xai', 'valid', 'direct', 'rpt', 'email', 'pdf', 'ai-assistant', 'deepfake'];
  const imageOnlyTabs = ['slider', 'exif', 'channels'];
  
  const needsAnalysis = forensicTabs.includes(activeTab) && !analysis;
  const needsImage = imageOnlyTabs.includes(activeTab) && !selectedImage;

  const renderTabContent = () => {
    if (needsAnalysis) {
      return <SystemOverview 
        title={menuItems.find(i => i.id === activeTab)?.label || 'Forensic'} 
        onAction={() => setActiveTab('up')} 
        onSocialAction={(p, a) => {
          if (p && a) {
            setInitialSocialScan({ platform: p, accountId: a });
            setActiveTab('social');
          } else {
            setActiveTab('scan-hist');
          }
        }} 
        recentScans={recentSocialScans.slice(0, 6)}
      />;
    }
    
    if (needsImage) {
      return <SystemOverview 
        title={menuItems.find(i => i.id === activeTab)?.label || 'Image Analysis'} 
        onAction={() => setActiveTab('up')} 
        onSocialAction={(p, a) => {
          if (p && a) {
            setInitialSocialScan({ platform: p, accountId: a });
            setActiveTab('social');
          } else {
            setActiveTab('scan-hist');
          }
        }} 
        recentScans={recentSocialScans.slice(0, 6)}
      />;
    }

    switch (activeTab) {
      case 'settings': return <Settings />;
      case 'social': return <SocialGuard initialPlatform={initialSocialScan?.platform} initialAccountId={initialSocialScan?.accountId} />;
      case 'deepfake': return <DeepfakeDetection analysis={analysis} selectedImage={selectedImage} />;
      case 'hunt':
      case 'ws':
      case 'prop':
        return <Hunt analysis={analysis} onAnalyze={onAnalyze} />;
      case 'conf': return <ConfidenceEngine analysis={analysis} />;
      case 'xai': return <ExplainableAI analysis={analysis} />;
      case 'valid': return <AIValidation analysis={analysis} />;
      case 'dataset': return <Dataset />;
      case 'api': return <APIConsole />;
      case 'feedback':
        return (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="space-y-2">
              <h3 className="text-3xl font-black tracking-tighter uppercase italic">System Feedback & Suggestions</h3>
              <p className="text-slate-400 text-sm">Help us improve the VeriMedia AI engine. Your suggestions go directly to our engineering team.</p>
            </div>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                toast.success('Feedback submitted. Thank you for your contribution!');
              }}
              className="bg-s1 border border-white/10 p-8 rounded-2xl space-y-6 shadow-2xl"
            >
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Feedback Category</label>
                <select className="w-full bg-bg border border-white/10 rounded p-3 text-sm outline-none focus:border-blue transition-colors appearance-none">
                  <option>Feature Suggestion</option>
                  <option>Bug Report</option>
                  <option>Algorithm Improvement</option>
                  <option>UI/UX Feedback</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Your Suggestion</label>
                <textarea 
                  required
                  rows={6}
                  placeholder="Describe your suggestion or the issue you encountered..."
                  className="w-full bg-bg border border-white/10 rounded p-4 text-sm outline-none focus:border-blue transition-colors resize-none"
                />
              </div>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-bg text-blue focus:ring-blue" />
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest group-hover:text-slate-300 transition-colors">Include system logs for debugging</span>
                </label>
              </div>
              <button type="submit" className="w-full bg-blue text-black py-4 rounded font-black text-xs uppercase tracking-[0.2em] hover:bg-blue/90 transition-all">
                Submit Feedback →
              </button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-2">
                <div className="text-blue font-bold text-xs uppercase tracking-widest">Community Roadmap</div>
                <p className="text-[10px] text-slate-500 leading-relaxed">See what other federations are suggesting and vote on upcoming features.</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-2">
                <div className="text-purple font-bold text-xs uppercase tracking-widest">Developer Program</div>
                <p className="text-[10px] text-slate-500 leading-relaxed">Join our beta testing group for early access to experimental neural layers.</p>
              </div>
            </div>
          </div>
        );
      case 'direct': return <DirectSearch analysis={analysis} />;
      case 'ai-assistant': return <ForensicAssistant analysis={analysis} />;
      case 'asset-gen': return <AssetGenerator />;
      case 'slider': return <ComparisonSlider original={selectedImage || "https://picsum.photos/seed/orig/800/600"} suspect={selectedImage || "https://picsum.photos/seed/fake/800/600"} />;
      case 'exif': return <EXIFMetadata image={selectedImage} />;
      case 'channels': return <ColorChannels image={selectedImage || "https://picsum.photos/seed/forensic/800/600"} />;
      case 'batch': return <BatchAnalysis />;
      case 'hist': return <CaseHistory />;
      case 'scan-hist': 
        return <ScanHistory 
          scans={recentSocialScans} 
          onViewScan={(p, a) => {
            setInitialSocialScan({ platform: p, accountId: a });
            setActiveTab('social');
          }} 
        />;
      case 'rpt': return <ReportDMCA analysis={analysis} />;
      case 'email': return <EmailReport analysis={analysis} />;
      case 'pdf': return <PDFExport analysis={analysis} />;
      case 'res':
      case 'hm':
      case 'for':
      case 'neu':
        return <Forensics analysis={analysis} selectedImage={selectedImage} onBack={() => setActiveTab('up')} />;
      case 'ws':
      case 'prop':
        return <Hunt analysis={analysis} onAnalyze={onAnalyze} />;
      case 'act':
        return (
          <div className="bg-s1 border border-white/5 p-8 rounded-xl space-y-4">
            <h3 className="text-xl font-black tracking-tighter uppercase italic">Action Log</h3>
            <div className="space-y-2">
              {notifications.map((n, i) => (
                <div key={i} className="p-3 bg-bg border border-white/5 rounded text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  [{new Date().toLocaleTimeString()}] {n.platform}: {n.msg}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const mockAnalysis = {
    confidence: 94.2,
    ela: 0.92,
    noise: 0.85,
    jpeg: 0.78,
    metadata: 'Photoshop Signature Detected',
    matches: 3
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchIntelligence = async () => {
      const data = await getLiveIntelligence();
      if (data && data.length > 0) {
        setNotifications(data.map((n: any) => ({ ...n, id: Math.random(), time: 'Just now' })));
      }
    };

    const interval = setInterval(fetchIntelligence, 1800000); // 30 minutes
    fetchIntelligence();
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { id: 'up', label: 'Upload & Analyze', icon: Upload, group: 'Analysis' },
    { id: 'deepfake', label: 'Deepfake Detection', icon: Scan, group: 'Analysis' },
    { id: 'social', label: 'Social Guard', icon: ShieldCheck, group: 'Analysis' },
    { id: 'res', label: 'Results', icon: Activity, group: 'Analysis' },
    { id: 'hm', label: 'Heatmap', icon: Zap, group: 'Analysis' },
    { id: 'for', label: 'Forensics', icon: Scan, group: 'Analysis' },
    { id: 'neu', label: 'Neural AI', icon: Cpu, group: 'Analysis' },
    { id: 'conf', label: 'Confidence Engine', icon: LayoutDashboard, group: 'Analysis' },
    { id: 'xai', label: 'Explainable AI', icon: Eye, group: 'Analysis' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot, group: 'Analysis' },
    { id: 'asset-gen', label: 'Asset Generator', icon: ImageIcon, group: 'Analysis' },
    
    { id: 'hunt', label: 'Forensic Hunt', icon: Search, group: 'Intelligence' },
    { id: 'war-room', label: 'Neural War Room', icon: ShieldAlert, group: 'Intelligence' },
    { id: 'ws', label: 'Web Search', icon: Globe, group: 'Intelligence' },
    { id: 'prop', label: 'Propagation', icon: Share2, group: 'Intelligence' },
    { id: 'act', label: 'Action Log', icon: Zap, group: 'Intelligence' },
    
    { id: 'valid', label: 'AI Validation', icon: FileCheck, group: 'System' },
    { id: 'dataset', label: 'Dataset', icon: Database, group: 'System' },
    { id: 'api', label: 'API Console', icon: Terminal, group: 'System' },
    { id: 'settings', label: 'Settings', icon: SettingsIcon, group: 'System' },
    { id: 'feedback', label: 'Feedback', icon: Mail, group: 'System' },
    
    { id: 'direct', label: 'Direct Search', icon: Search, group: 'Tools' },
    { id: 'slider', label: 'Compare Slider', icon: MousePointer2, group: 'Tools' },
    { id: 'exif', label: 'EXIF Metadata', icon: Camera, group: 'Tools' },
    { id: 'channels', label: 'Color Channels', icon: Layers, group: 'Tools' },
    { id: 'batch', label: 'Batch Analysis', icon: Layers, group: 'Tools' },
    { id: 'hist', label: 'Case History', icon: History, group: 'Tools' },
    { id: 'rpt', label: 'Report & DMCA', icon: FileText, group: 'Tools' },
    { id: 'scan-hist', label: 'Scan History', icon: History, group: 'Tools' },
    { id: 'email', label: 'Send Email', icon: Mail, group: 'Tools' },
    { id: 'pdf', label: 'PDF Export', icon: Download, group: 'Tools' },
  ];

  return (
    <div className="min-h-screen bg-bg flex text-text font-sans relative">
      {/* Floating AI Assistant Button */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className={cn(
          "fixed bottom-24 lg:bottom-8 right-8 z-[60] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group",
          isChatOpen ? "bg-red text-white rotate-90" : "bg-blue text-black hover:scale-110"
        )}
      >
        {isChatOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        {!isChatOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red rounded-full border-2 border-bg flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
          </div>
        )}
        <div className="absolute right-full mr-4 px-3 py-1 bg-s1 border border-white/10 rounded text-[10px] font-mono text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Forensic Assistant
        </div>
      </button>

      {/* AI Assistant Side Panel */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full lg:w-[450px] z-[70] bg-s1/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center border border-blue/20">
                  <Bot className="w-6 h-6 text-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tighter uppercase italic">Neural Assistant</h3>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Context-Aware Forensic Intelligence</p>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-500 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-hidden p-4">
              <ForensicAssistant analysis={analysis} />
            </div>

            <div className="p-4 border-t border-white/10 bg-white/5">
              <div className="flex items-center gap-4">
                <div className="flex-1 space-y-1">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Current Context</div>
                  <div className="text-[10px] font-bold text-white uppercase tracking-wider truncate">
                    {analysis ? `Analyzing: ${analysis.verdict}` : 'No Active Analysis'}
                  </div>
                </div>
                <div className={cn(
                  "px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-widest",
                  analysis ? "bg-green/10 text-green" : "bg-slate-800 text-slate-500"
                )}>
                  {analysis ? 'Synced' : 'Idle'}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showUpgrade && <MonetizePopup onClose={() => setShowUpgrade(false)} />}
      </AnimatePresence>

      <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Sidebar */}
      <aside className={cn(
        "bg-s1 border-r border-white/10 flex flex-col sticky top-0 h-screen overflow-y-auto scrollbar-hide transition-all duration-300 z-50",
        isSidebarOpen ? "w-64" : "w-0 lg:w-20 overflow-hidden"
      )}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className={cn("flex items-center gap-2", !isSidebarOpen && "lg:hidden")}>
            <Shield className="w-6 h-6 text-blue" />
            <span className="font-black tracking-tighter uppercase italic text-lg">
              VeriMedia <span className="text-blue">AI</span>
            </span>
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 py-4">
          {['Analysis', 'Intelligence', 'System', 'Tools'].map(group => (
            <div key={group} className="mb-6">
              <div className="px-6 mb-2 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500">{group}</div>
              {menuItems.filter(i => i.group === group).map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'war-room') onWarRoom();
                    else setActiveTab(item.id);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-6 py-2 text-sm transition-all border-l-2",
                    activeTab === item.id 
                      ? "bg-blue/10 text-blue border-blue font-bold" 
                      : "text-slate-400 border-transparent hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="bg-white/5 rounded-lg p-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue/20 flex items-center justify-center text-blue font-black italic">
                {user?.name?.[0] || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold truncate">{user?.name || 'Admin'}</div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Pro League</div>
              </div>
              <button onClick={onLogout} className="text-slate-500 hover:text-red transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-0">
        <header className="h-14 border-b border-white/10 bg-s1/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-500 hover:text-white transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm font-black tracking-tighter uppercase italic text-blue">
              {menuItems.find(i => i.id === activeTab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-3 border-r border-white/10 pr-6">
              {['twitter', 'instagram', 'facebook'].map(p => {
                const isConnected = connectedAccounts.some(a => a.platform === p);
                return (
                  <div 
                    key={p} 
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center transition-all",
                      isConnected ? "bg-blue/20 text-blue" : "bg-white/5 text-slate-600"
                    )}
                    title={isConnected ? `${p.charAt(0).toUpperCase() + p.slice(1)} Connected` : `${p.charAt(0).toUpperCase() + p.slice(1)} Disconnected`}
                  >
                    {p === 'twitter' && <Twitter className="w-3 h-3" />}
                    {p === 'instagram' && <Instagram className="w-3 h-3" />}
                    {p === 'facebook' && <Facebook className="w-3 h-3" />}
                  </div>
                );
              })}
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Backend Online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Neural Ready</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-slate-500 hover:text-white transition-colors relative">
                <Bell className="w-4 h-4" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red rounded-full border border-bg" />
              </button>
              <div className="text-[10px] font-mono text-slate-500">{currentTime.toLocaleTimeString('en-US', { hour12: false })}</div>
            </div>
          </div>
        </header>

        {loading && (
          <div className="sticky top-14 z-30 w-full bg-bg/80 backdrop-blur-sm border-b border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 py-2 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 shrink-0">
                <Loader2 className="w-3 h-3 text-blue animate-spin" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue">Neural Analysis in Progress...</span>
              </div>
              <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-blue shadow-[0_0_10px_rgba(0,180,255,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-blue w-8 text-right">{uploadProgress}%</span>
            </div>
          </div>
        )}

        <div className="p-4 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
          <LiveActivityFeed isOpen={isActivityFeedOpen} setIsOpen={setIsActivityFeedOpen} analysis={analysis} notifications={notifications} />
          
          {activeTab === 'up' && analysis && (
            <AnalysisResultSummary analysis={analysis} selectedImage={selectedImage} onFullReport={() => setActiveTab('res')} />
          )}

          {renderTabContent()}
          
          {activeTab === 'up' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center gap-4 bg-white/5 p-1 rounded-lg w-fit">
                  <button 
                    onClick={() => setAnalysisMode('ai')}
                    className={cn(
                      "px-4 py-1.5 rounded text-[10px] font-mono uppercase tracking-widest transition-all",
                      analysisMode === 'ai' ? "bg-blue text-black font-bold" : "text-slate-500 hover:text-white"
                    )}
                  >
                    AI Detection
                  </button>
                  <button 
                    onClick={() => setAnalysisMode('manual')}
                    className={cn(
                      "px-4 py-1.5 rounded text-[10px] font-mono uppercase tracking-widest transition-all",
                      analysisMode === 'manual' ? "bg-blue text-black font-bold" : "text-slate-500 hover:text-white"
                    )}
                  >
                    Manual Forensic
                  </button>
                  <div className="h-6 w-px bg-white/10 mx-2" />
                  <button 
                    onClick={() => setIsComparisonMode(!isComparisonMode)}
                    className={cn(
                      "px-4 py-1.5 rounded text-[10px] font-mono uppercase tracking-widest transition-all flex items-center gap-2",
                      isComparisonMode ? "bg-gold text-black font-bold shadow-lg shadow-gold/20" : "text-slate-500 hover:text-white"
                    )}
                  >
                    <Layers className={cn("w-3 h-3", isComparisonMode ? "text-black" : "text-gold")} />
                    Comparison Mode
                  </button>
                  <button 
                    onClick={() => setIsDeepAnalysis(!isDeepAnalysis)}
                    className={cn(
                      "px-4 py-1.5 rounded text-[10px] font-mono uppercase tracking-widest transition-all flex items-center gap-2",
                      isDeepAnalysis ? "bg-purple-600 text-white font-bold shadow-lg shadow-purple-500/20" : "text-slate-500 hover:text-white"
                    )}
                  >
                    <Sparkles className={cn("w-3 h-3", isDeepAnalysis ? "text-white" : "text-purple-400")} />
                    Deep Analysis (Thinking Mode)
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={cn(
                    "glass p-8 rounded-2xl border-dashed border-2 transition-all group relative overflow-hidden flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]",
                    suspectFile ? "border-blue/50 bg-blue/5" : "border-white/10 hover:border-blue/50"
                  )}>
                    <input 
                      type="file" 
                      accept="image/*,video/*"
                      className="absolute inset-0 opacity-0 cursor-pointer z-20" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 50 * 1024 * 1024) {
                            toast.error("File size exceeds 50MB limit.");
                            return;
                          }
                          setSuspectFile(file);
                          if (!isComparisonMode) {
                            onAnalyze(file, isDeepAnalysis);
                          }
                        }
                      }}
                    />
                    <div className="w-16 h-16 rounded-full bg-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Upload className="w-8 h-8 text-blue" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-black tracking-tighter uppercase italic">
                        {suspectFile ? suspectFile.name : "Upload Suspect Media"}
                      </h3>
                      <p className="text-slate-400 text-[10px] uppercase tracking-widest">
                        {isComparisonMode ? "Primary target for comparison" : "Drag & drop image or video"}
                      </p>
                    </div>
                    {suspectFile && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSuspectFile(null);
                        }}
                        className="absolute top-2 right-2 p-1 bg-red/20 text-red rounded-full hover:bg-red/30 z-30"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {isComparisonMode && (
                    <div className={cn(
                      "glass p-8 rounded-2xl border-dashed border-2 transition-all group relative overflow-hidden flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]",
                      originalFile ? "border-green/50 bg-green/5" : "border-white/10 hover:border-green/50"
                    )}>
                      <input 
                        type="file" 
                        accept="image/*,video/*"
                        className="absolute inset-0 opacity-0 cursor-pointer z-20" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (file.size > 50 * 1024 * 1024) {
                              toast.error("File size exceeds 50MB limit.");
                              return;
                            }
                            setOriginalFile(file);
                          }
                        }}
                      />
                      <div className="w-16 h-16 rounded-full bg-green/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-8 h-8 text-green" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-black tracking-tighter uppercase italic">
                          {originalFile ? originalFile.name : "Upload Original Media"}
                        </h3>
                        <p className="text-slate-400 text-[10px] uppercase tracking-widest">Reference for comparison</p>
                      </div>
                      {originalFile && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setOriginalFile(null);
                          }}
                          className="absolute top-2 right-2 p-1 bg-red/20 text-red rounded-full hover:bg-red/30 z-30"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {isComparisonMode && (
                  <div className="flex justify-center pt-4">
                    <button 
                      disabled={!suspectFile || !originalFile || loading}
                      onClick={() => suspectFile && originalFile && onAnalyze(suspectFile, isDeepAnalysis, originalFile)}
                      className="bg-blue text-black px-12 py-4 rounded-xl font-black text-sm uppercase tracking-[0.2em] hover:bg-blue/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(0,180,255,0.3)]"
                    >
                      {loading ? "Neural Engine Processing..." : "Start Forensic Comparison →"}
                    </button>
                  </div>
                )}

                {!isComparisonMode && loading && (
                  <div className="glass p-8 rounded-2xl border-white/10 flex flex-col items-center justify-center space-y-4">
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-6 h-6 text-blue animate-spin" />
                      <span className="text-sm font-black tracking-tighter uppercase italic">Neural Analysis in Progress...</span>
                    </div>
                    <div className="w-full max-w-sm space-y-2">
                      <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                        <span>Progress</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-blue"
                          initial={{ width: 0 }}
                          animate={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Social Guard Status */}
                <div className="glass p-6 rounded-2xl border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-blue" />
                      <h3 className="font-black text-xs uppercase tracking-widest italic">Social Guard Status</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={cn("w-2 h-2 rounded-full", connectedAccounts.length > 0 ? "bg-green animate-pulse" : "bg-slate-600")} />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                        {connectedAccounts.length > 0 ? "Active Monitoring" : "Standby Mode"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {['twitter', 'instagram', 'facebook'].map(p => {
                      const isConnected = connectedAccounts.some(a => a.platform === p);
                      return (
                        <div 
                          key={p} 
                          className={cn(
                            "p-3 rounded-xl border flex flex-col items-center gap-2 transition-all",
                            isConnected ? "bg-blue/10 border-blue/20 text-blue" : "bg-white/5 border-white/5 text-slate-500 grayscale"
                          )}
                        >
                          {p === 'twitter' && <Twitter className="w-5 h-5" />}
                          {p === 'instagram' && <Instagram className="w-5 h-5" />}
                          {p === 'facebook' && <Facebook className="w-5 h-5" />}
                          <div className="flex flex-col items-center">
                            <span className="text-[8px] font-mono uppercase tracking-widest">{p}</span>
                            <span className={cn("text-[10px] font-bold", isConnected ? "text-blue" : "text-slate-600")}>
                              {isConnected ? "Connected" : "Offline"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button 
                    onClick={() => setActiveTab('social')}
                    className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-[10px] font-mono uppercase tracking-widest transition-all border border-white/5 flex items-center justify-center gap-2 group"
                  >
                    Manage Social Connections <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Recent Activity */}
                <div className="glass rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                    <h3 className="font-bold text-xs uppercase tracking-widest flex items-center gap-2"><History className="w-4 h-4 text-blue" /> Recent Case History</h3>
                    <button className="text-[10px] font-mono uppercase tracking-widest text-slate-500 hover:text-white transition-colors">View All</button>
                  </div>
                  <div className="divide-y divide-white/5">
                    {[
                      { id: `VMA-${Math.floor(Math.random() * 9000) + 1000}`, name: 'IMG_4829.jpg', status: 'Clean', time: '2 mins ago', color: 'text-green' },
                      { id: `VMA-${Math.floor(Math.random() * 9000) + 1000}`, name: 'deepfake_test_01.mp4', status: 'Violation', time: '1 hour ago', color: 'text-red' },
                      { id: `VMA-${Math.floor(Math.random() * 9000) + 1000}`, name: 'social_media_ad.png', status: 'Suspicious', time: '3 hours ago', color: 'text-gold' },
                    ].map((item, i) => (
                      <div key={i} onClick={() => onViewCase(item.id)} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center group-hover:bg-blue/10 transition-colors">
                            <FileSearch className="w-5 h-5 text-slate-500 group-hover:text-blue transition-colors" />
                          </div>
                          <div>
                            <p className="text-sm font-bold">{item.name}</p>
                            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{item.id} · {item.time}</p>
                          </div>
                        </div>
                        <div className={cn("text-[10px] font-mono uppercase px-3 py-1 rounded-full bg-white/5 border border-white/5", item.color)}>
                          {item.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                {/* Deepfake Detection Card */}
                <div className="glass p-6 rounded-xl border-purple-500/30 bg-purple-500/5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                      <ShieldAlert className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black tracking-tighter uppercase italic">Deepfake Detection</h3>
                      <p className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Advanced Neural Scan</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    Activate high-thinking mode to identify deepfaked, cropped, or manipulated content with pixel-level precision.
                  </p>
                  <button 
                    onClick={() => {
                      setIsDeepAnalysis(true);
                      setActiveTab('deepfake');
                    }}
                    className="w-full bg-purple-600 text-white py-2 rounded font-black text-[10px] uppercase tracking-widest hover:bg-purple-500 transition-all shadow-lg shadow-purple-500/20"
                  >
                    Activate Deep Scan
                  </button>
                </div>

                {/* Live Feed */}
                <div className="glass rounded-xl overflow-hidden border-blue/20">
                  <div className="p-4 border-b border-white/5 bg-blue/5 flex items-center justify-between">
                    <h3 className="font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 text-blue">
                      <Scan className="w-3 h-3 animate-pulse" /> Live Intelligence Feed
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue animate-ping" />
                      <span className="text-[8px] font-mono text-blue/80">LIVE</span>
                    </div>
                  </div>
                  <div className="divide-y divide-white/5 max-h-[400px] overflow-y-auto scrollbar-hide">
                    <AnimatePresence initial={false}>
                      {notifications.map((n) => (
                        <motion.div 
                          key={n.id}
                          initial={{ opacity: 0, x: -20, height: 0 }}
                          animate={{ opacity: 1, x: 0, height: 'auto' }}
                          exit={{ opacity: 0, x: 20, height: 0 }}
                          className="p-4 flex items-start gap-3 hover:bg-white/5 transition-colors"
                        >
                          <div className={cn(
                            "p-2 rounded-lg shrink-0",
                            n.type === 'threat' ? "bg-red/10 text-red" : 
                            n.type === 'alert' ? "bg-gold/10 text-gold" : 
                            "bg-blue/10 text-blue"
                          )}>
                            {n.type === 'threat' ? <AlertTriangle className="w-3 h-3" /> : 
                             n.type === 'alert' ? <Scan className="w-3 h-3" /> : 
                             <Activity className="w-3 h-3" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="text-[8px] font-mono uppercase tracking-widest text-slate-500">{n.platform}</span>
                              <span className="text-[8px] text-slate-600">Just now</span>
                            </div>
                            <p className="text-[11px] text-slate-300 leading-tight font-medium">{n.msg}</p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="glass p-6 rounded-2xl space-y-4">
                  <h3 className="font-bold text-xs uppercase tracking-widest flex items-center gap-2"><Zap className="w-4 h-4 text-blue" /> System Intelligence</h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-blue/5 border border-blue/20 space-y-2">
                      <p className="text-[10px] font-bold text-blue uppercase tracking-widest">Pro Tip</p>
                      <p className="text-xs text-slate-400 leading-relaxed">Use "Hunt Mode" to track where your assets are being shared across 340+ social platforms in real-time.</p>
                    </div>
                  <div className="space-y-3">
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Live Network Status</p>
                    {[
                      { label: 'Bing Visual API', status: 'Connected', load: Math.floor(Math.random() * 30) + 10 },
                      { label: 'Google Lens Node', status: 'Connected', load: Math.floor(Math.random() * 40) + 30 },
                      { label: 'Neural Cluster', status: 'Active', load: Math.floor(Math.random() * 20) + 75 },
                    ].map((s, i) => (
                      <div key={i} className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400">{s.label}</span>
                          <span className="text-green font-mono uppercase tracking-widest">{s.status}</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            className={cn(
                              "h-full transition-all duration-1000",
                              s.load > 80 ? "bg-red" : s.load > 50 ? "bg-gold" : "bg-blue"
                            )}
                            initial={{ width: 0 }}
                            animate={{ width: `${s.load}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Footer />
        </div>
      </main>
    </div>
  );
};
