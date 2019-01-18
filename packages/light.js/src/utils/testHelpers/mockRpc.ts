// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { timer } from 'rxjs';

import createRpc from '../../rpc/utils/createRpc';
import { resolveApi } from '../testHelpers/mockApi';
import { setApi } from '../../api';

/**
 * Create a fake RpcObservable.
 *
 * @ignore
 */
setApi(resolveApi());
const mockRpc$ = createRpc({ frequency: [() => timer(0, 1000)] })();

export default mockRpc$;
