import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Twitter, 
  Instagram, 
  Facebook, 
  Globe, 
  Lock, 
  Unlock, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink,
  Search,
  Zap,
  ShieldCheck,
  Eye,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';

interface SocialFinding {
  platform: string;
  url: string;
  type: string;
  riskScore: number;
  findings: string[];
  status: "Critical" | "High Risk" | "Suspicious" | "Neutral";
}

interface ConnectedAccount {
  platform: string;
  username: string;
  connectedAt: any;
}

interface SocialGuardProps {
  initialPlatform?: string;
  initialAccountId?: string;
}

export const SocialGuard: React.FC<SocialGuardProps> = ({ initialPlatform, initialAccountId }) => {
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<SocialFinding[]>([]);
  const [activePlatform, setActivePlatform] = useState<string | null>(null);
  const [manualAccountId, setManualAccountId] = useState(initialAccountId || '');
  const [manualPlatform, setManualPlatform] = useState(initialPlatform || 'twitter');
  const [scanLog, setScanLog] = useState<string[]>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanError, setScanError] = useState<{ message: string; isQuota: boolean } | null>(null);
  const [tempUsername, setTempUsername] = useState('');
  const [showUsernamePrompt, setShowUsernamePrompt] = useState(false);
  const [pendingPlatform, setPendingPlatform] = useState<string | null>(null);

  // Trigger initial scan if props are provided
  useEffect(() => {
    if (initialPlatform && initialAccountId) {
      startScan(initialPlatform, initialAccountId);
    }
  }, [initialPlatform, initialAccountId]);

  // Fetch connected accounts from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('verimedia_user');
    if (!savedUser) return;
    const user = JSON.parse(savedUser);

    const loadData = () => {
      const accounts = JSON.parse(localStorage.getItem(`verimedia_accounts_${user.uid}`) || '[]');
      setConnectedAccounts(accounts);

      const history = JSON.parse(localStorage.getItem(`verimedia_history_${user.uid}`) || '[]');
      // Sort by timestamp descending
      history.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      // For compatibility with existing code that might expect scanResults
      // setScanResults(history.flatMap((h: any) => h.results || []));
    };

    loadData();

    // Listen for updates
    window.addEventListener('social-accounts-updated', loadData);
    return () => window.removeEventListener('social-accounts-updated', loadData);
  }, []);

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      const savedUser = localStorage.getItem('verimedia_user');
      if (event.data?.type === 'SOCIAL_AUTH_SUCCESS' && savedUser) {
        const user = JSON.parse(savedUser);
        const { platform, user: socialUser } = event.data;
        const username = socialUser?.username || socialUser?.name || tempUsername || `@user_${Math.random().toString(36).substr(2, 5)}`;
        
        try {
          const accountData = {
            platform,
            username,
            userId: user.uid,
            connectedAt: new Date().toISOString()
          };
          
          const accounts = JSON.parse(localStorage.getItem(`verimedia_accounts_${user.uid}`) || '[]');
          const existingIndex = accounts.findIndex((a: any) => a.platform === platform);
          if (existingIndex > -1) {
            accounts[existingIndex] = accountData;
          } else {
            accounts.push(accountData);
          }
          localStorage.setItem(`verimedia_accounts_${user.uid}`, JSON.stringify(accounts));
          
          toast.success(`${platform.charAt(0).toUpperCase() + platform.slice(1)} account connected!`);
          window.dispatchEvent(new CustomEvent('social-accounts-updated'));
        } catch (error) {
          console.error('Error saving account:', error);
          toast.error('Failed to connect account.');
        } finally {
          setTempUsername('');
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [tempUsername]);

  const connectAccount = (platform: string) => {
    setPendingPlatform(platform);
    setShowUsernamePrompt(true);
  };

  const proceedWithConnection = async (isMock: boolean = false) => {
    if (!tempUsername.trim()) {
      toast.error("Please enter your handle.");
      return;
    }

    const platform = pendingPlatform;
    if (!platform) return;

    try {
      const response = await fetch(`/api/auth/social/url/${platform}?mock=${isMock}`);
      const { url } = await response.json();
      
      const width = 600;
      const height = 700;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      const authWindow = window.open(
        url,
        `connect_${platform}`,
        `width=${width},height=${height},left=${left},top=${top}`
      );

      if (!authWindow) {
        toast.error('Popup blocked', {
          description: 'Please allow popups to connect your account.'
        });
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error('Failed to initiate connection.');
    } finally {
      setShowUsernamePrompt(false);
    }
  };

  const startScan = async (platform: string, username: string) => {
    setIsScanning(true);
    setActivePlatform(platform);
    setScanResults([]);
    setScanError(null);
    setScanProgress(0);
    setScanLog([
      `Initializing forensic engine for ${platform}...`,
      `Connecting to ${platform} API...`,
      `Fetching media signatures for ${username}...`
    ]);
    
    const logInterval = setInterval(() => {
      const logs = [
        "Analyzing visual consistency across frames...",
        "Scanning for neural network artifacts...",
        "Checking metadata for digital tampering...",
        "Cross-referencing with known deepfake databases...",
        "Verifying lighting and shadow vectors...",
        "Running Google Search grounding for propagation...",
        "Finalizing forensic report..."
      ];
      setScanLog(prev => [...prev, logs[Math.floor(Math.random() * logs.length)]].slice(-5));
      setScanProgress(prev => Math.min(prev + Math.floor(Math.random() * 15), 95));
    }, 1200);

    try {
      const response = await fetch('/api/social/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, accountId: username })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        const errorMessage = data.message || data.error || 'Social media scan failed.';
        const isQuota = response.status === 429 || data.isQuotaError;
        const isInvalid = response.status === 400;

        setScanError({ message: errorMessage, isQuota });
        
        toast.error(errorMessage, {
          description: isQuota 
            ? 'Forensic engine at capacity. Please try again in a few minutes.' 
            : isInvalid 
            ? 'Please verify the account handle and try again.' 
            : 'Check your network connection and try again.',
          duration: 6000,
          action: isQuota ? {
            label: 'Try Again',
            onClick: () => startScan(platform, username)
          } : undefined
        });
        
        setScanLog(prev => [...prev, `CRITICAL ERROR: ${errorMessage}`]);
        return;
      }

      const results = Array.isArray(data) ? data : [];
      setScanProgress(100);
      setScanResults(results);

      // Save scan to localStorage
      const savedUser = localStorage.getItem('verimedia_user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        const scanData = {
          userId: user.uid,
          platform,
          accountId: username,
          results,
          timestamp: new Date().toISOString()
        };
        
        const history = JSON.parse(localStorage.getItem(`verimedia_history_${user.uid}`) || '[]');
        history.unshift(scanData);
        localStorage.setItem(`verimedia_history_${user.uid}`, JSON.stringify(history.slice(0, 50))); // Keep last 50
        window.dispatchEvent(new CustomEvent('social-accounts-updated'));
      }

      toast.success(`Scan complete for ${username}`);
    } catch (error) {
      console.error('Scan error:', error);
      toast.error('Social media scan failed.');
    } finally {
      clearInterval(logInterval);
      setTimeout(() => setIsScanning(false), 500);
    }
  };

  const scanAllConnected = async () => {
    if (connectedAccounts.length === 0) {
      toast.error("No accounts connected to scan.");
      return;
    }
    
    setIsScanning(true);
    setScanResults([]);
    setScanProgress(0);
    setScanLog(["Initializing global forensic mesh...", "Coordinating multi-platform scan..."]);
    
    try {
      const allResults: SocialFinding[] = [];
      setScanError(null);
      for (const account of connectedAccounts) {
        setScanLog(prev => [...prev, `Scanning ${account.platform}: ${account.username}...`]);
        const response = await fetch('/api/social/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ platform: account.platform, accountId: account.username })
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          allResults.push(...data);
        }
      }
      setScanResults(allResults);
      setScanProgress(100);
      toast.success(`Global scan complete. ${allResults.length} findings identified.`);
    } catch (error) {
      console.error('Scan all error:', error);
      setScanError({ message: 'Global scan failed. Connection to forensic mesh lost.', isQuota: false });
      toast.error('Global scan failed.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-blue" />
            </div>
            <h2 className="text-3xl font-black tracking-tighter uppercase italic">Social Guard</h2>
          </div>
          <p className="text-slate-400 text-sm max-w-xl">
            Protect your digital identity. Connect your social accounts to scan for deepfakes, 
            impersonations, and manipulated content targeting your profile.
          </p>
        </div>
        
        <div className="flex gap-3">
          {connectedAccounts.length > 0 && (
            <button 
              onClick={scanAllConnected}
              disabled={isScanning}
              className="px-4 py-2 rounded-lg bg-blue text-black font-black text-[10px] uppercase tracking-widest hover:bg-blue/90 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              <Zap className="w-3 h-3" /> Scan All Connected
            </button>
          )}
          <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Active Protection</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Connection Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Manual Scan Card */}
          <div className="glass p-6 rounded-2xl border-white/10 space-y-6 bg-gradient-to-br from-blue/5 to-transparent relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <Zap className="w-12 h-12 text-blue" />
            </div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 border-b border-white/5 pb-4">Direct Account Scan</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Select Platform</label>
                <div className="flex gap-2">
                  {['twitter', 'instagram', 'facebook'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setManualPlatform(p)}
                      className={cn(
                        "flex-1 p-2 rounded-lg border transition-all flex items-center justify-center",
                        manualPlatform === p 
                          ? "bg-blue/20 border-blue text-blue" 
                          : "bg-white/5 border-white/10 text-slate-500 hover:border-white/20"
                      )}
                    >
                      {p === 'twitter' ? <Twitter className="w-4 h-4" /> : 
                       p === 'instagram' ? <Instagram className="w-4 h-4" /> : 
                       <Facebook className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Account ID / Username</label>
                <div className="relative">
                  <input
                    type="text"
                    value={manualAccountId}
                    onChange={(e) => setManualAccountId(e.target.value)}
                    placeholder="@username"
                    className="w-full bg-bg border border-white/10 rounded-lg py-3 pl-4 pr-12 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue transition-colors"
                  />
                  <button
                    onClick={() => {
                      if (!manualAccountId) {
                        toast.error("Please enter an account ID.");
                        return;
                      }
                      if (!manualAccountId.startsWith('@')) {
                        toast.warning("Account handles typically start with @", {
                          description: "We'll try to scan anyway, but this might fail."
                        });
                      }
                      startScan(manualPlatform, manualAccountId);
                    }}
                    disabled={isScanning}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-blue flex items-center justify-center text-black hover:bg-blue/90 disabled:opacity-50 transition-colors"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={() => setManualAccountId('error_quota')}
                    className="text-[8px] font-mono text-slate-600 hover:text-slate-400 uppercase tracking-tighter"
                  >
                    [Simulate Quota Error]
                  </button>
                  <button 
                    onClick={() => setManualAccountId('error_invalid')}
                    className="text-[8px] font-mono text-slate-600 hover:text-slate-400 uppercase tracking-tighter"
                  >
                    [Simulate Invalid ID]
                  </button>
                  <button 
                    onClick={() => {
                      setManualPlatform('twitter');
                      setManualAccountId('@deepfake_demo');
                      startScan('twitter', '@deepfake_demo');
                    }}
                    className="text-[8px] font-mono text-blue/60 hover:text-blue uppercase tracking-tighter"
                  >
                    [Simulate Deepfake Account]
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border-white/10 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 border-b border-white/5 pb-4">Linked Accounts</h3>
            
            <div className="space-y-4">
              {['twitter', 'instagram', 'facebook'].map((platform) => {
                const connected = connectedAccounts.find(a => a.platform === platform);
                return (
                  <div key={platform} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group hover:border-white/20 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        platform === 'twitter' ? 'bg-blue/10 text-blue' : 
                        platform === 'instagram' ? 'bg-pink-500/10 text-pink-500' : 
                        'bg-blue-600/10 text-blue-600'
                      }`}>
                        {platform === 'twitter' ? <Twitter className="w-5 h-5" /> : 
                         platform === 'instagram' ? <Instagram className="w-5 h-5" /> : 
                         <Facebook className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{platform}</div>
                        <div className="text-sm font-bold">{connected ? connected.username : 'Not Linked'}</div>
                      </div>
                    </div>
                    
                    {connected ? (
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => startScan(platform, connected.username)}
                          disabled={isScanning}
                          className="p-2 rounded-lg bg-blue/10 text-blue hover:bg-blue/20 transition-all disabled:opacity-50"
                          title="Refresh Scan"
                        >
                          <RefreshCw className={`w-4 h-4 ${isScanning && activePlatform === platform ? 'animate-spin' : ''}`} />
                        </button>
                        <button 
                          onClick={async (e) => {
                            e.stopPropagation();
                            const savedUser = localStorage.getItem('verimedia_user');
                            if (!savedUser) return;
                            const user = JSON.parse(savedUser);
                            try {
                              const accounts = JSON.parse(localStorage.getItem(`verimedia_accounts_${user.uid}`) || '[]');
                              const updated = accounts.filter((a: any) => a.platform !== platform);
                              localStorage.setItem(`verimedia_accounts_${user.uid}`, JSON.stringify(updated));
                              
                              window.dispatchEvent(new CustomEvent('social-accounts-updated'));
                              toast.success(`${platform.charAt(0).toUpperCase() + platform.slice(1)} disconnected.`);
                            } catch (error) {
                              console.error('Error disconnecting account:', error);
                              toast.error('Failed to disconnect account.');
                            }
                          }}
                          className="p-2 text-slate-500 hover:text-red transition-colors"
                          title="Disconnect Account"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => connectAccount(platform)}
                        className="text-[10px] font-mono uppercase tracking-widest text-blue hover:underline"
                      >
                        Connect
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-4 rounded-xl bg-blue/5 border border-blue/20 flex items-start gap-3">
              <Lock className="w-4 h-4 text-blue mt-0.5 shrink-0" />
              <p className="text-[10px] text-blue/80 leading-relaxed uppercase tracking-wider">
                VeriMedia uses read-only access. We never post on your behalf or access private messages.
              </p>
            </div>
          </div>
        </div>

        {/* Scan Results */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-6 rounded-2xl border-white/10 min-h-[500px] flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500">Scan Results & Findings</h3>
              {scanResults.length > 0 && (
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  {scanResults.length} Threats Detected
                </div>
              )}
            </div>

            <AnimatePresence mode="wait">
              {isScanning ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center space-y-6 text-center"
                >
                  <div className="space-y-2">
                    <h4 className="text-xl font-black tracking-tighter uppercase italic">Scanning Platform...</h4>
                    <p className="text-slate-400 text-sm max-w-xs mx-auto">
                      VeriMedia AI is crawling {activePlatform} for deepfakes and manipulated content of your profile.
                    </p>
                  </div>

                  {/* Neural Map Visualization */}
                  <div className="w-full max-w-md aspect-video bg-black/40 border border-white/5 rounded-xl relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20">
                      <div className="grid grid-cols-10 grid-rows-6 h-full w-full">
                        {Array.from({ length: 60 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="border-[0.5px] border-blue/20"
                            animate={{ 
                              backgroundColor: Math.random() > 0.8 ? 'rgba(0, 180, 255, 0.1)' : 'transparent'
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="relative z-10 flex flex-col items-center gap-4">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full border-2 border-blue/20 border-t-blue animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Search className="w-6 h-6 text-blue animate-pulse" />
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1 h-3 bg-blue"
                            animate={{ height: [4, 12, 4] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                          />
                        ))}
                      </div>
                    </div>
                    {/* Scanning Line */}
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-0.5 bg-blue shadow-[0_0_10px_rgba(0,180,255,0.8)] z-20"
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full max-w-md space-y-2">
                    <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-blue">
                      <span>Forensic Engine Progress</span>
                      <span>{scanProgress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div 
                        className="h-full bg-blue shadow-[0_0_15px_rgba(0,180,255,0.5)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${scanProgress}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Live Scan Log */}
                  <div className="w-full max-w-md bg-black/40 border border-white/5 rounded-xl p-4 font-mono text-[10px] text-left space-y-1 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue/20 overflow-hidden">
                      <motion.div 
                        className="h-full bg-blue/40 w-1/3"
                        animate={{ x: ['-100%', '300%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                    <div className="flex items-center gap-2 text-blue mb-2 border-b border-white/5 pb-2">
                      <Zap className="w-3 h-3 animate-pulse" />
                      <span className="uppercase tracking-widest">Live Forensic Log</span>
                    </div>
                    <AnimatePresence mode="popLayout">
                      {scanLog.map((log, i) => (
                        <motion.div
                          key={log + i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="flex items-start gap-2 text-slate-500"
                        >
                          <span className="text-blue/50">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                          <span className="text-slate-300">{log}</span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ) : scanError ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col items-center justify-center space-y-6 text-center p-8"
                >
                  <div className="w-20 h-20 rounded-full bg-red/10 flex items-center justify-center border border-red/20">
                    <AlertTriangle className="w-10 h-10 text-red" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-black tracking-tighter uppercase italic text-red">Scan Failed</h4>
                    <p className="text-slate-400 text-sm max-w-xs mx-auto font-mono">
                      {scanError.message}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    {scanError.isQuota && (
                      <button 
                        onClick={() => startScan(manualPlatform, manualAccountId)}
                        className="px-6 py-3 bg-blue text-black font-black text-xs uppercase tracking-widest hover:bg-blue/90 transition-all rounded-xl"
                      >
                        Try Again Now
                      </button>
                    )}
                    <button 
                      onClick={() => setScanError(null)}
                      className="px-6 py-3 bg-white/5 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all rounded-xl border border-white/10"
                    >
                      Clear Error
                    </button>
                  </div>
                </motion.div>
              ) : scanResults.length > 0 ? (
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                  }}
                  className="space-y-4"
                >
                  {scanResults.map((result, i) => (
                    <motion.div 
                      key={i} 
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all space-y-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center",
                            result.status === 'Critical' ? "bg-red/20 text-red" : 
                            result.status === 'High Risk' ? "bg-orange-500/20 text-orange-500" : 
                            "bg-gold/20 text-gold"
                          )}>
                            <AlertTriangle className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold">{result.type}</span>
                              <span className={cn(
                                "text-[8px] font-mono px-2 py-0.5 rounded uppercase tracking-widest",
                                result.status === 'Critical' ? "bg-red text-white" : 
                                result.status === 'High Risk' ? "bg-orange-500 text-white" : 
                                "bg-gold text-black"
                              )}>
                                {result.status}
                              </span>
                            </div>
                            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">
                              Detected on {result.platform} · Risk: {result.riskScore}%
                            </div>
                          </div>
                        </div>
                        <a 
                          href={result.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {result.findings?.map((finding, j) => (
                          <div key={j} className="flex items-start gap-2 text-xs text-slate-400">
                            <div className="w-1 h-1 rounded-full bg-blue mt-1.5 shrink-0" />
                            {finding}
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button className="text-[10px] font-mono uppercase tracking-widest bg-blue text-black px-4 py-2 rounded font-bold hover:bg-blue/90 transition-all">
                          Initiate Takedown
                        </button>
                        <button className="text-[10px] font-mono uppercase tracking-widest bg-white/5 text-white px-4 py-2 rounded font-bold hover:bg-white/10 transition-all">
                          Detailed Forensic Report
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center space-y-6 text-center opacity-50">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                    <Globe className="w-10 h-10 text-slate-600" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-black tracking-tighter uppercase italic">No Active Scans</h4>
                    <p className="text-slate-400 text-sm max-w-xs mx-auto">
                      Connect an account and start a scan to monitor for deepfakes across social platforms.
                    </p>
                  </div>
                </div>
              )}
            </AnimatePresence>
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
                onClick={() => proceedWithConnection(true)}
                className="py-4 rounded-xl bg-white/5 border border-white/5 text-[10px] font-mono uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                Simulate Connection
              </button>
              <button 
                onClick={() => proceedWithConnection(false)}
                className="py-4 rounded-xl bg-blue text-black font-black text-[10px] uppercase tracking-widest hover:bg-blue/90 transition-all shadow-[0_0_30px_rgba(0,180,255,0.3)]"
              >
                Connect Tunnel →
              </button>
            </div>
            <button 
              onClick={() => {
                setShowUsernamePrompt(false);
                setTempUsername('');
              }}
              className="w-full py-2 text-[8px] font-mono uppercase tracking-widest text-slate-600 hover:text-slate-400 transition-all"
            >
              Cancel Integration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');
