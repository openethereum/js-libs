

# Functions

<a id="peercount_"></a>

##  peerCount$

▸ **peerCount$**(api: *`any`*, frequency: *[FrequencyMap](_types_.md#frequencymap)*): [RpcObservable](../interfaces/_types_.rpcobservable.md)<`number`, `BigNumber`>

*Defined in [rpc/net/net.ts:21](https://github.com/paritytech/js-libs/blob/7df4531/packages/light.js/src/rpc/net/net.ts#L21)*

Get the amount of peers.

Calls `net_peerCount`

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| api | `any` |  The Api object used to create this [RpcObservable](../interfaces/_types_.rpcobservable.md). |
| frequency | [FrequencyMap](_types_.md#frequencymap) |  The FrequencyMap used to create this [RpcObservable](../interfaces/_types_.rpcobservable.md). |

**Returns:** [RpcObservable](../interfaces/_types_.rpcobservable.md)<`number`, `BigNumber`>
- An Observable containing the number.

___

