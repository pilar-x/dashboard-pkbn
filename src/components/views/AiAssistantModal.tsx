import React, { useState } from "react";
import { Sparkles, X, Send, Bot, User, BookOpen, ShieldCheck, Scale } from "lucide-react";

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: "dark" | "light";
}

interface ChatMessage {
  sender: "user" | "ai";
  text: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  theme = "dark",
}) => {
  const isDark = theme === "dark";
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "ai",
      text: "Salam Pancasila! Saya adalah Konsultan Asisten AI Pembinaan Kesadaran Bela Negara (PKBN). Saya dapat membantu Anda dalam memahami UU No. 23/2019, 5 Nilai Dasar Bela Negara, perancangan modul diklat, serta penyusunan strategi pembinaan di sekolah, instansi, atau Ormas.",
    },
  ]);

  if (!isOpen) return null;

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputMessage;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = { sender: "user", text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/gemini/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: data.reply || "Maaf, terjadi masalah koneksi dengan Gemini API." },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "Kunci GEMINI_API_KEY belum dikonfigurasi. Pastikan Kunci API diatur pada panel Secrets.",
          },
        ]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Gagal terhubung dengan layanan AI Assistant." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    "Jelaskan 5 Nilai Dasar Bela Negara dan aplikasinya untuk Generasi Z.",
    "Bagaimana garis besar modul Diklat PKBN untuk karyawan BUMN?",
    "Apa poin-poin utama UU No. 23 Tahun 2019 tentang PSDN?",
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`rounded-2xl w-full max-w-2xl h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-fadeIn border ${
        isDark ? "bg-slate-900 border-slate-700 text-slate-100" : "bg-white border-slate-200 text-slate-900"
      }`}>
        {/* Modal Header */}
        <div className={`px-5 py-3.5 border-b flex items-center justify-between ${
          isDark ? "bg-slate-800/90 border-slate-700 text-white" : "bg-slate-100 border-slate-200 text-slate-900"
        }`}>
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-amber-600 to-red-600 flex items-center justify-center shadow">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h3 className={`font-bold text-sm font-serif ${isDark ? "text-white" : "text-slate-900"}`}>
                Konsultan AI Pembinaan Kesadaran Bela Negara
              </h3>
              <p className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-500 font-medium"}`}>Powered by Gemini 3.6 Flash</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark ? "text-slate-400 hover:text-white hover:bg-slate-700" : "text-slate-500 hover:text-slate-900 hover:bg-slate-200"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History Box */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-2.5 ${
                m.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.sender === "ai" && (
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
                  isDark ? "bg-red-950 text-red-400 border-red-800" : "bg-red-100 text-red-700 border-red-300"
                }`}>
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl p-3.5 leading-relaxed ${
                  m.sender === "user"
                    ? "bg-red-700 text-white font-medium shadow"
                    : isDark
                      ? "bg-slate-800 text-slate-200 border border-slate-700/80 shadow"
                      : "bg-slate-100 text-slate-800 border border-slate-200 shadow-sm"
                }`}
              >
                {m.text}
              </div>

              {m.sender === "user" && (
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  isDark ? "bg-slate-700 text-slate-300" : "bg-slate-200 text-slate-700"
                }`}>
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className={`flex items-center space-x-2 text-xs italic ${isDark ? "text-slate-400" : "text-slate-600 font-medium"}`}>
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></div>
              <span>Konsultan AI PKBN sedang berpikir & menganalisis...</span>
            </div>
          )}
        </div>

        {/* Sample Quick Prompts */}
        <div className={`p-3 border-t space-y-1 ${
          isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200"
        }`}>
          <div className={`text-[10px] font-semibold uppercase ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Rekomendasi Pertanyaan Cepat:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {samplePrompts.map((sp, i) => (
              <button
                key={i}
                onClick={() => handleSend(sp)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors text-left ${
                  isDark
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
                    : "bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-sm font-medium"
                }`}
              >
                {sp}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className={`p-3 border-t flex items-center space-x-2 ${
          isDark ? "bg-slate-800/90 border-slate-700" : "bg-slate-100 border-slate-200"
        }`}>
          <input
            type="text"
            placeholder="Tanyakan regulasi, kurikulum, atau analisis PKBN..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className={`flex-1 text-xs px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-red-500 ${
              isDark ? "bg-slate-900 text-slate-100 border-slate-700" : "bg-white text-slate-900 border-slate-300 font-medium"
            }`}
          />
          <button
            onClick={() => handleSend()}
            disabled={loading}
            className="bg-red-700 hover:bg-red-600 text-white p-2.5 rounded-xl shadow transition-colors active:scale-95 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
