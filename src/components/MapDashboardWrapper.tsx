import React, { useState } from "react";
import { ProvinceData } from "../types";
import { GoogleIndonesiaMap } from "./GoogleIndonesiaMap";
import { IndonesiaMap } from "./IndonesiaMap";
import { LeafletOperationalMap } from "./LeafletOperationalMap";
import { Crosshair, Globe, Map, Layers } from "lucide-react";

interface MapDashboardWrapperProps {
  provinces: ProvinceData[];
  selectedProvince: ProvinceData | null;
  onSelectProvince: (prov: ProvinceData | null) => void;
}

export const MapDashboardWrapper: React.FC<MapDashboardWrapperProps> = ({
  provinces,
  selectedProvince,
  onSelectProvince,
}) => {
  const [mapEngine, setMapEngine] = useState<"leaflet" | "google" | "vector">("leaflet");

  return (
    <div className="space-y-3">
      {/* Top Map Engine Switcher Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2.5 sm:p-3 shadow-md flex flex-col lg:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-red-950/80 text-red-400 border border-red-800/80 flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">
              Pilihan Tampilan Engine Peta Dashboard
            </span>
            <span className="text-[11px] text-slate-400">
              Pilih antara Leaflet Operasional Real Map, Google Maps 3-Layer, atau Peta Vektor Dashboard
            </span>
          </div>
        </div>

        {/* Engine Switcher Buttons */}
        <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex flex-wrap items-center gap-1 shrink-0 w-full lg:w-auto">
          <button
            onClick={() => setMapEngine("leaflet")}
            className={`flex-1 lg:flex-initial flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              mapEngine === "leaflet"
                ? "bg-red-600 text-white shadow-md shadow-red-950"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <Crosshair className="w-3.5 h-3.5 text-red-300" />
            <span>Leaflet Real Map</span>
          </button>

          <button
            onClick={() => setMapEngine("google")}
            className={`flex-1 lg:flex-initial flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              mapEngine === "google"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-950"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-emerald-300" />
            <span>Google Maps 3-Layer</span>
          </button>

          <button
            onClick={() => setMapEngine("vector")}
            className={`flex-1 lg:flex-initial flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              mapEngine === "vector"
                ? "bg-blue-600 text-white shadow-md shadow-blue-950"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <Map className="w-3.5 h-3.5 text-blue-300" />
            <span>Peta Vektor Dashboard</span>
          </button>
        </div>
      </div>

      {/* Render Active Map Engine */}
      {mapEngine === "leaflet" ? (
        <LeafletOperationalMap
          provinces={provinces}
          selectedProvince={selectedProvince}
          onSelectProvince={onSelectProvince}
        />
      ) : mapEngine === "google" ? (
        <GoogleIndonesiaMap
          provinces={provinces}
          selectedProvince={selectedProvince}
          onSelectProvince={onSelectProvince}
          onSwitchToVector={() => setMapEngine("vector")}
        />
      ) : (
        <IndonesiaMap
          provinces={provinces}
          selectedProvince={selectedProvince}
          onSelectProvince={onSelectProvince}
        />
      )}
    </div>
  );
};

