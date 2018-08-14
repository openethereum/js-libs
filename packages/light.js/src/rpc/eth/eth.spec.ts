// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as eth from './eth';
import testRpc from '../../utils/testHelpers/testRpc';

Object.keys(eth).forEach(key => testRpc(key, eth[key]));
