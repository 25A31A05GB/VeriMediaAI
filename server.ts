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

  // Social Media OAuth Routes
  app.get("/api/auth/social/url/:platform", (req, res) => {
    const { platform } = req.params;
    const redirectUri = `${process.env.APP_URL || 'http://localhost:3000'}/auth/callback/${platform}`;
    
    let authUrl = "";
    if (platform === "twitter") {
      const params = new URLSearchParams({
        client_id: process.env.TWITTER_CLIENT_ID || "MOCK_TWITTER_ID",
        redirect_uri: redirectUri,
        response_type: "code",
        scope: "tweet.read users.read",
        state: "state",
        code_challenge: "challenge",
        code_challenge_method: "plain"
      });
      authUrl = `https://twitter.com/i/oauth2/authorize?${params}`;
    } else if (platform === "instagram") {
      const params = new URLSearchParams({
        client_id: process.env.INSTAGRAM_CLIENT_ID || "MOCK_INSTAGRAM_ID",
        redirect_uri: redirectUri,
        response_type: "code",
        scope: "user_profile,user_media"
      });
      authUrl = `https://api.instagram.com/oauth/authorize?${params}`;
    } else if (platform === "facebook") {
      const params = new URLSearchParams({
        client_id: process.env.FACEBOOK_CLIENT_ID || "MOCK_FACEBOOK_ID",
        redirect_uri: redirectUri,
        response_type: "code",
        scope: "public_profile,email"
      });
      authUrl = `https://www.facebook.com/v12.0/dialog/oauth?${params}`;
    }

    res.json({ url: authUrl });
  });

  app.get("/auth/callback/:platform", (req, res) => {
    const { platform } = req.params;
    const { code } = req.query;
    
    // In a real app, you'd exchange the code for tokens here
    console.log(`Received ${platform} auth code: ${code}`);

    res.send(`
      <html>
        <head>
          <title>VeriMedia AI - Secure Connection</title>
          <style>
            body { 
              background: #050505; 
              color: white; 
              font-family: 'Inter', sans-serif; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              height: 100vh; 
              margin: 0;
              overflow: hidden;
            }
            .container { 
              text-align: center; 
              padding: 40px;
              border: 1px solid rgba(0, 180, 255, 0.2);
              background: rgba(255, 255, 255, 0.02);
              border-radius: 24px;
              backdrop-filter: blur(20px);
              max-width: 400px;
              position: relative;
            }
            .glow {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 200px;
              height: 200px;
              background: #00B4FF;
              filter: blur(100px);
              opacity: 0.1;
              z-index: -1;
            }
            h2 { color: #00B4FF; margin-bottom: 8px; font-weight: 900; letter-spacing: -0.02em; text-transform: uppercase; font-style: italic; }
            p { color: #8E9299; font-size: 14px; line-height: 1.6; }
            .loader {
              width: 40px;
              height: 40px;
              border: 2px solid rgba(0, 180, 255, 0.1);
              border-top: 2px solid #00B4FF;
              border-radius: 50%;
              margin: 20px auto;
              animation: spin 1s linear infinite;
            }
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          </style>
        </head>
        <body>
          <div class="glow"></div>
          <div class="container">
            <div class="loader"></div>
            <h2>Handshake Verified</h2>
            <p>Your ${platform} account has been successfully integrated into the VeriMedia forensic mesh.</p>
            <p style="font-size: 10px; font-family: monospace; text-transform: uppercase; margin-top: 20px; opacity: 0.5;">Closing secure tunnel...</p>
          </div>
          <script>
            setTimeout(() => {
              if (window.opener) {
                window.opener.postMessage({ type: 'SOCIAL_AUTH_SUCCESS', platform: '${platform}' }, '*');
                window.close();
              } else {
                window.location.href = '/';
              }
            }, 2000);
          </script>
        </body>
      </html>
    `);
  });

  // Social Scan Endpoint
  app.post("/api/social/scan", async (req, res) => {
    const { platform, accountId } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Gemini API key not configured." });
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Use Google Search to find potential deepfakes of this account's media
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ 
          role: 'user', 
          parts: [{ 
            text: `Perform a deep forensic scan for the social media account "${accountId}" on ${platform}. 
            Identify any posts, videos, or images that appear to be deepfakes, impersonations, or manipulated versions of this user's content.
            Search across ${platform} and other platforms for propagation.
            Look for visual artifacts, unnatural textures, and lighting inconsistencies in media associated with this account.
            Return a JSON array of findings: [{ platform, url, type, riskScore, findings: string[], status: "Critical" | "High Risk" | "Suspicious" | "Neutral" }]`
          }] 
        }],
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json"
        }
      });

      res.json(JSON.parse(response.text || '[]'));
    } catch (error) {
      console.error("Social scan error:", error);
      res.status(500).json({ error: "Social media scan failed." });
    }
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
