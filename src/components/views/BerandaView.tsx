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
}) => {
  // Chart Data: Sector breakdown
  const sectorData = [
    { name: "Pendidikan", total: 620, color: "#3b82f6" },
    { name: "Pekerjaan", total: 480, color: "#10b981" },
    { name: "Masyarakat", total: 382, color: "#f59e0b" },
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-950 via-slate-900 to-slate-900 border border-red-900/40 p-6 text-white shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-600/10 via-transparent to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="bg-red-900/80 text-red-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-red-700/60 uppercase tracking-widest">
                REPUBLIK INDONESIA
              </span>
              <span className="text-xs text-slate-400">| UU No. 23 Tahun 2019</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-white">
              Sistem Informasi & Dashboard Pemantauan PKBN Nasional
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Memantau pelaksanaan Pembinaan Kesadaran Bela Negara di 38 Provinsi secara terpadu melalui 3 Lingkup Utama: <strong className="text-yellow-400">Pendidikan</strong>, <strong className="text-emerald-400">Pekerjaan</strong>, dan <strong className="text-blue-400">Masyarakat</strong>.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={onOpenAiAssistant}
              className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center space-x-2 transition-all active:scale-95"
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
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex items-center justify-between hover:border-slate-700 transition-all">
          <div>
            <div className="text-xs font-semibold text-slate-400">Total Program PKBN</div>
            <div className="text-2xl font-black text-white mt-1">
              {kpi.totalProgram.toLocaleString("id-ID")}
            </div>
            <div className="text-[10px] text-emerald-400 font-medium flex items-center space-x-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>+14.2% dari target tahunan</span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-red-950/60 text-red-400 border border-red-800/50 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex items-center justify-between hover:border-slate-700 transition-all">
          <div>
            <div className="text-xs font-semibold text-slate-400">Total Peserta Capaian</div>
            <div className="text-2xl font-black text-yellow-400 mt-1">
              {kpi.totalPeserta.toLocaleString("id-ID")}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              Cadangan & Kader Bela Negara
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-950/60 text-amber-400 border border-amber-800/50 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex items-center justify-between hover:border-slate-700 transition-all">
          <div>
            <div className="text-xs font-semibold text-slate-400">Sekolah & Kampus</div>
            <div className="text-2xl font-black text-blue-400 mt-1">
              {kpi.totalSekolahPT.toLocaleString("id-ID")}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              Satuan Pendidikan Terdaftar
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-950/60 text-blue-400 border border-blue-800/50 flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex items-center justify-between hover:border-slate-700 transition-all">
          <div>
            <div className="text-xs font-semibold text-slate-400">Instansi & Ormas</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              {(kpi.totalInstansi + kpi.totalOrmas).toLocaleString("id-ID")}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              Gov, BUMN, Swasta & Ormas
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Interactive Map Section */}
      <MapDashboardWrapper
        provinces={provinces}
        selectedProvince={selectedProvince}
        onSelectProvince={onSelectProvince}
      />

      {/* Charts & Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Regional Capaian */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white font-serif">
                Grafik Capaian Peserta per Provinsi Teraktif
              </h3>
              <p className="text-xs text-slate-400">Dalam Ribuan Peserta (Ribu Orang)</p>
            </div>
            <button
              onClick={() => onNavigate("analisis")}
              className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center space-x-1"
            >
              <span>Detail Analisis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "0.75rem",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="peserta" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Peserta (Ribu)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Proportion by Sector */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white font-serif">Proporsi 3 Lingkup PKBN</h3>
            <p className="text-xs text-slate-400 mb-4">Jumlah Program Berdasarkan Lingkup</p>

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
                      backgroundColor: "#0f172a",
                      borderColor: "#334155",
                      borderRadius: "0.5rem",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 border-t border-slate-800 pt-3">
            {sectorData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span className="text-slate-300 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-white">{item.total} Program</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Agenda & Top Ranked Regencies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Calendar Events */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5 text-red-500" />
              <h3 className="text-base font-bold text-white font-serif">
                Agenda & Kegiatan Terdekat
              </h3>
            </div>
            <button
              onClick={() => onNavigate("pendidikan")}
              className="text-xs text-red-400 hover:text-red-300 font-semibold"
            >
              Lihat Kalender
            </button>
          </div>

          <div className="space-y-3">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5 flex items-start justify-between gap-3 hover:border-slate-600 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        ev.sector === "Pendidikan"
                          ? "bg-blue-950 text-blue-300 border border-blue-800"
                          : ev.sector === "Pekerjaan"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          : "bg-amber-950 text-amber-300 border border-amber-800"
                      }`}
                    >
                      {ev.sector}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{ev.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-snug">{ev.title}</h4>
                  <div className="text-[11px] text-slate-400 flex items-center space-x-2">
                    <MapPin className="w-3 h-3 text-red-400" />
                    <span>{ev.location} ({ev.province})</span>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block ${
                      ev.status === "Berlangsung"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                        : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                    }`}
                  >
                    {ev.status}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">
                    {ev.registered}/{ev.capacity} Peserta
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Regencies & Quick Actions */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3 border-b border-slate-800 pb-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <h3 className="text-base font-bold text-white font-serif">
                Peringkat Provinsi & Kab/Kota Teraktif
              </h3>
            </div>

            <div className="space-y-2 mb-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                5 Provinsi Teraktif
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {kpi.provinsiTeraktif.slice(0, 4).map((p, idx) => (
                  <div
                    key={p}
                    className="bg-slate-800/80 border border-slate-700 p-2.5 rounded-lg flex items-center space-x-2 text-xs"
                  >
                    <span className="w-5 h-5 rounded-full bg-red-950 text-red-400 border border-red-800 flex items-center justify-center font-bold text-[10px]">
                      #{idx + 1}
                    </span>
                    <span className="font-semibold text-slate-200">{p}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                5 Kabupaten/Kota Teraktif
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {kpi.kabupatenTeraktif.slice(0, 4).map((k, idx) => (
                  <div
                    key={k}
                    className="bg-slate-800/80 border border-slate-700 p-2.5 rounded-lg flex items-center space-x-2 text-xs"
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center font-bold text-[10px]">
                      #{idx + 1}
                    </span>
                    <span className="font-semibold text-slate-200">{k}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Action Navigation */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
            <button
              onClick={() => onNavigate("monitoring")}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2 px-3 rounded-lg text-center transition-colors border border-slate-700"
            >
              Monitor Real-time
            </button>
            <button
              onClick={() => onNavigate("pelaporan")}
              className="flex-1 bg-red-800 hover:bg-red-700 text-white text-xs font-semibold py-2 px-3 rounded-lg text-center transition-colors shadow-md"
            >
              Cetak Laporan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
