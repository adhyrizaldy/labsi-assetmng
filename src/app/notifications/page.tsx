'use client';

import { useState, useEffect, useCallback } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Bell, CheckCheck, AlertTriangle, Clock, Info, Package, Activity } from 'lucide-react';
import { getOverdueLoans, getLowStockAssets, getDashboardActivity } from '@labtrack/dataconnect';

const typeLabel: Record<string, string> = {
  STOCK_IN: 'Stok Masuk',
  STOCK_OUT: 'Peminjaman',
  RETURN: 'Pengembalian',
  TRANSFER: 'Transfer',
};

function timeAgo(dateStr: string): string {
  const now = new Date();
  const past = new Date(dateStr);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Baru saja';
  if (diffMins < 60) return `${diffMins} menit lalu`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} jam lalu`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays} hari lalu`;
  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths} bulan lalu`;
}

type OverdueItem = {
  id: string;
  name: string;
  barcode: string;
  checkoutAt?: string | null;
  overdueHours: number;
  currentBorrower?: { id: string; displayName: string } | null;
};

type LowStockItem = {
  id: string;
  name: string;
  barcode: string;
  quantity?: number | null;
  unit?: string | null;
  minStock?: number | null;
};

type ActivityItem = {
  id: string;
  type: string;
  createdAt: string;
  method: string;
  asset: { id: string; name: string; barcode: string };
  performedBy: { displayName: string };
};

export default function NotificationsPage() {
  const [overdueItems, setOverdueItems] = useState<OverdueItem[]>([]);
  const [lowStockItems, setLowStockItems] = useState<LowStockItem[]>([]);
  const [activityItems, setActivityItems] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [overdueRes, lowStockRes, activityRes] = await Promise.all([
        getOverdueLoans(),
        getLowStockAssets(),
        getDashboardActivity(),
      ]);

      setOverdueItems(overdueRes.data.assets || []);
      setLowStockItems(lowStockRes.data.assets || []);
      setActivityItems(activityRes.data.transactions || []);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const stored = localStorage.getItem('labtrack_notif_dismissed');
    if (stored) setDismissed(true);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('labtrack_notif_dismissed', new Date().toISOString());
  };

  const handleUndismiss = () => {
    setDismissed(false);
    localStorage.removeItem('labtrack_notif_dismissed');
  };

  const totalWarnings = overdueItems.length + lowStockItems.length;
  const hasAnyContent = overdueItems.length > 0 || lowStockItems.length > 0 || activityItems.length > 0;

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6 animate-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Notifikasi
              {totalWarnings > 0 && !dismissed && (
                <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full">
                  {totalWarnings}
                </span>
              )}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">Pemberitahuan dan peringatan sistem</p>
          </div>
          {hasAnyContent && (
            <button
              className="btn-ghost"
              onClick={dismissed ? handleUndismiss : handleDismiss}
            >
              <CheckCheck className="w-4 h-4" />
              <span>{dismissed ? 'Tampilkan Kembali' : 'Tandai Semua Dibaca'}</span>
            </button>
          )}
        </div>

        {loading ? (
          <div className="card">
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-gray-200 dark:border-gray-700 border-t-primary rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">Memuat notifikasi...</p>
            </div>
          </div>
        ) : !hasAnyContent ? (
          <div className="card">
            <div className="text-center py-12">
              <Bell className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">Tidak ada notifikasi</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                Notifikasi akan muncul di sini saat ada aktivitas
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* 🔴 Peringatan Kritis — Overdue Loans */}
            {overdueItems.length > 0 && (
              <div className={`card ${dismissed ? 'opacity-60' : ''}`}>
                <div className="card-header">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-danger" />
                    <h2 className="card-title">Peringatan Kritis</h2>
                  </div>
                  <span className="badge badge-danger">{overdueItems.length} peringatan</span>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {overdueItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                      <div className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 shrink-0">
                        <Clock className="w-5 h-5 text-danger" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">{item.name}</p>
                          <span className="badge badge-danger">Terlambat</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Dipinjam oleh: <span className="font-medium text-gray-700 dark:text-gray-300">{item.currentBorrower?.displayName || '-'}</span>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Checkout: {item.checkoutAt
                            ? new Date(item.checkoutAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                            : '-'}
                          {item.checkoutAt && (
                            <span className="ml-2 text-danger font-medium">({timeAgo(item.checkoutAt)})</span>
                          )}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          Batas waktu: {item.overdueHours} jam
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 🟡 Stok Rendah */}
            {lowStockItems.length > 0 && (
              <div className={`card ${dismissed ? 'opacity-60' : ''}`}>
                <div className="card-header">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-warning" />
                    <h2 className="card-title">Stok Rendah</h2>
                  </div>
                  <span className="badge badge-warning">{lowStockItems.length} item</span>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {lowStockItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                      <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 shrink-0">
                        <AlertTriangle className="w-5 h-5 text-warning" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">{item.name}</p>
                          <span className="badge badge-warning">Stok Rendah</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Stok saat ini: <span className="font-semibold text-danger">{item.quantity ?? 0}</span> {item.unit || 'unit'}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Minimum stok: <span className="font-medium text-gray-700 dark:text-gray-300">{item.minStock ?? 0}</span> {item.unit || 'unit'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 🟢 Aktivitas Terbaru */}
            {activityItems.length > 0 && (
              <div className={`card ${dismissed ? 'opacity-60' : ''}`}>
                <div className="card-header">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-success" />
                    <h2 className="card-title">Aktivitas Terbaru</h2>
                  </div>
                  <span className="badge badge-info">{activityItems.length} aktivitas</span>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {activityItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                      <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20 shrink-0">
                        <Info className="w-5 h-5 text-success" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`badge ${item.type === 'RETURN' ? 'badge-success' : item.type === 'STOCK_OUT' ? 'badge-warning' : item.type === 'STOCK_IN' ? 'badge-info' : 'badge-gray'}`}>
                            {typeLabel[item.type] || item.type}
                          </span>
                          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">{item.asset.name}</p>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Oleh: <span className="font-medium text-gray-700 dark:text-gray-300">{item.performedBy.displayName}</span>
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                          {timeAgo(item.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}