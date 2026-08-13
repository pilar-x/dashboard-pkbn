import React, { useState } from "react";
import { ProgramItem, InstitutionItem } from "../../types";
import {
  Users,
  Home,
  HeartHandshake,
  ShieldAlert,
  Image as ImageIcon,
  TrendingUp,
  MapPin,
  CheckCircle2,
} from "lucide-react";

interface MasyarakatViewProps {
  programs: ProgramItem[];
  institutions: InstitutionItem[];
  theme?: "dark" | "light";
  searchQuery?: string;
}

export const MasyarakatView: React.FC<MasyarakatViewProps> = ({
  programs,
  institutions,
  theme = "dark",
  searchQuery = "",
}) => {
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState<"ormas" | "kampung" | "relawan">("kampung");

  const q = searchQuery.trim().toLowerCase();

  const communityPrograms = programs.filter(
    (p) =>
      p.sector === "Masyarakat" &&
      (!q ||
        p.title.toLowerCase().includes(q) ||
        p.organizer.toLowerCase().includes(q) ||
        p.province.toLowerCase().includes(q))
  );

  const ormasList = institutions.filter(
    (i) =>
      i.category === "Ormas/Komunitas" &&
      (!q ||
        i.name.toLowerCase().includes(q) ||
        i.province.toLowerCase().includes(q) ||
        i.regency.toLowerCase().includes(q) ||
        i.contactPerson.toLowerCase().includes(q))
  );

  const kampungList = [
    {
      id: "KBN-01",
      name: "Kampung Bela Negara Sambas (Perbatasan)",
      province: "Kalimantan Barat",
      regency: "Kab. Sambas",
      status: "Perbatasan NKRI",
      volunteers: 420,
      focus: "Ketahanan Pangan, Kedaulatan Wilayah, & Pos Ronda Mandiri",
    },
    {
      id: "KBN-02",
      name: "Kampung Bela Negara Belu NTT",
      province: "Nusa Tenggara Timur",
      regency: "Kab. Belu",
      status: "Perbatasan Timor Leste",
      volunteers: 380,
      focus: "Pemberdayaan Ekonomi Lokal & Literasi Kebangsaan",
    },
    {
      id: "KBN-03",
      name: "Kampung Bela Negara Keerom Papua",
      province: "Papua",
      regency: "Kab. Keerom",
      status: "Perbatasan PNG",
      volunteers: 510,
      focus: "Pembinaan Pemuda, Olahraga Tradisional, & Mitigasi Kebakaran",
    },
  ].filter(
    (k) =>
      !q ||
      k.name.toLowerCase().includes(q) ||
      k.province.toLowerCase().includes(q) ||
      k.regency.toLowerCase().includes(q) ||
      k.focus.toLowerCase().includes(q)
  );

  return (
    <div className="space-y-6">
      {/* Sector Header Banner */}
      <div className={`rounded-2xl p-6 shadow-xl border ${
        isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-700/60 text-amber-400 flex items-center justify-center shrink-0 shadow-lg">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider text-amber-400 uppercase bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-800/60">
                Bidang Lingkup 3
              </span>
              <h2 className={`text-xl font-bold font-serif tracking-tight mt-1 ${isDark ? "text-white" : "text-slate-900"}`}>
                Pembinaan Kesadaran Bela Negara di Lingkungan Masyarakat
              </h2>
              <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-600 font-medium"}`}>
                Organisasi Kemasyarakatan, OKP, Relawan, Komunitas Pemuda, dan Program Khusus Kampung Bela Negara.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className={`px-3 py-2 rounded-xl text-center border ${
              isDark ? "bg-slate-800/90 border-slate-700/80" : "bg-slate-100 border-slate-200 shadow-sm"
            }`}>
              <div className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-600 font-semibold"}`}>Kampung Bela Negara</div>
              <div className="font-bold text-amber-700 dark:text-amber-400 text-base">142 Desa Perbatasan</div>
            </div>
            <div className={`px-3 py-2 rounded-xl text-center border ${
              isDark ? "bg-slate-800/90 border-slate-700/80" : "bg-slate-100 border-slate-200 shadow-sm"
            }`}>
              <div className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-600 font-semibold"}`}>Total Relawan PKBN</div>
              <div className="font-bold text-emerald-600 dark:text-emerald-400 text-base">624,720 Relawan</div>
            </div>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className={`flex items-center space-x-2 border-t pt-4 mt-5 text-xs font-medium overflow-x-auto scrollbar-none no-scrollbar ${
          isDark ? "border-slate-800 text-slate-400" : "border-slate-200 text-slate-600"
        }`}>
          {[
            { id: "kampung", label: "Kampung Bela Negara", icon: <Home className="w-4 h-4" /> },
            { id: "ormas", label: "Data Organisasi & Komunitas", icon: <Users className="w-4 h-4" /> },
            { id: "relawan", label: "Program Relawan & Dampak", icon: <HeartHandshake className="w-4 h-4" /> },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl transition-all ${
                activeTab === t.id
                  ? "bg-amber-600 text-white font-bold shadow-md"
                  : isDark
                  ? "bg-slate-800/80 text-slate-400 hover:text-slate-200"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 font-semibold"
              }`}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Kampung Bela Negara */}
      {activeTab === "kampung" && (
        <div className="space-y-4">
          <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>Program Unggulan Kampung Bela Negara Perbatasan NKRI</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {kampungList.map((k) => (
              <div key={k.id} className={`rounded-2xl p-5 shadow-lg space-y-3 border transition-all ${
                isDark ? "bg-slate-900 border-slate-800 hover:border-slate-700 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
              }`}>
                <div className="flex items-center justify-between">
                  <span className="bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    {k.status}
                  </span>
                  <div className={`flex items-center space-x-1 text-[11px] ${isDark ? "text-slate-400" : "text-slate-600 font-semibold"}`}>
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    <span>{k.province}</span>
                  </div>
                </div>

                <h4 className={`text-sm font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>{k.name}</h4>
                <p className={`text-xs leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600 font-medium"}`}>{k.focus}</p>

                <div className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                  isDark ? "bg-slate-800/80 border-slate-700/80" : "bg-slate-50 border-slate-200"
                }`}>
                  <span className={isDark ? "text-slate-400" : "text-slate-600 font-semibold"}>Total Relawan Aktif:</span>
                  <span className="font-bold text-amber-700 dark:text-yellow-400">{k.volunteers} Kader</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Ormas */}
      {activeTab === "ormas" && (
        <div className={`rounded-2xl p-5 shadow-xl space-y-4 border ${
          isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
        }`}>
          <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>Organisasi Kemasyarakatan & Pemuda Terdaftar</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className={`uppercase font-mono text-[10px] ${
                isDark ? "bg-slate-800/90 text-slate-400" : "bg-slate-100 text-slate-600 font-bold"
              }`}>
                <tr>
                  <th className="p-3">Nama Ormas / Komunitas</th>
                  <th className="p-3">Lokasi / Wilayah</th>
                  <th className="p-3">Kader Terbina</th>
                  <th className="p-3">Penanggung Jawab</th>
                  <th className="p-3 text-right">Status Kemitraan</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-slate-800 text-slate-300" : "divide-slate-200 text-slate-700 font-medium"}`}>
                {ormasList.map((orm) => (
                  <tr key={orm.id} className={isDark ? "hover:bg-slate-800/50" : "hover:bg-slate-50"}>
                    <td className={`p-3 font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{orm.name}</td>
                    <td className="p-3">{orm.regency}, {orm.province}</td>
                    <td className="p-3 font-bold text-amber-700 dark:text-amber-400">{orm.cadreCount.toLocaleString("id-ID")} Kader</td>
                    <td className="p-3">{orm.contactPerson}</td>
                    <td className="p-3 text-right">
                      <span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        {orm.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Relawan & Dampak Sosial */}
      {activeTab === "relawan" && (
        <div className="space-y-6">
          {/* Relawan Header Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`rounded-2xl p-4 flex items-center space-x-3 border ${
              isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-md"
            }`}>
              <div className="w-10 h-10 rounded-xl bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <div className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600 font-semibold"}`}>Total Relawan Aktif</div>
                <div className="text-xl font-bold text-amber-700 dark:text-amber-400 font-mono">624,720 Orang</div>
              </div>
            </div>

            <div className={`rounded-2xl p-4 flex items-center space-x-3 border ${
              isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-md"
            }`}>
              <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600 font-semibold"}`}>Program Bakti Sosial 2026</div>
                <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">3,410 Keg. Selesai</div>
              </div>
            </div>

            <div className={`rounded-2xl p-4 flex items-center space-x-3 border ${
              isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-md"
            }`}>
              <div className="w-10 h-10 rounded-xl bg-blue-950 text-blue-400 border border-blue-800 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600 font-semibold"}`}>Jam Kontribusi Komunitas</div>
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400 font-mono">1.85 Juta Jam</div>
              </div>
            </div>
          </div>

          {/* Relawan Kegiatan List */}
          <div className={`rounded-2xl p-5 shadow-xl space-y-4 border ${
            isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
          }`}>
            <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>Aktivitas Relawan & Program Dampak Sosial Khusus</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Bakti Sosial & Renovasi Rumah Layak Huni", loc: "Kab. Sambas, Kalbar", date: "10-12 Agu 2026", vol: "150 Relawan", desc: "Pembangunan 25 unit rumah warga kurang mampu di perbatasan Kalimantan Barat." },
                { title: "Mitigasi Karhutla & Penanaman 10.000 Pohon", loc: "Kab. Bengkalis, Riau", date: "05-08 Agu 2026", vol: "320 Relawan", desc: "Pencegahan kebakaran hutan dan lahan bersama Relawan Pemuda Karang Taruna." },
                { title: "Pengajaran Literasi Kebangsaan Pesisir", loc: "Kepulauan Natuna, Kepri", date: "01-04 Agu 2026", vol: "85 Relawan", desc: "Pendampingan belajar dan wawasan kebangsaan untuk anak-anak nelayan perbatasan." },
                { title: "Pos Ronda Mandiri & Posko Ketahanan Pangan", loc: "Kab. Belu, NTT", date: "Jul - Agu 2026", vol: "210 Relawan", desc: "Penguatan keandalan pos kamling desa dan lumbung pangan lokal di kawasan batas negara." },
              ].map((act, i) => (
                <div key={i} className={`rounded-xl p-4 space-y-2 border transition-all ${
                  isDark
                    ? "bg-slate-800/80 border-slate-700/80 hover:border-slate-600 text-white"
                    : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800 shadow-sm"
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-amber-700 dark:text-amber-400 font-mono font-bold">{act.loc}</span>
                    <span className={`font-mono text-[11px] ${isDark ? "text-slate-400" : "text-slate-600 font-semibold"}`}>{act.date}</span>
                  </div>
                  <h4 className={`font-bold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>{act.title}</h4>
                  <p className={`text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600 font-medium"}`}>{act.desc}</p>
                  <div className={`text-xs font-bold pt-1 border-t ${
                    isDark ? "text-emerald-400 border-slate-700/80" : "text-emerald-700 border-slate-200"
                  }`}>
                    Keterlibatan: {act.vol}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
