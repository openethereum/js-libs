// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as memoizee from 'memoizee';

import { FrequencyObservableOptions } from '../../types';
import { onSyncingChanged$ } from '../health';

/**
 * Make a dormant Observable out of an Observable: the dormant one will only
 * fire when the light client is synced.
 *
 * @param source$ - The source Observable to make dormant.
 * @param options - Options to pass to {@link onSyncingChanged$}.
 * @see https://github.com/paritytech/js-libs/issues/32
 */
const createDormant = memoizee(
  <T>(source$: Observable<T>, options?: FrequencyObservableOptions) => {
    return combineLatest(source$, onSyncingChanged$(options)).pipe(
      filter(([_, syncStatus]) => !syncStatus),
      map(([value]) => value)
    );
  }
);

export default createDormant;
