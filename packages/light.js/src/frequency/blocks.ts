// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';
import { filter } from 'rxjs/operators';
import * as memoizee from 'memoizee';

import { createApiFromProvider, getApi } from '../api';
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
 * Given an api object, return Observable that emits on every 2nd block.
 * Pure function version of {@link onEvery2Blocks}.
 *
 * @param api - The Api object.
 */
const onEvery2BlocksWithApi$ = memoizee((api: any) =>
  onEveryBlock$({ provider: api.provider }).pipe(
    filter(n => +n % 2 === 0) // Around ~30s on mainnet // TODO Use isEqualTo and mod from bignumber.js
  )
);

/**
 * Observable that emits on every 2nd block.
 *
 * @param options - Options to pass to {@link FrequencyObservable}.
 */
export function onEvery2Blocks$(options: FrequencyObservableOptions = {}) {
  const { provider } = options;
  const api = provider ? createApiFromProvider(provider) : getApi();

  return onEvery2BlocksWithApi$(api);
}
