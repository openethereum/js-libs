

# Functions

<a id="accountsinfo_"></a>

##  accountsInfo$

▸ **accountsInfo$**(_: *`any`*, frequency: *[FrequencyMap](_types_.md#frequencymap)*): [RpcObservable](../interfaces/_types_.rpcobservable.md)<`object`, `object`>

*Defined in [rpc/parity/parity.ts:18](https://github.com/paritytech/js-libs/blob/7df4531/packages/light.js/src/rpc/parity/parity.ts#L18)*

Get accounts info. Calls `parity_accountsInfo`.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| _ | `any` |
| frequency | [FrequencyMap](_types_.md#frequencymap) |  The FrequencyMap used to create this [RpcObservable](../interfaces/_types_.rpcobservable.md). |

**Returns:** [RpcObservable](../interfaces/_types_.rpcobservable.md)<`object`, `object`>
- An Observable containing all info that can be
accessed by user concerning accounts.

___
<a id="chainname_"></a>

##  chainName$

▸ **chainName$**(api: *`any`*, frequency: *[FrequencyMap](_types_.md#frequencymap)*): [RpcObservable](../interfaces/_types_.rpcobservable.md)<`any`, `string`>

*Defined in [rpc/parity/parity.ts:33](https://github.com/paritytech/js-libs/blob/7df4531/packages/light.js/src/rpc/parity/parity.ts#L33)*

Get the name of the current chain. Calls `parity_netChain`.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| api | `any` |  The Api object used to create this [RpcObservable](../interfaces/_types_.rpcobservable.md). |
| frequency | [FrequencyMap](_types_.md#frequencymap) |  The FrequencyMap used to create this [RpcObservable](../interfaces/_types_.rpcobservable.md). |

**Returns:** [RpcObservable](../interfaces/_types_.rpcobservable.md)<`any`, `string`>
- An Observable containing the name of the
current chain.

___

