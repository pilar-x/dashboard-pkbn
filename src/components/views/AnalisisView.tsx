import React, { useState } from "react";
import { ProvinceData, SWOTData } from "../../types";
import { defaultSWOT } from "../../data/mockData";
import {
  BarChart3,
  TrendingUp,
  Sparkles,
  PieChart as PieIcon,
  Compass,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  RefreshCw,
  Award,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";

interface AnalisisViewProps {
  provinces: ProvinceData[];
}

export const AnalisisView: React.FC<AnalisisViewProps> = ({ provinces }) => {
  const [swotData, setSwotData] = useState<SWOTData>(defaultSWOT);
  const [selectedSector, setSelectedSector] = useState<string>("Nasional (Semua Bidang)");
  const [isGeneratingSwot, setIsGeneratingSwot] = useState<boolean>(false);

  // Trend data over 6 months
  const monthlyTrend = [
    { month: "Mar 2026", pendidikan: 180, pekerjaan: 140, masyarakat: 110 },
    { month: "Apr 2026", pendidikan: 210, pekerjaan: 155, masyarakat: 125 },
    { month: "Mei 2026", pendidikan: 240, pekerjaan: 170, masyarakat: 135 },
    { month: "Jun 2026", pendidikan: 290, pekerjaan: 190, masyarakat: 150 },
    { month: "Jul 2026", pendidikan: 340, pekerjaan: 210, masyarakat: 165 },
    { month: "Agu 2026", pendidikan: 420, pekerjaan: 245, masyarakat: 180 },
  ];

  // Participation Index Data per Island Group
  const indexByRegion = [
    { region: "Jawa", indeks: 94.2 },
    { region: "Sumatra", indeks: 88.5 },
    { region: "Sulawesi", indeks: 86.1 },
    { region: "Kalimantan", indeks: 84.7 },
    { region: "Bali & Nusa", indeks: 82.3 },
    { region: "Maluku & Papua", indeks: 79.8 },
  ];

  // AI Generate SWOT Function
  const handleGenerateAiSwot = async () => {
    setIsGeneratingSwot(true);
    try {
      const res = await fetch("/api/gemini/swot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sector: selectedSector,
          region: "Indonesia",
          metrics: {
            totalPrograms: 1482,
            totalParticipants: 2850420,
            completionRate: "91.4%",
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.strengths) {
          setSwotData(data);
        }
      }
    } catch (err) {
      console.error("Failed to generate AI SWOT:", err);
    } finally {
      setIsGeneratingSwot(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-900 to-purple-900 text-purple-300 border border-purple-700/60 flex items-center justify-center shrink-0 shadow-lg">
            <BarChart3 className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-wider text-purple-400 uppercase bg-purple-950/60 px-2.5 py-0.5 rounded border border-purple-800/60">
              Analisis Intelijen & Strategi PKBN
            </span>
            <h2 className="text-xl font-bold text-white font-serif tracking-tight mt-1">
              Grafik Tren, Indeks Partisipasi & Analisis SWOT
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Evaluasi komparatif perkembangan kesadaran Bela Negara antarwilayah dan antarbidang.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="bg-slate-800/90 border border-slate-700/80 px-4 py-2 rounded-xl text-center">
            <div className="text-slate-400 text-[10px]">Indeks Partisipasi Nasional</div>
            <div className="font-bold text-purple-400 text-lg">87.6 / 100</div>
          </div>
        </div>
      </div>

      {/* Trend & Comparison Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Monthly Trend per Sector */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div>
              <h3 className="text-base font-bold text-white font-serif">Grafik Tren Pertumbuhan Program (6 Bulan)</h3>
              <p className="text-xs text-slate-400">Pertumbuhan jumlah kader terbina per bulan</p>
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "0.75rem",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
                <Area type="monotone" dataKey="pendidikan" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Pendidikan" />
                <Area type="monotone" dataKey="pekerjaan" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Pekerjaan" />
                <Area type="monotone" dataKey="masyarakat" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} name="Masyarakat" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Participation Index by Region */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div>
              <h3 className="text-base font-bold text-white font-serif">Indeks Partisipasi Bela Negara per Wilayah</h3>
              <p className="text-xs text-slate-400">Skor Komposit Partisipasi & Kesadaran (Skala 0 - 100)</p>
            </div>
            <Award className="w-5 h-5 text-purple-400" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={indexByRegion} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
                <YAxis dataKey="region" type="category" stroke="#94a3b8" fontSize={11} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "0.75rem",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="indeks" fill="#8b5cf6" radius={[0, 6, 6, 0]} name="Indeks Partisipasi" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SWOT Analysis Matrix Powered by Gemini AI */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950 text-yellow-400 border border-amber-800 flex items-center justify-center shrink-0">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-serif">
                Matriks Analisis SWOT Pembinaan Kesadaran Bela Negara
              </h3>
              <p className="text-xs text-slate-400">
                Pemetaan Kekuatan (S), Kelemahan (W), Peluang (O), dan Ancaman (T) untuk formulasi kebijakan.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-xl border border-slate-700 focus:outline-none"
            >
              <option value="Nasional (Semua Bidang)">Fokus: Nasional (Semua Bidang)</option>
              <option value="Lingkup Pendidikan">Fokus: Lingkup Pendidikan</option>
              <option value="Lingkup Pekerjaan">Fokus: Lingkup Pekerjaan</option>
              <option value="Lingkup Masyarakat">Fokus: Lingkup Masyarakat</option>
            </select>

            <button
              onClick={handleGenerateAiSwot}
              disabled={isGeneratingSwot}
              className="bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold text-xs px-3.5 py-2 rounded-xl shadow-md flex items-center space-x-1.5 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-yellow-300 animate-spin-slow" />
              <span>{isGeneratingSwot ? "Menghasilkan AI SWOT..." : "Generasi SWOT AI"}</span>
            </button>
          </div>
        </div>

        {/* SWOT 4 Grid Quad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Strengths */}
          <div className="bg-emerald-950/30 border border-emerald-800/60 rounded-2xl p-4 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Strengths (Kekuatan)</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300 list-disc pl-4">
              {swotData.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="bg-amber-950/30 border border-amber-800/60 rounded-2xl p-4 space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Weaknesses (Kelemahan)</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300 list-disc pl-4">
              {swotData.weaknesses.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>

          {/* Opportunities */}
          <div className="bg-blue-950/30 border border-blue-800/60 rounded-2xl p-4 space-y-2">
            <div className="flex items-center space-x-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>Opportunities (Peluang)</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300 list-disc pl-4">
              {swotData.opportunities.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>

          {/* Threats */}
          <div className="bg-red-950/30 border border-red-800/60 rounded-2xl p-4 space-y-2">
            <div className="flex items-center space-x-2 text-red-400 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Threats (Ancaman)</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300 list-disc pl-4">
              {swotData.threats.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Strategic Recommendations if present */}
        {swotData.strategicRecommendations && (
          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl text-xs space-y-2">
            <div className="font-bold text-yellow-400 flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Rekomendasi Strategis Hasil Generasi AI:</span>
            </div>
            <ul className="list-disc pl-5 text-slate-200 space-y-1">
              {swotData.strategicRecommendations.map((r, idx) => (
                <li key={idx}>{r}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
