// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { setApi, setProvider } from './api';
import * as frequency from './frequency';
import { memoizeAll } from './rpc/utils/addMemoize';
import * as rpc from './rpc';
import './overview';

export * from './utils/isLoading';
export * from './types';
export { withoutLoading } from './utils/operators/withoutLoading';

export { frequency };
export const { balanceOf$ } = memoizeAll(rpc);
export default { setApi, setProvider };
