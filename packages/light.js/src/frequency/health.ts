// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import api from '../api';
import createOnFromPubsub from './utils/createOnFromPubsub';

/**
 * Observable that emits when syncing status changes.
 */
export const onPeersChange$ = createOnFromPubsub<number>('net_peerCount', api);
onPeersChange$.metadata = {
  calls: ['net_peerCount'],
  name: 'onPeersChange$'
};

/**
 * Observable that emits when syncing status changes.
 */
export const onSyncingChanged$ = createOnFromPubsub<object | boolean>(
  'eth_syncing',
  api
);
onSyncingChanged$.metadata = {
  calls: ['eth_syncing'],
  name: 'onSyncingChanged$'
};
