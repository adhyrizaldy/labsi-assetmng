'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Shield, Building2, Save } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6 animate-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Profil</h1>
          <p className="text-gray-500 dark:text-gray-400">Informasi akun Anda</p>
        </div>

        <div className="card">
          <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">
                {user.displayName?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{user.displayName}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user.role}</p>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label className="label">
                <User className="w-4 h-4 inline mr-1" />
                Nama Lengkap
              </label>
              <input className="input-field" defaultValue={user.displayName} />
            </div>
            <div>
              <label className="label">
                <Mail className="w-4 h-4 inline mr-1" />
                Email
              </label>
              <input className="input-field" defaultValue={user.email} disabled />
            </div>
            <div>
              <label className="label">
                <Shield className="w-4 h-4 inline mr-1" />
                Peran
              </label>
              <input className="input-field" defaultValue={user.role} disabled />
            </div>

            <div className="pt-4">
              <button className="btn-primary">
                <Save className="w-4 h-4" />
                <span>Simpan Profil</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}