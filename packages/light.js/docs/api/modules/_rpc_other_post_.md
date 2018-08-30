

# Functions

<a id="post_"></a>

## `<Const>` post$

▸ **post$**(tx: *[Tx](_types_.md#tx)*, options?: *`object`*): `any`

*Defined in [rpc/other/post.ts:22](https://github.com/paritytech/js-libs/blob/79a5f83/packages/light.js/src/rpc/other/post.ts#L22)*

Post a transaction to the network.

Calls, in this order, `eth_estimateGas`, `parity_postTransaction`, `parity_checkRequest` and `eth_getTransactionReceipt` to get the status of the transaction.

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| tx | [Tx](_types_.md#tx) | - |
| `Default value` options | `object` |  {} |

**Returns:** `any`
- The status of the transaction.

___

