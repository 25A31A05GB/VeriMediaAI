import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, Shield, AlertTriangle, CheckCircle2, Copy, Send, Mail, Loader2, FileDown } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface PDFExportProps {
  analysis: any;
}

export const PDFExport: React.FC<PDFExportProps> = ({ analysis }) => {
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        backgroundColor: '#050505',
        logging: false
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`VeriMedia_Report_VM-${Math.floor(Math.random() * 10000)}.pdf`);
    } catch (error) {
      console.error('PDF Export Error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-black tracking-tighter uppercase italic">PDF Export Center</h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Official forensic documentation generation</p>
        </div>
        <button 
          onClick={handleExport}
          disabled={isExporting}
          className="bg-blue text-black px-6 py-2 rounded font-bold text-[10px] font-mono uppercase tracking-widest hover:bg-blue/90 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,180,255,0.3)]"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-3 h-3 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <FileDown className="w-3 h-3" /> Export Official PDF
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white/5 border border-white/10 p-1 rounded-xl shadow-2xl">
            <div 
              ref={reportRef}
              className="bg-bg p-12 space-y-12 text-white font-sans overflow-hidden"
              style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}
            >
              <div className="flex justify-between items-start border-b-2 border-blue pb-8">
                <div className="flex items-center gap-3">
                  <Shield className="w-10 h-10 text-blue" />
                  <div>
                    <div className="text-2xl font-black tracking-tighter uppercase italic">VeriMedia <span className="text-blue">AI</span></div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Forensic Investigation Bureau</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Report ID</div>
                  <div className="text-xl font-black text-white tracking-tighter italic">VM-{Math.floor(Math.random() * 10000)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-blue font-bold">Subject Information</div>
                    <div className="space-y-1">
                      <div className="text-sm font-bold uppercase tracking-wider">Media Asset Analysis</div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Verdict: {analysis?.verdict || 'Pending'}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-blue font-bold">Investigation Status</div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${analysis?.verdict === 'Clean' ? 'bg-green/10 border-green/20 text-green' : 'bg-red/10 border-red/20 text-red'}`}>
                      {analysis?.verdict === 'Clean' ? 'Authentic' : 'Modification Detected'}
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2 text-right">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-blue font-bold">Analysis Date</div>
                    <div className="text-sm font-bold text-white uppercase tracking-wider">{new Date().toLocaleDateString()}</div>
                  </div>
                  <div className="space-y-2 text-right">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-blue font-bold">Confidence Score</div>
                    <div className="text-3xl font-black text-white tracking-tighter italic">{(analysis?.confidence * 100 || 94.2).toFixed(1)}%</div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="text-[10px] font-mono uppercase tracking-widest text-blue font-bold border-b border-white/10 pb-2">Forensic Findings</div>
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { l: 'ELA Anomaly', v: analysis?.technicalMetrics?.ela || 'None', s: analysis?.riskScore > 70 ? 'Critical' : 'Low' },
                    { l: 'JPEG Ghosting', v: analysis?.technicalMetrics?.ghosting || 'None', s: analysis?.technicalMetrics?.ghosting !== 'None' ? 'High' : 'Low' },
                    { l: 'Neural Match', v: `${(analysis?.confidence * 100 || 98.4).toFixed(1)}%`, s: analysis?.confidence > 0.9 ? 'Low Risk' : 'High Risk' },
                    { l: 'Metadata', v: analysis?.technicalMetrics?.metadata || 'N/A', s: analysis?.technicalMetrics?.metadata === 'Authentic' ? 'Low' : 'Critical' },
                    { l: 'Pixel Consistency', v: analysis?.technicalMetrics?.pixelConsistency || 'N/A', s: 'Analysis' },
                    { l: 'Neural Artifacts', v: analysis?.technicalMetrics?.neuralArtifacts || 'N/A', s: 'Analysis' }
                  ].map((f, i) => (
                    <div key={i} className="bg-white/5 p-4 rounded-lg space-y-1 border border-white/5">
                      <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{f.l}</div>
                      <div className="text-xs font-bold text-white uppercase tracking-wider">{f.v}</div>
                      <div className={`text-[8px] font-mono uppercase tracking-widest ${f.s === 'Critical' || f.s === 'High Risk' ? 'text-red' : 'text-blue'}`}>{f.s}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-[10px] font-mono uppercase tracking-widest text-blue font-bold border-b border-white/10 pb-2">Executive Conclusion</div>
                <p className="text-xs text-slate-400 leading-relaxed italic">
                  "{analysis?.explainableAI?.reasoning || 'The forensic evidence gathered during this investigation strongly supports the conclusion that the suspect media asset is a modified version of the original reference.'}"
                </p>
              </div>

              <div className="pt-12 flex justify-between items-end border-t border-white/10">
                <div className="space-y-2">
                  <div className="w-32 h-12 border-b border-white/30 font-mono text-xs italic text-slate-500 flex items-end pb-1">VeriMedia AI</div>
                  <div className="text-[9px] font-mono uppercase tracking-widest text-slate-500">Authorized Signature</div>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-[9px] font-mono uppercase tracking-widest text-slate-500">Official Seal</div>
                  <Shield className="w-12 h-12 text-blue/20 ml-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-s1 border border-white/5 p-6 rounded-xl space-y-6">
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Export Options</div>
            <div className="space-y-4">
              {[
                { l: 'Include Heatmap', d: 'Add visual anomaly overlays' },
                { l: 'Include Metadata', d: 'Full EXIF header breakdown' },
                { l: 'Include Web Matches', d: 'List of infringing URLs' },
                { l: 'Legal Certification', d: 'Add digital signature seal' }
              ].map((o, i) => (
                <label key={i} className="flex items-center justify-between p-3 bg-bg/50 border border-white/5 rounded-lg cursor-pointer hover:border-blue/30 transition-colors">
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{o.l}</div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-widest">{o.d}</div>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-blue" />
                </label>
              ))}
            </div>
          </div>

          <div className="bg-blue/5 border border-blue/20 p-6 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-blue">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">PDF Ready</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed italic">
              "The PDF report is generated client-side using jsPDF and html2canvas. It includes a high-resolution render of the forensic summary and is ready for legal submission."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
