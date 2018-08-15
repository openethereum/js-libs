// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';

import api from '../../api';
import createRpc$ from '../utils/createRpc';
import { onEvery5Seconds$ } from '../../frequency';
import { switchMapPromise } from '../../utils/operators';

/**
 * Get the amount of peers.
 *
 * Calls `net_peerCount`
 *
 * @return - An Observable containing the number.
 */
export const peerCount$ = createRpc$<BigNumber>({
  calls: ['net_peerCount'],
  frequency: [onEvery5Seconds$],
  pipes: () => [switchMapPromise(() => api().net.peerCount())]
});
