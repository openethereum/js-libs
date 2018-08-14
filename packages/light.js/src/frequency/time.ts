// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { timer } from 'rxjs';

import { FrequencyObservable } from '../types';

/**
 * Observable that emits on every second.
 */
export const onEverySecond$ = timer(0, 1000) as FrequencyObservable<number>;
onEverySecond$.metadata = { name: 'onEverySecond$' };

/**
 * Observable that emits on every other second.
 */
export const onEvery2Seconds$ = timer(0, 2000) as FrequencyObservable<number>;
onEvery2Seconds$.metadata = { name: 'onEvery2Seconds$' };

/**
 * Observable that emits every five seconds.
 */
export const onEvery5Seconds$ = timer(0, 5000) as FrequencyObservable<number>;
onEvery5Seconds$.metadata = { name: 'onEvery5Seconds$' };
