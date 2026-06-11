'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { Printer, Plus, Download, Barcode } from 'lucide-react';
import { useState, useRef } from 'react';

export default function BarcodeGeneratePage() {
  const { hasRole } = useAuth();
  const [barcodes, setBarcodes] = useState<string[]>([]);
  const printRef = useRef<HTMLDivElement>(null);

  if (!hasRole(['kepalalab', 'admin'])) return null;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Generate Barcode</h1>
            <p className="text-gray-500 dark:text-gray-400">Buat barcode baru dan cetak label</p>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary">
              <Download className="w-4 h-4" />
              <span>Ekspor PDF</span>
            </button>
            <button className="btn-secondary">
              <Printer className="w-4 h-4" />
              <span>Cetak</span>
            </button>
            <button className="btn-primary" onClick={() => setBarcodes(prev => [...prev, `LT-LKU-${String(Date.now()).slice(-6)}`])}>
              <Plus className="w-4 h-4" />
              <span>Generate Baru</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card">
            <div className="card-header">
              <h2 className="card-title">Label Barcode</h2>
            </div>
            {barcodes.length === 0 ? (
              <div className="text-center py-16">
                <Barcode className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <p className="text-gray-500 dark:text-gray-400">Belum ada barcode</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  Klik "Generate Baru" untuk membuat barcode
                </p>
              </div>
            ) : (
              <div ref={printRef} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {barcodes.map((code) => (
                  <div key={code} className="p-4 bg-white border border-gray-200 rounded-lg text-center space-y-2">
                    <div className="w-full h-16 bg-gray-100 flex items-center justify-center text-xs text-gray-400 font-mono">
                      {code}
                    </div>
                    <p className="text-xs text-gray-500 font-mono">{code}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Pengaturan</h2>
            </div>
            <form className="space-y-4">
              <div>
                <label className="label">Laboratorium</label>
                <select className="input-field">
                  <option value="LKU">Lab Komputer Utama</option>
                </select>
              </div>
              <div>
                <label className="label">Jumlah Label</label>
                <input type="number" className="input-field" defaultValue={1} min={1} max={50} />
              </div>
              <div>
                <label className="label">Format</label>
                <select className="input-field">
                  <option value="code128">Code-128</option>
                </select>
              </div>
              <button type="submit" className="btn-primary w-full">
                <Printer className="w-4 h-4" />
                Generate & Cetak
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}