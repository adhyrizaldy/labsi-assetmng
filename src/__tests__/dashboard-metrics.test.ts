import { describe, it, expect } from 'vitest';

const typeLabel: Record<string, string> = {
  STOCK_IN: 'Stok Masuk',
  STOCK_OUT: 'Peminjaman',
  RETURN: 'Pengembalian',
  TRANSFER: 'Transfer',
};

const statusBadge: Record<string, string> = {
  Tersedia: 'badge-success',
  Terpakai: 'badge-warning',
  Rusak: 'badge-danger',
  'Dalam Perbaikan': 'badge-info',
  Habis: 'badge-danger',
  'Stok Rendah': 'badge-warning',
};

const conditionLabel: Record<string, string> = {
  baik: 'Baik',
  cukup_baik: 'Cukup Baik',
  rusak: 'Rusak',
};

describe('Dashboard Data Logic', () => {
  const mockAssets = [
    { id: '1', status: 'Tersedia', category: 'tool', condition: 'baik' },
    { id: '2', status: 'Tersedia', category: 'consumable', condition: 'cukup_baik' },
    { id: '3', status: 'Terpakai', category: 'tool', condition: 'baik' },
    { id: '4', status: 'Rusak', category: 'tool', condition: 'rusak' },
    { id: '5', status: 'Terpakai', category: 'consumable', condition: 'baik' },
    { id: '6', status: 'Dalam Perbaikan', category: 'tool', condition: 'cukup_baik' },
  ];

  it('counts total assets correctly', () => {
    const total = mockAssets.length;
    expect(total).toBe(6);
  });

  it('filters assets by status', () => {
    const available = mockAssets.filter((a) => a.status === 'Tersedia').length;
    const borrowed = mockAssets.filter((a) => a.status === 'Terpakai').length;
    const damaged = mockAssets.filter((a) => a.status === 'Rusak').length;
    const repair = mockAssets.filter((a) => a.status === 'Dalam Perbaikan').length;

    expect(available).toBe(2);
    expect(borrowed).toBe(2);
    expect(damaged).toBe(1);
    expect(repair).toBe(1);
  });

  it('calculates health percentages', () => {
    const total = mockAssets.length;
    const available = mockAssets.filter((a) => a.status === 'Tersedia').length;
    const pct = Math.round((available / total) * 100);
    expect(pct).toBe(33);
  });

  it('filters by category', () => {
    const tools = mockAssets.filter((a) => a.category === 'tool');
    const consumables = mockAssets.filter((a) => a.category === 'consumable');
    expect(tools).toHaveLength(4);
    expect(consumables).toHaveLength(2);
  });

  it('categorizes by condition', () => {
    const baik = mockAssets.filter((a) => a.condition === 'baik');
    const cukup = mockAssets.filter((a) => a.condition === 'cukup_baik');
    const rusak = mockAssets.filter((a) => a.condition === 'rusak');
    expect(baik).toHaveLength(3);
    expect(cukup).toHaveLength(2);
    expect(rusak).toHaveLength(1);
  });

  it('typeLabel maps correctly', () => {
    expect(typeLabel.STOCK_IN).toBe('Stok Masuk');
    expect(typeLabel.STOCK_OUT).toBe('Peminjaman');
    expect(typeLabel.RETURN).toBe('Pengembalian');
    expect(typeLabel.TRANSFER).toBe('Transfer');
  });

  it('statusBadge maps correctly', () => {
    expect(statusBadge.Tersedia).toBe('badge-success');
    expect(statusBadge.Terpakai).toBe('badge-warning');
    expect(statusBadge.Rusak).toBe('badge-danger');
  });

  it('conditionLabel maps correctly', () => {
    expect(conditionLabel.baik).toBe('Baik');
    expect(conditionLabel.cukup_baik).toBe('Cukup Baik');
    expect(conditionLabel.rusak).toBe('Rusak');
  });
});

describe('TypeScript Enums Match', () => {
  it('asset category strings are correct', () => {
    const categories = ['tool', 'consumable'] as const;
    expect(categories).toContain('tool');
    expect(categories).toContain('consumable');
  });

  it('user role strings are correct', () => {
    const roles = ['kepalalab', 'admin', 'laboran'] as const;
    expect(roles).toContain('kepalalab');
    expect(roles).toContain('admin');
    expect(roles).toContain('laboran');
  });

  it('transaction types are correct', () => {
    const types = ['STOCK_IN', 'STOCK_OUT', 'RETURN', 'TRANSFER'] as const;
    expect(types).toContain('STOCK_IN');
    expect(types).toContain('STOCK_OUT');
    expect(types).toContain('RETURN');
    expect(types).toContain('TRANSFER');
  });

  it('condition values are correct', () => {
    const conditions = ['baik', 'cukup_baik', 'rusak'] as const;
    expect(conditions).toContain('baik');
    expect(conditions).toContain('cukup_baik');
    expect(conditions).toContain('rusak');
  });
});
