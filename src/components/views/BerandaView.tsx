import React from "react";
import {
  NationalKPI,
  ProvinceData,
  ProgramItem,
  CalendarEvent,
  ActiveTab,
} from "../../types";
import { IndonesiaMap } from "../IndonesiaMap";
import { GoogleIndonesiaMap } from "../GoogleIndonesiaMap";
import { MapDashboardWrapper } from "../MapDashboardWrapper";
import {
  ShieldCheck,
  Users,
  Building2,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Award,
  Calendar as CalendarIcon,
  MapPin,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface BerandaViewProps {
  kpi: NationalKPI;
  provinces: ProvinceData[];
  programs: ProgramItem[];
  events: CalendarEvent[];
  selectedProvince: ProvinceData | null;
  onSelectProvince: (prov: ProvinceData | null) => void;
  onNavigate: (tab: ActiveTab) => void;
  onOpenAiAssistant: () => void;
  theme?: "dark" | "light";
  searchQuery?: string;
}

export const BerandaView: React.FC<BerandaViewProps> = ({
  kpi,
  provinces,
  programs,
  events,
  selectedProvince,
  onSelectProvince,
  onNavigate,
  onOpenAiAssistant,
  theme = "dark",
  searchQuery = "",
}) => {
  const isDark = theme === "dark";

  // Filter events if search query is active
  const displayEvents = React.useMemo(() => {
    if (!searchQuery.trim()) return events;
    const q = searchQuery.toLowerCase();
    return events.filter(
      (ev) =>
        ev.title.toLowerCase().includes(q) ||
        ev.location.toLowerCase().includes(q) ||
        ev.province.toLowerCase().includes(q) ||
        ev.sector.toLowerCase().includes(q)
    );
  }, [events, searchQuery]);

  // Chart Data: Sector breakdown dynamically computed from programs
  const pendidikanCount = programs.filter((p) => p.sector === "Pendidikan").length + 615;
  const pekerjaanCount = programs.filter((p) => p.sector === "Pekerjaan").length + 475;
  const masyarakatCount = programs.filter((p) => p.sector === "Masyarakat").length + 378;

  const sectorData = [
    { name: "Pendidikan", total: pendidikanCount, color: "#3b82f6" },
    { name: "Pekerjaan", total: pekerjaanCount, color: "#10b981" },
    { name: "Masyarakat", total: masyarakatCount, color: "#f59e0b" },
  ];

  // Chart Data: Regional top 6 provinces
  const regionalData = provinces.slice(0, 7).map((p) => ({
    name: p.name,
    peserta: Math.round(p.totalParticipants / 1000), // in Thousands
    kegiatan: p.totalEvents,
  }));

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className={`relative overflow-hidden rounded-2xl border p-6 shadow-xl ${
        isDark
          ? "bg-gradient-to-r from-red-950 via-slate-900 to-slate-900 border-red-900/40 text-white"
          : "bg-gradient-to-r from-red-800 via-red-900 to-slate-900 border-red-800 text-white shadow-md"
      }`}>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="bg-red-900/80 text-red-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-red-700/60 uppercase tracking-widest">
                REPUBLIK INDONESIA
              </span>
              <span className="text-xs text-red-100/80">| UU No. 23 Tahun 2019</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-white">
              Sistem Informasi & Dashboard Pemantauan PKBN Nasional
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Memantau pelaksanaan Pembinaan Kesadaran Bela Negara di 38 Provinsi secara terpadu melalui 3 Lingkup Utama: <strong className="text-yellow-300">Pendidikan</strong>, <strong className="text-emerald-300">Pekerjaan</strong>, dan <strong className="text-cyan-300">Masyarakat</strong>.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={onOpenAiAssistant}
              className="bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center space-x-2 transition-all active:scale-95 border border-amber-400/40"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Analisis AI & Kurikulum</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className={`rounded-2xl p-4 shadow-lg flex items-center justify-between border transition-all ${
          isDark ? "bg-slate-900 border-slate-800 hover:border-slate-700" : "bg-white border-slate-200 hover:border-slate-300"
        }`}>
          <div>
            <div className={`text-xs font-semibold ${isDark ? "text-slate-400" : "text-slate-600 font-bold"}`}>Total Program PKBN</div>
            <div className={`text-2xl font-black mt-1 ${isDark ? "text-white" : "text-slate-900"}`}>
              {kpi.totalProgram.toLocaleString("id-ID")}
            </div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center space-x-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>+14.2% dari target tahunan</span>
            </div>
          </div>
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
            isDark ? "bg-red-950/60 text-red-400 border-red-800/50" : "bg-red-50 text-red-700 border-red-200"
          }`}>
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 2 */}
        <div className={`rounded-2xl p-4 shadow-lg flex items-center justify-between border transition-all ${
          isDark ? "bg-slate-900 border-slate-800 hover:border-slate-700" : "bg-white border-slate-200 hover:border-slate-300"
        }`}>
          <div>
            <div className={`text-xs font-semibold ${isDark ? "text-slate-400" : "text-slate-600 font-bold"}`}>Total Peserta Capaian</div>
            <div className={`text-2xl font-black mt-1 ${isDark ? "text-yellow-400" : "text-amber-700"}`}>
              {kpi.totalPeserta.toLocaleString("id-ID")}
            </div>
            <div className={`text-[10px] mt-1 ${isDark ? "text-slate-400" : "text-slate-600 font-medium"}`}>
              Cadangan & Kader Bela Negara
            </div>
          </div>
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
            isDark ? "bg-amber-950/60 text-amber-400 border-amber-800/50" : "bg-amber-50 text-amber-700 border-amber-200"
          }`}>
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 3 */}
        <div className={`rounded-2xl p-4 shadow-lg flex items-center justify-between border transition-all ${
          isDark ? "bg-slate-900 border-slate-800 hover:border-slate-700" : "bg-white border-slate-200 hover:border-slate-300"
        }`}>
          <div>
            <div className={`text-xs font-semibold ${isDark ? "text-slate-400" : "text-slate-600 font-bold"}`}>Sekolah & Kampus</div>
            <div className={`text-2xl font-black mt-1 ${isDark ? "text-blue-400" : "text-blue-700"}`}>
              {kpi.totalSekolahPT.toLocaleString("id-ID")}
            </div>
            <div className={`text-[10px] mt-1 ${isDark ? "text-slate-400" : "text-slate-600 font-medium"}`}>
              Satuan Pendidikan Terdaftar
            </div>
          </div>
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
            isDark ? "bg-blue-950/60 text-blue-400 border-blue-800/50" : "bg-blue-50 text-blue-700 border-blue-200"
          }`}>
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 4 */}
        <div className={`rounded-2xl p-4 shadow-lg flex items-center justify-between border transition-all ${
          isDark ? "bg-slate-900 border-slate-800 hover:border-slate-700" : "bg-white border-slate-200 hover:border-slate-300"
        }`}>
          <div>
            <div className={`text-xs font-semibold ${isDark ? "text-slate-400" : "text-slate-600 font-bold"}`}>Instansi & Ormas</div>
            <div className={`text-2xl font-black mt-1 ${isDark ? "text-emerald-400" : "text-emerald-700"}`}>
              {(kpi.totalInstansi + kpi.totalOrmas).toLocaleString("id-ID")}
            </div>
            <div className={`text-[10px] mt-1 ${isDark ? "text-slate-400" : "text-slate-600 font-medium"}`}>
              Gov, BUMN, Swasta & Ormas
            </div>
          </div>
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
            isDark ? "bg-emerald-950/60 text-emerald-400 border-emerald-800/50" : "bg-emerald-50 text-emerald-700 border-emerald-200"
          }`}>
            <Building2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Interactive Map Section */}
      <MapDashboardWrapper
        provinces={provinces}
        programs={programs}
        selectedProvince={selectedProvince}
        onSelectProvince={onSelectProvince}
        theme={theme}
        searchQuery={searchQuery}
      />

      {/* Charts & Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Regional Capaian */}
        <div className={`lg:col-span-2 rounded-2xl p-5 shadow-xl border ${
          isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>
                Grafik Capaian Peserta per Provinsi Teraktif
              </h3>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600 font-medium"}`}>Dalam Ribuan Peserta (Ribu Orang)</p>
            </div>
            <button
              onClick={() => onNavigate("analisis")}
              className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 font-bold flex items-center space-x-1"
            >
              <span>Detail Analisis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e2e8f0"} vertical={false} />
                <XAxis dataKey="name" stroke={isDark ? "#94a3b8" : "#64748b"} fontSize={11} tickLine={false} />
                <YAxis stroke={isDark ? "#94a3b8" : "#64748b"} fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? "#0f172a" : "#ffffff",
                    borderColor: isDark ? "#334155" : "#cbd5e1",
                    borderRadius: "0.75rem",
                    color: isDark ? "#fff" : "#0f172a",
                    fontSize: "12px",
                    fontWeight: "bold",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar dataKey="peserta" fill="#2563eb" radius={[6, 6, 0, 0]} name="Peserta (Ribu)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Proportion by Sector */}
        <div className={`rounded-2xl p-5 shadow-xl border flex flex-col justify-between ${
          isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
        }`}>
          <div>
            <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>Proporsi 3 Lingkup PKBN</h3>
            <p className={`text-xs mb-4 ${isDark ? "text-slate-400" : "text-slate-600 font-medium"}`}>Jumlah Program Berdasarkan Lingkup</p>

            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={5}
                    dataKey="total"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? "#0f172a" : "#ffffff",
                      borderColor: isDark ? "#334155" : "#cbd5e1",
                      borderRadius: "0.5rem",
                      color: isDark ? "#fff" : "#0f172a",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={`space-y-2 border-t pt-3 ${isDark ? "border-slate-800" : "border-slate-200"}`}>
            {sectorData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span className={`font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}>{item.name}</span>
                </div>
                <span className={`font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{item.total} Program</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Agenda & Top Ranked Regencies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Calendar Events */}
        <div className={`rounded-2xl p-5 shadow-xl border ${
          isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
        }`}>
          <div className={`flex items-center justify-between mb-4 border-b pb-2 ${isDark ? "border-slate-800" : "border-slate-200"}`}>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5 text-red-600 dark:text-red-500" />
              <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>
                Agenda & Kegiatan Terdekat
              </h3>
            </div>
            <button
              onClick={() => onNavigate("pendidikan")}
              className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 font-bold"
            >
              Lihat Kalender
            </button>
          </div>

          <div className="space-y-3">
            {displayEvents.length === 0 ? (
              <div className="text-center py-6 text-xs text-slate-400">
                Tidak ada agenda yang cocok dengan kata kunci "{searchQuery}"
              </div>
            ) : (
              displayEvents.map((ev) => (
              <div
                key={ev.id}
                className={`rounded-xl p-3.5 flex items-start justify-between gap-3 border transition-all ${
                  isDark
                    ? "bg-slate-800/80 border-slate-700/80 hover:border-slate-600 text-white"
                    : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800 shadow-sm"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        ev.sector === "Pendidikan"
                          ? "bg-blue-950 text-blue-300 border border-blue-800"
                          : ev.sector === "Pekerjaan"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          : "bg-amber-950 text-amber-300 border border-amber-800"
                      }`}
                    >
                      {ev.sector}
                    </span>
                    <span className={`text-[11px] font-mono ${isDark ? "text-slate-400" : "text-slate-600 font-semibold"}`}>{ev.date}</span>
                  </div>
                  <h4 className={`text-xs font-bold leading-snug ${isDark ? "text-white" : "text-slate-900"}`}>{ev.title}</h4>
                  <div className={`text-[11px] flex items-center space-x-2 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    <MapPin className="w-3 h-3 text-red-500" />
                    <span>{ev.location} ({ev.province})</span>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                      ev.status === "Berlangsung"
                        ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40"
                        : "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40"
                    }`}
                  >
                    {ev.status}
                  </span>
                  <div className={`text-[10px] mt-1 ${isDark ? "text-slate-400" : "text-slate-600 font-medium"}`}>
                    {ev.registered}/{ev.capacity} Peserta
                  </div>
                </div>
              </div>
            )))}
          </div>
        </div>

        {/* Top Regencies & Quick Actions */}
        <div className={`rounded-2xl p-5 shadow-xl border flex flex-col justify-between ${
          isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
        }`}>
          <div>
            <div className={`flex items-center space-x-2 mb-3 border-b pb-2 ${isDark ? "border-slate-800" : "border-slate-200"}`}>
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>
                Peringkat Provinsi & Kab/Kota Teraktif
              </h3>
            </div>

            <div className="space-y-2 mb-4">
              <div className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                5 Provinsi Teraktif
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {kpi.provinsiTeraktif.slice(0, 4).map((p, idx) => (
                  <div
                    key={p}
                    className={`p-2.5 rounded-lg flex items-center space-x-2 text-xs border ${
                      isDark
                        ? "bg-slate-800/80 border-slate-700 text-slate-200"
                        : "bg-slate-50 border-slate-200 text-slate-800 font-semibold shadow-sm"
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-red-950 text-red-400 border border-red-800 flex items-center justify-center font-bold text-[10px]">
                      #{idx + 1}
                    </span>
                    <span className="font-semibold">{p}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className={`text-xs font-bold uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                5 Kabupaten/Kota Teraktif
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {kpi.kabupatenTeraktif.slice(0, 4).map((k, idx) => (
                  <div
                    key={k}
                    className={`p-2.5 rounded-lg flex items-center space-x-2 text-xs border ${
                      isDark
                        ? "bg-slate-800/80 border-slate-700 text-slate-200"
                        : "bg-slate-50 border-slate-200 text-slate-800 font-semibold shadow-sm"
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center font-bold text-[10px]">
                      #{idx + 1}
                    </span>
                    <span className="font-semibold">{k}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Action Navigation */}
          <div className={`mt-4 pt-3 border-t flex items-center justify-between gap-2 ${isDark ? "border-slate-800" : "border-slate-200"}`}>
            <button
              onClick={() => onNavigate("monitoring")}
              className={`flex-1 text-xs font-bold py-2 px-3 rounded-lg text-center transition-colors border ${
                isDark
                  ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300 shadow-sm"
              }`}
            >
              Monitor Real-time
            </button>
            <button
              onClick={() => onNavigate("pelaporan")}
              className="flex-1 bg-red-700 hover:bg-red-800 text-white text-xs font-bold py-2 px-3 rounded-lg text-center transition-colors shadow-md border border-red-800"
            >
              Cetak Laporan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
