const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const AssetCategory = {
  tool: "tool",
  consumable: "consumable",
}
exports.AssetCategory = AssetCategory;

const AssetCondition = {
  baik: "baik",
  cukup_baik: "cukup_baik",
  rusak: "rusak",
}
exports.AssetCondition = AssetCondition;

const BarcodeSource = {
  PRODUCT: "PRODUCT",
  GENERATED: "GENERATED",
}
exports.BarcodeSource = BarcodeSource;

const TransactionMethod = {
  WEB_SCAN: "WEB_SCAN",
  TELEGRAM: "TELEGRAM",
  MANUAL: "MANUAL",
}
exports.TransactionMethod = TransactionMethod;

const TransactionType = {
  STOCK_IN: "STOCK_IN",
  STOCK_OUT: "STOCK_OUT",
  RETURN: "RETURN",
  TRANSFER: "TRANSFER",
}
exports.TransactionType = TransactionType;

const UserRole = {
  kepalalab: "kepalalab",
  admin: "admin",
  laboran: "laboran",
}
exports.UserRole = UserRole;

const connectorConfig = {
  connector: 'labtrack',
  service: 'labsi-assetsman-service',
  location: 'asia-southeast2'
};
exports.connectorConfig = connectorConfig;

const listLabsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListLabs');
}
listLabsRef.operationName = 'ListLabs';
exports.listLabsRef = listLabsRef;

exports.listLabs = function listLabs(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listLabsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getLabRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLab', inputVars);
}
getLabRef.operationName = 'GetLab';
exports.getLabRef = getLabRef;

exports.getLab = function getLab(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getLabRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createLabRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateLab', inputVars);
}
createLabRef.operationName = 'CreateLab';
exports.createLabRef = createLabRef;

exports.createLab = function createLab(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createLabRef(dcInstance, inputVars));
}
;

const updateLabRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateLab', inputVars);
}
updateLabRef.operationName = 'UpdateLab';
exports.updateLabRef = updateLabRef;

exports.updateLab = function updateLab(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateLabRef(dcInstance, inputVars));
}
;

const deleteLabRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteLab', inputVars);
}
deleteLabRef.operationName = 'DeleteLab';
exports.deleteLabRef = deleteLabRef;

exports.deleteLab = function deleteLab(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteLabRef(dcInstance, inputVars));
}
;

const listAssetsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAssets');
}
listAssetsRef.operationName = 'ListAssets';
exports.listAssetsRef = listAssetsRef;

exports.listAssets = function listAssets(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listAssetsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getAssetsByLabRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAssetsByLab', inputVars);
}
getAssetsByLabRef.operationName = 'GetAssetsByLab';
exports.getAssetsByLabRef = getAssetsByLabRef;

exports.getAssetsByLab = function getAssetsByLab(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getAssetsByLabRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getAssetByBarcodeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAssetByBarcode', inputVars);
}
getAssetByBarcodeRef.operationName = 'GetAssetByBarcode';
exports.getAssetByBarcodeRef = getAssetByBarcodeRef;

exports.getAssetByBarcode = function getAssetByBarcode(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getAssetByBarcodeRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getAssetRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAsset', inputVars);
}
getAssetRef.operationName = 'GetAsset';
exports.getAssetRef = getAssetRef;

exports.getAsset = function getAsset(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getAssetRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createAssetRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAsset', inputVars);
}
createAssetRef.operationName = 'CreateAsset';
exports.createAssetRef = createAssetRef;

exports.createAsset = function createAsset(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createAssetRef(dcInstance, inputVars));
}
;

const updateAssetRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAsset', inputVars);
}
updateAssetRef.operationName = 'UpdateAsset';
exports.updateAssetRef = updateAssetRef;

exports.updateAsset = function updateAsset(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateAssetRef(dcInstance, inputVars));
}
;

const deleteAssetRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteAsset', inputVars);
}
deleteAssetRef.operationName = 'DeleteAsset';
exports.deleteAssetRef = deleteAssetRef;

exports.deleteAsset = function deleteAsset(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteAssetRef(dcInstance, inputVars));
}
;

const checkoutAssetRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CheckoutAsset', inputVars);
}
checkoutAssetRef.operationName = 'CheckoutAsset';
exports.checkoutAssetRef = checkoutAssetRef;

exports.checkoutAsset = function checkoutAsset(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(checkoutAssetRef(dcInstance, inputVars));
}
;

const returnAssetRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReturnAsset', inputVars);
}
returnAssetRef.operationName = 'ReturnAsset';
exports.returnAssetRef = returnAssetRef;

exports.returnAsset = function returnAsset(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(returnAssetRef(dcInstance, inputVars));
}
;

const updateAssetStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAssetStatus', inputVars);
}
updateAssetStatusRef.operationName = 'UpdateAssetStatus';
exports.updateAssetStatusRef = updateAssetStatusRef;

exports.updateAssetStatus = function updateAssetStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateAssetStatusRef(dcInstance, inputVars));
}
;

const updateConsumableStockRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateConsumableStock', inputVars);
}
updateConsumableStockRef.operationName = 'UpdateConsumableStock';
exports.updateConsumableStockRef = updateConsumableStockRef;

exports.updateConsumableStock = function updateConsumableStock(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateConsumableStockRef(dcInstance, inputVars));
}
;

const listTransactionsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListTransactions');
}
listTransactionsRef.operationName = 'ListTransactions';
exports.listTransactionsRef = listTransactionsRef;

exports.listTransactions = function listTransactions(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listTransactionsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getTransactionsByAssetRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTransactionsByAsset', inputVars);
}
getTransactionsByAssetRef.operationName = 'GetTransactionsByAsset';
exports.getTransactionsByAssetRef = getTransactionsByAssetRef;

exports.getTransactionsByAsset = function getTransactionsByAsset(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getTransactionsByAssetRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createTransactionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateTransaction', inputVars);
}
createTransactionRef.operationName = 'CreateTransaction';
exports.createTransactionRef = createTransactionRef;

exports.createTransaction = function createTransaction(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createTransactionRef(dcInstance, inputVars));
}
;

const getDashboardActivityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDashboardActivity', inputVars);
}
getDashboardActivityRef.operationName = 'GetDashboardActivity';
exports.getDashboardActivityRef = getDashboardActivityRef;

exports.getDashboardActivity = function getDashboardActivity(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, false);
  return executeQuery(getDashboardActivityRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getBarcodeSequenceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetBarcodeSequence', inputVars);
}
getBarcodeSequenceRef.operationName = 'GetBarcodeSequence';
exports.getBarcodeSequenceRef = getBarcodeSequenceRef;

exports.getBarcodeSequence = function getBarcodeSequence(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getBarcodeSequenceRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const insertBarcodeSequenceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InsertBarcodeSequence', inputVars);
}
insertBarcodeSequenceRef.operationName = 'InsertBarcodeSequence';
exports.insertBarcodeSequenceRef = insertBarcodeSequenceRef;

exports.insertBarcodeSequence = function insertBarcodeSequence(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(insertBarcodeSequenceRef(dcInstance, inputVars));
}
;

const updateBarcodeSequenceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateBarcodeSequence', inputVars);
}
updateBarcodeSequenceRef.operationName = 'UpdateBarcodeSequence';
exports.updateBarcodeSequenceRef = updateBarcodeSequenceRef;

exports.updateBarcodeSequence = function updateBarcodeSequence(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateBarcodeSequenceRef(dcInstance, inputVars));
}
;

const listUsersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUsers');
}
listUsersRef.operationName = 'ListUsers';
exports.listUsersRef = listUsersRef;

exports.listUsers = function listUsers(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listUsersRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getLaboranListRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLaboranList');
}
getLaboranListRef.operationName = 'GetLaboranList';
exports.getLaboranListRef = getLaboranListRef;

exports.getLaboranList = function getLaboranList(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getLaboranListRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getSettingsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSettings', inputVars);
}
getSettingsRef.operationName = 'GetSettings';
exports.getSettingsRef = getSettingsRef;

exports.getSettings = function getSettings(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getSettingsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const insertSettingsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'InsertSettings', inputVars);
}
insertSettingsRef.operationName = 'InsertSettings';
exports.insertSettingsRef = insertSettingsRef;

exports.insertSettings = function insertSettings(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(insertSettingsRef(dcInstance, inputVars));
}
;

const updateSettingsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateSettings', inputVars);
}
updateSettingsRef.operationName = 'UpdateSettings';
exports.updateSettingsRef = updateSettingsRef;

exports.updateSettings = function updateSettings(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateSettingsRef(dcInstance, inputVars));
}
;

const getLowStockAssetsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetLowStockAssets', inputVars);
}
getLowStockAssetsRef.operationName = 'GetLowStockAssets';
exports.getLowStockAssetsRef = getLowStockAssetsRef;

exports.getLowStockAssets = function getLowStockAssets(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, false);
  return executeQuery(getLowStockAssetsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getOverdueLoansRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOverdueLoans', inputVars);
}
getOverdueLoansRef.operationName = 'GetOverdueLoans';
exports.getOverdueLoansRef = getOverdueLoansRef;

exports.getOverdueLoans = function getOverdueLoans(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, false);
  return executeQuery(getOverdueLoansRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;
