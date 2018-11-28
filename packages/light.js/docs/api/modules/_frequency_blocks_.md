

# Functions

<a id="oneveryblock_"></a>

##  onEveryBlock$

▸ **onEveryBlock$**(options?: *[FrequencyObservableOptions](../interfaces/_types_.frequencyobservableoptions.md)*): `Observable`<`BigNumber`>

*Defined in [frequency/blocks.ts:37](https://github.com/paritytech/js-libs/blob/fb3abea/packages/light.js/src/frequency/blocks.ts#L37)*

Observable that emits on every new block. Note: this FrequencyObservable won't fire when the light client is syncing.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` options | [FrequencyObservableOptions](../interfaces/_types_.frequencyobservableoptions.md) |  Options to pass to [FrequencyObservable](../interfaces/_types_.frequencyobservable.md). |

**Returns:** `Observable`<`BigNumber`>

___

