// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import api from '../api';
import createPubsubObservable from './utils/createPubsubObservable';
import { FrequencyObservable } from '../types';

/**
 * Observable that emits when syncing status changes.
 */
// TODO Pubsub doesn't exist on `net_peerCount`
// export const onPeersChange$ = createPubsubObservable<number>('net_peerCount', api);
// onPeersChange$.metadata = {
//   calls: ['net_peerCount'],
//   name: 'onPeersChange$'
// };

/**
 * Observable that emits when syncing status changes.
 */
export const onSyncingChanged$ = (() =>
  createPubsubObservable('eth_syncing', api)) as FrequencyObservable<
  object | boolean
>;
onSyncingChanged$.metadata = {
  calls: ['eth_syncing'],
  name: 'onSyncingChanged$'
};
