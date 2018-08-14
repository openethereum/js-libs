// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as parity from './parity';
import testRpc from '../../utils/testHelpers/testRpc';

Object.keys(parity).forEach(key => testRpc(key, parity[key]));
