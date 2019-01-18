

# Functions

<a id="oneveryblock_"></a>

##  onEveryBlock$

▸ **onEveryBlock$**(options?: *[FrequencyObservableOptions](../interfaces/_types_.frequencyobservableoptions.md)*): `Observable`<`object`>

*Defined in [frequency/blocks.ts:42](https://github.com/paritytech/js-libs/blob/fdf36ef/packages/light.js/src/frequency/blocks.ts#L42)*

Observable that emits on every new block. Note: this FrequencyObservable won't fire when the light client is syncing.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` options | [FrequencyObservableOptions](../interfaces/_types_.frequencyobservableoptions.md) |  Options to pass to [FrequencyObservable](../interfaces/_types_.frequencyobservable.md). |

**Returns:** `Observable`<`object`>

___

