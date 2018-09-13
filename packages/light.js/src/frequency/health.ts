// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import createPubsubObservable from './utils/createPubsubObservable';
import { FrequencyObservable, FrequencyObservableOptions } from '../types';

/**
 * Observable that emits when syncing status changes.
 */
// TODO Pubsub doesn't exist on `net_peerCount`

/**
 * Observable that emits when syncing status changes.
 *
 * @param options - Options to pass to {@link FrequencyObservable}.
 */
export const onSyncingChanged$: FrequencyObservable<object | boolean> = (
  options?: FrequencyObservableOptions
) => createPubsubObservable('eth_syncing', options);
onSyncingChanged$.metadata = {
  calls: ['eth_syncing'],
  name: 'onSyncingChanged$'
};
