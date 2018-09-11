

# Functions

<a id="post_"></a>

##  post$

▸ **post$**(api: *`any`*, _: *[FrequencyMap](_types_.md#frequencymap)*): [RpcObservable](../interfaces/_types_.rpcobservable.md)<`any`, [TxStatus](../interfaces/_types_.txstatus.md)>

*Defined in [rpc/other/post.ts:22](https://github.com/paritytech/js-libs/blob/7df4531/packages/light.js/src/rpc/other/post.ts#L22)*

Post a transaction to the network.

Calls, in this order, `eth_estimateGas`, `parity_postTransaction`, `parity_checkRequest` and `eth_getTransactionReceipt` to get the status of the transaction.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| api | `any` |  The Api object used to create this [RpcObservable](../interfaces/_types_.rpcobservable.md). |
| _ | [FrequencyMap](_types_.md#frequencymap) |

**Returns:** [RpcObservable](../interfaces/_types_.rpcobservable.md)<`any`, [TxStatus](../interfaces/_types_.txstatus.md)>
- The status of the transaction.

___

