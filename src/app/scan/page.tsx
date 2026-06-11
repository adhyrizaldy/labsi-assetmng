'use client';

import { useState, useEffect, useRef } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { getAssetByBarcode, checkoutAsset, returnAsset, createTransaction, listUsers, TransactionType, TransactionMethod } from '@labtrack/dataconnect';
import { ScanLine, Search, CheckCircle, XCircle, Camera, User, Loader2 } from 'lucide-react';

interface ScannedAsset {
  id: string;
  barcode: string;
  name: string;
  category: string;
  condition: string;
  status: string;
  quantity?: number | null;
  unit?: string | null;
  lab: { id: string; name: string };
  currentBorrower?: { id: string; displayName: string } | null;
}

interface UserOption {
  id: string;
  displayName: string;
}

export default function ScanPage() {
  const { hasRole, user } = useAuth();

  const [scanMode, setScanMode] = useState<'checkout' | 'return'>('checkout');
  const [barcodeInput, setBarcodeInput] = useState('');
  const [scanned, setScanned] = useState<ScannedAsset | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [borrowerId, setBorrowerId] = useState('');
  const [borrowers, setBorrowers] = useState<UserOption[]>([]);
  const [newBarcode, setNewBarcode] = useState('');
  const [showNewAsset, setShowNewAsset] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listUsers().then((res) => setBorrowers(res.data.users.filter((u: { isActive: boolean; role: string }) => u.isActive && u.role === 'laboran'))).catch(() => {});
  }, []);

  useEffect(() => {
    setScanned(null);
    setBarcodeInput('');
    setNewBarcode('');
    setError(null);
    setSuccess(null);
    setShowNewAsset(false);
    inputRef.current?.focus();
  }, [scanMode]);

  async function searchBarcode(barcode: string) {
    if (!barcode) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    setScanned(null);
    setShowNewAsset(false);
    try {
      const res = await getAssetByBarcode({ barcode });
      const assets = res.data.assets;
      if (assets && assets.length > 0) {
        const a = assets[0];
        setScanned({
          id: a.id,
          barcode: a.barcode,
          name: a.name,
          category: a.category,
          condition: a.condition,
          status: a.status,
          quantity: a.quantity,
          unit: a.unit,
          lab: { id: a.lab.id, name: a.lab.name },
          currentBorrower: a.currentBorrower || null,
        });
        if (scanMode === 'checkout' && a.currentBorrower) {
          setError(`Aset "${a.name}" sedang dipinjam oleh ${a.currentBorrower.displayName}`);
        }
        if (scanMode === 'return' && !a.currentBorrower) {
          setError(`Aset "${a.name}" sedang tidak dipinjam`);
        }
      } else {
        setShowNewAsset(true);
        setNewBarcode(barcode);
      }
    } catch {
      setError('Gagal mencari aset. Periksa koneksi.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await searchBarcode(barcodeInput);
  }

  async function handleCheckout() {
    if (!scanned || !borrowerId || !user) return;
    setLoading(true);
    setError(null);
    try {
      const now = new Date().toISOString();
      await checkoutAsset({ id: scanned.id, borrowerId, checkoutAt: now, status: 'Terpakai' });
      await createTransaction({
        type: TransactionType.STOCK_OUT,
        assetId: scanned.id,
        labId: scanned.lab.id,
        performedById: user.id,
        borrowerId,
        method: TransactionMethod.WEB_SCAN,
      });
      setSuccess(`"${scanned.name}" berhasil dipinjamkan`);
      setScanned(null);
      setBarcodeInput('');
      setBorrowerId('');
    } catch {
      setError('Gagal memproses peminjaman');
    } finally {
      setLoading(false);
    }
  }

  async function handleReturn() {
    if (!scanned || !user) return;
    setLoading(true);
    setError(null);
    try {
      await returnAsset({ id: scanned.id, status: 'Tersedia' });
      await createTransaction({
        type: TransactionType.RETURN,
        assetId: scanned.id,
        labId: scanned.lab.id,
        performedById: user.id,
        borrowerId: scanned.currentBorrower?.id,
        method: TransactionMethod.WEB_SCAN,
      });
      setSuccess(`"${scanned.name}" berhasil dikembalikan`);
      setScanned(null);
      setBarcodeInput('');
    } catch {
      setError('Gagal memproses pengembalian');
    } finally {
      setLoading(false);
    }
  }

  const isCheckoutValid = scanned && scanMode === 'checkout' && borrowerId && !scanned.currentBorrower;

  const canManage = hasRole(['kepalalab', 'admin']);
  if (!canManage) return null;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-in">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Scan Barcode</h1>
          <p className="text-gray-500 dark:text-gray-400">Scan barcode untuk peminjaman atau pengembalian aset</p>
        </div>

        <div className="flex gap-3 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl w-fit">
          <button onClick={() => setScanMode('checkout')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${scanMode === 'checkout' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-gray-100' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
            Barang Keluar (Pinjam)
          </button>
          <button onClick={() => setScanMode('return')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${scanMode === 'return' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-gray-100' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
            Barang Masuk (Kembali)
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title"><Search className="w-5 h-5 inline mr-2" />Input Barcode</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex gap-2">
                  <input ref={inputRef} type="text" value={barcodeInput} onChange={(e) => setBarcodeInput(e.target.value)} className="input-field font-mono" placeholder="Ketik atau scan barcode..." autoFocus />
                  <button type="submit" disabled={loading} className="btn-primary px-6">{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Cari'}</button>
                </div>
              </form>
            </div>

            <div className="card">
              <div className="card-header"><h2 className="card-title"><Camera className="w-5 h-5 inline mr-2" />Kamera</h2></div>
              <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center">
                <ScanLine className="w-16 h-16 text-gray-600" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center">Arahkan kamera ke barcode aset</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Success */}
            {success && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                <div>
                  <p className="font-medium text-green-800 dark:text-green-200">Berhasil!</p>
                  <p className="text-sm text-green-600 dark:text-green-300">{success}</p>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center gap-3">
                <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* New Asset Prompt */}
            {showNewAsset && (
              <div className="card">
                <p className="text-gray-600 dark:text-gray-300 mb-3">Aset dengan barcode <strong>{newBarcode}</strong> tidak ditemukan.</p>
                <a href={`/assets/new?barcode=${newBarcode}`} className="btn-primary w-full justify-center">Daftarkan Aset Baru</a>
              </div>
            )}

            {/* Scanned Asset */}
            {scanned && (
              <div className="card space-y-4">
                <div className="card-header"><h2 className="card-title">Detail Aset</h2></div>
                <div className="space-y-2">
                  <div className="flex justify-between"><span className="text-sm text-gray-500">Nama</span><span className="text-sm font-medium text-gray-900 dark:text-gray-100">{scanned.name}</span></div>
                  <div className="flex justify-between"><span className="text-sm text-gray-500">Barcode</span><code className="text-sm font-mono bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{scanned.barcode}</code></div>
                  <div className="flex justify-between"><span className="text-sm text-gray-500">Lab</span><span className="text-sm text-gray-900 dark:text-gray-100">{scanned.lab.name}</span></div>
                  <div className="flex justify-between"><span className="text-sm text-gray-500">Kategori</span><span className="text-sm">{scanned.category === 'consumable' ? 'Habis Pakai' : 'Alat'}</span></div>
                  <div className="flex justify-between"><span className="text-sm text-gray-500">Status</span>
                    <span className={`badge ${scanned.status === 'Tersedia' ? 'badge-success' : scanned.status === 'Terpakai' ? 'badge-warning' : 'badge-gray'}`}>{scanned.status}</span>
                  </div>
                  {scanned.currentBorrower && (
                    <div className="flex justify-between"><span className="text-sm text-gray-500">Peminjam</span><span className="text-sm text-gray-900 dark:text-gray-100">{scanned.currentBorrower.displayName}</span></div>
                  )}
                </div>

                <hr className="border-gray-200 dark:border-gray-700" />

                {scanMode === 'checkout' && !scanned.currentBorrower && (
                  <div className="space-y-3">
                    <label className="label">Pilih Peminjam</label>
                    <select value={borrowerId} onChange={(e) => setBorrowerId(e.target.value)} className="input-field">
                      <option value="">-- Pilih laboran --</option>
                      {borrowers.map((b) => <option key={b.id} value={b.id}>{b.displayName}</option>)}
                    </select>
                    <button onClick={handleCheckout} disabled={!isCheckoutValid || loading} className="btn-primary w-full justify-center">
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <User className="w-4 h-4" />}
                      <span>Konfirmasi Peminjaman</span>
                    </button>
                  </div>
                )}

                {scanMode === 'return' && scanned.currentBorrower && (
                  <button onClick={handleReturn} disabled={loading} className="btn-primary w-full justify-center bg-green-600 hover:bg-green-700">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                    <span>Konfirmasi Pengembalian</span>
                  </button>
                )}
              </div>
            )}

            {/* Empty State */}
            {!scanned && !success && !error && !showNewAsset && (
              <div className="card">
                <div className="text-center py-8">
                  <ScanLine className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">
                    {scanMode === 'checkout' ? 'Scan barcode aset untuk dipinjamkan' : 'Scan barcode aset yang akan dikembalikan'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
