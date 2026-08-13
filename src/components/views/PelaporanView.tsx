import React, { useState } from "react";
import { ProgramItem, NationalKPI } from "../../types";
import {
  FileSpreadsheet,
  FileText,
  Download,
  Printer,
  Sparkles,
  Calendar,
  Filter,
  CheckCircle2,
  Share2,
} from "lucide-react";

interface PelaporanViewProps {
  kpi: NationalKPI;
  programs: ProgramItem[];
  theme?: "dark" | "light";
}

export const PelaporanView: React.FC<PelaporanViewProps> = ({
  kpi,
  programs,
  theme = "dark",
}) => {
  const isDark = theme === "dark";
  const [period, setPeriod] = useState<"Harian" | "Mingguan" | "Bulanan" | "Tahunan">("Bulanan");
  const [selectedSector, setSelectedSector] = useState<string>("Semua Lingkup");
  const [reportSummary, setReportSummary] = useState<string>(
    `Laporan Pembinaan Kesadaran Bela Negara (Periode Bulanan - Agustus 2026) mencatat total 1.482 kegiatan yang telah menjangkau 2.850.420 peserta di 38 Provinsi. Pelaksanaan di Lingkup Pendidikan memberikan kontribusi terbesar (43.5%), diikuti Lingkup Pekerjaan (33.8%), dan Lingkup Masyarakat (22.7%).`
  );
  const [isGeneratingSummary, setIsGeneratingSummary] = useState<boolean>(false);

  // Generate Executive Summary via Gemini API
  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    try {
      const res = await fetch("/api/gemini/report-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          period,
          sector: selectedSector,
          totalEvents: kpi.totalProgram,
          totalParticipants: kpi.totalPeserta,
          topProvinces: kpi.provinsiTeraktif,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.summary) {
          setReportSummary(data.summary);
        }
      }
    } catch (err) {
      console.error("Summary generation error:", err);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Pelaporan Header */}
      <div className={`rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border ${
        isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
      }`}>
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg border ${
            isDark ? "bg-red-950/80 text-red-400 border-red-700/60" : "bg-red-50 text-red-600 border-red-200"
          }`}>
            <FileSpreadsheet className="w-7 h-7" />
          </div>
          <div>
            <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded border ${
              isDark ? "text-red-400 bg-red-950/60 border-red-800/60" : "text-red-700 bg-red-50 border-red-200"
            }`}>
              Modul Pelaporan Resmi
            </span>
            <h2 className={`text-xl font-bold font-serif tracking-tight mt-1 ${isDark ? "text-white" : "text-slate-900"}`}>
              Pelaporan Harian, Mingguan, Bulanan & Tahunan
            </h2>
            <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-600 font-medium"}`}>
              Generasi dokumen laporan resmi terstruktur dengan dukungan Format PDF & Excel.
            </p>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.print()}
            className={`text-xs font-semibold px-3.5 py-2 rounded-xl border flex items-center space-x-1.5 transition-colors ${
              isDark ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700" : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300 font-medium"
            }`}
          >
            <Printer className="w-4 h-4" />
            <span>Cetak PDF</span>
          </button>
          <button
            onClick={() => alert("Mengunduh Laporan Excel (XLSX)...")}
            className="bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center space-x-1.5 shadow-md transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor Excel</span>
          </button>
        </div>
      </div>

      {/* Report Filter Bar */}
      <div className={`rounded-2xl p-4 shadow-lg flex flex-wrap items-center justify-between gap-4 text-xs border ${
        isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
      }`}>
        <div className="flex items-center space-x-2">
          <span className={isDark ? "text-slate-400 font-semibold" : "text-slate-600 font-bold"}>Periode Laporan:</span>
          {(["Harian", "Mingguan", "Bulanan", "Tahunan"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                period === p
                  ? "bg-red-700 text-white border-red-600"
                  : isDark
                    ? "bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200"
                    : "bg-slate-100 text-slate-600 border-slate-300 hover:text-slate-900"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className={`p-2 rounded-lg border focus:outline-none ${
              isDark ? "bg-slate-800 text-slate-200 border-slate-700" : "bg-slate-100 text-slate-800 border-slate-300 font-medium"
            }`}
          >
            <option value="Semua Lingkup">Semua Lingkup (Nasional)</option>
            <option value="Pendidikan">Lingkup Pendidikan</option>
            <option value="Pekerjaan">Lingkup Pekerjaan</option>
            <option value="Masyarakat">Lingkup Masyarakat</option>
          </select>

          <button
            onClick={handleGenerateSummary}
            disabled={isGeneratingSummary}
            className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-semibold px-3.5 py-2 rounded-lg shadow flex items-center space-x-1.5 transition-all disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>{isGeneratingSummary ? "Generasi Summary..." : "Summary AI"}</span>
          </button>
        </div>
      </div>

      {/* Official Formal Document Preview */}
      <div className={`rounded-2xl p-8 shadow-2xl space-y-6 max-w-4xl mx-auto border ${
        isDark ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-white border-slate-300 text-slate-800 shadow-xl"
      }`}>
        {/* Official Ministry Letterhead */}
        <div className={`text-center border-b-2 pb-4 space-y-1 ${isDark ? "border-slate-700" : "border-slate-300"}`}>
          <div className={`text-xs font-bold font-serif tracking-widest uppercase ${isDark ? "text-amber-400" : "text-amber-700"}`}>
            KEMENTERIAN PERTAHANAN REPUBLIK INDONESIA
          </div>
          <div className={`text-xs font-serif uppercase ${isDark ? "text-slate-300" : "text-slate-700 font-bold"}`}>
            DIREKTORAT JENDERAL POTENSI PERTAHANAN
          </div>
          <div className={`text-[10px] ${isDark ? "text-slate-500" : "text-slate-500"}`}>
            Jl. Medan Merdeka Barat No. 13-14, Jakarta Pusat 10110
          </div>
          <h3 className={`text-lg font-bold font-serif uppercase tracking-tight pt-2 ${isDark ? "text-white" : "text-slate-900"}`}>
            LAPORAN RESMI PELAKSANAAN PEMBINAAN KESADARAN BELA NEGARA ({period.toUpperCase()})
          </h3>
        </div>

        {/* AI Executive Summary Box */}
        <div className={`p-4 rounded-xl space-y-2 border ${
          isDark ? "bg-slate-900 border-slate-800" : "bg-amber-50/80 border-amber-200"
        }`}>
          <div className={`flex items-center space-x-2 text-xs font-bold uppercase tracking-wider ${
            isDark ? "text-yellow-400" : "text-amber-800"
          }`}>
            <Sparkles className="w-4 h-4" />
            <span>Ringkasan Eksekutif (Executive Summary):</span>
          </div>
          <p className={`text-xs leading-relaxed font-sans italic ${
            isDark ? "text-slate-300" : "text-slate-800 font-medium"
          }`}>{reportSummary}</p>
        </div>

        {/* Consolidated KPI Table */}
        <div className="space-y-2">
          <div className={`text-xs font-bold uppercase tracking-wider font-mono ${
            isDark ? "text-slate-400" : "text-slate-600"
          }`}>
            I. REKAPITULASI CAPAIAN INDIKATOR UTAMA
          </div>
          <table className={`w-full text-left text-xs border ${
            isDark ? "text-slate-300 border-slate-800" : "text-slate-800 border-slate-300"
          }`}>
            <thead className={`uppercase font-mono text-[10px] ${
              isDark ? "bg-slate-900 text-slate-400" : "bg-slate-100 text-slate-700 font-bold"
            }`}>
              <tr>
                <th className={`p-2.5 border ${isDark ? "border-slate-800" : "border-slate-300"}`}>Indikator Kinerja</th>
                <th className={`p-2.5 border ${isDark ? "border-slate-800" : "border-slate-300"}`}>Target Nasional</th>
                <th className={`p-2.5 border ${isDark ? "border-slate-800" : "border-slate-300"}`}>Realisasi Capaian</th>
                <th className={`p-2.5 border text-right ${isDark ? "border-slate-800" : "border-slate-300"}`}>Persentase</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? "divide-slate-800" : "divide-slate-300"}`}>
              <tr>
                <td className={`p-2.5 border font-semibold ${isDark ? "border-slate-800 text-white" : "border-slate-300 text-slate-900"}`}>Total Program PKBN</td>
                <td className={`p-2.5 border ${isDark ? "border-slate-800" : "border-slate-300"}`}>1.500 Program</td>
                <td className={`p-2.5 border font-bold ${isDark ? "border-slate-800 text-yellow-400" : "border-slate-300 text-amber-700"}`}>{kpi.totalProgram} Program</td>
                <td className={`p-2.5 border text-right font-bold ${isDark ? "border-slate-800 text-emerald-400" : "border-slate-300 text-emerald-700"}`}>98.8%</td>
              </tr>
              <tr>
                <td className={`p-2.5 border font-semibold ${isDark ? "border-slate-800 text-white" : "border-slate-300 text-slate-900"}`}>Total Peserta / Kader</td>
                <td className={`p-2.5 border ${isDark ? "border-slate-800" : "border-slate-300"}`}>3.000.000 Orang</td>
                <td className={`p-2.5 border font-bold ${isDark ? "border-slate-800 text-yellow-400" : "border-slate-300 text-amber-700"}`}>{kpi.totalPeserta.toLocaleString("id-ID")} Orang</td>
                <td className={`p-2.5 border text-right font-bold ${isDark ? "border-slate-800 text-emerald-400" : "border-slate-300 text-emerald-700"}`}>{kpi.persentaseCapaian}%</td>
              </tr>
              <tr>
                <td className={`p-2.5 border font-semibold ${isDark ? "border-slate-800 text-white" : "border-slate-300 text-slate-900"}`}>Satuan Pendidikan & Instansi</td>
                <td className={`p-2.5 border ${isDark ? "border-slate-800" : "border-slate-300"}`}>6.000 Unit</td>
                <td className={`p-2.5 border font-bold ${isDark ? "border-slate-800 text-yellow-400" : "border-slate-300 text-amber-700"}`}>{(kpi.totalSekolahPT + kpi.totalInstansi + kpi.totalOrmas).toLocaleString("id-ID")} Unit</td>
                <td className={`p-2.5 border text-right font-bold ${isDark ? "border-slate-800 text-emerald-400" : "border-slate-300 text-emerald-700"}`}>92.4%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Detailed Program List Table */}
        <div className="space-y-2">
          <div className={`text-xs font-bold uppercase tracking-wider font-mono ${
            isDark ? "text-slate-400" : "text-slate-600"
          }`}>
            II. RINCIAN SAMPLE PROGRAM UNGGULAN
          </div>
          <table className={`w-full text-left text-xs border ${
            isDark ? "text-slate-300 border-slate-800" : "text-slate-800 border-slate-300"
          }`}>
            <thead className={`uppercase font-mono text-[10px] ${
              isDark ? "bg-slate-900 text-slate-400" : "bg-slate-100 text-slate-700 font-bold"
            }`}>
              <tr>
                <th className={`p-2.5 border ${isDark ? "border-slate-800" : "border-slate-300"}`}>Nama Kegiatan</th>
                <th className={`p-2.5 border ${isDark ? "border-slate-800" : "border-slate-300"}`}>Lingkup</th>
                <th className={`p-2.5 border ${isDark ? "border-slate-800" : "border-slate-300"}`}>Penyelenggara</th>
                <th className={`p-2.5 border text-right ${isDark ? "border-slate-800" : "border-slate-300"}`}>Capaian Peserta</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? "divide-slate-800" : "divide-slate-300"}`}>
              {programs.slice(0, 5).map((p) => (
                <tr key={p.id}>
                  <td className={`p-2.5 border font-semibold ${isDark ? "border-slate-800 text-white" : "border-slate-300 text-slate-900"}`}>{p.title}</td>
                  <td className={`p-2.5 border ${isDark ? "border-slate-800" : "border-slate-300"}`}>{p.sector}</td>
                  <td className={`p-2.5 border ${isDark ? "border-slate-800" : "border-slate-300"}`}>{p.organizer}</td>
                  <td className={`p-2.5 border text-right font-bold ${isDark ? "border-slate-800 text-yellow-400" : "border-slate-300 text-amber-700"}`}>{p.participantCount} Orang</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Official Signatures Footer */}
        <div className={`flex justify-between items-end pt-8 text-xs ${isDark ? "text-slate-400" : "text-slate-600 font-medium"}`}>
          <div className="text-center">
            <div>Mengetahui,</div>
            <div className={`font-bold pt-12 ${isDark ? "text-white" : "text-slate-900"}`}>Direktur Bela Negara</div>
            <div className={`text-[10px] ${isDark ? "text-slate-500" : "text-slate-500 font-normal"}`}>NIP. 197405122000031002</div>
          </div>
          <div className="text-center">
            <div>Jakarta, 12 Agustus 2026</div>
            <div className={`font-bold pt-12 ${isDark ? "text-white" : "text-slate-900"}`}>Tim Penyusun Laporan PKBN</div>
            <div className={`text-[10px] ${isDark ? "text-slate-500" : "text-slate-500 font-normal"}`}>Sekretariat Ditjen Pothan</div>
          </div>
        </div>
      </div>
    </div>
  );
};
