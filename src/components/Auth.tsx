import React, { useState } from 'react';
import { Shield, Mail, Lock, User, Loader2, ArrowRight, Twitter, Instagram, Facebook } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

interface AuthProps {
  type: 'login' | 'signup';
  onSuccess: (user: any, token: string) => void;
  onSwitch: () => void;
  onBack: () => void;
}

export const Auth: React.FC<AuthProps> = ({ type, onSuccess, onSwitch, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });

  const handleSocialLogin = async (platform: string) => {
    try {
      const response = await fetch(`/api/social/auth/social/url/${platform}?mode=login&mock=true`);
      const { url } = await response.json();
      
      const width = 600;
      const height = 700;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      window.open(
        url,
        `login_${platform}`,
        `width=${width},height=${height},left=${left},top=${top}`
      );
    } catch (error) {
      console.error('Social login error:', error);
      toast.error('Failed to initiate social login.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const endpoint = type === 'login' ? '/api/auth/login' : '/api/auth/signup';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Authentication failed');

      toast.success(type === 'login' ? 'Welcome back!' : 'Account created successfully!');
      onSuccess(data.user, data.token);
    } catch (error: any) {
      console.error('Auth Error:', error);
      toast.error(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
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

          <div className="grid grid-cols-3 gap-4">
            {[
              { id: 'twitter', icon: Twitter, color: 'hover:text-blue hover:bg-blue/10' },
              { id: 'instagram', icon: Instagram, color: 'hover:text-pink-500 hover:bg-pink-500/10' },
              { id: 'facebook', icon: Facebook, color: 'hover:text-blue-600 hover:bg-blue-600/10' }
            ].map((social) => (
              <button
                key={social.id}
                onClick={() => handleSocialLogin(social.id)}
                className={cn(
                  "flex items-center justify-center p-4 rounded-xl bg-white/5 border border-white/5 transition-all text-slate-400",
                  social.color
                )}
              >
                <social.icon className="w-5 h-5" />
              </button>
            ))}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-mono">
              <span className="bg-[#050505] px-4 text-slate-600">Or continue with email</span>
            </div>
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
