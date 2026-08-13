import React, { useState } from "react";
import { ProgramItem, ProvinceData } from "../../types";
import { MapDashboardWrapper } from "../MapDashboardWrapper";
import { Activity } from "lucide-react";

interface MonitoringViewProps {
  programs: ProgramItem[];
  provinces: ProvinceData[];
  selectedProvince: ProvinceData | null;
  onSelectProvince: (prov: ProvinceData | null) => void;
  theme?: "dark" | "light";
  searchQuery?: string;
}

export const MonitoringView: React.FC<MonitoringViewProps> = ({
  programs,
  provinces,
  selectedProvince,
  onSelectProvince,
  theme = "dark",
  searchQuery = "",
}) => {
  const isDark = theme === "dark";

  const liveFeeds = [
    {
      time: "19:45:12",
      event: "Unggah Dokumentasi PKKMB UI (Depok, Jabar)",
      user: "Operator Kampus UI",
      type: "update",
    },
    {
      time: "19:30:00",
      event: "Selesai Evaluasi Sesi 2 Diklat LAN RI (Jakarta)",
      user: "Instruktur LAN",
      type: "success",
    },
    {
      time: "18:12:44",
      event: "Pendaftaran 120 Kader Baru Karang Taruna (Surabaya)",
      user: "Admin Jatim",
      type: "info",
    },
  ];

  const q = searchQuery.trim().toLowerCase();

  const filteredPrograms = programs.filter(
    (p) =>
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.province.toLowerCase().includes(q) ||
      p.organizer.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q)
  );

  return (
    <div className="space-y-6">
      {/* Map Sebaran */}
      <MapDashboardWrapper
        provinces={provinces}
        programs={programs}
        selectedProvince={selectedProvince}
        onSelectProvince={onSelectProvince}
        searchQuery={searchQuery}
      />

      {/* Real-time Status Table & Live Feed Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Program Status Table */}
        <div className={`lg:col-span-2 rounded-2xl p-5 shadow-xl space-y-4 border ${
          isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
        }`}>
          <div className={`flex items-center justify-between border-b pb-2 ${isDark ? "border-slate-800" : "border-slate-200"}`}>
            <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>
              Status Pelaksanaan Program ({filteredPrograms.length})
            </h3>
            <span className={`text-xs ${isDark ? "text-slate-400" : "text-slate-600 font-semibold"}`}>Pembaruan Otomatis</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className={`uppercase font-mono text-[10px] ${
                isDark ? "bg-slate-800/90 text-slate-400" : "bg-slate-100 text-slate-600 font-bold"
              }`}>
                <tr>
                  <th className="p-3">Kode Program</th>
                  <th className="p-3">Nama Kegiatan</th>
                  <th className="p-3">Lingkup</th>
                  <th className="p-3">Provinsi</th>
                  <th className="p-3">Peserta</th>
                  <th className="p-3 text-right">Status Execution</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? "divide-slate-800 text-slate-300" : "divide-slate-200 text-slate-700 font-medium"}`}>
                {filteredPrograms.map((p) => (
                  <tr key={p.id} className={isDark ? "hover:bg-slate-800/50" : "hover:bg-slate-50"}>
                    <td className={`p-3 font-mono text-[11px] ${isDark ? "text-slate-400" : "text-slate-500 font-bold"}`}>{p.code}</td>
                    <td className={`p-3 font-semibold max-w-xs truncate ${isDark ? "text-white" : "text-slate-900"}`}>{p.title}</td>
                    <td className="p-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold border ${
                        isDark ? "bg-slate-800 text-slate-300 border-slate-700" : "bg-slate-100 text-slate-800 border-slate-300"
                      }`}>
                        {p.sector}
                      </span>
                    </td>
                    <td className="p-3">{p.province}</td>
                    <td className="p-3 font-bold text-amber-700 dark:text-yellow-400">{p.participantCount} Orang</td>
                    <td className="p-3 text-right">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-block ${
                          p.status === "Berlangsung"
                            ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40"
                            : p.status === "Rencana"
                            ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40"
                            : "bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/40"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Logs / Activity Stream */}
        <div className={`rounded-2xl p-5 shadow-xl flex flex-col justify-between border ${
          isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800 shadow-md"
        }`}>
          <div>
            <div className={`flex items-center space-x-2 border-b pb-2 mb-3 ${isDark ? "border-slate-800" : "border-slate-200"}`}>
              <Activity className="w-4 h-4 text-red-600 dark:text-red-500" />
              <h3 className={`text-base font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>Aktivitas Sistem Terkini</h3>
            </div>

            <div className="space-y-3">
              {liveFeeds.map((feed, idx) => (
                <div key={idx} className={`p-3 rounded-xl text-xs space-y-1 border ${
                  isDark ? "bg-slate-800/80 border-slate-700/80 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-800"
                }`}>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className={`font-mono ${isDark ? "text-slate-400" : "text-slate-500 font-semibold"}`}>{feed.time}</span>
                    <span className="text-red-600 dark:text-red-400 font-bold">{feed.user}</span>
                  </div>
                  <p className={`font-semibold leading-snug ${isDark ? "text-slate-200" : "text-slate-900"}`}>{feed.event}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`pt-3 border-t mt-4 text-center ${isDark ? "border-slate-800" : "border-slate-200"}`}>
            <span className={`text-[11px] font-mono ${isDark ? "text-slate-500" : "text-slate-500 font-semibold"}`}>
              Server Time: 2026-08-12 19:59 WIB | Sinkronisasi Aktif
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
