// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import createPubsubObservable from './utils/createPubsubObservable';
import { FrequencyObservable } from '../types';

/**
 * Observable that emits when syncing status changes.
 */
// TODO Pubsub doesn't exist on `net_peerCount`

/**
 * Observable that emits when syncing status changes.
 *
 * @param provider - The provider object with which to create this {@link FrequencyObservable}.
 */
export const onSyncingChanged$: FrequencyObservable<object | boolean> = (
  provider?: any
) => createPubsubObservable('eth_syncing', provider);
onSyncingChanged$.metadata = {
  calls: ['eth_syncing'],
  name: 'onSyncingChanged$'
};
