// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';
import { filter } from 'rxjs/operators';

import createPubsubObservable from './utils/createPubsubObservable';
import { FrequencyObservable } from '../types';

/**
 * Observable that emits on every new block.
 *
 * @param api - The api object with which to create this {@link FrequencyObservable}.
 */
export function onEveryBlock$(api: any) {
  return createPubsubObservable<BigNumber>(
    { calls: ['eth_blockNumber'], name: 'onEveryBlock$' },
    api
  );
}

/**
 * Observable that emits on every 2nd block.
 *
 * @param api - The api object with which to create this {@link FrequencyObservable}.
 */
export function onEvery2Blocks$(api: any) {
  const result = onEveryBlock$(api).pipe(
    filter(n => +n % 2 === 0) // Around ~30s on mainnet // TODO Use isEqualTo and mod from bignumber.js
  ) as FrequencyObservable<BigNumber>;
  result.metadata = { name: 'onEvery2Blocks$' };
  return result;
}

/**
 * Observable that emits on every 4th block.
 *
 * @param api - The api object with which to create this {@link FrequencyObservable}.
 */
export function onEvery4Blocks$(api: any) {
  const result = onEveryBlock$(api).pipe(
    filter(n => +n % 4 === 0) // Around ~30s on mainnet // TODO Use isEqualTo and mod from bignumber.js
  ) as FrequencyObservable<BigNumber>;
  result.metadata = { name: 'onEvery4Blocks$' };
  return result;
}
