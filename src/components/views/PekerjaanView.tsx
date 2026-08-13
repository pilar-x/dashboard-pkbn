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
}

export const PekerjaanView: React.FC<PekerjaanViewProps> = ({
  programs,
  institutions,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"instansi" | "program" | "sertifikasi">("instansi");
  const [filterType, setFilterType] = useState<string>("Semua");

  const jobInstitutions = institutions.filter(
    (i) => i.category === "Instansi Pemerintah" || i.category === "BUMN" || i.category === "Swasta"
  );

  const jobPrograms = programs.filter((p) => p.sector === "Pekerjaan");

  return (
    <div className="space-y-6">
      {/* Sector Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 flex items-center justify-center shrink-0 shadow-lg">
              <Briefcase className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/60">
                Bidang Lingkup 2
              </span>
              <h2 className="text-xl font-bold text-white font-serif tracking-tight mt-1">
                Pembinaan Kesadaran Bela Negara di Lingkungan Pekerjaan
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Mencakup Kementerian/Lembaga, Pemerintah Daerah, BUMN, Swasta, dan Organisasi Profesi.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="bg-slate-800/90 border border-slate-700/80 px-3 py-2 rounded-xl text-center">
              <div className="text-slate-400 text-[10px]">Total Instansi Terdaftar</div>
              <div className="font-bold text-emerald-400 text-base">845 Instansi/BUMN</div>
            </div>
            <div className="bg-slate-800/90 border border-slate-700/80 px-3 py-2 rounded-xl text-center">
              <div className="text-slate-400 text-[10px]">Kader ASN/Karyawan</div>
              <div className="font-bold text-yellow-400 text-base">985,200 Peserta</div>
            </div>
          </div>
        </div>

        {/* Sub-navigation Tabs */}
        <div className="flex items-center space-x-2 border-t border-slate-800 pt-4 mt-5 text-xs font-medium text-slate-400">
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
                  ? "bg-emerald-600 text-white font-semibold shadow-md"
                  : "bg-slate-800/80 text-slate-400 hover:text-slate-200"
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
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-serif">Data Instansi Pemerintah, BUMN & Swasta</h3>
              <div className="flex items-center space-x-2">
                {["Semua", "Instansi Pemerintah", "BUMN"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilterType(t)}
                    className={`text-xs px-2.5 py-1 rounded-lg transition-colors ${
                      filterType === t
                        ? "bg-emerald-600 text-white font-semibold"
                        : "bg-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-800/90 text-slate-400 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-3">Nama Instansi / Badan</th>
                    <th className="p-3">Kategori</th>
                    <th className="p-3">Provinsi</th>
                    <th className="p-3">Jumlah Kader Terbina</th>
                    <th className="p-3 text-right">Status Monitoring</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {jobInstitutions
                    .filter((i) => filterType === "Semua" || i.category === filterType)
                    .map((inst) => (
                      <tr key={inst.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-3 font-semibold text-white">{inst.name}</td>
                        <td className="p-3">
                          <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2 py-0.5 rounded font-mono">
                            {inst.category}
                          </span>
                        </td>
                        <td className="p-3">{inst.province}</td>
                        <td className="p-3 font-bold text-yellow-400">{inst.cadreCount.toLocaleString("id-ID")} Orang</td>
                        <td className="p-3 text-right">
                          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-semibold px-2 py-0.5 rounded-full">
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
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white font-serif">Monitoring & Indikator Kinerja</h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-slate-400">Persentase CPNS/PNS Mengikuti PKBN</div>
                  <div className="text-xl font-bold text-emerald-400 mt-1">94.8%</div>
                  <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[94.8%]"></div>
                  </div>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-slate-400">Target Pelaksanaan BUMN Group 2026</div>
                  <div className="text-xl font-bold text-yellow-400 mt-1">88.2%</div>
                  <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-yellow-500 h-full w-[88.2%]"></div>
                  </div>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-slate-400">Rata-rata Skor Evaluasi Pasca-Diklat</div>
                  <div className="text-xl font-bold text-blue-400 mt-1">93.5 / 100</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <button
                onClick={() => window.print()}
                className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs py-2.5 rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2"
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
          <h3 className="text-base font-bold text-white font-serif">Program Pelatihan & Diklat ASN, BUMN, dan Pekerja Swasta</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobPrograms.map((p) => (
              <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                    {p.subCategory}
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {p.status}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">{p.title}</h4>
                <p className="text-xs text-slate-400">{p.description}</p>
                <div className="bg-slate-800/80 p-2.5 rounded-xl text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Penyelenggara:</span>
                    <span className="font-semibold text-slate-200">{p.organizer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Peserta Terdaftar:</span>
                    <span className="font-bold text-yellow-400">{p.participantCount} / {p.targetCount} ASN/Karyawan</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Sertifikasi Cadangan Pendukung */}
      {activeSubTab === "sertifikasi" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white font-serif">Sertifikasi & Pemetaan Komponen Pendukung (Komduk) Pertahanan</h3>
          <p className="text-xs text-slate-400">Pencatatan keahlian khusus pekerja (sumber daya manusia, sarana prasarana, dan teknologi) yang dapat didayagunakan.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-xl space-y-2">
              <div className="text-amber-400 font-bold">Bidang Komunikasi & Siber</div>
              <div className="text-2xl font-black text-white font-mono">14,250 Personel</div>
              <p className="text-slate-400 text-[11px]">Tenaga ahli IT BUMN, Operator Telko, & Cyber Security Instansi.</p>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-xl space-y-2">
              <div className="text-emerald-400 font-bold">Bidang Logistik & Transportasi</div>
              <div className="text-2xl font-black text-white font-mono">28,900 Personel</div>
              <p className="text-slate-400 text-[11px]">Pengemudi armada BUMN logistik, operator alat berat, & navigasi.</p>
            </div>
            <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-xl space-y-2">
              <div className="text-blue-400 font-bold">Bidang Kesehatan & Medis</div>
              <div className="text-2xl font-black text-white font-mono">18,400 Personel</div>
              <p className="text-slate-400 text-[11px]">Nakes RSUD, PMI, Tenaga Medis BUMN, dan Tim Tanggap Darurat.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
