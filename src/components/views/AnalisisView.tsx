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
  Award,
  Users,
  PieChart,
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Pie,
  Cell,
} from "recharts";

interface AnalisisViewProps {
  provinces: ProvinceData[];
  theme?: "dark" | "light";
}

export const AnalisisView: React.FC<AnalisisViewProps> = ({ provinces, theme = "dark" }) => {
  const isDark = theme === "dark";
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

  // Radar Data for PKBN Dimensions
  const radarDimensions = [
    { dimension: "Cinta Tanah Air", score: 92 },
    { dimension: "Sadar Berbangsa", score: 88 },
    { dimension: "Setia Pancasila", score: 95 },
    { dimension: "Rela Berkorban", score: 84 },
    { dimension: "Kemampuan Awal", score: 86 },
  ];

  // Demographics: Gender
  const genderData = [
    { name: "Pria", value: 58, color: "#3b82f6" },
    { name: "Wanita", value: 42, color: "#ec4899" },
  ];

  // Demographics: Usia
  const ageData = [
    { range: "< 18 Thn (Pelajar)", total: 320 },
    { range: "18-25 Thn (Mahasiswa)", total: 450 },
    { range: "26-40 Thn (Pekerja)", total: 380 },
    { range: "41-55 Thn (ASN/TNI)", total: 210 },
    { range: "> 55 Thn (Tokoh)", total: 90 },
  ];

  // Demographics: Profesi
  const professionData = [
    { profesi: "Pelajar & Mahasiswa", total: 770 },
    { profesi: "ASN & Pegawai BUMN", total: 410 },
    { profesi: "Karyawan Swasta", total: 320 },
    { profesi: "Anggota Ormas & Relawan", total: 290 },
    { profesi: "Masyarakat Umum", total: 180 },
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
      <div className={`rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border ${
        isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
      }`}>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-900 to-purple-900 text-purple-300 border border-purple-700/60 flex items-center justify-center shrink-0 shadow-lg">
            <BarChart3 className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-wider text-purple-400 uppercase bg-purple-950/60 px-2.5 py-0.5 rounded border border-purple-800/60">
              Analisis Intelijen & Strategi PKBN
            </span>
            <h2 className={`text-xl font-bold font-serif tracking-tight mt-1 ${isDark ? "text-white" : "text-slate-900"}`}>
              Grafik Tren, Radar Indeks, Demografi & Analisis SWOT
            </h2>
            <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-600 font-medium"}`}>
              Evaluasi komparatif perkembangan kesadaran Bela Negara antarwilayah, demografi, dan dimensi karakter.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className={`px-4 py-2 rounded-xl text-center border ${
            isDark ? "bg-slate-800/90 border-slate-700/80" : "bg-slate-100 border-slate-200 shadow-sm"
          }`}>
            <div className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-600 font-semibold"}`}>Indeks Partisipasi Nasional</div>
            <div className="font-bold text-purple-600 dark:text-purple-400 text-lg">87.6 / 100</div>
          </div>
        </div>
      </div>

      {/* Main Charts Row 1: Trend Area & Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Monthly Trend per Sector */}
        <div className={`rounded-2xl p-5 shadow-xl space-y-3 border ${
          isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
        }`}>
          <div className={`flex items-center justify-between border-b pb-2 ${isDark ? "border-slate-800" : "border-slate-200"}`}>
            <div>
              <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>Grafik Tren Pertumbuhan Program (6 Bulan)</h3>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600 font-medium"}`}>Pertumbuhan jumlah kader terbina per bulan</p>
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e2e8f0"} vertical={false} />
                <XAxis dataKey="month" stroke={isDark ? "#94a3b8" : "#64748b"} fontSize={11} />
                <YAxis stroke={isDark ? "#94a3b8" : "#64748b"} fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? "#0f172a" : "#ffffff",
                    borderColor: isDark ? "#334155" : "#cbd5e1",
                    borderRadius: "0.75rem",
                    color: isDark ? "#fff" : "#0f172a",
                    fontSize: "12px",
                    fontWeight: "bold",
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

        {/* Chart 2: Radar Chart for 5 Nilai Dasar PKBN */}
        <div className={`rounded-2xl p-5 shadow-xl space-y-3 border ${
          isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
        }`}>
          <div className={`flex items-center justify-between border-b pb-2 ${isDark ? "border-slate-800" : "border-slate-200"}`}>
            <div>
              <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>Radar 5 Nilai Dasar Bela Negara</h3>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600 font-medium"}`}>Skor kuesioner tingkat pemahaman nilai dasar</p>
            </div>
            <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarDimensions}>
                <PolarGrid stroke={isDark ? "#334155" : "#cbd5e1"} />
                <PolarAngleAxis dataKey="dimension" stroke={isDark ? "#cbd5e1" : "#334155"} fontSize={11} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke={isDark ? "#64748b" : "#94a3b8"} fontSize={10} />
                <Radar name="Skor Nilai" dataKey="score" stroke="#a855f7" fill="#a855f7" fillOpacity={0.5} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? "#0f172a" : "#ffffff",
                    borderColor: isDark ? "#334155" : "#cbd5e1",
                    borderRadius: "0.75rem",
                    color: isDark ? "#fff" : "#0f172a",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Demographics Row (Gender, Usia, Profesi) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Gender Pie Chart */}
        <div className={`rounded-2xl p-5 shadow-xl space-y-3 border ${
          isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
        }`}>
          <div className={`flex items-center space-x-2 border-b pb-2 ${isDark ? "border-slate-800" : "border-slate-200"}`}>
            <Users className="w-4 h-4 text-pink-500" />
            <h3 className={`text-sm font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>Demografi: Gender</h3>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={genderData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={5} dataKey="value">
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{
                  backgroundColor: isDark ? "#0f172a" : "#ffffff",
                  borderColor: isDark ? "#334155" : "#cbd5e1",
                  borderRadius: "0.5rem",
                  color: isDark ? "#fff" : "#0f172a",
                  fontSize: "12px",
                  fontWeight: "bold",
                }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 text-xs font-semibold">
            <span className="text-blue-600 dark:text-blue-400">Pria: 58%</span>
            <span className="text-pink-600 dark:text-pink-400">Wanita: 42%</span>
          </div>
        </div>

        {/* Age Group Bar Chart */}
        <div className={`rounded-2xl p-5 shadow-xl space-y-3 border ${
          isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
        }`}>
          <div className={`flex items-center space-x-2 border-b pb-2 ${isDark ? "border-slate-800" : "border-slate-200"}`}>
            <Users className="w-4 h-4 text-amber-500" />
            <h3 className={`text-sm font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>Demografi: Kelompok Usia</h3>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e2e8f0"} vertical={false} />
                <XAxis dataKey="range" stroke={isDark ? "#94a3b8" : "#64748b"} fontSize={9} />
                <YAxis stroke={isDark ? "#94a3b8" : "#64748b"} fontSize={10} />
                <Tooltip contentStyle={{
                  backgroundColor: isDark ? "#0f172a" : "#ffffff",
                  borderColor: isDark ? "#334155" : "#cbd5e1",
                  borderRadius: "0.5rem",
                  color: isDark ? "#fff" : "#0f172a",
                  fontSize: "12px",
                  fontWeight: "bold",
                }} />
                <Bar dataKey="total" fill="#eab308" radius={[4, 4, 0, 0]} name="Peserta (Ribu)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Profession Bar Chart */}
        <div className={`rounded-2xl p-5 shadow-xl space-y-3 border ${
          isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
        }`}>
          <div className={`flex items-center space-x-2 border-b pb-2 ${isDark ? "border-slate-800" : "border-slate-200"}`}>
            <Users className="w-4 h-4 text-emerald-500" />
            <h3 className={`text-sm font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>Demografi: Latar Belakang Profesi</h3>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={professionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e2e8f0"} horizontal={false} />
                <XAxis type="number" stroke={isDark ? "#94a3b8" : "#64748b"} fontSize={10} />
                <YAxis dataKey="profesi" type="category" stroke={isDark ? "#94a3b8" : "#64748b"} fontSize={9} width={100} />
                <Tooltip contentStyle={{
                  backgroundColor: isDark ? "#0f172a" : "#ffffff",
                  borderColor: isDark ? "#334155" : "#cbd5e1",
                  borderRadius: "0.5rem",
                  color: isDark ? "#fff" : "#0f172a",
                  fontSize: "12px",
                  fontWeight: "bold",
                }} />
                <Bar dataKey="total" fill="#10b981" radius={[0, 4, 4, 0]} name="Peserta (Ribu)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SWOT Analysis Matrix Powered by Gemini AI */}
      <div className={`rounded-2xl p-6 shadow-xl space-y-5 border ${
        isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
      }`}>
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 ${isDark ? "border-slate-800" : "border-slate-200"}`}>
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
              isDark ? "bg-amber-950 text-yellow-400 border-amber-800" : "bg-amber-100 text-amber-700 border-amber-300"
            }`}>
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`text-lg font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>
                Matriks Analisis SWOT Pembinaan Kesadaran Bela Negara
              </h3>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600 font-medium"}`}>
                Pemetaan Kekuatan (S), Kelemahan (W), Peluang (O), dan Ancaman (T) untuk formulasi kebijakan.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className={`text-xs px-3 py-2 rounded-xl border focus:outline-none ${
                isDark ? "bg-slate-800 text-slate-200 border-slate-700" : "bg-slate-100 text-slate-800 border-slate-300 font-medium"
              }`}
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
          <div className={`rounded-2xl p-4 space-y-2 border ${
            isDark ? "bg-emerald-950/30 border-emerald-800/60" : "bg-emerald-50 border-emerald-200"
          }`}>
            <div className={`flex items-center space-x-2 font-bold text-xs uppercase tracking-wider ${
              isDark ? "text-emerald-400" : "text-emerald-800"
            }`}>
              <ShieldCheck className="w-4 h-4" />
              <span>Strengths (Kekuatan)</span>
            </div>
            <ul className={`space-y-1.5 text-xs list-disc pl-4 ${isDark ? "text-slate-300" : "text-slate-700 font-medium"}`}>
              {swotData.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className={`rounded-2xl p-4 space-y-2 border ${
            isDark ? "bg-amber-950/30 border-amber-800/60" : "bg-amber-50 border-amber-200"
          }`}>
            <div className={`flex items-center space-x-2 font-bold text-xs uppercase tracking-wider ${
              isDark ? "text-amber-400" : "text-amber-800"
            }`}>
              <AlertTriangle className="w-4 h-4" />
              <span>Weaknesses (Kelemahan)</span>
            </div>
            <ul className={`space-y-1.5 text-xs list-disc pl-4 ${isDark ? "text-slate-300" : "text-slate-700 font-medium"}`}>
              {swotData.weaknesses.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>

          {/* Opportunities */}
          <div className={`rounded-2xl p-4 space-y-2 border ${
            isDark ? "bg-blue-950/30 border-blue-800/60" : "bg-blue-50 border-blue-200"
          }`}>
            <div className={`flex items-center space-x-2 font-bold text-xs uppercase tracking-wider ${
              isDark ? "text-blue-400" : "text-blue-800"
            }`}>
              <Lightbulb className="w-4 h-4" />
              <span>Opportunities (Peluang)</span>
            </div>
            <ul className={`space-y-1.5 text-xs list-disc pl-4 ${isDark ? "text-slate-300" : "text-slate-700 font-medium"}`}>
              {swotData.opportunities.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>

          {/* Threats */}
          <div className={`rounded-2xl p-4 space-y-2 border ${
            isDark ? "bg-red-950/30 border-red-800/60" : "bg-red-50 border-red-200"
          }`}>
            <div className={`flex items-center space-x-2 font-bold text-xs uppercase tracking-wider ${
              isDark ? "text-red-400" : "text-red-800"
            }`}>
              <AlertTriangle className="w-4 h-4" />
              <span>Threats (Ancaman)</span>
            </div>
            <ul className={`space-y-1.5 text-xs list-disc pl-4 ${isDark ? "text-slate-300" : "text-slate-700 font-medium"}`}>
              {swotData.threats.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Strategic Recommendations if present */}
        {swotData.strategicRecommendations && (
          <div className={`p-4 rounded-xl text-xs space-y-2 border ${
            isDark ? "bg-slate-800/80 border-slate-700 text-slate-200" : "bg-slate-100 border-slate-300 text-slate-800"
          }`}>
            <div className={`font-bold flex items-center space-x-2 ${isDark ? "text-yellow-400" : "text-amber-700"}`}>
              <Sparkles className="w-4 h-4" />
              <span>Rekomendasi Strategis Hasil Generasi AI:</span>
            </div>
            <ul className={`list-disc pl-5 space-y-1 ${isDark ? "text-slate-200" : "text-slate-700 font-medium"}`}>
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
