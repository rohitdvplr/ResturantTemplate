/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint for our AI Sommelier & Culinary Advisor "Antoine"
  app.post("/api/sommelier", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message content is required." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
        return res.json({
          text: `Antoine at your service. Our neural wine cellars are currently operating in acoustic offline mode.\n\nTonight, I can highly recommend pairing our A5 Wagyu with the Cabernet Sauvignon (Napa Valley Estate 2015), or the Wild Mushroom Truffle Risotto with a glass of Barolo DOCG. If you're pondering our dark cocoa dessert, nothing excels quite like our Douro Valley 20-Year Tawny Port. How may I guide your sensory journey tonight?`,
          offline: true
        });
      }

      // Initialize the modern @google/genai SDK
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Construct a contextual dynamic chat format from prior chat history
      const contents: any[] = [];
      if (history && Array.isArray(history)) {
        for (const msg of history) {
          contents.push({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.text }]
          });
        }
      }
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: `You are Antoine, the elite Chef and head Sommelier of L'Essence Premium Dining.
Your tone is sophisticated, poetic, and welcoming, reflecting a world-class three-Michelin-star fine dining atmosphere.
You are profoundly knowledgeable about gastronomy, ingredient sourcing (Kagoshima A5 Wagyu, freshly shaved winter black truffles, English sweet peas, Atlantic scallops), and vintage wine pairings (Barolo, Burgundy, Cabernet Sauvignon, Port).
Guide the guest with customized suggestions. Introduce yourself beautifully if this is the start of the chat.
Offer wine pairing ideas, explain our culinary philosophy (minimalist luxury, ingredient purity), or suggest specific options from our interactive menu.
Keep your answer relatively concise (under 140 words) and formatted elegantly with spacing and clear headers. Avoid long monologues.`,
          temperature: 0.75,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini AI API Error:", error);
      res.status(500).json({ 
        error: "Antoine is currently adjusting our kitchen acoustics. Please present your request in a brief moment." 
      });
    }
  });

  // Serve static files / Vite HMR asset management
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
    console.log(`[L'Essence] Fullstack server running on port ${PORT}`);
  });
}

startServer();
