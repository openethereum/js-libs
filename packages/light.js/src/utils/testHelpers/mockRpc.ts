// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { of, timer } from 'rxjs';

import createRpc from '../../rpc/utils/createRpc';

/**
 * Create a fake rpc$ Observable.
 *
 * @ignore
 */
const mockRpc$ = createRpc({ frequency: [timer(0, 1000)] })(() =>
  of('mockRpc')
);

export default mockRpc$;
