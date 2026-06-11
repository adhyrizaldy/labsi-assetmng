'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { Clock, Bell, MessageCircle, Save } from 'lucide-react';

export default function SettingsPage() {
  const { hasRole } = useAuth();
  if (!hasRole(['kepalalab'])) return null;

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6 animate-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Pengaturan</h1>
          <p className="text-gray-500 dark:text-gray-400">Konfigurasi sistem</p>
        </div>

        <div className="card space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Batas Durasi Peminjaman</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Durasi maksimal (jam)</label>
                <input type="number" className="input-field" defaultValue={24} min={1} />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Notifikasi</h2>
            </div>
            <div className="space-y-4">
              {[
                { id: 'low_stock', label: 'Aktifkan notifikasi stok rendah' },
                { id: 'telegram', label: 'Aktifkan notifikasi Telegram' },
              ].map((item) => (
                <label key={item.id} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary" defaultChecked={item.id === 'low_stock'} />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Telegram Bot</h2>
              <span className="badge badge-warning">Phase 2</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Integrasi Telegram Bot akan tersedia di Phase 2.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className="btn-primary">
              <Save className="w-4 h-4" />
              <span>Simpan Pengaturan</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}