

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

*Defined in [rpc/other/post.ts:19](https://github.com/paritytech/js-libs/blob/87b4d1f/packages/light.js/src/rpc/other/post.ts#L19)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| transactionHash | `string` |
| api | `any` |

**Returns:** `Promise`<`any`>

___
<a id="post_"></a>

##  post$

▸ **post$**(tx: *[Tx](_types_.md#tx)*, options: *[PostOptions](../interfaces/_rpc_other_post_.postoptions.md)*): `any`

*Defined in [rpc/other/post.ts:50](https://github.com/paritytech/js-libs/blob/87b4d1f/packages/light.js/src/rpc/other/post.ts#L50)*

Post a transaction to the network.

Calls, in this order, `eth_estimateGas`, `personal_signTransaction`, `eth_sendRawTransaction` and `eth_getTransactionReceipt` to get the status of the transaction.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| tx | [Tx](_types_.md#tx) |  Transaction object |
| options | [PostOptions](../interfaces/_rpc_other_post_.postoptions.md) |  Options to pass to the [RpcObservable](../interfaces/_types_.rpcobservable.md). |

**Returns:** `any`
- The status of the transaction: (estimated), signed, sent, confirmed

___
<a id="postraw_"></a>

##  postRaw$

▸ **postRaw$**(rawTx: *`string`*, options?: *[RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md)*): `any`

*Defined in [rpc/other/post.ts:89](https://github.com/paritytech/js-libs/blob/87b4d1f/packages/light.js/src/rpc/other/post.ts#L89)*

Post a raw (signed) transaction to the network.

Calls, in this order, `eth_sendRawTransaction` and `eth_getTransactionReceipt` to get the status of the transaction.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| rawTx | `string` | - |  Raw transaction |
| `Default value` options | [RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md) |  {} |

**Returns:** `any`
- The status of the transaction: sent, confirmed

___

