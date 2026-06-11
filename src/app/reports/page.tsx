'use client';

import { useState, useCallback } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { listAssets, listTransactions, getLowStockAssets, getOverdueLoans } from '@labtrack/dataconnect';
import { FileText, Download, BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';

const exportCSV = (filename: string, headers: string[], rows: string[][]) => {
  const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

export default function ReportsPage() {
  const { hasRole } = useAuth();

  const [loading, setLoading] = useState<string | null>(null);

  const exportInventory = useCallback(async () => {
    setLoading('inventory');
    try {
      const res = await listAssets();
      const rows = res.data.assets.map((a: { barcode: string; name: string; category: string; lab: { name: string }; brand?: string | null; model?: string | null; condition: string; status: string; quantity?: number | null; purchaseDate?: string | null; purchasePrice?: number | null }) => [
        a.barcode, a.name, a.category === 'consumable' ? 'Habis Pakai' : 'Alat', a.lab.name, a.brand || '', a.model || '', a.condition, a.status, String(a.quantity ?? ''), a.purchaseDate || '', String(a.purchasePrice ?? ''),
      ]);
      exportCSV('inventaris-aset', ['Barcode', 'Nama', 'Kategori', 'Lab', 'Merek', 'Model', 'Kondisi', 'Status', 'Jumlah', 'Tgl Beli', 'Harga'], rows);
    } catch {} finally { setLoading(null); }
  }, []);

  const exportTransactions = useCallback(async () => {
    setLoading('transactions');
    try {
      const res = await listTransactions();
      const rows = res.data.transactions.map((t: { type: string; asset: { name: string }; lab: { name: string }; performedBy: { displayName: string }; borrower?: { displayName: string } | null; createdAt: string; method: string; quantity?: number | null }) => [
        t.type, t.asset.name, t.lab.name, t.performedBy.displayName, t.borrower?.displayName || '', t.createdAt, t.method, String(t.quantity ?? ''),
      ]);
      exportCSV('riwayat-transaksi', ['Jenis', 'Aset', 'Lab', 'Pelaku', 'Peminjam', 'Waktu', 'Metode', 'Jumlah'], rows);
    } catch {} finally { setLoading(null); }
  }, []);

  const exportLowStock = useCallback(async () => {
    setLoading('lowstock');
    try {
      const res = await getLowStockAssets();
      const rows = (res.data.assets || []).map((a: { name: string; barcode: string; quantity?: number | null; unit?: string | null; minStock?: number | null }) => [
        a.name, a.barcode, String(a.quantity ?? ''), a.unit || '', String(a.minStock ?? ''),
      ]);
      exportCSV('stok-rendah', ['Nama', 'Barcode', 'Stok', 'Satuan', 'Min Stok'], rows);
    } catch {} finally { setLoading(null); }
  }, []);

  const exportOverdue = useCallback(async () => {
    setLoading('overdue');
    try {
      const res = await getOverdueLoans();
      const rows = (res.data.assets || []).map((a: { name: string; barcode: string; checkoutAt?: string | null; currentBorrower?: { displayName: string } | null }) => [
        a.name, a.barcode, a.checkoutAt || '', a.currentBorrower?.displayName || '',
      ]);
      exportCSV('keterlambatan', ['Nama', 'Barcode', 'Tgl Pinjam', 'Peminjam'], rows);
    } catch {} finally { setLoading(null); }
  }, []);

  if (!hasRole(['kepalalab'])) return null;

  const reports = [
    { name: 'Inventaris Aset', desc: 'Daftar lengkap aset dengan status', icon: FileText, action: exportInventory },
    { name: 'Riwayat Transaksi', desc: 'Semua transaksi peminjaman & pengembalian', icon: TrendingUp, action: exportTransactions },
    { name: 'Stok Rendah', desc: 'Aset habis pakai dengan stok dibawah minimum', icon: BarChart3, action: exportLowStock },
    { name: 'Keterlambatan', desc: 'Alat terlambat dikembalikan', icon: AlertTriangle, action: exportOverdue },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Laporan</h1>
          <p className="text-gray-500 dark:text-gray-400">Analitik dan ekspor data aset</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report) => (
            <div key={report.name} className="card glass-card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <report.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{report.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{report.desc}</p>
                </div>
                <button onClick={report.action} disabled={loading !== null} className="btn-ghost p-2" title="Ekspor CSV">
                  <Download className={`w-4 h-4 ${loading === report.name.toLowerCase() ? 'animate-pulse' : ''}`} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
