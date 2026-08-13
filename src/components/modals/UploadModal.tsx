import React, { useState } from "react";
import { X, Upload, FileText, Image as ImageIcon, CheckCircle2, AlertCircle } from "lucide-react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (fileInfo: { name: string; type: string; size: string }) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState<string>("Dokumentasi Kegiatan");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadSuccess(false);
    }
  };

  const handleStartUpload = () => {
    if (!file) return;
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadSuccess(true);
          if (onSuccess) {
            onSuccess({
              name: file.name,
              type: category,
              size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            });
          }
          return 100;
        }
        return prev + 20;
      });
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-slate-100 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-red-950 text-red-400 border border-red-800 flex items-center justify-center">
              <Upload className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base font-serif text-white">Upload Foto & Dokumen PKBN</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dropzone */}
        {!uploadSuccess ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Kategori File:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-800 text-slate-200 text-xs p-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-red-500"
              >
                <option value="Dokumentasi Kegiatan">Foto Dokumentasi Kegiatan</option>
                <option value="Laporan LPJ">Laporan LPJ / PDF Official</option>
                <option value="Sertifikat">Sertifikat / Modul Kurikulum</option>
                <option value="Data Peserta Excel">Data Peserta (Excel/CSV)</option>
              </select>
            </div>

            <div className="border-2 border-dashed border-slate-700 rounded-2xl p-6 text-center hover:border-red-500 transition-colors bg-slate-800/40 relative">
              <input
                type="file"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                accept="image/*,.pdf,.xlsx,.csv,.docx"
              />
              <div className="flex flex-col items-center space-y-2 pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-red-400">
                  <Upload className="w-6 h-6" />
                </div>
                {file ? (
                  <div>
                    <span className="text-xs font-bold text-white block truncate max-w-xs">{file.name}</span>
                    <span className="text-[10px] text-slate-400">{(file.size / 1024).toFixed(1)} KB</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-xs font-semibold text-slate-200 block">Klik atau Seret File ke Sini</span>
                    <span className="text-[10px] text-slate-500">Mendukung JPG, PNG, PDF, XLSX (Maks. 25MB)</span>
                  </div>
                )}
              </div>
            </div>

            {isUploading && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Mengunggah file ke Server Sterad...</span>
                  <span className="font-bold text-red-400">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-red-600 h-full transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                Batal
              </button>
              <button
                disabled={!file || isUploading}
                onClick={handleStartUpload}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white shadow-md transition-colors"
              >
                {isUploading ? "Mengunggah..." : "Unggah Sekarang"}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-sm font-bold text-white">File Berhasil Diunggah!</h4>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              File <strong className="text-white">{file?.name}</strong> telah berhasil disimpan di repository Sterad PKBN.
            </p>
            <button
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-5 py-2 rounded-xl border border-slate-700 transition-colors"
            >
              Selesai & Tutup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
