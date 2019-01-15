// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { distinctUntilChanged, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { isLoading } from '../isLoading';

/**
 * Filter out the loading states in our observable.
 *
 */
export const withoutLoading = () => <T>(
  source$: Observable<T>
): Observable<T> =>
  source$.pipe(
    filter(value => !isLoading(value)),
    distinctUntilChanged()
  );
