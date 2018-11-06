// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { timer } from 'rxjs';
import * as memoizee from 'memoizee';

import createDormant from './utils/createDormant';
import { FrequencyObservableOptions } from '../types';

/**
 * Observable that emits on every second.
 */
function onEverySecond$(options?: FrequencyObservableOptions) {
  return createDormant(timer(0, 1000), options);
}
// @ts-ignore
onEverySecond$ = memoizee(onEverySecond$);

/**
 * Observable that emits on every other second.
 */
function onEvery2Seconds$(options?: FrequencyObservableOptions) {
  return createDormant(timer(0, 2000), options);
}
// @ts-ignore
onEvery2Seconds$ = memoizee(onEvery2Seconds$);

/**
 * Observable that emits every five seconds.
 */
function onEvery5Seconds$(options?: FrequencyObservableOptions) {
  return createDormant(timer(0, 5000), options);
}
// @ts-ignore
onEvery5Seconds$ = memoizee(onEvery5Seconds$);

export { onEverySecond$, onEvery2Seconds$, onEvery5Seconds$ };
