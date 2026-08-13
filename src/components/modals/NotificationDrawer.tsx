import React from "react";
import { X, Bell, CheckCircle2, ShieldAlert, FileText, UserCheck, Trash2 } from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: "success" | "warning" | "info";
  unread: boolean;
}

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = React.useState<NotificationItem[]>([
    {
      id: "N1",
      title: "Verifikasi Laporan Bulanan Jabar",
      desc: "Laporan PKBN Kodam III/Siliwangi telah disetujui oleh PABAN IV/PKBN.",
      time: "10 menit lalu",
      type: "success",
      unread: true,
    },
    {
      id: "N2",
      title: "Peringatan Batas Target Kampung PKBN",
      desc: "Wilayah Papua Keerom membutuhkan pengiriman instruktur tambahan.",
      time: "1 jam lalu",
      type: "warning",
      unread: true,
    },
    {
      id: "N3",
      title: "Pendaftaran Kampus UI & ITB",
      desc: "1.200 Mahasiswa Baru resmi terdaftar di Sistem Sertifikasi PKBN 2026.",
      time: "3 jam lalu",
      type: "info",
      unread: false,
    },
    {
      id: "N4",
      title: "Update Data Master Pengguna System",
      desc: "2 Akun BAUR Sterad telah diperbarui hak aksesnya.",
      time: "5 jam lalu",
      type: "info",
      unread: false,
    },
  ]);

  if (!isOpen) return null;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-sm bg-slate-900 border-l border-slate-800 h-full p-5 shadow-2xl flex flex-col justify-between text-slate-100">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-red-500" />
              <h3 className="font-bold text-base font-serif text-white">Notifikasi Real-Time</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{notifications.filter((n) => n.unread).length} belum dibaca</span>
            <button onClick={markAllRead} className="text-red-400 hover:underline">
              Tandai Semua Dibaca
            </button>
          </div>

          {/* List */}
          <div className="space-y-2.5 max-h-[calc(100vh-180px)] overflow-y-auto pr-1">
            {notifications.length === 0 ? (
              <div className="text-center py-10 text-xs text-slate-500">Tidak ada notifikasi aktif</div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`p-3 rounded-xl border text-xs space-y-1 transition-all ${
                    n.unread
                      ? "bg-slate-800/90 border-slate-700 shadow-md"
                      : "bg-slate-900/50 border-slate-800 text-slate-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center space-x-1.5">
                      {n.type === "success" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      {n.type === "warning" && <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />}
                      {n.type === "info" && <FileText className="w-3.5 h-3.5 text-blue-400" />}
                      <span>{n.title}</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{n.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">{n.desc}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 pt-3 flex items-center justify-between">
          <button
            onClick={clearAll}
            className="text-xs text-slate-500 hover:text-red-400 flex items-center space-x-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Bersihkan Semua</span>
          </button>
          <span className="text-[10px] text-slate-600 font-mono">SPABAN IV/PKBN Realtime Push</span>
        </div>
      </div>
    </div>
  );
};
