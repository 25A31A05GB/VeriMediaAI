import React from 'react';
import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-20 bg-bg border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-blue" />
              <span className="font-bold text-2xl tracking-tighter uppercase italic">
                VeriMedia <span className="text-blue">AI</span>
              </span>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed">
              The world's leading digital asset war room. Providing enterprise-grade forensic analysis and real-time threat intelligence for the modern web.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map(social => (
                <a key={social} href="#" className="text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-blue transition-colors">{social}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white mb-6">Platform</h4>
            <ul className="space-y-4">
              <li><a href="#features" className="text-sm text-slate-500 hover:text-blue transition-colors">Features</a></li>
              <li><a href="#video-demo" className="text-sm text-slate-500 hover:text-blue transition-colors">Forensics</a></li>
              <li><a href="#features" className="text-sm text-slate-500 hover:text-blue transition-colors">Neural Engine</a></li>
              <li><a href="#features" className="text-sm text-slate-500 hover:text-blue transition-colors">Web Search</a></li>
              <li><a href="#pricing" className="text-sm text-slate-500 hover:text-blue transition-colors">API Access</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#about" className="text-sm text-slate-500 hover:text-blue transition-colors">About Us</a></li>
              <li><a href="#waitlist" className="text-sm text-slate-500 hover:text-blue transition-colors">Waitlist</a></li>
              <li><a href="#pricing" className="text-sm text-slate-500 hover:text-blue transition-colors">Pricing</a></li>
              <li><a href="#waitlist" className="text-sm text-slate-500 hover:text-blue transition-colors">Legal</a></li>
              <li><a href="#waitlist" className="text-sm text-slate-500 hover:text-blue transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
            © 2026 VeriMedia AI Federation. All Rights Reserved.
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] font-mono text-slate-600 uppercase tracking-widest hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-[10px] font-mono text-slate-600 uppercase tracking-widest hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-[10px] font-mono text-slate-600 uppercase tracking-widest hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
