import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const analyzeMedia = async (image: string, originalImage?: string) => {
  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key not configured.");
  }

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  const prompt = originalImage 
    ? "Analyze these two images. The first is the original, the second is a suspected modification. Identify any edits, artifacts, deepfake signatures, or AI-generated inconsistencies. Provide a risk score (0-100), a detailed forensic breakdown, and a decision on what action to take (AUTO DMCA, CRITICAL ALERT + LEGAL FLAG, MONETIZE / LICENSE OPTION, or MONITOR)."
    : "Analyze this image for deepfake signatures, AI generation artifacts, or digital modifications. Look for lighting inconsistencies, unnatural textures, and edge artifacts. Provide a risk score (0-100), a forensic summary, and a decision on what action to take (AUTO DMCA, CRITICAL ALERT + LEGAL FLAG, MONETIZE / LICENSE OPTION, or MONITOR).";

  const parts = [];
  if (originalImage) {
    parts.push({ inlineData: { data: originalImage.split(',')[1], mimeType: "image/jpeg" } });
  }
  parts.push({ inlineData: { data: image.split(',')[1], mimeType: "image/jpeg" } });
  parts.push({ text: prompt });

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ role: 'user', parts }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          riskScore: { type: "number" },
          verdict: { type: "string" },
          findings: {
            type: "array",
            items: { type: "string" }
          },
          confidence: { type: "number" },
          decision: {
            type: "object",
            properties: {
              action: { type: "string" },
              reasoning: { type: "string" },
              confidence: { type: "number" }
            },
            required: ["action", "reasoning", "confidence"]
          },
          explainableAI: {
            type: "object",
            properties: {
              forensicReasons: { type: "array", items: { type: "string" } },
              technicalExplanation: { type: "string" },
              confidenceBreakdown: { type: "string" }
            },
            required: ["forensicReasons", "technicalExplanation", "confidenceBreakdown"]
          }
        },
        required: ["riskScore", "verdict", "findings", "confidence", "decision", "explainableAI"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};
