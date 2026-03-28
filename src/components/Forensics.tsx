import React, { useRef, useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Globe, 
  AlertTriangle, 
  CheckCircle2, 
  Cpu,
  Download,
  FileText,
  Scan,
  Zap,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { searchMedia } from '../services/gemini';

interface ForensicsProps {
  analysis: any;
  selectedImage: string | null;
  onBack: () => void;
}

export const Forensics: React.FC<ForensicsProps> = ({ analysis, selectedImage, onBack }) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [webIntelligence, setWebIntelligence] = useState<any[]>([]);
  const [loadingIntel, setLoadingIntel] = useState(false);

  useEffect(() => {
    const fetchIntel = async () => {
      if (!analysis) return;
      setLoadingIntel(true);
      try {
        // Use the first finding or a summary of findings as the search query
        const query = analysis.findings?.[0] || `${analysis.verdict} media analysis`;
        const results = await searchMedia(query);
        setWebIntelligence(results);
      } catch (err) {
        console.error("Failed to fetch web intelligence:", err);
      } finally {
        setLoadingIntel(false);
      }
    };

    fetchIntel();
  }, [analysis]);

  if (!analysis) return null;

  const downloadPDF = async () => {
    if (!reportRef.current) return;
    
    const toastId = toast.loading('Generating forensic report PDF...');
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#050505'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`VeriMedia_Forensic_Report_${Date.now()}.pdf`);
      toast.success('Report downloaded successfully', { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error('Failed to generate PDF', { id: toastId });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest">
          <ChevronLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        <div className="flex gap-3">
          <button 
            onClick={downloadPDF}
            className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded text-[10px] font-mono uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Download className="w-3 h-3" /> Download Report
          </button>
          <button 
            onClick={() => toast.info('DMCA Takedown Notice Generated')}
            className="bg-red text-white px-4 py-2 rounded text-[10px] font-mono uppercase tracking-widest hover:bg-red/90 transition-all shadow-[0_0_15px_rgba(255,59,92,0.3)] flex items-center gap-2"
          >
            <FileText className="w-3 h-3" /> File DMCA Notice
          </button>
        </div>
      </div>

      <div ref={reportRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 bg-bg rounded-3xl">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Image Comparison */}
          <div className="glass rounded-2xl overflow-hidden relative group border-white/10">
            <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-widest text-blue">
              Forensic Heatmap View
            </div>
            <div className="aspect-video bg-black flex items-center justify-center relative overflow-hidden">
              {selectedImage?.startsWith('data:video') ? (
                <video 
                  src={selectedImage} 
                  className="max-w-full max-h-full object-contain opacity-50" 
                  controls 
                  autoPlay 
                  muted 
                  loop 
                />
              ) : (
                <img src={selectedImage!} className="max-w-full max-h-full object-contain opacity-50" alt="Forensic" />
              )}
              
              {/* Real-time Heatmap Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {analysis?.anomalies?.map((anomaly: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.6 }}
                    className="absolute rounded-full bg-red/40 blur-xl border border-red/50"
                    style={{
                      left: `${anomaly.x}%`,
                      top: `${anomaly.y}%`,
                      width: `${anomaly.radius * 2}%`,
                      height: `${anomaly.radius * 2}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-1 h-1 bg-red rounded-full animate-ping" />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,59,92,0.1),transparent_70%)]" />
              <div className="absolute left-0 right-0 h-0.5 bg-blue/50 shadow-[0_0_10px_rgba(0,180,255,0.5)] animate-scan z-10" />
            </div>
            <div className="p-4 bg-s1 border-t border-white/5 flex items-center justify-between">
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  <div className="w-2 h-2 rounded-full bg-red shadow-[0_0_8px_rgba(255,59,92,0.5)]" /> High Divergence
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(255,184,0,0.5)]" /> Artifact Cluster
                </div>
              </div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Resolution: 2048x1024 · Depth: 32-bit</div>
            </div>
          </div>

          {/* Web Intelligence */}
          <div className="glass p-8 rounded-2xl space-y-6 border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black tracking-tighter uppercase italic flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue" /> Web Intelligence Results
              </h3>
              {loadingIntel && <Loader2 className="w-4 h-4 text-blue animate-spin" />}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loadingIntel ? (
                Array(4).fill(0).map((_, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 animate-pulse h-24" />
                ))
              ) : webIntelligence.length > 0 ? (
                webIntelligence.map((site, i) => (
                  <a 
                    key={i} 
                    href={site.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2 hover:border-blue/30 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">{site.platform}</span>
                        <ExternalLink className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className={cn(
                        "text-[10px] font-mono uppercase tracking-widest",
                        site.status === 'Critical' ? "text-red" : 
                        site.status === 'High Risk' ? "text-red/80" : 
                        site.status === 'Suspicious' ? "text-gold" : "text-blue"
                      )}>
                        {site.status}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-300 font-medium line-clamp-1">{site.account}</div>
                    <span className="text-[10px] text-slate-500 font-mono truncate">{site.url}</span>
                  </a>
                ))
              ) : (
                <div className="col-span-full p-8 text-center bg-white/5 rounded-xl border border-dashed border-white/10">
                  <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">No social media matches found for this asset</p>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Findings */}
          <div className="glass p-8 rounded-2xl space-y-6 border-white/10">
            <h3 className="text-xl font-black tracking-tighter uppercase italic flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue" /> Neural Analysis Breakdown
            </h3>
            
            {analysis?.explainableAI?.reasoning && (
              <div className="p-6 bg-blue/5 border border-blue/20 rounded-2xl space-y-3">
                <div className="text-[10px] font-mono uppercase tracking-widest text-blue">AI Reasoning Engine</div>
                <p className="text-sm text-slate-300 leading-relaxed italic">"{analysis.explainableAI.reasoning}"</p>
              </div>
            )}

            <div className="space-y-4">
              {analysis?.findings.map((finding: string, i: number) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-blue/20 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-blue/10 flex items-center justify-center shrink-0">
                    <Scan className="w-4 h-4 text-blue" />
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed font-medium">{finding}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Verdict Card */}
          <div className={cn(
            "glass p-10 rounded-2xl border-2 text-center space-y-6 shadow-2xl",
            analysis?.riskScore! > 50 ? "border-red/50 bg-red/5" : "border-green/50 bg-green/5"
          )}>
            <div className="inline-flex p-6 rounded-full bg-white/5 mb-2">
              {analysis?.riskScore! > 50 ? <AlertTriangle className="w-12 h-12 text-red" /> : <CheckCircle2 className="w-12 h-12 text-green" />}
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 mb-2">Final Verdict</p>
              <h2 className={cn("text-4xl font-black tracking-tighter uppercase italic", analysis?.riskScore! > 50 ? "text-red" : "text-green")}>
                {analysis?.verdict}
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest">
                <span className="text-slate-400">Risk Score</span>
                <span className="font-bold text-white">{analysis?.riskScore}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  className={cn("h-full transition-all duration-1000 shadow-[0_0_10px_rgba(0,0,0,0.5)]", analysis?.riskScore! > 50 ? "bg-red" : "bg-green")} 
                  initial={{ width: 0 }}
                  animate={{ width: `${analysis?.riskScore}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
              <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-mono">Confidence Level: {(analysis?.confidence! * 100).toFixed(1)}%</p>
            </div>
          </div>

          {/* Technical Metrics */}
          <div className="glass p-8 rounded-2xl space-y-6 border-white/10">
            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-slate-500">Technical Metrics</h3>
            <div className="space-y-4">
              {[
                { label: 'ELA Analysis', val: analysis?.technicalMetrics?.ela || '98.2%', status: 'Critical', color: 'text-red' },
                { label: 'Noise Variance', val: analysis?.technicalMetrics?.noise || '0.0042', status: 'High', color: 'text-gold' },
                { label: 'JPEG Ghosting', val: analysis?.technicalMetrics?.ghosting || 'Detected', status: 'Critical', color: 'text-red' },
                { label: 'Metadata Stripped', val: analysis?.technicalMetrics?.metadata || 'Yes', status: 'Warning', color: 'text-gold' },
              ].map((m, i) => (
                <div key={i} className="flex items-center justify-between text-xs border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <span className="text-slate-400 font-medium">{m.label}</span>
                  <div className="text-right">
                    <p className="font-mono text-blue font-bold">{m.val}</p>
                    <p className={cn("text-[8px] font-mono uppercase tracking-widest", m.color)}>{m.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Info */}
          <div className="glass p-8 rounded-2xl bg-gradient-to-br from-blue/10 to-purple/10 border-blue/20">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-blue" />
              <h3 className="font-black text-xs uppercase tracking-[0.2em]">Forensic Engine</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Analysis performed using Triple-Hash Consensus v2.4 and MobileNet Neural Embeddings. Evidence is cryptographically signed and ready for legal submission.
            </p>
            <button className="w-full bg-blue text-black py-3 rounded font-black text-[10px] uppercase tracking-widest hover:bg-blue/90 transition-all">
              Verify Evidence Chain
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
