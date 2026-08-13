import React from "react";
import { UserSession } from "../types";
import { KartikaEkaPaksiLogo } from "./KartikaEkaPaksiLogo";
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
  Menu,
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
  isMobileMenuOpen?: boolean;
  onToggleMobileMenu?: () => void;
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
  isMobileMenuOpen = false,
  onToggleMobileMenu,
}) => {
  return (
    <header className={`${theme === "dark" ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"} border-b sticky top-0 z-30 shadow-md transition-colors w-full overflow-x-hidden`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-1 sm:gap-3">
          {/* Left: Mobile Hamburger Toggle + Logo */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
            {/* Mobile Menu Button */}
            {onToggleMobileMenu && (
              <button
                onClick={onToggleMobileMenu}
                className={`p-1.5 rounded-lg border md:hidden transition-colors ${
                  theme === "dark"
                    ? "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700"
                    : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
                }`}
                title="Buka Menu Navigasi"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-amber-400" />
                ) : (
                  <Menu className="w-5 h-5 text-emerald-400" />
                )}
              </button>
            )}

            <KartikaEkaPaksiLogo className="h-9 w-auto sm:h-11 shrink-0 filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]" />
            <div className="truncate max-w-[100px] xs:max-w-[140px] sm:max-w-none">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <span className={`font-bold text-xs sm:text-base lg:text-lg tracking-tight font-serif truncate ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  DASHBOARD PKBN
                </span>
                <span className="hidden lg:inline-block bg-emerald-950/80 text-emerald-300 text-[9px] sm:text-[10px] font-semibold px-1.5 sm:px-2 py-0.5 rounded border border-emerald-800/60 uppercase tracking-wider shrink-0">
                  SPABAN IV/PKBN STERAD
                </span>
              </div>
              <p className={`text-[11px] ${theme === "dark" ? "text-slate-400" : "text-slate-500"} hidden xl:block`}>
                Pembinaan Kesadaran Bela Negara Republik Indonesia
              </p>
            </div>
          </div>

          {/* Quick Search */}
          <div className="flex-1 min-w-[60px] max-w-[130px] sm:max-w-xs md:max-w-sm mx-1">
            <div className="relative flex items-center">
              <Search className={`w-3.5 h-3.5 sm:w-4 sm:h-4 absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`} />
              <input
                type="text"
                placeholder="Cari..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full text-[11px] sm:text-xs pl-6 sm:pl-9 pr-5 sm:pr-8 py-1 sm:py-2 rounded-xl border focus:outline-none focus:border-emerald-500 transition-all ${
                  theme === "dark"
                    ? "bg-slate-800/90 text-slate-200 border-slate-700/80 placeholder-slate-500"
                    : "bg-slate-100 text-slate-800 border-slate-300 placeholder-slate-400"
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-700/50 text-slate-400 hover:text-white"
                  title="Hapus Pencarian"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
            {/* Upload Button */}
            <button
              onClick={onOpenUpload}
              className={`p-1.5 sm:p-2 rounded-lg border transition-colors hidden lg:flex items-center space-x-1 text-xs font-semibold ${
                theme === "dark"
                  ? "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300"
              }`}
              title="Unggah Foto atau Dokumen PKBN"
            >
              <Upload className="w-4 h-4 text-emerald-500" />
              <span className="hidden xl:inline">Unggah</span>
            </button>

            {/* Theme Toggle (Sun / Moon) */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`p-1.5 sm:p-2 rounded-lg border transition-colors ${
                theme === "dark"
                  ? "bg-slate-800 hover:bg-slate-700 text-yellow-400 border-slate-700"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300"
              }`}
              title={theme === "dark" ? "Ganti ke Light Mode" : "Ganti ke Dark Mode"}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* AI Assistant Button */}
            <button
              onClick={onOpenAiAssistant}
              className="flex items-center space-x-1 bg-gradient-to-r from-emerald-700 to-green-900 hover:from-emerald-600 hover:to-green-800 text-white text-xs font-semibold p-1.5 sm:px-3 sm:py-2 rounded-lg shadow-md hover:shadow-emerald-950/40 transition-all active:scale-95 shrink-0"
              title="Tanya Asisten AI PKBN"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300 animate-pulse shrink-0" />
              <span className="hidden xl:inline">Asisten AI</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className={`p-1.5 sm:p-2 rounded-lg border transition-colors relative ${
                theme === "dark"
                  ? "text-slate-400 hover:text-white hover:bg-slate-800 border-slate-800"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200"
              }`}
              title="Notifikasi System Realtime"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              {unreadNotifCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-slate-950 font-bold font-mono text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center ring-2 ring-slate-900 animate-pulse">
                  {unreadNotifCount}
                </span>
              )}
            </button>

            {/* User Login Badge & Switch Account Button */}
            <button
              onClick={onOpenLoginModal}
              className={`flex items-center space-x-1 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-semibold transition-all shadow-sm ${
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

              <div className="text-left hidden xl:block leading-tight">
                <div className="font-bold text-[11px] truncate max-w-[130px]">
                  {currentSession.role === "kodam"
                    ? currentSession.kodamName || "Operator Kodam"
                    : "PABAN IV/PKBN (PUSAT)"}
                </div>
                <div className={`text-[9px] font-mono ${theme === "dark" ? "text-slate-300/80" : "text-slate-600"}`}>
                  Ganti Akun
                </div>
              </div>

              <RefreshCw className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0 hidden sm:inline" />
            </button>

            {/* Exit Dashboard Button */}
            <button
              onClick={onLogout}
              className={`hidden md:flex items-center space-x-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border text-xs font-bold transition-all shadow-sm active:scale-95 group ${
                theme === "dark"
                  ? "bg-emerald-950/50 hover:bg-emerald-800 text-emerald-300 hover:text-white border-emerald-700/60 hover:border-emerald-500"
                  : "bg-emerald-50 hover:bg-emerald-700 text-emerald-800 hover:text-white border-emerald-300 hover:border-emerald-700 font-bold"
              }`}
              title="Keluar / Exit Dashboard ke Menu Login"
            >
              <LogOut className="w-4 h-4 text-emerald-500 dark:text-emerald-400 group-hover:text-white transition-colors shrink-0" />
              <span className="hidden xl:inline">Exit</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
