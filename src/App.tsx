import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { AnimatePresence, motion } from 'motion/react';
import { Landing } from './components/Landing';
import { Dashboard } from './components/Dashboard';
import { Forensics } from './components/Forensics';
import { Payment } from './components/Payment';
import { Auth } from './components/Auth';
import { WarRoom } from './frontend/components/WarRoom';
import imageCompression from 'browser-image-compression';

type View = 'landing' | 'login' | 'signup' | 'dashboard' | 'forensics' | 'payment' | 'war-room';

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [user, setUser] = useState<any>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [pendingPlan, setPendingPlan] = useState<{ plan: string, price: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('verimedia_token');
    const savedUser = localStorage.getItem('verimedia_user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      if (view === 'landing' || view === 'login' || view === 'signup') {
        setView('dashboard');
      }
    }
    setIsAuthReady(true);
  }, []);

  const handleAnalyze = async (file: File, deep: boolean = false, originalFile?: File) => {
    try {
      setLoading(true);
      setUploadProgress(10);

      // 1. Media Pipeline Improvement: Image Compression
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        onProgress: (p: number) => setUploadProgress(10 + (p * 0.4))
      };
      
      const compressedFile = await imageCompression(file, options);
      setUploadProgress(50);

      const readFile = (f: File | Blob): Promise<string> => new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(f);
      });

      const suspectBase64 = await readFile(compressedFile);
      setSelectedImage(suspectBase64);
      
      let originalBase64 = undefined;
      if (originalFile) {
        const compressedOriginal = await imageCompression(originalFile, options);
        originalBase64 = await readFile(compressedOriginal);
      }

      setUploadProgress(70);

      // 2. Real API Call to Backend
      const response = await fetch('/api/forensics/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('verimedia_token')}`
        },
        body: JSON.stringify({
          image: suspectBase64,
          originalImage: originalBase64,
          metadata: {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified
          }
        })
      });

      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();
      setUploadProgress(100);
      setAnalysis(data);
      setView('forensics');
      
      toast.success("Forensic analysis complete", {
        description: `Neural mesh identified ${data.verdict} with ${data.confidence}% confidence.`
      });

    } catch (err: any) {
      console.error('Analysis Error:', err);
      toast.error(`Forensic analysis failed: ${err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('verimedia_token');
    localStorage.removeItem('verimedia_user');
    setUser(null);
    setView('landing');
  };

  if (!isAuthReady) return null;

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-blue/30 overflow-x-hidden">
      <Toaster position="top-center" theme="dark" richColors />
      
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Landing 
              onLogin={() => setView('login')} 
              onGetAccess={(plan, price) => {
                setPendingPlan({ plan, price });
                setView('signup');
              }} 
            />
          </motion.div>
        )}

        {(view === 'login' || view === 'signup') && (
          <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Auth 
              type={view}
              onBack={() => setView('landing')}
              onSwitch={() => setView(view === 'login' ? 'signup' : 'login')}
              onSuccess={(u, token) => {
                setUser(u);
                localStorage.setItem('verimedia_user', JSON.stringify(u));
                localStorage.setItem('verimedia_token', token);
                if (pendingPlan) setView('payment');
                else setView('dashboard');
              }}
            />
          </motion.div>
        )}

        {view === 'payment' && (
          <motion.div key="payment" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Payment 
              plan={pendingPlan?.plan || 'PRO LEAGUE'}
              price={pendingPlan?.price || '$3,499'}
              onCancel={() => setView('dashboard')}
              onSuccess={() => {
                setPendingPlan(null);
                setView('dashboard');
              }}
            />
          </motion.div>
        )}

        {view === 'dashboard' && (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Dashboard 
              user={user}
              loading={loading}
              uploadProgress={uploadProgress}
              analysis={analysis}
              selectedImage={selectedImage}
              onLogout={handleLogout}
              onAnalyze={handleAnalyze}
              onWarRoom={() => setView('war-room')}
            />
          </motion.div>
        )}

        {view === 'war-room' && (
          <motion.div key="war-room" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
            <WarRoom onBack={() => setView('dashboard')} />
          </motion.div>
        )}

        {view === 'forensics' && (
          <motion.div key="forensics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-bg p-8">
            <Forensics 
              analysis={analysis}
              selectedImage={selectedImage}
              onBack={() => setView('dashboard')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
