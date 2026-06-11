import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export enum AssetCategory {
  tool = "tool",
  consumable = "consumable",
};

export enum AssetCondition {
  baik = "baik",
  cukup_baik = "cukup_baik",
  rusak = "rusak",
};

export enum BarcodeSource {
  PRODUCT = "PRODUCT",
  GENERATED = "GENERATED",
};

export enum TransactionMethod {
  WEB_SCAN = "WEB_SCAN",
  TELEGRAM = "TELEGRAM",
  MANUAL = "MANUAL",
};

export enum TransactionType {
  STOCK_IN = "STOCK_IN",
  STOCK_OUT = "STOCK_OUT",
  RETURN = "RETURN",
  TRANSFER = "TRANSFER",
};

export enum UserRole {
  kepalalab = "kepalalab",
  admin = "admin",
  laboran = "laboran",
};



export interface Asset_Key {
  id: UUIDString;
  __typename?: 'Asset_Key';
}

export interface BarcodeSequence_Key {
  id: UUIDString;
  __typename?: 'BarcodeSequence_Key';
}

export interface CheckoutAssetData {
  asset_update?: Asset_Key | null;
}

export interface CheckoutAssetVariables {
  id: UUIDString;
  borrowerId: UUIDString;
  checkoutAt: TimestampString;
  status: string;
}

export interface CreateAssetData {
  asset_insert: Asset_Key;
}

export interface CreateAssetVariables {
  barcode: string;
  barcodeSource: BarcodeSource;
  name: string;
  category: AssetCategory;
  labId: UUIDString;
  brand?: string | null;
  model?: string | null;
  location?: string | null;
  condition: AssetCondition;
  imageUrl?: string | null;
  purchaseDate?: DateString | null;
  purchasePrice?: number | null;
  quantity?: number | null;
  unit?: string | null;
  minStock?: number | null;
  overdueHours?: number | null;
  notes?: string | null;
}

export interface CreateLabData {
  lab_insert: Lab_Key;
}

export interface CreateLabVariables {
  name: string;
  code: string;
  description?: string | null;
  location?: string | null;
}

export interface CreateTransactionData {
  transaction_insert: Transaction_Key;
}

export interface CreateTransactionVariables {
  type: TransactionType;
  assetId: UUIDString;
  labId: UUIDString;
  performedById: UUIDString;
  borrowerId?: UUIDString | null;
  quantity?: number | null;
  unit?: string | null;
  method: TransactionMethod;
  durationMinutes?: number | null;
  notes?: string | null;
}

export interface DeleteAssetData {
  asset_delete?: Asset_Key | null;
}

export interface DeleteAssetVariables {
  id: UUIDString;
}

export interface DeleteLabData {
  lab_delete?: Lab_Key | null;
}

export interface DeleteLabVariables {
  id: UUIDString;
}

export interface GetAssetByBarcodeData {
  assets: ({
    id: UUIDString;
    barcode: string;
    barcodeSource: BarcodeSource;
    name: string;
    category: AssetCategory;
    lab: {
      id: UUIDString;
      name: string;
      code: string;
    } & Lab_Key;
    brand?: string | null;
    model?: string | null;
    location?: string | null;
    condition: AssetCondition;
    status: string;
    imageUrl?: string | null;
    quantity?: number | null;
    unit?: string | null;
    minStock?: number | null;
    currentBorrower?: {
      id: UUIDString;
      displayName: string;
    } & User_Key;
    checkoutAt?: TimestampString | null;
    overdueHours: number;
    notes?: string | null;
    createdAt: TimestampString;
  } & Asset_Key)[];
}

export interface GetAssetByBarcodeVariables {
  barcode: string;
}

export interface GetAssetData {
  asset?: {
    id: UUIDString;
    barcode: string;
    barcodeSource: BarcodeSource;
    name: string;
    category: AssetCategory;
    lab: {
      id: UUIDString;
      name: string;
      code: string;
    } & Lab_Key;
    brand?: string | null;
    model?: string | null;
    location?: string | null;
    condition: AssetCondition;
    status: string;
    imageUrl?: string | null;
    purchaseDate?: DateString | null;
    purchasePrice?: number | null;
    quantity?: number | null;
    unit?: string | null;
    minStock?: number | null;
    currentBorrower?: {
      id: UUIDString;
      displayName: string;
      email: string;
    } & User_Key;
    checkoutAt?: TimestampString | null;
    overdueHours: number;
    notes?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Asset_Key;
}

export interface GetAssetVariables {
  id: UUIDString;
}

export interface GetAssetsByLabData {
  assets: ({
    id: UUIDString;
    barcode: string;
    name: string;
    category: AssetCategory;
    brand?: string | null;
    model?: string | null;
    condition: AssetCondition;
    status: string;
    quantity?: number | null;
    unit?: string | null;
    minStock?: number | null;
    currentBorrower?: {
      id: UUIDString;
      displayName: string;
    } & User_Key;
    checkoutAt?: TimestampString | null;
  } & Asset_Key)[];
}

export interface GetAssetsByLabVariables {
  labId: UUIDString;
}

export interface GetBarcodeSequenceData {
  barcodeSequences: ({
    lab: {
      id: UUIDString;
    } & Lab_Key;
    lastSequence: number;
  })[];
}

export interface GetBarcodeSequenceVariables {
  labId: UUIDString;
}

export interface GetDashboardActivityData {
  transactions: ({
    id: UUIDString;
    type: TransactionType;
    createdAt: TimestampString;
    method: TransactionMethod;
    asset: {
      id: UUIDString;
      name: string;
      barcode: string;
    } & Asset_Key;
    performedBy: {
      displayName: string;
    };
  } & Transaction_Key)[];
}

export interface GetDashboardActivityVariables {
  labId?: UUIDString | null;
}

export interface GetLabData {
  lab?: {
    id: UUIDString;
    name: string;
    code: string;
    description?: string | null;
    location?: string | null;
    isActive: boolean;
    createdAt: TimestampString;
  } & Lab_Key;
}

export interface GetLabVariables {
  id: UUIDString;
}

export interface GetLaboranListData {
  users: ({
    id: UUIDString;
    firebaseUid: string;
    displayName: string;
    roleTitle?: string | null;
  } & User_Key)[];
}

export interface GetLowStockAssetsData {
  assets: ({
    id: UUIDString;
    name: string;
    barcode: string;
    quantity?: number | null;
    unit?: string | null;
    minStock?: number | null;
  } & Asset_Key)[];
}

export interface GetLowStockAssetsVariables {
  labId?: UUIDString | null;
  threshold?: number | null;
}

export interface GetOverdueLoansData {
  assets: ({
    id: UUIDString;
    name: string;
    barcode: string;
    checkoutAt?: TimestampString | null;
    overdueHours: number;
    currentBorrower?: {
      id: UUIDString;
      displayName: string;
    } & User_Key;
  } & Asset_Key)[];
}

export interface GetOverdueLoansVariables {
  labId?: UUIDString | null;
}

export interface GetSettingsData {
  settings?: {
    id: UUIDString;
    lab: {
      id: UUIDString;
    } & Lab_Key;
    overdueDurationHours: number;
    lowStockAlertEnabled: boolean;
    telegramNotificationsEnabled: boolean;
    updatedAt: TimestampString;
  } & Settings_Key;
}

export interface GetSettingsVariables {
  id: UUIDString;
}

export interface GetTransactionsByAssetData {
  transactions: ({
    id: UUIDString;
    type: TransactionType;
    quantity?: number | null;
    unit?: string | null;
    method: TransactionMethod;
    durationMinutes?: number | null;
    notes?: string | null;
    createdAt: TimestampString;
    performedBy: {
      displayName: string;
    };
    borrower?: {
      displayName: string;
    };
  } & Transaction_Key)[];
}

export interface GetTransactionsByAssetVariables {
  assetId: UUIDString;
}

export interface InsertBarcodeSequenceData {
  barcodeSequence_insert: BarcodeSequence_Key;
}

export interface InsertBarcodeSequenceVariables {
  labId: UUIDString;
  lastSequence: number;
}

export interface InsertSettingsData {
  settings_insert: Settings_Key;
}

export interface InsertSettingsVariables {
  labId: UUIDString;
  overdueDurationHours: number;
  lowStockAlertEnabled: boolean;
  telegramNotificationsEnabled: boolean;
}

export interface Lab_Key {
  id: UUIDString;
  __typename?: 'Lab_Key';
}

export interface ListAssetsData {
  assets: ({
    id: UUIDString;
    barcode: string;
    barcodeSource: BarcodeSource;
    name: string;
    category: AssetCategory;
    lab: {
      id: UUIDString;
      name: string;
      code: string;
    } & Lab_Key;
    brand?: string | null;
    model?: string | null;
    location?: string | null;
    condition: AssetCondition;
    status: string;
    imageUrl?: string | null;
    purchaseDate?: DateString | null;
    purchasePrice?: number | null;
    quantity?: number | null;
    unit?: string | null;
    minStock?: number | null;
    currentBorrower?: {
      id: UUIDString;
      displayName: string;
    } & User_Key;
    checkoutAt?: TimestampString | null;
    overdueHours: number;
    notes?: string | null;
    createdAt: TimestampString;
  } & Asset_Key)[];
}

export interface ListLabsData {
  labs: ({
    id: UUIDString;
    name: string;
    code: string;
    description?: string | null;
    location?: string | null;
    isActive: boolean;
    createdAt: TimestampString;
  } & Lab_Key)[];
}

export interface ListTransactionsData {
  transactions: ({
    id: UUIDString;
    type: TransactionType;
    asset: {
      id: UUIDString;
      name: string;
      barcode: string;
      category: AssetCategory;
    } & Asset_Key;
    lab: {
      id: UUIDString;
      name: string;
      code: string;
    } & Lab_Key;
    performedBy: {
      id: UUIDString;
      displayName: string;
    } & User_Key;
    borrower?: {
      id: UUIDString;
      displayName: string;
    } & User_Key;
    quantity?: number | null;
    unit?: string | null;
    method: TransactionMethod;
    durationMinutes?: number | null;
    notes?: string | null;
    createdAt: TimestampString;
  } & Transaction_Key)[];
}

export interface ListUsersData {
  users: ({
    id: UUIDString;
    firebaseUid: string;
    email: string;
    displayName: string;
    role: UserRole;
    roleTitle?: string | null;
    phone?: string | null;
    isActive: boolean;
    createdAt: TimestampString;
  } & User_Key)[];
}

export interface ReturnAssetData {
  asset_update?: Asset_Key | null;
}

export interface ReturnAssetVariables {
  id: UUIDString;
  status: string;
}

export interface Settings_Key {
  id: UUIDString;
  __typename?: 'Settings_Key';
}

export interface Transaction_Key {
  id: UUIDString;
  __typename?: 'Transaction_Key';
}

export interface UpdateAssetData {
  asset_update?: Asset_Key | null;
}

export interface UpdateAssetStatusData {
  asset_update?: Asset_Key | null;
}

export interface UpdateAssetStatusVariables {
  id: UUIDString;
  status: string;
}

export interface UpdateAssetVariables {
  id: UUIDString;
  name?: string | null;
  brand?: string | null;
  model?: string | null;
  location?: string | null;
  condition?: AssetCondition | null;
  imageUrl?: string | null;
  purchaseDate?: DateString | null;
  purchasePrice?: number | null;
  quantity?: number | null;
  unit?: string | null;
  minStock?: number | null;
  overdueHours?: number | null;
  notes?: string | null;
}

export interface UpdateBarcodeSequenceData {
  barcodeSequence_update?: BarcodeSequence_Key | null;
}

export interface UpdateBarcodeSequenceVariables {
  id: UUIDString;
  lastSequence: number;
}

export interface UpdateConsumableStockData {
  asset_update?: Asset_Key | null;
}

export interface UpdateConsumableStockVariables {
  id: UUIDString;
  quantity: number;
  status: string;
}

export interface UpdateLabData {
  lab_update?: Lab_Key | null;
}

export interface UpdateLabVariables {
  id: UUIDString;
  name?: string | null;
  code?: string | null;
  description?: string | null;
  location?: string | null;
  isActive?: boolean | null;
}

export interface UpdateSettingsData {
  settings_update?: Settings_Key | null;
}

export interface UpdateSettingsVariables {
  id: UUIDString;
  overdueDurationHours: number;
  lowStockAlertEnabled: boolean;
  telegramNotificationsEnabled: boolean;
}

export interface UserLab_Key {
  userId: UUIDString;
  labId: UUIDString;
  __typename?: 'UserLab_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface ListLabsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListLabsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListLabsData, undefined>;
  operationName: string;
}
export const listLabsRef: ListLabsRef;

export function listLabs(options?: ExecuteQueryOptions): QueryPromise<ListLabsData, undefined>;
export function listLabs(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListLabsData, undefined>;

interface GetLabRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLabVariables): QueryRef<GetLabData, GetLabVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetLabVariables): QueryRef<GetLabData, GetLabVariables>;
  operationName: string;
}
export const getLabRef: GetLabRef;

export function getLab(vars: GetLabVariables, options?: ExecuteQueryOptions): QueryPromise<GetLabData, GetLabVariables>;
export function getLab(dc: DataConnect, vars: GetLabVariables, options?: ExecuteQueryOptions): QueryPromise<GetLabData, GetLabVariables>;

interface CreateLabRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateLabVariables): MutationRef<CreateLabData, CreateLabVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateLabVariables): MutationRef<CreateLabData, CreateLabVariables>;
  operationName: string;
}
export const createLabRef: CreateLabRef;

export function createLab(vars: CreateLabVariables): MutationPromise<CreateLabData, CreateLabVariables>;
export function createLab(dc: DataConnect, vars: CreateLabVariables): MutationPromise<CreateLabData, CreateLabVariables>;

interface UpdateLabRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateLabVariables): MutationRef<UpdateLabData, UpdateLabVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateLabVariables): MutationRef<UpdateLabData, UpdateLabVariables>;
  operationName: string;
}
export const updateLabRef: UpdateLabRef;

export function updateLab(vars: UpdateLabVariables): MutationPromise<UpdateLabData, UpdateLabVariables>;
export function updateLab(dc: DataConnect, vars: UpdateLabVariables): MutationPromise<UpdateLabData, UpdateLabVariables>;

interface DeleteLabRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteLabVariables): MutationRef<DeleteLabData, DeleteLabVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteLabVariables): MutationRef<DeleteLabData, DeleteLabVariables>;
  operationName: string;
}
export const deleteLabRef: DeleteLabRef;

export function deleteLab(vars: DeleteLabVariables): MutationPromise<DeleteLabData, DeleteLabVariables>;
export function deleteLab(dc: DataConnect, vars: DeleteLabVariables): MutationPromise<DeleteLabData, DeleteLabVariables>;

interface ListAssetsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAssetsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAssetsData, undefined>;
  operationName: string;
}
export const listAssetsRef: ListAssetsRef;

export function listAssets(options?: ExecuteQueryOptions): QueryPromise<ListAssetsData, undefined>;
export function listAssets(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAssetsData, undefined>;

interface GetAssetsByLabRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAssetsByLabVariables): QueryRef<GetAssetsByLabData, GetAssetsByLabVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAssetsByLabVariables): QueryRef<GetAssetsByLabData, GetAssetsByLabVariables>;
  operationName: string;
}
export const getAssetsByLabRef: GetAssetsByLabRef;

export function getAssetsByLab(vars: GetAssetsByLabVariables, options?: ExecuteQueryOptions): QueryPromise<GetAssetsByLabData, GetAssetsByLabVariables>;
export function getAssetsByLab(dc: DataConnect, vars: GetAssetsByLabVariables, options?: ExecuteQueryOptions): QueryPromise<GetAssetsByLabData, GetAssetsByLabVariables>;

interface GetAssetByBarcodeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAssetByBarcodeVariables): QueryRef<GetAssetByBarcodeData, GetAssetByBarcodeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAssetByBarcodeVariables): QueryRef<GetAssetByBarcodeData, GetAssetByBarcodeVariables>;
  operationName: string;
}
export const getAssetByBarcodeRef: GetAssetByBarcodeRef;

export function getAssetByBarcode(vars: GetAssetByBarcodeVariables, options?: ExecuteQueryOptions): QueryPromise<GetAssetByBarcodeData, GetAssetByBarcodeVariables>;
export function getAssetByBarcode(dc: DataConnect, vars: GetAssetByBarcodeVariables, options?: ExecuteQueryOptions): QueryPromise<GetAssetByBarcodeData, GetAssetByBarcodeVariables>;

interface GetAssetRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAssetVariables): QueryRef<GetAssetData, GetAssetVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAssetVariables): QueryRef<GetAssetData, GetAssetVariables>;
  operationName: string;
}
export const getAssetRef: GetAssetRef;

export function getAsset(vars: GetAssetVariables, options?: ExecuteQueryOptions): QueryPromise<GetAssetData, GetAssetVariables>;
export function getAsset(dc: DataConnect, vars: GetAssetVariables, options?: ExecuteQueryOptions): QueryPromise<GetAssetData, GetAssetVariables>;

interface CreateAssetRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAssetVariables): MutationRef<CreateAssetData, CreateAssetVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateAssetVariables): MutationRef<CreateAssetData, CreateAssetVariables>;
  operationName: string;
}
export const createAssetRef: CreateAssetRef;

export function createAsset(vars: CreateAssetVariables): MutationPromise<CreateAssetData, CreateAssetVariables>;
export function createAsset(dc: DataConnect, vars: CreateAssetVariables): MutationPromise<CreateAssetData, CreateAssetVariables>;

interface UpdateAssetRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAssetVariables): MutationRef<UpdateAssetData, UpdateAssetVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateAssetVariables): MutationRef<UpdateAssetData, UpdateAssetVariables>;
  operationName: string;
}
export const updateAssetRef: UpdateAssetRef;

export function updateAsset(vars: UpdateAssetVariables): MutationPromise<UpdateAssetData, UpdateAssetVariables>;
export function updateAsset(dc: DataConnect, vars: UpdateAssetVariables): MutationPromise<UpdateAssetData, UpdateAssetVariables>;

interface DeleteAssetRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAssetVariables): MutationRef<DeleteAssetData, DeleteAssetVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteAssetVariables): MutationRef<DeleteAssetData, DeleteAssetVariables>;
  operationName: string;
}
export const deleteAssetRef: DeleteAssetRef;

export function deleteAsset(vars: DeleteAssetVariables): MutationPromise<DeleteAssetData, DeleteAssetVariables>;
export function deleteAsset(dc: DataConnect, vars: DeleteAssetVariables): MutationPromise<DeleteAssetData, DeleteAssetVariables>;

interface CheckoutAssetRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CheckoutAssetVariables): MutationRef<CheckoutAssetData, CheckoutAssetVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CheckoutAssetVariables): MutationRef<CheckoutAssetData, CheckoutAssetVariables>;
  operationName: string;
}
export const checkoutAssetRef: CheckoutAssetRef;

export function checkoutAsset(vars: CheckoutAssetVariables): MutationPromise<CheckoutAssetData, CheckoutAssetVariables>;
export function checkoutAsset(dc: DataConnect, vars: CheckoutAssetVariables): MutationPromise<CheckoutAssetData, CheckoutAssetVariables>;

interface ReturnAssetRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReturnAssetVariables): MutationRef<ReturnAssetData, ReturnAssetVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ReturnAssetVariables): MutationRef<ReturnAssetData, ReturnAssetVariables>;
  operationName: string;
}
export const returnAssetRef: ReturnAssetRef;

export function returnAsset(vars: ReturnAssetVariables): MutationPromise<ReturnAssetData, ReturnAssetVariables>;
export function returnAsset(dc: DataConnect, vars: ReturnAssetVariables): MutationPromise<ReturnAssetData, ReturnAssetVariables>;

interface UpdateAssetStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAssetStatusVariables): MutationRef<UpdateAssetStatusData, UpdateAssetStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateAssetStatusVariables): MutationRef<UpdateAssetStatusData, UpdateAssetStatusVariables>;
  operationName: string;
}
export const updateAssetStatusRef: UpdateAssetStatusRef;

export function updateAssetStatus(vars: UpdateAssetStatusVariables): MutationPromise<UpdateAssetStatusData, UpdateAssetStatusVariables>;
export function updateAssetStatus(dc: DataConnect, vars: UpdateAssetStatusVariables): MutationPromise<UpdateAssetStatusData, UpdateAssetStatusVariables>;

interface UpdateConsumableStockRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateConsumableStockVariables): MutationRef<UpdateConsumableStockData, UpdateConsumableStockVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateConsumableStockVariables): MutationRef<UpdateConsumableStockData, UpdateConsumableStockVariables>;
  operationName: string;
}
export const updateConsumableStockRef: UpdateConsumableStockRef;

export function updateConsumableStock(vars: UpdateConsumableStockVariables): MutationPromise<UpdateConsumableStockData, UpdateConsumableStockVariables>;
export function updateConsumableStock(dc: DataConnect, vars: UpdateConsumableStockVariables): MutationPromise<UpdateConsumableStockData, UpdateConsumableStockVariables>;

interface ListTransactionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTransactionsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListTransactionsData, undefined>;
  operationName: string;
}
export const listTransactionsRef: ListTransactionsRef;

export function listTransactions(options?: ExecuteQueryOptions): QueryPromise<ListTransactionsData, undefined>;
export function listTransactions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListTransactionsData, undefined>;

interface GetTransactionsByAssetRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTransactionsByAssetVariables): QueryRef<GetTransactionsByAssetData, GetTransactionsByAssetVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTransactionsByAssetVariables): QueryRef<GetTransactionsByAssetData, GetTransactionsByAssetVariables>;
  operationName: string;
}
export const getTransactionsByAssetRef: GetTransactionsByAssetRef;

export function getTransactionsByAsset(vars: GetTransactionsByAssetVariables, options?: ExecuteQueryOptions): QueryPromise<GetTransactionsByAssetData, GetTransactionsByAssetVariables>;
export function getTransactionsByAsset(dc: DataConnect, vars: GetTransactionsByAssetVariables, options?: ExecuteQueryOptions): QueryPromise<GetTransactionsByAssetData, GetTransactionsByAssetVariables>;

interface CreateTransactionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTransactionVariables): MutationRef<CreateTransactionData, CreateTransactionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateTransactionVariables): MutationRef<CreateTransactionData, CreateTransactionVariables>;
  operationName: string;
}
export const createTransactionRef: CreateTransactionRef;

export function createTransaction(vars: CreateTransactionVariables): MutationPromise<CreateTransactionData, CreateTransactionVariables>;
export function createTransaction(dc: DataConnect, vars: CreateTransactionVariables): MutationPromise<CreateTransactionData, CreateTransactionVariables>;

interface GetDashboardActivityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: GetDashboardActivityVariables): QueryRef<GetDashboardActivityData, GetDashboardActivityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: GetDashboardActivityVariables): QueryRef<GetDashboardActivityData, GetDashboardActivityVariables>;
  operationName: string;
}
export const getDashboardActivityRef: GetDashboardActivityRef;

export function getDashboardActivity(vars?: GetDashboardActivityVariables, options?: ExecuteQueryOptions): QueryPromise<GetDashboardActivityData, GetDashboardActivityVariables>;
export function getDashboardActivity(dc: DataConnect, vars?: GetDashboardActivityVariables, options?: ExecuteQueryOptions): QueryPromise<GetDashboardActivityData, GetDashboardActivityVariables>;

interface GetBarcodeSequenceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetBarcodeSequenceVariables): QueryRef<GetBarcodeSequenceData, GetBarcodeSequenceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetBarcodeSequenceVariables): QueryRef<GetBarcodeSequenceData, GetBarcodeSequenceVariables>;
  operationName: string;
}
export const getBarcodeSequenceRef: GetBarcodeSequenceRef;

export function getBarcodeSequence(vars: GetBarcodeSequenceVariables, options?: ExecuteQueryOptions): QueryPromise<GetBarcodeSequenceData, GetBarcodeSequenceVariables>;
export function getBarcodeSequence(dc: DataConnect, vars: GetBarcodeSequenceVariables, options?: ExecuteQueryOptions): QueryPromise<GetBarcodeSequenceData, GetBarcodeSequenceVariables>;

interface InsertBarcodeSequenceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertBarcodeSequenceVariables): MutationRef<InsertBarcodeSequenceData, InsertBarcodeSequenceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: InsertBarcodeSequenceVariables): MutationRef<InsertBarcodeSequenceData, InsertBarcodeSequenceVariables>;
  operationName: string;
}
export const insertBarcodeSequenceRef: InsertBarcodeSequenceRef;

export function insertBarcodeSequence(vars: InsertBarcodeSequenceVariables): MutationPromise<InsertBarcodeSequenceData, InsertBarcodeSequenceVariables>;
export function insertBarcodeSequence(dc: DataConnect, vars: InsertBarcodeSequenceVariables): MutationPromise<InsertBarcodeSequenceData, InsertBarcodeSequenceVariables>;

interface UpdateBarcodeSequenceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateBarcodeSequenceVariables): MutationRef<UpdateBarcodeSequenceData, UpdateBarcodeSequenceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateBarcodeSequenceVariables): MutationRef<UpdateBarcodeSequenceData, UpdateBarcodeSequenceVariables>;
  operationName: string;
}
export const updateBarcodeSequenceRef: UpdateBarcodeSequenceRef;

export function updateBarcodeSequence(vars: UpdateBarcodeSequenceVariables): MutationPromise<UpdateBarcodeSequenceData, UpdateBarcodeSequenceVariables>;
export function updateBarcodeSequence(dc: DataConnect, vars: UpdateBarcodeSequenceVariables): MutationPromise<UpdateBarcodeSequenceData, UpdateBarcodeSequenceVariables>;

interface ListUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
  operationName: string;
}
export const listUsersRef: ListUsersRef;

export function listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;
export function listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface GetLaboranListRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetLaboranListData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetLaboranListData, undefined>;
  operationName: string;
}
export const getLaboranListRef: GetLaboranListRef;

export function getLaboranList(options?: ExecuteQueryOptions): QueryPromise<GetLaboranListData, undefined>;
export function getLaboranList(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetLaboranListData, undefined>;

interface GetSettingsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSettingsVariables): QueryRef<GetSettingsData, GetSettingsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetSettingsVariables): QueryRef<GetSettingsData, GetSettingsVariables>;
  operationName: string;
}
export const getSettingsRef: GetSettingsRef;

export function getSettings(vars: GetSettingsVariables, options?: ExecuteQueryOptions): QueryPromise<GetSettingsData, GetSettingsVariables>;
export function getSettings(dc: DataConnect, vars: GetSettingsVariables, options?: ExecuteQueryOptions): QueryPromise<GetSettingsData, GetSettingsVariables>;

interface InsertSettingsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertSettingsVariables): MutationRef<InsertSettingsData, InsertSettingsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: InsertSettingsVariables): MutationRef<InsertSettingsData, InsertSettingsVariables>;
  operationName: string;
}
export const insertSettingsRef: InsertSettingsRef;

export function insertSettings(vars: InsertSettingsVariables): MutationPromise<InsertSettingsData, InsertSettingsVariables>;
export function insertSettings(dc: DataConnect, vars: InsertSettingsVariables): MutationPromise<InsertSettingsData, InsertSettingsVariables>;

interface UpdateSettingsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSettingsVariables): MutationRef<UpdateSettingsData, UpdateSettingsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateSettingsVariables): MutationRef<UpdateSettingsData, UpdateSettingsVariables>;
  operationName: string;
}
export const updateSettingsRef: UpdateSettingsRef;

export function updateSettings(vars: UpdateSettingsVariables): MutationPromise<UpdateSettingsData, UpdateSettingsVariables>;
export function updateSettings(dc: DataConnect, vars: UpdateSettingsVariables): MutationPromise<UpdateSettingsData, UpdateSettingsVariables>;

interface GetLowStockAssetsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: GetLowStockAssetsVariables): QueryRef<GetLowStockAssetsData, GetLowStockAssetsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: GetLowStockAssetsVariables): QueryRef<GetLowStockAssetsData, GetLowStockAssetsVariables>;
  operationName: string;
}
export const getLowStockAssetsRef: GetLowStockAssetsRef;

export function getLowStockAssets(vars?: GetLowStockAssetsVariables, options?: ExecuteQueryOptions): QueryPromise<GetLowStockAssetsData, GetLowStockAssetsVariables>;
export function getLowStockAssets(dc: DataConnect, vars?: GetLowStockAssetsVariables, options?: ExecuteQueryOptions): QueryPromise<GetLowStockAssetsData, GetLowStockAssetsVariables>;

interface GetOverdueLoansRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: GetOverdueLoansVariables): QueryRef<GetOverdueLoansData, GetOverdueLoansVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: GetOverdueLoansVariables): QueryRef<GetOverdueLoansData, GetOverdueLoansVariables>;
  operationName: string;
}
export const getOverdueLoansRef: GetOverdueLoansRef;

export function getOverdueLoans(vars?: GetOverdueLoansVariables, options?: ExecuteQueryOptions): QueryPromise<GetOverdueLoansData, GetOverdueLoansVariables>;
export function getOverdueLoans(dc: DataConnect, vars?: GetOverdueLoansVariables, options?: ExecuteQueryOptions): QueryPromise<GetOverdueLoansData, GetOverdueLoansVariables>;

