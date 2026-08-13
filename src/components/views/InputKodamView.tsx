import React, { useState } from "react";
import { ProgramItem, SectorType, ProgramStatus } from "../../types";
import { KartikaEkaPaksiLogo } from "../KartikaEkaPaksiLogo";
import {
  Shield,
  FileEdit,
  Send,
  CheckCircle2,
  Clock,
  Layers,
  UploadCloud,
  Building2,
  MapPin,
  Users,
  Calendar,
  Sparkles,
  Search,
  Filter,
  Check,
  PlusCircle,
  FileText,
  Trash2,
  RefreshCw,
  Award,
} from "lucide-react";

interface InputKodamViewProps {
  programs: ProgramItem[];
  onAddProgram: (newProg: ProgramItem) => void;
  onDeleteProgram?: (id: string) => void;
  theme?: "dark" | "light";
  searchQuery?: string;
}

export const listKodam = [
  { id: "kodam-3", name: "Kodam III/Siliwangi", province: "Jawa Barat", capital: "Bandung" },
  { id: "kodam-5", name: "Kodam V/Brawijaya", province: "Jawa Timur", capital: "Surabaya" },
  { id: "kodam-jaya", name: "Kodam Jaya / Jayakarta", province: "DKI Jakarta", capital: "Jakarta" },
  { id: "kodam-4", name: "Kodam IV/Diponegoro", province: "Jawa Tengah", capital: "Semarang" },
  { id: "kodam-20", name: "Kodam XX/TIB", province: "Sumatera Barat", capital: "Padang" },
  { id: "kodam-1", name: "Kodam I/Bukit Barisan", province: "Sumatera Utara", capital: "Medan" },
  { id: "kodam-2", name: "Kodam II/Sriwijaya", province: "Sumatera Selatan", capital: "Palembang" },
  { id: "kodam-6", name: "Kodam VI/Mulawarman", province: "Kalimantan Timur", capital: "Balikpapan" },
  { id: "kodam-9", name: "Kodam IX/Udayana", province: "Bali & Nusa Tenggara", capital: "Denpasar" },
  { id: "kodam-12", name: "Kodam XII/Tanjungpura", province: "Kalimantan Barat", capital: "Pontianak" },
  { id: "kodam-13", name: "Kodam XIII/Merdeka", province: "Sulawesi Utara", capital: "Manado" },
  { id: "kodam-14", name: "Kodam XIV/Hasanuddin", province: "Sulawesi Selatan", capital: "Makassar" },
  { id: "kodam-16", name: "Kodam XVI/Pattimura", province: "Maluku", capital: "Ambon" },
  { id: "kodam-17", name: "Kodam XVII/Cenderawasih", province: "Papua", capital: "Jayapura" },
  { id: "kodam-18", name: "Kodam XVIII/Kasuari", province: "Papua Barat", capital: "Manokwari" },
  { id: "kodam-im", name: "Kodam Iskandar Muda", province: "Aceh", capital: "Banda Aceh" },
];

export const InputKodamView: React.FC<InputKodamViewProps> = ({
  programs,
  onAddProgram,
  onDeleteProgram,
  theme = "dark",
  searchQuery: externalSearchQuery = "",
}) => {
  const isDark = theme === "dark";

  // Selected Kodam state
  const [selectedKodamId, setSelectedKodamId] = useState<string>("kodam-3");
  const selectedKodam = listKodam.find((k) => k.id === selectedKodamId) || listKodam[0];

  // Active sub tab (Form Input vs List Laporan)
  const [activeSubTab, setActiveSubTab] = useState<"form" | "list">("form");

  // Form State
  const [programType, setProgramType] = useState<"Program Rutin" | "Non-Program / Inisiatif">("Program Rutin");
  const [sector, setSector] = useState<SectorType>("Pendidikan");
  const [title, setTitle] = useState("");
  const [subCategory, setSubCategory] = useState("Sekolah / Perguruan Tinggi");
  const [organizerUnit, setOrganizerUnit] = useState("Sterdam / Ster Korem");
  const [regency, setRegency] = useState("Kota Bandung");
  const [startDate, setStartDate] = useState("2026-08-15");
  const [endDate, setEndDate] = useState("2026-08-17");
  const [participantCount, setParticipantCount] = useState<number>(250);
  const [targetCount, setTargetCount] = useState<number>(300);
  const [instructorName, setInstructorName] = useState("Mayor Inf Suryanto");
  const [description, setDescription] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Success Feedback
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Filter for Kodam's submitted list
  const [listFilterType, setListFilterType] = useState<"semua" | "Program Rutin" | "Non-Program / Inisiatif">("semua");
  const [searchQuery, setSearchQuery] = useState("");

  const activeQuery = (externalSearchQuery || searchQuery).trim().toLowerCase();

  // Get programs for currently selected Kodam
  const kodamPrograms = programs.filter(
    (p) =>
      p.province.toLowerCase().includes(selectedKodam.province.toLowerCase()) ||
      p.organizer.toLowerCase().includes(selectedKodam.name.toLowerCase()) ||
      p.kodamOrigin === selectedKodam.name
  );

  const filteredList = kodamPrograms.filter((p) => {
    const matchesType =
      listFilterType === "semua" || (p.programType || "Program Rutin") === listFilterType;
    const matchesSearch =
      !activeQuery ||
      p.title.toLowerCase().includes(activeQuery) ||
      p.regency.toLowerCase().includes(activeQuery) ||
      p.organizer.toLowerCase().includes(activeQuery);
    return matchesType && matchesSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newProg: ProgramItem = {
      id: `prog-kodam-${Date.now()}`,
      code: `KDM-${Math.floor(1000 + Math.random() * 9000)}`,
      title: title.trim(),
      sector,
      subCategory: subCategory || "Pembinaan Kewilayahan",
      organizer: `${selectedKodam.name} (${organizerUnit})`,
      province: selectedKodam.province,
      regency: regency || selectedKodam.capital,
      startDate,
      endDate,
      status: "Berlangsung" as ProgramStatus,
      participantCount: Number(participantCount),
      targetCount: Number(targetCount),
      instructorName: instructorName || "Tim Pembina Kodam",
      evaluationScore: 88,
      documentationCount: uploadedFileName ? 3 : 1,
      hasCertificate: true,
      description: description || `Kegiatan PKBN ${programType} diselenggarakan oleh ${selectedKodam.name}.`,
      programType,
      kodamOrigin: selectedKodam.name,
    };

    onAddProgram(newProg);

    // Show Notification Toast
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);

    // Reset Form
    setTitle("");
    setDescription("");
    setUploadedFileName(null);
    setActiveSubTab("list");
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Toast Notification */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 border-2 border-emerald-500 text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center space-x-3 animate-bounce">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <div className="font-bold text-sm">Data Berhasil Terintegrasi!</div>
            <p className="text-xs text-emerald-200">
              Laporan {programType} dari {selectedKodam.name} telah masuk ke Dashboard Pusat SPABAN IV/PKBN.
            </p>
          </div>
        </div>
      )}

      {/* Top Banner & Kodam Selector */}
      <div className={`p-5 rounded-2xl border transition-all ${
        isDark
          ? "bg-slate-900/90 border-slate-800 text-white shadow-xl shadow-slate-950/50"
          : "bg-white border-slate-200 text-slate-800 shadow-md"
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <KartikaEkaPaksiLogo className="w-10 h-12 shrink-0 filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-red-800 text-yellow-300 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  PORTAL INPUT KODAM
                </span>
                <span className="bg-emerald-950 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-800 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>TERINTEGRASI KE SPABAN IV/PKBN</span>
                </span>
              </div>
              <h2 className="text-xl font-bold font-serif tracking-tight mt-1">
                Input Data & Laporan Pembinaan Kesadaran Bela Negara
              </h2>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"} mt-0.5`}>
                Sistem entri data terpadu untuk jajaran Komando Daerah Militer (Kodam) se-Indonesia.
              </p>
            </div>
          </div>

          {/* Kodam Switcher Select */}
          <div className={`flex items-center space-x-2 p-2 rounded-xl border ${
            isDark ? "bg-slate-800/80 border-slate-700/80" : "bg-slate-100 border-slate-300 shadow-sm"
          }`}>
            <Building2 className="w-4 h-4 text-amber-500 shrink-0 ml-1" />
            <span className={`text-xs font-semibold whitespace-nowrap hidden sm:inline ${
              isDark ? "text-slate-300" : "text-slate-700 font-bold"
            }`}>
              Login Sebagai:
            </span>
            <select
              value={selectedKodamId}
              onChange={(e) => setSelectedKodamId(e.target.value)}
              className={`text-xs font-bold font-mono px-3 py-1.5 rounded-lg border focus:outline-none focus:border-red-500 cursor-pointer ${
                isDark
                  ? "bg-slate-900 text-yellow-400 border-slate-700"
                  : "bg-white text-slate-900 border-slate-300 shadow-sm"
              }`}
            >
              {listKodam.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.name} ({k.province})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Kodam Quick Stats Summary */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 mt-5 pt-4 border-t text-xs ${
          isDark ? "border-slate-800/80" : "border-slate-200"
        }`}>
          <div className={`p-3 rounded-xl border ${
            isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200 shadow-sm"
          }`}>
            <span className={`text-[11px] block ${isDark ? "text-slate-400" : "text-slate-600 font-semibold"}`}>Kodam Terpilih</span>
            <span className={`font-bold font-serif text-sm ${isDark ? "text-slate-100" : "text-slate-900"}`}>{selectedKodam.name}</span>
          </div>
          <div className={`p-3 rounded-xl border ${
            isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200 shadow-sm"
          }`}>
            <span className={`text-[11px] block ${isDark ? "text-slate-400" : "text-slate-600 font-semibold"}`}>Wilayah / Ibu Kota</span>
            <span className="font-bold text-amber-600 dark:text-amber-400 font-mono text-xs">{selectedKodam.province} ({selectedKodam.capital})</span>
          </div>
          <div className={`p-3 rounded-xl border ${
            isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200 shadow-sm"
          }`}>
            <span className={`text-[11px] block ${isDark ? "text-slate-400" : "text-slate-600 font-semibold"}`}>Total Terinput</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono text-sm">{kodamPrograms.length} Kegiatan</span>
          </div>
          <div className={`p-3 rounded-xl border ${
            isDark ? "bg-slate-950/60 border-slate-800" : "bg-slate-50 border-slate-200 shadow-sm"
          }`}>
            <span className={`text-[11px] block ${isDark ? "text-slate-400" : "text-slate-600 font-semibold"}`}>Total Peserta Terdata</span>
            <span className="font-bold text-cyan-600 dark:text-cyan-400 font-mono text-sm">
              {kodamPrograms.reduce((acc, curr) => acc + curr.participantCount, 0).toLocaleString("id-ID")} Orang
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className={`flex items-center space-x-2 border-b pb-2 ${isDark ? "border-slate-800" : "border-slate-200"}`}>
        <button
          onClick={() => setActiveSubTab("form")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "form"
              ? "bg-red-700 text-white shadow-lg border border-red-600"
              : isDark
              ? "bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-700/50"
              : "bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-300 font-semibold"
          }`}
        >
          <PlusCircle className="w-4 h-4 text-yellow-400" />
          <span>Form Input Kegiatan Baru</span>
        </button>
        <button
          onClick={() => setActiveSubTab("list")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === "list"
              ? "bg-red-700 text-white shadow-lg border border-red-600"
              : isDark
              ? "bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-700/50"
              : "bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-300 font-semibold"
          }`}
        >
          <FileText className="w-4 h-4 text-emerald-400" />
          <span>Daftar Laporan Terinput ({kodamPrograms.length})</span>
        </button>
      </div>

      {/* TAB 1: FORM INPUT KEGIATAN KODAM */}
      {activeSubTab === "form" && (
        <form onSubmit={handleSubmit} className={`p-6 rounded-2xl border space-y-6 ${
          isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
        }`}>
          {/* Section 1: Type Selection */}
          <div className="space-y-3">
            <label className={`text-xs font-bold uppercase tracking-wider block font-mono ${
              isDark ? "text-amber-400" : "text-amber-800 font-extrabold"
            }`}>
              1. Kategori Kegiatan PKBN
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setProgramType("Program Rutin")}
                className={`p-4 rounded-xl border text-left flex items-start space-x-3 transition-all ${
                  programType === "Program Rutin"
                    ? isDark
                      ? "bg-red-950/80 border-red-600 text-white ring-2 ring-red-500/50"
                      : "bg-red-50 border-red-600 text-red-950 ring-2 ring-red-500/50 font-bold"
                    : isDark
                    ? "bg-slate-800/40 border-slate-700 text-slate-400 hover:bg-slate-800"
                    : "bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold"
                }`}
              >
                <div className={`p-2 rounded-lg ${programType === "Program Rutin" ? "bg-red-800 text-yellow-300" : isDark ? "bg-slate-700 text-slate-400" : "bg-slate-200 text-slate-600"}`}>
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className={`font-bold text-xs ${isDark ? "text-slate-100" : "text-slate-900"}`}>Program Rutin Command/Pusat</div>
                  <p className={`text-[11px] mt-0.5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    Kegiatan berskala nasional / komando yang sesuai Kalender Kerja SPABAN IV/PKBN STERAD.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setProgramType("Non-Program / Inisiatif")}
                className={`p-4 rounded-xl border text-left flex items-start space-x-3 transition-all ${
                  programType === "Non-Program / Inisiatif"
                    ? isDark
                      ? "bg-indigo-950/80 border-indigo-500 text-white ring-2 ring-indigo-500/50"
                      : "bg-indigo-50 border-indigo-500 text-indigo-950 ring-2 ring-indigo-500/50 font-bold"
                    : isDark
                    ? "bg-slate-800/40 border-slate-700 text-slate-400 hover:bg-slate-800"
                    : "bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold"
                }`}
              >
                <div className={`p-2 rounded-lg ${programType === "Non-Program / Inisiatif" ? "bg-indigo-800 text-cyan-300" : isDark ? "bg-slate-700 text-slate-400" : "bg-slate-200 text-slate-600"}`}>
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className={`font-bold text-xs ${isDark ? "text-slate-100" : "text-slate-900"}`}>Data Non-Program / Inisiatif Kewilayahan</div>
                  <p className={`text-[11px] mt-0.5 ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                    Kegiatan mandiri, kemitraan lokal, dan inisiatif khusus {selectedKodam.name}.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Section 2: Core Details */}
          <div className={`space-y-4 pt-4 border-t ${isDark ? "border-slate-800" : "border-slate-200"}`}>
            <label className={`text-xs font-bold uppercase tracking-wider block font-mono ${
              isDark ? "text-amber-400" : "text-amber-800 font-extrabold"
            }`}>
              2. Informasi & Detail Kegiatan
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={`text-xs font-bold mb-1 block ${isDark ? "text-slate-300" : "text-slate-800"}`}>
                  Sektor Pembinaan *
                </label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value as SectorType)}
                  className={`w-full text-xs px-3 py-2.5 rounded-xl border focus:outline-none focus:border-red-500 ${
                    isDark
                      ? "bg-slate-800 text-white border-slate-700"
                      : "bg-slate-50 text-slate-900 border-slate-300 font-semibold focus:bg-white"
                  }`}
                >
                  <option value="Pendidikan">Lingkup Pendidikan</option>
                  <option value="Pekerjaan">Lingkup Pekerjaan</option>
                  <option value="Masyarakat">Lingkup Masyarakat</option>
                </select>
              </div>

              <div>
                <label className={`text-xs font-bold mb-1 block ${isDark ? "text-slate-300" : "text-slate-800"}`}>
                  Sub-Kategori / Sasaran *
                </label>
                <input
                  type="text"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  placeholder="Misal: Perguruan Tinggi, BUMN, Karang Taruna"
                  className={`w-full text-xs px-3 py-2.5 rounded-xl border focus:outline-none focus:border-red-500 ${
                    isDark
                      ? "bg-slate-800 text-white border-slate-700"
                      : "bg-slate-50 text-slate-900 border-slate-300 font-semibold focus:bg-white"
                  }`}
                  required
                />
              </div>

              <div>
                <label className={`text-xs font-bold mb-1 block ${isDark ? "text-slate-300" : "text-slate-800"}`}>
                  Unit Penyelenggara *
                </label>
                <input
                  type="text"
                  value={organizerUnit}
                  onChange={(e) => setOrganizerUnit(e.target.value)}
                  placeholder="Misal: Sterdam / Korem 061 / Kodim 0618"
                  className={`w-full text-xs px-3 py-2.5 rounded-xl border focus:outline-none focus:border-red-500 ${
                    isDark
                      ? "bg-slate-800 text-white border-slate-700"
                      : "bg-slate-50 text-slate-900 border-slate-300 font-semibold focus:bg-white"
                  }`}
                  required
                />
              </div>
            </div>

            <div>
              <label className={`text-xs font-bold mb-1 block ${isDark ? "text-slate-300" : "text-slate-800"}`}>
                Nama Topik / Nama Kegiatan PKBN *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Misal: Pembekalan Kesadaran Bela Negara bagi Mahasiswa Baru Universitas Terbuka"
                className={`w-full text-xs px-3 py-2.5 rounded-xl border focus:outline-none focus:border-red-500 ${
                  isDark
                    ? "bg-slate-800 text-white border-slate-700"
                    : "bg-slate-50 text-slate-900 border-slate-300 font-semibold focus:bg-white"
                }`}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={`text-xs font-bold mb-1 block ${isDark ? "text-slate-300" : "text-slate-800"}`}>
                  Kabupaten / Kota *
                </label>
                <input
                  type="text"
                  value={regency}
                  onChange={(e) => setRegency(e.target.value)}
                  placeholder={`Lokasi di ${selectedKodam.province}`}
                  className={`w-full text-xs px-3 py-2.5 rounded-xl border focus:outline-none focus:border-red-500 ${
                    isDark
                      ? "bg-slate-800 text-white border-slate-700"
                      : "bg-slate-50 text-slate-900 border-slate-300 font-semibold focus:bg-white"
                  }`}
                  required
                />
              </div>

              <div>
                <label className={`text-xs font-bold mb-1 block ${isDark ? "text-slate-300" : "text-slate-800"}`}>
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={`w-full text-xs px-3 py-2.5 rounded-xl border focus:outline-none focus:border-red-500 ${
                    isDark
                      ? "bg-slate-800 text-white border-slate-700"
                      : "bg-slate-50 text-slate-900 border-slate-300 font-semibold focus:bg-white"
                  }`}
                />
              </div>

              <div>
                <label className={`text-xs font-bold mb-1 block ${isDark ? "text-slate-300" : "text-slate-800"}`}>
                  Tanggal Selesai
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={`w-full text-xs px-3 py-2.5 rounded-xl border focus:outline-none focus:border-red-500 ${
                    isDark
                      ? "bg-slate-800 text-white border-slate-700"
                      : "bg-slate-50 text-slate-900 border-slate-300 font-semibold focus:bg-white"
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={`text-xs font-bold mb-1 block ${isDark ? "text-slate-300" : "text-slate-800"}`}>
                  Jumlah Peserta (Realisasi) *
                </label>
                <input
                  type="number"
                  value={participantCount}
                  onChange={(e) => setParticipantCount(Number(e.target.value))}
                  className={`w-full text-xs px-3 py-2.5 rounded-xl border focus:outline-none focus:border-red-500 ${
                    isDark
                      ? "bg-slate-800 text-white border-slate-700"
                      : "bg-slate-50 text-slate-900 border-slate-300 font-semibold focus:bg-white"
                  }`}
                  required
                />
              </div>

              <div>
                <label className={`text-xs font-bold mb-1 block ${isDark ? "text-slate-300" : "text-slate-800"}`}>
                  Target Peserta (Rencana) *
                </label>
                <input
                  type="number"
                  value={targetCount}
                  onChange={(e) => setTargetCount(Number(e.target.value))}
                  className={`w-full text-xs px-3 py-2.5 rounded-xl border focus:outline-none focus:border-red-500 ${
                    isDark
                      ? "bg-slate-800 text-white border-slate-700"
                      : "bg-slate-50 text-slate-900 border-slate-300 font-semibold focus:bg-white"
                  }`}
                  required
                />
              </div>

              <div>
                <label className={`text-xs font-bold mb-1 block ${isDark ? "text-slate-300" : "text-slate-800"}`}>
                  Instruktur / Perwira Pembina *
                </label>
                <input
                  type="text"
                  value={instructorName}
                  onChange={(e) => setInstructorName(e.target.value)}
                  placeholder="Misal: Mayor Inf Heru P."
                  className={`w-full text-xs px-3 py-2.5 rounded-xl border focus:outline-none focus:border-red-500 ${
                    isDark
                      ? "bg-slate-800 text-white border-slate-700"
                      : "bg-slate-50 text-slate-900 border-slate-300 font-semibold focus:bg-white"
                  }`}
                  required
                />
              </div>
            </div>

            <div>
              <label className={`text-xs font-bold mb-1 block ${isDark ? "text-slate-300" : "text-slate-800"}`}>
                Ringkasan Output & Catatan Evaluasi
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Tuliskan catatan pelaksanaan, materi utama yang disampaikan, serta respon peserta..."
                className={`w-full text-xs px-3 py-2.5 rounded-xl border focus:outline-none focus:border-red-500 ${
                  isDark
                    ? "bg-slate-800 text-white border-slate-700"
                    : "bg-slate-50 text-slate-900 border-slate-300 font-semibold focus:bg-white"
                }`}
              />
            </div>
          </div>

          {/* Section 3: Upload Evidence */}
          <div className={`space-y-3 pt-4 border-t ${isDark ? "border-slate-800" : "border-slate-200"}`}>
            <label className={`text-xs font-bold uppercase tracking-wider block font-mono ${
              isDark ? "text-amber-400" : "text-amber-800 font-extrabold"
            }`}>
              3. Upload Laporan & Dokumen Bukti
            </label>
            <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
              isDark
                ? "border-slate-700 hover:border-red-500/60 bg-slate-950/40"
                : "border-slate-300 hover:border-red-500 bg-slate-50 shadow-inner"
            }`}>
              <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <div className={`text-xs font-bold ${isDark ? "text-slate-200" : "text-slate-800"}`}>
                Drag & Drop Berkas Laporan Kodam atau Foto Dokumentasi
              </div>
              <p className={`text-[11px] mt-1 ${isDark ? "text-slate-500" : "text-slate-600"}`}>
                Format yang didukung: PDF, DOCX, JPG, PNG (Maksimal 25MB)
              </p>
              <input
                type="file"
                id="kodam-file-upload"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setUploadedFileName(e.target.files[0].name);
                  }
                }}
              />
              <label
                htmlFor="kodam-file-upload"
                className={`inline-block mt-3 text-xs font-bold px-4 py-2 rounded-lg border cursor-pointer ${
                  isDark
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
                    : "bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm"
                }`}
              >
                Pilih Berkas Dari Komputer
              </label>
              {uploadedFileName && (
                <div className="mt-3 inline-flex items-center space-x-2 bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs px-3 py-1.5 rounded-lg">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Berkas Terlampir: {uploadedFileName}</span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className={`pt-4 border-t flex items-center justify-end space-x-3 ${isDark ? "border-slate-800" : "border-slate-200"}`}>
            <button
              type="submit"
              className="bg-gradient-to-r from-red-700 via-red-800 to-red-900 hover:from-red-600 hover:to-red-800 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg shadow-red-950/50 border border-red-600/80 flex items-center space-x-2 active:scale-95 transition-all"
            >
              <Send className="w-4 h-4 text-yellow-300" />
              <span>KIRIM & SINKRONKAN DATA KE SPABAN IV/PKBN PUSAT</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: DAFTAR LAPORAN TERINPUT KODAM */}
      {activeSubTab === "list" && (
        <div className={`p-5 rounded-2xl border space-y-4 ${
          isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
        }`}>
          {/* List Header & Filters */}
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b ${
            isDark ? "border-slate-800" : "border-slate-200"
          }`}>
            <div>
              <h3 className="text-base font-bold font-serif">
                Daftar Kegiatan Terinput {selectedKodam.name}
              </h3>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600 font-medium"}`}>
                Terhubung otomatis dengan Dashboard Nasional SPABAN IV/PKBN STERAD.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setListFilterType("semua")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  listFilterType === "semua"
                    ? isDark ? "bg-slate-700 text-white font-mono" : "bg-slate-800 text-white font-mono"
                    : isDark ? "bg-slate-800/60 text-slate-400 hover:text-slate-200" : "bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200"
                }`}
              >
                Semua ({kodamPrograms.length})
              </button>
              <button
                onClick={() => setListFilterType("Program Rutin")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  listFilterType === "Program Rutin"
                    ? "bg-red-900 text-yellow-300 font-mono border border-red-700"
                    : isDark ? "bg-slate-800/60 text-slate-400 hover:text-slate-200" : "bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200"
                }`}
              >
                Program Rutin
              </button>
              <button
                onClick={() => setListFilterType("Non-Program / Inisiatif")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  listFilterType === "Non-Program / Inisiatif"
                    ? "bg-indigo-900 text-cyan-300 font-mono border border-indigo-700"
                    : isDark ? "bg-slate-800/60 text-slate-400 hover:text-slate-200" : "bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200"
                }`}
              >
                Non-Program
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari berdasarkan judul kegiatan, kabupaten, atau penyelenggara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full text-xs pl-9 pr-4 py-2 rounded-xl border focus:outline-none focus:border-red-500 ${
                isDark
                  ? "bg-slate-800/80 border-slate-700 text-white"
                  : "bg-slate-50 border-slate-300 text-slate-900 font-semibold focus:bg-white"
              }`}
            />
          </div>

          {/* Programs Table */}
          {filteredList.length === 0 ? (
            <div className={`text-center py-12 border border-dashed rounded-xl ${
              isDark ? "border-slate-800" : "border-slate-300 bg-slate-50"
            }`}>
              <FileText className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <p className={`text-xs font-semibold ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Belum ada data kegiatan terinput untuk {selectedKodam.name} dengan filter ini.
              </p>
              <button
                onClick={() => setActiveSubTab("form")}
                className="mt-3 inline-flex items-center space-x-1.5 text-xs font-bold text-red-600 hover:text-red-700 dark:text-red-400"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Input Kegiatan Baru Sekarang</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className={`border-b font-mono uppercase text-[10px] ${
                    isDark ? "bg-slate-950/80 border-slate-800 text-slate-400" : "bg-slate-100 border-slate-200 text-slate-700 font-bold"
                  }`}>
                    <th className="p-3">Kode & Judul Kegiatan</th>
                    <th className="p-3">Kategori</th>
                    <th className="p-3">Sektor</th>
                    <th className="p-3">Wilayah</th>
                    <th className="p-3">Peserta</th>
                    <th className="p-3">Status Verifikasi</th>
                    <th className="p-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? "divide-slate-800/60" : "divide-slate-200"}`}>
                  {filteredList.map((item) => (
                    <tr key={item.id} className={`transition-colors ${
                      isDark ? "hover:bg-slate-800/40" : "hover:bg-slate-50"
                    }`}>
                      <td className="p-3">
                        <div className="font-mono text-[10px] text-amber-600 dark:text-amber-400 font-bold">{item.code}</div>
                        <div className={`font-bold text-xs ${isDark ? "text-slate-100" : "text-slate-900"}`}>{item.title}</div>
                        <div className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-600"}`}>{item.organizer}</div>
                      </td>
                      <td className="p-3">
                        {item.programType === "Non-Program / Inisiatif" ? (
                          <span className="bg-indigo-950 text-indigo-300 text-[10px] font-mono px-2 py-0.5 rounded border border-indigo-800">
                            Non-Program
                          </span>
                        ) : (
                          <span className="bg-red-950 text-yellow-300 text-[10px] font-mono px-2 py-0.5 rounded border border-red-800">
                            Program Rutin
                          </span>
                        )}
                      </td>
                      <td className={`p-3 font-semibold ${isDark ? "text-slate-300" : "text-slate-800"}`}>
                        {item.sector}
                      </td>
                      <td className="p-3">
                        <div className={`font-medium ${isDark ? "text-slate-200" : "text-slate-900"}`}>{item.regency}</div>
                        <div className={`text-[10px] ${isDark ? "text-slate-500" : "text-slate-500"}`}>{item.province}</div>
                      </td>
                      <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {item.participantCount.toLocaleString("id-ID")} orang
                      </td>
                      <td className="p-3">
                        <span className="bg-emerald-950 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-800 flex items-center space-x-1 w-fit">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Tersinkron SPABAN</span>
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        {onDeleteProgram && (
                          <button
                            onClick={() => onDeleteProgram(item.id)}
                            className={`p-1.5 rounded transition-colors ${
                              isDark
                                ? "bg-slate-800 hover:bg-red-950 hover:text-red-400 text-slate-400"
                                : "bg-slate-100 hover:bg-red-100 hover:text-red-600 text-slate-600"
                            }`}
                            title="Hapus Laporan Ini"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
