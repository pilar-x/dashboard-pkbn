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
import { NotificationDrawer } from "./components/modals/NotificationDrawer";
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
  const [provinces] = useState(provinceList);
  const [programs, setPrograms] = useState(initialPrograms);
  const [institutions] = useState(initialInstitutions);
  const [instructors] = useState(initialInstructors);
  const [calendarEvents] = useState(initialCalendarEvents);

  const handleAddProgram = (newProg: ProgramItem) => {
    setPrograms((prev) => [newProg, ...prev]);
    // Recalculate KPI
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
  const filteredPrograms = programs.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.organizer.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            />
          )}

          {activeTab === "pendidikan" && (
            <PendidikanView
              programs={filteredPrograms}
              institutions={institutions}
              instructors={instructors}
              events={calendarEvents}
              theme={theme}
            />
          )}

          {activeTab === "pekerjaan" && (
            <PekerjaanView programs={filteredPrograms} institutions={institutions} theme={theme} />
          )}

          {activeTab === "masyarakat" && (
            <MasyarakatView programs={filteredPrograms} institutions={institutions} theme={theme} />
          )}

          {activeTab === "monitoring" && (
            <MonitoringView
              programs={filteredPrograms}
              provinces={provinces}
              selectedProvince={selectedProvince}
              onSelectProvince={handleSelectProvince}
              theme={theme}
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
