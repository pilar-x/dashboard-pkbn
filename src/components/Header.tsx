import React from "react";
import { UserSession } from "../types";
import {
  Shield,
  Bell,
  Search,
  Sparkles,
  Sun,
  Moon,
  Upload,
  Building2,
  Globe,
  RefreshCw,
  LogOut,
  X,
} from "lucide-react";

interface HeaderProps {
  currentSession: UserSession;
  onOpenLoginModal: () => void;
  onLogout: () => void;
  onOpenAiAssistant: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
  onOpenNotifications: () => void;
  onOpenUpload: () => void;
  unreadNotifCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentSession,
  onOpenLoginModal,
  onLogout,
  onOpenAiAssistant,
  searchQuery,
  setSearchQuery,
  theme,
  setTheme,
  onOpenNotifications,
  onOpenUpload,
  unreadNotifCount = 2,
}) => {

  return (
    <header className={`${theme === "dark" ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"} border-b sticky top-0 z-30 shadow-md transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand Title */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-900 flex items-center justify-center shadow-lg shadow-emerald-950/40 border border-emerald-500/30">
              <Shield className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className={`font-bold text-lg tracking-tight font-serif ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  DASHBOARD PKBN
                </span>
                <span className="bg-emerald-950/80 text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-emerald-800/60 uppercase tracking-wider">
                  SPABAN IV/PKBN STERAD
                </span>
              </div>
              <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-500"} hidden sm:block`}>
                Pembinaan Kesadaran Bela Negara Republik Indonesia
              </p>
            </div>
          </div>

          {/* Quick Search */}
          <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md mx-1 sm:mx-4">
            <div className="relative flex items-center">
              <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`} />
              <input
                type="text"
                placeholder="Cari program, sekolah, instansi, ormas, atau wilayah..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full text-xs pl-9 pr-8 py-2 rounded-xl border focus:outline-none focus:border-emerald-500 transition-all ${
                  theme === "dark"
                    ? "bg-slate-800/90 text-slate-200 border-slate-700/80 placeholder-slate-500"
                    : "bg-slate-100 text-slate-800 border-slate-300 placeholder-slate-400"
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
                  title="Hapus Pencarian"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Upload Button */}
            <button
              onClick={onOpenUpload}
              className={`p-2 rounded-lg border transition-colors hidden sm:flex items-center space-x-1 text-xs font-semibold ${
                theme === "dark"
                  ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300"
              }`}
              title="Unggah Foto atau Dokumen PKBN"
            >
              <Upload className="w-4 h-4 text-emerald-500" />
              <span className="hidden md:inline">Unggah</span>
            </button>

            {/* Theme Toggle (Sun / Moon) */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`p-2 rounded-lg border transition-colors ${
                theme === "dark"
                  ? "bg-slate-800 hover:bg-slate-700 text-yellow-400 border-slate-700"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300"
              }`}
              title={theme === "dark" ? "Ganti ke Light Mode" : "Ganti ke Dark Command Center Mode"}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* AI Assistant Button */}
            <button
              onClick={onOpenAiAssistant}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-emerald-700 to-green-900 hover:from-emerald-600 hover:to-green-800 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-md hover:shadow-emerald-950/40 transition-all active:scale-95"
              title="Tanya Asisten AI PKBN / Kurikulum / SWOT"
            >
              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
              <span className="hidden sm:inline">Asisten AI</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className={`p-2 rounded-lg border transition-colors relative ${
                theme === "dark"
                  ? "text-slate-400 hover:text-white hover:bg-slate-800 border-slate-800"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200"
              }`}
              title="Notifikasi System Realtime"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-slate-950 font-bold font-mono text-[10px] w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-slate-900 animate-pulse">
                  {unreadNotifCount}
                </span>
              )}
            </button>

            {/* User Login Badge & Switch Account Button */}
            <button
              onClick={onOpenLoginModal}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all shadow-sm ${
                currentSession.role === "kodam"
                  ? theme === "dark"
                    ? "bg-amber-950/90 border-amber-500 text-amber-300 hover:bg-amber-900"
                    : "bg-amber-50 border-amber-400 text-amber-900 hover:bg-amber-100 font-bold"
                  : theme === "dark"
                  ? "bg-emerald-950/90 border-emerald-500 text-emerald-200 hover:bg-emerald-900"
                  : "bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100 font-bold"
              }`}
              title="Klik untuk ganti akun login (Pusat / Kodam)"
            >
              {currentSession.role === "kodam" ? (
                <Building2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              ) : (
                <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              )}

              <div className="text-left hidden sm:block leading-tight">
                <div className="font-bold text-[11px] truncate max-w-[140px]">
                  {currentSession.role === "kodam"
                    ? currentSession.kodamName || "Operator Kodam"
                    : "PABAN IV/PKBN (PUSAT)"}
                </div>
                <div className={`text-[9px] font-mono ${theme === "dark" ? "text-slate-300/80" : "text-slate-600"}`}>
                  Ganti Akun
                </div>
              </div>

              <RefreshCw className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
            </button>

            {/* Exit Dashboard Button */}
            <button
              onClick={onLogout}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all shadow-sm active:scale-95 group ${
                theme === "dark"
                  ? "bg-emerald-950/50 hover:bg-emerald-800 text-emerald-300 hover:text-white border-emerald-700/60 hover:border-emerald-500"
                  : "bg-emerald-50 hover:bg-emerald-700 text-emerald-800 hover:text-white border-emerald-300 hover:border-emerald-700 font-bold"
              }`}
              title="Keluar / Exit Dashboard ke Menu Login"
            >
              <LogOut className="w-4 h-4 text-emerald-500 dark:text-emerald-400 group-hover:text-white transition-colors" />
              <span className="hidden md:inline">Exit Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
