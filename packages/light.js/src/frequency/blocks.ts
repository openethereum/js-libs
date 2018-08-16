// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';
import { filter } from 'rxjs/operators';

import api from '../api';
import createOnFromPubsub from './utils/createOnFromPubsub';
import { FrequencyObservable } from '../types';

/**
 * Observable that emits on every new block.
 */
export const onEveryBlock$ = createOnFromPubsub<BigNumber>(
  'eth_blockNumber',
  api
);
onEveryBlock$.metadata = { name: 'onEveryBlock$' };

/**
 * Observable that emits on every 2nd block.
 */
export const onEvery2Blocks$ = onEveryBlock$.pipe(
  filter(n => +n % 2 === 0) // Around ~30s on mainnet // TODO Use isEqualTo and mod from bignumber.js
) as FrequencyObservable<BigNumber>;
onEvery2Blocks$.metadata = { name: 'onEvery2Blocks$' };

/**
 * Observable that emits on every 4th block.
 */
export const onEvery4Blocks$ = onEveryBlock$.pipe(
  filter(n => +n % 4 === 0) // Around ~1min on mainnet // TODO Use isEqualTo and mod from bignumber.js
) as FrequencyObservable<BigNumber>;
onEvery4Blocks$.metadata = { name: 'onEvery4Blocks$' };
