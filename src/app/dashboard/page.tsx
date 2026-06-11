'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { listAssets, getDashboardActivity, getLowStockAssets, getOverdueLoans } from '@labtrack/dataconnect';
import {
  Boxes, Users, AlertTriangle, Clock, TrendingUp, Activity, Building2,
} from 'lucide-react';

const typeLabel: Record<string, string> = {
  STOCK_IN: 'Stok Masuk',
  STOCK_OUT: 'Peminjaman',
  RETURN: 'Pengembalian',
  TRANSFER: 'Transfer',
};

export default function DashboardPage() {
  const { user, hasRole } = useAuth();

  const [totalAssets, setTotalAssets] = useState(0);
  const [borrowed, setBorrowed] = useState(0);
  const [damaged, setDamaged] = useState(0);
  const [repair, setRepair] = useState(0);
  const [available, setAvailable] = useState(0);
  const [lowStock, setLowStock] = useState(0);
  const [overdue, setOverdue] = useState(0);
  const [activities, setActivities] = useState<{ id: string; type: string; createdAt: string; method: string; asset: { id: string; name: string; barcode: string }; performedBy: { displayName: string } }[]>([]);

  const fetch = useCallback(async () => {
    try {
      const [assetsRes, activityRes, lowStockRes, overdueRes] = await Promise.all([
        listAssets(),
        getDashboardActivity(),
        getLowStockAssets(),
        getOverdueLoans(),
      ]);

      const all = assetsRes.data.assets;
      setTotalAssets(all.length);
      setAvailable(all.filter((a: { status: string }) => a.status === 'Tersedia').length);
      setBorrowed(all.filter((a: { status: string }) => a.status === 'Terpakai').length);
      setDamaged(all.filter((a: { status: string }) => a.status === 'Rusak').length);
      setRepair(all.filter((a: { status: string }) => a.status === 'Dalam Perbaikan').length);

      setActivities(activityRes.data.transactions || []);
      setLowStock((lowStockRes.data.assets || []).length);
      setOverdue((overdueRes.data.assets || []).length);
    } catch {
      // silent
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  if (!user) return null;
  const isKepalaLab = hasRole(['kepalalab']);
  const isAdmin = hasRole(['admin']);

  const totalPercentage = totalAssets || 1;
  const pAvailable = Math.round((available / totalPercentage) * 100);
  const pBorrowed = Math.round((borrowed / totalPercentage) * 100);
  const pDamaged = Math.round((damaged / totalPercentage) * 100);
  const pRepair = Math.round((repair / totalPercentage) * 100);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Selamat datang, {user.displayName}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Ringkasan aktivitas laboratorium {isKepalaLab ? 'semua lab' : 'Anda'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="card glass-card-hover">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Aset</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">{totalAssets}</p>
                <p className="text-xs font-medium mt-2 text-success">{available} tersedia</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10"><Boxes className="w-6 h-6 text-primary" /></div>
            </div>
          </div>
          <div className="card glass-card-hover">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Sedang Dipinjam</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">{borrowed}</p>
                <p className="text-xs font-medium mt-2 text-warning">{overdue} terlambat</p>
              </div>
              <div className="p-3 rounded-xl bg-warning/10"><Users className="w-6 h-6 text-warning" /></div>
            </div>
          </div>
          <div className="card glass-card-hover">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Stok Rendah</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">{lowStock}</p>
                <p className="text-xs font-medium mt-2 text-danger">Perlu perhatian</p>
              </div>
              <div className="p-3 rounded-xl bg-danger/10"><AlertTriangle className="w-6 h-6 text-danger" /></div>
            </div>
          </div>
          <div className="card glass-card-hover">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pinjaman Terlambat</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-1">{overdue}</p>
                <p className={`text-xs font-medium mt-2 ${overdue > 0 ? 'text-danger' : 'text-success'}`}>{overdue > 0 ? 'Perlu tindakan' : 'Aman'}</p>
              </div>
              <div className="p-3 rounded-xl bg-info/10"><Clock className="w-6 h-6 text-info" /></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card">
            <div className="card-header">
              <h2 className="card-title">Aktivitas Terbaru</h2>
              <span className="badge badge-gray">{activities.length} transaksi</span>
            </div>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Waktu</th>
                    <th>Jenis</th>
                    <th>Aset</th>
                    <th>Pelaku</th>
                    <th>Metode</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <Activity className="w-8 h-8 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                        <p>Belum ada aktivitas</p>
                      </td>
                    </tr>
                  ) : activities.map((a) => (
                    <tr key={a.id}>
                      <td className="text-sm text-gray-500">{new Date(a.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
                      <td><span className={`badge ${a.type === 'RETURN' ? 'badge-success' : a.type === 'STOCK_OUT' ? 'badge-warning' : a.type === 'STOCK_IN' ? 'badge-info' : 'badge-gray'}`}>{typeLabel[a.type] || a.type}</span></td>
                      <td className="font-medium text-gray-900 dark:text-gray-100">{a.asset.name}</td>
                      <td className="text-sm text-gray-500">{a.performedBy.displayName}</td>
                      <td className="text-sm text-gray-500">{a.method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><h2 className="card-title">Kesehatan Aset</h2></div>
            <div className="space-y-4">
              {[
                { label: 'Tersedia', value: available, color: 'bg-status-available', percentage: pAvailable },
                { label: 'Terpakai', value: borrowed, color: 'bg-status-borrowed', percentage: pBorrowed },
                { label: 'Rusak', value: damaged, color: 'bg-status-damaged', percentage: pDamaged },
                { label: 'Perbaikan', value: repair, color: 'bg-status-repair', percentage: pRepair },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color} shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{item.label}</p>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 w-12 text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {(isKepalaLab || isAdmin) && (
          <div className="card">
            <div className="card-header"><h2 className="card-title">Aksi Cepat</h2></div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link href="/scan" className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-primary/5 transition-all">
                <TrendingUp className="w-6 h-6 text-success" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Stok Masuk</span>
              </Link>
              <Link href="/scan" className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-primary/5 transition-all">
                <Users className="w-6 h-6 text-warning" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Stok Keluar</span>
              </Link>
              <Link href="/assets/new" className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-primary/5 transition-all">
                <Boxes className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tambah Aset</span>
              </Link>
              <Link href="/barcode/generate" className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:bg-primary/5 transition-all">
                <Activity className="w-6 h-6 text-info" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Cetak Label</span>
              </Link>
            </div>
          </div>
        )}

        {user.role === 'laboran' && (
          <div className="card">
            <div className="card-header"><h2 className="card-title">Pinjaman Aktif Anda</h2></div>
            <div className="text-center py-8">
              <Boxes className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-gray-500 dark:text-gray-400">{borrowed > 0 ? `Anda memiliki ${borrowed} pinjaman aktif` : 'Anda tidak memiliki pinjaman aktif'}</p>
              {borrowed === 0 && <p className="text-sm text-gray-400 mt-1">Scan barcode untuk meminjam aset</p>}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
