// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { filter, map, startWith, withLatestFrom } from 'rxjs/operators';
import * as memoizee from 'memoizee';
import { Observable } from 'rxjs';

import { Block, FrequencyObservableOptions } from '../types';
import { createApiFromProvider, getApi } from '../api';
import createPubsubObservable from './utils/createPubsubObservable';
import { distinctValues } from '../utils/operators';
import { onSyncingChanged$ } from './health';

/**
 * Pure function version of {@link onEveryBlock$}.
 *
 * @ignore
 */
const onEveryBlockWithApi$ = memoizee(
  (api: any, options?: FrequencyObservableOptions) =>
    createPubsubObservable(
      'eth_newHeads',
      'eth_getBlockByNumber',
      options
    ).pipe(
      withLatestFrom(onSyncingChanged$(options).pipe(startWith(false))),
      filter(([_, isSyncing]) => isSyncing === false),
      map(([blockNumber]) => blockNumber),
      distinctValues()
    ) as Observable<Block>,
  { length: 1 } // Only memoize by api
);

/**
 * Observable that emits on every new block. Note: this FrequencyObservable
 * won't fire when the light client is syncing.
 *
 * @param options - Options to pass to {@link FrequencyObservable}.
 */
export function onEveryBlock$ (options?: FrequencyObservableOptions) {
  const api =
    options && options.provider
      ? createApiFromProvider(options.provider)
      : getApi();

  return onEveryBlockWithApi$(api, options);
}
