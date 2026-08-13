import React, { useState } from "react";
import { ActiveTab, ProvinceData } from "./types";
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
import { AiAssistantModal } from "./components/views/AiAssistantModal";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("beranda");
  const [activeRole, setActiveRole] = useState<string>("PABAN IV/PKBN");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProvince, setSelectedProvince] = useState<ProvinceData | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);

  // State data
  const [nationalKpi] = useState(initialNationalKPI);
  const [provinces] = useState(provinceList);
  const [programs] = useState(initialPrograms);
  const [institutions] = useState(initialInstitutions);
  const [instructors] = useState(initialInstructors);
  const [calendarEvents] = useState(initialCalendarEvents);

  // Filtered programs based on search query
  const filteredPrograms = programs.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.organizer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased">
      {/* Top Navigation Bar */}
      <Header
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        onOpenAiAssistant={() => setIsAiModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Body Layout */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto">
        {/* Left Concept Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenAiAssistant={() => setIsAiModalOpen(true)}
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
              onSelectProvince={setSelectedProvince}
              onNavigate={setActiveTab}
              onOpenAiAssistant={() => setIsAiModalOpen(true)}
            />
          )}

          {activeTab === "pendidikan" && (
            <PendidikanView
              programs={filteredPrograms}
              institutions={institutions}
              instructors={instructors}
              events={calendarEvents}
            />
          )}

          {activeTab === "pekerjaan" && (
            <PekerjaanView programs={filteredPrograms} institutions={institutions} />
          )}

          {activeTab === "masyarakat" && (
            <MasyarakatView programs={filteredPrograms} institutions={institutions} />
          )}

          {activeTab === "monitoring" && (
            <MonitoringView
              programs={filteredPrograms}
              provinces={provinces}
              selectedProvince={selectedProvince}
              onSelectProvince={setSelectedProvince}
            />
          )}

          {activeTab === "analisis" && <AnalisisView provinces={provinces} />}

          {activeTab === "pelaporan" && (
            <PelaporanView kpi={nationalKpi} programs={filteredPrograms} />
          )}

          {activeTab === "master" && (
            <DataMasterView provinces={provinces} institutions={institutions} />
          )}
        </main>
      </div>

      {/* AI Assistant Modal */}
      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
    </div>
  );
}
