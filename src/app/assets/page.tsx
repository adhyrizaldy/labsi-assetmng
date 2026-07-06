'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { listAssets, deleteAsset } from '@labtrack/dataconnect';
import { Plus, Search, Filter, Download, Boxes, Pencil, Trash2, Menu, X, Barcode } from 'lucide-react';
import Link from 'next/link';

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
  purchaseDate?: string | null;
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
  const { hasRole, user } = useAuth();

  const [assets, setAssets] = useState<AssetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const searchParams = useSearchParams();
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState(searchParams?.get('status') || '');
  const [filterDate, setFilterDate] = useState('');
  const [filterBorrowed, setFilterBorrowed] = useState(searchParams?.get('borrowed') === 'true');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [previewAsset, setPreviewAsset] = useState<AssetItem | null>(null);

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

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      await fetchAssets();
      if (!mounted) return;
    };
    load();
    return () => { mounted = false; };
  }, [fetchAssets]);

  if (!hasRole(['kepalalab', 'admin', 'laboran'])) return null;

  const filtered = assets.filter((a) => {
    const q = search.toLowerCase();
    if (q && !a.name.toLowerCase().includes(q) && !a.barcode.toLowerCase().includes(q) && !(a.brand || '').toLowerCase().includes(q)) return false;
    if (filterCategory && a.category !== filterCategory) return false;
    if (filterStatus && a.status !== filterStatus) return false;
    if (filterBorrowed && !a.currentBorrower) return false;

    if (filterDate) {
      if (!a.purchaseDate) return false;
      const pDate = new Date(a.purchaseDate);
      const now = new Date();
      if (filterDate === '7days') {
        if (now.getTime() - pDate.getTime() > 7 * 24 * 60 * 60 * 1000) return false;
      } else if (filterDate === '30days') {
        if (now.getTime() - pDate.getTime() > 30 * 24 * 60 * 60 * 1000) return false;
      } else if (filterDate === 'thisMonth') {
        if (pDate.getMonth() !== now.getMonth() || pDate.getFullYear() !== now.getFullYear()) return false;
      } else if (filterDate === 'thisYear') {
        if (pDate.getFullYear() !== now.getFullYear()) return false;
      }
    }

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
            <Link href="/assets/new" className="btn-primary"><Plus className="w-4 h-4" /><span>Tambah Aset</span></Link>
          </div>
        </div>

        <div className="card">
          <div className="flex flex-col gap-4 mb-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="relative flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari aset (nama, barcode, merk)..." className="input-field pl-10" />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="input-field sm:w-auto">
                <option value="">Semua Kategori</option>
                <option value="tool">Alat (Tool)</option>
                <option value="consumable">Habis Pakai</option>
              </select>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="input-field sm:w-auto">
                <option value="">Semua Status</option>
                <option value="Tersedia">Tersedia</option>
                <option value="Terpakai">Terpakai</option>
                <option value="Rusak">Rusak</option>
                <option value="Dalam Perbaikan">Dalam Perbaikan</option>
                <option value="Habis">Habis</option>
              </select>
              <select value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="input-field sm:w-auto">
                <option value="">Semua Waktu (Pembelian)</option>
                <option value="7days">7 Hari Terakhir</option>
                <option value="30days">30 Hari Terakhir</option>
                <option value="thisMonth">Bulan Ini</option>
                <option value="thisYear">Tahun Ini</option>
              </select>
              {filterBorrowed && (
                <button onClick={() => setFilterBorrowed(false)} className="btn-secondary sm:w-auto flex items-center gap-2">
                  <span>Hapus Filter Sedang Dipinjam</span>
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Loading state */}
          {loading && (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-12">
              <Boxes className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-gray-500 dark:text-gray-400">Belum ada aset ditemukan</p>
            </div>
          )}

          {/* Table view — md and above */}
          {!loading && filtered.length > 0 && (
            <div className="hidden md:block table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Barcode</th>
                    <th>Nama Aset</th>
                    <th>Kategori</th>
                    <th>Merk / Brand</th>
                    <th>Lab</th>
                    <th>Kondisi</th>
                    <th>Status</th>
                    <th className="w-32">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a) => (
                    <tr key={a.id}>
                      <td><code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-mono">{a.barcode}</code></td>
                      <td>
                        <div className="font-medium text-gray-900 dark:text-gray-100">{a.name}</div>
                      </td>
                      <td><span className={a.category === 'consumable' ? 'badge badge-warning' : 'badge badge-info'}>{a.category === 'consumable' ? 'Habis Pakai' : 'Alat'}</span></td>
                      <td><span className="text-sm text-gray-500">{a.brand || '-'} {a.model ? `/ ${a.model}` : ''}</span></td>
                      <td><span className="text-sm text-gray-500">{a.lab.name}</span></td>
                      <td><span className="text-sm text-gray-500">{conditionLabel[a.condition] || a.condition}</span></td>
                      <td><span className={`badge ${statusBadge[a.status] || 'badge-gray'}`}>{a.status}</span></td>
                      <td>
                        <div className="flex items-center gap-1">
                          <Link href={`/assets/${a.id}/edit`} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600"><Pencil className="w-4 h-4" /></Link>
                          <button onClick={() => setPreviewAsset(a)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600"><Menu className="w-4 h-4" /></button>
                          {user?.role !== 'laboran' && (
                            <button onClick={() => setDeleteConfirm(a.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Card view — below md (mobile) */}
          {!loading && filtered.length > 0 && (
            <div className="md:hidden space-y-3">
              {filtered.map((a) => (
                <div key={a.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-3">
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">{a.name}</div>
                    {a.brand && <div className="text-xs text-gray-400">{a.brand} {a.model ? `/ ${a.model}` : ''}</div>}
                  </div>
                  <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-mono text-gray-600 dark:text-gray-300">{a.barcode}</code>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={a.category === 'consumable' ? 'badge badge-warning' : 'badge badge-info'}>{a.category === 'consumable' ? 'Habis Pakai' : 'Alat'}</span>
                    <span className={`badge ${statusBadge[a.status] || 'badge-gray'}`}>{a.status}</span>
                    <span className="text-xs text-gray-500">{conditionLabel[a.condition] || a.condition}</span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{a.lab.name}</div>
                  <div className="flex items-center gap-1 pt-2 border-t border-gray-100 dark:border-gray-700/50">
                    <Link href={`/assets/${a.id}/edit`} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600" title="Ubah"><Pencil className="w-4 h-4" /></Link>
                    <button onClick={() => setPreviewAsset(a)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600" title="Detail"><Menu className="w-4 h-4" /></button>
                    {user?.role !== 'laboran' && (
                      <button onClick={() => setDeleteConfirm(a.id)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500" title="Hapus"><Trash2 className="w-4 h-4" /></button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

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

      {previewAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setPreviewAsset(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-lg p-6 shadow-xl space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Detail Aset</h2>
              <button onClick={() => setPreviewAsset(null)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <div className="col-span-2 sm:col-span-1 space-y-1">
                <span className="text-sm text-gray-500 block">Nama Aset</span>
                <span className="font-medium text-gray-900 dark:text-gray-100 block">{previewAsset.name}</span>
              </div>
              <div className="col-span-2 sm:col-span-1 space-y-1">
                <span className="text-sm text-gray-500 block">Barcode</span>
                <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded font-mono">{previewAsset.barcode}</code>
              </div>
              
              <div className="col-span-2 sm:col-span-1 space-y-1">
                <span className="text-sm text-gray-500 block">Kategori</span>
                <span className={previewAsset.category === 'consumable' ? 'badge badge-warning' : 'badge badge-info'}>{previewAsset.category === 'consumable' ? 'Habis Pakai' : 'Alat'}</span>
              </div>
              <div className="col-span-2 sm:col-span-1 space-y-1">
                <span className="text-sm text-gray-500 block">Lab</span>
                <span className="text-sm text-gray-900 dark:text-gray-100 block">{previewAsset.lab.name}</span>
              </div>

              <div className="col-span-2 sm:col-span-1 space-y-1">
                <span className="text-sm text-gray-500 block">Merk / Model</span>
                <span className="text-sm text-gray-900 dark:text-gray-100 block">{previewAsset.brand || '-'} {previewAsset.model ? `/ ${previewAsset.model}` : ''}</span>
              </div>
              <div className="col-span-2 sm:col-span-1 space-y-1">
                <span className="text-sm text-gray-500 block">Status</span>
                <span className={`badge ${statusBadge[previewAsset.status] || 'badge-gray'}`}>{previewAsset.status}</span>
              </div>
              <div className="col-span-2 sm:col-span-1 space-y-1">
                <span className="text-sm text-gray-500 block">Tanggal Pembelian</span>
                <span className="text-sm text-gray-900 dark:text-gray-100 block">
                  {previewAsset.purchaseDate 
                    ? new Date(previewAsset.purchaseDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) 
                    : '-'}
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1 space-y-1">
                <span className="text-sm text-gray-500 block">Lokasi Penyimpanan</span>
                <span className="text-sm text-gray-900 dark:text-gray-100 block">{previewAsset.location || '-'}</span>
              </div>
              <div className="col-span-2 sm:col-span-1 space-y-1">
                <span className="text-sm text-gray-500 block">Kondisi</span>
                <span className="text-sm text-gray-900 dark:text-gray-100 block">{conditionLabel[previewAsset.condition] || previewAsset.condition}</span>
              </div>
              
              {previewAsset.category === 'consumable' && (
                <div className="col-span-2 sm:col-span-1 space-y-1">
                  <span className="text-sm text-gray-500 block">Stok / Jumlah</span>
                  <span className="text-sm text-gray-900 dark:text-gray-100 block">{previewAsset.quantity || 0} {previewAsset.unit || 'unit'}</span>
                </div>
              )}
              {previewAsset.currentBorrower && (
                <div className="col-span-2 space-y-1">
                  <span className="text-sm text-gray-500 block">Peminjam Saat Ini</span>
                  <span className="text-sm text-gray-900 dark:text-gray-100 block">{previewAsset.currentBorrower.displayName}</span>
                </div>
              )}
            </div>
            
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
              <Link href={`/assets/${previewAsset.id}/edit`} className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90">
                Edit Aset
              </Link>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
