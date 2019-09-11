// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

/* eslint-disable @typescript-eslint/no-unused-vars */

import { timer } from 'rxjs';
import * as memoizee from 'memoizee';

import { FrequencyObservableOptions } from '../types';

/**
 * Observable that emits on every second.
 */
function onEverySecond$ (options?: FrequencyObservableOptions) {
  return timer(0, 1000);
}
// @ts-ignore
// eslint-disable-next-line no-func-assign
onEverySecond$ = memoizee(onEverySecond$);

/**
 * Observable that emits on every other second.
 */
function onEvery2Seconds$ (options?: FrequencyObservableOptions) {
  return timer(0, 2000);
}
// @ts-ignore
// eslint-disable-next-line no-func-assign
onEvery2Seconds$ = memoizee(onEvery2Seconds$);

/**
 * Observable that emits every five seconds.
 */
function onEvery5Seconds$ (options?: FrequencyObservableOptions) {
  return timer(0, 5000);
}
// @ts-ignore
// eslint-disable-next-line no-func-assign
onEvery5Seconds$ = memoizee(onEvery5Seconds$);

export { onEverySecond$, onEvery2Seconds$, onEvery5Seconds$ };
