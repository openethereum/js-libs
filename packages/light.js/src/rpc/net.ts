// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';

import createRpc$ from './utils/createRpc';
import frequency from '../frequency';
import { RpcObservableOptions } from '../types';
import { switchMapPromise } from '../utils/operators';

/**
 * Get the amount of peers.
 *
 * Calls `net_peerCount`
 *
 * @param options - Options to pass to {@link RpcObservableOptions}.
 * @return - An Observable containing the number.
 */
export function peerCount$(options?: RpcObservableOptions) {
  return createRpc$<number, BigNumber>({
    calls: ['net_peerCount'],
    frequency: [frequency.onEvery5Seconds$],
    name: 'peerCount$',
    pipes: api => [switchMapPromise(() => api.net.peerCount())]
  })()(options);
}
