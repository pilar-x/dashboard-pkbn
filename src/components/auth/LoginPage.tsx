import React, { useState } from "react";
import { UserSession } from "../../types";
import { listKodam } from "../views/InputKodamView";
import {
  Shield,
  User,
  Building2,
  CheckCircle2,
  ArrowRight,
  KeyRound,
  Globe,
  Radio,
  Lock,
} from "lucide-react";

interface LoginPageProps {
  onLogin: (session: UserSession) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
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
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-emerald-600 selection:text-white">
      {/* Background Military Grid Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-950/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-900/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navbar Header */}
      <header className="relative z-10 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 via-emerald-800 to-green-950 border-2 border-yellow-500/80 flex items-center justify-center text-yellow-300 shadow-lg shadow-emerald-950/80">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-extrabold font-serif tracking-wider text-white flex items-center space-x-2">
                <span>PORTAL RESMI PKBN</span>
                <span className="text-[10px] font-mono bg-emerald-950 border border-emerald-700 text-yellow-400 px-2 py-0.5 rounded uppercase">
                  v2.6
                </span>
              </h1>
              <p className="text-xs text-slate-400 font-medium">
                SPABAN IV/PKBN STERAD — Markas Besar TNI Angkatan Darat
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4 text-xs text-slate-400 font-mono">
            <div className="flex items-center space-x-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>SERVER TERHUBUNG</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>ENKRIPSI 256-BIT</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 md:p-10">
        <div className="w-full max-w-xl mx-auto">
          {/* Card Login Form */}
          <div>
            <div className="bg-slate-900/95 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl">
              
              {/* Form Header Banner */}
              <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 p-6 border-b border-slate-800">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-900 border border-yellow-500/80 flex items-center justify-center text-yellow-300 shadow-md shrink-0">
                    <Shield className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-serif text-white tracking-wide">
                      Autentikasi Akses Sistem
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Silahkan pilih hak akses sebelum masuk ke Dashboard
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 space-y-5">
                {/* Role Choice */}
                <div>
                  <label className="text-xs font-bold text-amber-400 font-mono uppercase tracking-wider block mb-2.5">
                    Pilih Tingkat Akses / Otorisasi *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Option 1: PUSAT */}
                    <button
                      type="button"
                      onClick={() => setSelectedRole("pusat")}
                      className={`p-3.5 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                        selectedRole === "pusat"
                          ? "bg-emerald-950/90 border-emerald-500 ring-2 ring-emerald-500/50 text-white shadow-lg shadow-emerald-950/50"
                          : "bg-slate-800/40 border-slate-700/80 text-slate-400 hover:bg-slate-800/80"
                      }`}
                    >
                      <div className={`p-2 rounded-xl shrink-0 ${
                        selectedRole === "pusat" ? "bg-emerald-800 text-yellow-300" : "bg-slate-700 text-slate-400"
                      }`}>
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-white">
                          PUSAT / STERAD
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                          Komando Nasional SPABAN IV/PKBN (Super Admin)
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
                        <div className="font-bold text-xs text-white">
                          OPERATOR KODAM
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

                {/* Username & Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                        placeholder="Nama/Pangkat Operator"
                        className="w-full bg-slate-800/90 text-white text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500 font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 mb-1 block">
                      Sandi Keamanan
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-slate-800/90 text-white text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-700 via-emerald-800 to-green-900 hover:from-emerald-600 hover:to-green-800 text-white font-bold text-xs tracking-wider uppercase shadow-xl shadow-emerald-950/80 border border-emerald-500/80 flex items-center justify-center space-x-2.5 transition-all active:scale-[0.98] group cursor-pointer"
                  >
                    <CheckCircle2 className="w-5 h-5 text-yellow-300" />
                    <span>MASUK KE DASHBOARD {selectedRole === "pusat" ? "PUSAT" : selectedKodam.name.toUpperCase()}</span>
                    <ArrowRight className="w-5 h-5 text-yellow-300 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>

              <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between font-mono">
                <span>SPABAN IV/PKBN STERAD © 2026</span>
                <span className="text-emerald-400 flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span>Sistem Siap Digunakan</span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer Info */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-900/60 py-3 px-6 text-center text-xs text-slate-500">
        Hak Cipta © 2026 SPABAN IV/PKBN STERAD — Markas Besar TNI Angkatan Darat. Seluruh Hak Dilindungi.
      </footer>
    </div>
  );
};
