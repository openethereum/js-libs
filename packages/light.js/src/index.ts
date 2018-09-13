// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { setProvider } from './api';
import frequency from './frequency';
import rpc from './rpc';
import './overview';

export * from './utils/isLoading';
export * from './types';
export { withoutLoading } from './utils/operators/withoutLoading';

export { frequency };
export const { balanceOf$ } = rpc;
export default { setProvider };
