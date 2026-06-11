'use client';

import { useState, useEffect, useCallback } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import {
  Plus, Users as UsersIcon, Shield, Wrench, Search,
  Trash2, X, CheckCircle, AlertCircle
} from 'lucide-react';

interface UserItem {
  id: string;
  uid: string;
  email: string;
  displayName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  phone?: string;
}

interface UserForm {
  email: string;
  password: string;
  displayName: string;
  role: 'admin' | 'laboran';
  roleTitle: string;
  phone: string;
}

const emptyForm: UserForm = {
  email: '',
  password: '',
  displayName: '',
  role: 'laboran',
  roleTitle: '',
  phone: '',
};

export default function UsersPage() {
  const { hasRole, getToken } = useAuth();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [form, setForm] = useState<UserForm>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const fetchUsers = useCallback(async () => {
    try {
      const token = await getToken();
      if (!token) return;
      const params = new URLSearchParams();
      if (roleFilter) params.set('role', roleFilter);

      const res = await fetch(`/api/users?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data.users);
    } catch {
      setError('Gagal memuat data pengguna.');
    } finally {
      setLoading(false);
    }
  }, [getToken, roleFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (!hasRole(['kepalalab'])) return null;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const token = await getToken();
      if (!token) throw new Error('Not authenticated');

      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal membuat pengguna');

      setSuccess(`Pengguna "${data.user.displayName}" berhasil dibuat!`);
      setShowModal(false);
      setForm(emptyForm);
      fetchUsers();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (user: UserItem) => {
    if (!confirm(`Hapus pengguna "${user.displayName}"? Tindakan ini tidak bisa dibatalkan.`)) return;

    try {
      const token = await getToken();
      if (!token) return;

      const res = await fetch(`/api/users/${user.uid}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Gagal menghapus');
      }

      setSuccess(`Pengguna "${user.displayName}" berhasil dihapus.`);
      fetchUsers();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleToggleActive = async (user: UserItem) => {
    try {
      const token = await getToken();
      if (!token) return;

      const res = await fetch(`/api/users/${user.uid}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !user.isActive }),
      });

      if (!res.ok) throw new Error('Gagal mengubah status');
      setSuccess(`Status pengguna "${user.displayName}" diubah.`);
      fetchUsers();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const filteredUsers = users.filter((u) =>
    u.displayName.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const counts = {
    all: users.length,
    admin: users.filter((u) => u.role === 'admin').length,
    laboran: users.filter((u) => u.role === 'laboran').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Kelola Pengguna</h1>
            <p className="text-gray-500 dark:text-gray-400">Kelola akun Admin & Laboran</p>
          </div>
          <button className="btn-primary" onClick={() => { setEditingUser(null); setForm(emptyForm); setShowModal(true); }}>
            <Plus className="w-4 h-4" />
            <span>Tambah Pengguna</span>
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-danger-light text-danger dark:bg-danger/20 dark:text-danger-light border border-danger/30 rounded-lg p-4 text-sm" role="alert">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {error}
            <button onClick={() => setError('')} className="ml-auto">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 bg-success-light text-success dark:bg-success/20 dark:text-success-light border border-success/30 rounded-lg p-4 text-sm">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            {success}
            <button onClick={() => setSuccess('')} className="ml-auto">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { role: 'all', label: 'Total', icon: UsersIcon, count: counts.all, color: 'text-primary', bg: 'bg-primary/10' },
            { role: 'admin', label: 'Admin', icon: Shield, count: counts.admin, color: 'text-info', bg: 'bg-info/10' },
            { role: 'laboran', label: 'Laboran', icon: Wrench, count: counts.laboran, color: 'text-warning', bg: 'bg-warning/10' },
          ].map((item) => (
            <button
              key={item.role}
              onClick={() => setRoleFilter(item.role === 'all' ? '' : item.role)}
              className={`card glass-card-hover text-left ${roleFilter === item.role || (item.role === 'all' && !roleFilter) ? 'ring-2 ring-primary' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${item.bg}`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{item.count}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="card">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="search"
                placeholder="Cari pengguna..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Jabatan</th>
                  <th>Status</th>
                  <th>Dibuat</th>
                  <th className="w-40">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-gray-500">
                      Memuat data...
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12">
                      <UsersIcon className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                      <p className="text-gray-500 dark:text-gray-400">
                        {search || roleFilter ? 'Tidak ada pengguna yang cocok' : 'Belum ada pengguna'}
                      </p>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                        {!search && !roleFilter && 'Klik "Tambah Pengguna" untuk menambahkan Admin atau Laboran'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.uid}>
                      <td className="font-medium">{u.displayName}</td>
                      <td className="text-gray-500">{u.email}</td>
                      <td>
                        <span className={u.role === 'admin' ? 'badge-info' : 'badge-warning'}>
                          {u.role === 'admin' ? 'Admin' : 'Laboran'}
                        </span>
                      </td>
                      <td className="text-gray-500">{u.phone || '-'}</td>
                      <td>
                        <button
                          onClick={() => handleToggleActive(u)}
                          className={`inline-flex items-center gap-1 text-xs font-medium ${
                            u.isActive ? 'text-success' : 'text-danger'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${u.isActive ? 'bg-success' : 'bg-danger'}`} />
                          {u.isActive ? 'Aktif' : 'Nonaktif'}
                        </button>
                      </td>
                      <td className="text-gray-500 text-sm">
                        {new Date(u.createdAt).toLocaleDateString('id-ID')}
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDelete(u)}
                            className="btn-ghost p-1.5 text-danger hover:bg-danger/10"
                            title="Hapus pengguna"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-lg w-full p-6 animate-in border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Tambah Pengguna Baru</h2>
              <button onClick={() => setShowModal(false)} className="btn-ghost p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="label">Nama Lengkap</label>
                  <input
                    className="input-field"
                    placeholder="Nama pengguna"
                    value={form.displayName}
                    onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="email@labtrack.id"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="label">Password</label>
                  <input
                    type="password"
                    className="input-field"
                    placeholder="Minimal 6 karakter"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <label className="label">Role</label>
                  <select
                    className="input-field"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value as 'admin' | 'laboran' })}
                  >
                    <option value="admin">Admin</option>
                    <option value="laboran">Laboran</option>
                  </select>
                </div>

                <div>
                  <label className="label">No. Telepon</label>
                  <input
                    className="input-field"
                    placeholder="Opsional"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">
                  Batal
                </button>
                <button type="submit" disabled={submitting} className="btn-primary">
                  {submitting ? 'Menyimpan...' : 'Buat Pengguna'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}