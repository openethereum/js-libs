

# Index

### Interfaces

* [MakeContract](../interfaces/_rpc_other_makecontract_.makecontract.md)

### Functions

* [makeContract](_rpc_other_makecontract_.md#makecontract-1)

---

# Functions

<a id="makecontract-1"></a>

## `<Const>` makeContract

▸ **makeContract**(address: *[Address](_types_.md#address)*, abiJson: *`any`[]*, options?: *`object`*): [MakeContract](../interfaces/_rpc_other_makecontract_.makecontract.md)

*Defined in [rpc/other/makeContract.ts:119](https://github.com/paritytech/js-libs/blob/1633bdc/packages/light.js/src/rpc/other/makeContract.ts#L119)*

Create a contract.

**Parameters:**

**address: [Address](_types_.md#address)**

The contract address.

**abiJson: `any`[]**

The contract abi.

**`Default value` options: `object`**

The options to pass in when creating the contract.

| Name | Type |
| ------ | ------ |
| `Optional` provider | `any` |

**Returns:** [MakeContract](../interfaces/_rpc_other_makecontract_.makecontract.md)
- An object whose keys are all the functions of the
contract, and each function return an Observable which will fire when the
function resolves.

___

