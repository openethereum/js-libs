// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';

import createRpc$ from '../utils/createRpc';
import { FrequencyObject } from '../../types';
import { switchMapPromise } from '../../utils/operators';

/**
 * Get the amount of peers.
 *
 * Calls `net_peerCount`
 *
 * @return - An Observable containing the number.
 */
export const peerCount$ = (api: any, frequency: FrequencyObject) =>
  createRpc$<number, BigNumber>({
    calls: ['net_peerCount'],
    frequency: [frequency.onEvery5Seconds$],
    name: 'peerCount$',
    pipes: () => [switchMapPromise(() => api.net.peerCount())]
  });
