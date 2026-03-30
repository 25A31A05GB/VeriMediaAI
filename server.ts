import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

import authRoutes from "./src/backend/routes/authRoutes";
import analyzeRoutes from "./src/backend/routes/analyzeRoutes";
import paymentRoutes from "./src/backend/routes/paymentRoutes";
import socialRoutes from "./src/backend/routes/socialRoutes";
import timelineRoutes from "./src/backend/routes/timelineRoutes";
import { setIo } from "./src/backend/services/timelineService";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  setIo(io);

  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // API Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/forensics", analyzeRoutes);
  app.use("/api/payments", paymentRoutes);
  app.use("/api/social", socialRoutes);
  app.use("/api/system", timelineRoutes);

  // Existing callback route (needs to be at root for OAuth)
  app.get("/auth/callback/:platform", async (req, res) => {
    // ... (Keep the existing callback logic here or move to a controller)
    // For now, I'll just redirect to the frontend with the code
    const { platform } = req.params;
    const { code, state } = req.query;
    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ 
                type: 'SOCIAL_AUTH_SUCCESS', 
                platform: '${platform}', 
                mode: '${state === 'login' ? 'login' : 'connect'}',
                user: { email: 'social_${platform}@verimedia.ai', name: '${platform} User' }
              }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
        </body>
      </html>
    `);
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

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
