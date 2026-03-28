import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // AI Forensics Endpoint
  app.post("/api/analyze", async (req, res) => {
    const { image, originalImage } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Gemini API key not configured." });
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      const prompt = originalImage 
        ? "Analyze these two images. The first is the original, the second is a suspected modification. Identify any edits, artifacts, deepfake signatures, or AI-generated inconsistencies. Provide a risk score (0-100) and a detailed forensic breakdown."
        : "Analyze this image for deepfake signatures, AI generation artifacts, or digital modifications. Look for lighting inconsistencies, unnatural textures, and edge artifacts. Provide a risk score (0-100) and a forensic summary.";

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
              confidence: { type: "number" }
            },
            required: ["riskScore", "verdict", "findings", "confidence"]
          }
        }
      });

      res.json(JSON.parse(response.text || '{}'));
    } catch (error) {
      console.error("Analysis error:", error);
      res.status(500).json({ error: "Forensic analysis failed." });
    }
  });

  // Mock Auth
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    // Real-feeling mock auth
    if (email && password) {
      res.json({ token: "mock-jwt-token", user: { email, name: email.split('@')[0] } });
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  });

  // Mock Payment
  app.post("/api/payment/process", (req, res) => {
    const { method, details, amount } = req.body;
    
    console.log(`Processing ${method} payment for ${amount}`);

    // Simulate real processing time
    setTimeout(() => {
      // Logic for different methods
      if (method === 'card') {
        if (details.number?.includes('4242')) {
          res.json({ success: true, transactionId: "TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase() });
        } else {
          res.status(400).json({ success: false, error: "Card declined. Please check your details or use another card." });
        }
      } else if (method === 'crypto') {
        // Crypto always "succeeds" in this mock for demo purposes
        res.json({ success: true, transactionId: "CRYPTO-" + Math.random().toString(36).substr(2, 9).toUpperCase() });
      } else {
        // PayPal, Apple, Google
        res.json({ success: true, transactionId: "EXT-" + Math.random().toString(36).substr(2, 9).toUpperCase() });
      }
    }, 6000); // Longer timeout to match the frontend steps
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
