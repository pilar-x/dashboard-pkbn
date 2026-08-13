import React, { useState } from "react";
import { UserSession } from "../../types";
import { listKodam } from "../views/InputKodamView";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden text-white">
        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-red-950 via-slate-900 to-red-950 p-6 border-b border-slate-800">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-red-900 border-2 border-yellow-500/80 flex items-center justify-center text-white shadow-xl shadow-red-950 shrink-0">
              <Shield className="w-8 h-8 text-yellow-300" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-2 bg-red-900/80 border border-red-700 text-yellow-300 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-widest mb-1">
                <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
                <span>PORTAL AUTENTIKASI RESMI</span>
              </div>
              <h2 className="text-xl font-bold font-serif text-white tracking-wide leading-tight">
                Sistem Informasi & Dashboard PKBN
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                SPABAN IV/PKBN STERAD — Markas Besar TNI Angkatan Darat
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body / Login Form */}
        <form onSubmit={handleFormSubmit} className="p-6 space-y-5">
          {/* Role Choice */}
          <div>
            <label className="text-xs font-bold text-amber-400 font-mono uppercase tracking-wider block mb-2">
              Pilih Tingkat Akses / Otorisasi *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Option 1: PUSAT */}
              <button
                type="button"
                onClick={() => setSelectedRole("pusat")}
                className={`p-3.5 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                  selectedRole === "pusat"
                    ? "bg-red-950/90 border-red-500 ring-2 ring-red-500/50 text-white shadow-lg shadow-red-950/50"
                    : "bg-slate-800/40 border-slate-700/80 text-slate-400 hover:bg-slate-800/80"
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${
                  selectedRole === "pusat" ? "bg-red-800 text-yellow-300" : "bg-slate-700 text-slate-400"
                }`}>
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs text-white flex items-center space-x-1">
                    <span>PUSAT / STERAD</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    Akses Komando Nasional SPABAN IV/PKBN (Super Admin)
                  </p>
                </div>
              </button>

              {/* Option 2: KODAM */}
              <button
                type="button"
                onClick={() => setSelectedRole("kodam")}
                className={`p-3.5 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                  selectedRole === "kodam"
                    ? "bg-amber-950/90 border-amber-500 ring-2 ring-amber-500/50 text-white shadow-lg shadow-amber-950/50"
                    : "bg-slate-800/40 border-slate-700/80 text-slate-400 hover:bg-slate-800/80"
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${
                  selectedRole === "kodam" ? "bg-amber-600 text-slate-950" : "bg-slate-700 text-slate-400"
                }`}>
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs text-white flex items-center space-x-1">
                    <span>OPERATOR KODAM</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    Akses Khusus Input & Kelola Data Wilayah Kodam
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Conditional Dropdown for Kodam */}
          {selectedRole === "kodam" && (
            <div className="p-4 bg-amber-950/30 border border-amber-800/60 rounded-2xl space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-amber-300 font-mono flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <span>PILIH KOMANDO DAERAH MILITER (KODAM)</span>
                </label>
                <span className="text-[10px] text-amber-400/80 font-mono">15 Kodam Se-Indonesia</span>
              </div>

              <select
                value={selectedKodamId}
                onChange={(e) => setSelectedKodamId(e.target.value)}
                className="w-full bg-slate-900 text-yellow-300 text-xs font-bold font-mono px-3.5 py-2.5 rounded-xl border border-amber-700/80 focus:outline-none focus:border-amber-400 cursor-pointer shadow-inner"
              >
                {listKodam.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.name} — Wilayah {k.province} ({k.capital})
                  </option>
                ))}
              </select>

              <div className="text-[11px] text-slate-300 flex items-center justify-between bg-slate-900/80 px-3 py-2 rounded-lg border border-slate-800">
                <span>Wilayah Terdaftar: <strong className="text-amber-400 font-mono">{selectedKodam.province}</strong></span>
                <span>Ibu Kota: <strong className="text-slate-200 font-mono">{selectedKodam.capital}</strong></span>
              </div>
            </div>
          )}

          {/* User & Credential Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">
                Nama Pengguna / Petugas
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Misal: Sertu Budi / Mayor Heru"
                  className="w-full bg-slate-800/90 text-white text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-red-500 font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1 block">
                Sandi Keamanan / Kunci
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-800/90 text-white text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-red-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-700 via-red-800 to-red-900 hover:from-red-600 hover:to-red-800 text-white font-bold text-xs tracking-wider uppercase shadow-xl shadow-red-950/80 border border-red-500/80 flex items-center justify-center space-x-2 transition-all active:scale-[0.98]"
            >
              <CheckCircle2 className="w-4 h-4 text-yellow-300" />
              <span>MASUK SEBAGAI {selectedRole === "pusat" ? "PABAN IV / STERAD PUSAT" : selectedKodam.name.toUpperCase()}</span>
              <ArrowRight className="w-4 h-4 text-yellow-300" />
            </button>
          </div>
        </form>

        {/* Footer info */}
        <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between font-mono">
          <span>SPABAN IV/PKBN STERAD © 2026</span>
          <span className="text-emerald-400">Sistem Beroperasi Normal</span>
        </div>
      </div>
    </div>
  );
};
