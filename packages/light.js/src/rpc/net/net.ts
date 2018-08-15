// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import api from '../../api';
import createRpc$ from '../utils/createRpc';
import getFrequency from '../utils/getFrequency';
import { onEvery5Seconds$ } from '../../frequency';
import { switchMapPromise } from '../../utils/operators';

/**
 * Get the amount of peers. Calls `net_peerCount`
 *
 * @return {Observable<Number>} - An Observable containing the number.
 */
export const peerCount$ = createRpc$<Number>({
  calls: ['net_peerCount'],
  frequency: [onEvery5Seconds$]
})(() =>
  getFrequency(peerCount$).pipe(switchMapPromise(() => api().net.peerCount()))
);
