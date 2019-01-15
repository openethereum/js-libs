// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import createPubsubObservable from './utils/createPubsubObservable';
import { FrequencyObservableOptions } from '../types';

/**
 * Observable that emits when syncing status changes.
 */
// TODO Pubsub doesn't exist on `net_peerCount`

/**
 * Observable that emits when syncing status changes.
 *
 * @param options - Options to pass to {@link FrequencyObservable}.
 */
export function onSyncingChanged$ (options?: FrequencyObservableOptions) {
  return createPubsubObservable<object | false>(
    'eth_syncing',
    'eth_syncing',
    options
  );
}
