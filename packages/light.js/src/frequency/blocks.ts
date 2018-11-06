// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';
import { filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as memoizee from 'memoizee';

import { createApiFromProvider, getApi } from '../api';
import createPubsubObservable from './utils/createPubsubObservable';
import { FrequencyObservableOptions } from '../types';
import { onSyncingChanged$ } from './health';

/**
 * Pure function version of {@link onEveryBlock$}.
 *
 * @ignore
 */
const onEveryBlockWithApi$ = memoizee(
  (api: any, options: FrequencyObservableOptions) =>
    onSyncingChanged$().pipe(
      filter((isSyncing: boolean) => isSyncing === false),
      switchMap(() => createPubsubObservable('eth_blockNumber', options))
    ) as Observable<BigNumber>,
  { length: 1 } // Only memoize by api
);

/**
 * Observable that emits on every new block. Note: this FrequencyObservable
 * won't fire when the light client is syncing.
 *
 * @param options - Options to pass to {@link FrequencyObservable}.
 */
export function onEveryBlock$(options?: FrequencyObservableOptions) {
  const api =
    options && options.provider
      ? createApiFromProvider(options.provider)
      : getApi();

  return onEveryBlockWithApi$(api, options);
}
