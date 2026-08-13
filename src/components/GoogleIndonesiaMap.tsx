import React, { useState, useEffect, useRef } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { ProvinceData } from "../types";
import { indonesiaProvincesGeoJSON } from "../data/indonesiaProvincesGeoJSON";
import {
  Layers,
  MapPin,
  Eye,
  EyeOff,
  CheckCircle2,
  Award,
  Users,
  Building2,
  Sliders,
  Sparkles,
  Info,
  Maximize2,
  Compass,
  Key,
  ExternalLink,
  ShieldAlert,
  Flame,
  Globe,
} from "lucide-react";

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  "";

const hasValidKey = Boolean(API_KEY) && API_KEY !== "YOUR_API_KEY";

interface GoogleIndonesiaMapProps {
  provinces: ProvinceData[];
  selectedProvince: ProvinceData | null;
  onSelectProvince: (prov: ProvinceData | null) => void;
  onSwitchToVector?: () => void;
}

// Custom Dark Silver Style for Google Maps
const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#1d2c4d" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a3646" }] },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [{ color: "#4b687a" }],
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [{ color: "#ef4444" }, { weight: 2 }],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [{ color: "#021019" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#283d6a" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#304a7d" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0e1626" }],
  },
];

// Inner Controller for Google Maps GeoJSON Data Layer & Radius Circles
function MapLayerController({
  provinces,
  selectedProvince,
  onSelectProvince,
  showBoundaries,
  showMarkers,
  showHeatmapRadius,
  colorMode,
  setHoveredProv,
}: {
  provinces: ProvinceData[];
  selectedProvince: ProvinceData | null;
  onSelectProvince: (prov: ProvinceData | null) => void;
  showBoundaries: boolean;
  showMarkers: boolean;
  showHeatmapRadius: boolean;
  colorMode: "status" | "participants" | "island";
  setHoveredProv: (prov: ProvinceData | null) => void;
}) {
  const map = useMap();
  const circlesRef = useRef<google.maps.Circle[]>([]);

  // 1. Manage GeoJSON Province Boundaries Layer
  useEffect(() => {
    if (!map) return;

    // Clear existing data features
    map.data.forEach((f) => map.data.remove(f));

    if (showBoundaries) {
      try {
        map.data.addGeoJson(indonesiaProvincesGeoJSON);

        map.data.setStyle((feature) => {
          const id = feature.getProperty("id");
          const prov = provinces.find((p) => p.id === id);
          const isSelected = selectedProvince?.id === id;

          let fillColor = "#3b82f6";
          if (colorMode === "status") {
            const status = prov?.status || "Sedang";
            fillColor =
              status === "Sangat Tinggi"
                ? "#10b981"
                : status === "Tinggi"
                ? "#3b82f6"
                : status === "Sedang"
                ? "#f59e0b"
                : "#ef4444";
          } else if (colorMode === "participants") {
            const count = prov?.totalParticipants || 0;
            fillColor =
              count > 200000
                ? "#8b5cf6"
                : count > 100000
                ? "#3b82f6"
                : count > 60000
                ? "#06b6d4"
                : "#10b981";
          } else if (colorMode === "island") {
            const group = prov?.islandGroup || "Sumatra";
            fillColor =
              group === "Jawa"
                ? "#ef4444"
                : group === "Sumatra"
                ? "#f59e0b"
                : group === "Kalimantan"
                ? "#10b981"
                : group === "Sulawesi"
                ? "#06b6d4"
                : group === "Bali & Nusa"
                ? "#8b5cf6"
                : "#ec4899";
          }

          return {
            fillColor,
            fillOpacity: isSelected ? 0.65 : 0.35,
            strokeColor: isSelected ? "#ffffff" : "#f87171", // Distinguishing border line
            strokeWeight: isSelected ? 3.5 : 2.0,
            strokeOpacity: 0.95,
            clickable: true,
          };
        });

        // Event Listeners on Data Layer
        const clickListener = map.data.addListener("click", (event: any) => {
          const id = event.feature.getProperty("id");
          const prov = provinces.find((p) => p.id === id);
          if (prov) {
            onSelectProvince(prov);
            if (prov.latLng) {
              map.panTo(prov.latLng);
              map.setZoom(6);
            }
          }
        });

        const mouseOverListener = map.data.addListener(
          "mouseover",
          (event: any) => {
            const id = event.feature.getProperty("id");
            const prov = provinces.find((p) => p.id === id);
            if (prov) setHoveredProv(prov);
            map.data.overrideStyle(event.feature, {
              fillOpacity: 0.7,
              strokeWeight: 3.5,
              strokeColor: "#facc15",
            });
          }
        );

        const mouseOutListener = map.data.addListener(
          "mouseout",
          (event: any) => {
            setHoveredProv(null);
            map.data.revertStyle();
          }
        );

        return () => {
          google.maps.event.removeListener(clickListener);
          google.maps.event.removeListener(mouseOverListener);
          google.maps.event.removeListener(mouseOutListener);
        };
      } catch (e) {
        console.error("Error setting up GeoJSON Data layer:", e);
      }
    }
  }, [
    map,
    showBoundaries,
    provinces,
    selectedProvince,
    colorMode,
    onSelectProvince,
    setHoveredProv,
  ]);

  // 2. Manage Heatmap / Radius Coverage Layer
  useEffect(() => {
    if (!map) return;

    // Remove old circles
    circlesRef.current.forEach((c) => c.setMap(null));
    circlesRef.current = [];

    if (showHeatmapRadius && window.google?.maps) {
      provinces.forEach((p) => {
        if (!p.latLng) return;

        // Radius proportional to participant density
        const radiusMeters = Math.min(
          Math.max(p.totalParticipants * 0.35, 35000),
          120000
        );

        const statusColor =
          p.status === "Sangat Tinggi"
            ? "#10b981"
            : p.status === "Tinggi"
            ? "#3b82f6"
            : p.status === "Sedang"
            ? "#f59e0b"
            : "#ef4444";

        const circle = new google.maps.Circle({
          strokeColor: statusColor,
          strokeOpacity: 0.8,
          strokeWeight: 1.5,
          fillColor: statusColor,
          fillOpacity: 0.18,
          map,
          center: p.latLng,
          radius: radiusMeters,
          clickable: false,
        });

        circlesRef.current.push(circle);
      });
    }

    return () => {
      circlesRef.current.forEach((c) => c.setMap(null));
      circlesRef.current = [];
    };
  }, [map, showHeatmapRadius, provinces]);

  return null;
}

// Marker Item with InfoWindow Hook
function ProvinceMarkerItem({
  province,
  isSelected,
  onSelect,
}: {
  key?: React.Key;
  province: ProvinceData;
  isSelected: boolean;
  onSelect: (prov: ProvinceData) => void;
}) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    if (isSelected) {
      setInfoOpen(true);
    }
  }, [isSelected]);

  const pinBg =
    province.status === "Sangat Tinggi"
      ? "#10b981"
      : province.status === "Tinggi"
      ? "#3b82f6"
      : province.status === "Sedang"
      ? "#f59e0b"
      : "#ef4444";

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={province.latLng}
        title={province.name}
        onClick={() => {
          onSelect(province);
          setInfoOpen(true);
        }}
      >
        <div className="group relative cursor-pointer flex flex-col items-center">
          {/* Badge Label */}
          <div className="bg-slate-900/90 text-white font-bold text-[10px] px-2 py-0.5 rounded-full border border-slate-700 shadow-md mb-1 whitespace-nowrap group-hover:scale-105 transition-transform">
            {province.name}
          </div>
          {/* Custom Pin */}
          <Pin
            background={pinBg}
            glyphColor="#ffffff"
            borderColor="#0f172a"
            scale={isSelected ? 1.25 : 1.0}
          />
        </div>
      </AdvancedMarker>

      {infoOpen && (
        <InfoWindow
          anchor={marker}
          onCloseClick={() => setInfoOpen(false)}
          className="rounded-xl shadow-2xl"
        >
          <div className="p-2 text-slate-800 max-w-xs font-sans text-xs">
            <div className="flex items-center justify-between font-bold text-sm border-b pb-1 mb-2">
              <span className="text-slate-900 font-serif font-bold">
                {province.name}
              </span>
              <span
                className="px-2 py-0.5 text-[10px] rounded text-white font-medium"
                style={{ backgroundColor: pinBg }}
              >
                {province.status}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mb-2">
              Ibu Kota: <strong>{province.capital || "Pusat Daerah"}</strong> |
              Wilayah: {province.islandGroup}
            </p>
            <div className="grid grid-cols-2 gap-2 mb-2 text-[11px]">
              <div className="bg-slate-100 p-1.5 rounded border">
                <span className="text-slate-500 block">Total Peserta</span>
                <span className="font-bold text-slate-900 text-xs">
                  {province.totalParticipants.toLocaleString("id-ID")} Orang
                </span>
              </div>
              <div className="bg-slate-100 p-1.5 rounded border">
                <span className="text-slate-500 block">Total Kegiatan</span>
                <span className="font-bold text-slate-900 text-xs">
                  {province.totalEvents} Program
                </span>
              </div>
            </div>
            <div className="text-[10px] text-slate-500">
              <strong>Kab/Kota Teraktif: </strong>
              {province.topRegencies.join(", ")}
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export const GoogleIndonesiaMap: React.FC<GoogleIndonesiaMapProps> = ({
  provinces,
  selectedProvince,
  onSelectProvince,
  onSwitchToVector,
}) => {
  // 3 Layer States
  const [showBoundaries, setShowBoundaries] = useState<boolean>(true); // Layer 1: Batas Wilayah
  const [showMarkers, setShowMarkers] = useState<boolean>(true); // Layer 2: Pin Points
  const [showHeatmapRadius, setShowHeatmapRadius] = useState<boolean>(true); // Layer 3: Sebaran & Radius Coverage

  // Sub-controls & Base Map Type
  const [colorMode, setColorMode] = useState<
    "status" | "participants" | "island"
  >("status");
  const [mapTypeId, setMapTypeId] = useState<
    "roadmap" | "satellite" | "hybrid" | "terrain"
  >("roadmap");
  const [hoveredProv, setHoveredProv] = useState<ProvinceData | null>(null);

  // Fallback to instructions if API Key missing
  if (!hasValidKey) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-red-950 text-red-400 border border-red-800 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-serif">
                Pengaturan Google Maps API Key Diperlukan
              </h3>
              <p className="text-xs text-slate-400">
                Peta interaktif Google Maps memerlukan API Key aktif untuk
                menampilkan batas wilayah dan 3 jenis layer.
              </p>
            </div>
          </div>

          {onSwitchToVector && (
            <button
              onClick={onSwitchToVector}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-3.5 py-2 rounded-xl text-xs transition-colors flex items-center justify-center space-x-2 shrink-0 shadow-lg shadow-blue-950"
            >
              <Globe className="w-4 h-4" />
              <span>Gunakan Peta Vektor Dashboard</span>
            </button>
          )}
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 text-slate-300 text-xs space-y-3">
          <p className="font-semibold text-slate-200 text-sm">
            Petunjuk Penambahan API Key Google Maps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-slate-300 leading-relaxed">
            <li>
              Dapatkan API Key resmi dari Google Cloud Console:{" "}
              <a
                href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 font-medium underline inline-flex items-center gap-1"
              >
                <span>Google Maps API Console</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              Buka menu <strong>Settings (⚙️ Ikon Roda Gigi)</strong> di sudut
              kanan atas AI Studio.
            </li>
            <li>
              Pilih tab <strong>Secrets</strong>.
            </li>
            <li>
              Ketik Nama Secret: <code>GOOGLE_MAPS_PLATFORM_KEY</code> lalu
              tekan <strong>Enter</strong>.
            </li>
            <li>
              Tempelkan (paste) API Key Anda sebagai Value, lalu tekan{" "}
              <strong>Enter</strong>.
            </li>
          </ol>
          <div className="bg-amber-950/40 border border-amber-800/60 p-3 rounded-lg text-amber-300 text-[11px] flex items-start space-x-2">
            <Key className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <span>
              Aplikasi akan melakukan kompilasi ulang secara otomatis setelah
              Secret disimpan. Anda tidak perlu merefresh browser.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden space-y-4">
      {/* Header & 3-Layer Control Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-red-500 animate-pulse" />
            <h3 className="text-base font-bold text-white font-serif tracking-wide flex items-center space-x-2">
              <span>Peta Google Maps PKBN & Batas Wilayah Provinsi</span>
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Visualisasi terpadu dengan 3 Jenis Layer: Batas Wilayah Poligon, Pin
            Titik Lokasi, dan Jangkauan Radius Sebaran.
          </p>
        </div>

        {/* 3 Layer Toggle Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Layer 1: Batas Wilayah */}
          <button
            onClick={() => setShowBoundaries(!showBoundaries)}
            className={`flex items-center space-x-2 text-xs px-3 py-1.5 rounded-xl border transition-all font-medium ${
              showBoundaries
                ? "bg-red-950/80 text-red-300 border-red-700/80 shadow-md shadow-red-950/50"
                : "bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-red-400" />
            <span>Layer 1: Batas Wilayah</span>
            {showBoundaries ? (
              <Eye className="w-3 h-3 text-red-400 ml-1" />
            ) : (
              <EyeOff className="w-3 h-3 text-slate-500 ml-1" />
            )}
          </button>

          {/* Layer 2: Penanda & Marker */}
          <button
            onClick={() => setShowMarkers(!showMarkers)}
            className={`flex items-center space-x-2 text-xs px-3 py-1.5 rounded-xl border transition-all font-medium ${
              showMarkers
                ? "bg-blue-950/80 text-blue-300 border-blue-700/80 shadow-md shadow-blue-950/50"
                : "bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white"
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span>Layer 2: Pin Lokasi</span>
            {showMarkers ? (
              <Eye className="w-3 h-3 text-blue-400 ml-1" />
            ) : (
              <EyeOff className="w-3 h-3 text-slate-500 ml-1" />
            )}
          </button>

          {/* Layer 3: Radius & Density Coverage */}
          <button
            onClick={() => setShowHeatmapRadius(!showHeatmapRadius)}
            className={`flex items-center space-x-2 text-xs px-3 py-1.5 rounded-xl border transition-all font-medium ${
              showHeatmapRadius
                ? "bg-amber-950/80 text-amber-300 border-amber-700/80 shadow-md shadow-amber-950/50"
                : "bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white"
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Layer 3: Radius Coverage</span>
            {showHeatmapRadius ? (
              <Eye className="w-3 h-3 text-amber-400 ml-1" />
            ) : (
              <EyeOff className="w-3 h-3 text-slate-500 ml-1" />
            )}
          </button>
        </div>
      </div>

      {/* Map Sub-controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-xs">
        {/* Fill Color Mode Switcher */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-slate-400 font-semibold text-[11px] shrink-0">
            Warna Batas Wilayah:
          </span>
          <button
            onClick={() => setColorMode("status")}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors shrink-0 ${
              colorMode === "status"
                ? "bg-slate-800 text-white border border-slate-700 shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Status Capaian
          </button>
          <button
            onClick={() => setColorMode("participants")}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors shrink-0 ${
              colorMode === "participants"
                ? "bg-slate-800 text-white border border-slate-700 shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Jumlah Peserta
          </button>
          <button
            onClick={() => setColorMode("island")}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors shrink-0 ${
              colorMode === "island"
                ? "bg-slate-800 text-white border border-slate-700 shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Wilayah Pulau
          </button>
        </div>

        {/* Map Type Switcher */}
        <div className="flex items-center space-x-1.5 shrink-0 self-end sm:self-auto">
          <span className="text-slate-400 text-[11px] mr-1">
            Tipe Peta Dasar:
          </span>
          <select
            value={mapTypeId}
            onChange={(e: any) => setMapTypeId(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white text-[11px] rounded-lg px-2.5 py-1 focus:outline-none focus:border-red-500 cursor-pointer"
          >
            <option value="roadmap">Vektor (Roadmap)</option>
            <option value="satellite">Satelit</option>
            <option value="hybrid">Satelit Hybrid</option>
            <option value="terrain">Topografi (Terrain)</option>
          </select>
        </div>
      </div>

      {/* Main Google Maps Viewport Container */}
      <div className="relative w-full h-[520px] rounded-xl overflow-hidden border border-slate-800 shadow-inner">
        <APIProvider apiKey={API_KEY} version="weekly">
          <Map
            defaultCenter={{ lat: -2.5489, lng: 118.0149 }} // Center of Indonesia Archipelago
            defaultZoom={5}
            mapId="DEMO_MAP_ID"
            mapTypeId={mapTypeId}
            styles={mapTypeId === "roadmap" ? darkMapStyle : undefined}
            internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
            style={{ width: "100%", height: "100%" }}
            gestureHandling="greedy"
            disableDefaultUI={false}
          >
            {/* GeoJSON & Radius Layer Controller */}
            <MapLayerController
              provinces={provinces}
              selectedProvince={selectedProvince}
              onSelectProvince={onSelectProvince}
              showBoundaries={showBoundaries}
              showMarkers={showMarkers}
              showHeatmapRadius={showHeatmapRadius}
              colorMode={colorMode}
              setHoveredProv={setHoveredProv}
            />

            {/* Layer 2: Interactive Advanced Markers */}
            {showMarkers &&
              provinces.map(
                (prov) =>
                  prov.latLng && (
                    <ProvinceMarkerItem
                      key={prov.id}
                      province={prov}
                      isSelected={selectedProvince?.id === prov.id}
                      onSelect={onSelectProvince}
                    />
                  )
              )}
          </Map>
        </APIProvider>

        {/* Floating Legend Badge Overlay */}
        <div className="absolute bottom-3 left-3 z-10 bg-slate-900/90 backdrop-blur-md border border-slate-700/90 rounded-xl p-3 text-[11px] text-slate-200 shadow-xl max-w-xs space-y-2">
          <div className="font-bold text-white flex items-center justify-between border-b border-slate-800 pb-1">
            <span>Legenda Layer Peta</span>
            <span className="text-[10px] text-red-400 font-mono">NKRI</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-0.5 bg-red-400 rounded-full"></span>
              <span className="text-slate-300">
                Garis Merah: Batas Antar Provinsi
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>Capaian Sangat Tinggi (&gt;90%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span>Capaian Tinggi (75 - 90%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>Capaian Sedang (60 - 75%)</span>
            </div>
          </div>
        </div>

        {/* Floating Hover Tooltip if Hovering Province Feature */}
        {hoveredProv && (
          <div className="absolute top-4 right-4 z-10 bg-slate-900/95 border border-slate-700 rounded-xl p-3 shadow-2xl backdrop-blur-md text-xs text-slate-200 w-60 pointer-events-none animate-fadeIn">
            <div className="font-bold text-white text-sm border-b border-slate-800 pb-1 mb-1.5 flex items-center justify-between">
              <span>{hoveredProv.name}</span>
              <span className="text-[10px] text-slate-400 font-normal">
                Kode {hoveredProv.code}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mb-2">
              Ibu Kota: <strong>{hoveredProv.capital}</strong>
            </p>
            <div className="grid grid-cols-2 gap-1.5 text-[10px] mb-1">
              <div className="bg-slate-800/80 p-1.5 rounded">
                <span className="text-slate-400 block">Total Peserta</span>
                <span className="font-bold text-yellow-400 text-xs">
                  {hoveredProv.totalParticipants.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="bg-slate-800/80 p-1.5 rounded">
                <span className="text-slate-400 block">Program Aktif</span>
                <span className="font-bold text-white text-xs">
                  {hoveredProv.totalEvents}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Selected Province Summary Panel */}
      {selectedProvince && (
        <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-4 text-xs text-slate-300 animate-fadeIn space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700 pb-2">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <div>
                <h4 className="font-bold text-sm text-white font-serif">
                  Detail Kinerja Google Maps: {selectedProvince.name} (Ibu Kota:{" "}
                  {selectedProvince.capital})
                </h4>
                <p className="text-[11px] text-slate-400">
                  Wilayah Pulau: {selectedProvince.islandGroup} | Kode:{" "}
                  {selectedProvince.code}
                </p>
              </div>
            </div>
            <button
              onClick={() => onSelectProvince(null)}
              className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-2.5 py-1 rounded text-xs transition-colors self-start sm:self-auto"
            >
              Tutup Rincian
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700">
              <span className="text-slate-400 text-[11px]">Realisasi Peserta</span>
              <div className="text-base font-bold text-yellow-400 mt-0.5">
                {selectedProvince.totalParticipants.toLocaleString("id-ID")}
              </div>
              <span className="text-[10px] text-slate-500">
                Target: {selectedProvince.targetParticipants.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700">
              <span className="text-slate-400 text-[11px]">Persentase Capaian</span>
              <div className="text-base font-bold text-emerald-400 mt-0.5">
                {(
                  (selectedProvince.totalParticipants /
                    selectedProvince.targetParticipants) *
                  100
                ).toFixed(1)}
                %
              </div>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700">
              <span className="text-slate-400 text-[11px]">Program Pembinaan</span>
              <div className="text-base font-bold text-white mt-0.5">
                {selectedProvince.totalEvents} Kegiatan
              </div>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700">
              <span className="text-slate-400 text-[11px]">Kab/Kota Teraktif</span>
              <div className="text-xs font-medium text-slate-200 mt-0.5 truncate">
                {selectedProvince.topRegencies.join(", ")}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
