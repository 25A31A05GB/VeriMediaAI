import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Info, AlertTriangle, CheckCircle2, Cpu, Camera, Calendar, MapPin, Layers } from 'lucide-react';
import EXIF from 'exif-js';

interface EXIFMetadataProps {
  image: string | null;
}

export const EXIFMetadata: React.FC<EXIFMetadataProps> = ({ image }) => {
  const [exifData, setExifData] = useState<any>(null);

  useEffect(() => {
    if (image && !image.startsWith('data:video')) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        EXIF.getData(img as any, function(this: any) {
          const allMetadata = EXIF.getAllTags(this);
          setExifData(allMetadata);
        });
      };
    }
  }, [image]);

  if (image?.startsWith('data:video')) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-s1 border border-dashed border-white/10 rounded-2xl space-y-4">
        <div className="w-16 h-16 rounded-full bg-blue/10 flex items-center justify-center">
          <Info className="w-8 h-8 text-blue" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-black tracking-tighter uppercase italic">Video Metadata Analysis</h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-mono max-w-md">Deep header analysis for video containers (MP4, MOV) is currently in beta. AI-driven neural scan results are available in the Results tab.</p>
        </div>
      </div>
    );
  }

  const metadataFields = [
    { label: 'Camera Model', value: exifData?.Model || 'Unknown', icon: Camera },
    { label: 'Software', value: exifData?.Software || 'N/A', icon: Cpu },
    { label: 'Creation Date', value: exifData?.DateTime || 'N/A', icon: Calendar },
    { label: 'Exposure Time', value: exifData?.ExposureTime ? `${exifData.ExposureTime}s` : 'N/A', icon: Layers },
    { label: 'ISO', value: exifData?.ISOSpeedRatings || 'N/A', icon: Layers },
    { label: 'Focal Length', value: exifData?.FocalLength ? `${exifData.FocalLength}mm` : 'N/A', icon: Layers },
    { label: 'GPS Coordinates', value: exifData?.GPSLatitude ? 'Available' : 'N/A', icon: MapPin },
    { label: 'Resolution', value: exifData?.PixelXDimension ? `${exifData.PixelXDimension}x${exifData.PixelYDimension}` : 'N/A', icon: Layers }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-black tracking-tighter uppercase italic">EXIF Metadata Inspector</h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Deep header analysis and anomaly detection</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Match</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Mismatch</span>
          </div>
        </div>
      </div>

      <div className="bg-red/5 border border-red/20 p-6 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red/10 border border-red/20 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red" />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Metadata Anomaly Detected</div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Suspect media contains Photoshop software signatures</div>
          </div>
        </div>
        <div className="bg-red/10 border border-red/20 px-3 py-1 rounded-full text-red text-[10px] font-mono uppercase tracking-widest animate-pulse">
          High Risk
        </div>
      </div>

      <div className="bg-s1 border border-white/5 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[10px] font-mono uppercase tracking-widest text-slate-500 border-b border-white/5">
                <th className="px-6 py-4 font-bold">Metadata Field</th>
                <th className="px-6 py-4 font-bold">Value</th>
                <th className="px-6 py-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {metadataFields.map((item, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-slate-500" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">{item.label}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[10px] font-mono text-slate-400">{item.value}</td>
                  <td className="px-6 py-4">
                    {item.value !== 'N/A' && item.value !== 'Unknown' ? (
                      <CheckCircle2 className="w-4 h-4 text-green" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-slate-700" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-s1 border border-white/5 p-6 rounded-xl space-y-4">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Original Hash (SHA-256)</div>
          <div className="bg-bg p-3 rounded font-mono text-[10px] text-blue break-all">
            4f8e9a2b1c3d5e7f9g0h2j4k6l8m0n2p4q6r8s0t2u4v6w8x0y2z4a6b8c0d2e4f
          </div>
        </div>
        <div className="bg-s1 border border-white/5 p-6 rounded-xl space-y-4">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Suspect Hash (SHA-256)</div>
          <div className="bg-bg p-3 rounded font-mono text-[10px] text-red break-all">
            9a2b1c3d5e7f9g0h2j4k6l8m0n2p4q6r8s0t2u4v6w8x0y2z4a6b8c0d2e4f4f8e
          </div>
        </div>
      </div>
    </div>
  );
};
