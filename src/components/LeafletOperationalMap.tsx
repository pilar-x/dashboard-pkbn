import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import {
  mockOperationalLocations,
  OperationalCategory,
  OperationalLocation,
} from "../data/mockOperationalLocations";
import { ProvinceData } from "../types";
import {
  Shield,
  Layers,
  MapPin,
  Eye,
  Crosshair,
  Search,
  Radio,
  Building2,
  Activity,
  Award,
  Compass,
  Maximize2,
  RotateCcw,
  Info,
  Phone,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Globe,
  Sliders,
} from "lucide-react";

interface LeafletOperationalMapProps {
  provinces?: ProvinceData[];
  selectedProvince?: ProvinceData | null;
  onSelectProvince?: (prov: ProvinceData | null) => void;
}

// Tile Layer Configuration
type TileLayerMode = "dark" | "satellite" | "terrain";

const TILE_LAYERS = {
  dark: {
    name: "Mode Gelap (CartoDB Dark Matter)",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 19,
  },
  satellite: {
    name: "Mode Satelit (Esri World Imagery)",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    maxZoom: 18,
  },
  terrain: {
    name: "Mode Terrain (OpenTopoMap)",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution:
      'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, SRTM | Style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
    maxZoom: 17,
  },
};

// Custom Military Tactical L.divIcon Creator
function createMilitaryDivIcon(category: OperationalCategory, isSelected: boolean) {
  let colorClass = "bg-emerald-500 border-emerald-300 text-emerald-950 pulse-dot-green";
  let iconSymbol = "🛡️";

  if (category === "TNI") {
    colorClass = "bg-emerald-500 border-emerald-300 text-emerald-950 pulse-dot-green";
    iconSymbol = "🎖️";
  } else if (category === "Polri") {
    colorClass = "bg-blue-500 border-blue-300 text-blue-950 pulse-dot-blue";
    iconSymbol = "👮";
  } else if (category === "Instansi Pemerintah") {
    colorClass = "bg-cyan-500 border-cyan-300 text-cyan-950 pulse-dot-blue";
    iconSymbol = "🏛️";
  }

  const selectedRing = isSelected ? "ring-4 ring-yellow-400 scale-125" : "";

  const html = `
    <div className="relative group flex flex-col items-center justify-center cursor-pointer">
      <div class="w-7 h-7 rounded-full ${colorClass} ${selectedRing} border-2 flex items-center justify-center shadow-2xl transition-transform transform group-hover:scale-125">
        <span class="text-[11px] font-bold select-none">${iconSymbol}</span>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: "custom-military-marker",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
  });
}

// Controller component to programmatically pan/zoom map
function MapFlyController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 1.5,
    });
  }, [center, zoom, map]);
  return null;
}

export const LeafletOperationalMap: React.FC<LeafletOperationalMapProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [selectedLocation, setSelectedLocation] = useState<OperationalLocation | null>(
    mockOperationalLocations[0]
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mapCenter, setMapCenter] = useState<[number, number]>([-2.5489, 118.0149]);
  const [mapZoom, setMapZoom] = useState<number>(5);

  // Filtered Locations
  const filteredLocations = mockOperationalLocations.filter((loc) => {
    const matchCategory =
      selectedCategory === "Semua" || loc.category === selectedCategory;
    const matchSearch =
      searchQuery === "" ||
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.typeDetail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleSelectLocation = (loc: OperationalLocation) => {
    setSelectedLocation(loc);
    setMapCenter([loc.latLng.lat, loc.latLng.lng]);
    setMapZoom(11);
  };

  const handleResetView = () => {
    setMapCenter([-2.5489, 118.0149]);
    setMapZoom(5);
    setSearchQuery("");
    setSelectedCategory("Semua");
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-4 relative overflow-hidden">
      {/* Header & Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-red-950 text-red-400 border border-red-800 flex items-center justify-center shrink-0">
            <Radio className="w-4 h-4 animate-pulse text-red-500" />
          </div>
          <h3 className="text-base font-bold text-white font-serif tracking-wide">
            Peta Interaktif Monitoring Real-Time
          </h3>
        </div>
      </div>

      {/* Category Filter Pills & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-xs">
        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {["Semua", "TNI", "Polri", "Instansi Pemerintah"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? "bg-red-600 text-white border-red-500 shadow-md shadow-red-950"
                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Reset */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Cari lokasi, kota, objek..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:border-red-500"
            />
          </div>

          <button
            onClick={handleResetView}
            title="Reset Posisi Peta"
            className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Leaflet Map Viewport */}
      <div className="relative w-full h-[520px] rounded-xl overflow-hidden border border-slate-800 shadow-2xl z-0">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          zoomControl={true}
          style={{ width: "100%", height: "100%", zIndex: 1 }}
        >
          {/* Helper controller for programmatic center/zoom animations */}
          <MapFlyController center={mapCenter} zoom={mapZoom} />

          {/* Active Tile Layer */}
          <TileLayer
            url={TILE_LAYERS.dark.url}
            attribution={TILE_LAYERS.dark.attribution}
            maxZoom={TILE_LAYERS.dark.maxZoom}
          />

          {/* Location Markers */}
          {filteredLocations.map((loc) => {
            const isSelected = selectedLocation?.id === loc.id;
            const icon = createMilitaryDivIcon(loc.category, isSelected);

            return (
              <Marker
                key={loc.id}
                position={[loc.latLng.lat, loc.latLng.lng]}
                icon={icon}
                eventHandlers={{
                  click: () => handleSelectLocation(loc),
                }}
              >
                <Popup className="custom-leaflet-popup" closeButton={true}>
                  <div className="p-3 text-slate-100 font-sans min-w-[240px] max-w-[280px]">
                    <div className="flex items-center justify-between border-b border-slate-700/80 pb-2 mb-2">
                      <span className="font-bold text-xs text-white font-serif tracking-wide truncate">
                        {loc.name}
                      </span>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold uppercase shrink-0 ${
                          loc.category === "TNI"
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-700"
                            : loc.category === "Polri"
                            ? "bg-blue-950 text-blue-300 border border-blue-700"
                            : "bg-cyan-950 text-cyan-300 border border-cyan-700"
                        }`}
                      >
                        {loc.category}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 mb-2">
                      {loc.typeDetail} &bull; {loc.city}, {loc.province}
                    </p>

                    <div className="grid grid-cols-2 gap-1.5 text-[10px] mb-2 bg-slate-900/90 p-2 rounded-lg border border-slate-800">
                      <div>
                        <span className="text-slate-400 block">Koordinat</span>
                        <span className="font-mono text-amber-400 font-semibold">
                          {loc.latLng.lat.toFixed(4)}, {loc.latLng.lng.toFixed(4)}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Elevasi</span>
                        <span className="font-mono text-emerald-400 font-semibold">
                          {loc.elevationMeters} mdpl
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Personel</span>
                        <span className="font-semibold text-white">
                          {loc.personnelCount.toLocaleString("id-ID")} Orang
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Pengamanan</span>
                        <span className="font-semibold text-red-400">
                          {loc.vitalSecurityLevel}
                        </span>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-400 border-t border-slate-800 pt-1.5 flex items-center justify-between">
                      <span>Status: <strong className="text-emerald-400">{loc.status}</strong></span>
                      <button
                        onClick={() => handleSelectLocation(loc)}
                        className="text-red-400 hover:underline font-semibold"
                      >
                        Lihat Rincian &rarr;
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Floating Top Radar / Tactical Indicator Badge */}
        <div className="absolute top-3 left-3 z-[400] bg-slate-950/90 border border-slate-800 rounded-xl p-2.5 shadow-2xl backdrop-blur-md text-xs text-slate-200 flex items-center space-x-3 pointer-events-auto">
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </div>
          <div>
            <span className="font-mono font-bold text-red-400 block text-[11px] tracking-wider">
              LIVE MONITORING
            </span>
            <span className="text-[10px] text-slate-400">
              {filteredLocations.length} Titik Lokasi Terdeteksi
            </span>
          </div>
        </div>

        {/* Floating Legend Badge Overlay */}
        <div className="absolute bottom-3 left-3 z-[400] bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-xl p-3 text-[11px] text-slate-200 shadow-2xl max-w-xs space-y-2 pointer-events-auto">
          <div className="font-bold text-white flex items-center justify-between border-b border-slate-800 pb-1">
            <span>Legenda Objek Taktis</span>
            <span className="text-[10px] text-red-400 font-mono">MILITARY</span>
          </div>
          <div className="grid grid-cols-3 gap-x-3 gap-y-1 text-[10px]">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 pulse-dot-green"></span>
              <span>🎖️ TNI</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 pulse-dot-blue"></span>
              <span>👮 Polri</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 pulse-dot-blue"></span>
              <span>🏛️ Instansi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Location Operational Detail Panel */}
      {selectedLocation && (
        <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 animate-fadeIn space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-950 text-red-400 border border-red-800 flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white font-serif">
                  Kartu Detail Koordinat: {selectedLocation.name}
                </h4>
                <p className="text-[11px] text-slate-400">
                  Kode: <strong className="text-amber-400 font-mono">{selectedLocation.code}</strong> | {selectedLocation.city}, {selectedLocation.province}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-1 rounded text-xs font-semibold">
                {selectedLocation.status}
              </span>
              <button
                onClick={() => setSelectedLocation(null)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded text-xs transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Koordinat Presisi</span>
              <span className="text-xs font-mono font-bold text-amber-400 mt-0.5 block">
                {selectedLocation.latLng.lat.toFixed(6)}, {selectedLocation.latLng.lng.toFixed(6)}
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5 block">
                Elevasi: {selectedLocation.elevationMeters} mdpl
              </span>
            </div>

            <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Kapasitas & Personel</span>
              <span className="text-xs font-bold text-white mt-0.5 block">
                {selectedLocation.personnelCount.toLocaleString("id-ID")} Personel Siaga
              </span>
              <span className="text-[10px] text-emerald-400 mt-0.5 block">
                Kapasitas Kader: {selectedLocation.capacityCadres.toLocaleString("id-ID")}
              </span>
            </div>

            <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Penanggung Jawab (PIC)</span>
              <span className="text-xs font-bold text-slate-200 mt-0.5 block truncate">
                {selectedLocation.picName}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5 block flex items-center gap-1">
                <Phone className="w-3 h-3 text-emerald-400" />
                {selectedLocation.picPhone}
              </span>
            </div>

            <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 text-[11px] block">Tingkat Keamanan Obvit</span>
              <span className="text-xs font-bold text-red-400 mt-0.5 block">
                {selectedLocation.vitalSecurityLevel}
              </span>
              <span className="text-[10px] text-slate-500 mt-0.5 block">
                Terakhir Diperbarui: {selectedLocation.lastUpdated}
              </span>
            </div>
          </div>

          {/* Description & Facilities List */}
          <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 flex flex-col sm:flex-row justify-between gap-3 text-xs">
            <div className="flex-1">
              <span className="font-semibold text-slate-200 block mb-1">
                Deskripsi Operasional:
              </span>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                {selectedLocation.description}
              </p>
            </div>
            <div className="shrink-0 sm:w-64 border-t sm:border-t-0 sm:border-l border-slate-800 pt-2 sm:pt-0 sm:pl-3">
              <span className="font-semibold text-slate-200 block mb-1">
                Fasilitas Strategis Utama:
              </span>
              <div className="flex flex-wrap gap-1">
                {selectedLocation.facilities.map((fac, i) => (
                  <span
                    key={i}
                    className="bg-slate-800 text-slate-300 border border-slate-700 text-[10px] px-2 py-0.5 rounded"
                  >
                    {fac}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
