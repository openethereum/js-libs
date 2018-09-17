

# Variables

<a id="onevery2blockswithapi_"></a>

## `<Const>` onEvery2BlocksWithApi$

**● onEvery2BlocksWithApi$**: * `(Anonymous function)` & `Memoized`<`(Anonymous function)`>
* =  memoizee((api: any) =>
  onEveryBlock$({ provider: api.provider }).pipe(
    filter(n => +n % 2 === 0) // Around ~30s on mainnet // TODO Use isEqualTo and mod from bignumber.js
  )
)

*Defined in [frequency/blocks.ts:29](https://github.com/paritytech/js-libs/blob/0cbe22a/packages/light.js/src/frequency/blocks.ts#L29)*

Given an api object, return Observable that emits on every 2nd block. Pure function version of {@link onEvery2Blocks}.
*__param__*: The Api object.

___

# Functions

<a id="onevery2blocks_"></a>

##  onEvery2Blocks$

▸ **onEvery2Blocks$**(options?: *[FrequencyObservableOptions](../interfaces/_types_.frequencyobservableoptions.md)*): `Observable`<`BigNumber`>

*Defined in [frequency/blocks.ts:40](https://github.com/paritytech/js-libs/blob/0cbe22a/packages/light.js/src/frequency/blocks.ts#L40)*

Observable that emits on every 2nd block.

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` options | [FrequencyObservableOptions](../interfaces/_types_.frequencyobservableoptions.md) |  {} |  Options to pass to [FrequencyObservable](../interfaces/_types_.frequencyobservable.md). |

**Returns:** `Observable`<`BigNumber`>

___
<a id="oneveryblock_"></a>

##  onEveryBlock$

▸ **onEveryBlock$**(options?: *[FrequencyObservableOptions](../interfaces/_types_.frequencyobservableoptions.md)*): `Observable`<`BigNumber`>

*Defined in [frequency/blocks.ts:19](https://github.com/paritytech/js-libs/blob/0cbe22a/packages/light.js/src/frequency/blocks.ts#L19)*

Observable that emits on every new block.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| `Optional` options | [FrequencyObservableOptions](../interfaces/_types_.frequencyobservableoptions.md) |  Options to pass to [FrequencyObservable](../interfaces/_types_.frequencyobservable.md). |

**Returns:** `Observable`<`BigNumber`>

___

