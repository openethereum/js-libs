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
 */
export const onEveryBlock$ = (api: any) =>
  createPubsubObservable<BigNumber>(
    { calls: ['eth_blockNumber'], name: 'onEveryBlock$' },
    api
  );

/**
 * Observable that emits on every 2nd block.
 */
export const onEvery2Blocks$ = (api: any) => {
  const result = onEveryBlock$(api).pipe(
    filter(n => +n % 2 === 0) // Around ~30s on mainnet // TODO Use isEqualTo and mod from bignumber.js
  ) as FrequencyObservable<BigNumber>;
  result.metadata = { name: 'onEvery2Blocks$' };
  return result;
};

/**
 * Observable that emits on every 4th block.
 */
export const onEvery4Blocks$ = (api: any) => {
  const result = onEveryBlock$(api).pipe(
    filter(n => +n % 4 === 0) // Around ~30s on mainnet // TODO Use isEqualTo and mod from bignumber.js
  ) as FrequencyObservable<BigNumber>;
  result.metadata = { name: 'onEvery4Blocks$' };
  return result;
};
