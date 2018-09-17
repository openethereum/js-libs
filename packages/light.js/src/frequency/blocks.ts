// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';

import createPubsubObservable from './utils/createPubsubObservable';
import { FrequencyObservableOptions } from '../types';

/**
 * Observable that emits on every new block.
 *
 * @param options - Options to pass to {@link FrequencyObservable}.
 */
export function onEveryBlock$(options?: FrequencyObservableOptions) {
  return createPubsubObservable<BigNumber>('eth_blockNumber', options);
}
