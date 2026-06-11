'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/types';
import {
  LayoutDashboard,
  Boxes,
  ScanLine,
  Printer,
  Users,
  Building2,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

const navigation: { name: string; href: string; icon: React.ComponentType<{ className?: string }>; roles: UserRole[] }[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['kepalalab', 'admin'] },
  { name: 'Daftar Aset', href: '/assets', icon: Boxes, roles: ['kepalalab', 'admin'] },
  { name: 'Scan Barcode', href: '/scan', icon: ScanLine, roles: ['kepalalab', 'admin'] },
  { name: 'Generate Barcode', href: '/barcode/generate', icon: Printer, roles: ['kepalalab', 'admin'] },
  { name: 'Kelola Pengguna', href: '/users', icon: Users, roles: ['kepalalab'] },
  { name: 'Kelola Lab', href: '/labs', icon: Building2, roles: ['kepalalab'] },
  { name: 'Laporan', href: '/reports', icon: FileText, roles: ['kepalalab'] },
  { name: 'Pengaturan', href: '/settings', icon: Settings, roles: ['kepalalab'] },
];

const laboranNavigation: { name: string; href: string; icon: React.ComponentType<{ className?: string }>; roles: UserRole[] }[] = [
  { name: 'Pinjaman Saya', href: '/borrowings', icon: Boxes, roles: ['laboran'] },
];

interface SidebarProps {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed, onCollapsedChange }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout, hasRole } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const filteredNav = navigation.filter((item) => hasRole(item.roles));
  const filteredLaboranNav = laboranNavigation.filter((item) => hasRole(item.roles));

  if (!user) return null;

  const isLaboran = user.role === 'laboran';
  const activeNav = isLaboran ? filteredLaboranNav : filteredNav;

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 btn-secondary p-2"
        onClick={() => setMobileOpen(true)}
        aria-label="Buka menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out lg:translate-x-0 ${
          collapsed ? 'w-16' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        aria-label="Navigasi utama"
      >
        <div className="flex flex-col h-full">
          <div className={`flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700 ${collapsed ? 'justify-center' : ''}`}>
            {!collapsed && (
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <span className="font-bold text-lg text-gray-900 dark:text-gray-100">LabTrack</span>
              </Link>
            )}
            <button
              onClick={() => onCollapsedChange(!collapsed)}
              className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden lg:block"
              aria-label={collapsed ? 'Perluas sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" role="navigation" aria-label="Menu utama">
            {activeNav.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/10 text-primary dark:bg-primary/20'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  } ${collapsed ? 'justify-center' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                  title={collapsed ? item.name : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                  {!collapsed && <span className="truncate">{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <div className={`flex items-center gap-3 px-3 py-2 ${collapsed ? 'justify-center' : ''}`}>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-primary">
                  {user.displayName?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {user.displayName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize truncate">
                    {user.role}
                  </p>
                </div>
              )}
            </div>

            {!collapsed && (
              <div className="mt-3 space-y-1">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  <span>Profil</span>
                </Link>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-danger hover:bg-danger/10 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Keluar</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}