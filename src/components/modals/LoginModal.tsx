import React, { useState } from "react";
import { UserSession } from "../../types";
import { listKodam } from "../views/InputKodamView";
import { KartikaEkaPaksiLogo } from "../KartikaEkaPaksiLogo";
import {
  Shield,
  Lock,
  User,
  Building2,
  CheckCircle2,
  ArrowRight,
  KeyRound,
  Sparkles,
  ChevronRight,
  Globe,
  Radio,
  X,
} from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose?: () => void;
  currentSession: UserSession;
  onLogin: (session: UserSession) => void;
  theme?: "dark" | "light";
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentSession,
  onLogin,
  theme = "dark",
}) => {
  if (!isOpen) return null;

  const isDark = theme === "dark";

  const [selectedRole, setSelectedRole] = useState<"pusat" | "kodam">("kodam");
  const [selectedKodamId, setSelectedKodamId] = useState<string>("kodam-3");
  const [userName, setUserName] = useState<string>("Operator Sterdam");
  const [password, setPassword] = useState<string>("••••••••");

  const selectedKodam = listKodam.find((k) => k.id === selectedKodamId) || listKodam[0];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedRole === "pusat") {
      onLogin({
        role: "pusat",
        userName: userName.trim() || "PABAN IV/PKBN STERAD",
      });
    } else {
      onLogin({
        role: "kodam",
        userName: userName.trim() || `Operator ${selectedKodam.name}`,
        kodamId: selectedKodam.id,
        kodamName: selectedKodam.name,
        province: selectedKodam.province,
      });
    }

    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className={`relative w-full max-w-xl max-h-[92vh] flex flex-col rounded-2xl sm:rounded-3xl shadow-2xl border overflow-hidden my-auto transition-colors ${
        isDark ? "bg-slate-900 border-slate-700/80 text-white" : "bg-white border-slate-200 text-slate-900"
      }`}>
        {/* Header Banner - TNI AD Emerald & Gold Theme */}
        <div className="relative bg-gradient-to-r from-emerald-950 via-slate-900 to-green-950 p-4 sm:p-5 border-b border-emerald-800/60 text-white shrink-0">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Tutup Modal"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center space-x-3 sm:space-x-4">
            <KartikaEkaPaksiLogo className="w-11 h-12 sm:w-14 sm:h-16 shrink-0 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" />
            <div className="pr-6">
              <div className="inline-flex items-center space-x-1.5 bg-emerald-900/80 border border-emerald-600 text-yellow-300 text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-widest mb-1">
                <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
                <span>PORTAL AUTENTIKASI RESMI</span>
              </div>
              <h2 className="text-base sm:text-xl font-bold font-serif text-white tracking-wide leading-tight">
                Sistem Informasi & Dashboard PKBN
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
                SPABAN IV/PKBN STERAD — Markas Besar TNI Angkatan Darat
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body / Login Form */}
        <form onSubmit={handleFormSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1">
          {/* Role Choice */}
          <div>
            <label className={`text-xs font-bold font-mono uppercase tracking-wider block mb-2 ${
              isDark ? "text-amber-400" : "text-emerald-800"
            }`}>
              Pilih Tingkat Akses / Otorisasi *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {/* Option 1: PUSAT */}
              <button
                type="button"
                onClick={() => setSelectedRole("pusat")}
                className={`p-3 sm:p-3.5 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                  selectedRole === "pusat"
                    ? isDark
                      ? "bg-emerald-950/90 border-emerald-500 ring-2 ring-emerald-500/50 text-white shadow-lg shadow-emerald-950/50"
                      : "bg-emerald-50 border-emerald-600 ring-2 ring-emerald-600/40 text-slate-900 shadow-md"
                    : isDark
                      ? "bg-slate-800/40 border-slate-700/80 text-slate-400 hover:bg-slate-800/80"
                      : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200/80"
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${
                  selectedRole === "pusat"
                    ? "bg-emerald-700 text-yellow-300"
                    : isDark ? "bg-slate-700 text-slate-400" : "bg-slate-200 text-slate-500"
                }`}>
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className={`font-bold text-xs flex items-center space-x-1 ${
                    selectedRole === "pusat" ? (isDark ? "text-white" : "text-emerald-900") : (isDark ? "text-slate-200" : "text-slate-800")
                  }`}>
                    <span>PUSAT / STERAD</span>
                  </div>
                  <p className={`text-[11px] mt-0.5 leading-snug ${
                    isDark ? "text-slate-400" : "text-slate-600"
                  }`}>
                    Akses Komando Nasional SPABAN IV/PKBN (Super Admin)
                  </p>
                </div>
              </button>

              {/* Option 2: KODAM */}
              <button
                type="button"
                onClick={() => setSelectedRole("kodam")}
                className={`p-3 sm:p-3.5 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                  selectedRole === "kodam"
                    ? isDark
                      ? "bg-amber-950/90 border-amber-500 ring-2 ring-amber-500/50 text-white shadow-lg shadow-amber-950/50"
                      : "bg-amber-50 border-amber-500 ring-2 ring-amber-500/40 text-slate-900 shadow-md"
                    : isDark
                      ? "bg-slate-800/40 border-slate-700/80 text-slate-400 hover:bg-slate-800/80"
                      : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200/80"
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${
                  selectedRole === "kodam"
                    ? "bg-amber-600 text-slate-950"
                    : isDark ? "bg-slate-700 text-slate-400" : "bg-slate-200 text-slate-500"
                }`}>
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className={`font-bold text-xs flex items-center space-x-1 ${
                    selectedRole === "kodam" ? (isDark ? "text-white" : "text-amber-900") : (isDark ? "text-slate-200" : "text-slate-800")
                  }`}>
                    <span>OPERATOR KODAM</span>
                  </div>
                  <p className={`text-[11px] mt-0.5 leading-snug ${
                    isDark ? "text-slate-400" : "text-slate-600"
                  }`}>
                    Akses Khusus Input & Kelola Data Wilayah Kodam
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Conditional Dropdown for Kodam */}
          {selectedRole === "kodam" && (
            <div className={`p-3.5 sm:p-4 border rounded-2xl space-y-2.5 sm:space-y-3 animate-fadeIn ${
              isDark
                ? "bg-amber-950/30 border-amber-800/60"
                : "bg-amber-50/60 border-amber-200"
            }`}>
              <div className="flex items-center justify-between">
                <label className={`text-xs font-bold font-mono flex items-center space-x-2 ${
                  isDark ? "text-amber-300" : "text-amber-900"
                }`}>
                  <Building2 className="w-4 h-4 text-amber-500" />
                  <span>PILIH KOMANDO DAERAH MILITER (KODAM)</span>
                </label>
                <span className="text-[10px] text-amber-600 dark:text-amber-400/80 font-mono">15 Kodam</span>
              </div>

              <select
                value={selectedKodamId}
                onChange={(e) => setSelectedKodamId(e.target.value)}
                className={`w-full text-xs font-bold font-mono px-3.5 py-2.5 rounded-xl border focus:outline-none cursor-pointer shadow-inner ${
                  isDark
                    ? "bg-slate-900 text-yellow-300 border-amber-700/80 focus:border-amber-400"
                    : "bg-white text-slate-900 border-amber-300 focus:border-amber-600"
                }`}
              >
                {listKodam.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.name} — Wilayah {k.province} ({k.capital})
                  </option>
                ))}
              </select>

              <div className={`text-[11px] flex items-center justify-between px-3 py-2 rounded-lg border ${
                isDark
                  ? "bg-slate-900/80 text-slate-300 border-slate-800"
                  : "bg-white text-slate-700 border-amber-200"
              }`}>
                <span>Wilayah: <strong className="text-amber-600 dark:text-amber-400 font-mono">{selectedKodam.province}</strong></span>
                <span>Ibu Kota: <strong className="font-mono">{selectedKodam.capital}</strong></span>
              </div>
            </div>
          )}

          {/* User & Credential Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={`text-xs font-semibold mb-1 block ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}>
                Nama Pengguna / Petugas
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Misal: Sertu Budi / Mayor Heru"
                  className={`w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none font-mono ${
                    isDark
                      ? "bg-slate-800/90 text-white border-slate-700 focus:border-emerald-500"
                      : "bg-slate-50 text-slate-900 border-slate-300 focus:border-emerald-600"
                  }`}
                  required
                />
              </div>
            </div>

            <div>
              <label className={`text-xs font-semibold mb-1 block ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}>
                Sandi Keamanan / Kunci
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border focus:outline-none font-mono ${
                    isDark
                      ? "bg-slate-800/90 text-white border-slate-700 focus:border-emerald-500"
                      : "bg-slate-50 text-slate-900 border-slate-300 focus:border-emerald-600"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 sm:py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-700 via-emerald-800 to-green-900 hover:from-emerald-600 hover:to-green-800 text-white font-bold text-xs tracking-wider uppercase shadow-xl shadow-emerald-950/50 border border-emerald-500/80 flex items-center justify-center space-x-2 transition-all active:scale-[0.98]"
            >
              <CheckCircle2 className="w-4 h-4 text-yellow-300" />
              <span>MASUK SEBAGAI {selectedRole === "pusat" ? "PABAN IV / STERAD PUSAT" : selectedKodam.name.toUpperCase()}</span>
              <ArrowRight className="w-4 h-4 text-yellow-300" />
            </button>
          </div>
        </form>

        {/* Footer info */}
        <div className={`px-4 sm:px-6 py-2.5 sm:py-3 border-t text-[11px] flex items-center justify-between font-mono shrink-0 ${
          isDark
            ? "bg-slate-950 border-slate-800 text-slate-400"
            : "bg-slate-100 border-slate-200 text-slate-600"
        }`}>
          <span>SPABAN IV/PKBN STERAD © 2026</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Beroperasi Normal</span>
        </div>
      </div>
    </div>
  );
};
