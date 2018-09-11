// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { of } from 'rxjs';

import { FrequencyObservable } from '../types';

/**
 * Observable that emits only once.
 */
export function onStartup$() {
  const result = of(0) as FrequencyObservable<number>;
  result.metadata = { name: 'onStartup$' };
  return result;
}
