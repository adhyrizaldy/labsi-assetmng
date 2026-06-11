'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Building2 } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [redirecting, setRedirecting] = useState(true);

  useEffect(() => {
    if (loading) return;

    const checkAndRedirect = async () => {
      if (user) {
        router.replace('/dashboard');
        return;
      }

      try {
        const res = await fetch('/api/auth/setup');
        const data = await res.json();
        if (!data.initialized) {
          router.replace('/auth/setup');
        } else {
          router.replace('/login');
        }
      } catch {
        router.replace('/auth/setup');
      } finally {
        setRedirecting(false);
      }
    };

    checkAndRedirect();
  }, [user, loading, router]);

  if (loading || redirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-primary/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
        <div className="text-center animate-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 text-primary mb-6">
            <Building2 className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">LabTrack</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Sistem Manajemen Aset Laboratorium</p>
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
        </div>
      </div>
    );
  }

  return null;
}