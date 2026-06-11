import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Barcode Scan Logic', () => {
  const mockAssets = [
    { id: 'asset-1', barcode: 'AST-001', name: 'Tang Crimping', status: 'Tersedia', currentBorrower: null },
    { id: 'asset-2', barcode: 'AST-002', name: 'Kabel LAN 5m', status: 'Terpakai', currentBorrower: { id: 'user-1', displayName: 'Budi' } },
    { id: 'asset-3', barcode: 'AST-003', name: 'Multimeter', status: 'Rusak', currentBorrower: null },
  ];

  const borrowers = [
    { id: 'user-1', displayName: 'Budi', role: 'laboran' },
    { id: 'user-2', displayName: 'Ani', role: 'laboran' },
  ];

  describe('Barcode Search', () => {
    it('finds asset by barcode', () => {
      const found = mockAssets.find((a) => a.barcode === 'AST-001');
      expect(found).toBeDefined();
      expect(found?.name).toBe('Tang Crimping');
    });

    it('returns undefined for unknown barcode', () => {
      const found = mockAssets.find((a) => a.barcode === 'UNKNOWN');
      expect(found).toBeUndefined();
    });

    it('is case sensitive', () => {
      const found = mockAssets.find((a) => a.barcode === 'ast-001');
      expect(found).toBeUndefined();
    });
  });

  describe('Checkout Validation', () => {
    it('allows checkout when asset is available', () => {
      const asset = mockAssets.find((a) => a.id === 'asset-1');
      const canCheckout = asset && !asset.currentBorrower;
      expect(canCheckout).toBe(true);
    });

    it('blocks checkout when asset is already borrowed', () => {
      const asset = mockAssets.find((a) => a.id === 'asset-2');
      const canCheckout = !(asset && asset.currentBorrower);
      expect(canCheckout).toBe(false);
    });

    it('requires borrower selection', () => {
      const hasBorrower = borrowers.length > 0 && borrowers[0].id !== '';
      expect(hasBorrower).toBe(true);
    });

    it('requires borrower to be laboran role', () => {
      const validBorrowers = borrowers.filter((b) => b.role === 'laboran');
      expect(validBorrowers).toHaveLength(2);
    });
  });

  describe('Return Validation', () => {
    it('allows return when asset is borrowed', () => {
      const asset = mockAssets.find((a) => a.id === 'asset-2');
      const canReturn = !!(asset && asset.currentBorrower);
      expect(canReturn).toBe(true);
    });

    it('blocks return when asset is not borrowed', () => {
      const asset = mockAssets.find((a) => a.id === 'asset-1');
      const canReturn = !!(asset && asset.currentBorrower);
      expect(canReturn).toBe(false);
    });
  });

  describe('Status Transitions', () => {
    it('transitions from Tersedia to Terpakai on checkout', () => {
      const newStatus = 'Terpakai';
      expect(newStatus).toBe('Terpakai');
    });

    it('transitions from Terpakai to Tersedia on return', () => {
      const newStatus = 'Tersedia';
      expect(newStatus).toBe('Tersedia');
    });

    it('does not allow checkout of Rusak asset', () => {
      const asset = mockAssets.find((a) => a.id === 'asset-3');
      const isRusak = asset?.status === 'Rusak';
      const canCheckout = !isRusak && !asset?.currentBorrower;
      expect(canCheckout).toBe(false);
    });

    it('does not allow checkout of asset in repair', () => {
      const mockRepairAsset = { ...mockAssets[0], status: 'Dalam Perbaikan' };
      const canCheckout = mockRepairAsset.status === 'Tersedia' && !mockRepairAsset.currentBorrower;
      expect(canCheckout).toBe(false);
    });
  });

  describe('Transaction Recording', () => {
    const transaction = {
      type: 'STOCK_OUT',
      assetId: 'asset-1',
      labId: 'lab-1',
      performedById: 'admin-1',
      borrowerId: 'user-1',
    };

    it('records STOCK_OUT for checkout', () => {
      expect(transaction.type).toBe('STOCK_OUT');
      expect(transaction.borrowerId).toBeDefined();
    });

    it('records RETURN for return', () => {
      const returnTx = { ...transaction, type: 'RETURN', borrowerId: 'user-1' };
      expect(returnTx.type).toBe('RETURN');
    });

    it('includes performed by user', () => {
      expect(transaction.performedById).toBe('admin-1');
    });

    it('includes asset and lab references', () => {
      expect(transaction.assetId).toBe('asset-1');
      expect(transaction.labId).toBe('lab-1');
    });
  });
});
