import React, { useState } from "react";
import { ProvinceData } from "../types";
import { MapPin, Users, Award, Building, CheckCircle2, AlertCircle } from "lucide-react";

interface IndonesiaMapProps {
  provinces: ProvinceData[];
  selectedProvince: ProvinceData | null;
  onSelectProvince: (prov: ProvinceData | null) => void;
}

export const IndonesiaMap: React.FC<IndonesiaMapProps> = ({
  provinces,
  selectedProvince,
  onSelectProvince,
}) => {
  const [hoveredProv, setHoveredProv] = useState<ProvinceData | null>(null);

  const getStatusColor = (status: ProvinceData["status"]) => {
    switch (status) {
      case "Sangat Tinggi":
        return "bg-emerald-500 text-emerald-100 border-emerald-400";
      case "Tinggi":
        return "bg-blue-500 text-blue-100 border-blue-400";
      case "Sedang":
        return "bg-amber-500 text-amber-100 border-amber-400";
      default:
        return "bg-red-500 text-red-100 border-red-400";
    }
  };

  const getMarkerFill = (status: ProvinceData["status"]) => {
    switch (status) {
      case "Sangat Tinggi":
        return "#10b981"; // Emerald
      case "Tinggi":
        return "#3b82f6"; // Blue
      case "Sedang":
        return "#f59e0b"; // Amber
      default:
        return "#ef4444"; // Red
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
      {/* Map Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-red-500" />
            <h3 className="text-base font-bold text-white font-serif tracking-wide">
              Peta Sebaran Pembinaan Kesadaran Bela Negara Nasional
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Klik lokasi provinsi untuk melihat rincian capaian, jumlah peserta, dan lembaga aktif.
          </p>
        </div>

        {/* Status Legend */}
        <div className="flex items-center space-x-3 text-[11px] bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/80">
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-slate-300">Sangat Tinggi</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span className="text-slate-300">Tinggi</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="text-slate-300">Sedang</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas Map */}
      <div className="relative w-full aspect-[22/9] bg-gradient-to-b from-slate-950 to-slate-900 rounded-xl border border-slate-800 p-2 overflow-hidden flex items-center justify-center">
        {/* Subtle Map Grid lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>

        {/* Decorative Equator Line */}
        <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-red-900/30 text-[9px] text-red-900/60 font-mono px-2 -translate-y-1/2 flex justify-between pointer-events-none">
          <span>Khatulistiwa (0°)</span>
          <span>REPUBLIK INDONESIA</span>
          <span>NKRI</span>
        </div>

        <svg viewBox="0 0 1000 420" className="w-full h-full drop-shadow-lg">
          {/* Stylized Island Silhouettes */}
          {/* Sumatra */}
          <path
            d="M 60,100 L 150,130 L 250,220 L 220,260 L 140,190 L 70,120 Z"
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="1.5"
            className="hover:fill-slate-800 transition-colors"
          />
          {/* Jawa */}
          <path
            d="M 260,280 L 370,290 L 490,300 L 480,315 L 360,310 L 250,295 Z"
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="1.5"
            className="hover:fill-slate-800 transition-colors"
          />
          {/* Kalimantan */}
          <path
            d="M 360,150 L 470,140 L 520,180 L 490,260 L 370,240 Z"
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="1.5"
            className="hover:fill-slate-800 transition-colors"
          />
          {/* Sulawesi */}
          <path
            d="M 570,150 L 610,130 L 630,170 L 600,200 L 620,250 L 580,260 L 570,210 L 590,190 Z"
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="1.5"
            className="hover:fill-slate-800 transition-colors"
          />
          {/* Bali & Nusa Tenggara */}
          <path
            d="M 520,310 L 680,325 L 680,335 L 520,320 Z"
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="1.5"
            className="hover:fill-slate-800 transition-colors"
          />
          {/* Maluku */}
          <path
            d="M 700,200 L 760,190 L 770,250 L 710,260 Z"
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="1.5"
            className="hover:fill-slate-800 transition-colors"
          />
          {/* Papua */}
          <path
            d="M 780,210 L 890,220 L 930,300 L 880,310 L 810,270 Z"
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="1.5"
            className="hover:fill-slate-800 transition-colors"
          />

          {/* Province Interactive Hotspot Nodes */}
          {provinces.map((prov) => {
            const cx = prov.coordinates.x * 10;
            const cy = prov.coordinates.y * 4.2;
            const isSelected = selectedProvince?.id === prov.id;
            const isHovered = hoveredProv?.id === prov.id;
            const color = getMarkerFill(prov.status);

            return (
              <g
                key={prov.id}
                onClick={() => onSelectProvince(isSelected ? null : prov)}
                onMouseEnter={() => setHoveredProv(prov)}
                onMouseLeave={() => setHoveredProv(null)}
                className="cursor-pointer group"
              >
                {/* Radar pulse for selected / active */}
                {(isSelected || isHovered) && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? "18" : "14"}
                    fill={color}
                    opacity="0.25"
                    className="animate-ping"
                  />
                )}

                {/* Outer Ring */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? "10" : "7"}
                  fill="#0f172a"
                  stroke={color}
                  strokeWidth={isSelected ? "3" : "2"}
                  className="transition-all duration-200"
                />

                {/* Inner Core */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? "5" : "3"}
                  fill={color}
                />

                {/* Short Province Name Label */}
                <text
                  x={cx}
                  y={cy - 12}
                  textAnchor="middle"
                  fill="#e2e8f0"
                  fontSize="11"
                  fontWeight={isSelected ? "bold" : "medium"}
                  className="pointer-events-none drop-shadow-md transition-all font-sans"
                >
                  {prov.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Box */}
        {hoveredProv && (
          <div
            className="absolute z-20 bg-slate-900/95 border border-slate-700 rounded-xl p-3 shadow-2xl backdrop-blur-md text-xs text-slate-200 w-64 pointer-events-none transition-all"
            style={{
              left: `${Math.min(Math.max(hoveredProv.coordinates.x, 15), 75)}%`,
              top: `${Math.min(Math.max(hoveredProv.coordinates.y, 20), 70)}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="flex items-center justify-between font-bold text-white border-b border-slate-800 pb-1.5 mb-2">
              <span className="text-sm font-serif">{hoveredProv.name}</span>
              <span
                className={`px-2 py-0.5 text-[10px] rounded font-semibold ${getStatusColor(
                  hoveredProv.status
                )}`}
              >
                {hoveredProv.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] mb-2">
              <div className="bg-slate-800/80 p-1.5 rounded">
                <span className="text-slate-400 block">Total Kegiatan</span>
                <span className="font-bold text-white text-sm">
                  {hoveredProv.totalEvents} Program
                </span>
              </div>
              <div className="bg-slate-800/80 p-1.5 rounded">
                <span className="text-slate-400 block">Total Peserta</span>
                <span className="font-bold text-yellow-400 text-sm">
                  {hoveredProv.totalParticipants.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
            <div className="text-[10px] text-slate-400">
              <span className="font-medium text-slate-300">Kab/Kota Teraktif: </span>
              {hoveredProv.topRegencies.join(", ")}
            </div>
          </div>
        )}
      </div>

      {/* Selected Province Detailed Panel */}
      {selectedProvince && (
        <div className="mt-4 bg-slate-800/90 border border-slate-700 rounded-xl p-4 text-xs text-slate-300 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/80 pb-2 mb-3">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <div>
                <h4 className="font-bold text-base text-white font-serif">
                  Detail Kinerja PKBN: {selectedProvince.name} ({selectedProvince.islandGroup})
                </h4>
                <p className="text-[11px] text-slate-400">
                  Kode Wilayah: {selectedProvince.code} | Lembaga Terdaftar: {selectedProvince.activeInstitutions}
                </p>
              </div>
            </div>
            <button
              onClick={() => onSelectProvince(null)}
              className="self-start sm:self-auto bg-slate-700 hover:bg-slate-600 text-slate-200 px-2.5 py-1 rounded text-xs transition-colors"
            >
              Tutup Detail
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700">
              <div className="text-slate-400 text-[11px]">Total Kegiatan</div>
              <div className="text-lg font-bold text-white mt-1">
                {selectedProvince.totalEvents} Kegiatan
              </div>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700">
              <div className="text-slate-400 text-[11px]">Realisasi Peserta</div>
              <div className="text-lg font-bold text-yellow-400 mt-1">
                {selectedProvince.totalParticipants.toLocaleString("id-ID")}
              </div>
              <div className="text-[10px] text-slate-500">
                Target: {selectedProvince.targetParticipants.toLocaleString("id-ID")}
              </div>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700">
              <div className="text-slate-400 text-[11px]">Persentase Capaian</div>
              <div className="text-lg font-bold text-emerald-400 mt-1">
                {(
                  (selectedProvince.totalParticipants / selectedProvince.targetParticipants) *
                  100
                ).toFixed(1)}
                %
              </div>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700">
              <div className="text-slate-400 text-[11px]">Wilayah Fokus Utama</div>
              <div className="text-xs font-semibold text-slate-200 mt-1 truncate">
                {selectedProvince.topRegencies.join(", ")}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
