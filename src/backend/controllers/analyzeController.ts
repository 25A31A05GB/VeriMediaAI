import { Request, Response } from "express";
import { analyzeMedia } from "../services/gemini";
import { logEvent } from "../services/timelineService";

export const analyze = async (req: Request, res: Response) => {
  const { image, originalImage, metadata } = req.body;
  
  // 1. Pre-prediction Risk System (Rule-based heuristics)
  let prePredictionScore = 0;
  if (metadata) {
    if (metadata.software?.toLowerCase().includes('photoshop')) prePredictionScore += 15;
    if (metadata.software?.toLowerCase().includes('ai')) prePredictionScore += 30;
    if (!metadata.make || !metadata.model) prePredictionScore += 20; // Missing camera data
  }
  if (image.length > 5 * 1024 * 1024) prePredictionScore += 10; // Large files might be higher fidelity deepfakes
  
  logEvent({
    type: "upload",
    title: "Media Uploaded",
    description: `Asset received for forensic analysis. Pre-prediction risk: ${prePredictionScore}%`,
    riskScore: prePredictionScore
  });

  try {
    const analysis = await analyzeMedia(image, originalImage);
    
    logEvent({
      type: "detection",
      title: "Forensic Analysis Complete",
      description: `Neural mesh analysis complete. Verdict: ${analysis.verdict}`,
      riskScore: analysis.riskScore
    });

    // Decision Engine logic
    if (analysis.riskScore > 85) {
      logEvent({
        type: "action",
        title: "Auto DMCA Triggered",
        description: `Risk score ${analysis.riskScore}% exceeded threshold. Legal notice dispatched.`,
        riskScore: analysis.riskScore
      });
    } else if (analysis.riskScore > 60) {
      logEvent({
        type: "alert",
        title: "Critical Alert",
        description: `High risk detected: ${analysis.decision.reasoning}`,
        riskScore: analysis.riskScore
      });
    }

    res.json({
      ...analysis,
      prePredictionScore
    });
  } catch (error: any) {
    console.error("Analysis error:", error);
    res.status(500).json({ error: error.message || "Forensic analysis failed." });
  }
};
