# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `labtrack`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListLabs*](#listlabs)
  - [*GetLab*](#getlab)
  - [*ListAssets*](#listassets)
  - [*GetAssetsByLab*](#getassetsbylab)
  - [*GetAssetByBarcode*](#getassetbybarcode)
  - [*GetAsset*](#getasset)
  - [*ListTransactions*](#listtransactions)
  - [*GetTransactionsByAsset*](#gettransactionsbyasset)
  - [*GetDashboardActivity*](#getdashboardactivity)
  - [*GetBarcodeSequence*](#getbarcodesequence)
  - [*ListUsers*](#listusers)
  - [*GetLaboranList*](#getlaboranlist)
  - [*GetSettings*](#getsettings)
  - [*GetLowStockAssets*](#getlowstockassets)
  - [*GetOverdueLoans*](#getoverdueloans)
- [**Mutations**](#mutations)
  - [*CreateLab*](#createlab)
  - [*UpdateLab*](#updatelab)
  - [*DeleteLab*](#deletelab)
  - [*CreateAsset*](#createasset)
  - [*UpdateAsset*](#updateasset)
  - [*DeleteAsset*](#deleteasset)
  - [*CheckoutAsset*](#checkoutasset)
  - [*ReturnAsset*](#returnasset)
  - [*UpdateAssetStatus*](#updateassetstatus)
  - [*UpdateConsumableStock*](#updateconsumablestock)
  - [*CreateTransaction*](#createtransaction)
  - [*InsertBarcodeSequence*](#insertbarcodesequence)
  - [*UpdateBarcodeSequence*](#updatebarcodesequence)
  - [*InsertSettings*](#insertsettings)
  - [*UpdateSettings*](#updatesettings)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `labtrack`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@labtrack/dataconnect` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@labtrack/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@labtrack/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `labtrack` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListLabs
You can execute the `ListLabs` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listLabs(options?: ExecuteQueryOptions): QueryPromise<ListLabsData, undefined>;

interface ListLabsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListLabsData, undefined>;
}
export const listLabsRef: ListLabsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listLabs(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListLabsData, undefined>;

interface ListLabsRef {
  ...
  (dc: DataConnect): QueryRef<ListLabsData, undefined>;
}
export const listLabsRef: ListLabsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listLabsRef:
```typescript
const name = listLabsRef.operationName;
console.log(name);
```

### Variables
The `ListLabs` query has no variables.
### Return Type
Recall that executing the `ListLabs` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListLabsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListLabs`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listLabs } from '@labtrack/dataconnect';


// Call the `listLabs()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listLabs();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listLabs(dataConnect);

console.log(data.labs);

// Or, you can use the `Promise` API.
listLabs().then((response) => {
  const data = response.data;
  console.log(data.labs);
});
```

### Using `ListLabs`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listLabsRef } from '@labtrack/dataconnect';


// Call the `listLabsRef()` function to get a reference to the query.
const ref = listLabsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listLabsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.labs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.labs);
});
```

## GetLab
You can execute the `GetLab` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getLab(vars: GetLabVariables, options?: ExecuteQueryOptions): QueryPromise<GetLabData, GetLabVariables>;

interface GetLabRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetLabVariables): QueryRef<GetLabData, GetLabVariables>;
}
export const getLabRef: GetLabRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getLab(dc: DataConnect, vars: GetLabVariables, options?: ExecuteQueryOptions): QueryPromise<GetLabData, GetLabVariables>;

interface GetLabRef {
  ...
  (dc: DataConnect, vars: GetLabVariables): QueryRef<GetLabData, GetLabVariables>;
}
export const getLabRef: GetLabRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getLabRef:
```typescript
const name = getLabRef.operationName;
console.log(name);
```

### Variables
The `GetLab` query requires an argument of type `GetLabVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetLabVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetLab` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetLabData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetLab`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getLab, GetLabVariables } from '@labtrack/dataconnect';

// The `GetLab` query requires an argument of type `GetLabVariables`:
const getLabVars: GetLabVariables = {
  id: ..., 
};

// Call the `getLab()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getLab(getLabVars);
// Variables can be defined inline as well.
const { data } = await getLab({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getLab(dataConnect, getLabVars);

console.log(data.lab);

// Or, you can use the `Promise` API.
getLab(getLabVars).then((response) => {
  const data = response.data;
  console.log(data.lab);
});
```

### Using `GetLab`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getLabRef, GetLabVariables } from '@labtrack/dataconnect';

// The `GetLab` query requires an argument of type `GetLabVariables`:
const getLabVars: GetLabVariables = {
  id: ..., 
};

// Call the `getLabRef()` function to get a reference to the query.
const ref = getLabRef(getLabVars);
// Variables can be defined inline as well.
const ref = getLabRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getLabRef(dataConnect, getLabVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.lab);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.lab);
});
```

## ListAssets
You can execute the `ListAssets` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listAssets(options?: ExecuteQueryOptions): QueryPromise<ListAssetsData, undefined>;

interface ListAssetsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAssetsData, undefined>;
}
export const listAssetsRef: ListAssetsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAssets(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAssetsData, undefined>;

interface ListAssetsRef {
  ...
  (dc: DataConnect): QueryRef<ListAssetsData, undefined>;
}
export const listAssetsRef: ListAssetsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAssetsRef:
```typescript
const name = listAssetsRef.operationName;
console.log(name);
```

### Variables
The `ListAssets` query has no variables.
### Return Type
Recall that executing the `ListAssets` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAssetsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListAssets`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAssets } from '@labtrack/dataconnect';


// Call the `listAssets()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAssets();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAssets(dataConnect);

console.log(data.assets);

// Or, you can use the `Promise` API.
listAssets().then((response) => {
  const data = response.data;
  console.log(data.assets);
});
```

### Using `ListAssets`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAssetsRef } from '@labtrack/dataconnect';


// Call the `listAssetsRef()` function to get a reference to the query.
const ref = listAssetsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAssetsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.assets);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.assets);
});
```

## GetAssetsByLab
You can execute the `GetAssetsByLab` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getAssetsByLab(vars: GetAssetsByLabVariables, options?: ExecuteQueryOptions): QueryPromise<GetAssetsByLabData, GetAssetsByLabVariables>;

interface GetAssetsByLabRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAssetsByLabVariables): QueryRef<GetAssetsByLabData, GetAssetsByLabVariables>;
}
export const getAssetsByLabRef: GetAssetsByLabRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAssetsByLab(dc: DataConnect, vars: GetAssetsByLabVariables, options?: ExecuteQueryOptions): QueryPromise<GetAssetsByLabData, GetAssetsByLabVariables>;

interface GetAssetsByLabRef {
  ...
  (dc: DataConnect, vars: GetAssetsByLabVariables): QueryRef<GetAssetsByLabData, GetAssetsByLabVariables>;
}
export const getAssetsByLabRef: GetAssetsByLabRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAssetsByLabRef:
```typescript
const name = getAssetsByLabRef.operationName;
console.log(name);
```

### Variables
The `GetAssetsByLab` query requires an argument of type `GetAssetsByLabVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAssetsByLabVariables {
  labId: UUIDString;
}
```
### Return Type
Recall that executing the `GetAssetsByLab` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAssetsByLabData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetAssetsByLab`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAssetsByLab, GetAssetsByLabVariables } from '@labtrack/dataconnect';

// The `GetAssetsByLab` query requires an argument of type `GetAssetsByLabVariables`:
const getAssetsByLabVars: GetAssetsByLabVariables = {
  labId: ..., 
};

// Call the `getAssetsByLab()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAssetsByLab(getAssetsByLabVars);
// Variables can be defined inline as well.
const { data } = await getAssetsByLab({ labId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAssetsByLab(dataConnect, getAssetsByLabVars);

console.log(data.assets);

// Or, you can use the `Promise` API.
getAssetsByLab(getAssetsByLabVars).then((response) => {
  const data = response.data;
  console.log(data.assets);
});
```

### Using `GetAssetsByLab`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAssetsByLabRef, GetAssetsByLabVariables } from '@labtrack/dataconnect';

// The `GetAssetsByLab` query requires an argument of type `GetAssetsByLabVariables`:
const getAssetsByLabVars: GetAssetsByLabVariables = {
  labId: ..., 
};

// Call the `getAssetsByLabRef()` function to get a reference to the query.
const ref = getAssetsByLabRef(getAssetsByLabVars);
// Variables can be defined inline as well.
const ref = getAssetsByLabRef({ labId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAssetsByLabRef(dataConnect, getAssetsByLabVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.assets);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.assets);
});
```

## GetAssetByBarcode
You can execute the `GetAssetByBarcode` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getAssetByBarcode(vars: GetAssetByBarcodeVariables, options?: ExecuteQueryOptions): QueryPromise<GetAssetByBarcodeData, GetAssetByBarcodeVariables>;

interface GetAssetByBarcodeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAssetByBarcodeVariables): QueryRef<GetAssetByBarcodeData, GetAssetByBarcodeVariables>;
}
export const getAssetByBarcodeRef: GetAssetByBarcodeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAssetByBarcode(dc: DataConnect, vars: GetAssetByBarcodeVariables, options?: ExecuteQueryOptions): QueryPromise<GetAssetByBarcodeData, GetAssetByBarcodeVariables>;

interface GetAssetByBarcodeRef {
  ...
  (dc: DataConnect, vars: GetAssetByBarcodeVariables): QueryRef<GetAssetByBarcodeData, GetAssetByBarcodeVariables>;
}
export const getAssetByBarcodeRef: GetAssetByBarcodeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAssetByBarcodeRef:
```typescript
const name = getAssetByBarcodeRef.operationName;
console.log(name);
```

### Variables
The `GetAssetByBarcode` query requires an argument of type `GetAssetByBarcodeVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAssetByBarcodeVariables {
  barcode: string;
}
```
### Return Type
Recall that executing the `GetAssetByBarcode` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAssetByBarcodeData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetAssetByBarcode`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAssetByBarcode, GetAssetByBarcodeVariables } from '@labtrack/dataconnect';

// The `GetAssetByBarcode` query requires an argument of type `GetAssetByBarcodeVariables`:
const getAssetByBarcodeVars: GetAssetByBarcodeVariables = {
  barcode: ..., 
};

// Call the `getAssetByBarcode()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAssetByBarcode(getAssetByBarcodeVars);
// Variables can be defined inline as well.
const { data } = await getAssetByBarcode({ barcode: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAssetByBarcode(dataConnect, getAssetByBarcodeVars);

console.log(data.assets);

// Or, you can use the `Promise` API.
getAssetByBarcode(getAssetByBarcodeVars).then((response) => {
  const data = response.data;
  console.log(data.assets);
});
```

### Using `GetAssetByBarcode`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAssetByBarcodeRef, GetAssetByBarcodeVariables } from '@labtrack/dataconnect';

// The `GetAssetByBarcode` query requires an argument of type `GetAssetByBarcodeVariables`:
const getAssetByBarcodeVars: GetAssetByBarcodeVariables = {
  barcode: ..., 
};

// Call the `getAssetByBarcodeRef()` function to get a reference to the query.
const ref = getAssetByBarcodeRef(getAssetByBarcodeVars);
// Variables can be defined inline as well.
const ref = getAssetByBarcodeRef({ barcode: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAssetByBarcodeRef(dataConnect, getAssetByBarcodeVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.assets);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.assets);
});
```

## GetAsset
You can execute the `GetAsset` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getAsset(vars: GetAssetVariables, options?: ExecuteQueryOptions): QueryPromise<GetAssetData, GetAssetVariables>;

interface GetAssetRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAssetVariables): QueryRef<GetAssetData, GetAssetVariables>;
}
export const getAssetRef: GetAssetRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAsset(dc: DataConnect, vars: GetAssetVariables, options?: ExecuteQueryOptions): QueryPromise<GetAssetData, GetAssetVariables>;

interface GetAssetRef {
  ...
  (dc: DataConnect, vars: GetAssetVariables): QueryRef<GetAssetData, GetAssetVariables>;
}
export const getAssetRef: GetAssetRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAssetRef:
```typescript
const name = getAssetRef.operationName;
console.log(name);
```

### Variables
The `GetAsset` query requires an argument of type `GetAssetVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAssetVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetAsset` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAssetData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetAsset`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAsset, GetAssetVariables } from '@labtrack/dataconnect';

// The `GetAsset` query requires an argument of type `GetAssetVariables`:
const getAssetVars: GetAssetVariables = {
  id: ..., 
};

// Call the `getAsset()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAsset(getAssetVars);
// Variables can be defined inline as well.
const { data } = await getAsset({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAsset(dataConnect, getAssetVars);

console.log(data.asset);

// Or, you can use the `Promise` API.
getAsset(getAssetVars).then((response) => {
  const data = response.data;
  console.log(data.asset);
});
```

### Using `GetAsset`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAssetRef, GetAssetVariables } from '@labtrack/dataconnect';

// The `GetAsset` query requires an argument of type `GetAssetVariables`:
const getAssetVars: GetAssetVariables = {
  id: ..., 
};

// Call the `getAssetRef()` function to get a reference to the query.
const ref = getAssetRef(getAssetVars);
// Variables can be defined inline as well.
const ref = getAssetRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAssetRef(dataConnect, getAssetVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.asset);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.asset);
});
```

## ListTransactions
You can execute the `ListTransactions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listTransactions(options?: ExecuteQueryOptions): QueryPromise<ListTransactionsData, undefined>;

interface ListTransactionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTransactionsData, undefined>;
}
export const listTransactionsRef: ListTransactionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTransactions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListTransactionsData, undefined>;

interface ListTransactionsRef {
  ...
  (dc: DataConnect): QueryRef<ListTransactionsData, undefined>;
}
export const listTransactionsRef: ListTransactionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTransactionsRef:
```typescript
const name = listTransactionsRef.operationName;
console.log(name);
```

### Variables
The `ListTransactions` query has no variables.
### Return Type
Recall that executing the `ListTransactions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTransactionsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListTransactions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTransactions } from '@labtrack/dataconnect';


// Call the `listTransactions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTransactions();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTransactions(dataConnect);

console.log(data.transactions);

// Or, you can use the `Promise` API.
listTransactions().then((response) => {
  const data = response.data;
  console.log(data.transactions);
});
```

### Using `ListTransactions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTransactionsRef } from '@labtrack/dataconnect';


// Call the `listTransactionsRef()` function to get a reference to the query.
const ref = listTransactionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTransactionsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.transactions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.transactions);
});
```

## GetTransactionsByAsset
You can execute the `GetTransactionsByAsset` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getTransactionsByAsset(vars: GetTransactionsByAssetVariables, options?: ExecuteQueryOptions): QueryPromise<GetTransactionsByAssetData, GetTransactionsByAssetVariables>;

interface GetTransactionsByAssetRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTransactionsByAssetVariables): QueryRef<GetTransactionsByAssetData, GetTransactionsByAssetVariables>;
}
export const getTransactionsByAssetRef: GetTransactionsByAssetRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTransactionsByAsset(dc: DataConnect, vars: GetTransactionsByAssetVariables, options?: ExecuteQueryOptions): QueryPromise<GetTransactionsByAssetData, GetTransactionsByAssetVariables>;

interface GetTransactionsByAssetRef {
  ...
  (dc: DataConnect, vars: GetTransactionsByAssetVariables): QueryRef<GetTransactionsByAssetData, GetTransactionsByAssetVariables>;
}
export const getTransactionsByAssetRef: GetTransactionsByAssetRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTransactionsByAssetRef:
```typescript
const name = getTransactionsByAssetRef.operationName;
console.log(name);
```

### Variables
The `GetTransactionsByAsset` query requires an argument of type `GetTransactionsByAssetVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTransactionsByAssetVariables {
  assetId: UUIDString;
}
```
### Return Type
Recall that executing the `GetTransactionsByAsset` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTransactionsByAssetData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetTransactionsByAsset`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTransactionsByAsset, GetTransactionsByAssetVariables } from '@labtrack/dataconnect';

// The `GetTransactionsByAsset` query requires an argument of type `GetTransactionsByAssetVariables`:
const getTransactionsByAssetVars: GetTransactionsByAssetVariables = {
  assetId: ..., 
};

// Call the `getTransactionsByAsset()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTransactionsByAsset(getTransactionsByAssetVars);
// Variables can be defined inline as well.
const { data } = await getTransactionsByAsset({ assetId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTransactionsByAsset(dataConnect, getTransactionsByAssetVars);

console.log(data.transactions);

// Or, you can use the `Promise` API.
getTransactionsByAsset(getTransactionsByAssetVars).then((response) => {
  const data = response.data;
  console.log(data.transactions);
});
```

### Using `GetTransactionsByAsset`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTransactionsByAssetRef, GetTransactionsByAssetVariables } from '@labtrack/dataconnect';

// The `GetTransactionsByAsset` query requires an argument of type `GetTransactionsByAssetVariables`:
const getTransactionsByAssetVars: GetTransactionsByAssetVariables = {
  assetId: ..., 
};

// Call the `getTransactionsByAssetRef()` function to get a reference to the query.
const ref = getTransactionsByAssetRef(getTransactionsByAssetVars);
// Variables can be defined inline as well.
const ref = getTransactionsByAssetRef({ assetId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTransactionsByAssetRef(dataConnect, getTransactionsByAssetVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.transactions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.transactions);
});
```

## GetDashboardActivity
You can execute the `GetDashboardActivity` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getDashboardActivity(vars?: GetDashboardActivityVariables, options?: ExecuteQueryOptions): QueryPromise<GetDashboardActivityData, GetDashboardActivityVariables>;

interface GetDashboardActivityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: GetDashboardActivityVariables): QueryRef<GetDashboardActivityData, GetDashboardActivityVariables>;
}
export const getDashboardActivityRef: GetDashboardActivityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getDashboardActivity(dc: DataConnect, vars?: GetDashboardActivityVariables, options?: ExecuteQueryOptions): QueryPromise<GetDashboardActivityData, GetDashboardActivityVariables>;

interface GetDashboardActivityRef {
  ...
  (dc: DataConnect, vars?: GetDashboardActivityVariables): QueryRef<GetDashboardActivityData, GetDashboardActivityVariables>;
}
export const getDashboardActivityRef: GetDashboardActivityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getDashboardActivityRef:
```typescript
const name = getDashboardActivityRef.operationName;
console.log(name);
```

### Variables
The `GetDashboardActivity` query has an optional argument of type `GetDashboardActivityVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetDashboardActivityVariables {
  labId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `GetDashboardActivity` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetDashboardActivityData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetDashboardActivity`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getDashboardActivity, GetDashboardActivityVariables } from '@labtrack/dataconnect';

// The `GetDashboardActivity` query has an optional argument of type `GetDashboardActivityVariables`:
const getDashboardActivityVars: GetDashboardActivityVariables = {
  labId: ..., // optional
};

// Call the `getDashboardActivity()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getDashboardActivity(getDashboardActivityVars);
// Variables can be defined inline as well.
const { data } = await getDashboardActivity({ labId: ..., });
// Since all variables are optional for this query, you can omit the `GetDashboardActivityVariables` argument.
const { data } = await getDashboardActivity();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getDashboardActivity(dataConnect, getDashboardActivityVars);

console.log(data.transactions);

// Or, you can use the `Promise` API.
getDashboardActivity(getDashboardActivityVars).then((response) => {
  const data = response.data;
  console.log(data.transactions);
});
```

### Using `GetDashboardActivity`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getDashboardActivityRef, GetDashboardActivityVariables } from '@labtrack/dataconnect';

// The `GetDashboardActivity` query has an optional argument of type `GetDashboardActivityVariables`:
const getDashboardActivityVars: GetDashboardActivityVariables = {
  labId: ..., // optional
};

// Call the `getDashboardActivityRef()` function to get a reference to the query.
const ref = getDashboardActivityRef(getDashboardActivityVars);
// Variables can be defined inline as well.
const ref = getDashboardActivityRef({ labId: ..., });
// Since all variables are optional for this query, you can omit the `GetDashboardActivityVariables` argument.
const ref = getDashboardActivityRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getDashboardActivityRef(dataConnect, getDashboardActivityVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.transactions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.transactions);
});
```

## GetBarcodeSequence
You can execute the `GetBarcodeSequence` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getBarcodeSequence(vars: GetBarcodeSequenceVariables, options?: ExecuteQueryOptions): QueryPromise<GetBarcodeSequenceData, GetBarcodeSequenceVariables>;

interface GetBarcodeSequenceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetBarcodeSequenceVariables): QueryRef<GetBarcodeSequenceData, GetBarcodeSequenceVariables>;
}
export const getBarcodeSequenceRef: GetBarcodeSequenceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getBarcodeSequence(dc: DataConnect, vars: GetBarcodeSequenceVariables, options?: ExecuteQueryOptions): QueryPromise<GetBarcodeSequenceData, GetBarcodeSequenceVariables>;

interface GetBarcodeSequenceRef {
  ...
  (dc: DataConnect, vars: GetBarcodeSequenceVariables): QueryRef<GetBarcodeSequenceData, GetBarcodeSequenceVariables>;
}
export const getBarcodeSequenceRef: GetBarcodeSequenceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getBarcodeSequenceRef:
```typescript
const name = getBarcodeSequenceRef.operationName;
console.log(name);
```

### Variables
The `GetBarcodeSequence` query requires an argument of type `GetBarcodeSequenceVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetBarcodeSequenceVariables {
  labId: UUIDString;
}
```
### Return Type
Recall that executing the `GetBarcodeSequence` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetBarcodeSequenceData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetBarcodeSequenceData {
  barcodeSequences: ({
    lab: {
      id: UUIDString;
    } & Lab_Key;
    lastSequence: number;
  })[];
}
```
### Using `GetBarcodeSequence`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getBarcodeSequence, GetBarcodeSequenceVariables } from '@labtrack/dataconnect';

// The `GetBarcodeSequence` query requires an argument of type `GetBarcodeSequenceVariables`:
const getBarcodeSequenceVars: GetBarcodeSequenceVariables = {
  labId: ..., 
};

// Call the `getBarcodeSequence()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getBarcodeSequence(getBarcodeSequenceVars);
// Variables can be defined inline as well.
const { data } = await getBarcodeSequence({ labId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getBarcodeSequence(dataConnect, getBarcodeSequenceVars);

console.log(data.barcodeSequences);

// Or, you can use the `Promise` API.
getBarcodeSequence(getBarcodeSequenceVars).then((response) => {
  const data = response.data;
  console.log(data.barcodeSequences);
});
```

### Using `GetBarcodeSequence`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getBarcodeSequenceRef, GetBarcodeSequenceVariables } from '@labtrack/dataconnect';

// The `GetBarcodeSequence` query requires an argument of type `GetBarcodeSequenceVariables`:
const getBarcodeSequenceVars: GetBarcodeSequenceVariables = {
  labId: ..., 
};

// Call the `getBarcodeSequenceRef()` function to get a reference to the query.
const ref = getBarcodeSequenceRef(getBarcodeSequenceVars);
// Variables can be defined inline as well.
const ref = getBarcodeSequenceRef({ labId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getBarcodeSequenceRef(dataConnect, getBarcodeSequenceVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.barcodeSequences);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.barcodeSequences);
});
```

## ListUsers
You can execute the `ListUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUsersRef:
```typescript
const name = listUsersRef.operationName;
console.log(name);
```

### Variables
The `ListUsers` query has no variables.
### Return Type
Recall that executing the `ListUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUsersData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsers } from '@labtrack/dataconnect';


// Call the `listUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersRef } from '@labtrack/dataconnect';


// Call the `listUsersRef()` function to get a reference to the query.
const ref = listUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetLaboranList
You can execute the `GetLaboranList` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getLaboranList(options?: ExecuteQueryOptions): QueryPromise<GetLaboranListData, undefined>;

interface GetLaboranListRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetLaboranListData, undefined>;
}
export const getLaboranListRef: GetLaboranListRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getLaboranList(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetLaboranListData, undefined>;

interface GetLaboranListRef {
  ...
  (dc: DataConnect): QueryRef<GetLaboranListData, undefined>;
}
export const getLaboranListRef: GetLaboranListRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getLaboranListRef:
```typescript
const name = getLaboranListRef.operationName;
console.log(name);
```

### Variables
The `GetLaboranList` query has no variables.
### Return Type
Recall that executing the `GetLaboranList` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetLaboranListData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetLaboranListData {
  users: ({
    id: UUIDString;
    firebaseUid: string;
    displayName: string;
    roleTitle?: string | null;
  } & User_Key)[];
}
```
### Using `GetLaboranList`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getLaboranList } from '@labtrack/dataconnect';


// Call the `getLaboranList()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getLaboranList();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getLaboranList(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
getLaboranList().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `GetLaboranList`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getLaboranListRef } from '@labtrack/dataconnect';


// Call the `getLaboranListRef()` function to get a reference to the query.
const ref = getLaboranListRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getLaboranListRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetSettings
You can execute the `GetSettings` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getSettings(vars: GetSettingsVariables, options?: ExecuteQueryOptions): QueryPromise<GetSettingsData, GetSettingsVariables>;

interface GetSettingsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSettingsVariables): QueryRef<GetSettingsData, GetSettingsVariables>;
}
export const getSettingsRef: GetSettingsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getSettings(dc: DataConnect, vars: GetSettingsVariables, options?: ExecuteQueryOptions): QueryPromise<GetSettingsData, GetSettingsVariables>;

interface GetSettingsRef {
  ...
  (dc: DataConnect, vars: GetSettingsVariables): QueryRef<GetSettingsData, GetSettingsVariables>;
}
export const getSettingsRef: GetSettingsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getSettingsRef:
```typescript
const name = getSettingsRef.operationName;
console.log(name);
```

### Variables
The `GetSettings` query requires an argument of type `GetSettingsVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetSettingsVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetSettings` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetSettingsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetSettings`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getSettings, GetSettingsVariables } from '@labtrack/dataconnect';

// The `GetSettings` query requires an argument of type `GetSettingsVariables`:
const getSettingsVars: GetSettingsVariables = {
  id: ..., 
};

// Call the `getSettings()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getSettings(getSettingsVars);
// Variables can be defined inline as well.
const { data } = await getSettings({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getSettings(dataConnect, getSettingsVars);

console.log(data.settings);

// Or, you can use the `Promise` API.
getSettings(getSettingsVars).then((response) => {
  const data = response.data;
  console.log(data.settings);
});
```

### Using `GetSettings`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getSettingsRef, GetSettingsVariables } from '@labtrack/dataconnect';

// The `GetSettings` query requires an argument of type `GetSettingsVariables`:
const getSettingsVars: GetSettingsVariables = {
  id: ..., 
};

// Call the `getSettingsRef()` function to get a reference to the query.
const ref = getSettingsRef(getSettingsVars);
// Variables can be defined inline as well.
const ref = getSettingsRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getSettingsRef(dataConnect, getSettingsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.settings);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.settings);
});
```

## GetLowStockAssets
You can execute the `GetLowStockAssets` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getLowStockAssets(vars?: GetLowStockAssetsVariables, options?: ExecuteQueryOptions): QueryPromise<GetLowStockAssetsData, GetLowStockAssetsVariables>;

interface GetLowStockAssetsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: GetLowStockAssetsVariables): QueryRef<GetLowStockAssetsData, GetLowStockAssetsVariables>;
}
export const getLowStockAssetsRef: GetLowStockAssetsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getLowStockAssets(dc: DataConnect, vars?: GetLowStockAssetsVariables, options?: ExecuteQueryOptions): QueryPromise<GetLowStockAssetsData, GetLowStockAssetsVariables>;

interface GetLowStockAssetsRef {
  ...
  (dc: DataConnect, vars?: GetLowStockAssetsVariables): QueryRef<GetLowStockAssetsData, GetLowStockAssetsVariables>;
}
export const getLowStockAssetsRef: GetLowStockAssetsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getLowStockAssetsRef:
```typescript
const name = getLowStockAssetsRef.operationName;
console.log(name);
```

### Variables
The `GetLowStockAssets` query has an optional argument of type `GetLowStockAssetsVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetLowStockAssetsVariables {
  labId?: UUIDString | null;
  threshold?: number | null;
}
```
### Return Type
Recall that executing the `GetLowStockAssets` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetLowStockAssetsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetLowStockAssets`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getLowStockAssets, GetLowStockAssetsVariables } from '@labtrack/dataconnect';

// The `GetLowStockAssets` query has an optional argument of type `GetLowStockAssetsVariables`:
const getLowStockAssetsVars: GetLowStockAssetsVariables = {
  labId: ..., // optional
  threshold: ..., // optional
};

// Call the `getLowStockAssets()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getLowStockAssets(getLowStockAssetsVars);
// Variables can be defined inline as well.
const { data } = await getLowStockAssets({ labId: ..., threshold: ..., });
// Since all variables are optional for this query, you can omit the `GetLowStockAssetsVariables` argument.
const { data } = await getLowStockAssets();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getLowStockAssets(dataConnect, getLowStockAssetsVars);

console.log(data.assets);

// Or, you can use the `Promise` API.
getLowStockAssets(getLowStockAssetsVars).then((response) => {
  const data = response.data;
  console.log(data.assets);
});
```

### Using `GetLowStockAssets`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getLowStockAssetsRef, GetLowStockAssetsVariables } from '@labtrack/dataconnect';

// The `GetLowStockAssets` query has an optional argument of type `GetLowStockAssetsVariables`:
const getLowStockAssetsVars: GetLowStockAssetsVariables = {
  labId: ..., // optional
  threshold: ..., // optional
};

// Call the `getLowStockAssetsRef()` function to get a reference to the query.
const ref = getLowStockAssetsRef(getLowStockAssetsVars);
// Variables can be defined inline as well.
const ref = getLowStockAssetsRef({ labId: ..., threshold: ..., });
// Since all variables are optional for this query, you can omit the `GetLowStockAssetsVariables` argument.
const ref = getLowStockAssetsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getLowStockAssetsRef(dataConnect, getLowStockAssetsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.assets);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.assets);
});
```

## GetOverdueLoans
You can execute the `GetOverdueLoans` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getOverdueLoans(vars?: GetOverdueLoansVariables, options?: ExecuteQueryOptions): QueryPromise<GetOverdueLoansData, GetOverdueLoansVariables>;

interface GetOverdueLoansRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: GetOverdueLoansVariables): QueryRef<GetOverdueLoansData, GetOverdueLoansVariables>;
}
export const getOverdueLoansRef: GetOverdueLoansRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOverdueLoans(dc: DataConnect, vars?: GetOverdueLoansVariables, options?: ExecuteQueryOptions): QueryPromise<GetOverdueLoansData, GetOverdueLoansVariables>;

interface GetOverdueLoansRef {
  ...
  (dc: DataConnect, vars?: GetOverdueLoansVariables): QueryRef<GetOverdueLoansData, GetOverdueLoansVariables>;
}
export const getOverdueLoansRef: GetOverdueLoansRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOverdueLoansRef:
```typescript
const name = getOverdueLoansRef.operationName;
console.log(name);
```

### Variables
The `GetOverdueLoans` query has an optional argument of type `GetOverdueLoansVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOverdueLoansVariables {
  labId?: UUIDString | null;
}
```
### Return Type
Recall that executing the `GetOverdueLoans` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOverdueLoansData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetOverdueLoans`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOverdueLoans, GetOverdueLoansVariables } from '@labtrack/dataconnect';

// The `GetOverdueLoans` query has an optional argument of type `GetOverdueLoansVariables`:
const getOverdueLoansVars: GetOverdueLoansVariables = {
  labId: ..., // optional
};

// Call the `getOverdueLoans()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOverdueLoans(getOverdueLoansVars);
// Variables can be defined inline as well.
const { data } = await getOverdueLoans({ labId: ..., });
// Since all variables are optional for this query, you can omit the `GetOverdueLoansVariables` argument.
const { data } = await getOverdueLoans();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOverdueLoans(dataConnect, getOverdueLoansVars);

console.log(data.assets);

// Or, you can use the `Promise` API.
getOverdueLoans(getOverdueLoansVars).then((response) => {
  const data = response.data;
  console.log(data.assets);
});
```

### Using `GetOverdueLoans`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOverdueLoansRef, GetOverdueLoansVariables } from '@labtrack/dataconnect';

// The `GetOverdueLoans` query has an optional argument of type `GetOverdueLoansVariables`:
const getOverdueLoansVars: GetOverdueLoansVariables = {
  labId: ..., // optional
};

// Call the `getOverdueLoansRef()` function to get a reference to the query.
const ref = getOverdueLoansRef(getOverdueLoansVars);
// Variables can be defined inline as well.
const ref = getOverdueLoansRef({ labId: ..., });
// Since all variables are optional for this query, you can omit the `GetOverdueLoansVariables` argument.
const ref = getOverdueLoansRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOverdueLoansRef(dataConnect, getOverdueLoansVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.assets);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.assets);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `labtrack` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateLab
You can execute the `CreateLab` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createLab(vars: CreateLabVariables): MutationPromise<CreateLabData, CreateLabVariables>;

interface CreateLabRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateLabVariables): MutationRef<CreateLabData, CreateLabVariables>;
}
export const createLabRef: CreateLabRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createLab(dc: DataConnect, vars: CreateLabVariables): MutationPromise<CreateLabData, CreateLabVariables>;

interface CreateLabRef {
  ...
  (dc: DataConnect, vars: CreateLabVariables): MutationRef<CreateLabData, CreateLabVariables>;
}
export const createLabRef: CreateLabRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createLabRef:
```typescript
const name = createLabRef.operationName;
console.log(name);
```

### Variables
The `CreateLab` mutation requires an argument of type `CreateLabVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateLabVariables {
  name: string;
  code: string;
  description?: string | null;
  location?: string | null;
}
```
### Return Type
Recall that executing the `CreateLab` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateLabData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateLabData {
  lab_insert: Lab_Key;
}
```
### Using `CreateLab`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createLab, CreateLabVariables } from '@labtrack/dataconnect';

// The `CreateLab` mutation requires an argument of type `CreateLabVariables`:
const createLabVars: CreateLabVariables = {
  name: ..., 
  code: ..., 
  description: ..., // optional
  location: ..., // optional
};

// Call the `createLab()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createLab(createLabVars);
// Variables can be defined inline as well.
const { data } = await createLab({ name: ..., code: ..., description: ..., location: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createLab(dataConnect, createLabVars);

console.log(data.lab_insert);

// Or, you can use the `Promise` API.
createLab(createLabVars).then((response) => {
  const data = response.data;
  console.log(data.lab_insert);
});
```

### Using `CreateLab`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createLabRef, CreateLabVariables } from '@labtrack/dataconnect';

// The `CreateLab` mutation requires an argument of type `CreateLabVariables`:
const createLabVars: CreateLabVariables = {
  name: ..., 
  code: ..., 
  description: ..., // optional
  location: ..., // optional
};

// Call the `createLabRef()` function to get a reference to the mutation.
const ref = createLabRef(createLabVars);
// Variables can be defined inline as well.
const ref = createLabRef({ name: ..., code: ..., description: ..., location: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createLabRef(dataConnect, createLabVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.lab_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.lab_insert);
});
```

## UpdateLab
You can execute the `UpdateLab` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateLab(vars: UpdateLabVariables): MutationPromise<UpdateLabData, UpdateLabVariables>;

interface UpdateLabRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateLabVariables): MutationRef<UpdateLabData, UpdateLabVariables>;
}
export const updateLabRef: UpdateLabRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateLab(dc: DataConnect, vars: UpdateLabVariables): MutationPromise<UpdateLabData, UpdateLabVariables>;

interface UpdateLabRef {
  ...
  (dc: DataConnect, vars: UpdateLabVariables): MutationRef<UpdateLabData, UpdateLabVariables>;
}
export const updateLabRef: UpdateLabRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateLabRef:
```typescript
const name = updateLabRef.operationName;
console.log(name);
```

### Variables
The `UpdateLab` mutation requires an argument of type `UpdateLabVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateLabVariables {
  id: UUIDString;
  name?: string | null;
  code?: string | null;
  description?: string | null;
  location?: string | null;
  isActive?: boolean | null;
}
```
### Return Type
Recall that executing the `UpdateLab` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateLabData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateLabData {
  lab_update?: Lab_Key | null;
}
```
### Using `UpdateLab`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateLab, UpdateLabVariables } from '@labtrack/dataconnect';

// The `UpdateLab` mutation requires an argument of type `UpdateLabVariables`:
const updateLabVars: UpdateLabVariables = {
  id: ..., 
  name: ..., // optional
  code: ..., // optional
  description: ..., // optional
  location: ..., // optional
  isActive: ..., // optional
};

// Call the `updateLab()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateLab(updateLabVars);
// Variables can be defined inline as well.
const { data } = await updateLab({ id: ..., name: ..., code: ..., description: ..., location: ..., isActive: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateLab(dataConnect, updateLabVars);

console.log(data.lab_update);

// Or, you can use the `Promise` API.
updateLab(updateLabVars).then((response) => {
  const data = response.data;
  console.log(data.lab_update);
});
```

### Using `UpdateLab`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateLabRef, UpdateLabVariables } from '@labtrack/dataconnect';

// The `UpdateLab` mutation requires an argument of type `UpdateLabVariables`:
const updateLabVars: UpdateLabVariables = {
  id: ..., 
  name: ..., // optional
  code: ..., // optional
  description: ..., // optional
  location: ..., // optional
  isActive: ..., // optional
};

// Call the `updateLabRef()` function to get a reference to the mutation.
const ref = updateLabRef(updateLabVars);
// Variables can be defined inline as well.
const ref = updateLabRef({ id: ..., name: ..., code: ..., description: ..., location: ..., isActive: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateLabRef(dataConnect, updateLabVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.lab_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.lab_update);
});
```

## DeleteLab
You can execute the `DeleteLab` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
deleteLab(vars: DeleteLabVariables): MutationPromise<DeleteLabData, DeleteLabVariables>;

interface DeleteLabRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteLabVariables): MutationRef<DeleteLabData, DeleteLabVariables>;
}
export const deleteLabRef: DeleteLabRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteLab(dc: DataConnect, vars: DeleteLabVariables): MutationPromise<DeleteLabData, DeleteLabVariables>;

interface DeleteLabRef {
  ...
  (dc: DataConnect, vars: DeleteLabVariables): MutationRef<DeleteLabData, DeleteLabVariables>;
}
export const deleteLabRef: DeleteLabRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteLabRef:
```typescript
const name = deleteLabRef.operationName;
console.log(name);
```

### Variables
The `DeleteLab` mutation requires an argument of type `DeleteLabVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteLabVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteLab` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteLabData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteLabData {
  lab_delete?: Lab_Key | null;
}
```
### Using `DeleteLab`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteLab, DeleteLabVariables } from '@labtrack/dataconnect';

// The `DeleteLab` mutation requires an argument of type `DeleteLabVariables`:
const deleteLabVars: DeleteLabVariables = {
  id: ..., 
};

// Call the `deleteLab()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteLab(deleteLabVars);
// Variables can be defined inline as well.
const { data } = await deleteLab({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteLab(dataConnect, deleteLabVars);

console.log(data.lab_delete);

// Or, you can use the `Promise` API.
deleteLab(deleteLabVars).then((response) => {
  const data = response.data;
  console.log(data.lab_delete);
});
```

### Using `DeleteLab`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteLabRef, DeleteLabVariables } from '@labtrack/dataconnect';

// The `DeleteLab` mutation requires an argument of type `DeleteLabVariables`:
const deleteLabVars: DeleteLabVariables = {
  id: ..., 
};

// Call the `deleteLabRef()` function to get a reference to the mutation.
const ref = deleteLabRef(deleteLabVars);
// Variables can be defined inline as well.
const ref = deleteLabRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteLabRef(dataConnect, deleteLabVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.lab_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.lab_delete);
});
```

## CreateAsset
You can execute the `CreateAsset` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createAsset(vars: CreateAssetVariables): MutationPromise<CreateAssetData, CreateAssetVariables>;

interface CreateAssetRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAssetVariables): MutationRef<CreateAssetData, CreateAssetVariables>;
}
export const createAssetRef: CreateAssetRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAsset(dc: DataConnect, vars: CreateAssetVariables): MutationPromise<CreateAssetData, CreateAssetVariables>;

interface CreateAssetRef {
  ...
  (dc: DataConnect, vars: CreateAssetVariables): MutationRef<CreateAssetData, CreateAssetVariables>;
}
export const createAssetRef: CreateAssetRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAssetRef:
```typescript
const name = createAssetRef.operationName;
console.log(name);
```

### Variables
The `CreateAsset` mutation requires an argument of type `CreateAssetVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateAsset` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAssetData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAssetData {
  asset_insert: Asset_Key;
}
```
### Using `CreateAsset`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAsset, CreateAssetVariables } from '@labtrack/dataconnect';

// The `CreateAsset` mutation requires an argument of type `CreateAssetVariables`:
const createAssetVars: CreateAssetVariables = {
  barcode: ..., 
  barcodeSource: ..., 
  name: ..., 
  category: ..., 
  labId: ..., 
  brand: ..., // optional
  model: ..., // optional
  location: ..., // optional
  condition: ..., 
  imageUrl: ..., // optional
  purchaseDate: ..., // optional
  purchasePrice: ..., // optional
  quantity: ..., // optional
  unit: ..., // optional
  minStock: ..., // optional
  overdueHours: ..., // optional
  notes: ..., // optional
};

// Call the `createAsset()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAsset(createAssetVars);
// Variables can be defined inline as well.
const { data } = await createAsset({ barcode: ..., barcodeSource: ..., name: ..., category: ..., labId: ..., brand: ..., model: ..., location: ..., condition: ..., imageUrl: ..., purchaseDate: ..., purchasePrice: ..., quantity: ..., unit: ..., minStock: ..., overdueHours: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAsset(dataConnect, createAssetVars);

console.log(data.asset_insert);

// Or, you can use the `Promise` API.
createAsset(createAssetVars).then((response) => {
  const data = response.data;
  console.log(data.asset_insert);
});
```

### Using `CreateAsset`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAssetRef, CreateAssetVariables } from '@labtrack/dataconnect';

// The `CreateAsset` mutation requires an argument of type `CreateAssetVariables`:
const createAssetVars: CreateAssetVariables = {
  barcode: ..., 
  barcodeSource: ..., 
  name: ..., 
  category: ..., 
  labId: ..., 
  brand: ..., // optional
  model: ..., // optional
  location: ..., // optional
  condition: ..., 
  imageUrl: ..., // optional
  purchaseDate: ..., // optional
  purchasePrice: ..., // optional
  quantity: ..., // optional
  unit: ..., // optional
  minStock: ..., // optional
  overdueHours: ..., // optional
  notes: ..., // optional
};

// Call the `createAssetRef()` function to get a reference to the mutation.
const ref = createAssetRef(createAssetVars);
// Variables can be defined inline as well.
const ref = createAssetRef({ barcode: ..., barcodeSource: ..., name: ..., category: ..., labId: ..., brand: ..., model: ..., location: ..., condition: ..., imageUrl: ..., purchaseDate: ..., purchasePrice: ..., quantity: ..., unit: ..., minStock: ..., overdueHours: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAssetRef(dataConnect, createAssetVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.asset_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.asset_insert);
});
```

## UpdateAsset
You can execute the `UpdateAsset` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateAsset(vars: UpdateAssetVariables): MutationPromise<UpdateAssetData, UpdateAssetVariables>;

interface UpdateAssetRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAssetVariables): MutationRef<UpdateAssetData, UpdateAssetVariables>;
}
export const updateAssetRef: UpdateAssetRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateAsset(dc: DataConnect, vars: UpdateAssetVariables): MutationPromise<UpdateAssetData, UpdateAssetVariables>;

interface UpdateAssetRef {
  ...
  (dc: DataConnect, vars: UpdateAssetVariables): MutationRef<UpdateAssetData, UpdateAssetVariables>;
}
export const updateAssetRef: UpdateAssetRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateAssetRef:
```typescript
const name = updateAssetRef.operationName;
console.log(name);
```

### Variables
The `UpdateAsset` mutation requires an argument of type `UpdateAssetVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpdateAsset` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateAssetData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateAssetData {
  asset_update?: Asset_Key | null;
}
```
### Using `UpdateAsset`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateAsset, UpdateAssetVariables } from '@labtrack/dataconnect';

// The `UpdateAsset` mutation requires an argument of type `UpdateAssetVariables`:
const updateAssetVars: UpdateAssetVariables = {
  id: ..., 
  name: ..., // optional
  brand: ..., // optional
  model: ..., // optional
  location: ..., // optional
  condition: ..., // optional
  imageUrl: ..., // optional
  purchaseDate: ..., // optional
  purchasePrice: ..., // optional
  quantity: ..., // optional
  unit: ..., // optional
  minStock: ..., // optional
  overdueHours: ..., // optional
  notes: ..., // optional
};

// Call the `updateAsset()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateAsset(updateAssetVars);
// Variables can be defined inline as well.
const { data } = await updateAsset({ id: ..., name: ..., brand: ..., model: ..., location: ..., condition: ..., imageUrl: ..., purchaseDate: ..., purchasePrice: ..., quantity: ..., unit: ..., minStock: ..., overdueHours: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateAsset(dataConnect, updateAssetVars);

console.log(data.asset_update);

// Or, you can use the `Promise` API.
updateAsset(updateAssetVars).then((response) => {
  const data = response.data;
  console.log(data.asset_update);
});
```

### Using `UpdateAsset`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateAssetRef, UpdateAssetVariables } from '@labtrack/dataconnect';

// The `UpdateAsset` mutation requires an argument of type `UpdateAssetVariables`:
const updateAssetVars: UpdateAssetVariables = {
  id: ..., 
  name: ..., // optional
  brand: ..., // optional
  model: ..., // optional
  location: ..., // optional
  condition: ..., // optional
  imageUrl: ..., // optional
  purchaseDate: ..., // optional
  purchasePrice: ..., // optional
  quantity: ..., // optional
  unit: ..., // optional
  minStock: ..., // optional
  overdueHours: ..., // optional
  notes: ..., // optional
};

// Call the `updateAssetRef()` function to get a reference to the mutation.
const ref = updateAssetRef(updateAssetVars);
// Variables can be defined inline as well.
const ref = updateAssetRef({ id: ..., name: ..., brand: ..., model: ..., location: ..., condition: ..., imageUrl: ..., purchaseDate: ..., purchasePrice: ..., quantity: ..., unit: ..., minStock: ..., overdueHours: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateAssetRef(dataConnect, updateAssetVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.asset_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.asset_update);
});
```

## DeleteAsset
You can execute the `DeleteAsset` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
deleteAsset(vars: DeleteAssetVariables): MutationPromise<DeleteAssetData, DeleteAssetVariables>;

interface DeleteAssetRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAssetVariables): MutationRef<DeleteAssetData, DeleteAssetVariables>;
}
export const deleteAssetRef: DeleteAssetRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteAsset(dc: DataConnect, vars: DeleteAssetVariables): MutationPromise<DeleteAssetData, DeleteAssetVariables>;

interface DeleteAssetRef {
  ...
  (dc: DataConnect, vars: DeleteAssetVariables): MutationRef<DeleteAssetData, DeleteAssetVariables>;
}
export const deleteAssetRef: DeleteAssetRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteAssetRef:
```typescript
const name = deleteAssetRef.operationName;
console.log(name);
```

### Variables
The `DeleteAsset` mutation requires an argument of type `DeleteAssetVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteAssetVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteAsset` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteAssetData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteAssetData {
  asset_delete?: Asset_Key | null;
}
```
### Using `DeleteAsset`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteAsset, DeleteAssetVariables } from '@labtrack/dataconnect';

// The `DeleteAsset` mutation requires an argument of type `DeleteAssetVariables`:
const deleteAssetVars: DeleteAssetVariables = {
  id: ..., 
};

// Call the `deleteAsset()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteAsset(deleteAssetVars);
// Variables can be defined inline as well.
const { data } = await deleteAsset({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteAsset(dataConnect, deleteAssetVars);

console.log(data.asset_delete);

// Or, you can use the `Promise` API.
deleteAsset(deleteAssetVars).then((response) => {
  const data = response.data;
  console.log(data.asset_delete);
});
```

### Using `DeleteAsset`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteAssetRef, DeleteAssetVariables } from '@labtrack/dataconnect';

// The `DeleteAsset` mutation requires an argument of type `DeleteAssetVariables`:
const deleteAssetVars: DeleteAssetVariables = {
  id: ..., 
};

// Call the `deleteAssetRef()` function to get a reference to the mutation.
const ref = deleteAssetRef(deleteAssetVars);
// Variables can be defined inline as well.
const ref = deleteAssetRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteAssetRef(dataConnect, deleteAssetVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.asset_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.asset_delete);
});
```

## CheckoutAsset
You can execute the `CheckoutAsset` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
checkoutAsset(vars: CheckoutAssetVariables): MutationPromise<CheckoutAssetData, CheckoutAssetVariables>;

interface CheckoutAssetRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CheckoutAssetVariables): MutationRef<CheckoutAssetData, CheckoutAssetVariables>;
}
export const checkoutAssetRef: CheckoutAssetRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
checkoutAsset(dc: DataConnect, vars: CheckoutAssetVariables): MutationPromise<CheckoutAssetData, CheckoutAssetVariables>;

interface CheckoutAssetRef {
  ...
  (dc: DataConnect, vars: CheckoutAssetVariables): MutationRef<CheckoutAssetData, CheckoutAssetVariables>;
}
export const checkoutAssetRef: CheckoutAssetRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the checkoutAssetRef:
```typescript
const name = checkoutAssetRef.operationName;
console.log(name);
```

### Variables
The `CheckoutAsset` mutation requires an argument of type `CheckoutAssetVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CheckoutAssetVariables {
  id: UUIDString;
  borrowerId: UUIDString;
  checkoutAt: TimestampString;
  status: string;
}
```
### Return Type
Recall that executing the `CheckoutAsset` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CheckoutAssetData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CheckoutAssetData {
  asset_update?: Asset_Key | null;
}
```
### Using `CheckoutAsset`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, checkoutAsset, CheckoutAssetVariables } from '@labtrack/dataconnect';

// The `CheckoutAsset` mutation requires an argument of type `CheckoutAssetVariables`:
const checkoutAssetVars: CheckoutAssetVariables = {
  id: ..., 
  borrowerId: ..., 
  checkoutAt: ..., 
  status: ..., 
};

// Call the `checkoutAsset()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await checkoutAsset(checkoutAssetVars);
// Variables can be defined inline as well.
const { data } = await checkoutAsset({ id: ..., borrowerId: ..., checkoutAt: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await checkoutAsset(dataConnect, checkoutAssetVars);

console.log(data.asset_update);

// Or, you can use the `Promise` API.
checkoutAsset(checkoutAssetVars).then((response) => {
  const data = response.data;
  console.log(data.asset_update);
});
```

### Using `CheckoutAsset`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, checkoutAssetRef, CheckoutAssetVariables } from '@labtrack/dataconnect';

// The `CheckoutAsset` mutation requires an argument of type `CheckoutAssetVariables`:
const checkoutAssetVars: CheckoutAssetVariables = {
  id: ..., 
  borrowerId: ..., 
  checkoutAt: ..., 
  status: ..., 
};

// Call the `checkoutAssetRef()` function to get a reference to the mutation.
const ref = checkoutAssetRef(checkoutAssetVars);
// Variables can be defined inline as well.
const ref = checkoutAssetRef({ id: ..., borrowerId: ..., checkoutAt: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = checkoutAssetRef(dataConnect, checkoutAssetVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.asset_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.asset_update);
});
```

## ReturnAsset
You can execute the `ReturnAsset` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
returnAsset(vars: ReturnAssetVariables): MutationPromise<ReturnAssetData, ReturnAssetVariables>;

interface ReturnAssetRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReturnAssetVariables): MutationRef<ReturnAssetData, ReturnAssetVariables>;
}
export const returnAssetRef: ReturnAssetRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
returnAsset(dc: DataConnect, vars: ReturnAssetVariables): MutationPromise<ReturnAssetData, ReturnAssetVariables>;

interface ReturnAssetRef {
  ...
  (dc: DataConnect, vars: ReturnAssetVariables): MutationRef<ReturnAssetData, ReturnAssetVariables>;
}
export const returnAssetRef: ReturnAssetRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the returnAssetRef:
```typescript
const name = returnAssetRef.operationName;
console.log(name);
```

### Variables
The `ReturnAsset` mutation requires an argument of type `ReturnAssetVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ReturnAssetVariables {
  id: UUIDString;
  status: string;
}
```
### Return Type
Recall that executing the `ReturnAsset` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ReturnAssetData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ReturnAssetData {
  asset_update?: Asset_Key | null;
}
```
### Using `ReturnAsset`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, returnAsset, ReturnAssetVariables } from '@labtrack/dataconnect';

// The `ReturnAsset` mutation requires an argument of type `ReturnAssetVariables`:
const returnAssetVars: ReturnAssetVariables = {
  id: ..., 
  status: ..., 
};

// Call the `returnAsset()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await returnAsset(returnAssetVars);
// Variables can be defined inline as well.
const { data } = await returnAsset({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await returnAsset(dataConnect, returnAssetVars);

console.log(data.asset_update);

// Or, you can use the `Promise` API.
returnAsset(returnAssetVars).then((response) => {
  const data = response.data;
  console.log(data.asset_update);
});
```

### Using `ReturnAsset`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, returnAssetRef, ReturnAssetVariables } from '@labtrack/dataconnect';

// The `ReturnAsset` mutation requires an argument of type `ReturnAssetVariables`:
const returnAssetVars: ReturnAssetVariables = {
  id: ..., 
  status: ..., 
};

// Call the `returnAssetRef()` function to get a reference to the mutation.
const ref = returnAssetRef(returnAssetVars);
// Variables can be defined inline as well.
const ref = returnAssetRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = returnAssetRef(dataConnect, returnAssetVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.asset_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.asset_update);
});
```

## UpdateAssetStatus
You can execute the `UpdateAssetStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateAssetStatus(vars: UpdateAssetStatusVariables): MutationPromise<UpdateAssetStatusData, UpdateAssetStatusVariables>;

interface UpdateAssetStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAssetStatusVariables): MutationRef<UpdateAssetStatusData, UpdateAssetStatusVariables>;
}
export const updateAssetStatusRef: UpdateAssetStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateAssetStatus(dc: DataConnect, vars: UpdateAssetStatusVariables): MutationPromise<UpdateAssetStatusData, UpdateAssetStatusVariables>;

interface UpdateAssetStatusRef {
  ...
  (dc: DataConnect, vars: UpdateAssetStatusVariables): MutationRef<UpdateAssetStatusData, UpdateAssetStatusVariables>;
}
export const updateAssetStatusRef: UpdateAssetStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateAssetStatusRef:
```typescript
const name = updateAssetStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateAssetStatus` mutation requires an argument of type `UpdateAssetStatusVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateAssetStatusVariables {
  id: UUIDString;
  status: string;
}
```
### Return Type
Recall that executing the `UpdateAssetStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateAssetStatusData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateAssetStatusData {
  asset_update?: Asset_Key | null;
}
```
### Using `UpdateAssetStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateAssetStatus, UpdateAssetStatusVariables } from '@labtrack/dataconnect';

// The `UpdateAssetStatus` mutation requires an argument of type `UpdateAssetStatusVariables`:
const updateAssetStatusVars: UpdateAssetStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateAssetStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateAssetStatus(updateAssetStatusVars);
// Variables can be defined inline as well.
const { data } = await updateAssetStatus({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateAssetStatus(dataConnect, updateAssetStatusVars);

console.log(data.asset_update);

// Or, you can use the `Promise` API.
updateAssetStatus(updateAssetStatusVars).then((response) => {
  const data = response.data;
  console.log(data.asset_update);
});
```

### Using `UpdateAssetStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateAssetStatusRef, UpdateAssetStatusVariables } from '@labtrack/dataconnect';

// The `UpdateAssetStatus` mutation requires an argument of type `UpdateAssetStatusVariables`:
const updateAssetStatusVars: UpdateAssetStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateAssetStatusRef()` function to get a reference to the mutation.
const ref = updateAssetStatusRef(updateAssetStatusVars);
// Variables can be defined inline as well.
const ref = updateAssetStatusRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateAssetStatusRef(dataConnect, updateAssetStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.asset_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.asset_update);
});
```

## UpdateConsumableStock
You can execute the `UpdateConsumableStock` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateConsumableStock(vars: UpdateConsumableStockVariables): MutationPromise<UpdateConsumableStockData, UpdateConsumableStockVariables>;

interface UpdateConsumableStockRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateConsumableStockVariables): MutationRef<UpdateConsumableStockData, UpdateConsumableStockVariables>;
}
export const updateConsumableStockRef: UpdateConsumableStockRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateConsumableStock(dc: DataConnect, vars: UpdateConsumableStockVariables): MutationPromise<UpdateConsumableStockData, UpdateConsumableStockVariables>;

interface UpdateConsumableStockRef {
  ...
  (dc: DataConnect, vars: UpdateConsumableStockVariables): MutationRef<UpdateConsumableStockData, UpdateConsumableStockVariables>;
}
export const updateConsumableStockRef: UpdateConsumableStockRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateConsumableStockRef:
```typescript
const name = updateConsumableStockRef.operationName;
console.log(name);
```

### Variables
The `UpdateConsumableStock` mutation requires an argument of type `UpdateConsumableStockVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateConsumableStockVariables {
  id: UUIDString;
  quantity: number;
  status: string;
}
```
### Return Type
Recall that executing the `UpdateConsumableStock` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateConsumableStockData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateConsumableStockData {
  asset_update?: Asset_Key | null;
}
```
### Using `UpdateConsumableStock`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateConsumableStock, UpdateConsumableStockVariables } from '@labtrack/dataconnect';

// The `UpdateConsumableStock` mutation requires an argument of type `UpdateConsumableStockVariables`:
const updateConsumableStockVars: UpdateConsumableStockVariables = {
  id: ..., 
  quantity: ..., 
  status: ..., 
};

// Call the `updateConsumableStock()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateConsumableStock(updateConsumableStockVars);
// Variables can be defined inline as well.
const { data } = await updateConsumableStock({ id: ..., quantity: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateConsumableStock(dataConnect, updateConsumableStockVars);

console.log(data.asset_update);

// Or, you can use the `Promise` API.
updateConsumableStock(updateConsumableStockVars).then((response) => {
  const data = response.data;
  console.log(data.asset_update);
});
```

### Using `UpdateConsumableStock`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateConsumableStockRef, UpdateConsumableStockVariables } from '@labtrack/dataconnect';

// The `UpdateConsumableStock` mutation requires an argument of type `UpdateConsumableStockVariables`:
const updateConsumableStockVars: UpdateConsumableStockVariables = {
  id: ..., 
  quantity: ..., 
  status: ..., 
};

// Call the `updateConsumableStockRef()` function to get a reference to the mutation.
const ref = updateConsumableStockRef(updateConsumableStockVars);
// Variables can be defined inline as well.
const ref = updateConsumableStockRef({ id: ..., quantity: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateConsumableStockRef(dataConnect, updateConsumableStockVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.asset_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.asset_update);
});
```

## CreateTransaction
You can execute the `CreateTransaction` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createTransaction(vars: CreateTransactionVariables): MutationPromise<CreateTransactionData, CreateTransactionVariables>;

interface CreateTransactionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateTransactionVariables): MutationRef<CreateTransactionData, CreateTransactionVariables>;
}
export const createTransactionRef: CreateTransactionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTransaction(dc: DataConnect, vars: CreateTransactionVariables): MutationPromise<CreateTransactionData, CreateTransactionVariables>;

interface CreateTransactionRef {
  ...
  (dc: DataConnect, vars: CreateTransactionVariables): MutationRef<CreateTransactionData, CreateTransactionVariables>;
}
export const createTransactionRef: CreateTransactionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTransactionRef:
```typescript
const name = createTransactionRef.operationName;
console.log(name);
```

### Variables
The `CreateTransaction` mutation requires an argument of type `CreateTransactionVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateTransaction` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTransactionData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTransactionData {
  transaction_insert: Transaction_Key;
}
```
### Using `CreateTransaction`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTransaction, CreateTransactionVariables } from '@labtrack/dataconnect';

// The `CreateTransaction` mutation requires an argument of type `CreateTransactionVariables`:
const createTransactionVars: CreateTransactionVariables = {
  type: ..., 
  assetId: ..., 
  labId: ..., 
  performedById: ..., 
  borrowerId: ..., // optional
  quantity: ..., // optional
  unit: ..., // optional
  method: ..., 
  durationMinutes: ..., // optional
  notes: ..., // optional
};

// Call the `createTransaction()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTransaction(createTransactionVars);
// Variables can be defined inline as well.
const { data } = await createTransaction({ type: ..., assetId: ..., labId: ..., performedById: ..., borrowerId: ..., quantity: ..., unit: ..., method: ..., durationMinutes: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTransaction(dataConnect, createTransactionVars);

console.log(data.transaction_insert);

// Or, you can use the `Promise` API.
createTransaction(createTransactionVars).then((response) => {
  const data = response.data;
  console.log(data.transaction_insert);
});
```

### Using `CreateTransaction`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTransactionRef, CreateTransactionVariables } from '@labtrack/dataconnect';

// The `CreateTransaction` mutation requires an argument of type `CreateTransactionVariables`:
const createTransactionVars: CreateTransactionVariables = {
  type: ..., 
  assetId: ..., 
  labId: ..., 
  performedById: ..., 
  borrowerId: ..., // optional
  quantity: ..., // optional
  unit: ..., // optional
  method: ..., 
  durationMinutes: ..., // optional
  notes: ..., // optional
};

// Call the `createTransactionRef()` function to get a reference to the mutation.
const ref = createTransactionRef(createTransactionVars);
// Variables can be defined inline as well.
const ref = createTransactionRef({ type: ..., assetId: ..., labId: ..., performedById: ..., borrowerId: ..., quantity: ..., unit: ..., method: ..., durationMinutes: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTransactionRef(dataConnect, createTransactionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.transaction_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.transaction_insert);
});
```

## InsertBarcodeSequence
You can execute the `InsertBarcodeSequence` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
insertBarcodeSequence(vars: InsertBarcodeSequenceVariables): MutationPromise<InsertBarcodeSequenceData, InsertBarcodeSequenceVariables>;

interface InsertBarcodeSequenceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertBarcodeSequenceVariables): MutationRef<InsertBarcodeSequenceData, InsertBarcodeSequenceVariables>;
}
export const insertBarcodeSequenceRef: InsertBarcodeSequenceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
insertBarcodeSequence(dc: DataConnect, vars: InsertBarcodeSequenceVariables): MutationPromise<InsertBarcodeSequenceData, InsertBarcodeSequenceVariables>;

interface InsertBarcodeSequenceRef {
  ...
  (dc: DataConnect, vars: InsertBarcodeSequenceVariables): MutationRef<InsertBarcodeSequenceData, InsertBarcodeSequenceVariables>;
}
export const insertBarcodeSequenceRef: InsertBarcodeSequenceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the insertBarcodeSequenceRef:
```typescript
const name = insertBarcodeSequenceRef.operationName;
console.log(name);
```

### Variables
The `InsertBarcodeSequence` mutation requires an argument of type `InsertBarcodeSequenceVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface InsertBarcodeSequenceVariables {
  labId: UUIDString;
  lastSequence: number;
}
```
### Return Type
Recall that executing the `InsertBarcodeSequence` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InsertBarcodeSequenceData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InsertBarcodeSequenceData {
  barcodeSequence_insert: BarcodeSequence_Key;
}
```
### Using `InsertBarcodeSequence`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, insertBarcodeSequence, InsertBarcodeSequenceVariables } from '@labtrack/dataconnect';

// The `InsertBarcodeSequence` mutation requires an argument of type `InsertBarcodeSequenceVariables`:
const insertBarcodeSequenceVars: InsertBarcodeSequenceVariables = {
  labId: ..., 
  lastSequence: ..., 
};

// Call the `insertBarcodeSequence()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await insertBarcodeSequence(insertBarcodeSequenceVars);
// Variables can be defined inline as well.
const { data } = await insertBarcodeSequence({ labId: ..., lastSequence: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await insertBarcodeSequence(dataConnect, insertBarcodeSequenceVars);

console.log(data.barcodeSequence_insert);

// Or, you can use the `Promise` API.
insertBarcodeSequence(insertBarcodeSequenceVars).then((response) => {
  const data = response.data;
  console.log(data.barcodeSequence_insert);
});
```

### Using `InsertBarcodeSequence`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, insertBarcodeSequenceRef, InsertBarcodeSequenceVariables } from '@labtrack/dataconnect';

// The `InsertBarcodeSequence` mutation requires an argument of type `InsertBarcodeSequenceVariables`:
const insertBarcodeSequenceVars: InsertBarcodeSequenceVariables = {
  labId: ..., 
  lastSequence: ..., 
};

// Call the `insertBarcodeSequenceRef()` function to get a reference to the mutation.
const ref = insertBarcodeSequenceRef(insertBarcodeSequenceVars);
// Variables can be defined inline as well.
const ref = insertBarcodeSequenceRef({ labId: ..., lastSequence: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = insertBarcodeSequenceRef(dataConnect, insertBarcodeSequenceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.barcodeSequence_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.barcodeSequence_insert);
});
```

## UpdateBarcodeSequence
You can execute the `UpdateBarcodeSequence` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateBarcodeSequence(vars: UpdateBarcodeSequenceVariables): MutationPromise<UpdateBarcodeSequenceData, UpdateBarcodeSequenceVariables>;

interface UpdateBarcodeSequenceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateBarcodeSequenceVariables): MutationRef<UpdateBarcodeSequenceData, UpdateBarcodeSequenceVariables>;
}
export const updateBarcodeSequenceRef: UpdateBarcodeSequenceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateBarcodeSequence(dc: DataConnect, vars: UpdateBarcodeSequenceVariables): MutationPromise<UpdateBarcodeSequenceData, UpdateBarcodeSequenceVariables>;

interface UpdateBarcodeSequenceRef {
  ...
  (dc: DataConnect, vars: UpdateBarcodeSequenceVariables): MutationRef<UpdateBarcodeSequenceData, UpdateBarcodeSequenceVariables>;
}
export const updateBarcodeSequenceRef: UpdateBarcodeSequenceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateBarcodeSequenceRef:
```typescript
const name = updateBarcodeSequenceRef.operationName;
console.log(name);
```

### Variables
The `UpdateBarcodeSequence` mutation requires an argument of type `UpdateBarcodeSequenceVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateBarcodeSequenceVariables {
  id: UUIDString;
  lastSequence: number;
}
```
### Return Type
Recall that executing the `UpdateBarcodeSequence` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateBarcodeSequenceData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateBarcodeSequenceData {
  barcodeSequence_update?: BarcodeSequence_Key | null;
}
```
### Using `UpdateBarcodeSequence`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateBarcodeSequence, UpdateBarcodeSequenceVariables } from '@labtrack/dataconnect';

// The `UpdateBarcodeSequence` mutation requires an argument of type `UpdateBarcodeSequenceVariables`:
const updateBarcodeSequenceVars: UpdateBarcodeSequenceVariables = {
  id: ..., 
  lastSequence: ..., 
};

// Call the `updateBarcodeSequence()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateBarcodeSequence(updateBarcodeSequenceVars);
// Variables can be defined inline as well.
const { data } = await updateBarcodeSequence({ id: ..., lastSequence: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateBarcodeSequence(dataConnect, updateBarcodeSequenceVars);

console.log(data.barcodeSequence_update);

// Or, you can use the `Promise` API.
updateBarcodeSequence(updateBarcodeSequenceVars).then((response) => {
  const data = response.data;
  console.log(data.barcodeSequence_update);
});
```

### Using `UpdateBarcodeSequence`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateBarcodeSequenceRef, UpdateBarcodeSequenceVariables } from '@labtrack/dataconnect';

// The `UpdateBarcodeSequence` mutation requires an argument of type `UpdateBarcodeSequenceVariables`:
const updateBarcodeSequenceVars: UpdateBarcodeSequenceVariables = {
  id: ..., 
  lastSequence: ..., 
};

// Call the `updateBarcodeSequenceRef()` function to get a reference to the mutation.
const ref = updateBarcodeSequenceRef(updateBarcodeSequenceVars);
// Variables can be defined inline as well.
const ref = updateBarcodeSequenceRef({ id: ..., lastSequence: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateBarcodeSequenceRef(dataConnect, updateBarcodeSequenceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.barcodeSequence_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.barcodeSequence_update);
});
```

## InsertSettings
You can execute the `InsertSettings` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
insertSettings(vars: InsertSettingsVariables): MutationPromise<InsertSettingsData, InsertSettingsVariables>;

interface InsertSettingsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: InsertSettingsVariables): MutationRef<InsertSettingsData, InsertSettingsVariables>;
}
export const insertSettingsRef: InsertSettingsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
insertSettings(dc: DataConnect, vars: InsertSettingsVariables): MutationPromise<InsertSettingsData, InsertSettingsVariables>;

interface InsertSettingsRef {
  ...
  (dc: DataConnect, vars: InsertSettingsVariables): MutationRef<InsertSettingsData, InsertSettingsVariables>;
}
export const insertSettingsRef: InsertSettingsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the insertSettingsRef:
```typescript
const name = insertSettingsRef.operationName;
console.log(name);
```

### Variables
The `InsertSettings` mutation requires an argument of type `InsertSettingsVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface InsertSettingsVariables {
  labId: UUIDString;
  overdueDurationHours: number;
  lowStockAlertEnabled: boolean;
  telegramNotificationsEnabled: boolean;
}
```
### Return Type
Recall that executing the `InsertSettings` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `InsertSettingsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface InsertSettingsData {
  settings_insert: Settings_Key;
}
```
### Using `InsertSettings`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, insertSettings, InsertSettingsVariables } from '@labtrack/dataconnect';

// The `InsertSettings` mutation requires an argument of type `InsertSettingsVariables`:
const insertSettingsVars: InsertSettingsVariables = {
  labId: ..., 
  overdueDurationHours: ..., 
  lowStockAlertEnabled: ..., 
  telegramNotificationsEnabled: ..., 
};

// Call the `insertSettings()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await insertSettings(insertSettingsVars);
// Variables can be defined inline as well.
const { data } = await insertSettings({ labId: ..., overdueDurationHours: ..., lowStockAlertEnabled: ..., telegramNotificationsEnabled: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await insertSettings(dataConnect, insertSettingsVars);

console.log(data.settings_insert);

// Or, you can use the `Promise` API.
insertSettings(insertSettingsVars).then((response) => {
  const data = response.data;
  console.log(data.settings_insert);
});
```

### Using `InsertSettings`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, insertSettingsRef, InsertSettingsVariables } from '@labtrack/dataconnect';

// The `InsertSettings` mutation requires an argument of type `InsertSettingsVariables`:
const insertSettingsVars: InsertSettingsVariables = {
  labId: ..., 
  overdueDurationHours: ..., 
  lowStockAlertEnabled: ..., 
  telegramNotificationsEnabled: ..., 
};

// Call the `insertSettingsRef()` function to get a reference to the mutation.
const ref = insertSettingsRef(insertSettingsVars);
// Variables can be defined inline as well.
const ref = insertSettingsRef({ labId: ..., overdueDurationHours: ..., lowStockAlertEnabled: ..., telegramNotificationsEnabled: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = insertSettingsRef(dataConnect, insertSettingsVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.settings_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.settings_insert);
});
```

## UpdateSettings
You can execute the `UpdateSettings` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateSettings(vars: UpdateSettingsVariables): MutationPromise<UpdateSettingsData, UpdateSettingsVariables>;

interface UpdateSettingsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSettingsVariables): MutationRef<UpdateSettingsData, UpdateSettingsVariables>;
}
export const updateSettingsRef: UpdateSettingsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateSettings(dc: DataConnect, vars: UpdateSettingsVariables): MutationPromise<UpdateSettingsData, UpdateSettingsVariables>;

interface UpdateSettingsRef {
  ...
  (dc: DataConnect, vars: UpdateSettingsVariables): MutationRef<UpdateSettingsData, UpdateSettingsVariables>;
}
export const updateSettingsRef: UpdateSettingsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateSettingsRef:
```typescript
const name = updateSettingsRef.operationName;
console.log(name);
```

### Variables
The `UpdateSettings` mutation requires an argument of type `UpdateSettingsVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateSettingsVariables {
  id: UUIDString;
  overdueDurationHours: number;
  lowStockAlertEnabled: boolean;
  telegramNotificationsEnabled: boolean;
}
```
### Return Type
Recall that executing the `UpdateSettings` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateSettingsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateSettingsData {
  settings_update?: Settings_Key | null;
}
```
### Using `UpdateSettings`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateSettings, UpdateSettingsVariables } from '@labtrack/dataconnect';

// The `UpdateSettings` mutation requires an argument of type `UpdateSettingsVariables`:
const updateSettingsVars: UpdateSettingsVariables = {
  id: ..., 
  overdueDurationHours: ..., 
  lowStockAlertEnabled: ..., 
  telegramNotificationsEnabled: ..., 
};

// Call the `updateSettings()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateSettings(updateSettingsVars);
// Variables can be defined inline as well.
const { data } = await updateSettings({ id: ..., overdueDurationHours: ..., lowStockAlertEnabled: ..., telegramNotificationsEnabled: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateSettings(dataConnect, updateSettingsVars);

console.log(data.settings_update);

// Or, you can use the `Promise` API.
updateSettings(updateSettingsVars).then((response) => {
  const data = response.data;
  console.log(data.settings_update);
});
```

### Using `UpdateSettings`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateSettingsRef, UpdateSettingsVariables } from '@labtrack/dataconnect';

// The `UpdateSettings` mutation requires an argument of type `UpdateSettingsVariables`:
const updateSettingsVars: UpdateSettingsVariables = {
  id: ..., 
  overdueDurationHours: ..., 
  lowStockAlertEnabled: ..., 
  telegramNotificationsEnabled: ..., 
};

// Call the `updateSettingsRef()` function to get a reference to the mutation.
const ref = updateSettingsRef(updateSettingsVars);
// Variables can be defined inline as well.
const ref = updateSettingsRef({ id: ..., overdueDurationHours: ..., lowStockAlertEnabled: ..., telegramNotificationsEnabled: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateSettingsRef(dataConnect, updateSettingsVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.settings_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.settings_update);
});
```

