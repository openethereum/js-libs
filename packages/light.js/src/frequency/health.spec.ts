// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as health from './health';
import testFrequency from '../utils/testHelpers/testFrequency';

Object.keys(health).forEach(key => testFrequency(key, health[key]));
