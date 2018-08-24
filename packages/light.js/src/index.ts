// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { setProvider } from './api';
import * as frequency from './frequency';
import './overview';

export * from './rpc';
export * from './utils/isLoading';
export * from './types';
export { withoutLoading } from './utils/operators/withoutLoading';

export { frequency, setProvider };
export default { setProvider };
