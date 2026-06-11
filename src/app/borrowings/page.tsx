'use client';

import { useState, useEffect, useCallback } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { listTransactions, TransactionType } from '@labtrack/dataconnect';
import { Boxes, Undo2, ArrowRightLeft, Package, User, Building2, ScanLine } from 'lucide-react';

interface TransactionItem {
  id: string;
  type: string;
  asset: { id: string; name: string; barcode: string; category: string };
  lab: { id: string; name: string; code: string };
  performedBy: { id: string; displayName: string };
  borrower?: { id: string; displayName: string } | null;
  quantity?: number | null;
  unit?: string | null;
  method: string;
  durationMinutes?: number | null;
  notes?: string | null;
  createdAt: string;
}

const typeLabel: Record<string, string> = {
  STOCK_IN: 'Stok Masuk',
  STOCK_OUT: 'Stok Keluar',
  RETURN: 'Pengembalian',
  TRANSFER: 'Transfer',
};

const typeIcon: Record<string, typeof Package> = {
  STOCK_IN: Package,
  STOCK_OUT: Undo2,
  RETURN: ArrowRightLeft,
  TRANSFER: Building2,
};

const typeBadge: Record<string, string> = {
  STOCK_IN: 'badge-info',
  STOCK_OUT: 'badge-warning',
  RETURN: 'badge-success',
  TRANSFER: 'badge-gray',
};

export default function BorrowingsPage() {
  const { hasRole, user } = useAuth();
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const res = await listTransactions();
      setTransactions(res.data.transactions);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const role = user?.role;

  const content = (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {role === 'laboran' ? 'Pinjaman Saya' : 'Transaksi'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {role === 'laboran' ? 'Daftar alat yang sedang / pernah Anda pinjam' : 'Riwayat transaksi peminjaman dan pengembalian'}
          </p>
        </div>
        <a href="/scan" className="btn-primary">
          <ScanLine className="w-4 h-4" />
          <span>Scan Barcode</span>
        </a>
      </div>

      <div className="card">
        {loading ? (
          <div className="text-center py-12"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" /></div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-12">
            <Boxes className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Tidak ada transaksi</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Belum ada transaksi peminjaman atau pengembalian.</p>
            <a href="/scan" className="btn-primary">
              <ScanLine className="w-4 h-4" />
              Mulai Scan
            </a>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((t) => {
              const Icon = typeIcon[t.type] || Package;
              return (
                <div key={t.id} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900 dark:text-gray-100 truncate">{t.asset.name}</span>
                      <span className={`badge ${typeBadge[t.type] || 'badge-gray'}`}>{typeLabel[t.type] || t.type}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" />{t.lab.name}</span>
                      <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{t.performedBy.displayName}</span>
                      {t.borrower && <span>→ {t.borrower.displayName}</span>}
                      {t.quantity && <span>{t.quantity} {t.unit}</span>}
                      <span>{new Date(t.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      {content}
    </DashboardLayout>
  );
}
