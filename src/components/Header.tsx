import React from "react";
import {
  Shield,
  Bell,
  Search,
  Sparkles,
  UserCheck,
  ChevronDown,
  Building2,
  Calendar,
} from "lucide-react";

interface HeaderProps {
  activeRole: string;
  setActiveRole: (role: string) => void;
  onOpenAiAssistant: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeRole,
  setActiveRole,
  onOpenAiAssistant,
  searchQuery,
  setSearchQuery,
}) => {
  const [roleDropdownOpen, setRoleDropdownOpen] = React.useState(false);

  const roles = [
    "Admin Pusat (Kemenhan)",
    "Admin Provinsi (Kesbangpol)",
    "Instruktur Utama PKBN",
    "Operator Instansi / Kampus",
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand Title */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 via-red-700 to-red-900 flex items-center justify-center shadow-lg shadow-red-900/30 border border-red-500/30">
              <Shield className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight text-white font-serif">
                  DASHBOARD PKBN
                </span>
                <span className="bg-red-950/80 text-red-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-red-800/60 uppercase tracking-wider">
                  RI - KEMENHAN
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Pembinaan Kesadaran Bela Negara Republik Indonesia
              </p>
            </div>
          </div>

          {/* Quick Search */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari program, sekolah, instansi, ormas, atau wilayah..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/90 text-slate-200 text-sm pl-9 pr-4 py-2 rounded-lg border border-slate-700/80 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder-slate-500 transition-all"
              />
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* AI Assistant Button */}
            <button
              onClick={onOpenAiAssistant}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-md hover:shadow-red-900/40 transition-all active:scale-95"
              title="Tanya Asisten AI PKBN / Kurikulum / SWOT"
            >
              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
              <span className="hidden sm:inline">Asisten AI PKBN</span>
            </button>

            {/* Notification Bell */}
            <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-slate-900"></span>
            </button>

            {/* User Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700/80 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-colors"
              >
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span className="hidden lg:inline max-w-[130px] truncate">
                  {activeRole}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-800 rounded-xl shadow-xl border border-slate-700 py-1.5 z-50 text-xs">
                  <div className="px-3 py-1.5 border-b border-slate-700 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Pilih Hak Akses Simulasi
                  </div>
                  {roles.map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setActiveRole(r);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 hover:bg-slate-700/80 transition-colors flex items-center justify-between ${
                        activeRole === r
                          ? "text-red-400 font-semibold bg-slate-700/40"
                          : "text-slate-300"
                      }`}
                    >
                      <span>{r}</span>
                      {activeRole === r && (
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
