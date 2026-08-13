import React from "react";
import { ActiveTab } from "../types";
import {
  LayoutDashboard,
  GraduationCap,
  Briefcase,
  Users,
  Activity,
  BarChart3,
  FileSpreadsheet,
  Database,
  Sparkles,
  Award,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenAiAssistant: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAiAssistant,
}) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: "beranda",
      label: "1. Beranda",
      icon: <LayoutDashboard className="w-5 h-5" />,
      desc: "Ringkasan Statistik & Peta",
    },
    {
      id: "pendidikan",
      label: "2. Lingkup Pendidikan",
      icon: <GraduationCap className="w-5 h-5" />,
      desc: "Sekolah, PT & Sertifikat",
    },
    {
      id: "pekerjaan",
      label: "3. Lingkup Pekerjaan",
      icon: <Briefcase className="w-5 h-5" />,
      desc: "Instansi Gov, BUMN & Swasta",
    },
    {
      id: "masyarakat",
      label: "4. Lingkup Masyarakat",
      icon: <Users className="w-5 h-5" />,
      desc: "Ormas, Relawan & Kampung PKBN",
    },
    {
      id: "monitoring",
      label: "5. Monitoring",
      icon: <Activity className="w-5 h-5" />,
      desc: "Real-time Feed & Peta Sebaran",
    },
    {
      id: "analisis",
      label: "6. Analisis",
      icon: <BarChart3 className="w-5 h-5" />,
      desc: "Grafik Tren & SWOT AI",
    },
    {
      id: "pelaporan",
      label: "7. Pelaporan",
      icon: <FileSpreadsheet className="w-5 h-5" />,
      desc: "Laporan & Ekspor Cetak",
    },
    {
      id: "master",
      label: "8. Data Master",
      icon: <Database className="w-5 h-5" />,
      desc: "Wilayah, Instansi & User",
    },
  ];

  return (
    <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 shrink-0 flex flex-col justify-between py-4 text-slate-300">
      <div className="px-3 space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold tracking-wider uppercase text-slate-400 font-mono">
          KONSEP MODUL DASHBOARD
        </div>

        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all group ${
                isActive
                  ? "bg-red-900/60 text-white font-semibold border border-red-700/60 shadow-lg shadow-red-950/40"
                  : "hover:bg-slate-800/80 hover:text-slate-100 text-slate-400"
              }`}
            >
              <div className="flex items-center space-x-3 truncate">
                <span
                  className={`${
                    isActive ? "text-yellow-400" : "text-slate-400 group-hover:text-slate-200"
                  } transition-colors`}
                >
                  {item.icon}
                </span>
                <div className="truncate">
                  <div className="text-xs font-medium leading-snug truncate">
                    {item.label}
                  </div>
                  <div
                    className={`text-[10px] truncate ${
                      isActive ? "text-red-200" : "text-slate-500"
                    }`}
                  >
                    {item.desc}
                  </div>
                </div>
              </div>
              <ChevronRight
                className={`w-4 h-4 shrink-0 transition-transform ${
                  isActive ? "text-yellow-400 translate-x-0.5" : "text-slate-600 opacity-0 group-hover:opacity-100"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* AI Assistant Banner at bottom of sidebar */}
      <div className="p-3 mx-3 mt-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 shadow-md">
        <div className="flex items-center space-x-2 text-yellow-400 mb-1.5">
          <Sparkles className="w-4 h-4 animate-spin-slow" />
          <span className="text-xs font-bold tracking-wide">Konsultan AI PKBN</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
          Tanyakan regulasi UU No. 23/2019, penyusunan modul, atau analisis SWOT instansi Anda.
        </p>
        <button
          onClick={onOpenAiAssistant}
          className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center space-x-1.5 transition-all shadow-md active:scale-95"
        >
          <span>Mulai Konsultasi AI</span>
        </button>
      </div>
    </aside>
  );
};
