

# Functions

<a id="accounts_"></a>

##  accounts$

▸ **accounts$**(options?: *[RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md)*): `Observable`<`string`[]>

*Defined in [rpc/eth.ts:41](https://github.com/paritytech/js-libs/blob/6116e90/packages/light.js/src/rpc/eth.ts#L41)*

Observable which contains the array of all addresses managed by the light client.

Calls eth\_accounts.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` options | [RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md) |  Options to pass to [RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md). |

**Returns:** `Observable`<`string`[]>
- An Observable containing the list of public addresses.

___
<a id="balanceof_"></a>

##  balanceOf$

▸ **balanceOf$**(address: *[Address](_types_.md#address)*, options?: *[RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md)*): `Observable`<`BigNumber` | `Symbol`>

*Defined in [rpc/eth.ts:55](https://github.com/paritytech/js-libs/blob/6116e90/packages/light.js/src/rpc/eth.ts#L55)*

Get the balance of a given account. Calls `eth_getBalance`.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| address | [Address](_types_.md#address) |  The account address to query the balance. |
| `Optional` options | [RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md) |  Options to pass to [RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md). |

**Returns:** `Observable`<`BigNumber` | `Symbol`>
- An Observable containing the balance.

___
<a id="blocknumber_"></a>

##  blockNumber$

▸ **blockNumber$**(options?: *[RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md)*): `Observable`<`BigNumber`>

*Defined in [rpc/eth.ts:100](https://github.com/paritytech/js-libs/blob/6116e90/packages/light.js/src/rpc/eth.ts#L100)*

Get the current block number.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md) |

**Returns:** `Observable`<`BigNumber`>
- An Observable containing the block height.

___
<a id="chainid_"></a>

##  chainId$

▸ **chainId$**(options?: *[RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md)*): `Observable`<`BigNumber` | `Symbol`>

*Defined in [rpc/eth.ts:23](https://github.com/paritytech/js-libs/blob/6116e90/packages/light.js/src/rpc/eth.ts#L23)*

Observable containing the EIP155 chain ID used for transaction signing. Calls `eth_chainId`

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` options | [RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md) |  Options to pass to [RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md). |

**Returns:** `Observable`<`BigNumber` | `Symbol`>
- An Observable containing the chain ID.

___
<a id="defaultaccount_"></a>

##  defaultAccount$

▸ **defaultAccount$**(options?: *[RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md)*): `Observable`<`string`>

*Defined in [rpc/eth.ts:87](https://github.com/paritytech/js-libs/blob/6116e90/packages/light.js/src/rpc/eth.ts#L87)*

Get the default account managed by the light client.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` options | [RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md) |  Options to pass to [RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md). |

**Returns:** `Observable`<`string`>
- An Observable containing the public address
of the default account.

___
<a id="mybalance_"></a>

##  myBalance$

▸ **myBalance$**(options?: *[RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md)*): `Observable`<`BigNumber` | `Symbol`>

*Defined in [rpc/eth.ts:111](https://github.com/paritytech/js-libs/blob/6116e90/packages/light.js/src/rpc/eth.ts#L111)*

Shorthand for fetching the current account's balance.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md) |

**Returns:** `Observable`<`BigNumber` | `Symbol`>

___
<a id="syncstatus_"></a>

##  syncStatus$

▸ **syncStatus$**(options?: *[RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md)*): `Observable`<`false` | `true` | `object`>

*Defined in [rpc/eth.ts:131](https://github.com/paritytech/js-libs/blob/6116e90/packages/light.js/src/rpc/eth.ts#L131)*

Get the syncStatus state.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md) |

**Returns:** `Observable`<`false` | `true` | `object`>
- An Observable containing the syncing state object, or false.

___
<a id="transactioncountof_"></a>

##  transactionCountOf$

▸ **transactionCountOf$**(address: *[Address](_types_.md#address)*, options?: *[RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md)*): `Observable`<`BigNumber` | `Symbol`>

*Defined in [rpc/eth.ts:71](https://github.com/paritytech/js-libs/blob/6116e90/packages/light.js/src/rpc/eth.ts#L71)*

Get the transaction count of a given account. Calls `eth_getTransactionCount`

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| address | [Address](_types_.md#address) |  Address of the account whose transaction count we want to query. |
| `Optional` options | [RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md) |  Options to pass to [RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md). |

**Returns:** `Observable`<`BigNumber` | `Symbol`>
- An Observable containing the transaction count.

___

