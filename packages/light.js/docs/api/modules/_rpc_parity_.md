

# Functions

<a id="accountsinfo_"></a>

##  accountsInfo$

▸ **accountsInfo$**(options?: *[RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md)*): `Observable`<`object`>

*Defined in [rpc/parity.ts:17](https://github.com/paritytech/js-libs/blob/a46b19a/packages/light.js/src/rpc/parity.ts#L17)*

Get accounts info. Calls `parity_accountsInfo`.

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` options | [RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md) |

**Returns:** `Observable`<`object`>
- An Observable containing all info that can be
accessed by user concerning accounts.

___
<a id="chainname_"></a>

##  chainName$

▸ **chainName$**(options?: *[RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md)*): `Observable`<`string`>

*Defined in [rpc/parity.ts:30](https://github.com/paritytech/js-libs/blob/a46b19a/packages/light.js/src/rpc/parity.ts#L30)*

Get the name of the current chain. Calls `parity_netChain`.

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` options | [RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md) |

**Returns:** `Observable`<`string`>
- An Observable containing the name of the
current chain.

___

