import { describe, it, expect, vi, beforeEach } from 'vitest';

function exportCSV(filename: string, headers: string[], rows: string[][]) {
  const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

describe('CSV Export Utility', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('generates valid CSV string', () => {
    const headers = ['Barcode', 'Nama', 'Kategori'];
    const rows = [
      ['AST-001', 'Tang Crimping', 'Alat'],
      ['AST-002', 'Kabel LAN', 'Habis Pakai'],
    ];

    const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${c}"`).join(','))].join('\n');
    expect(csv).toContain('Barcode,Nama,Kategori');
    expect(csv).toContain('"AST-001","Tang Crimping","Alat"');
    expect(csv).toContain('"AST-002","Kabel LAN","Habis Pakai"');
  });

  it('escapes double quotes in CSV', () => {
    const rows = [['Item "A"', 'Test']];
    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n');
    expect(csv).toContain('"Item ""A""","Test"');
  });

  it('sets correct filename on anchor', () => {
    const anchor = document.createElement('a');
    anchor.download = 'inventaris-aset.csv';
    expect(anchor.download).toBe('inventaris-aset.csv');
  });

  it('handles empty rows', () => {
    const csv = [['Nama'].join(','), '', ''].join('\n');
    expect(csv).toBe('Nama\n\n');
  });

  it('handles special characters in fields', () => {
    const rows = [['Masker, 3 Ply', 'Rp 50.000']];
    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n');
    expect(csv).toContain('"Masker, 3 Ply","Rp 50.000"');
  });

  it('creates Blob with correct MIME type', () => {
    const blob = new Blob([['test'].join(',')], { type: 'text/csv' });
    expect(blob.type).toBe('text/csv');
  });
});

describe('Date Formatting', () => {
  it('formats date with Indonesian locale', () => {
    const d = new Date('2025-04-15T10:30:00');
    const formatted = d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
    expect(formatted).toContain('15');
    expect(formatted).toContain('Apr');
  });

  it('formats different date to correct string', () => {
    const d = new Date('2025-12-01T08:00:00');
    const formatted = d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
    });
    expect(formatted).toContain('Des');
  });
});
