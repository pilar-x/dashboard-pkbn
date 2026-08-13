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
}

export const PelaporanView: React.FC<PelaporanViewProps> = ({
  kpi,
  programs,
}) => {
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
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-red-950/80 text-red-400 border border-red-700/60 flex items-center justify-center shrink-0 shadow-lg">
            <FileSpreadsheet className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-wider text-red-400 uppercase bg-red-950/60 px-2.5 py-0.5 rounded border border-red-800/60">
              Modul Pelaporan Resmi
            </span>
            <h2 className="text-xl font-bold text-white font-serif tracking-tight mt-1">
              Pelaporan Harian, Mingguan, Bulanan & Tahunan
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Generasi dokumen laporan resmi terstruktur dengan dukungan Format PDF & Excel.
            </p>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.print()}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3.5 py-2 rounded-xl border border-slate-700 flex items-center space-x-1.5 transition-colors"
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
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-2">
          <span className="text-slate-400 font-semibold">Periode Laporan:</span>
          {(["Harian", "Mingguan", "Bulanan", "Tahunan"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                period === p
                  ? "bg-red-700 text-white border-red-600"
                  : "bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200"
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
            className="bg-slate-800 text-slate-200 p-2 rounded-lg border border-slate-700 focus:outline-none"
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
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6 max-w-4xl mx-auto text-slate-200">
        {/* Official Ministry Letterhead */}
        <div className="text-center border-b-2 border-slate-700 pb-4 space-y-1">
          <div className="text-xs font-bold font-serif tracking-widest text-amber-400 uppercase">
            KEMENTERIAN PERTAHANAN REPUBLIK INDONESIA
          </div>
          <div className="text-xs font-serif text-slate-300 uppercase">
            DIREKTORAT JENDERAL POTENSI PERTAHANAN
          </div>
          <div className="text-[10px] text-slate-500">
            Jl. Medan Merdeka Barat No. 13-14, Jakarta Pusat 10110
          </div>
          <h3 className="text-lg font-bold text-white font-serif uppercase tracking-tight pt-2">
            LAPORAN RESMI PELAKSANAAN PEMBINAAN KESADARAN BELA NEGARA ({period.toUpperCase()})
          </h3>
        </div>

        {/* AI Executive Summary Box */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
          <div className="flex items-center space-x-2 text-yellow-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Ringkasan Eksekutif (Executive Summary):</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans italic">{reportSummary}</p>
        </div>

        {/* Consolidated KPI Table */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
            I. REKAPITULASI CAPAIAN INDIKATOR UTAMA
          </div>
          <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
            <thead className="bg-slate-900 text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-2.5 border border-slate-800">Indikator Kinerja</th>
                <th className="p-2.5 border border-slate-800">Target Nasional</th>
                <th className="p-2.5 border border-slate-800">Realisasi Capaian</th>
                <th className="p-2.5 border border-slate-800 text-right">Persentase</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr>
                <td className="p-2.5 border border-slate-800 font-semibold text-white">Total Program PKBN</td>
                <td className="p-2.5 border border-slate-800">1.500 Program</td>
                <td className="p-2.5 border border-slate-800 text-yellow-400 font-bold">{kpi.totalProgram} Program</td>
                <td className="p-2.5 border border-slate-800 text-right font-bold text-emerald-400">98.8%</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-slate-800 font-semibold text-white">Total Peserta / Kader</td>
                <td className="p-2.5 border border-slate-800">3.000.000 Orang</td>
                <td className="p-2.5 border border-slate-800 text-yellow-400 font-bold">{kpi.totalPeserta.toLocaleString("id-ID")} Orang</td>
                <td className="p-2.5 border border-slate-800 text-right font-bold text-emerald-400">{kpi.persentaseCapaian}%</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-slate-800 font-semibold text-white">Satuan Pendidikan & Instansi</td>
                <td className="p-2.5 border border-slate-800">6.000 Unit</td>
                <td className="p-2.5 border border-slate-800 text-yellow-400 font-bold">{(kpi.totalSekolahPT + kpi.totalInstansi + kpi.totalOrmas).toLocaleString("id-ID")} Unit</td>
                <td className="p-2.5 border border-slate-800 text-right font-bold text-emerald-400">92.4%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Detailed Program List Table */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
            II. RINCIAN SAMPLE PROGRAM UNGGULAN
          </div>
          <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
            <thead className="bg-slate-900 text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-2.5 border border-slate-800">Nama Kegiatan</th>
                <th className="p-2.5 border border-slate-800">Lingkup</th>
                <th className="p-2.5 border border-slate-800">Penyelenggara</th>
                <th className="p-2.5 border border-slate-800 text-right">Capaian Peserta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {programs.slice(0, 5).map((p) => (
                <tr key={p.id}>
                  <td className="p-2.5 border border-slate-800 font-semibold text-white">{p.title}</td>
                  <td className="p-2.5 border border-slate-800">{p.sector}</td>
                  <td className="p-2.5 border border-slate-800">{p.organizer}</td>
                  <td className="p-2.5 border border-slate-800 text-right font-bold text-yellow-400">{p.participantCount} Orang</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Official Signatures Footer */}
        <div className="flex justify-between items-end pt-8 text-xs text-slate-400">
          <div className="text-center">
            <div>Mengetahui,</div>
            <div className="font-bold text-white pt-12">Direktur Bela Negara</div>
            <div className="text-[10px] text-slate-500">NIP. 197405122000031002</div>
          </div>
          <div className="text-center">
            <div>Jakarta, 12 Agustus 2026</div>
            <div className="font-bold text-white pt-12">Tim Penyusun Laporan PKBN</div>
            <div className="text-[10px] text-slate-500">Sekretariat Ditjen Pothan</div>
          </div>
        </div>
      </div>
    </div>
  );
};
