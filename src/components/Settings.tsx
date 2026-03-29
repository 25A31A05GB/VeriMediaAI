import React from 'react';
import { 
  Twitter, 
  Instagram, 
  Facebook, 
  Lock, 
  ExternalLink, 
  Shield, 
  Key, 
  RefreshCw,
  Trash2
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

export const Settings: React.FC = () => {
  const [connectedAccounts, setConnectedAccounts] = React.useState<{ platform: string; username: string }[]>(() => {
    const saved = localStorage.getItem('verimedia_social_accounts');
    return saved ? JSON.parse(saved) : [];
  });
  const [showUsernamePrompt, setShowUsernamePrompt] = React.useState(false);
  const [pendingPlatform, setPendingPlatform] = React.useState<string | null>(null);
  const [tempUsername, setTempUsername] = React.useState('');

  React.useEffect(() => {
    const handleUpdate = () => {
      const saved = localStorage.getItem('verimedia_social_accounts');
      if (saved) setConnectedAccounts(JSON.parse(saved));
    };
    window.addEventListener('social-accounts-updated', handleUpdate);
    
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'SOCIAL_AUTH_SUCCESS') {
        const { platform } = event.data;
        const saved = localStorage.getItem('verimedia_social_accounts');
        const current = saved ? JSON.parse(saved) : [];
        if (!current.find((a: any) => a.platform === platform)) {
          const username = tempUsername || `@user_${Math.random().toString(36).substr(2, 5)}`;
          const updated = [...current, { platform, username }];
          localStorage.setItem('verimedia_social_accounts', JSON.stringify(updated));
          setConnectedAccounts(updated);
          window.dispatchEvent(new CustomEvent('social-accounts-updated'));
        }
        toast.success(`${platform.charAt(0).toUpperCase() + platform.slice(1)} account connected!`);
        setShowUsernamePrompt(false);
        setTempUsername('');
      }
    };
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('social-accounts-updated', handleUpdate);
      window.removeEventListener('message', handleMessage);
    };
  }, [tempUsername]);

  const disconnectAccount = (platform: string) => {
    const updated = connectedAccounts.filter(a => a.platform !== platform);
    setConnectedAccounts(updated);
    localStorage.setItem('verimedia_social_accounts', JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('social-accounts-updated'));
    toast.success(`${platform.charAt(0).toUpperCase() + platform.slice(1)} account disconnected.`);
  };

  const connectAccount = (platform: string) => {
    setPendingPlatform(platform);
    setShowUsernamePrompt(true);
  };

  const proceedWithConnection = async () => {
    if (!tempUsername.trim()) {
      toast.error("Please enter your handle.");
      return;
    }

    const platform = pendingPlatform;
    if (!platform) return;

    try {
      const response = await fetch(`/api/auth/social/url/${platform}`);
      const { url } = await response.json();
      
      const width = 600;
      const height = 700;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      window.open(
        url,
        `connect_${platform}`,
        `width=${width},height=${height},left=${left},top=${top}`
      );
    } catch (error) {
      console.error('Auth error:', error);
      toast.error('Failed to initiate connection.');
    }
  };

  const platforms = [
    { id: 'twitter', name: 'Twitter / X', icon: Twitter, color: 'text-white' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-600' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-black tracking-tighter uppercase italic">System Settings</h2>
        <p className="text-slate-400 text-sm">Manage your forensic integrations, API connections, and account security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Social Integrations */}
        <div className="glass p-8 rounded-2xl border-white/10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center border border-blue/20">
              <Shield className="w-6 h-6 text-blue" />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tighter uppercase italic">Social Integrations</h3>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">OAuth Connection Management</p>
            </div>
          </div>

          <div className="space-y-4">
            {platforms.map(platform => {
              const account = connectedAccounts.find(a => a.platform === platform.id);
              return (
                <div key={platform.id} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className={cn("p-2 rounded-lg bg-white/5", platform.color)}>
                      <platform.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold">{platform.name}</div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                        {account ? `Connected as ${account.username}` : 'Not Connected'}
                      </div>
                    </div>
                  </div>
                  {account ? (
                    <button 
                      onClick={() => disconnectAccount(platform.id)}
                      className="p-2 text-slate-500 hover:text-red transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  ) : (
                    <button 
                      onClick={() => connectAccount(platform.id)}
                      className="text-[10px] font-mono text-blue uppercase tracking-widest hover:underline"
                    >
                      Connect Account
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* API Configuration */}
        <div className="glass p-8 rounded-2xl border-white/10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple/10 flex items-center justify-center border border-purple/20">
              <Key className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tighter uppercase italic">API Configuration</h3>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Forensic Engine Keys</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Gemini API Status</span>
                <span className="px-2 py-0.5 rounded bg-green/10 text-green text-[8px] font-mono uppercase tracking-widest">Active</span>
              </div>
              <div className="text-xs font-mono text-slate-400 truncate bg-black/20 p-2 rounded">
                ••••••••••••••••••••••••••••••••
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Google Search Tool</span>
                <span className="px-2 py-0.5 rounded bg-blue/10 text-blue text-[8px] font-mono uppercase tracking-widest">Enabled</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-wider">
                Used for cross-platform media propagation tracking and grounding.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* OAuth Setup Instructions */}
      <div className="glass p-8 rounded-2xl border-white/10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20">
            <RefreshCw className="w-6 h-6 text-gold" />
          </div>
          <div>
            <h3 className="text-xl font-black tracking-tighter uppercase italic">OAuth Setup Guide</h3>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Developer Configuration</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Required Redirect URIs</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Add these URLs to your social media developer dashboards to enable OAuth connections.
            </p>
            <div className="space-y-2">
              {[
                { label: 'Development (Twitter)', url: `${window.location.origin}/auth/callback/twitter` },
                { label: 'Production (Twitter)', url: `https://ais-pre-icdmiysaxspkatt3qjg73u-453092856874.asia-southeast1.run.app/auth/callback/twitter` },
                { label: 'Development (Instagram)', url: `${window.location.origin}/auth/callback/instagram` },
                { label: 'Development (Facebook)', url: `${window.location.origin}/auth/callback/facebook` }
              ].map((uri, i) => (
                <div key={i} className="p-3 bg-black/40 border border-white/5 rounded-lg flex items-center justify-between group">
                  <div className="space-y-1">
                    <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">{uri.label}</div>
                    <div className="text-[10px] font-mono text-blue truncate max-w-[200px] lg:max-w-[300px]">{uri.url}</div>
                  </div>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(uri.url);
                      toast.success('URL copied to clipboard');
                    }}
                    className="p-2 hover:bg-white/5 rounded transition-colors text-slate-500 hover:text-white"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">Environment Variables</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Ensure these keys are set in your project environment to authorize the connections.
            </p>
            <div className="grid grid-cols-1 gap-2">
              {[
                'TWITTER_CLIENT_ID', 'TWITTER_CLIENT_SECRET', 
                'INSTAGRAM_CLIENT_ID', 'INSTAGRAM_CLIENT_SECRET',
                'FACEBOOK_CLIENT_ID', 'FACEBOOK_CLIENT_SECRET'
              ].map(key => (
                <div key={key} className="p-2 bg-white/5 border border-white/5 rounded font-mono text-[9px] text-slate-400 uppercase tracking-widest">
                  {key}
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-gold/5 border border-gold/20 flex items-start gap-3">
              <Lock className="w-4 h-4 text-gold mt-0.5 shrink-0" />
              <p className="text-[10px] text-gold/80 leading-relaxed uppercase tracking-wider">
                Keys are stored securely on the server and never exposed to the client.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Username Prompt Modal */}
      <div className={cn(
        "fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl transition-all duration-300",
        showUsernamePrompt ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <div className={cn(
          "glass p-8 rounded-3xl border-white/10 max-w-md w-full space-y-8 relative overflow-hidden transition-all duration-300 transform",
          showUsernamePrompt ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        )}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue via-purple to-red" />
          
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 bg-blue/10 rounded-2xl flex items-center justify-center mx-auto border border-blue/20">
              {pendingPlatform === 'twitter' ? <Twitter className="w-8 h-8 text-blue" /> : 
               pendingPlatform === 'instagram' ? <Instagram className="w-8 h-8 text-pink-500" /> : 
               <Facebook className="w-8 h-8 text-blue-600" />}
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black tracking-tighter uppercase italic">Identify Account</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Enter the {pendingPlatform} handle you wish to integrate into the forensic mesh.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Account Handle</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-mono">@</span>
                <input 
                  type="text" 
                  value={tempUsername}
                  onChange={(e) => setTempUsername(e.target.value)}
                  placeholder="username"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pl-8 text-sm outline-none focus:border-blue transition-all font-mono"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && proceedWithConnection()}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => {
                  setShowUsernamePrompt(false);
                  setTempUsername('');
                }}
                className="py-4 rounded-xl bg-white/5 border border-white/5 text-[10px] font-mono uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={proceedWithConnection}
                className="py-4 rounded-xl bg-blue text-black font-black text-[10px] uppercase tracking-widest hover:bg-blue/90 transition-all shadow-[0_0_30px_rgba(0,180,255,0.3)]"
              >
                Connect Tunnel →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
