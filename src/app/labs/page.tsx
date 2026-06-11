'use client';

import { useState, useEffect, useCallback } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { listLabs, createLab, updateLab, deleteLab } from '@labtrack/dataconnect';
import { Plus, Building2, MapPin, Boxes, Pencil, Trash2, X, Search } from 'lucide-react';

interface LabItem {
  id: string;
  name: string;
  code: string;
  description?: string | null;
  location?: string | null;
  isActive: boolean;
  createdAt: string;
}

export default function LabsPage() {
  const { hasRole } = useAuth();

  const [labs, setLabs] = useState<LabItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingLab, setEditingLab] = useState<LabItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', code: '', description: '', location: '' });
  const [saving, setSaving] = useState(false);

  const fetchLabs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await listLabs();
      setLabs(res.data.labs);
      setError(null);
    } catch {
      setError('Gagal memuat data laboratorium');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLabs(); }, [fetchLabs]);

  if (!hasRole(['kepalalab'])) return null;

  function openCreate() {
    setEditingLab(null);
    setFormData({ name: '', code: '', description: '', location: '' });
    setShowModal(true);
  }

  function openEdit(lab: LabItem) {
    setEditingLab(lab);
    setFormData({ name: lab.name, code: lab.code, description: lab.description || '', location: lab.location || '' });
    setShowModal(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.code) return;
    setSaving(true);
    try {
      if (editingLab) {
        await updateLab({ id: editingLab.id, ...formData, name: formData.name, code: formData.code });
      } else {
        await createLab({ name: formData.name, code: formData.code, description: formData.description || null, location: formData.location || null });
      }
      setShowModal(false);
      await fetchLabs();
    } catch {
      setError(editingLab ? 'Gagal memperbarui laboratorium' : 'Gagal membuat laboratorium');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteLab({ id });
      setDeleteConfirm(null);
      await fetchLabs();
    } catch {
      setError('Gagal menghapus laboratorium');
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Kelola Laboratorium</h1>
            <p className="text-gray-500 dark:text-gray-400">Kelola data laboratorium</p>
          </div>
          <button onClick={openCreate} className="btn-primary">
            <Plus className="w-4 h-4" />
            <span>Tambah Lab</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">{error}</div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : labs.length === 0 ? (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Belum ada laboratorium</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Klik &quot;Tambah Lab&quot; untuk membuat laboratorium baru</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {labs.map((lab) => (
              <div key={lab.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{lab.name}</h3>
                      <span className="text-xs font-mono text-gray-400 dark:text-gray-500">{lab.code}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => openEdit(lab)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDeleteConfirm(lab.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {lab.description && (
                  <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">{lab.description}</p>
                )}
                {lab.location && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                    <MapPin className="w-3.5 h-3.5" />
                    {lab.location}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {editingLab ? 'Edit Laboratorium' : 'Tambah Laboratorium'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Lab</label>
                <input
                  type="text" required value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Lab Komputer 1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kode Lab</label>
                <input
                  type="text" required value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="LAB-01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deskripsi</label>
                <textarea
                  value={formData.description} rows={2}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                  placeholder="Deskripsi lab (opsional)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lokasi</label>
                <input
                  type="text" value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  placeholder="Gedung A, Lantai 2 (opsional)"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  Batal
                </button>
                <button type="submit" disabled={saving} className="btn-primary">
                  {saving ? 'Menyimpan...' : editingLab ? 'Simpan Perubahan' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-sm p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Hapus Laboratorium?</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Tindakan ini akan menghapus laboratorium dan semua data terkait. Data yang sudah dihapus tidak dapat dikembalikan.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                Batal
              </button>
              <button onClick={() => handleDelete(deleteConfirm)} className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
