
@parity/electron
================

Control the Parity Ethereum client from electron.

[![Build Status](https://travis-ci.org/paritytech/js-libs.svg?branch=master)](https://travis-ci.org/paritytech/js-libs) [![npm (scoped)](https://img.shields.io/npm/v/@parity/electron.svg)](https://www.npmjs.com/package/@parity/electron) [![npm](https://img.shields.io/npm/dw/@parity/electron.svg)](https://www.npmjs.com/package/@parity/electron) [![dependencies Status](https://david-dm.org/paritytech/js-libs/status.svg?path=packages/electron)](https://david-dm.org/paritytech/js-libs?path=packages/electron)

Description
-----------

With this library, you will be able, from Electron, to:

*   download Parity Ethereum locally in Electron's user data folder.
*   run/stop/check if Parity Ethereum is running.
*   get a secure token from Parity Ethereum to access secure RPCs.

Getting Started
---------------

```bash
yarn add @parity/electron
```

Usage
-----

```javascript
import parityElectron, { isParityRunning } from '@parity/electron';

// Optional: override default options
parityElectron({
  logger: myCustomLoggerFunction // How do we want to log @parity/electron logs? Default is `debug`
})

isParityRunning()
  .then(() => ...);
```

## Index

### Interfaces

* [CheckClockSyncResult](interfaces/checkclocksyncresult.md)
* [FetchParityOptions](interfaces/fetchparityoptions.md)
* [IsParityRunningOptions](interfaces/isparityrunningoptions.md)
* [ParityElectronOptions](interfaces/parityelectronoptions.md)
* [RunParityOptions](interfaces/runparityoptions.md)

### Functions

* [checkClockSync](#checkclocksync)
* [defaultParityPath](#defaultparitypath)
* [deleteParity](#deleteparity)
* [fetchParity](#fetchparity)
* [getParityPath](#getparitypath)
* [isParityRunning](#isparityrunning)
* [killParity](#killparity)
* [parityElectron](#parityelectron)
* [runParity](#runparity)
* [signerNewToken](#signernewtoken)

---

## Functions

<a id="checkclocksync"></a>

###  checkClockSync

▸ **checkClockSync**(): `Promise`<[CheckClockSyncResult](interfaces/checkclocksyncresult.md)>

*Defined in [checkClockSync.ts:21](https://github.com/paritytech/js-libs/blob/f3c5e36/packages/electron/src/checkClockSync.ts#L21)*

Use SNTP to check if the local clock is synchronized; return the time drift.

**Returns:** `Promise`<[CheckClockSyncResult](interfaces/checkclocksyncresult.md)>

___
<a id="defaultparitypath"></a>

###  defaultParityPath

▸ **defaultParityPath**(): `Promise`<`string`>

*Defined in [getParityPath.ts:23](https://github.com/paritytech/js-libs/blob/f3c5e36/packages/electron/src/getParityPath.ts#L23)*

The default path to install parity, in case there's no other instance found on the machine.

**Returns:** `Promise`<`string`>

___
<a id="deleteparity"></a>

###  deleteParity

▸ **deleteParity**(): `Promise`<`void`>

*Defined in [fetchParity.ts:84](https://github.com/paritytech/js-libs/blob/f3c5e36/packages/electron/src/fetchParity.ts#L84)*

Remove parity binary or partial binary in the userData folder, if it exists.

**Returns:** `Promise`<`void`>

___
<a id="fetchparity"></a>

###  fetchParity

▸ **fetchParity**(mainWindow: *`BrowserWindow`*, options?: *[FetchParityOptions](interfaces/fetchparityoptions.md)*): `Promise`<`string`>

*Defined in [fetchParity.ts:106](https://github.com/paritytech/js-libs/blob/f3c5e36/packages/electron/src/fetchParity.ts#L106)*

Downloads Parity, saves it to Electron's `userData` folder, and returns the path to the downloaded binary once finished.

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| mainWindow | `BrowserWindow` | - |
| `Default value` options | [FetchParityOptions](interfaces/fetchparityoptions.md) |  {onProgress: () &#x3D;&gt; {/* Do nothing by defaut. */},parityChannel: &#x27;beta&#x27;} |

**Returns:** `Promise`<`string`>

___
<a id="getparitypath"></a>

###  getParityPath

▸ **getParityPath**(): `Promise`<`string`>

*Defined in [getParityPath.ts:119](https://github.com/paritytech/js-libs/blob/f3c5e36/packages/electron/src/getParityPath.ts#L119)*

Returns the path to Parity, or throws if parity is not found.

**Returns:** `Promise`<`string`>

___
<a id="isparityrunning"></a>

###  isParityRunning

▸ **isParityRunning**(options?: *[IsParityRunningOptions](interfaces/isparityrunningoptions.md)*): `Promise`<`boolean`>

*Defined in [isParityRunning.ts:20](https://github.com/paritytech/js-libs/blob/f3c5e36/packages/electron/src/isParityRunning.ts#L20)*

Detect if another instance of parity is already running or not. To achieve that, we just ping on the common hosts.

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| `Default value` options | [IsParityRunningOptions](interfaces/isparityrunningoptions.md) |  {wsInterface: &#x27;127.0.0.1&#x27;,wsPort: &#x27;8546&#x27;} |

**Returns:** `Promise`<`boolean`>

___
<a id="killparity"></a>

###  killParity

▸ **killParity**(): `Promise`<`void`>

*Defined in [runParity.ts:112](https://github.com/paritytech/js-libs/blob/f3c5e36/packages/electron/src/runParity.ts#L112)*

If a Parity process has been spawned with runParity, then it kills this process. However, there's no guarantee that Parity has been cleanly killed, and the Promise resolves instantly.

**Returns:** `Promise`<`void`>

___
<a id="parityelectron"></a>

###  parityElectron

▸ **parityElectron**(options?: *[ParityElectronOptions](interfaces/parityelectronoptions.md)*): `void`

*Defined in [index.ts:25](https://github.com/paritytech/js-libs/blob/f3c5e36/packages/electron/src/index.ts#L25)*

Set default options for @parity/electron. Can be skipped if we don't want to override default options.

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| `Default value` options | [ParityElectronOptions](interfaces/parityelectronoptions.md) |  { logger: debug } |

**Returns:** `void`

___
<a id="runparity"></a>

###  runParity

▸ **runParity**(options?: *[RunParityOptions](interfaces/runparityoptions.md)*): `Promise`<`void`>

*Defined in [runParity.ts:44](https://github.com/paritytech/js-libs/blob/f3c5e36/packages/electron/src/runParity.ts#L44)*

Spawns a child process to run Parity.

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| `Default value` options | [RunParityOptions](interfaces/runparityoptions.md) |  {flags: [],onParityError: () &#x3D;&gt; {/* Do nothing if error. */}} |

**Returns:** `Promise`<`void`>

___
<a id="signernewtoken"></a>

###  signerNewToken

▸ **signerNewToken**(): `Promise`<`string`>

*Defined in [signerNewToken.ts:16](https://github.com/paritytech/js-libs/blob/f3c5e36/packages/electron/src/signerNewToken.ts#L16)*

Runs parity signer new-token and resolves with a new secure token to be used in a dapp. Rejects if no token could be extracted.

**Returns:** `Promise`<`string`>

___

