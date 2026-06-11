'use client';

import { useAuth } from '@/context/AuthContext';
import { Sun, Moon, Bell, ChevronDown, LayoutDashboard, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export function Header() {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return saved ? JSON.parse(saved) : prefersDark;
    }
    return false;
  });
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  if (!user) return null;

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 hidden sm:block">
            LabTrack
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={darkMode ? 'Mode terang' : 'Mode gelap'}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Notifikasi"
              aria-expanded={notificationsOpen}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 glass-card rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 animate-in">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Notifikasi</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="px-4 py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
                    Belum ada notifikasi
                  </div>
                </div>
                <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                  <Link href="/notifications" className="text-sm text-primary hover:underline block text-center">
                    Lihat semua notifikasi
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Menu pengguna"
              aria-expanded={userMenuOpen}
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {user.displayName?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                {user.displayName}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500 hidden md:block" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 glass-card rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 animate-in">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="font-medium text-gray-900 dark:text-gray-100">{user.displayName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role}</p>
                </div>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <Settings className="w-4 h-4" />
                  Profil
                </Link>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-danger/10"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Keluar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}