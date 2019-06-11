

# Functions

<a id="accountsinfo_"></a>

##  accountsInfo$

▸ **accountsInfo$**(options?: *[RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md)*): `Observable`<`object`>

*Defined in [rpc/parity.ts:18](https://github.com/paritytech/js-libs/blob/fed24c5/packages/light.js/src/rpc/parity.ts#L18)*

Get accounts info. Calls `parity_accountsInfo`. Works only with a Parity node.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md) |

**Returns:** `Observable`<`object`>
*   An Observable containing all info that can be accessed by user concerning accounts.

___
<a id="chainname_"></a>

##  chainName$

▸ **chainName$**(options?: *[RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md)*): `Observable`<`string`>

*Defined in [rpc/parity.ts:32](https://github.com/paritytech/js-libs/blob/fed24c5/packages/light.js/src/rpc/parity.ts#L32)*

Get the name of the current chain. Calls `parity_chain`. Works only with a Parity node.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md) |

**Returns:** `Observable`<`string`>
*   An Observable containing the name of the current chain.

___
<a id="versioninfo_"></a>

##  versionInfo$

▸ **versionInfo$**(options?: *[RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md)*): `Observable`<`string`>

*Defined in [rpc/parity.ts:46](https://github.com/paritytech/js-libs/blob/fed24c5/packages/light.js/src/rpc/parity.ts#L46)*

Get the version info of Parity Ethereum. Calls `parity_versionInfo`.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` options | [RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md) |

**Returns:** `Observable`<`string`>
*   An Observable containing the version object: {major, minor, patch}

___

