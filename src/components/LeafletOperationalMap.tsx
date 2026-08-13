import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import {
  mockOperationalEvents,
  mockExecutiveProvinces,
  mockKodamIntensities,
  OperationalPKBNEvent,
  ExecutiveProvinceDetail,
  EventStatus,
  SectorCategory,
  TargetSubCategory,
} from "../data/mockOperationalEvents";
import { ProvinceData } from "../types";
import {
  Shield,
  Layers,
  MapPin,
  Eye,
  Search,
  Radio,
  Building2,
  Activity,
  Award,
  Maximize2,
  RotateCcw,
  Info,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Globe,
  Sliders,
  Play,
  Pause,
  Clock,
  Calendar,
  X,
  ChevronRight,
  TrendingUp,
  GraduationCap,
  Users,
  Filter,
} from "lucide-react";

interface LeafletOperationalMapProps {
  provinces?: ProvinceData[];
  programs?: ProgramItem[];
  selectedProvince?: ProvinceData | null;
  onSelectProvince?: (prov: ProvinceData | null) => void;
  theme?: "dark" | "light";
  externalSearchQuery?: string;
}

// Tile Layer Configuration
const TILE_LAYERS = {
  dark: {
    name: "Tactical Dark",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; CARTO & OpenStreetMap',
    maxZoom: 19,
  },
  light: {
    name: "Clean Light",
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution: '&copy; CARTO & OpenStreetMap',
    maxZoom: 19,
  },
  satellite: {
    name: "Satellite Esri",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Esri &mdash; World Imagery",
    maxZoom: 18,
  },
};

// Custom Marker Creator for Status Events
function createEventStatusDivIcon(
  status: EventStatus,
  sector: SectorCategory,
  isSelected: boolean
) {
  let colorBg = "bg-emerald-500 border-emerald-300 text-white pulse-dot-green";
  let statusBadge = "🟢";

  if (status === "Berlangsung") {
    colorBg = "bg-amber-400 border-amber-200 text-slate-900 pulse-dot-amber";
    statusBadge = "🟡";
  } else if (status === "Akan datang") {
    colorBg = "bg-blue-500 border-blue-200 text-white pulse-dot-blue";
    statusBadge = "🔵";
  } else if (status === "Ditunda") {
    colorBg = "bg-red-500 border-red-200 text-white pulse-dot-red";
    statusBadge = "🔴";
  }

  let sectorIcon = "🎓";
  if (sector === "Pekerjaan") sectorIcon = "🏢";
  if (sector === "Masyarakat") sectorIcon = "👥";

  const selectedRing = isSelected
    ? "ring-4 ring-yellow-400 scale-125 z-50"
    : "";

  const html = `
    <div class="relative group flex items-center justify-center cursor-pointer">
      <div class="w-8 h-8 rounded-full ${colorBg} ${selectedRing} border-2 flex items-center justify-center shadow-xl transition-all transform group-hover:scale-125">
        <span class="text-[12px] font-bold select-none">${sectorIcon}</span>
      </div>
      <span class="absolute -top-1 -right-1 text-[10px] leading-none">${statusBadge}</span>
    </div>
  `;

  return L.divIcon({
    html,
    className: "custom-event-status-marker",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });
}

// Custom Marker Creator for Coverage Map (Tingkat Cakupan Wilayah)
function createCoverageDivIcon(province: ExecutiveProvinceDetail, isSelected: boolean) {
  let colorBg = "bg-emerald-600 border-emerald-300 text-white";
  let labelText = `${province.targetPercent}%`;

  if (province.coverageCategory === "Sangat Tinggi") {
    colorBg = "bg-emerald-600 border-emerald-300 text-white pulse-dot-green";
  } else if (province.coverageCategory === "Tinggi") {
    colorBg = "bg-lime-500 border-lime-200 text-slate-900";
  } else if (province.coverageCategory === "Sedang") {
    colorBg = "bg-yellow-500 border-yellow-200 text-slate-900 pulse-dot-amber";
  } else if (province.coverageCategory === "Rendah") {
    colorBg = "bg-red-500 border-red-200 text-white pulse-dot-red";
  } else if (province.coverageCategory === "Belum Terjangkau") {
    colorBg = "bg-slate-600 border-slate-400 text-slate-200 opacity-80";
  }

  const selectedRing = isSelected ? "ring-4 ring-amber-400 scale-125" : "";

  const html = `
    <div class="relative group flex flex-col items-center justify-center cursor-pointer">
      <div class="px-2 py-1 rounded-lg ${colorBg} ${selectedRing} border shadow-lg text-[10px] font-mono font-bold whitespace-nowrap transition-transform transform group-hover:scale-110">
        ${province.name.split(" ")[0]} ${labelText}
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: "custom-coverage-marker",
    iconSize: [60, 24],
    iconAnchor: [30, 12],
    popupAnchor: [0, -12],
  });
}

// Controller component to programmatically pan/zoom map
function MapFlyController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 1.2,
    });
  }, [center, zoom, map]);
  return null;
}

export const LeafletOperationalMap: React.FC<LeafletOperationalMapProps> = ({
  programs,
  selectedProvince: parentSelectedProvince,
  onSelectProvince,
  theme = "dark",
  externalSearchQuery = "",
}) => {
  const isDark = theme === "dark";

  // Combine static mock operational events with live programs added dynamically by Kodam/Pusat
  const allOperationalEvents = React.useMemo(() => {
    if (!programs || programs.length === 0) return mockOperationalEvents;

    const dynamicEvents: OperationalPKBNEvent[] = programs.map((p, idx) => {
      const matchedProv = mockExecutiveProvinces.find(
        (ep) =>
          ep.name.toLowerCase().includes(p.province.toLowerCase()) ||
          p.province.toLowerCase().includes(ep.name.toLowerCase())
      );
      const baseLatLng = matchedProv
        ? matchedProv.latLng
        : { lat: -6.9175, lng: 107.6191 };

      const latJitter = ((idx % 7) - 3) * 0.12;
      const lngJitter = (((idx * 5) % 7) - 3) * 0.15;

      const dateObj = new Date(p.startDate || "2026-08-15");
      const monthNum = isNaN(dateObj.getMonth()) ? 8 : dateObj.getMonth() + 1;

      return {
        id: p.id,
        code: p.code,
        name: p.title,
        sector: p.sector,
        subCategory: (p.subCategory as TargetSubCategory) || "Organisasi",
        organizer: p.organizer,
        province: p.province,
        regency: p.regency,
        latLng: {
          lat: baseLatLng.lat + latJitter,
          lng: baseLatLng.lng + lngJitter,
        },
        date: p.startDate,
        month: monthNum,
        participantCount: p.participantCount,
        targetCount: p.targetCount,
        instructor: p.instructorName,
        status:
          p.status === "Berlangsung"
            ? "Berlangsung"
            : p.status === "Selesai"
            ? "Selesai"
            : "Akan datang",
        documentationText: p.description,
        kodam: p.kodamOrigin || "Kodam",
      };
    });

    const existingIds = new Set(mockOperationalEvents.map((e) => e.id));
    const newItems = dynamicEvents.filter((e) => !existingIds.has(e.id));
    return [...newItems, ...mockOperationalEvents];
  }, [programs]);

  // Map View Mode: 'titik' | 'heatmap' | 'coverage' | 'bubble'
  const [mapMode, setMapMode] = useState<"titik" | "heatmap" | "coverage" | "bubble">("titik");

  // Map state
  const [mapCenter, setMapCenter] = useState<[number, number]>([-2.5489, 118.0149]);
  const [mapZoom, setMapZoom] = useState<number>(5);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Selected Province Detail for Right Panel
  const [selectedExecutiveProvince, setSelectedExecutiveProvince] = useState<ExecutiveProvinceDetail | null>(
    mockExecutiveProvinces[0] // Default #1 Ranked Region (DKI Jakarta)
  );

  // Sync parentSelectedProvince if passed from outside
  useEffect(() => {
    if (parentSelectedProvince) {
      const matched = mockExecutiveProvinces.find(
        (ep) =>
          ep.id === parentSelectedProvince.id ||
          ep.name.toLowerCase() === parentSelectedProvince.name.toLowerCase()
      );
      if (matched) {
        setSelectedExecutiveProvince(matched);
        setMapCenter([matched.latLng.lat, matched.latLng.lng]);
        setMapZoom(7);
      }
    }
  }, [parentSelectedProvince]);

  // Selected Event Marker
  const [selectedEvent, setSelectedEvent] = useState<OperationalPKBNEvent | null>(
    mockOperationalEvents[0]
  );

  // Timeline Playback State (1 - 12 for Jan - Des 2026)
  const [timelineMonth, setTimelineMonth] = useState<number>(12); // Default All Months up to Dec
  const [isPlayingTimeline, setIsPlayingTimeline] = useState<boolean>(false);
  const timelineIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Layer Filter Toggles (Layer Khusus)
  const [layerFilters, setLayerFilters] = useState<{
    pendidikan: boolean;
    pekerjaan: boolean;
    masyarakat: boolean;
    kampungBelaNegara: boolean;
    sekolah: boolean;
    perguruanTinggi: boolean;
    instansi: boolean;
    organisasi: boolean;
    relawan: boolean;
    kegiatanBerjalan: boolean;
    kegiatanSelesai: boolean;
  }>({
    pendidikan: true,
    pekerjaan: true,
    masyarakat: true,
    kampungBelaNegara: true,
    sekolah: true,
    perguruanTinggi: true,
    instansi: true,
    organisasi: true,
    relawan: true,
    kegiatanBerjalan: true,
    kegiatanSelesai: true,
  });

  const [showLayerControlPanel, setShowLayerControlPanel] = useState<boolean>(false);
  const [showRankingPanel, setShowRankingPanel] = useState<boolean>(true);

  // Timeline Playback Effect
  useEffect(() => {
    if (isPlayingTimeline) {
      timelineIntervalRef.current = setInterval(() => {
        setTimelineMonth((prev) => (prev >= 12 ? 1 : prev + 1));
      }, 1500);
    } else {
      if (timelineIntervalRef.current) clearInterval(timelineIntervalRef.current);
    }
    return () => {
      if (timelineIntervalRef.current) clearInterval(timelineIntervalRef.current);
    };
  }, [isPlayingTimeline]);

  // Month names for timeline display
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  // Toggle Layer Filter Helper
  const toggleLayer = (key: keyof typeof layerFilters) => {
    setLayerFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Filtered Events based on Timeline + Search + Layers
  const filteredEvents = allOperationalEvents.filter((ev) => {
    // 1. Month timeline filter
    if (ev.month > timelineMonth) return false;

    // 2. Sector filter
    if (ev.sector === "Pendidikan" && !layerFilters.pendidikan) return false;
    if (ev.sector === "Pekerjaan" && !layerFilters.pekerjaan) return false;
    if (ev.sector === "Masyarakat" && !layerFilters.masyarakat) return false;

    // 3. SubCategory filter
    if (ev.subCategory === "Kampung Bela Negara" && !layerFilters.kampungBelaNegara) return false;
    if (ev.subCategory === "Sekolah" && !layerFilters.sekolah) return false;
    if (ev.subCategory === "Perguruan Tinggi" && !layerFilters.perguruanTinggi) return false;
    if (ev.subCategory === "Instansi" && !layerFilters.instansi) return false;
    if (ev.subCategory === "Organisasi" && !layerFilters.organisasi) return false;
    if (ev.subCategory === "Relawan" && !layerFilters.relawan) return false;

    // 4. Status filter
    if (ev.status === "Berlangsung" && !layerFilters.kegiatanBerjalan) return false;
    if (ev.status === "Selesai" && !layerFilters.kegiatanSelesai) return false;

    // 5. Search query (combines header search and map local search)
    const activeQuery = (externalSearchQuery || searchQuery).trim();
    if (activeQuery !== "") {
      const q = activeQuery.toLowerCase();
      const matchName = ev.name.toLowerCase().includes(q);
      const matchProv = ev.province.toLowerCase().includes(q);
      const matchReg = ev.regency.toLowerCase().includes(q);
      const matchOrg = ev.organizer.toLowerCase().includes(q);
      const matchSector = ev.sector?.toLowerCase().includes(q);
      if (!matchName && !matchProv && !matchReg && !matchOrg && !matchSector) return false;
    }

    return true;
  });

  // Handle clicking a province
  const handleSelectProvinceDetail = (provDetail: ExecutiveProvinceDetail) => {
    setSelectedExecutiveProvince(provDetail);
    setMapCenter([provDetail.latLng.lat, provDetail.latLng.lng]);
    setMapZoom(7);

    // Call parent handler if needed
    if (onSelectProvince && parentSelectedProvince?.id !== provDetail.id) {
      const parentProv = {
        id: provDetail.id,
        code: provDetail.code,
        name: provDetail.name,
        capital: provDetail.capital,
        islandGroup: "Sumatra" as const,
        totalEvents: provDetail.programCount,
        totalParticipants: provDetail.participantCount,
        targetParticipants: Math.round(provDetail.participantCount / 0.8),
        status: "Tinggi" as const,
        coordinates: { x: 50, y: 50 },
        latLng: provDetail.latLng,
        topRegencies: [provDetail.capital],
        activeInstitutions: provDetail.instansiCount + provDetail.perguruanTinggiCount,
      };
      onSelectProvince(parentProv);
    }
  };

  // Reset view to national scale
  const handleResetMap = () => {
    setMapCenter([-2.5489, 118.0149]);
    setMapZoom(5);
    setSearchQuery("");
    setTimelineMonth(12);
    setIsPlayingTimeline(false);
  };

  return (
    <div className={`rounded-2xl border p-4 sm:p-5 shadow-2xl space-y-4 relative overflow-hidden transition-all ${
      isDark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
    }`}>
      {/* 1. Header & Executive Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b pb-3 border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-red-900 text-red-100 flex items-center justify-center shrink-0 shadow-lg border border-red-700">
            <Radio className="w-5 h-5 animate-pulse text-red-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">
                OPERATIONAL AWARENESS MAP
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">| Dashboard Pimpinan</span>
            </div>
            <h3 className={`text-lg font-bold font-serif ${isDark ? "text-white" : "text-slate-900"}`}>
              Peta Pemantauan Operasional & Keterjangkauan PKBN
            </h3>
          </div>
        </div>

        {/* View Mode Switcher Pills */}
        <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs overflow-x-auto scrollbar-none">
          <button
            onClick={() => setMapMode("titik")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              mapMode === "titik"
                ? "bg-red-700 text-white shadow-md shadow-red-950/40"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>1. Titik Kegiatan</span>
          </button>

          <button
            onClick={() => setMapMode("heatmap")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              mapMode === "heatmap"
                ? "bg-red-700 text-white shadow-md shadow-red-950/40"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>2. Heatmap Kodam</span>
          </button>

          <button
            onClick={() => setMapMode("coverage")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              mapMode === "coverage"
                ? "bg-red-700 text-white shadow-md shadow-red-950/40"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3. Cakupan Target</span>
          </button>

          <button
            onClick={() => setMapMode("bubble")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              mapMode === "bubble"
                ? "bg-red-700 text-white shadow-md shadow-red-950/40"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>4. Bubble Peserta</span>
          </button>
        </div>
      </div>

      {/* 2. Controls Toolbar: Search & Layer Toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama kegiatan, kota, provinsi, penyelenggara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full text-xs rounded-lg pl-9 pr-3 py-2 border focus:outline-none focus:border-red-500 transition-colors ${
              isDark
                ? "bg-slate-900 border-slate-700 text-white placeholder-slate-500"
                : "bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-sm"
            }`}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          {/* Layer Filter Toggle Button */}
          <button
            onClick={() => setShowLayerControlPanel(!showLayerControlPanel)}
            className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center space-x-1.5 border transition-all ${
              showLayerControlPanel
                ? "bg-red-700 text-white border-red-600"
                : isDark
                ? "bg-slate-900 text-slate-300 border-slate-700 hover:text-white"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Layer Khusus</span>
          </button>

          {/* Ranking & Heatmap Toggle Panel */}
          <button
            onClick={() => setShowRankingPanel(!showRankingPanel)}
            className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center space-x-1.5 border transition-all ${
              showRankingPanel
                ? "bg-slate-800 dark:bg-slate-800 text-white border-slate-700"
                : isDark
                ? "bg-slate-900 text-slate-300 border-slate-700"
                : "bg-white text-slate-700 border-slate-300"
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>Top 10 & Progress</span>
          </button>

          {/* Reset View Button */}
          <button
            onClick={handleResetMap}
            title="Reset Peta Ke Tampilan Nasional"
            className={`p-2 rounded-lg border transition-colors ${
              isDark
                ? "bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border-slate-700"
                : "bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-300"
            }`}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Layer Filter Control Drawer / Collapsible Box */}
      {showLayerControlPanel && (
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 animate-fadeIn space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-white font-serif flex items-center space-x-2">
              <Sliders className="w-4 h-4 text-red-500" />
              <span>Layer Khusus Operasional (Filter Sasaran & Status)</span>
            </span>
            <button
              onClick={() => setShowLayerControlPanel(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-[11px]">
            {/* Sector Filters */}
            <label className="flex items-center space-x-2 bg-slate-900 p-2 rounded border border-slate-800 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={layerFilters.pendidikan}
                onChange={() => toggleLayer("pendidikan")}
                className="rounded accent-red-600"
              />
              <span>🎓 Pendidikan</span>
            </label>

            <label className="flex items-center space-x-2 bg-slate-900 p-2 rounded border border-slate-800 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={layerFilters.pekerjaan}
                onChange={() => toggleLayer("pekerjaan")}
                className="rounded accent-red-600"
              />
              <span>🏢 Pekerjaan</span>
            </label>

            <label className="flex items-center space-x-2 bg-slate-900 p-2 rounded border border-slate-800 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={layerFilters.masyarakat}
                onChange={() => toggleLayer("masyarakat")}
                className="rounded accent-red-600"
              />
              <span>👥 Masyarakat</span>
            </label>

            {/* SubCategories */}
            <label className="flex items-center space-x-2 bg-slate-900 p-2 rounded border border-slate-800 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={layerFilters.kampungBelaNegara}
                onChange={() => toggleLayer("kampungBelaNegara")}
                className="rounded accent-red-600"
              />
              <span>🏕️ Kampung Bela Negara</span>
            </label>

            <label className="flex items-center space-x-2 bg-slate-900 p-2 rounded border border-slate-800 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={layerFilters.sekolah}
                onChange={() => toggleLayer("sekolah")}
                className="rounded accent-red-600"
              />
              <span>🏫 Sekolah</span>
            </label>

            <label className="flex items-center space-x-2 bg-slate-900 p-2 rounded border border-slate-800 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={layerFilters.perguruanTinggi}
                onChange={() => toggleLayer("perguruanTinggi")}
                className="rounded accent-red-600"
              />
              <span>🏛️ Perguruan Tinggi</span>
            </label>

            <label className="flex items-center space-x-2 bg-slate-900 p-2 rounded border border-slate-800 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={layerFilters.instansi}
                onChange={() => toggleLayer("instansi")}
                className="rounded accent-red-600"
              />
              <span>🏛️ Instansi Govt/BUMN</span>
            </label>

            <label className="flex items-center space-x-2 bg-slate-900 p-2 rounded border border-slate-800 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={layerFilters.organisasi}
                onChange={() => toggleLayer("organisasi")}
                className="rounded accent-red-600"
              />
              <span>🎗️ Organisasi/Ormas</span>
            </label>

            <label className="flex items-center space-x-2 bg-slate-900 p-2 rounded border border-slate-800 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={layerFilters.relawan}
                onChange={() => toggleLayer("relawan")}
                className="rounded accent-red-600"
              />
              <span>🤝 Relawan Bela Negara</span>
            </label>

            {/* Statuses */}
            <label className="flex items-center space-x-2 bg-slate-900 p-2 rounded border border-slate-800 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={layerFilters.kegiatanBerjalan}
                onChange={() => toggleLayer("kegiatanBerjalan")}
                className="rounded accent-red-600"
              />
              <span>🟡 Kegiatan Berjalan</span>
            </label>

            <label className="flex items-center space-x-2 bg-slate-900 p-2 rounded border border-slate-800 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={layerFilters.kegiatanSelesai}
                onChange={() => toggleLayer("kegiatanSelesai")}
                className="rounded accent-red-600"
              />
              <span>🟢 Kegiatan Selesai</span>
            </label>
          </div>
        </div>
      )}

      {/* 4. Main Interactive Map Container with Overlay Panels */}
      <div className="relative w-full h-[580px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl z-0">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          zoomControl={true}
          style={{ width: "100%", height: "100%", zIndex: 1 }}
        >
          <MapFlyController center={mapCenter} zoom={mapZoom} />

          {/* Tile Layer based on theme */}
          <TileLayer
            url={isDark ? TILE_LAYERS.dark.url : TILE_LAYERS.light.url}
            attribution={TILE_LAYERS.dark.attribution}
            maxZoom={19}
          />

          {/* MODE 1: Titik Kegiatan (Status Markers) */}
          {mapMode === "titik" &&
            filteredEvents.map((ev) => {
              const isSelected = selectedEvent?.id === ev.id;
              const icon = createEventStatusDivIcon(ev.status, ev.sector, isSelected);

              return (
                <Marker
                  key={ev.id}
                  position={[ev.latLng.lat, ev.latLng.lng]}
                  icon={icon}
                  eventHandlers={{
                    click: () => {
                      setSelectedEvent(ev);
                    },
                  }}
                >
                  <Popup className="custom-leaflet-popup" closeButton={true}>
                    <div className="p-3.5 text-slate-100 font-sans min-w-[260px] max-w-[300px]">
                      <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-2">
                        <span className="font-bold text-xs text-white font-serif leading-snug line-clamp-2">
                          {ev.name}
                        </span>
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold shrink-0 ml-1 ${
                            ev.status === "Selesai"
                              ? "bg-emerald-950 text-emerald-300 border border-emerald-700"
                              : ev.status === "Berlangsung"
                              ? "bg-amber-950 text-amber-300 border border-amber-700"
                              : ev.status === "Akan datang"
                              ? "bg-blue-950 text-blue-300 border border-blue-700"
                              : "bg-red-950 text-red-300 border border-red-700"
                          }`}
                        >
                          {ev.status}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-[11px] text-slate-300 mb-2">
                        <p>
                          <strong>Penyelenggara:</strong> {ev.organizer}
                        </p>
                        <p>
                          <strong>Lokasi:</strong> {ev.regency}, {ev.province}
                        </p>
                        <p>
                          <strong>Tanggal:</strong> {ev.date}
                        </p>
                        <p>
                          <strong>Peserta:</strong>{" "}
                          <span className="text-amber-400 font-bold">
                            {ev.participantCount.toLocaleString("id-ID")}
                          </span>{" "}
                          / {ev.targetCount.toLocaleString("id-ID")} Target
                        </p>
                      </div>

                      {ev.photoUrl && (
                        <div className="w-full h-24 rounded-lg overflow-hidden my-2 border border-slate-700 relative">
                          <img
                            src={ev.photoUrl}
                            alt={ev.name}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-1 right-1 text-[9px] bg-slate-950/80 px-1.5 py-0.5 rounded text-slate-300 font-mono">
                            Dokumentasi Resmi
                          </span>
                        </div>
                      )}

                      <p className="text-[10px] text-slate-400 italic mb-2 border-t border-slate-800 pt-1.5 line-clamp-2">
                        "{ev.documentationText}"
                      </p>

                      <div className="flex items-center justify-between text-[10px] border-t border-slate-800 pt-2">
                        <span className="text-slate-400">Instruktur: {ev.instructor}</span>
                        <button
                          onClick={() => {
                            const foundProv = mockExecutiveProvinces.find(
                              (p) => p.name.toLowerCase() === ev.province.toLowerCase()
                            );
                            if (foundProv) handleSelectProvinceDetail(foundProv);
                          }}
                          className="text-red-400 hover:underline font-bold"
                        >
                          Rincian Wilayah &rarr;
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}

          {/* MODE 2 & MODE 3: Coverage Map (Tingkat Cakupan Wilayah & Heatmap Pins) */}
          {(mapMode === "coverage" || mapMode === "heatmap") &&
            mockExecutiveProvinces.map((prov) => {
              const isSelected = selectedExecutiveProvince?.id === prov.id;
              const icon = createCoverageDivIcon(prov, isSelected);

              return (
                <Marker
                  key={prov.id}
                  position={[prov.latLng.lat, prov.latLng.lng]}
                  icon={icon}
                  eventHandlers={{
                    click: () => handleSelectProvinceDetail(prov),
                  }}
                >
                  <Popup className="custom-leaflet-popup" closeButton={true}>
                    <div className="p-3 text-slate-100 font-sans min-w-[220px]">
                      <h4 className="font-bold text-xs text-white font-serif border-b border-slate-700 pb-1 mb-1">
                        {prov.name}
                      </h4>
                      <p className="text-[11px] text-slate-300">
                        Target Capaian: <strong className="text-emerald-400">{prov.targetPercent}%</strong>
                      </p>
                      <p className="text-[11px] text-slate-300">
                        Total Program: <strong>{prov.programCount}</strong>
                      </p>
                      <p className="text-[11px] text-slate-300">
                        Peserta: <strong>{prov.participantCount.toLocaleString("id-ID")}</strong>
                      </p>
                      <button
                        onClick={() => handleSelectProvinceDetail(prov)}
                        className="mt-2 w-full bg-red-700 hover:bg-red-800 text-white text-[10px] font-bold py-1 rounded transition-colors"
                      >
                        Buka Panel Pimpinan &rarr;
                      </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}

          {/* MODE 4: Bubble Map (Jumlah Peserta) */}
          {mapMode === "bubble" &&
            mockExecutiveProvinces.map((prov) => {
              const radius = Math.max(12, Math.min(48, Math.sqrt(prov.participantCount) / 1.8));
              const isSelected = selectedExecutiveProvince?.id === prov.id;

              return (
                <CircleMarker
                  key={`bubble-${prov.id}`}
                  center={[prov.latLng.lat, prov.latLng.lng]}
                  radius={radius}
                  pathOptions={{
                    fillColor: isSelected ? "#eab308" : "#2563eb",
                    fillOpacity: 0.6,
                    color: isSelected ? "#fef08a" : "#60a5fa",
                    weight: isSelected ? 3 : 1.5,
                  }}
                  eventHandlers={{
                    click: () => handleSelectProvinceDetail(prov),
                  }}
                >
                  <Popup className="custom-leaflet-popup">
                    <div className="p-2.5 text-xs text-white">
                      <strong className="block font-serif text-amber-400">{prov.name}</strong>
                      <span>{prov.participantCount.toLocaleString("id-ID")} Peserta Capaian</span>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
        </MapContainer>



        {/* Floating Legend Overlay (Bottom Left) */}
        <div className="absolute bottom-16 left-3 z-[400] bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-xl p-3 text-[11px] text-slate-200 shadow-2xl max-w-xs space-y-2 pointer-events-auto hidden sm:block">
          <div className="font-bold text-white flex items-center justify-between border-b border-slate-800 pb-1 font-serif">
            <span>Legenda Status Operational Map</span>
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px]">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 pulse-dot-green"></span>
              <span>🟢 Selesai</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 pulse-dot-amber"></span>
              <span>🟡 Berlangsung</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 pulse-dot-blue"></span>
              <span>🔵 Akan Datang</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 pulse-dot-red"></span>
              <span>🔴 Ditunda</span>
            </div>
          </div>
        </div>

        {/* 5. Right Side Panel: PANEL INFORMASI WILAYAH (Klik Provinsi) */}
        {selectedExecutiveProvince && (
          <div className="absolute top-3 right-3 bottom-16 w-80 sm:w-96 z-[400] bg-slate-950/95 backdrop-blur-md border border-slate-800 rounded-2xl p-4 text-xs text-slate-200 shadow-2xl overflow-y-auto pointer-events-auto animate-fadeIn space-y-3.5">
            {/* Header Panel */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-red-950 text-red-400 border border-red-800 flex items-center justify-center font-bold">
                  #{selectedExecutiveProvince.nationalRank}
                </div>
                <div>
                  <span className="text-[10px] text-amber-400 font-mono block">
                    PANEL INFORMASI WILAYAH
                  </span>
                  <h4 className="text-base font-bold text-white font-serif tracking-wide uppercase">
                    {selectedExecutiveProvince.name}
                  </h4>
                </div>
              </div>
              <button
                onClick={() => setSelectedExecutiveProvince(null)}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Target Capaian Progress Bar */}
            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-semibold">Target Capaian PKBN</span>
                <span className="font-bold text-emerald-400 font-mono text-sm">
                  {selectedExecutiveProvince.targetPercent}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                  style={{ width: `${selectedExecutiveProvince.targetPercent}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>Kategori: <strong className="text-slate-300">{selectedExecutiveProvince.coverageCategory}</strong></span>
                <span>Ranking Nasional: <strong className="text-amber-400">#{selectedExecutiveProvince.nationalRank}</strong></span>
              </div>
            </div>

            {/* Executive Data Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Program PKBN</span>
                <span className="text-sm font-bold text-white mt-0.5 block font-mono">
                  {selectedExecutiveProvince.programCount}
                </span>
              </div>

              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Peserta Terbina</span>
                <span className="text-sm font-bold text-amber-400 mt-0.5 block font-mono">
                  {selectedExecutiveProvince.participantCount.toLocaleString("id-ID")}
                </span>
              </div>

              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Sekolah</span>
                <span className="text-sm font-bold text-blue-400 mt-0.5 block font-mono">
                  {selectedExecutiveProvince.sekolahCount}
                </span>
              </div>

              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Perguruan Tinggi</span>
                <span className="text-sm font-bold text-indigo-400 mt-0.5 block font-mono">
                  {selectedExecutiveProvince.perguruanTinggiCount}
                </span>
              </div>

              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Instansi Govt/BUMN</span>
                <span className="text-sm font-bold text-cyan-400 mt-0.5 block font-mono">
                  {selectedExecutiveProvince.instansiCount}
                </span>
              </div>

              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Organisasi / Ormas</span>
                <span className="text-sm font-bold text-purple-400 mt-0.5 block font-mono">
                  {selectedExecutiveProvince.organisasiCount}
                </span>
              </div>

              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Relawan Bela Negara</span>
                <span className="text-sm font-bold text-emerald-400 mt-0.5 block font-mono">
                  {selectedExecutiveProvince.relawanCount}
                </span>
              </div>

              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Kampung Bela Negara</span>
                <span className="text-sm font-bold text-rose-400 mt-0.5 block font-mono">
                  {selectedExecutiveProvince.kampungBelaNegaraCount}
                </span>
              </div>
            </div>

            {/* Kodam & Command Details */}
            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1 text-[11px]">
              <span className="text-slate-400 block">Komando Daerah Militer (Kodam):</span>
              <strong className="text-slate-200 font-serif block text-xs">
                {selectedExecutiveProvince.kodam}
              </strong>
              <span className="text-[10px] text-slate-500 block">
                Ibukota Provinsi: {selectedExecutiveProvince.capital}
              </span>
            </div>
          </div>
        )}

        {/* 6. Timeline Playback Control Bar (Jan - Des 2026 Slider) */}
        <div className="absolute bottom-2 left-3 right-3 z-[400] bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-xl p-2.5 shadow-2xl text-xs text-slate-200 flex items-center space-x-3 pointer-events-auto">
          {/* Play / Pause Button */}
          <button
            onClick={() => setIsPlayingTimeline(!isPlayingTimeline)}
            className="w-8 h-8 rounded-lg bg-red-700 hover:bg-red-800 text-white flex items-center justify-center shrink-0 shadow-lg transition-colors"
            title={isPlayingTimeline ? "Hentikan Simulation" : "Mulai Timeline Playback"}
          >
            {isPlayingTimeline ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          {/* Month Label */}
          <div className="shrink-0 w-28 text-left">
            <span className="text-[10px] text-slate-400 block font-mono">TIMELINE PLAYBACK</span>
            <span className="font-bold text-amber-400 font-serif text-xs">
              {monthNames[timelineMonth - 1]} 2026
            </span>
          </div>

          {/* Month Range Slider */}
          <div className="flex-1 px-2 flex items-center space-x-2">
            <input
              type="range"
              min={1}
              max={12}
              value={timelineMonth}
              onChange={(e) => {
                setTimelineMonth(parseInt(e.target.value));
                setIsPlayingTimeline(false);
              }}
              className="w-full accent-red-600 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>

          {/* Active Events Badge */}
          <div className="shrink-0 text-right text-[10px]">
            <span className="text-slate-400 block">Akumulasi Kegiatan</span>
            <strong className="text-white text-xs font-mono">{filteredEvents.length} Kegiatan</strong>
          </div>
        </div>
      </div>

      {/* 7. Bottom Section: Top 10 Wilayah & Heatmap Intensitas Kodam */}
      {showRankingPanel && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs animate-fadeIn pt-2">
          {/* Top 10 Wilayah Ranking List */}
          <div className={`p-4 rounded-xl border shadow-lg ${
            isDark ? "bg-slate-950 border-slate-800 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
          }`}>
            <div className="flex items-center justify-between border-b pb-2 mb-3 border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-500" />
                <h4 className="font-bold font-serif text-sm">Top 10 Ranking Wilayah Teraktif</h4>
              </div>
              <span className="text-[10px] text-slate-500">Klik provinsi untuk sorotan</span>
            </div>

            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
              {mockExecutiveProvinces.slice(0, 10).map((prov, index) => (
                <div
                  key={prov.id}
                  onClick={() => handleSelectProvinceDetail(prov)}
                  className={`p-2 rounded-lg flex items-center justify-between cursor-pointer border transition-all ${
                    selectedExecutiveProvince?.id === prov.id
                      ? "bg-red-950/80 border-red-700 text-white shadow-md"
                      : isDark
                      ? "bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300"
                      : "bg-white border-slate-200 hover:border-slate-300 text-slate-800"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                      index === 0
                        ? "bg-amber-500 text-slate-950"
                        : index === 1
                        ? "bg-slate-300 text-slate-950"
                        : index === 2
                        ? "bg-amber-700 text-white"
                        : "bg-slate-800 text-slate-400"
                    }`}>
                      #{index + 1}
                    </span>
                    <div>
                      <strong className="block text-xs font-semibold">{prov.name}</strong>
                      <span className="text-[10px] text-slate-400">{prov.kodam}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-bold text-amber-400 text-xs block">
                      {prov.programCount} Program
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {prov.participantCount.toLocaleString("id-ID")} Peserta
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Heatmap Intensitas Kodam (Intensitas Kegiatan) */}
          <div className={`p-4 rounded-xl border shadow-lg ${
            isDark ? "bg-slate-950 border-slate-800 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
          }`}>
            <div className="flex items-center justify-between border-b pb-2 mb-3 border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-2">
                <Flame className="w-4 h-4 text-red-500" />
                <h4 className="font-bold font-serif text-sm">Heatmap Intensitas Kegiatan Per Kodam</h4>
              </div>
              <span className="text-[10px] text-red-400 font-mono">DENSITY SCALE</span>
            </div>

            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {mockKodamIntensities.map((k) => (
                <div key={k.kodamName} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-200">{k.kodamName}</span>
                    <span className="font-mono font-bold text-amber-400">
                      {k.eventCount} Kegiatan
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex items-center">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 rounded-full"
                      style={{ width: `${k.intensityPercent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 8. Wilayah Belum Terjangkau Alert Footer */}
      <div className="bg-red-950/60 border border-red-800/80 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-red-200">
        <div className="flex items-center space-x-2.5">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 animate-bounce" />
          <div>
            <strong className="text-white block">Wilayah Perlu Perhatian Pimpinan (Belum Terjangkau / Rendah)</strong>
            <span className="text-[11px] text-red-300/90">
              Maluku Utara (18% target), Papua Pegunungan (12% target), Sulawesi Tengah (38% target) memerlukan percepatan alokasi instruktur & program.
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            const lowProv = mockExecutiveProvinces.find((p) => p.coverageCategory === "Belum Terjangkau");
            if (lowProv) handleSelectProvinceDetail(lowProv);
          }}
          className="bg-red-800 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded-lg shrink-0 text-xs shadow transition-colors"
        >
          Lihat Wilayah Belum Terjangkau &rarr;
        </button>
      </div>
    </div>
  );
};
