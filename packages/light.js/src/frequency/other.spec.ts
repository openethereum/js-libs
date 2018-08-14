// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as other from './other';
import testFrequency from '../utils/testHelpers/testFrequency';

Object.keys(other).forEach(key => testFrequency(key, other[key]));
