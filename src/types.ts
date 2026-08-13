export type ActiveTab =
  | "beranda"
  | "pendidikan"
  | "pekerjaan"
  | "masyarakat"
  | "monitoring"
  | "analisis"
  | "pelaporan"
  | "master";

export type SectorType = "Pendidikan" | "Pekerjaan" | "Masyarakat";

export type ProgramStatus = "Rencana" | "Berlangsung" | "Selesai";

export interface ProvinceData {
  id: string;
  code: string;
  name: string;
  islandGroup: "Sumatra" | "Jawa" | "Kalimantan" | "Sulawesi" | "Bali & Nusa" | "Maluku & Papua";
  totalEvents: number;
  totalParticipants: number;
  targetParticipants: number;
  status: "Sangat Tinggi" | "Tinggi" | "Sedang" | "Perlu Peningkatan";
  coordinates: { x: number; y: number }; // Percentage relative to SVG container
  latLng: { lat: number; lng: number }; // Real geographical coordinates for Google Maps
  topRegencies: string[];
  activeInstitutions: number;
  capital?: string;
}

export interface NationalKPI {
  totalProgram: number;
  totalPeserta: number;
  totalInstansi: number;
  totalSekolahPT: number;
  totalOrmas: number;
  persentaseCapaian: number;
  provinsiTeraktif: string[];
  kabupatenTeraktif: string[];
}

export interface ProgramItem {
  id: string;
  code: string;
  title: string;
  sector: SectorType;
  subCategory: string; // e.g., 'Perguruan Tinggi', 'BUMN', 'Komunitas Pemuda'
  organizer: string;
  province: string;
  regency: string;
  startDate: string;
  endDate: string;
  status: ProgramStatus;
  participantCount: number;
  targetCount: number;
  instructorName: string;
  evaluationScore: number; // 0 - 100
  documentationCount: number;
  hasCertificate: boolean;
  description: string;
}

export interface InstitutionItem {
  id: string;
  name: string;
  category: "Sekolah" | "Perguruan Tinggi" | "Instansi Pemerintah" | "BUMN" | "Swasta" | "Ormas/Komunitas";
  province: string;
  regency: string;
  address: string;
  cadreCount: number;
  status: "Aktif" | "Terverifikasi" | "Mitra Baru";
  contactPerson: string;
  phone: string;
}

export interface InstructorItem {
  id: string;
  name: string;
  agency: string;
  specialization: string;
  certificationYear: number;
  totalClasses: number;
  rating: number;
  province: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  sector: SectorType;
  date: string;
  time: string;
  location: string;
  province: string;
  status: ProgramStatus;
  capacity: number;
  registered: number;
}

export interface CertificateTemplate {
  id: string;
  recipientName: string;
  programTitle: string;
  sector: SectorType;
  certificateNo: string;
  issueDate: string;
  durationHours: number;
  grade: "Sangat Baik" | "Baik" | "Cukup";
}

export interface SWOTData {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  strategicRecommendations?: string[];
}

export interface MasterUser {
  id: string;
  name: string;
  email: string;
  role: "Admin Pusat" | "Admin Provinsi" | "Instruktur Utama" | "Auditor Kemenhan" | "Operator Instansi";
  province: string;
  status: "Aktif" | "Nonaktif";
  lastLogin: string;
}

export interface MasterAccessRole {
  roleName: string;
  description: string;
  permissions: {
    viewDashboard: boolean;
    managePrograms: boolean;
    manageUsers: boolean;
    exportReports: boolean;
    issueCertificates: boolean;
  };
}
