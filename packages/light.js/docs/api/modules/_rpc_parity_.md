

# Functions

<a id="accountsinfo_"></a>

##  accountsInfo$

▸ **accountsInfo$**(options?: *[RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md)*): `Observable`<`object`>

*Defined in [rpc/parity.ts:18](https://github.com/paritytech/js-libs/blob/0ae0c47/packages/light.js/src/rpc/parity.ts#L18)*

Get accounts info. Calls `parity_accountsInfo`. Works only with a Parity node.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md) |

**Returns:** `Observable`<`object`>
- An Observable containing all info that can be
accessed by user concerning accounts.

___
<a id="chainname_"></a>

##  chainName$

▸ **chainName$**(options?: *[RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md)*): `Observable`<`string`>

*Defined in [rpc/parity.ts:32](https://github.com/paritytech/js-libs/blob/0ae0c47/packages/light.js/src/rpc/parity.ts#L32)*

Get the name of the current chain. Calls `parity_chain`. Works only with a Parity node.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md) |

**Returns:** `Observable`<`string`>
- An Observable containing the name of the
current chain.

___

