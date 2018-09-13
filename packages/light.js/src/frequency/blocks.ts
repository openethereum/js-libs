// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';
import { filter } from 'rxjs/operators';

import createPubsubObservable from './utils/createPubsubObservable';
import { FrequencyObservableOptions } from '../types';

/**
 * Observable that emits on every new block.
 *
 * @param options - Options to pass to {@link FrequencyObservable}.
 */
export function onEveryBlock$(options?: FrequencyObservableOptions) {
  return createPubsubObservable<BigNumber>('eth_blockNumber', options);
}

/**
 * Observable that emits on every 2nd block.
 *
 * @param options - Options to pass to {@link FrequencyObservable}.
 */
export function onEvery2Blocks$(options?: FrequencyObservableOptions) {
  return onEveryBlock$(options).pipe(
    filter(n => +n % 2 === 0) // Around ~30s on mainnet // TODO Use isEqualTo and mod from bignumber.js
  );
}

/**
 * Observable that emits on every 4th block.
 *
 * @param options - Options to pass to {@link FrequencyObservable}.
 */
export function onEvery4Blocks$(options?: FrequencyObservableOptions) {
  return onEveryBlock$(options).pipe(
    filter(n => +n % 4 === 0) // Around ~1min on mainnet // TODO Use isEqualTo and mod from bignumber.js
  );
}
