'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { listLabs, createAsset, BarcodeSource, AssetCategory, AssetCondition } from '@labtrack/dataconnect';
import { ArrowLeft, Save, Barcode } from 'lucide-react';

interface LabOption {
  id: string;
  name: string;
  code: string;
}

export default function NewAssetPage() {
  const { hasRole, getToken } = useAuth();

  const [labs, setLabs] = useState<LabOption[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    barcode: '',
    barcodeSource: BarcodeSource.GENERATED,
    name: '',
    category: AssetCategory.tool,
    labId: '',
    brand: '',
    model: '',
    location: '',
    condition: AssetCondition.baik,
    purchaseDate: '',
    purchasePrice: '',
    quantity: '1',
    unit: 'unit',
    minStock: '',
    overdueHours: '24',
    notes: '',
  });

  useEffect(() => {
    listLabs().then((res) => setLabs(res.data.labs)).catch(() => {});
  }, []);

  if (!hasRole(['kepalalab', 'admin'])) return null;

  async function generateBarcode() {
    const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
    setForm({ ...form, barcode: `AST-${rand}`, barcodeSource: BarcodeSource.GENERATED });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.barcode || !form.name || !form.labId) return;
    setSaving(true);
    setError(null);

    try {
      const token = await getToken();
      let imageUrl: string | null = null;
      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
      if (fileInput?.files?.[0] && token) {
        const fd = new FormData();
        fd.append('file', fileInput.files[0]);
        fd.append('folder', 'assets');
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: fd,
        });
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          imageUrl = uploadData.url;
        }
      }

      await createAsset({
        barcode: form.barcode,
        barcodeSource: form.barcodeSource,
        name: form.name,
        category: form.category,
        labId: form.labId,
        brand: form.brand || null,
        model: form.model || null,
        location: form.location || null,
        condition: form.condition,
        imageUrl: imageUrl,
        purchaseDate: form.purchaseDate || null,
        purchasePrice: form.purchasePrice ? parseFloat(form.purchasePrice) : null,
        quantity: form.quantity ? parseFloat(form.quantity) : null,
        unit: form.unit || null,
        minStock: form.minStock ? parseFloat(form.minStock) : null,
        overdueHours: parseInt(form.overdueHours),
        notes: form.notes || null,
      });

      window.location.href = '/assets';
    } catch (err: unknown) {
      setError((err as { message?: string }).message || 'Gagal menyimpan aset');
    } finally {
      setSaving(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6 animate-in">
        <div className="flex items-center gap-4">
          <a href="/assets" className="btn-ghost p-2"><ArrowLeft className="w-5 h-5" /></a>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Tambah Aset Baru</h1>
            <p className="text-gray-500 dark:text-gray-400">Daftarkan aset baru ke laboratorium</p>
          </div>
        </div>

        <div className="card space-y-6">
          {error && <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">{error}</div>}

          <div className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <button type="button" onClick={generateBarcode} className="btn-secondary flex-1">
              <Barcode className="w-5 h-5" /><span>Generate Barcode</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="label">Barcode</label>
                <input required value={form.barcode} onChange={(e) => setForm({ ...form, barcode: e.target.value, barcodeSource: BarcodeSource.PRODUCT })} className="input-field font-mono" placeholder="Scan atau generate barcode" />
              </div>

              <div className="col-span-2">
                <label className="label">Nama Aset</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Nama aset" />
              </div>

              <div>
                <label className="label">Kategori</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as AssetCategory })} className="input-field">
                  <option value="tool">Alat (Reusable)</option>
                  <option value="consumable">Habis Pakai</option>
                </select>
              </div>

              <div>
                <label className="label">Laboratorium</label>
                <select required value={form.labId} onChange={(e) => setForm({ ...form, labId: e.target.value })} className="input-field">
                  <option value="">Pilih lab</option>
                  {labs.map((l) => <option key={l.id} value={l.id}>{l.name} ({l.code})</option>)}
                </select>
              </div>

              <div>
                <label className="label">Merek</label>
                <input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="input-field" placeholder="Krisbow" />
              </div>

              <div>
                <label className="label">Model</label>
                <input value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} className="input-field" placeholder="Model number" />
              </div>

              <div>
                <label className="label">Lokasi</label>
                <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="input-field" placeholder="Rak / lemari" />
              </div>

              <div>
                <label className="label">Kondisi</label>
                <select value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value as AssetCondition })} className="input-field">
                  <option value="baik">Baik</option>
                  <option value="cukup_baik">Cukup Baik</option>
                  <option value="rusak">Rusak</option>
                </select>
              </div>

              <div>
                <label className="label">Tanggal Pembelian</label>
                <input type="date" value={form.purchaseDate} onChange={(e) => setForm({ ...form, purchaseDate: e.target.value })} className="input-field" />
              </div>

              <div>
                <label className="label">Harga (Rp)</label>
                <input type="number" value={form.purchasePrice} onChange={(e) => setForm({ ...form, purchasePrice: e.target.value })} className="input-field" placeholder="0" />
              </div>

              <div>
                <label className="label">Jumlah</label>
                <input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="input-field" placeholder="1" />
              </div>

              <div>
                <label className="label">Satuan</label>
                <select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} className="input-field">
                  <option value="unit">Unit</option>
                  <option value="pcs">Pcs</option>
                  <option value="items">Items</option>
                  <option value="metres">Metres</option>
                  <option value="rolls">Rolls</option>
                  <option value="bottles">Bottles</option>
                </select>
              </div>

              <div>
                <label className="label">Stok Minimum</label>
                <input type="number" value={form.minStock} onChange={(e) => setForm({ ...form, minStock: e.target.value })} className="input-field" placeholder="0" />
              </div>

              <div>
                <label className="label">Batas Jam (Overdue)</label>
                <input type="number" value={form.overdueHours} onChange={(e) => setForm({ ...form, overdueHours: e.target.value })} className="input-field" />
              </div>

              <div className="col-span-2">
                <label className="label">Gambar</label>
                <input id="image-upload" type="file" accept="image/*" className="input-field" />
              </div>
            </div>

            <div>
              <label className="label">Catatan</label>
              <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input-field" rows={3} placeholder="Catatan tambahan..." />
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
              <a href="/assets" className="btn-secondary">Batal</a>
              <button type="submit" disabled={saving} className="btn-primary">
                <Save className="w-4 h-4" /><span>{saving ? 'Menyimpan...' : 'Simpan Aset'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
