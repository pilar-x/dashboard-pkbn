import React, { useState } from "react";
import { ProgramItem, InstitutionItem } from "../../types";
import {
  Briefcase,
  Building,
  Users,
  Calendar,
  Activity,
  FileText,
  Search,
  CheckCircle2,
  TrendingUp,
  Plus,
} from "lucide-react";

interface PekerjaanViewProps {
  programs: ProgramItem[];
  institutions: InstitutionItem[];
  theme?: "dark" | "light";
  searchQuery?: string;
}

export const PekerjaanView: React.FC<PekerjaanViewProps> = ({
  programs,
  institutions,
  theme = "dark",
  searchQuery = "",
}) => {
  const isDark = theme === "dark";
  const [activeSubTab, setActiveSubTab] = useState<"instansi" | "program" | "sertifikasi">("instansi");
  const [filterType, setFilterType] = useState<string>("Semua");

  const q = searchQuery.trim().toLowerCase();

  const jobInstitutions = institutions.filter(
    (i) =>
      (i.category === "Instansi Pemerintah" || i.category === "BUMN" || i.category === "Swasta") &&
      (!q ||
        i.name.toLowerCase().includes(q) ||
        i.province.toLowerCase().includes(q) ||
        i.contactPerson.toLowerCase().includes(q))
  );

  const jobPrograms = programs.filter(
    (p) =>
      p.sector === "Pekerjaan" &&
      (!q ||
        p.title.toLowerCase().includes(q) ||
        p.organizer.toLowerCase().includes(q) ||
        p.province.toLowerCase().includes(q))
  );

  return (
    <div className="space-y-6">
      {/* Sector Header */}
      <div className={`rounded-2xl p-6 shadow-xl border ${
        isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 flex items-center justify-center shrink-0 shadow-lg">
              <Briefcase className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/60">
                Bidang Lingkup 2
              </span>
              <h2 className={`text-xl font-bold font-serif tracking-tight mt-1 ${isDark ? "text-white" : "text-slate-900"}`}>
                Pembinaan Kesadaran Bela Negara di Lingkungan Pekerjaan
              </h2>
              <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-600 font-medium"}`}>
                Mencakup Kementerian/Lembaga, Pemerintah Daerah, BUMN, Swasta, dan Organisasi Profesi.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className={`px-3 py-2 rounded-xl text-center border ${
              isDark ? "bg-slate-800/90 border-slate-700/80" : "bg-slate-100 border-slate-200 shadow-sm"
            }`}>
              <div className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-600 font-semibold"}`}>Total Instansi Terdaftar</div>
              <div className="font-bold text-emerald-600 dark:text-emerald-400 text-base">845 Instansi/BUMN</div>
            </div>
            <div className={`px-3 py-2 rounded-xl text-center border ${
              isDark ? "bg-slate-800/90 border-slate-700/80" : "bg-slate-100 border-slate-200 shadow-sm"
            }`}>
              <div className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-600 font-semibold"}`}>Kader ASN/Karyawan</div>
              <div className="font-bold text-amber-700 dark:text-yellow-400 text-base">985,200 Peserta</div>
            </div>
          </div>
        </div>

        {/* Sub-navigation Tabs */}
        <div className={`flex items-center space-x-2 border-t pt-4 mt-5 text-xs font-medium overflow-x-auto scrollbar-none no-scrollbar ${
          isDark ? "border-slate-800 text-slate-400" : "border-slate-200 text-slate-600"
        }`}>
          {[
            { id: "instansi", label: "Instansi & BUMN", icon: <Building className="w-4 h-4" /> },
            { id: "program", label: "Program Diklat Pekerja", icon: <Briefcase className="w-4 h-4" /> },
            { id: "sertifikasi", label: "Sertifikasi Cadangan Pendukung", icon: <CheckCircle2 className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl transition-all ${
                activeSubTab === tab.id
                  ? "bg-emerald-600 text-white font-bold shadow-md"
                  : isDark
                  ? "bg-slate-800/80 text-slate-400 hover:text-slate-200"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 font-semibold"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Program & Monitoring Overview */}
      {activeSubTab === "instansi" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Instansi List Panel */}
          <div className={`lg:col-span-2 rounded-2xl p-5 shadow-xl space-y-4 border ${
            isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
          }`}>
            <div className={`flex items-center justify-between border-b pb-3 ${isDark ? "border-slate-800" : "border-slate-200"}`}>
              <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>Data Instansi Pemerintah, BUMN & Swasta</h3>
              <div className="flex items-center space-x-2">
                {["Semua", "Instansi Pemerintah", "BUMN"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilterType(t)}
                    className={`text-xs px-2.5 py-1 rounded-lg transition-colors ${
                      filterType === t
                        ? "bg-emerald-600 text-white font-bold"
                        : isDark
                        ? "bg-slate-800 text-slate-400 hover:text-slate-200"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className={`uppercase font-mono text-[10px] ${
                  isDark ? "bg-slate-800/90 text-slate-400" : "bg-slate-100 text-slate-600 font-bold"
                }`}>
                  <tr>
                    <th className="p-3">Nama Instansi / Badan</th>
                    <th className="p-3">Kategori</th>
                    <th className="p-3">Provinsi</th>
                    <th className="p-3">Jumlah Kader Terbina</th>
                    <th className="p-3 text-right">Status Monitoring</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? "divide-slate-800 text-slate-300" : "divide-slate-200 text-slate-700 font-medium"}`}>
                  {jobInstitutions
                    .filter((i) => filterType === "Semua" || i.category === filterType)
                    .map((inst) => (
                      <tr key={inst.id} className={isDark ? "hover:bg-slate-800/50" : "hover:bg-slate-50"}>
                        <td className={`p-3 font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{inst.name}</td>
                        <td className="p-3">
                          <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                            {inst.category}
                          </span>
                        </td>
                        <td className="p-3">{inst.province}</td>
                        <td className="p-3 font-bold text-amber-700 dark:text-yellow-400">{inst.cadreCount.toLocaleString("id-ID")} Orang</td>
                        <td className="p-3 text-right">
                          <span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {inst.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Monitoring & Evaluation Summary Card */}
          <div className={`rounded-2xl p-5 shadow-xl flex flex-col justify-between border ${
            isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
          }`}>
            <div className="space-y-4">
              <div className={`flex items-center space-x-2 border-b pb-2 ${isDark ? "border-slate-800" : "border-slate-200"}`}>
                <Activity className="w-5 h-5 text-emerald-500" />
                <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>Monitoring & Indikator Kinerja</h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className={`p-3 rounded-xl border ${
                  isDark ? "bg-slate-800/80 border-slate-700" : "bg-slate-50 border-slate-200"
                }`}>
                  <div className={isDark ? "text-slate-400" : "text-slate-600 font-semibold"}>Persentase CPNS/PNS Mengikuti PKBN</div>
                  <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">94.8%</div>
                  <div className={`w-full h-1.5 rounded-full mt-2 overflow-hidden ${isDark ? "bg-slate-700" : "bg-slate-200"}`}>
                    <div className="bg-emerald-500 h-full w-[94.8%]"></div>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border ${
                  isDark ? "bg-slate-800/80 border-slate-700" : "bg-slate-50 border-slate-200"
                }`}>
                  <div className={isDark ? "text-slate-400" : "text-slate-600 font-semibold"}>Target Pelaksanaan BUMN Group 2026</div>
                  <div className="text-xl font-bold text-amber-700 dark:text-yellow-400 mt-1">88.2%</div>
                  <div className={`w-full h-1.5 rounded-full mt-2 overflow-hidden ${isDark ? "bg-slate-700" : "bg-slate-200"}`}>
                    <div className="bg-yellow-500 h-full w-[88.2%]"></div>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border ${
                  isDark ? "bg-slate-800/80 border-slate-700" : "bg-slate-50 border-slate-200"
                }`}>
                  <div className={isDark ? "text-slate-400" : "text-slate-600 font-semibold"}>Rata-rata Skor Evaluasi Pasca-Diklat</div>
                  <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-1">93.5 / 100</div>
                </div>
              </div>
            </div>

            <div className={`pt-3 border-t ${isDark ? "border-slate-800" : "border-slate-200"}`}>
              <button
                onClick={() => window.print()}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2 border border-emerald-800"
              >
                <FileText className="w-4 h-4" />
                <span>Cetak Laporan Lingkup Pekerjaan</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Program Diklat Pekerja */}
      {activeSubTab === "program" && (
        <div className="space-y-4">
          <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>Program Pelatihan & Diklat ASN, BUMN, dan Pekerja Swasta</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobPrograms.map((p) => (
              <div key={p.id} className={`rounded-2xl p-5 shadow-lg space-y-3 border ${
                isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
              }`}>
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                    {p.subCategory}
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {p.status}
                  </span>
                </div>
                <h4 className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"}`}>{p.title}</h4>
                <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600 font-medium"}`}>{p.description}</p>
                <div className={`p-2.5 rounded-xl text-xs space-y-1 border ${
                  isDark ? "bg-slate-800/80 border-slate-700 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-800 font-semibold"
                }`}>
                  <div className="flex justify-between">
                    <span className={isDark ? "text-slate-400" : "text-slate-600"}>Penyelenggara:</span>
                    <span className="font-semibold">{p.organizer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? "text-slate-400" : "text-slate-600"}>Peserta Terdaftar:</span>
                    <span className="font-bold text-amber-700 dark:text-yellow-400">{p.participantCount} / {p.targetCount} ASN/Karyawan</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Sertifikasi Cadangan Pendukung */}
      {activeSubTab === "sertifikasi" && (
        <div className={`rounded-2xl p-5 shadow-xl space-y-4 border ${
          isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
        }`}>
          <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>Sertifikasi & Pemetaan Komponen Pendukung (Komduk) Pertahanan</h3>
          <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600 font-medium"}`}>Pencatatan keahlian khusus pekerja (sumber daya manusia, sarana prasarana, dan teknologi) yang dapat didayagunakan.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className={`p-4 rounded-xl space-y-2 border ${
              isDark ? "bg-slate-800/80 border-slate-700/80" : "bg-amber-50/50 border-amber-200 text-slate-800"
            }`}>
              <div className="text-amber-700 dark:text-amber-400 font-bold">Bidang Komunikasi & Siber</div>
              <div className={`text-2xl font-black font-mono ${isDark ? "text-white" : "text-slate-900"}`}>14,250 Personel</div>
              <p className={isDark ? "text-slate-400 text-[11px]" : "text-slate-600 text-[11px] font-medium"}>Tenaga ahli IT BUMN, Operator Telko, & Cyber Security Instansi.</p>
            </div>
            <div className={`p-4 rounded-xl space-y-2 border ${
              isDark ? "bg-slate-800/80 border-slate-700/80" : "bg-emerald-50/50 border-emerald-200 text-slate-800"
            }`}>
              <div className="text-emerald-700 dark:text-emerald-400 font-bold">Bidang Logistik & Transportasi</div>
              <div className={`text-2xl font-black font-mono ${isDark ? "text-white" : "text-slate-900"}`}>28,900 Personel</div>
              <p className={isDark ? "text-slate-400 text-[11px]" : "text-slate-600 text-[11px] font-medium"}>Pengemudi armada BUMN logistik, operator alat berat, & navigasi.</p>
            </div>
            <div className={`p-4 rounded-xl space-y-2 border ${
              isDark ? "bg-slate-800/80 border-slate-700/80" : "bg-blue-50/50 border-blue-200 text-slate-800"
            }`}>
              <div className="text-blue-700 dark:text-blue-400 font-bold">Bidang Kesehatan & Medis</div>
              <div className={`text-2xl font-black font-mono ${isDark ? "text-white" : "text-slate-900"}`}>18,400 Personel</div>
              <p className={isDark ? "text-slate-400 text-[11px]" : "text-slate-600 text-[11px] font-medium"}>Nakes RSUD, PMI, Tenaga Medis BUMN, dan Tim Tanggap Darurat.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
