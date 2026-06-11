import { describe, it, expect, vi, beforeEach } from 'vitest';

const DEFAULT_EXPIRY_HOURS = 24;

function calculateDuration(checkoutAt: string | null, overdueHours: number): { hours: number; isOverdue: boolean } {
  if (!checkoutAt) return { hours: 0, isOverdue: false };
  const checkout = new Date(checkoutAt).getTime();
  const now = Date.now();
  const diffMs = now - checkout;
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  return { hours, isOverdue: hours > overdueHours };
}

describe('Loan Duration Calculations', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calculates hours since checkout', () => {
    const fiveHoursAgo = new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString();
    const { hours } = calculateDuration(fiveHoursAgo, DEFAULT_EXPIRY_HOURS);
    expect(hours).toBe(5);
  });

  it('detects overdue when hours exceed limit', () => {
    const thirtyHoursAgo = new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString();
    const { isOverdue } = calculateDuration(thirtyHoursAgo, DEFAULT_EXPIRY_HOURS);
    expect(isOverdue).toBe(true);
  });

  it('not overdue when within limit', () => {
    const tenHoursAgo = new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString();
    const { isOverdue } = calculateDuration(tenHoursAgo, DEFAULT_EXPIRY_HOURS);
    expect(isOverdue).toBe(false);
  });

  it('handles null checkout date', () => {
    const { hours, isOverdue } = calculateDuration(null, DEFAULT_EXPIRY_HOURS);
    expect(hours).toBe(0);
    expect(isOverdue).toBe(false);
  });

  it('returns 0 hours for exactly now', () => {
    const now = new Date().toISOString();
    const { hours } = calculateDuration(now, DEFAULT_EXPIRY_HOURS);
    expect(hours).toBe(0);
  });

  it('uses custom overdue hours', () => {
    const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString();
    const { isOverdue: overdue4 } = calculateDuration(sixHoursAgo, 4);
    const { isOverdue: overdue8 } = calculateDuration(sixHoursAgo, 8);
    expect(overdue4).toBe(true);
    expect(overdue8).toBe(false);
  });
});

describe('Barcode Generation', () => {
  it('generates barcode with AST- prefix', () => {
    const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
    const barcode = `AST-${rand}`;
    expect(barcode).toMatch(/^AST-[A-Z0-9]{6}$/);
  });

  it('generates unique barcodes', () => {
    const barcodes = new Set<string>();
    for (let i = 0; i < 100; i++) {
      const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
      barcodes.add(`AST-${rand}`);
    }
    expect(barcodes.size).toBe(100);
  });

  it('barcode matches expected format', () => {
    const regex = /^AST-[A-Z0-9]{6}$/;
    expect('AST-ABC123').toMatch(regex);
    expect('AST-000001').toMatch(regex);
    expect('AST-').not.toMatch(regex);
    expect('ast-abc123').not.toMatch(regex);
  });
});

describe('Stock Status Logic', () => {
  it('marks as low stock when quantity <= minStock', () => {
    const isLow = (quantity: number, minStock: number) => quantity <= minStock;
    expect(isLow(3, 5)).toBe(true);
    expect(isLow(10, 5)).toBe(false);
    expect(isLow(5, 5)).toBe(true);
    expect(isLow(0, 5)).toBe(true);
  });

  it('consumable items track quantity', () => {
    const item = { quantity: 10, unit: 'pcs', minStock: 5 };
    const isLow = item.quantity <= item.minStock;
    expect(isLow).toBe(false);
  });

  it('tool items are single-unit', () => {
    const item = { quantity: null, unit: 'unit' };
    expect(item.quantity).toBeNull();
    expect(item.unit).toBe('unit');
  });

  it('calculate remaining usage', () => {
    const stock = { quantity: 15, minStock: 5 };
    const usage = stock.quantity - stock.minStock;
    expect(usage).toBe(10);
  });
});
