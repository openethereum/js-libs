// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';
import { filter, tap } from 'rxjs/operators';

import createPubsubObservable from './utils/createPubsubObservable';
import { FrequencyObservable, FrequencyObservableOptions } from '../types';

/**
 * Observable that emits on every new block.
 *
 * @param options - Options to pass to {@link FrequencyObservable}.
 */
export const onEveryBlock$: FrequencyObservable<BigNumber> = (
  options?: FrequencyObservableOptions
) => createPubsubObservable('eth_blockNumber', options);
onEveryBlock$.metadata = { name: 'onEveryBlock$' };

/**
 * Observable that emits on every 2nd block.
 *
 * @param options - Options to pass to {@link FrequencyObservable}.
 */
export const onEvery2Blocks$: FrequencyObservable<BigNumber> = (
  options?: FrequencyObservableOptions
) =>
  onEveryBlock$(options).pipe(
    filter(n => +n % 2 === 0) // Around ~30s on mainnet // TODO Use isEqualTo and mod from bignumber.js
  );
onEvery2Blocks$.metadata = { name: 'onEvery2Blocks$' };

/**
 * Observable that emits on every 4th block.
 *
 * @param options - Options to pass to {@link FrequencyObservable}.
 */
export const onEvery4Blocks$: FrequencyObservable<BigNumber> = (
  options?: FrequencyObservableOptions
) =>
  onEveryBlock$(options).pipe(
    filter(n => +n % 4 === 0) // Around ~1min on mainnet // TODO Use isEqualTo and mod from bignumber.js
  );
onEvery4Blocks$.metadata = { name: 'onEvery4Blocks$' };
