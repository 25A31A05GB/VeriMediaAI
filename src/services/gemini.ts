import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

// Enhanced Analysis with Thinking Mode (High)
export const deepAnalyzeMedia = async (base64Data: string, mimeType: string = "image/jpeg") => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: [
        {
          parts: [
            {
              text: `Perform an exhaustive, high-thinking forensic analysis on this ${mimeType.startsWith('video') ? 'video' : 'image'}. 
              Examine every pixel layer, metadata anomaly, and neural artifact.
              Identify all deepfaked, cropped, or manipulated content within the media.
              Use Google Search to cross-reference this media with known public instances to check for propagation or debunking information.
              Provide a detailed report in JSON format with the following structure:
              {
                "verdict": "Deepfake" | "Modified" | "Clean" | "Suspicious",
                "riskScore": number (0-100),
                "confidence": number (0-1),
                "findings": string[],
                "technicalMetrics": {
                  "ela": string,
                  "noise": string,
                  "ghosting": string,
                  "metadata": string,
                  "pixelConsistency": string,
                  "neuralArtifacts": string
                },
                "explainableAI": {
                  "reasoning": string,
                  "visualCues": string[],
                  "modelConfidence": {
                    "layer1": number,
                    "layer2": number,
                    "layer3": number
                  }
                },
                "anomalies": { "x": number, "y": number, "radius": number, "type": string }[]
              }`
            },
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Data.split(',')[1]
              }
            }
          ]
        }
      ],
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
        responseMimeType: "application/json",
        tools: [{ googleSearch: {} }],
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            verdict: { type: Type.STRING },
            riskScore: { type: Type.NUMBER },
            confidence: { type: Type.NUMBER },
            findings: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            technicalMetrics: {
              type: Type.OBJECT,
              properties: {
                ela: { type: Type.STRING },
                noise: { type: Type.STRING },
                ghosting: { type: Type.STRING },
                metadata: { type: Type.STRING },
                pixelConsistency: { type: Type.STRING },
                neuralArtifacts: { type: Type.STRING }
              }
            },
            explainableAI: {
              type: Type.OBJECT,
              properties: {
                reasoning: { type: Type.STRING },
                visualCues: { 
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                modelConfidence: {
                  type: Type.OBJECT,
                  properties: {
                    layer1: { type: Type.NUMBER },
                    layer2: { type: Type.NUMBER },
                    layer3: { type: Type.NUMBER }
                  }
                }
              }
            },
            anomalies: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  x: { type: Type.NUMBER },
                  y: { type: Type.NUMBER },
                  radius: { type: Type.NUMBER },
                  type: { type: Type.STRING }
                },
                required: ["x", "y", "radius", "type"]
              }
            }
          },
          required: ["verdict", "riskScore", "confidence", "findings", "technicalMetrics", "explainableAI", "anomalies"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error: any) {
    console.error("Gemini Deep Analysis Error:", error);
    if (error.message?.includes("API key")) throw new Error("Invalid API Key. Please check your settings.");
    if (error.message?.includes("network")) throw new Error("Network error. Please check your connection.");
    throw new Error(`Neural analysis failed: ${error.message || "Unknown error"}`);
  }
};

// Side-by-side Comparison Analysis
export const compareMedia = async (suspectBase64: string, originalBase64: string, mimeType: string = "image/jpeg") => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: [
        {
          parts: [
            {
              text: `Perform a side-by-side forensic comparison between the SUSPECT media and the ORIGINAL media. 
              Identify all deepfaked, cropped, or manipulated content within the suspect media by comparing it to the original.
              Pinpoint exact differences in pixel consistency, lighting, noise, and neural artifacts.
              Use Google Search to verify the authenticity of the original media if needed.
              Provide a detailed report in JSON format with the following structure:
              {
                "verdict": "Deepfake" | "Modified" | "Clean" | "Suspicious",
                "riskScore": number (0-100),
                "confidence": number (0-1),
                "findings": string[],
                "technicalMetrics": {
                  "ela": string,
                  "noise": string,
                  "ghosting": string,
                  "metadata": string,
                  "pixelConsistency": string,
                  "neuralArtifacts": string
                },
                "explainableAI": {
                  "reasoning": string,
                  "visualCues": string[],
                  "modelConfidence": {
                    "layer1": number,
                    "layer2": number,
                    "layer3": number
                  }
                },
                "anomalies": { "x": number, "y": number, "radius": number, "type": string }[]
              }`
            },
            {
              inlineData: {
                mimeType: mimeType,
                data: suspectBase64.split(',')[1]
              }
            },
            {
              inlineData: {
                mimeType: mimeType,
                data: originalBase64.split(',')[1]
              }
            }
          ]
        }
      ],
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
        responseMimeType: "application/json",
        tools: [{ googleSearch: {} }],
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            verdict: { type: Type.STRING },
            riskScore: { type: Type.NUMBER },
            confidence: { type: Type.NUMBER },
            findings: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            technicalMetrics: {
              type: Type.OBJECT,
              properties: {
                ela: { type: Type.STRING },
                noise: { type: Type.STRING },
                ghosting: { type: Type.STRING },
                metadata: { type: Type.STRING },
                pixelConsistency: { type: Type.STRING },
                neuralArtifacts: { type: Type.STRING }
              }
            },
            explainableAI: {
              type: Type.OBJECT,
              properties: {
                reasoning: { type: Type.STRING },
                visualCues: { 
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                modelConfidence: {
                  type: Type.OBJECT,
                  properties: {
                    layer1: { type: Type.NUMBER },
                    layer2: { type: Type.NUMBER },
                    layer3: { type: Type.NUMBER }
                  }
                }
              }
            },
            anomalies: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  x: { type: Type.NUMBER },
                  y: { type: Type.NUMBER },
                  radius: { type: Type.NUMBER },
                  type: { type: Type.STRING }
                },
                required: ["x", "y", "radius", "type"]
              }
            }
          },
          required: ["verdict", "riskScore", "confidence", "findings", "technicalMetrics", "explainableAI", "anomalies"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error: any) {
    console.error("Gemini Comparison Error:", error);
    if (error.message?.includes("API key")) throw new Error("Invalid API Key. Please check your settings.");
    if (error.message?.includes("network")) throw new Error("Network error. Please check your connection.");
    throw new Error(`Comparison analysis failed: ${error.message || "Unknown error"}`);
  }
};

// Standard Analysis (Fast)
export const analyzeMedia = async (base64Data: string, mimeType: string = "image/jpeg") => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: [
        {
          parts: [
            {
              text: `Perform a quick forensic scan on this ${mimeType.startsWith('video') ? 'video' : 'image'}. Detect modifications or deepfake indicators.
              Use Google Search to cross-reference this media with known public instances.
              Return JSON: { verdict, riskScore, confidence, findings: string[], anomalies: {x, y, radius, type}[] }`
            },
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Data.split(',')[1]
              }
            }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        tools: [{ googleSearch: {} }]
      }
    });

    return JSON.parse(response.text);
  } catch (error: any) {
    console.error("Gemini Quick Analysis Error:", error);
    if (error.message?.includes("API key")) throw new Error("Invalid API Key. Please check your settings.");
    if (error.message?.includes("network")) throw new Error("Network error. Please check your connection.");
    throw new Error(`Quick analysis failed: ${error.message || "Unknown error"}`);
  }
};

// Image Generation
export const generateForensicImage = async (prompt: string, size: "1K" | "2K" | "4K" = "1K") => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-image-preview",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        imageConfig: {
          imageSize: size,
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image generated");
  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};

// Multi-turn Chat
export const startForensicChat = (context?: any) => {
  let systemInstruction = "You are the VeriMedia AI. You help users analyze media for deepfakes, explain forensic metrics (ELA, SSIM, Neural Artifacts), and provide legal guidance for DMCA takedowns. Be professional, technical, and precise. Always refer to yourself as VeriMedia AI.";
  
  if (context) {
    systemInstruction += `\n\nCurrent Analysis Context: ${JSON.stringify(context)}. Use this data to answer specific questions about the analyzed media.`;
  }

  return ai.chats.create({
    model: "gemini-3.1-pro-preview",
    config: {
      systemInstruction: systemInstruction,
      tools: [{ googleSearch: {} }]
    }
  });
};

export const searchMedia = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Perform a comprehensive live social media scan for the following media query: "${query}". 
      Search across platforms like Twitter/X, Reddit, Telegram, Instagram, and TikTok.
      Identify occurrences, propagation trends, and potential misinformation threats.
      Return the findings as a JSON array of objects with the following structure:
      [
        {
          "platform": string,
          "account": string,
          "reach": string,
          "status": "Critical" | "High Risk" | "Suspicious" | "Neutral",
          "type": string,
          "time": string,
          "content": string,
          "url": string
        }
      ]
      Return ONLY the JSON array.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const text = response.text;
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    const jsonStr = jsonMatch ? jsonMatch[0] : text;
    
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return [];
  }
};

export const getLiveIntelligence = async () => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate 5 real-time threat intelligence alerts related to deepfakes, AI misinformation, or forensic anomalies currently trending on social media platforms like Twitter, Telegram, and Reddit. Return ONLY a JSON array of objects with { type, msg, platform }. Do not include any other text or markdown formatting.",
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    
    // Extract JSON if it's wrapped in markdown
    const text = response.text;
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    const jsonStr = jsonMatch ? jsonMatch[0] : text;
    
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini Intelligence Error:", error);
    return [];
  }
};
