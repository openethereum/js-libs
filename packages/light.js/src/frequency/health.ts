// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import createPubsubObservable from './utils/createPubsubObservable';

/**
 * Observable that emits when peer count changes.
 */
// TODO Pubsub doesn't exist on `net_peerCount`

/**
 * Observable that emits when syncing status changes.
 *
 * @param api - The api object with which to create this {@link FrequencyObservable}.
 */
export function onSyncingChanged$(api: any) {
  return createPubsubObservable<object | boolean>(
    {
      calls: ['eth_syncing'],
      name: 'onSyncingChanged$'
    },
    api
  );
}
