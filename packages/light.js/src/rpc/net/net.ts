// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';

import createRpc$ from '../utils/createRpc';
import { FrequencyMap } from '../../types';
import { switchMapPromise } from '../../utils/operators';

/**
 * Get the amount of peers.
 *
 * Calls `net_peerCount`
 *
 * @param api - The Api object used to create this {@link RpcObservable}.
 * @param frequency - The FrequencyMap used to create this {@link RpcObservable}.
 * @return - An Observable containing the number.
 */
export function peerCount$(api: any, frequency: FrequencyMap) {
  return createRpc$<number, BigNumber>({
    calls: ['net_peerCount'],
    frequency: [frequency.onEvery5Seconds$],
    name: 'peerCount$',
    pipes: () => [switchMapPromise(() => api.net.peerCount())]
  });
}
