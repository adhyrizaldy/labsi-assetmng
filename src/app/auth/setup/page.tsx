'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Building2, CheckCircle, AlertCircle } from 'lucide-react';

export default function SetupPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [status, setStatus] = useState<'checking' | 'ready' | 'done' | 'error'>('checking');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
  });

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/dashboard');
        return;
      }
      checkSetup();
    }
  }, [loading, user, router]);

  const checkSetup = async () => {
    try {
      const res = await fetch('/api/auth/setup');
      const data = await res.json();
      if (data.initialized) {
        setStatus('done');
      } else {
        setStatus('ready');
      }
    } catch {
      setStatus('error');
      setError('Firebase Admin SDK belum dikonfigurasi. Setup service account key terlebih dahulu.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.password.length < 6) {
      setError('Password minimal 6 karakter.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Password dan konfirmasi tidak cocok.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          displayName: form.displayName,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Gagal membuat akun.');
        return;
      }

      setSuccess(`Akun KepalaLab "${data.user.displayName}" berhasil dibuat! Silakan login.`);
      setStatus('done');
    } catch {
      setError('Gagal terhubung ke server. Pastikan server berjalan.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || status === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-danger mb-4" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Konfigurasi Diperlukan</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
          <ol className="text-left text-sm text-gray-600 dark:text-gray-400 space-y-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <li>1. Buka <strong>Firebase Console → Project Settings → Service Accounts</strong></li>
            <li>2. Klik <strong>Generate new private key</strong></li>
            <li>3. Copy seluruh JSON yang di-download</li>
            <li>4. Set sebagai <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">FIREBASE_SERVICE_ACCOUNT_KEY</code> di <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.env.local</code></li>
            <li>5. Restart server</li>
          </ol>
        </div>
      </div>
    );
  }

  if (status === 'done') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center animate-in">
          <CheckCircle className="w-16 h-16 mx-auto text-success mb-4" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {success || 'Sistem sudah diinisialisasi'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Silakan login dengan akun KepalaLab Anda.
          </p>
          <a href="/login" className="btn-primary">
            Halaman Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-primary/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 px-4">
      <div className="w-full max-w-md animate-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
            <Building2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Setup Awal</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Buat akun KepalaLab pertama</p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">Nama Lengkap</label>
              <input
                className="input-field"
                placeholder="Nama Kepala Laboratorium"
                value={form.displayName}
                onChange={(e) => setForm({ ...form, displayName: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input-field"
                placeholder="admin@labtrack.id"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div>
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
              <label className="label">Konfirmasi Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="Ulangi password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                required
              />
            </div>

            {error && (
              <div className="bg-danger-light text-danger dark:bg-danger/20 dark:text-danger-light border border-danger/30 rounded-lg p-4 text-sm" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full py-3 text-base"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Membuat akun...
                </>
              ) : (
                'Buat Akun KepalaLab'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}