

# Index

### Interfaces

* [PostOptions](../interfaces/_rpc_other_post_.postoptions.md)

### Functions

* [post$](_rpc_other_post_.md#post_)

---

# Functions

<a id="post_"></a>

##  post$

▸ **post$**(tx: *[Tx](_types_.md#tx)*, options?: *[PostOptions](../interfaces/_rpc_other_post_.postoptions.md)*): `Observable`<[TxStatus](../interfaces/_types_.txstatus.md)>

*Defined in [rpc/other/post.ts:28](https://github.com/paritytech/js-libs/blob/e5d602e/packages/light.js/src/rpc/other/post.ts#L28)*

Post a transaction to the network.

Calls, in this order, `eth_estimateGas`, `parity_postTransaction`, `parity_checkRequest` and `eth_getTransactionReceipt` to get the status of the transaction.

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| tx | [Tx](_types_.md#tx) | - |
| `Default value` options | [PostOptions](../interfaces/_rpc_other_post_.postoptions.md) |  {} |

**Returns:** `Observable`<[TxStatus](../interfaces/_types_.txstatus.md)>
- The status of the transaction.

___

