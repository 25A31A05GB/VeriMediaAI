import React, { useState } from 'react';
import { Shield, Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface AuthProps {
  type: 'login' | 'signup';
  onSuccess: (user: any) => void;
  onSwitch: () => void;
  onBack: () => void;
}

export const Auth: React.FC<AuthProps> = ({ type, onSuccess, onSwitch, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate real auth delay
    await new Promise(r => setTimeout(r, 1200));
    
    onSuccess({ 
      name: formData.name || formData.email.split('@')[0], 
      email: formData.email 
    });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,180,255,0.05),transparent_70%)]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <button onClick={onBack} className="mb-8 text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-white transition-colors flex items-center gap-2">← Back to Home</button>
        
        <div className="glass p-10 rounded-[2rem] border-white/10 shadow-2xl space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex p-4 rounded-2xl bg-blue/10 border border-blue/20 mb-2">
              <Shield className="w-10 h-10 text-blue" />
            </div>
            <h2 className="text-3xl font-black tracking-tighter uppercase italic">
              {type === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              {type === 'login' 
                ? 'Enter your credentials to access the War Room.' 
                : 'Join the elite network protecting digital authenticity.'}
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {type === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue transition-colors" />
                  <input 
                    className="w-full bg-s2 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm outline-none focus:border-blue/50 transition-all font-medium"
                    placeholder="Alex Johnson" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required 
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue transition-colors" />
                <input 
                  className="w-full bg-s2 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm outline-none focus:border-blue/50 transition-all font-medium"
                  placeholder="alex@verimedia.ai" 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue transition-colors" />
                <input 
                  className="w-full bg-s2 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm outline-none focus:border-blue/50 transition-all font-medium"
                  placeholder="••••••••" 
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required 
                />
              </div>
            </div>

            <button 
              className="w-full bg-blue text-black py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue/90 transition-all shadow-[0_0_20px_rgba(0,180,255,0.3)] disabled:opacity-50 flex items-center justify-center gap-3"
              type="submit" 
              disabled={loading}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  {type === 'login' ? 'Enter War Room' : 'Initialize Account'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-4">
            <button 
              onClick={onSwitch}
              className="text-[10px] font-mono uppercase tracking-widest text-slate-500 hover:text-blue transition-colors"
            >
              {type === 'login' 
                ? "Don't have an account? Request Access" 
                : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
