import React, { useState } from "react";
import {
  ProgramItem,
  InstitutionItem,
  InstructorItem,
  CalendarEvent,
  CertificateTemplate,
} from "../../types";
import {
  GraduationCap,
  School,
  Users,
  Award,
  Calendar,
  Image as ImageIcon,
  CheckCircle2,
  FileCheck2,
  Printer,
  Search,
  Plus,
  Star,
  BookOpen,
} from "lucide-react";

interface PendidikanViewProps {
  programs: ProgramItem[];
  institutions: InstitutionItem[];
  instructors: InstructorItem[];
  events: CalendarEvent[];
  theme?: "dark" | "light";
  searchQuery?: string;
}

export const PendidikanView: React.FC<PendidikanViewProps> = ({
  programs,
  institutions,
  instructors,
  events,
  theme = "dark",
  searchQuery = "",
}) => {
  const isDark = theme === "dark";
  const [localSearch, setLocalSearch] = useState("");

  const activeQuery = (searchQuery || localSearch).trim().toLowerCase();

  const [activeSubTab, setActiveSubTab] = useState<
    "sekolah" | "program" | "peserta" | "instruktur" | "kalender" | "dokumentasi" | "evaluasi" | "sertifikat"
  >("program");

  const [selectedCert, setSelectedCert] = useState<CertificateTemplate | null>({
    id: "CERT-2026-8801",
    recipientName: "Andi Pratama, S.T.",
    programTitle: "Diklat Kader Bela Negara Mahasiswa Baru (PKKMB + PKBN 2026)",
    sector: "Pendidikan",
    certificateNo: "094/PKBN-EDU/KEMHAN/VIII/2026",
    issueDate: "21 Agustus 2026",
    durationHours: 36,
    grade: "Sangat Baik",
  });

  const [certRecipientInput, setCertRecipientInput] = useState("Ahmad Fauzan Hidayat");
  const [certGrade, setCertGrade] = useState<"Sangat Baik" | "Baik" | "Cukup">("Sangat Baik");

  // Filter education institutions
  const eduInstitutions = institutions.filter(
    (i) => (i.category === "Sekolah" || i.category === "Perguruan Tinggi") &&
      (!activeQuery ||
        i.name.toLowerCase().includes(activeQuery) ||
        i.province.toLowerCase().includes(activeQuery) ||
        i.regency.toLowerCase().includes(activeQuery) ||
        i.contactPerson.toLowerCase().includes(activeQuery))
  );

  // Filter education programs
  const eduPrograms = programs.filter(
    (p) => p.sector === "Pendidikan" &&
      (!activeQuery ||
        p.title.toLowerCase().includes(activeQuery) ||
        p.organizer.toLowerCase().includes(activeQuery) ||
        p.province.toLowerCase().includes(activeQuery) ||
        p.regency.toLowerCase().includes(activeQuery) ||
        p.instructorName?.toLowerCase().includes(activeQuery))
  );

  return (
    <div className="space-y-6">
      {/* Sector Header Banner */}
      <div className={`rounded-2xl p-6 shadow-xl relative overflow-hidden border ${
        isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-700/60 text-blue-400 flex items-center justify-center shrink-0 shadow-lg">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider text-blue-400 uppercase bg-blue-950/60 px-2.5 py-0.5 rounded border border-blue-800/60">
                Bidang Lingkup 1
              </span>
              <h2 className={`text-xl font-bold font-serif tracking-tight mt-1 ${isDark ? "text-white" : "text-slate-900"}`}>
                Pembinaan Kesadaran Bela Negara di Lingkungan Pendidikan
              </h2>
              <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-600 font-medium"}`}>
                Mengelola pembinaan di Sekolah Dasar, Menengah, Kejuruan, serta Perguruan Tinggi Negeri & Swasta.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className={`px-3 py-2 rounded-xl text-center border ${
              isDark ? "bg-slate-800/90 border-slate-700/80" : "bg-slate-100 border-slate-200 shadow-sm"
            }`}>
              <div className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-600 font-semibold"}`}>Total Satuan Pendidikan</div>
              <div className="font-bold text-blue-600 dark:text-blue-400 text-base">4,120 Kampus/Sekolah</div>
            </div>
            <div className={`px-3 py-2 rounded-xl text-center border ${
              isDark ? "bg-slate-800/90 border-slate-700/80" : "bg-slate-100 border-slate-200 shadow-sm"
            }`}>
              <div className={`text-[10px] ${isDark ? "text-slate-400" : "text-slate-600 font-semibold"}`}>Kader Terbina</div>
              <div className="font-bold text-emerald-600 dark:text-emerald-400 text-base">1,240,500 Siswa/Mhs</div>
            </div>
          </div>
        </div>

        {/* Sub-navigation Tabs matching prompt concepts */}
        <div className={`flex items-center space-x-1 border-t pt-4 mt-5 overflow-x-auto scrollbar-none no-scrollbar text-xs font-medium ${
          isDark ? "border-slate-800 text-slate-400" : "border-slate-200 text-slate-600"
        }`}>
          {[
            { id: "program", label: "Program PKBN", icon: <BookOpen className="w-4 h-4" /> },
            { id: "sekolah", label: "Data Sekolah/PT", icon: <School className="w-4 h-4" /> },
            { id: "peserta", label: "Data Peserta", icon: <Users className="w-4 h-4" /> },
            { id: "instruktur", label: "Instruktur/Narasumber", icon: <Award className="w-4 h-4" /> },
            { id: "kalender", label: "Kalender Kegiatan", icon: <Calendar className="w-4 h-4" /> },
            { id: "evaluasi", label: "Evaluasi", icon: <CheckCircle2 className="w-4 h-4" /> },
            { id: "sertifikat", label: "Generator Sertifikat", icon: <FileCheck2 className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl transition-all shrink-0 ${
                activeSubTab === tab.id
                  ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-900/30"
                  : isDark
                  ? "hover:bg-slate-800 hover:text-slate-200"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold border border-slate-200"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Program PKBN */}
      {activeSubTab === "program" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>
              Daftar Program PKBN Lingkup Pendidikan
            </h3>
            <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center space-x-1 transition-colors shadow">
              <Plus className="w-4 h-4" />
              <span>Tambah Program Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eduPrograms.map((p) => (
              <div
                key={p.id}
                className={`rounded-2xl p-5 shadow-lg space-y-3 transition-all border ${
                  isDark
                    ? "bg-slate-900 border-slate-800 text-white hover:border-slate-700"
                    : "bg-white border-slate-200 text-slate-800 shadow-md hover:border-slate-300"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${
                    isDark ? "bg-blue-950 text-blue-300 border-blue-800" : "bg-blue-50 text-blue-700 border-blue-200"
                  }`}>
                    {p.subCategory}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    p.status === 'Berlangsung'
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40'
                      : isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {p.status}
                  </span>
                </div>

                <h4 className={`text-sm font-bold leading-snug ${isDark ? "text-white" : "text-slate-900"}`}>{p.title}</h4>
                <p className={`text-xs line-clamp-2 ${isDark ? "text-slate-400" : "text-slate-600 font-medium"}`}>{p.description}</p>

                <div className={`grid grid-cols-2 gap-2 text-xs p-2.5 rounded-xl border ${
                  isDark ? "bg-slate-800/80 border-slate-700/80" : "bg-slate-50 border-slate-200 text-slate-800 font-medium"
                }`}>
                  <div>
                    <span className={`block text-[10px] ${isDark ? "text-slate-400" : "text-slate-600"}`}>Penyelenggara:</span>
                    <span className={`font-semibold truncate block ${isDark ? "text-slate-200" : "text-slate-900"}`}>{p.organizer}</span>
                  </div>
                  <div>
                    <span className={`block text-[10px] ${isDark ? "text-slate-400" : "text-slate-600"}`}>Instruktur:</span>
                    <span className={`font-semibold truncate block ${isDark ? "text-slate-200" : "text-slate-900"}`}>{p.instructorName}</span>
                  </div>
                  <div>
                    <span className={`block text-[10px] ${isDark ? "text-slate-400" : "text-slate-600"}`}>Lokasi:</span>
                    <span className={`font-semibold truncate block ${isDark ? "text-slate-200" : "text-slate-900"}`}>{p.regency}, {p.province}</span>
                  </div>
                  <div>
                    <span className={`block text-[10px] ${isDark ? "text-slate-400" : "text-slate-600"}`}>Peserta/Target:</span>
                    <span className={`font-bold ${isDark ? "text-yellow-400" : "text-amber-700"}`}>{p.participantCount} / {p.targetCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Data Sekolah & PT */}
      {activeSubTab === "sekolah" && (
        <div className={`rounded-2xl p-5 shadow-xl space-y-4 border ${
          isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>Data Sekolah & Perguruan Tinggi Terdaftar</h3>
            <div className="relative w-full sm:w-64">
              <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? "text-slate-400" : "text-slate-500"}`} />
              <input
                type="text"
                placeholder="Cari nama kampus/sekolah..."
                value={localSearch || searchQuery}
                onChange={(e) => setLocalSearch(e.target.value)}
                className={`w-full text-xs pl-9 pr-3 py-1.5 rounded-lg border focus:outline-none ${
                  isDark ? "bg-slate-800 text-slate-200 border-slate-700" : "bg-slate-100 text-slate-800 border-slate-300 font-medium"
                }`}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className={`w-full text-left text-xs ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              <thead className={`uppercase font-mono text-[10px] ${
                isDark ? "bg-slate-800/90 text-slate-400" : "bg-slate-100 text-slate-700 font-bold"
              }`}>
                <tr>
                  <th className="p-3">Nama Satuan Pendidikan</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Provinsi / Wilayah</th>
                  <th className="p-3">Total Kader Terbina</th>
                  <th className="p-3">Penanggung Jawab</th>
                  <th className="p-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-slate-800" : "divide-slate-200"}`}>
                {eduInstitutions.map((inst) => (
                  <tr key={inst.id} className={`transition-colors ${isDark ? "hover:bg-slate-800/50" : "hover:bg-slate-50"}`}>
                    <td className={`p-3 font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{inst.name}</td>
                    <td className="p-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-mono border ${
                        isDark ? "bg-blue-950 text-blue-300 border-blue-800" : "bg-blue-50 text-blue-700 border-blue-200 font-bold"
                      }`}>
                        {inst.category}
                      </span>
                    </td>
                    <td className="p-3">{inst.regency}, {inst.province}</td>
                    <td className={`p-3 font-bold ${isDark ? "text-yellow-400" : "text-amber-700"}`}>{inst.cadreCount.toLocaleString("id-ID")} Siswa/Mhs</td>
                    <td className="p-3">{inst.contactPerson} ({inst.phone})</td>
                    <td className="p-3 text-right">
                      <span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        {inst.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Instruktur & Narasumber */}
      {activeSubTab === "instruktur" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {instructors.map((ins) => (
            <div key={ins.id} className={`rounded-2xl p-5 shadow-lg flex items-start space-x-4 border ${
              isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
            }`}>
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-800 text-white flex items-center justify-center font-bold text-sm shrink-0 border-2 border-blue-400/40 shadow-md">
                {ins.name.slice(0, 2)}
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={`font-bold text-sm ${isDark ? "text-white" : "text-slate-900"}`}>{ins.name}</h4>
                  <div className={`flex items-center space-x-1 text-xs font-bold px-2 py-0.5 rounded border ${
                    isDark ? "text-yellow-400 bg-amber-950/60 border-amber-800" : "text-amber-800 bg-amber-50 border-amber-200"
                  }`}>
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-500" />
                    <span>{ins.rating}</span>
                  </div>
                </div>
                <div className={`text-xs font-semibold ${isDark ? "text-blue-400" : "text-blue-600"}`}>{ins.agency}</div>
                <div className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600 font-medium"}`}>Spesialisasi: {ins.specialization}</div>
                <div className={`flex items-center space-x-3 text-[11px] pt-1 border-t mt-2 ${
                  isDark ? "text-slate-500 border-slate-800" : "text-slate-500 border-slate-200 font-medium"
                }`}>
                  <span>Tersertifikasi: {ins.certificationYear}</span>
                  <span>•</span>
                  <span>Total Sesi: {ins.totalClasses} Sesi</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Data Peserta / Kader Terbina */}
      {activeSubTab === "peserta" && (
        <div className={`rounded-2xl p-5 shadow-xl space-y-4 border ${
          isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>Data Peserta & Kader Terbina Lingkup Pendidikan</h3>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600 font-medium"}`}>Daftar mahasiswa dan siswa terdaftar dalam program PKBN Se-Indonesia</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? "text-slate-400" : "text-slate-500"}`} />
              <input
                type="text"
                placeholder="Cari nama peserta / NIM..."
                value={localSearch || searchQuery}
                onChange={(e) => setLocalSearch(e.target.value)}
                className={`w-full text-xs pl-9 pr-3 py-1.5 rounded-lg border focus:outline-none ${
                  isDark ? "bg-slate-800 text-slate-200 border-slate-700" : "bg-slate-100 text-slate-800 border-slate-300 font-medium"
                }`}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className={`w-full text-left text-xs ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              <thead className={`uppercase font-mono text-[10px] ${
                isDark ? "bg-slate-800/90 text-slate-400" : "bg-slate-100 text-slate-700 font-bold"
              }`}>
                <tr>
                  <th className="p-3">ID Peserta</th>
                  <th className="p-3">Nama Lengkap</th>
                  <th className="p-3">Satuan Pendidikan</th>
                  <th className="p-3">Program Diklat</th>
                  <th className="p-3">Kehadiran</th>
                  <th className="p-3">Nilai Evaluasi</th>
                  <th className="p-3 text-right">Status Sertifikat</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-slate-800" : "divide-slate-200"}`}>
                {[
                  { id: "KDR-2026-001", name: "Andi Pratama, S.T.", inst: "Universitas Indonesia", prog: "PKKMB + PKBN 2026", attend: "100%", grade: "89.5 (Sangat Baik)", cert: "Terbit" },
                  { id: "KDR-2026-002", name: "Siti Rahmawati", inst: "Institut Teknologi Bandung", prog: "Duta Bela Negara Kampus", attend: "98%", grade: "92.0 (Sangat Baik)", cert: "Terbit" },
                  { id: "KDR-2026-003", name: "Budi Santoso", inst: "Universitas Gadjah Mada", prog: "PKKMB + PKBN 2026", attend: "95%", grade: "85.0 (Baik)", cert: "Terbit" },
                  { id: "KDR-2026-004", name: "Dewi Anggraini", inst: "SMKN 1 Surabaya", prog: "Kemah Pramuka Saka Wira Kartika", attend: "100%", grade: "94.5 (Sangat Baik)", cert: "Terbit" },
                  { id: "KDR-2026-005", name: "Fajri Hidayat", inst: "Universitas Airlangga", prog: "Sertifikasi Kader Pemuda", attend: "92%", grade: "81.0 (Baik)", cert: "Proses Verification" },
                  { id: "KDR-2026-006", name: "Rina Wijaya", inst: "SMA Negeri 1 Medan", prog: "Kemah Pramuka Saka Wira Kartika", attend: "96%", grade: "88.0 (Sangat Baik)", cert: "Terbit" },
                ]
                .filter((r) => !activeQuery || r.name.toLowerCase().includes(activeQuery) || r.inst.toLowerCase().includes(activeQuery) || r.prog.toLowerCase().includes(activeQuery) || r.id.toLowerCase().includes(activeQuery))
                .map((row) => (
                  <tr key={row.id} className={`transition-colors ${isDark ? "hover:bg-slate-800/50" : "hover:bg-slate-50"}`}>
                    <td className={`p-3 font-mono ${isDark ? "text-slate-400" : "text-slate-500 font-medium"}`}>{row.id}</td>
                    <td className={`p-3 font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{row.name}</td>
                    <td className="p-3">{row.inst}</td>
                    <td className={`p-3 font-semibold ${isDark ? "text-blue-400" : "text-blue-600"}`}>{row.prog}</td>
                    <td className={`p-3 font-bold ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>{row.attend}</td>
                    <td className={`p-3 font-bold ${isDark ? "text-yellow-400" : "text-amber-700"}`}>{row.grade}</td>
                    <td className="p-3 text-right">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        row.cert === "Terbit" ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40" : "bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/40"
                      }`}>
                        {row.cert}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Kalender Kegiatan */}
      {activeSubTab === "kalender" && (
        <div className={`rounded-2xl p-5 shadow-xl space-y-4 border ${
          isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
        }`}>
          <div className={`flex items-center justify-between border-b pb-3 ${isDark ? "border-slate-800" : "border-slate-200"}`}>
            <div>
              <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>Kalender Agenda Pembinaan Pendidikan 2026</h3>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600 font-medium"}`}>Jadwal pelaksanaan diklat, kemah kebangsaan, dan orientasi kampus</p>
            </div>
            <div className={`text-xs px-3 py-1.5 rounded-lg border font-mono ${
              isDark ? "bg-slate-800 border-slate-700 text-slate-300" : "bg-slate-100 border-slate-300 text-slate-700 font-semibold"
            }`}>
              Agustus — September 2026
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { date: "15-18 Agu 2026", title: "Diklat Kader Bela Negara Maba UI", loc: "Balairung UI Depok", target: "8,500 Mahasiswa", status: "Berlangsung", color: "emerald" },
              { date: "20-22 Agu 2026", title: "Kemah Pramuka Saka Wira Kartika SMA Jabar", loc: "Kiarapayung Sumedang", target: "1,200 Siswa", status: "Akan Datang", color: "blue" },
              { date: "25-27 Agu 2026", title: "Orientasi Bela Negara ITB & Unpad", loc: "Kampus Jatinangor", target: "6,000 Mahasiswa", status: "Akan Datang", color: "blue" },
              { date: "01-03 Sep 2026", title: "Pelatihan Instruktur Muda Kampus Se-Jateng", loc: "Kodam IV Semarang", target: "350 Instruktur", status: "Persiapan", color: "amber" },
            ].map((ev, idx) => (
              <div key={idx} className={`border rounded-xl p-4 flex items-start space-x-3 transition-all ${
                isDark ? "bg-slate-800/80 border-slate-700/80 hover:border-slate-600" : "bg-slate-50 border-slate-200 hover:border-slate-300 shadow-sm"
              }`}>
                <div className={`p-2.5 border rounded-lg text-center font-mono text-xs shrink-0 w-24 ${
                  isDark ? "bg-blue-950 text-blue-400 border-blue-800" : "bg-blue-50 text-blue-700 border-blue-200"
                }`}>
                  <Calendar className="w-4 h-4 mx-auto mb-1" />
                  <span className="font-bold block text-[11px] leading-tight">{ev.date}</span>
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-bold text-xs ${isDark ? "text-white" : "text-slate-900"}`}>{ev.title}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      ev.status === "Berlangsung" ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40" : "bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/40"
                    }`}>
                      {ev.status}
                    </span>
                  </div>
                  <div className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-600 font-medium"}`}>Lokasi: {ev.loc}</div>
                  <div className={`text-[11px] font-semibold ${isDark ? "text-yellow-400" : "text-amber-700"}`}>Target: {ev.target}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Evaluasi Capaian */}
      {activeSubTab === "evaluasi" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`rounded-2xl p-4 text-center border ${
              isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
            }`}>
              <div className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600 font-semibold"}`}>Rata-rata Nilai Pre-Test</div>
              <div className={`text-2xl font-black font-mono mt-1 ${isDark ? "text-amber-400" : "text-amber-700"}`}>62.4 / 100</div>
              <div className={`text-[11px] mt-0.5 ${isDark ? "text-slate-500" : "text-slate-500 font-medium"}`}>Pemahaman awal kesadaran</div>
            </div>
            <div className={`rounded-2xl p-4 text-center border ${
              isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
            }`}>
              <div className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600 font-semibold"}`}>Rata-rata Nilai Post-Test</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1">89.8 / 100</div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400/80 mt-0.5 font-semibold">+27.4% Peningkatan Signifikan</div>
            </div>
            <div className={`rounded-2xl p-4 text-center border ${
              isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
            }`}>
              <div className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600 font-semibold"}`}>Tingkat Kelulusan Sertifikasi</div>
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono mt-1">96.2%</div>
              <div className={`text-[11px] mt-0.5 ${isDark ? "text-slate-500" : "text-slate-500 font-medium"}`}>Lulus dengan predikat Sangat Baik / Baik</div>
            </div>
          </div>

          <div className={`rounded-2xl p-5 shadow-xl space-y-3 border ${
            isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
          }`}>
            <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>Ringkasan Indikator Keberhasilan Pembinaan</h3>
            <div className="space-y-3 text-xs">
              <div>
                <div className={`flex justify-between mb-1 ${isDark ? "text-slate-300" : "text-slate-700 font-medium"}`}>
                  <span>Pemahaman 5 Nilai Dasar Bela Negara</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">92%</span>
                </div>
                <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-200"}`}>
                  <div className="bg-emerald-500 h-full w-[92%]"></div>
                </div>
              </div>

              <div>
                <div className={`flex justify-between mb-1 ${isDark ? "text-slate-300" : "text-slate-700 font-medium"}`}>
                  <span>Kedisiplinan & Sikap Kebangsaan</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">88%</span>
                </div>
                <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-200"}`}>
                  <div className="bg-blue-500 h-full w-[88%]"></div>
                </div>
              </div>

              <div>
                <div className={`flex justify-between mb-1 ${isDark ? "text-slate-300" : "text-slate-700 font-medium"}`}>
                  <span>Kesiapsiagaan Fisik & Mental</span>
                  <span className="font-bold text-amber-700 dark:text-yellow-400">85%</span>
                </div>
                <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? "bg-slate-800" : "bg-slate-200"}`}>
                  <div className="bg-yellow-500 h-full w-[85%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Certificate Generator */}
      {activeSubTab === "sertifikat" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Certificate Config Panel */}
          <div className={`rounded-2xl p-5 shadow-xl space-y-4 border ${
            isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
          }`}>
            <h3 className={`text-base font-bold font-serif flex items-center space-x-2 ${isDark ? "text-white" : "text-slate-900"}`}>
              <FileCheck2 className="w-5 h-5 text-amber-500 dark:text-yellow-400" />
              <span>Penerbitan Sertifikat PKBN</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className={`block mb-1 ${isDark ? "text-slate-400" : "text-slate-600 font-semibold"}`}>Nama Penerima / Peserta:</label>
                <input
                  type="text"
                  value={certRecipientInput}
                  onChange={(e) => setCertRecipientInput(e.target.value)}
                  className={`w-full p-2.5 rounded-lg border focus:outline-none focus:border-blue-500 ${
                    isDark ? "bg-slate-800 text-slate-100 border-slate-700" : "bg-slate-100 text-slate-900 border-slate-300 font-medium"
                  }`}
                />
              </div>

              <div>
                <label className={`block mb-1 ${isDark ? "text-slate-400" : "text-slate-600 font-semibold"}`}>Program Pembinaan:</label>
                <select className={`w-full p-2.5 rounded-lg border focus:outline-none ${
                  isDark ? "bg-slate-800 text-slate-100 border-slate-700" : "bg-slate-100 text-slate-900 border-slate-300 font-medium"
                }`}>
                  <option>Diklat Kader Bela Negara Mahasiswa Baru (PKKMB + PKBN 2026)</option>
                  <option>Kemah Pramuka Saka Wira Kartika SMA/SMK</option>
                  <option>Sertifikasi Kader Bela Negara Pemuda Nusantara</option>
                </select>
              </div>

              <div>
                <label className={`block mb-1 ${isDark ? "text-slate-400" : "text-slate-600 font-semibold"}`}>Nilai Evaluasi Capaian:</label>
                <select
                  value={certGrade}
                  onChange={(e) => setCertGrade(e.target.value as any)}
                  className={`w-full p-2.5 rounded-lg border focus:outline-none ${
                    isDark ? "bg-slate-800 text-slate-100 border-slate-700" : "bg-slate-100 text-slate-900 border-slate-300 font-medium"
                  }`}
                >
                  <option value="Sangat Baik">Sangat Baik (A)</option>
                  <option value="Baik">Baik (B)</option>
                  <option value="Cukup">Cukup (C)</option>
                </select>
              </div>

              <button
                onClick={() => {
                  if (selectedCert) {
                    setSelectedCert({
                      ...selectedCert,
                      recipientName: certRecipientInput,
                      grade: certGrade,
                      certificateNo: `0${Math.floor(Math.random() * 900 + 100)}/PKBN-EDU/KEMHAN/VIII/2026`,
                    });
                  }
                }}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-xl shadow-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>Generasi & Perbarui Sertifikat</span>
              </button>
            </div>
          </div>

          {/* Certificate Official Preview (Printable Frame) */}
          <div className={`lg:col-span-2 rounded-2xl p-6 shadow-2xl flex flex-col items-center justify-between min-h-[420px] relative overflow-hidden border ${
            isDark ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-900 border-slate-800 text-white"
          }`}>
            {/* Certificate Decorative Border */}
            <div className="absolute inset-3 border-2 border-amber-600/40 rounded-xl pointer-events-none"></div>
            <div className="absolute inset-5 border border-dashed border-amber-500/20 rounded-lg pointer-events-none"></div>

            {/* Certificate Content */}
            <div className="text-center space-y-3 z-10 my-auto">
              <div className="w-12 h-12 mx-auto rounded-full bg-red-950 border border-red-700/80 flex items-center justify-center shadow-lg">
                <Award className="w-7 h-7 text-yellow-400" />
              </div>
              <div className="text-[10px] font-bold tracking-widest text-amber-400 uppercase font-mono">
                KEMENTERIAN PERTAHANAN REPUBLIK INDONESIA
              </div>
              <h2 className="text-2xl font-black text-white font-serif tracking-tight uppercase">
                SERTIFIKAT KADER BELA NEGARA
              </h2>
              <div className="text-[11px] text-slate-400 font-mono">
                Nomor: {selectedCert?.certificateNo}
              </div>

              <p className="text-xs text-slate-300 italic max-w-lg mx-auto pt-2">
                Diberikan kepada:
              </p>
              <h3 className="text-xl font-bold text-yellow-300 font-serif tracking-wide border-b border-amber-500/30 pb-1 max-w-md mx-auto">
                {selectedCert?.recipientName}
              </h3>

              <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed pt-2">
                Atas kelulusan dan partisipasi aktif dalam kegiatan <strong className="text-white">{selectedCert?.programTitle}</strong> dengan predikat kelulusan: <span className="text-emerald-400 font-bold">{selectedCert?.grade}</span>.
              </p>
            </div>

            <div className="w-full flex items-center justify-between border-t border-slate-800 pt-4 z-10 text-xs">
              <div className="text-left text-[11px] text-slate-400">
                <span>Diterbitkan: {selectedCert?.issueDate}</span>
                <div className="text-slate-500 text-[10px]">Verifikasi QR Code terintegrasi PKBN-RI</div>
              </div>

              <button
                onClick={() => window.print()}
                className="bg-amber-600 hover:bg-amber-500 text-white font-semibold px-4 py-2 rounded-xl flex items-center space-x-2 shadow-lg transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak / Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
