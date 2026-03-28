import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Lock, 
  Globe, 
  CheckCircle2, 
  Loader2, 
  Wallet, 
  Smartphone, 
  Bitcoin,
  ChevronRight,
  ShieldCheck,
  ArrowRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

interface PaymentProps {
  plan: string;
  price: string;
  onSuccess: () => void;
  onCancel: () => void;
}

type PaymentMethod = 'card' | 'paypal' | 'apple' | 'google' | 'crypto';

export const Payment: React.FC<PaymentProps> = ({ plan, price, onSuccess, onCancel }) => {
  const [method, setMethod] = useState<PaymentMethod>('card');
  const [processing, setProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  const steps = [
    "Initializing secure connection...",
    "Validating payment details...",
    "Authorizing transaction with bank...",
    "Finalizing subscription setup...",
    "Securing forensic access keys..."
  ];

  useEffect(() => {
    let interval: any;
    if (processing && processingStep < steps.length - 1) {
      interval = setInterval(() => {
        setProcessingStep(prev => prev + 1);
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [processing, processingStep]);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setProcessingStep(0);
    
    try {
      const res = await fetch('/api/payment/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          method,
          details: method === 'card' ? card : { type: method },
          amount: price 
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        // Wait for the last step to finish for realism
        setTimeout(() => {
          setShowSuccess(true);
          toast.success('Payment successful! Welcome to the Pro League.');
          setTimeout(() => {
            onSuccess();
          }, 3000);
        }, 1500);
      } else {
        setProcessing(false);
        toast.error(data.error || 'Payment declined. Please try another method.');
      }
    } catch (err) {
      setProcessing(false);
      toast.error('Payment processing failed. Check your connection.');
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)]" />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass p-12 rounded-[3rem] border-green/20 text-center space-y-8 max-w-md relative z-10"
        >
          <div className="w-24 h-24 bg-green/20 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(34,197,94,0.3)]">
            <CheckCircle2 className="w-12 h-12 text-green" />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tighter uppercase italic">Access Granted</h2>
            <p className="text-slate-400 font-medium">Your subscription to <span className="text-blue">{plan}</span> is now active. Redirecting to your neural dashboard...</p>
          </div>
          <div className="flex justify-center gap-2">
            {[0, 1, 2].map(i => (
              <motion.div 
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-2 h-2 rounded-full bg-blue"
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,180,255,0.1),transparent_70%)]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10"
      >
        {/* Left: Plan Info (4 cols) */}
        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-6">
            <button onClick={onCancel} className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-white transition-colors group">
              <X className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Cancel Transaction
            </button>
            <div className="space-y-2">
              <p className="text-blue font-mono text-[10px] uppercase tracking-[0.4em]">Checkout Session</p>
              <h2 className="text-6xl font-black tracking-tighter uppercase italic leading-[0.9]">
                Upgrade to <br /><span className="text-blue">{plan}</span>
              </h2>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed">Secure your forensic pipeline with enterprise-grade neural analysis and global propagation tracking.</p>
          </div>
          
          <div className="space-y-4">
            {[
              'Unlimited Deepfake Neural Analysis',
              'Advanced Modification Heatmaps',
              'Global Web Monitoring (340+ Platforms)',
              'Court-Ready Forensic Evidence Exports',
              'Priority 24/7 Neural Processing'
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-4 text-sm text-slate-300 font-medium p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="w-6 h-6 rounded-full bg-blue/10 flex items-center justify-center shrink-0 border border-blue/20">
                  <CheckCircle2 className="w-3 h-3 text-blue" />
                </div>
                {f}
              </div>
            ))}
          </div>

          <div className="pt-10 border-t border-white/10 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] mb-2">Total Monthly Billing</p>
              <p className="text-7xl font-black tracking-tighter uppercase italic leading-none">{price}<span className="text-xl text-slate-500 font-normal not-italic tracking-normal ml-2">/mo</span></p>
            </div>
            <div className="text-right hidden sm:block">
              <ShieldCheck className="w-12 h-12 text-slate-800 ml-auto mb-2" />
              <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">PCI-DSS Compliant</p>
            </div>
          </div>
        </div>

        {/* Right: Payment Interface (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Payment Method Selector */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {[
              { id: 'card', icon: CreditCard, label: 'Card' },
              { id: 'paypal', icon: Globe, label: 'PayPal' },
              { id: 'apple', icon: Smartphone, label: 'Apple' },
              { id: 'google', icon: Smartphone, label: 'Google' },
              { id: 'crypto', icon: Bitcoin, label: 'Crypto' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => !processing && setMethod(m.id as PaymentMethod)}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all",
                  method === m.id 
                    ? "bg-blue/10 border-blue text-blue shadow-[0_0_20px_rgba(0,180,255,0.1)]" 
                    : "bg-white/5 border-white/5 text-slate-500 hover:bg-white/10 hover:text-white"
                )}
                disabled={processing}
              >
                <m.icon className="w-5 h-5" />
                <span className="text-[9px] font-mono uppercase tracking-widest">{m.label}</span>
              </button>
            ))}
          </div>

          <div className="glass p-8 lg:p-10 rounded-[2.5rem] relative overflow-hidden border-white/10 shadow-2xl min-h-[500px] flex flex-col">
            <AnimatePresence mode="wait">
              {processing ? (
                <motion.div 
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-8"
                >
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full border-4 border-blue/10 border-t-blue animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Lock className="w-8 h-8 text-blue animate-pulse" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black tracking-tighter uppercase italic">Processing Securely</h3>
                    <div className="h-1 w-48 bg-white/5 rounded-full overflow-hidden mx-auto">
                      <motion.div 
                        className="h-full bg-blue"
                        initial={{ width: 0 }}
                        animate={{ width: `${(processingStep + 1) * 20}%` }}
                      />
                    </div>
                    <p className="text-xs font-mono text-blue uppercase tracking-widest animate-pulse">
                      {steps[processingStep]}
                    </p>
                  </div>
                </motion.div>
              ) : method === 'card' ? (
                <motion.div 
                  key="card-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black tracking-tighter uppercase italic">Credit / Debit Card</h3>
                    <div className="flex gap-2">
                      <div className="w-8 h-5 bg-white/10 rounded border border-white/5" />
                      <div className="w-8 h-5 bg-white/10 rounded border border-white/5" />
                    </div>
                  </div>

                  <form className="space-y-6" onSubmit={handlePay}>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Cardholder Name</label>
                      <input 
                        className="w-full bg-bg border border-white/10 rounded-xl py-4 px-5 text-sm outline-none focus:border-blue/50 transition-all font-medium"
                        placeholder="Alex Johnson" 
                        value={card.name}
                        onChange={(e) => setCard({ ...card, name: e.target.value })}
                        required 
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Card Number</label>
                      <div className="relative">
                        <CreditCard className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                          className="w-full bg-bg border border-white/10 rounded-xl py-4 pl-14 pr-5 text-sm outline-none focus:border-blue/50 transition-all font-mono tracking-[0.2em]"
                          placeholder="4242 4242 4242 4242" 
                          value={card.number}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').substring(0, 16);
                            const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
                            setCard({ ...card, number: formatted });
                          }}
                          required 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Expiry Date</label>
                        <input 
                          className="w-full bg-bg border border-white/10 rounded-xl py-4 px-5 text-sm outline-none focus:border-blue/50 transition-all font-mono"
                          placeholder="MM/YY" 
                          value={card.expiry}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, '').substring(0, 4);
                            if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2);
                            setCard({ ...card, expiry: val });
                          }}
                          required 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500">CVV</label>
                        <input 
                          className="w-full bg-bg border border-white/10 rounded-xl py-4 px-5 text-sm outline-none focus:border-blue/50 transition-all font-mono"
                          placeholder="123" 
                          type="password" 
                          maxLength={3}
                          value={card.cvv}
                          onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, '') })}
                          required 
                        />
                      </div>
                    </div>

                    <button 
                      className="w-full bg-blue text-black py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-blue/90 transition-all shadow-[0_0_30px_rgba(0,180,255,0.3)] flex items-center justify-center gap-3 group"
                      type="submit" 
                    >
                      Complete Secure Payment <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div 
                  key="other-method"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-8"
                >
                  <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {method === 'paypal' && <Globe className="w-10 h-10 text-blue" />}
                    {method === 'apple' && <Smartphone className="w-10 h-10 text-white" />}
                    {method === 'google' && <Smartphone className="w-10 h-10 text-blue" />}
                    {method === 'crypto' && <Bitcoin className="w-10 h-10 text-gold" />}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black tracking-tighter uppercase italic">Pay with {method.charAt(0).toUpperCase() + method.slice(1)}</h3>
                    <p className="text-slate-400 text-sm max-w-xs mx-auto">You will be redirected to {method} to complete your secure transaction.</p>
                  </div>
                  <button 
                    onClick={handlePay}
                    className="bg-white text-black px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/90 transition-all flex items-center gap-3"
                  >
                    Continue to {method.charAt(0).toUpperCase() + method.slice(1)} <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-auto pt-8 flex items-center justify-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3" alt="Visa" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5" alt="Mastercard" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="PayPal" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/39/Google_Pay_logo_%282020%29.svg" className="h-4" alt="GPay" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
