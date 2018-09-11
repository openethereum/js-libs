

# Functions

<a id="makecontract"></a>

##  makeContract

▸ **makeContract**(api: *`any`*, frequency: *[FrequencyMap](_types_.md#frequencymap)*):  `(Anonymous function)` & `Memoized`<`(Anonymous function)`>

*Defined in [rpc/other/makeContract.ts:45](https://github.com/paritytech/js-libs/blob/7df4531/packages/light.js/src/rpc/other/makeContract.ts#L45)*

Create a contract.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| api | `any` |  The Api object used to create this [RpcObservable](../interfaces/_types_.rpcobservable.md). |
| frequency | [FrequencyMap](_types_.md#frequencymap) |  The FrequencyMap used to create this [RpcObservable](../interfaces/_types_.rpcobservable.md). |

**Returns:**  `(Anonymous function)` & `Memoized`<`(Anonymous function)`>

- An object whose keys are all the functions of the
contract, and each function return an Observable which will fire when the
function resolves.

___

