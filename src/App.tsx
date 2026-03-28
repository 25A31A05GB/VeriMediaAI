import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { AnimatePresence, motion } from 'motion/react';
import { Landing } from './components/Landing';
import { Dashboard } from './components/Dashboard';
import { Forensics } from './components/Forensics';
import { Payment } from './components/Payment';
import { Auth } from './components/Auth';
import { analyzeMedia, deepAnalyzeMedia } from './services/gemini';

type View = 'landing' | 'login' | 'signup' | 'dashboard' | 'forensics' | 'payment';

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [pendingPlan, setPendingPlan] = useState<{ plan: string, price: string } | null>(null);

  const handleAnalyze = async (file: File, deep: boolean = false) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      setSelectedImage(base64);
      setLoading(true);
      setUploadProgress(0);

      const interval = setInterval(() => {
        setUploadProgress(prev => (prev >= 95 ? 95 : prev + 5));
      }, 200);

      try {
        const data = deep ? await deepAnalyzeMedia(base64, file.type) : await analyzeMedia(base64, file.type);
        setUploadProgress(100);
        setAnalysis(data);
        setView('forensics');
      } catch (err: any) {
        console.error('Analysis Error:', err);
        const errorMessage = err?.message || 'Unknown forensic analysis error';
        toast.error(`Forensic analysis failed: ${errorMessage}`, {
          description: 'Please check your API key or network connection and try again.',
          duration: 5000
        });
      } finally {
        setLoading(false);
        clearInterval(interval);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-blue/30">
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
              onSuccess={(u) => {
                setUser(u);
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
              onLogout={() => {
                setUser(null);
                setView('landing');
              }}
              onAnalyze={handleAnalyze}
              onViewCase={(id) => {
                // Mock viewing a case
                toast.info(`Loading Case ${id}`);
              }}
            />
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
