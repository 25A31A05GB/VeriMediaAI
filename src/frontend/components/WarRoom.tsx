import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  Activity, 
  Globe, 
  AlertTriangle, 
  Zap, 
  History,
  TrendingUp,
  LayoutDashboard
} from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import { Timeline, TimelineEvent } from './Timeline';
import { PropagationGraph } from './PropagationGraph';

interface WarRoomStats {
  threats_detected: number;
  platforms_affected: number;
  active_alerts: number;
}

export const WarRoom: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [stats, setStats] = useState<WarRoomStats>({
    threats_detected: 0,
    platforms_affected: 0,
    active_alerts: 0
  });
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(window.location.origin);
    setSocket(newSocket);

    newSocket.on('timeline-event', (event: TimelineEvent) => {
      setEvents(prev => [event, ...prev].slice(0, 50));
    });

    newSocket.on('war-room-update', (newStats: WarRoomStats) => {
      setStats(newStats);
    });

    // Initial fetch
    fetch('/api/system/timeline', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('verimedia_token')}` }
    })
    .then(res => res.json())
    .then(data => setEvents(data));

    return () => {
      newSocket.close();
    };
  }, []);

  const latestRisk = events.find(e => e.riskScore !== undefined)?.riskScore || 0;

  return (
    <div className="min-h-screen bg-bg p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue/10 border border-blue/20 flex items-center justify-center">
            <ShieldAlert className="w-6 h-6 text-blue animate-pulse-glow" />
          </div>
          <div>
            <h1 className="text-2xl font-black italic tracking-tighter uppercase text-white">Neural War Room</h1>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Real-time forensic mesh monitoring</p>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="px-4 py-2 glass rounded-xl text-xs font-mono text-slate-400 hover:text-white hover:border-blue/30 transition-all flex items-center gap-2"
        >
          <LayoutDashboard className="w-3 h-3" /> EXIT WAR ROOM
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Threats Detected", value: stats.threats_detected, icon: Activity, color: "text-blue" },
          { label: "Platforms Affected", value: stats.platforms_affected, icon: Globe, color: "text-gold" },
          { label: "Active Alerts", value: stats.active_alerts, icon: AlertTriangle, color: "text-red" }
        ].map((stat, idx) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass rounded-2xl p-6 border-l-2 border-l-blue/20 hover:border-l-blue transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-mono text-slate-500 uppercase mb-1">{stat.label}</p>
                <h2 className={`text-4xl font-black italic ${stat.color}`}>{stat.value}</h2>
              </div>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="mt-4 h-1 bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full bg-current ${stat.color}`}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Propagation Mesh */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass rounded-2xl overflow-hidden border border-white/5 h-[500px]">
            <PropagationGraph riskScore={latestRisk} />
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6 border border-white/5">
              <h3 className="text-xs font-mono uppercase tracking-widest text-blue mb-4 flex items-center gap-2">
                <TrendingUp className="w-3 h-3" /> Risk Velocity
              </h3>
              <div className="h-32 flex items-end gap-1">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div 
                    key={i}
                    className="flex-1 bg-blue/20 rounded-t-sm"
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.random() * 100}%` }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.1 }}
                  />
                ))}
              </div>
            </div>
            <div className="glass rounded-2xl p-6 border border-white/5">
              <h3 className="text-xs font-mono uppercase tracking-widest text-blue mb-4 flex items-center gap-2">
                <Zap className="w-3 h-3" /> Neural Load
              </h3>
              <div className="flex items-center justify-center h-32">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" stroke="#1A1C1E" strokeWidth="10" 
                    />
                    <circle 
                      cx="50" cy="50" r="45" 
                      fill="none" stroke="#00B4FF" strokeWidth="10" 
                      strokeDasharray="283" strokeDashoffset="70"
                      className="animate-pulse-glow"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-black italic text-blue">74%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Timeline */}
        <div className="lg:col-span-4 glass rounded-2xl border border-white/5 overflow-hidden flex flex-col h-[700px]">
          <div className="p-4 border-b border-white/5 bg-white/2 flex justify-between items-center">
            <h3 className="text-xs font-mono uppercase tracking-widest text-white flex items-center gap-2">
              <History className="w-3 h-3" /> Live Feed
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green animate-pulse" />
              <span className="text-[10px] font-mono text-green uppercase">Live</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <Timeline events={events} />
          </div>
        </div>
      </div>

      {/* Alert Overlay (High Risk) */}
      <AnimatePresence>
        {events[0]?.riskScore && events[0].riskScore > 85 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-8 left-8 right-8 md:left-auto md:right-8 md:w-96 z-50"
          >
            <div className="cyber-border-red bg-red/10 backdrop-blur-xl p-6 rounded-2xl relative overflow-hidden">
              <div className="scan-line" />
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-black italic text-red uppercase tracking-tighter">Critical Threat Detected</h3>
                  <p className="text-xs text-slate-300 mt-1">{events[0].description}</p>
                  <div className="mt-4 flex gap-2">
                    <button className="px-3 py-1 bg-red text-white text-[10px] font-bold rounded-lg uppercase">Execute DMCA</button>
                    <button className="px-3 py-1 glass text-white text-[10px] font-bold rounded-lg uppercase">Isolate Asset</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
