

# Variables

<a id="onevery2blocks_"></a>

## `<Const>` onEvery2Blocks$

**● onEvery2Blocks$**: *[FrequencyObservable](../interfaces/_types_.frequencyobservable.md)<`BigNumber`>* =  onEveryBlock$.pipe(
  filter(n => +n % 2 === 0) // Around ~30s on mainnet // TODO Use isEqualTo and mod from bignumber.js
) as FrequencyObservable<BigNumber>

*Defined in [frequency/blocks.ts:25](https://github.com/paritytech/js-libs/blob/70247e1/packages/light.js/src/frequency/blocks.ts#L25)*

Observable that emits on every 2nd block.

___
<a id="onevery4blocks_"></a>

## `<Const>` onEvery4Blocks$

**● onEvery4Blocks$**: *[FrequencyObservable](../interfaces/_types_.frequencyobservable.md)<`BigNumber`>* =  onEveryBlock$.pipe(
  filter(n => +n % 4 === 0) // Around ~1min on mainnet // TODO Use isEqualTo and mod from bignumber.js
) as FrequencyObservable<BigNumber>

*Defined in [frequency/blocks.ts:33](https://github.com/paritytech/js-libs/blob/70247e1/packages/light.js/src/frequency/blocks.ts#L33)*

Observable that emits on every 4th block.

___
<a id="oneveryblock_"></a>

## `<Const>` onEveryBlock$

**● onEveryBlock$**: *[FrequencyObservable](../interfaces/_types_.frequencyobservable.md)<`BigNumber`>* =  createOnFromPubsub<BigNumber>(
  'eth_blockNumber',
  api
)

*Defined in [frequency/blocks.ts:16](https://github.com/paritytech/js-libs/blob/70247e1/packages/light.js/src/frequency/blocks.ts#L16)*

Observable that emits on every new block.

___

