import express from "express";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

// Social Media OAuth Routes (Existing logic from server.ts)
router.get("/auth/social/url/:platform", (req, res) => {
  const { platform } = req.params;
  const { mode, mock } = req.query;
  const redirectUri = `${process.env.APP_URL || 'http://localhost:3000'}/auth/callback/${platform}${mode === 'login' ? '?mode=login' : ''}`;
  
  if (mock === 'true') {
    return res.json({ url: `${redirectUri}${redirectUri.includes('?') ? '&' : '?'}code=mock_code&state=${mode === 'login' ? 'login' : 'connect'}&mock=true` });
  }

  let authUrl = "";
  if (platform === "twitter") {
    const params = new URLSearchParams({
      client_id: process.env.TWITTER_CLIENT_ID || "MOCK_TWITTER_ID",
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "tweet.read users.read",
      state: mode === 'login' ? "login" : "connect",
      code_challenge: "challenge",
      code_challenge_method: "plain"
    });
    authUrl = `https://twitter.com/i/oauth2/authorize?${params}`;
  } else if (platform === "instagram") {
    const params = new URLSearchParams({
      client_id: process.env.INSTAGRAM_CLIENT_ID || "MOCK_INSTAGRAM_ID",
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "user_profile,user_media",
      state: mode === 'login' ? "login" : "connect"
    });
    authUrl = `https://api.instagram.com/oauth/authorize?${params}`;
  } else if (platform === "facebook") {
    const params = new URLSearchParams({
      client_id: process.env.FACEBOOK_CLIENT_ID || "MOCK_FACEBOOK_ID",
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "public_profile,email",
      state: mode === 'login' ? "login" : "connect"
    });
    authUrl = `https://www.facebook.com/v12.0/dialog/oauth?${params}`;
  }

  res.json({ url: authUrl });
});

router.post("/social/scan", async (req, res) => {
  const { platform, accountId } = req.body;
  
  // Simulate specific errors for demo/testing
  if (accountId === 'error_quota') {
    return res.status(429).json({ 
      error: "API Quota Exceeded", 
      isQuotaError: true,
      message: "The neural forensic engine has reached its daily limit for this platform. Please upgrade your node or wait for the next cycle."
    });
  }

  if (accountId === 'error_invalid' || !accountId.startsWith('@')) {
    return res.status(400).json({ 
      error: "Invalid Account ID", 
      message: `The account ID "${accountId}" could not be resolved on ${platform}. Forensic mesh failed to establish a handshake.`
    });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "Gemini API key not configured." });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ 
        role: 'user', 
        parts: [{ 
          text: `Perform a deep forensic scan for the social media account "${accountId}" on ${platform}. 
          Identify any posts, videos, or images that appear to be deepfakes, impersonations, or manipulated versions of this user's content.
          Return a JSON array of findings: [{ platform, url, type, riskScore, findings: string[], status: "Critical" | "High Risk" | "Suspicious" | "Neutral" }]`
        }] 
      }],
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || '[]';
    let results = [];
    try {
      results = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse Gemini response as JSON:", text);
    }

    res.json(results);
  } catch (error: any) {
    console.error("Social scan error:", error);
    res.status(500).json({ error: "Social media scan failed." });
  }
});

export default router;
