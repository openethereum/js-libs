// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import api from '../api';
import createOnFromPubsub from './utils/createOnFromPubsub';

/**
 * Observable that emits when syncing status changes.
 */
export const onSyncingChanged$ = createOnFromPubsub('eth_syncing', api);
onSyncingChanged$.metadata = {
  name: 'onSyncingChanged$'
};
