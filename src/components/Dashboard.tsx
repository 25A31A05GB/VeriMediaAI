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
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { cn } from '../lib/utils';
import { Hunt } from './Hunt';
import { ConfidenceEngine } from './ConfidenceEngine';
import { ExplainableAI } from './ExplainableAI';
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
    { id: 1, type: 'Deepfake', status: 'High Risk', target: 'video_01.mp4', time: '2m ago', color: 'text-red' },
    { id: 2, type: 'Edited', status: 'Modified', target: 'img_992.jpg', time: '5m ago', color: 'text-orange' },
    { id: 3, type: 'Cropped', status: 'Suspicious', target: 'profile_shot.png', time: '12m ago', color: 'text-yellow' },
    { id: 4, type: 'Context Change', status: 'Alert', target: 'news_clip.mp4', time: '15m ago', color: 'text-blue' },
  ]);

  useEffect(() => {
    if (notifications && notifications.length > 0) {
      const mapped = notifications.map(n => ({
        id: n.id || Math.random(),
        type: n.platform || 'Intelligence',
        status: n.msg || 'Alert',
        target: 'Global Scan',
        time: n.time || 'Just now',
        color: n.msg?.toLowerCase().includes('critical') ? 'text-red' : 'text-blue'
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
  onAnalyze: (file: File, deep?: boolean) => void;
  onViewCase: (id: string) => void;
  loading: boolean;
  uploadProgress: number;
  analysis: any;
  selectedImage: string | null;
}

const NoData: React.FC<{ title: string; onAction: () => void }> = ({ title, onAction }) => (
  <div className="flex flex-col items-center justify-center p-20 bg-s1 border border-white/5 rounded-2xl space-y-6 text-center">
    <div className="w-16 h-16 bg-blue/10 rounded-full flex items-center justify-center">
      <AlertTriangle className="w-8 h-8 text-blue" />
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-black tracking-tighter uppercase italic">No Analysis Data</h3>
      <p className="text-slate-400 text-sm max-w-xs">You need to upload and analyze media before accessing the {title} engine.</p>
    </div>
    <button 
      onClick={onAction}
      className="bg-blue text-black px-6 py-2 rounded font-bold text-xs uppercase tracking-widest hover:bg-blue/90 transition-all"
    >
      Upload Media Now →
    </button>
  </div>
);

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

  useEffect(() => {
    const handleOpenChat = () => setIsChatOpen(true);
    window.addEventListener('open-ai-chat', handleOpenChat);
    return () => window.removeEventListener('open-ai-chat', handleOpenChat);
  }, []);

  const forensicTabs = ['res', 'hm', 'for', 'neu', 'conf', 'xai', 'valid', 'direct', 'rpt', 'email', 'pdf', 'ai-assistant', 'asset-gen'];
  const imageOnlyTabs = ['slider', 'exif', 'channels'];
  
  const needsAnalysis = forensicTabs.includes(activeTab) && !analysis;
  const needsImage = imageOnlyTabs.includes(activeTab) && !selectedImage;

  const renderTabContent = () => {
    if (needsAnalysis) {
      return <NoData title={menuItems.find(i => i.id === activeTab)?.label || 'Forensic'} onAction={() => setActiveTab('up')} />;
    }
    
    if (needsImage) {
      return <NoData title={menuItems.find(i => i.id === activeTab)?.label || 'Image Analysis'} onAction={() => setActiveTab('up')} />;
    }

    switch (activeTab) {
      case 'hunt': return <Hunt analysis={analysis} />;
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
        return <Hunt analysis={analysis} />;
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

    const interval = setInterval(fetchIntelligence, 15000);
    fetchIntelligence();
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { id: 'up', label: 'Upload & Analyze', icon: Upload, group: 'Analysis' },
    { id: 'res', label: 'Results', icon: Activity, group: 'Analysis' },
    { id: 'hm', label: 'Heatmap', icon: Zap, group: 'Analysis' },
    { id: 'for', label: 'Forensics', icon: Scan, group: 'Analysis' },
    { id: 'neu', label: 'Neural AI', icon: Cpu, group: 'Analysis' },
    { id: 'conf', label: 'Confidence Engine', icon: LayoutDashboard, group: 'Analysis' },
    { id: 'xai', label: 'Explainable AI', icon: Eye, group: 'Analysis' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot, group: 'Analysis' },
    { id: 'asset-gen', label: 'Asset Generator', icon: ImageIcon, group: 'Analysis' },
    
    { id: 'ws', label: 'Web Search', icon: Globe, group: 'Intelligence' },
    { id: 'prop', label: 'Propagation', icon: Share2, group: 'Intelligence' },
    { id: 'act', label: 'Action Log', icon: Zap, group: 'Intelligence' },
    
    { id: 'valid', label: 'AI Validation', icon: FileCheck, group: 'System' },
    { id: 'dataset', label: 'Dataset', icon: Database, group: 'System' },
    { id: 'api', label: 'API Console', icon: Terminal, group: 'System' },
    { id: 'feedback', label: 'Feedback', icon: Mail, group: 'System' },
    
    { id: 'direct', label: 'Direct Search', icon: Search, group: 'Tools' },
    { id: 'slider', label: 'Compare Slider', icon: MousePointer2, group: 'Tools' },
    { id: 'exif', label: 'EXIF Metadata', icon: Camera, group: 'Tools' },
    { id: 'channels', label: 'Color Channels', icon: Layers, group: 'Tools' },
    { id: 'batch', label: 'Batch Analysis', icon: Layers, group: 'Tools' },
    { id: 'hist', label: 'Case History', icon: History, group: 'Tools' },
    { id: 'rpt', label: 'Report & DMCA', icon: FileText, group: 'Tools' },
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
                  onClick={() => setActiveTab(item.id)}
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

                <div className="glass p-8 lg:p-12 rounded-2xl border-dashed border-2 border-white/10 hover:border-blue/50 transition-all group relative overflow-hidden flex flex-col items-center justify-center text-center space-y-6">
                  <input 
                    type="file" 
                    accept="image/*,video/*"
                    className="absolute inset-0 opacity-0 cursor-pointer z-20" 
                    onChange={(e) => e.target.files?.[0] && onAnalyze(e.target.files[0], isDeepAnalysis)}
                  />
                  <div className="w-20 h-20 rounded-full bg-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-10 h-10 text-blue" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black tracking-tighter uppercase italic">Upload Media for Forensic Analysis</h3>
                    <p className="text-slate-400 text-sm">Drag & drop image or video (Max 50MB)</p>
                  </div>
                  <div className="flex gap-3">
                    {['PNG', 'JPG', 'WEBP', 'MP4', 'MOV'].map(ext => (
                      <span key={ext} className="px-3 py-1 rounded bg-white/5 text-[10px] font-mono text-slate-500 border border-white/5">{ext}</span>
                    ))}
                  </div>

                  {loading && (
                    <div className="absolute inset-0 bg-s1/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-12">
                      <div className="w-full max-w-sm space-y-6">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-blue animate-pulse uppercase tracking-widest">Analyzing Neural Layers...</span>
                          <span className="text-blue">{uploadProgress}%</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <motion.div 
                            className="h-full bg-blue shadow-[0_0_15px_rgba(0,180,255,0.5)]" 
                            initial={{ width: 0 }}
                            animate={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {['Running Triple-Hash Consensus', 'Artifact Detection Active', 'Neural Feature Extraction'].map((step, i) => (
                            <div key={i} className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest">
                              <div className={cn("w-1.5 h-1.5 rounded-full", uploadProgress > (i + 1) * 30 ? "bg-green" : "bg-slate-700")} />
                              {step}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Recent Activity */}
                <div className="glass rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
                    <h3 className="font-bold text-xs uppercase tracking-widest flex items-center gap-2"><History className="w-4 h-4 text-blue" /> Recent Case History</h3>
                    <button className="text-[10px] font-mono uppercase tracking-widest text-slate-500 hover:text-white transition-colors">View All</button>
                  </div>
                  <div className="divide-y divide-white/5">
                    {[
                      { id: 'VMA-9281', name: 'IMG_4829.jpg', status: 'Clean', time: '2 mins ago', color: 'text-green' },
                      { id: 'VMA-9282', name: 'deepfake_test_01.mp4', status: 'Violation', time: '1 hour ago', color: 'text-red' },
                      { id: 'VMA-9283', name: 'social_media_ad.png', status: 'Suspicious', time: '3 hours ago', color: 'text-gold' },
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
                        { label: 'Bing Visual API', status: 'Connected' },
                        { label: 'Google Lens Node', status: 'Connected' },
                        { label: 'Neural Cluster', status: 'Active' },
                      ].map((s, i) => (
                        <div key={i} className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400">{s.label}</span>
                          <span className="text-green font-mono uppercase tracking-widest">{s.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
