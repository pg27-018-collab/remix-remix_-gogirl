import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(express.json());

// Lazy-initialize Gemini client with fallback check
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("⚠️ GEMINI_API_KEY environment variable is not defined!");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY_FOR_LOCAL_PLAY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// AI Agent Conversation Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    const ai = getGeminiClient();

    // Map client chat history to Gemini formats if present
    const formattedContents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((h: any) => {
        formattedContents.push({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }]
        });
      });
    }
    // Append the latest user message
    formattedContents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: "You are 'Millu', an intelligent, clear, and supportive AI assistant integrated inside GoGirl (a verified female community application for women in Gurgaon, India). Your role is to assist users with navigation, safety features, local venue recommendations, and community meetup planning in Gurgaon (e.g., DLF CyberHub, Galleria Market, Golf Course Road, Sector 50/53). When providing safety guidance, explain practical tools such as the Safety Hub, location sharing, and guardian emergency alerts. Keep your tone simple, formal, professional, and clear. Avoid overly informal or colloquial expressions, exaggerated hype, or corporate boilerplate.",
        temperature: 0.7,
      },
    });

    const text = response.text || "I'm sorry, I couldn't process that query. Let's try again! ✨";
    res.json({ text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

// Setup dev/production environments
async function configureApp() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Configuring development environment with Vite...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Configuring production static file hosting...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Full-stack server running at http://0.0.0.0:${PORT}`);
  });
}

configureApp().catch((err) => {
  console.error("Failed to start full-stack server:", err);
});
