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
}

export const DataMasterView: React.FC<DataMasterViewProps> = ({
  provinces,
  institutions,
}) => {
  const [activeMasterTab, setActiveMasterTab] = useState<
    "wilayah" | "instansi" | "pendidikan" | "ormas" | "pengguna" | "akses"
  >("wilayah");

  const [users, setUsers] = useState<MasterUser[]>(masterUsers);
  const [roles] = useState<MasterAccessRole[]>(masterAccessRoles);

  return (
    <div className="space-y-6">
      {/* Data Master Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-slate-800 text-red-500 border border-slate-700 flex items-center justify-center shrink-0 shadow-lg">
              <Database className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700">
                Pengelolaan Sistem
              </span>
              <h2 className="text-xl font-bold text-white font-serif tracking-tight mt-1">
                Data Master & Hak Akses Pengguna
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
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
        <div className="flex items-center space-x-1 border-t border-slate-800 pt-4 mt-5 text-xs font-medium text-slate-400 overflow-x-auto">
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
                  ? "bg-slate-700 text-white font-semibold border border-slate-600 shadow"
                  : "hover:bg-slate-800 hover:text-slate-200"
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
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white font-serif">Master Data 38 Provinsi & Kabupaten/Kota</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/90 text-slate-400 uppercase font-mono text-[10px]">
                <tr>
                  <th className="p-3">Kode BPS</th>
                  <th className="p-3">Nama Provinsi</th>
                  <th className="p-3">Gugus Pulau</th>
                  <th className="p-3">Kab/Kota Teraktif</th>
                  <th className="p-3 text-right">Total Kegiatan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {provinces.map((prov) => (
                  <tr key={prov.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 font-mono text-slate-400">{prov.code}</td>
                    <td className="p-3 font-semibold text-white">{prov.name}</td>
                    <td className="p-3">
                      <span className="bg-slate-800 text-slate-300 border border-slate-700 text-[10px] px-2 py-0.5 rounded font-mono">
                        {prov.islandGroup}
                      </span>
                    </td>
                    <td className="p-3">{prov.topRegencies.join(", ")}</td>
                    <td className="p-3 text-right font-bold text-yellow-400">{prov.totalEvents}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Content 2: Instansi & BUMN */}
      {activeMasterTab === "instansi" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-serif">Master Referensi Kementerian, Lembaga & BUMN</h3>
            <span className="text-xs text-slate-400 font-mono">Total {institutions.filter((i) => i.category === "Instansi Pemerintah" || i.category === "BUMN").length} Unit Terdaftar</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/90 text-slate-400 uppercase font-mono text-[10px]">
                <tr>
                  <th className="p-3">Kode Instansi</th>
                  <th className="p-3">Nama Instansi / Badan</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Provinsi</th>
                  <th className="p-3">Penanggung Jawab</th>
                  <th className="p-3 text-right">Status Aktif</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {institutions
                  .filter((i) => i.category === "Instansi Pemerintah" || i.category === "BUMN" || i.category === "Swasta")
                  .map((inst) => (
                    <tr key={inst.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 font-mono text-slate-400">{inst.id}</td>
                      <td className="p-3 font-semibold text-white">{inst.name}</td>
                      <td className="p-3">
                        <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] px-2 py-0.5 rounded font-mono">
                          {inst.category}
                        </span>
                      </td>
                      <td className="p-3">{inst.province}</td>
                      <td className="p-3">{inst.contactPerson} ({inst.phone})</td>
                      <td className="p-3 text-right">
                        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
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
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-serif">Master Registrasi Sekolah & Perguruan Tinggi (NPSN/NPT)</h3>
            <span className="text-xs text-slate-400 font-mono">Total {institutions.filter((i) => i.category === "Sekolah" || i.category === "Perguruan Tinggi").length} Satuan Pendidikan</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/90 text-slate-400 uppercase font-mono text-[10px]">
                <tr>
                  <th className="p-3">NPSN / ID</th>
                  <th className="p-3">Nama Kampus / Sekolah</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Wilayah</th>
                  <th className="p-3">Kader Terbina</th>
                  <th className="p-3 text-right">Status Sertifikasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {institutions
                  .filter((i) => i.category === "Sekolah" || i.category === "Perguruan Tinggi")
                  .map((inst) => (
                    <tr key={inst.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 font-mono text-slate-400">{inst.id}</td>
                      <td className="p-3 font-semibold text-white">{inst.name}</td>
                      <td className="p-3">
                        <span className="bg-blue-950 text-blue-300 border border-blue-800 text-[10px] px-2 py-0.5 rounded font-mono">
                          {inst.category}
                        </span>
                      </td>
                      <td className="p-3">{inst.regency}, {inst.province}</td>
                      <td className="p-3 font-bold text-yellow-400">{inst.cadreCount.toLocaleString("id-ID")} Siswa/Mhs</td>
                      <td className="p-3 text-right">
                        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
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
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-serif">Master Organisasi Kemasyarakatan, OKP & Komunitas</h3>
            <span className="text-xs text-slate-400 font-mono">Mitra Terverifikasi Kemhan / Sterad</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/90 text-slate-400 uppercase font-mono text-[10px]">
                <tr>
                  <th className="p-3">No. Registrasi</th>
                  <th className="p-3">Nama Ormas / OKP</th>
                  <th className="p-3">Wilayah</th>
                  <th className="p-3">Penanggung Jawab</th>
                  <th className="p-3">Jumlah Kader</th>
                  <th className="p-3 text-right">Status Kemitraan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {institutions
                  .filter((i) => i.category === "Ormas/Komunitas")
                  .map((inst) => (
                    <tr key={inst.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 font-mono text-slate-400">{inst.id}</td>
                      <td className="p-3 font-semibold text-white">{inst.name}</td>
                      <td className="p-3">{inst.regency}, {inst.province}</td>
                      <td className="p-3">{inst.contactPerson}</td>
                      <td className="p-3 font-bold text-amber-400">{inst.cadreCount.toLocaleString("id-ID")} Kader</td>
                      <td className="p-3 text-right">
                        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
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
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white font-serif">Daftar Pengguna Operator & Administrator</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/90 text-slate-400 uppercase font-mono text-[10px]">
                <tr>
                  <th className="p-3">Nama Pengguna</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role Akses</th>
                  <th className="p-3">Wilayah Tugas</th>
                  <th className="p-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 font-semibold text-white">{u.name}</td>
                    <td className="p-3 text-slate-400 font-mono">{u.email}</td>
                    <td className="p-3">
                      <span className="bg-red-950 text-red-300 border border-red-800 text-[10px] px-2.5 py-0.5 rounded font-bold">
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3">{u.province}</td>
                    <td className="p-3 text-right">
                      <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
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

      {/* Content 3: Hak Akses */}
      {activeMasterTab === "akses" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles.map((r) => (
            <div key={r.roleName} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-sm font-serif">{r.roleName}</h4>
                <Lock className="w-4 h-4 text-red-400" />
              </div>
              <p className="text-xs text-slate-400">{r.description}</p>

              <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
                {Object.entries(r.permissions).map(([permKey, isAllowed]) => (
                  <div key={permKey} className="flex items-center justify-between text-slate-300">
                    <span className="capitalize">{permKey.replace(/([A-Z])/g, " $1")}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isAllowed ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-500"
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
