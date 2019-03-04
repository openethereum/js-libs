// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { publishReplay, refCount } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { operators } from 'rxjs-etc';

import { distinctValues } from './distinctValues';

const { refCountDelay } = operators;

/**
 * Shorthand for distinctUntilChanged(), publishReplay(1) and refCountDelay().
 *
 * @ignore
 */
export const distinctReplayRefCountDelay = (delay: number) => <T>(
  source$: Observable<T>
): Observable<T> =>
  source$.pipe(
    distinctValues(),

    // Note: uses a single subject, so the previous value might come from a
    // previous dropped subscription to the source observable
    publishReplay(1),

    // Unsubscribe to the source observable only after 2 seconds with no subscribers
    refCountDelay(delay)
  );
