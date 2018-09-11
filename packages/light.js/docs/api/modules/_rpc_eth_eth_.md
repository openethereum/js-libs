

# Functions

<a id="accounts_"></a>

##  accounts$

▸ **accounts$**(_: *`any`*, frequency: *[FrequencyMap](_types_.md#frequencymap)*): [RpcObservable](../interfaces/_types_.rpcobservable.md)<`string`[], `string`[]>

*Defined in [rpc/eth/eth.ts:25](https://github.com/paritytech/js-libs/blob/7df4531/packages/light.js/src/rpc/eth/eth.ts#L25)*

Observable which contains the array of all addresses managed by the light client.

Calls eth_accounts.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| _ | `any` |
| frequency | [FrequencyMap](_types_.md#frequencymap) |  The FrequencyMap used to create this [RpcObservable](../interfaces/_types_.rpcobservable.md). |

**Returns:** [RpcObservable](../interfaces/_types_.rpcobservable.md)<`string`[], `string`[]>
- An Observable containing the list of public addresses.

___
<a id="balanceof_"></a>

##  balanceOf$

▸ **balanceOf$**(api: *`any`*, frequency: *[FrequencyMap](_types_.md#frequencymap)*): [RpcObservable](../interfaces/_types_.rpcobservable.md)<`any`, `BigNumber`>

*Defined in [rpc/eth/eth.ts:39](https://github.com/paritytech/js-libs/blob/7df4531/packages/light.js/src/rpc/eth/eth.ts#L39)*

Get the balance of a given account. Calls `eth_getBalance`.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| api | `any` |  The Api object used to create this [RpcObservable](../interfaces/_types_.rpcobservable.md). |
| frequency | [FrequencyMap](_types_.md#frequencymap) |  The FrequencyMap used to create this [RpcObservable](../interfaces/_types_.rpcobservable.md). |

**Returns:** [RpcObservable](../interfaces/_types_.rpcobservable.md)<`any`, `BigNumber`>
- An Observable containing the balance.

___
<a id="blocknumber_"></a>

##  blockNumber$

▸ **blockNumber$**(_: *`any`*, frequency: *[FrequencyMap](_types_.md#frequencymap)*): [RpcObservable](../interfaces/_types_.rpcobservable.md)<`BigNumber`, `BigNumber`>

*Defined in [rpc/eth/eth.ts:73](https://github.com/paritytech/js-libs/blob/7df4531/packages/light.js/src/rpc/eth/eth.ts#L73)*

Get the current block number.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| _ | `any` |
| frequency | [FrequencyMap](_types_.md#frequencymap) |  The FrequencyMap used to create this [RpcObservable](../interfaces/_types_.rpcobservable.md). |

**Returns:** [RpcObservable](../interfaces/_types_.rpcobservable.md)<`BigNumber`, `BigNumber`>
- An Observable containing the block height.

___
<a id="defaultaccount_"></a>

##  defaultAccount$

▸ **defaultAccount$**(api: *`any`*, frequency: *[FrequencyMap](_types_.md#frequencymap)*): [RpcObservable](../interfaces/_types_.rpcobservable.md)<`string`[], `string`>

*Defined in [rpc/eth/eth.ts:58](https://github.com/paritytech/js-libs/blob/7df4531/packages/light.js/src/rpc/eth/eth.ts#L58)*

Get the default account managed by the light client.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| api | `any` |  The Api object used to create this [RpcObservable](../interfaces/_types_.rpcobservable.md). |
| frequency | [FrequencyMap](_types_.md#frequencymap) |  The FrequencyMap used to create this [RpcObservable](../interfaces/_types_.rpcobservable.md). |

**Returns:** [RpcObservable](../interfaces/_types_.rpcobservable.md)<`string`[], `string`>
- An Observable containing the public address
of the default account.

___
<a id="mybalance_"></a>

##  myBalance$

▸ **myBalance$**(api: *`any`*, frequency: *[FrequencyMap](_types_.md#frequencymap)*): [RpcObservable](../interfaces/_types_.rpcobservable.md)<`string`,  `BigNumber` &#124; `Symbol`>

*Defined in [rpc/eth/eth.ts:83](https://github.com/paritytech/js-libs/blob/7df4531/packages/light.js/src/rpc/eth/eth.ts#L83)*

Shorthand for fetching the current account's balance.

**Parameters:**

| Param | Type |
| ------ | ------ |
| api | `any` |
| frequency | [FrequencyMap](_types_.md#frequencymap) |

**Returns:** [RpcObservable](../interfaces/_types_.rpcobservable.md)<`string`,  `BigNumber` &#124; `Symbol`>

___
<a id="syncstatus_"></a>

##  syncStatus$

▸ **syncStatus$**(_: *`any`*, frequency: *[FrequencyMap](_types_.md#frequencymap)*): [RpcObservable](../interfaces/_types_.rpcobservable.md)< `false` &#124; `true` &#124; `object`,  `false` &#124; `true` &#124; `object`>

*Defined in [rpc/eth/eth.ts:106](https://github.com/paritytech/js-libs/blob/7df4531/packages/light.js/src/rpc/eth/eth.ts#L106)*

Get the syncStatus state.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| _ | `any` |
| frequency | [FrequencyMap](_types_.md#frequencymap) |  The FrequencyMap used to create this [RpcObservable](../interfaces/_types_.rpcobservable.md). |

**Returns:** [RpcObservable](../interfaces/_types_.rpcobservable.md)< `false` &#124; `true` &#124; `object`,  `false` &#124; `true` &#124; `object`>
- An Observable containing the syncing state object, or false.

___

