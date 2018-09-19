

# Functions

<a id="post_"></a>

##  post$

▸ **post$**(tx: *[Tx](_types_.md#tx)*, options?: *[PostOptions](../interfaces/_rpc_other_post_.postoptions.md)*): `Observable`<[TxStatus](../interfaces/_types_.txstatus.md)>

*Defined in [rpc/other/post.ts:26](https://github.com/paritytech/js-libs/blob/f113b04/packages/light.js/src/rpc/other/post.ts#L26)*

Post a transaction to the network.

Calls, in this order, `eth_estimateGas`, `parity_postTransaction`, `parity_checkRequest` and `eth_getTransactionReceipt` to get the status of the transaction.

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| tx | [Tx](_types_.md#tx) | - |
| `Default value` options | [PostOptions](../interfaces/_rpc_other_post_.postoptions.md) |  {} |

**Returns:** `Observable`<[TxStatus](../interfaces/_types_.txstatus.md)>
- The status of the transaction.

___

