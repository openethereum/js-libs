// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { of } from 'rxjs';

import { FrequencyObservable, FrequencyObservableOptions } from '../types';

/**
 * Observable that emits only once.
 *
 * @param options - Options to pass to {@link FrequencyObservable}.
 */
export const onStartup$: FrequencyObservable<number> = (
  _?: FrequencyObservableOptions
) => of(0);
onStartup$.metadata = { name: 'onStartup$' };
