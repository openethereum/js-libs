

# Index

### Interfaces

* [PostOptions](../interfaces/_rpc_other_post_.postoptions.md)

### Functions

* [getTransactionReceipt](_rpc_other_post_.md#gettransactionreceipt)
* [post$](_rpc_other_post_.md#post_)
* [postRaw$](_rpc_other_post_.md#postraw_)

---

# Functions

<a id="gettransactionreceipt"></a>

##  getTransactionReceipt

▸ **getTransactionReceipt**(transactionHash: *`string`*, api: *`any`*): `Promise`<`any`>

*Defined in [rpc/other/post.ts:18](https://github.com/paritytech/js-libs/blob/4cbf0f0/packages/light.js/src/rpc/other/post.ts#L18)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| transactionHash | `string` |
| api | `any` |

**Returns:** `Promise`<`any`>

___
<a id="post_"></a>

##  post$

▸ **post$**(tx: *[Tx](_types_.md#tx)*, options?: *[PostOptions](../interfaces/_rpc_other_post_.postoptions.md)*): `Observable`<[TxStatus](../interfaces/_types_.txstatus.md)>

*Defined in [rpc/other/post.ts:47](https://github.com/paritytech/js-libs/blob/4cbf0f0/packages/light.js/src/rpc/other/post.ts#L47)*

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
<a id="postraw_"></a>

##  postRaw$

▸ **postRaw$**(tx: *`string`*, options?: *[PostOptions](../interfaces/_rpc_other_post_.postoptions.md)*): `Observable`<[TxStatus](../interfaces/_types_.txstatus.md)>

*Defined in [rpc/other/post.ts:93](https://github.com/paritytech/js-libs/blob/4cbf0f0/packages/light.js/src/rpc/other/post.ts#L93)*

Post a raw (signed) transaction to the network.

Calls, in this order, `eth_sendRawTransaction` and `eth_getTransactionReceipt` to get the status of the transaction.

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| tx | `string` | - |
| `Default value` options | [PostOptions](../interfaces/_rpc_other_post_.postoptions.md) |  {} |

**Returns:** `Observable`<[TxStatus](../interfaces/_types_.txstatus.md)>
- The status of the transaction.

___

