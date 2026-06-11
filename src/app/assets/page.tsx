'use client';

import { useState, useEffect, useCallback } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { listAssets, deleteAsset } from '@labtrack/dataconnect';
import { Plus, Search, Filter, Download, Boxes, Pencil, Trash2, Eye, Barcode } from 'lucide-react';

interface AssetItem {
  id: string;
  barcode: string;
  barcodeSource: string;
  name: string;
  category: string;
  lab: { id: string; name: string; code: string };
  brand?: string | null;
  model?: string | null;
  location?: string | null;
  condition: string;
  status: string;
  quantity?: number | null;
  unit?: string | null;
  minStock?: number | null;
  currentBorrower?: { id: string; displayName: string } | null;
  imageUrl?: string | null;
  createdAt: string;
}

const statusBadge: Record<string, string> = {
  Tersedia: 'badge-success',
  Terpakai: 'badge-warning',
  Rusak: 'badge-danger',
  'Dalam Perbaikan': 'badge-info',
  Habis: 'badge-danger',
  'Stok Rendah': 'badge-warning',
};

const conditionLabel: Record<string, string> = {
  baik: 'Baik',
  cukup_baik: 'Cukup Baik',
  rusak: 'Rusak',
};

export default function AssetsPage() {
  const { hasRole } = useAuth();

  const [assets, setAssets] = useState<AssetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchAssets = useCallback(async () => {
    try {
      setLoading(true);
      const res = await listAssets();
      setAssets(res.data.assets);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAssets(); }, [fetchAssets]);

  if (!hasRole(['kepalalab', 'admin'])) return null;

  const filtered = assets.filter((a) => {
    const q = search.toLowerCase();
    if (q && !a.name.toLowerCase().includes(q) && !a.barcode.toLowerCase().includes(q) && !(a.brand || '').toLowerCase().includes(q)) return false;
    if (filterCategory && a.category !== filterCategory) return false;
    if (filterStatus && a.status !== filterStatus) return false;
    return true;
  });

  async function handleDelete(id: string) {
    try {
      await deleteAsset({ id });
      setDeleteConfirm(null);
      await fetchAssets();
    } catch {
      // silent
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Daftar Aset</h1>
            <p className="text-gray-500 dark:text-gray-400">Kelola aset laboratorium</p>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary"><Filter className="w-4 h-4" /><span>Filter</span></button>
            <button className="btn-secondary"><Download className="w-4 h-4" /><span>Ekspor</span></button>
            <a href="/assets/new" className="btn-primary"><Plus className="w-4 h-4" /><span>Tambah Aset</span></a>
          </div>
        </div>

        <div className="card">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari aset (nama, barcode, merk)..." className="input-field pl-10" />
            </div>
            <div className="flex gap-2">
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="input-field w-auto">
                <option value="">Semua Kategori</option>
                <option value="tool">Alat (Tool)</option>
                <option value="consumable">Habis Pakai</option>
              </select>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="input-field w-auto">
                <option value="">Semua Status</option>
                <option value="Tersedia">Tersedia</option>
                <option value="Terpakai">Terpakai</option>
                <option value="Rusak">Rusak</option>
                <option value="Dalam Perbaikan">Dalam Perbaikan</option>
                <option value="Habis">Habis</option>
              </select>
            </div>
          </div>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Barcode</th>
                  <th>Nama Aset</th>
                  <th>Kategori</th>
                  <th>Lab</th>
                  <th>Kondisi</th>
                  <th>Status</th>
                  <th className="w-32">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={7} className="text-center py-12"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" /></td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-12">
                    <Boxes className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">Belum ada aset ditemukan</p>
                  </td></tr>
                ) : filtered.map((a) => (
                  <tr key={a.id}>
                    <td><code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-mono">{a.barcode}</code></td>
                    <td>
                      <div className="font-medium text-gray-900 dark:text-gray-100">{a.name}</div>
                      {a.brand && <div className="text-xs text-gray-400">{a.brand} {a.model ? `/ ${a.model}` : ''}</div>}
                    </td>
                    <td><span className={a.category === 'consumable' ? 'badge badge-warning' : 'badge badge-info'}>{a.category === 'consumable' ? 'Habis Pakai' : 'Alat'}</span></td>
                    <td><span className="text-sm text-gray-500">{a.lab.name}</span></td>
                    <td><span className="text-sm text-gray-500">{conditionLabel[a.condition] || a.condition}</span></td>
                    <td><span className={`badge ${statusBadge[a.status] || 'badge-gray'}`}>{a.status}</span></td>
                    <td>
                      <div className="flex items-center gap-1">
                        <a href={`/assets/${a.id}`} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600"><Eye className="w-4 h-4" /></a>
                        <a href={`/assets/${a.id}/edit`} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600"><Pencil className="w-4 h-4" /></a>
                        <button onClick={() => setDeleteConfirm(a.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500">Menampilkan {filtered.length} dari {assets.length} aset</p>
          </div>
        </div>
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-sm p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Hapus Aset?</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Data yang sudah dihapus tidak dapat dikembalikan.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">Batal</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
