// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { timer } from 'rxjs';

import { FrequencyObservable } from '../types';

/**
 * Observable that emits on every second.
 */
export const onEverySecond$ = () => {
  const result = timer(0, 1000) as FrequencyObservable<number>;
  result.metadata = { name: 'onEverySecond$' };
  return result;
};

/**
 * Observable that emits on every other second.
 */
export const onEvery2Seconds$ = () => {
  const result = timer(0, 2000) as FrequencyObservable<number>;
  result.metadata = { name: 'onEvery2Seconds$' };
  return result;
};

/**
 * Observable that emits every five seconds.
 */
export const onEvery5Seconds$ = () => {
  const result = timer(0, 5000) as FrequencyObservable<number>;
  result.metadata = { name: 'onEvery5Seconds$' };
  return result;
};
