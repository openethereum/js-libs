

# Variables

<a id="getcontract"></a>

## `<Const>` getContract

**● getContract**: * `(Anonymous function)` & `Memoized`<`(Anonymous function)`>
* =  memoizee(
  (address: Address, abiJson: any[], api: any) =>
    api.newContract(abiJson, address), // use types from @parity/abi
  { length: 1 } // Only memoize by address
)

*Defined in [rpc/other/makeContract.ts:35](https://github.com/paritytech/js-libs/blob/4893e97/packages/light.js/src/rpc/other/makeContract.ts#L35)*

Cache contracts, so that they are:

*   only created after the first call/transaction to a contract has been made
*   further calls/transactions to the same contract doesn't recreate the contract
*__param__*: The contract address.

*__param__*: The contract abi.

*__param__*: The api Object.

*__returns__*: *   The contract object as defined in @parity/api.

___

# Functions

<a id="makecontract-1"></a>

## `<Const>` makeContract

▸ **makeContract**(address: *[Address](_types_.md#address)*, abiJson: *`any`[]*, options?: *`object`*): [MakeContract](../interfaces/_rpc_other_makecontract_.makecontract.md)

*Defined in [rpc/other/makeContract.ts:119](https://github.com/paritytech/js-libs/blob/4893e97/packages/light.js/src/rpc/other/makeContract.ts#L119)*

Create a contract.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| address | [Address](_types_.md#address) | - |  The contract address. |
| abiJson | `any`[] | - |  The contract abi. |
| `Default value` options | `object` |  {} |  The options to pass in when creating the contract. |

**Returns:** [MakeContract](../interfaces/_rpc_other_makecontract_.makecontract.md)
- An object whose keys are all the functions of the
contract, and each function return an Observable which will fire when the
function resolves.

___

