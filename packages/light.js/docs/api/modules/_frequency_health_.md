

# Variables

<a id="onsyncingchanged_"></a>

## `<Const>` onSyncingChanged$

**● onSyncingChanged$**: *[FrequencyObservable](../interfaces/_types_.frequencyobservable.md)< `false` &#124; `true` &#124; `object`>* =  createOnFromPubsub<object | boolean>(
  'eth_syncing',
  api
)

*Defined in [frequency/health.ts:22](https://github.com/paritytech/js-libs/blob/c75381e/packages/light.js/src/frequency/health.ts#L22)*

Observable that emits when syncing status changes.

___

