import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'LabTrack - Sistem Manajemen Aset Laboratorium',
  description: 'Sistem manajemen aset laboratorium komputer dengan barcode scanning',
  keywords: ['laboratorium', 'aset', 'manajemen', 'barcode', 'inventory'],
};

export const viewport: Viewport = {
  themeColor: '#6C5CE7',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#6C5CE7" />
      </head>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen" suppressHydrationWarning>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}