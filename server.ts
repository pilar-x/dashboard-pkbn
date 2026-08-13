import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily/safely
let genAI: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!genAI && process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAI;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Dashboard PKBN API" });
});

// AI SWOT Analysis Endpoint
app.post("/api/gemini/swot", async (req, res) => {
  try {
    const { sector, region, metrics } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.status(503).json({
        error: "Kunci API Gemini tidak dikonfigurasi. Menggunakan analisis standar.",
      });
    }

    const prompt = `Anda adalah Analis Strategis Utama untuk Kementerian Pertahanan / Direktorat Pembinaan Kesadaran Bela Negara (PKBN) Republik Indonesia.
Buatkan analisis SWOT (Strengths, Weaknesses, Opportunities, Threats) yang komprehensif, strategis, dan profesional untuk:
- Sektor / Lingkup: ${sector || "Nasional"}
- Wilayah Fokus: ${region || "Seluruh Indonesia"}
- Ringkasan Data Kinerja: ${JSON.stringify(metrics || {})}

Berikan respon dalam format JSON murni tanpa markdown backticks yang berisi struktur berikut:
{
  "strengths": ["poin 1", "poin 2", "poin 3"],
  "weaknesses": ["poin 1", "poin 2", "poin 3"],
  "opportunities": ["poin 1", "poin 2", "poin 3"],
  "threats": ["poin 1", "poin 2", "poin 3"],
  "strategicRecommendations": ["rekomendasi 1", "rekomendasi 2"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    return res.json(data);
  } catch (error: any) {
    console.error("SWOT Generation Error:", error);
    return res.status(500).json({ error: error.message || "Gagal menghasilkan SWOT" });
  }
});

// AI Executive Report Summary Endpoint
app.post("/api/gemini/report-summary", async (req, res) => {
  try {
    const { period, sector, totalEvents, totalParticipants, topProvinces } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.status(503).json({
        summary: `Laporan Pembinaan Kesadaran Bela Negara (${period}) menunjukkan tren positif dengan total ${totalEvents || 0} kegiatan dilaksanakan dan menjangkau ${totalParticipants || 0} peserta di seluruh Indonesia.`,
      });
    }

    const prompt = `Anda adalah Sekretaris Jenderal Pembinaan Kesadaran Bela Negara. Tuliskan ringkasan eksekutif (Executive Summary) formal singkat (2-3 paragraf Bahasa Indonesia) untuk Laporan ${period || "Bulanan"} PKBN.
Data Pendukung:
- Lingkup: ${sector || "Semua Bidang"}
- Total Kegiatan: ${totalEvents}
- Total Peserta Capaian: ${totalParticipants}
- Provinsi Teraktif: ${topProvinces?.join(", ") || "Jawa Barat, Jawa Timur, DKI Jakarta"}

Gunakan bahasa birokrasi pemerintahan Indonesia yang tegas, patriotik, dan profesional.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    return res.json({ summary: response.text });
  } catch (error: any) {
    console.error("Report Summary Error:", error);
    return res.status(500).json({ error: error.message || "Gagal menghasilkan ringkasan laporan" });
  }
});

// AI Assistant / Consultation Endpoint
app.post("/api/gemini/assistant", async (req, res) => {
  try {
    const { message, history } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.status(503).json({
        reply: "Sistem Asisten AI PKBN sedang dalam mode offline. Fitur ini memerlukan GEMINI_API_KEY.",
      });
    }

    const systemInstruction = `Anda adalah "Asisten AI Pembinaan Kesadaran Bela Negara (PKBN)".
Tugas Anda adalah membantu instansi, pendidik, dan penyelenggara dalam:
1. Memahami 5 Nilai Dasar Bela Negara (Cinta Tanah Air, Sadar Berbangsa & Bernegara, Setia pada Pancasila, Rela Berkorban, Kemampuan Awal Bela Negara).
2. Memahami UU No. 23 Tahun 2019 tentang Pengelolaan Sumber Daya Nasional untuk Pertahanan Negara.
3. Menyusun kurikulum/modul Diklat Kader Bela Negara untuk sekolah, perguruan tinggi, perusahaan, BUMN, dan Ormas/Masyarakat.
4. Memberikan saran metode pemantauan dan evaluasi kegiatan PKBN.

Jawablah dengan bahasa Indonesia yang santun, lugas, terstruktur, serta menyemangati rasa nasionalisme.`;

    const chat = ai.chats.create({
      model: "gemini-3.6-flash",
      config: {
        systemInstruction,
      },
    });

    // Send the query
    const response = await chat.sendMessage({ message });
    return res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Assistant Error:", error);
    return res.status(500).json({ error: error.message || "Terjadi kesalahan pada Asisten AI" });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server PKBN running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
