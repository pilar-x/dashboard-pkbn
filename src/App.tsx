import React, { useState } from "react";
import { ActiveTab, ProvinceData, UserSession, ProgramItem } from "./types";
import {
  initialNationalKPI,
  provinceList,
  initialPrograms,
  initialInstitutions,
  initialInstructors,
  initialCalendarEvents,
} from "./data/mockData";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { BerandaView } from "./components/views/BerandaView";
import { PendidikanView } from "./components/views/PendidikanView";
import { PekerjaanView } from "./components/views/PekerjaanView";
import { MasyarakatView } from "./components/views/MasyarakatView";
import { MonitoringView } from "./components/views/MonitoringView";
import { AnalisisView } from "./components/views/AnalisisView";
import { PelaporanView } from "./components/views/PelaporanView";
import { DataMasterView } from "./components/views/DataMasterView";
import { InputKodamView } from "./components/views/InputKodamView";
import { AiAssistantModal } from "./components/views/AiAssistantModal";
import { UploadModal } from "./components/modals/UploadModal";
import { NotificationDrawer, NotificationItem } from "./components/modals/NotificationDrawer";
import { ProvinceDetailModal } from "./components/modals/ProvinceDetailModal";
import { LoginModal } from "./components/modals/LoginModal";
import { LoginPage } from "./components/auth/LoginPage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("beranda");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProvince, setSelectedProvince] = useState<ProvinceData | null>(null);
  
  // Theme state (dark command center vs light government mode)
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // User session state
  const [userSession, setUserSession] = useState<UserSession>({
    role: "pusat",
    userName: "PABAN IV/PKBN STERAD",
  });

  // Modals state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [provinceModalData, setProvinceModalData] = useState<ProvinceData | null>(null);

  const handleLogin = (session: UserSession) => {
    setUserSession(session);
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
    if (session.role === "kodam") {
      setActiveTab("input_kodam");
    } else {
      setActiveTab("beranda");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // State data
  const [nationalKpi, setNationalKpi] = useState(initialNationalKPI);
  const [provinces, setProvinces] = useState(provinceList);
  const [programs, setPrograms] = useState(initialPrograms);
  const [institutions] = useState(initialInstitutions);
  const [instructors] = useState(initialInstructors);
  const [calendarEvents, setCalendarEvents] = useState(initialCalendarEvents);

  // Realtime system notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "N1",
      title: "Verifikasi Laporan Bulanan Jabar",
      desc: "Laporan PKBN Kodam III/Siliwangi telah disetujui oleh PABAN IV/PKBN.",
      time: "10 menit lalu",
      type: "success",
      unread: true,
    },
    {
      id: "N2",
      title: "Peringatan Batas Target Kampung PKBN",
      desc: "Wilayah Papua Keerom membutuhkan pengiriman instruktur tambahan.",
      time: "1 jam lalu",
      type: "warning",
      unread: true,
    },
    {
      id: "N3",
      title: "Pendaftaran Kampus UI & ITB",
      desc: "1.200 Mahasiswa Baru resmi terdaftar di Sistem Sertifikasi PKBN 2026.",
      time: "3 jam lalu",
      type: "info",
      unread: false,
    },
  ]);

  const handleAddProgram = (newProg: ProgramItem) => {
    // 1. Add to programs list
    setPrograms((prev) => [newProg, ...prev]);

    // 2. Update matching province KPI
    setProvinces((prev) =>
      prev.map((prov) => {
        if (
          prov.name.toLowerCase().includes(newProg.province.toLowerCase()) ||
          newProg.province.toLowerCase().includes(prov.name.toLowerCase())
        ) {
          return {
            ...prov,
            totalEvents: prov.totalEvents + 1,
            totalParticipants: prov.totalParticipants + newProg.participantCount,
            status: "Sangat Tinggi" as const,
          };
        }
        return prov;
      })
    );

    // 3. Add to Calendar Agenda Events
    const newCalEvent = {
      id: `CAL-${newProg.id}`,
      title: newProg.title,
      sector: newProg.sector,
      date: newProg.startDate || "2026-08-15",
      time: "08:00 - 16:00 WIB",
      location: `${newProg.regency}, ${newProg.province}`,
      province: newProg.province,
      status: (newProg.status === "Berlangsung"
        ? "Berlangsung"
        : newProg.status === "Selesai"
        ? "Selesai"
        : "Rencana") as any,
      capacity: newProg.targetCount || 300,
      registered: newProg.participantCount || 250,
    };
    setCalendarEvents((prev) => [newCalEvent, ...prev]);

    // 4. Send Realtime Notification to STERAD Pusat
    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: `Laporan Baru ${newProg.kodamOrigin || "Kodam"}`,
      desc: `Laporan '${newProg.title}' (${newProg.sector} - ${newProg.participantCount.toLocaleString(
        "id-ID"
      )} orang) di ${newProg.province} tersinkron otomatis ke Pusat STERAD.`,
      time: "Baru saja",
      type: "success",
      unread: true,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // 5. Recalculate National KPI
    setNationalKpi((prev) => ({
      ...prev,
      totalProgram: prev.totalProgram + 1,
      totalPeserta: prev.totalPeserta + newProg.participantCount,
    }));
  };

  const handleDeleteProgram = (id: string) => {
    setPrograms((prev) => prev.filter((p) => p.id !== id));
  };

  // Filtered programs based on search query
  const filteredPrograms = programs.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.province.toLowerCase().includes(q) ||
      p.regency.toLowerCase().includes(q) ||
      p.organizer.toLowerCase().includes(q) ||
      p.sector.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      (p.subCategory && p.subCategory.toLowerCase().includes(q)) ||
      (p.instructorName && p.instructorName.toLowerCase().includes(q)) ||
      (p.kodamOrigin && p.kodamOrigin.toLowerCase().includes(q))
    );
  });

  const handleSelectProvince = (prov: ProvinceData | null) => {
    setSelectedProvince(prov);
    if (prov) {
      setProvinceModalData(prov);
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className={`min-h-screen font-sans flex flex-col antialiased transition-colors duration-300 ${
      theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-slate-100 text-slate-900"
    }`}>
      {/* Top Navigation Bar */}
      <Header
        currentSession={userSession}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        onOpenAiAssistant={() => setIsAiModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        theme={theme}
        setTheme={setTheme}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        onOpenUpload={() => setIsUploadModalOpen(true)}
        unreadNotifCount={notifications.filter((n) => n.unread).length}
      />

      {/* Main Body Layout */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto">
        {/* Left Concept Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenAiAssistant={() => setIsAiModalOpen(true)}
          onLogout={handleLogout}
          theme={theme}
        />

        {/* View Content Area */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {searchQuery && (
            <div className={`mb-4 p-3 rounded-xl border flex items-center justify-between text-xs animate-fadeIn ${
              theme === "dark"
                ? "bg-amber-950/40 border-amber-800/80 text-amber-200"
                : "bg-amber-50 border-amber-300 text-amber-900 shadow-sm font-semibold"
            }`}>
              <div className="flex items-center space-x-2">
                <span className="font-bold font-mono uppercase bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40">
                  FILTER PENCARIAN AKTIF
                </span>
                <span>
                  Menampilkan hasil untuk: <strong>"{searchQuery}"</strong> ({filteredPrograms.length} kegiatan cocok)
                </span>
              </div>
              <button
                onClick={() => setSearchQuery("")}
                className="underline font-bold text-amber-400 hover:text-amber-300 ml-4 shrink-0"
              >
                Hapus Filter
              </button>
            </div>
          )}

          {activeTab === "beranda" && (
            <BerandaView
              kpi={nationalKpi}
              provinces={provinces}
              programs={filteredPrograms}
              events={calendarEvents}
              selectedProvince={selectedProvince}
              onSelectProvince={handleSelectProvince}
              onNavigate={setActiveTab}
              onOpenAiAssistant={() => setIsAiModalOpen(true)}
              theme={theme}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === "pendidikan" && (
            <PendidikanView
              programs={filteredPrograms}
              institutions={institutions}
              instructors={instructors}
              events={calendarEvents}
              theme={theme}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === "pekerjaan" && (
            <PekerjaanView
              programs={filteredPrograms}
              institutions={institutions}
              theme={theme}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === "masyarakat" && (
            <MasyarakatView
              programs={filteredPrograms}
              institutions={institutions}
              theme={theme}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === "monitoring" && (
            <MonitoringView
              programs={filteredPrograms}
              provinces={provinces}
              selectedProvince={selectedProvince}
              onSelectProvince={handleSelectProvince}
              theme={theme}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === "analisis" && <AnalisisView provinces={provinces} theme={theme} />}

          {activeTab === "pelaporan" && (
            <PelaporanView kpi={nationalKpi} programs={filteredPrograms} theme={theme} />
          )}

          {activeTab === "input_kodam" && (
            <InputKodamView
              programs={programs}
              onAddProgram={handleAddProgram}
              onDeleteProgram={handleDeleteProgram}
              theme={theme}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === "master" && (
            <DataMasterView provinces={provinces} institutions={institutions} theme={theme} />
          )}
        </main>
      </div>

      {/* AI Assistant Modal */}
      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        theme={theme}
      />

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />

      {/* Realtime Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onMarkAllRead={() => setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))}
        onClearAll={() => setNotifications([])}
      />

      {/* Province Map Click Detail Modal */}
      <ProvinceDetailModal
        province={provinceModalData}
        onClose={() => setProvinceModalData(null)}
        onOpenUpload={() => {
          setProvinceModalData(null);
          setIsUploadModalOpen(true);
        }}
      />

      {/* Login / Role Switcher Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentSession={userSession}
        onLogin={handleLogin}
        theme={theme}
      />
    </div>
  );
}
