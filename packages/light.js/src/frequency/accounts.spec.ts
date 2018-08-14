// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as accounts from './accounts';
import testFrequency from '../utils/testHelpers/testFrequency';

Object.keys(accounts).forEach(key => testFrequency(key, accounts[key]));
