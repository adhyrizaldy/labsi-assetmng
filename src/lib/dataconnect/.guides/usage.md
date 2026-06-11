# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { listLabs, getLab, createLab, updateLab, deleteLab, listAssets, getAssetsByLab, getAssetByBarcode, getAsset, createAsset } from '@labtrack/dataconnect';


// Operation ListLabs: 
const { data } = await ListLabs(dataConnect);

// Operation GetLab:  For variables, look at type GetLabVars in ../index.d.ts
const { data } = await GetLab(dataConnect, getLabVars);

// Operation CreateLab:  For variables, look at type CreateLabVars in ../index.d.ts
const { data } = await CreateLab(dataConnect, createLabVars);

// Operation UpdateLab:  For variables, look at type UpdateLabVars in ../index.d.ts
const { data } = await UpdateLab(dataConnect, updateLabVars);

// Operation DeleteLab:  For variables, look at type DeleteLabVars in ../index.d.ts
const { data } = await DeleteLab(dataConnect, deleteLabVars);

// Operation ListAssets: 
const { data } = await ListAssets(dataConnect);

// Operation GetAssetsByLab:  For variables, look at type GetAssetsByLabVars in ../index.d.ts
const { data } = await GetAssetsByLab(dataConnect, getAssetsByLabVars);

// Operation GetAssetByBarcode:  For variables, look at type GetAssetByBarcodeVars in ../index.d.ts
const { data } = await GetAssetByBarcode(dataConnect, getAssetByBarcodeVars);

// Operation GetAsset:  For variables, look at type GetAssetVars in ../index.d.ts
const { data } = await GetAsset(dataConnect, getAssetVars);

// Operation CreateAsset:  For variables, look at type CreateAssetVars in ../index.d.ts
const { data } = await CreateAsset(dataConnect, createAssetVars);


```