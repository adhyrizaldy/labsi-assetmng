export type UserRole = 'kepalalab' | 'admin' | 'laboran';

export type AssetCategory = 'tool' | 'consumable';

export type AssetCondition = 'baik' | 'cukup_baik' | 'rusak';

export type BarcodeSource = 'PRODUCT' | 'GENERATED';

export type TransactionType = 'STOCK_IN' | 'STOCK_OUT' | 'RETURN' | 'TRANSFER';

export type TransactionMethod = 'WEB_SCAN' | 'TELEGRAM' | 'MANUAL';

export interface Lab {
  id: string;
  name: string;
  code: string;
  description?: string;
  location?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  firebaseUid: string;
  email: string;
  displayName: string;
  role: UserRole;
  roleTitle?: string;
  phone?: string;
  telegramChatId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserLab {
  userId: string;
  labId: string;
}

export interface Asset {
  id: string;
  barcode: string;
  barcodeSource: BarcodeSource;
  name: string;
  category: AssetCategory;
  labId: string;
  brand?: string;
  model?: string;
  location?: string;
  condition: AssetCondition;
  status: string;
  imageUrl?: string;
  purchaseDate?: string;
  purchasePrice?: number;
  quantity?: number;
  unit?: string;
  minStock?: number;
  currentBorrowerId?: string;
  checkoutAt?: string;
  overdueHours: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BarcodeSequence {
  labId: string;
  lastSequence: number;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  assetId: string;
  labId: string;
  performedBy: string;
  borrowerId?: string;
  quantity?: number;
  unit?: string;
  method: TransactionMethod;
  durationMinutes?: number;
  targetLabId?: string;
  notes?: string;
  createdAt: string;
}

export interface Settings {
  labId: string;
  overdueDurationHours: number;
  lowStockAlertEnabled: boolean;
  telegramNotificationsEnabled: boolean;
  updatedAt: string;
}

export interface AssetWithRelations extends Asset {
  lab?: Lab;
  currentBorrower?: User;
  borrower?: User;
}

export interface TransactionWithRelations extends Transaction {
  asset?: Asset;
  lab?: Lab;
  performedByUser?: User;
  borrower?: User;
  targetLab?: Lab;
}

export interface DashboardMetrics {
  totalAssets: number;
  currentlyBorrowed: number;
  lowStockCount: number;
  overdueCount: number;
  recentActivity: TransactionWithRelations[];
  assetHealth: {
    available: number;
    borrowed: number;
    damaged: number;
    underRepair: number;
  };
}

export interface BorrowerOption {
  id: string;
  name: string;
  roleTitle?: string;
  activeLoans: number;
}

export interface ScanResult {
  barcode: string;
  asset?: Asset;
  isNew: boolean;
}

export interface StockInData {
  assetId?: string;
  barcode: string;
  quantity?: number;
  notes?: string;
}

export interface StockOutData {
  assetId?: string;
  barcode: string;
  borrowerId: string;
  quantity?: number;
  notes?: string;
}

export interface ReturnData {
  assetId: string;
  notes?: string;
}

export interface TransferData {
  assetId: string;
  targetLabId: string;
  notes?: string;
}

export interface GenerateBarcodeData {
  labId: string;
  assetName: string;
  count?: number;
}

export interface LabelPrintData {
  barcode: string;
  name: string;
  labName: string;
}

export interface AuthUser extends User {
  labs?: Lab[];
}