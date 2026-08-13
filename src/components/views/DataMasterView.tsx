import React, { useState } from "react";
import { ProvinceData, InstitutionItem, MasterUser, MasterAccessRole } from "../../types";
import { masterUsers, masterAccessRoles } from "../../data/mockData";
import {
  Database,
  MapPin,
  Building2,
  GraduationCap,
  Users,
  Shield,
  KeyRound,
  Plus,
  Search,
  CheckCircle2,
  Lock,
} from "lucide-react";

interface DataMasterViewProps {
  provinces: ProvinceData[];
  institutions: InstitutionItem[];
  theme?: "dark" | "light";
}

export const DataMasterView: React.FC<DataMasterViewProps> = ({
  provinces,
  institutions,
  theme = "dark",
}) => {
  const isDark = theme === "dark";
  const [activeMasterTab, setActiveMasterTab] = useState<
    "wilayah" | "instansi" | "pendidikan" | "ormas" | "pengguna" | "akses"
  >("wilayah");

  const [users, setUsers] = useState<MasterUser[]>(masterUsers);
  const [roles] = useState<MasterAccessRole[]>(masterAccessRoles);

  return (
    <div className="space-y-6">
      {/* Data Master Header Banner */}
      <div className={`rounded-2xl p-6 shadow-xl border ${
        isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 shadow-lg ${
              isDark ? "bg-slate-800 text-red-500 border-slate-700" : "bg-red-50 text-red-600 border-red-200"
            }`}>
              <Database className="w-7 h-7" />
            </div>
            <div>
              <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded border ${
                isDark ? "text-slate-400 bg-slate-800 border-slate-700" : "text-slate-600 bg-slate-100 border-slate-200"
              }`}>
                Pengelolaan Sistem
              </span>
              <h2 className={`text-xl font-bold font-serif tracking-tight mt-1 ${isDark ? "text-white" : "text-slate-900"}`}>
                Data Master & Hak Akses Pengguna
              </h2>
              <p className={`text-xs mt-0.5 ${isDark ? "text-slate-400" : "text-slate-600 font-medium"}`}>
                Pengaturan wilayah, referensi instansi, registrasi satuan pendidikan, pengguna, dan hak akses.
              </p>
            </div>
          </div>

          <button className="bg-red-700 hover:bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center space-x-1.5 shadow-md transition-colors">
            <Plus className="w-4 h-4" />
            <span>Tambah Referensi Master</span>
          </button>
        </div>

        {/* Tabs for Data Master */}
        <div className={`flex items-center space-x-1 border-t pt-4 mt-5 text-xs font-medium overflow-x-auto ${
          isDark ? "border-slate-800 text-slate-400" : "border-slate-200 text-slate-600 font-medium"
        }`}>
          {[
            { id: "wilayah", label: "Wilayah (Prov/Kab)", icon: <MapPin className="w-4 h-4" /> },
            { id: "instansi", label: "Instansi & BUMN", icon: <Building2 className="w-4 h-4" /> },
            { id: "pendidikan", label: "Satuan Pendidikan", icon: <GraduationCap className="w-4 h-4" /> },
            { id: "ormas", label: "Organisasi Masyarakat", icon: <Users className="w-4 h-4" /> },
            { id: "pengguna", label: "Pengguna Sistem", icon: <Shield className="w-4 h-4" /> },
            { id: "akses", label: "Hak Akses & Role", icon: <KeyRound className="w-4 h-4" /> },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveMasterTab(t.id as any)}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl transition-all shrink-0 ${
                activeMasterTab === t.id
                  ? isDark
                    ? "bg-slate-700 text-white font-semibold border border-slate-600 shadow"
                    : "bg-red-700 text-white font-semibold shadow"
                  : isDark
                    ? "hover:bg-slate-800 hover:text-slate-200"
                    : "hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content 1: Wilayah */}
      {activeMasterTab === "wilayah" && (
        <div className={`rounded-2xl p-5 shadow-xl space-y-4 border ${
          isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
        }`}>
          <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>Master Data 38 Provinsi & Kabupaten/Kota</h3>
          <div className="overflow-x-auto">
            <table className={`w-full text-left text-xs ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              <thead className={`uppercase font-mono text-[10px] ${
                isDark ? "bg-slate-800/90 text-slate-400" : "bg-slate-100 text-slate-700 font-bold"
              }`}>
                <tr>
                  <th className="p-3">Kode BPS</th>
                  <th className="p-3">Nama Provinsi</th>
                  <th className="p-3">Gugus Pulau</th>
                  <th className="p-3">Kab/Kota Teraktif</th>
                  <th className="p-3 text-right">Total Kegiatan</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-slate-800" : "divide-slate-200"}`}>
                {provinces.map((prov) => (
                  <tr key={prov.id} className={isDark ? "hover:bg-slate-800/50 transition-colors" : "hover:bg-slate-50 transition-colors"}>
                    <td className={`p-3 font-mono ${isDark ? "text-slate-400" : "text-slate-500 font-semibold"}`}>{prov.code}</td>
                    <td className={`p-3 font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{prov.name}</td>
                    <td className="p-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-mono border ${
                        isDark ? "bg-slate-800 text-slate-300 border-slate-700" : "bg-slate-100 text-slate-800 border-slate-300 font-bold"
                      }`}>
                        {prov.islandGroup}
                      </span>
                    </td>
                    <td className="p-3">{prov.topRegencies.join(", ")}</td>
                    <td className={`p-3 text-right font-bold ${isDark ? "text-yellow-400" : "text-amber-700"}`}>{prov.totalEvents}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Content 2: Instansi & BUMN */}
      {activeMasterTab === "instansi" && (
        <div className={`rounded-2xl p-5 shadow-xl space-y-4 border ${
          isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
        }`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>Master Referensi Kementerian, Lembaga & BUMN</h3>
            <span className={`text-xs font-mono ${isDark ? "text-slate-400" : "text-slate-600 font-semibold"}`}>Total {institutions.filter((i) => i.category === "Instansi Pemerintah" || i.category === "BUMN").length} Unit Terdaftar</span>
          </div>
          <div className="overflow-x-auto">
            <table className={`w-full text-left text-xs ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              <thead className={`uppercase font-mono text-[10px] ${
                isDark ? "bg-slate-800/90 text-slate-400" : "bg-slate-100 text-slate-700 font-bold"
              }`}>
                <tr>
                  <th className="p-3">Kode Instansi</th>
                  <th className="p-3">Nama Instansi / Badan</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Provinsi</th>
                  <th className="p-3">Penanggung Jawab</th>
                  <th className="p-3 text-right">Status Aktif</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-slate-800" : "divide-slate-200"}`}>
                {institutions
                  .filter((i) => i.category === "Instansi Pemerintah" || i.category === "BUMN" || i.category === "Swasta")
                  .map((inst) => (
                    <tr key={inst.id} className={isDark ? "hover:bg-slate-800/50 transition-colors" : "hover:bg-slate-50 transition-colors"}>
                      <td className={`p-3 font-mono ${isDark ? "text-slate-400" : "text-slate-500 font-semibold"}`}>{inst.id}</td>
                      <td className={`p-3 font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{inst.name}</td>
                      <td className="p-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-mono border ${
                          isDark ? "bg-emerald-950 text-emerald-300 border-emerald-800" : "bg-emerald-100 text-emerald-800 border-emerald-300 font-bold"
                        }`}>
                          {inst.category}
                        </span>
                      </td>
                      <td className="p-3">{inst.province}</td>
                      <td className="p-3">{inst.contactPerson} ({inst.phone})</td>
                      <td className="p-3 text-right">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          isDark ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" : "bg-emerald-100 text-emerald-800 border-emerald-300"
                        }`}>
                          {inst.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Content 3: Satuan Pendidikan */}
      {activeMasterTab === "pendidikan" && (
        <div className={`rounded-2xl p-5 shadow-xl space-y-4 border ${
          isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
        }`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>Master Registrasi Sekolah & Perguruan Tinggi (NPSN/NPT)</h3>
            <span className={`text-xs font-mono ${isDark ? "text-slate-400" : "text-slate-600 font-semibold"}`}>Total {institutions.filter((i) => i.category === "Sekolah" || i.category === "Perguruan Tinggi").length} Satuan Pendidikan</span>
          </div>
          <div className="overflow-x-auto">
            <table className={`w-full text-left text-xs ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              <thead className={`uppercase font-mono text-[10px] ${
                isDark ? "bg-slate-800/90 text-slate-400" : "bg-slate-100 text-slate-700 font-bold"
              }`}>
                <tr>
                  <th className="p-3">NPSN / ID</th>
                  <th className="p-3">Nama Kampus / Sekolah</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Wilayah</th>
                  <th className="p-3">Kader Terbina</th>
                  <th className="p-3 text-right">Status Sertifikasi</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-slate-800" : "divide-slate-200"}`}>
                {institutions
                  .filter((i) => i.category === "Sekolah" || i.category === "Perguruan Tinggi")
                  .map((inst) => (
                    <tr key={inst.id} className={isDark ? "hover:bg-slate-800/50 transition-colors" : "hover:bg-slate-50 transition-colors"}>
                      <td className={`p-3 font-mono ${isDark ? "text-slate-400" : "text-slate-500 font-semibold"}`}>{inst.id}</td>
                      <td className={`p-3 font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{inst.name}</td>
                      <td className="p-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-mono border ${
                          isDark ? "bg-blue-950 text-blue-300 border-blue-800" : "bg-blue-100 text-blue-800 border-blue-300 font-bold"
                        }`}>
                          {inst.category}
                        </span>
                      </td>
                      <td className="p-3">{inst.regency}, {inst.province}</td>
                      <td className={`p-3 font-bold ${isDark ? "text-yellow-400" : "text-amber-700"}`}>{inst.cadreCount.toLocaleString("id-ID")} Siswa/Mhs</td>
                      <td className="p-3 text-right">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          isDark ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" : "bg-emerald-100 text-emerald-800 border-emerald-300"
                        }`}>
                          {inst.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Content 4: Ormas */}
      {activeMasterTab === "ormas" && (
        <div className={`rounded-2xl p-5 shadow-xl space-y-4 border ${
          isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
        }`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>Master Organisasi Kemasyarakatan, OKP & Komunitas</h3>
            <span className={`text-xs font-mono ${isDark ? "text-slate-400" : "text-slate-600 font-semibold"}`}>Mitra Terverifikasi Kemhan / Sterad</span>
          </div>
          <div className="overflow-x-auto">
            <table className={`w-full text-left text-xs ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              <thead className={`uppercase font-mono text-[10px] ${
                isDark ? "bg-slate-800/90 text-slate-400" : "bg-slate-100 text-slate-700 font-bold"
              }`}>
                <tr>
                  <th className="p-3">No. Registrasi</th>
                  <th className="p-3">Nama Ormas / OKP</th>
                  <th className="p-3">Wilayah</th>
                  <th className="p-3">Penanggung Jawab</th>
                  <th className="p-3">Jumlah Kader</th>
                  <th className="p-3 text-right">Status Kemitraan</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-slate-800" : "divide-slate-200"}`}>
                {institutions
                  .filter((i) => i.category === "Ormas/Komunitas")
                  .map((inst) => (
                    <tr key={inst.id} className={isDark ? "hover:bg-slate-800/50 transition-colors" : "hover:bg-slate-50 transition-colors"}>
                      <td className={`p-3 font-mono ${isDark ? "text-slate-400" : "text-slate-500 font-semibold"}`}>{inst.id}</td>
                      <td className={`p-3 font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{inst.name}</td>
                      <td className="p-3">{inst.regency}, {inst.province}</td>
                      <td className="p-3">{inst.contactPerson}</td>
                      <td className={`p-3 font-bold ${isDark ? "text-amber-400" : "text-amber-700"}`}>{inst.cadreCount.toLocaleString("id-ID")} Kader</td>
                      <td className="p-3 text-right">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          isDark ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" : "bg-emerald-100 text-emerald-800 border-emerald-300"
                        }`}>
                          {inst.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Content 5: Pengguna */}
      {activeMasterTab === "pengguna" && (
        <div className={`rounded-2xl p-5 shadow-xl space-y-4 border ${
          isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
        }`}>
          <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>Daftar Pengguna Operator & Administrator</h3>
          <div className="overflow-x-auto">
            <table className={`w-full text-left text-xs ${isDark ? "text-slate-300" : "text-slate-700"}`}>
              <thead className={`uppercase font-mono text-[10px] ${
                isDark ? "bg-slate-800/90 text-slate-400" : "bg-slate-100 text-slate-700 font-bold"
              }`}>
                <tr>
                  <th className="p-3">Nama Pengguna</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role Akses</th>
                  <th className="p-3">Wilayah Tugas</th>
                  <th className="p-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-slate-800" : "divide-slate-200"}`}>
                {users.map((u) => (
                  <tr key={u.id} className={isDark ? "hover:bg-slate-800/50 transition-colors" : "hover:bg-slate-50 transition-colors"}>
                    <td className={`p-3 font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{u.name}</td>
                    <td className={`p-3 font-mono ${isDark ? "text-slate-400" : "text-slate-600"}`}>{u.email}</td>
                    <td className="p-3">
                      <span className={`text-[10px] px-2.5 py-0.5 rounded font-bold border ${
                        isDark ? "bg-red-950 text-red-300 border-red-800" : "bg-red-100 text-red-800 border-red-300"
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3">{u.province}</td>
                    <td className="p-3 text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isDark ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" : "bg-emerald-100 text-emerald-800 border-emerald-300"
                      }`}>
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Content 6: Hak Akses */}
      {activeMasterTab === "akses" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles.map((r) => (
            <div key={r.roleName} className={`rounded-2xl p-5 shadow-lg space-y-3 border ${
              isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
            }`}>
              <div className="flex items-center justify-between">
                <h4 className={`font-bold text-sm font-serif ${isDark ? "text-white" : "text-slate-900"}`}>{r.roleName}</h4>
                <Lock className="w-4 h-4 text-red-500" />
              </div>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600 font-medium"}`}>{r.description}</p>

              <div className={`space-y-1.5 pt-2 border-t text-xs ${isDark ? "border-slate-800" : "border-slate-200"}`}>
                {Object.entries(r.permissions).map(([permKey, isAllowed]) => (
                  <div key={permKey} className={`flex items-center justify-between ${isDark ? "text-slate-300" : "text-slate-700 font-medium"}`}>
                    <span className="capitalize">{permKey.replace(/([A-Z])/g, " $1")}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isAllowed
                        ? isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-800"
                        : isDark ? "bg-slate-800 text-slate-500" : "bg-slate-100 text-slate-400"
                    }`}>
                      {isAllowed ? "Diizinkan" : "Dibatasi"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
