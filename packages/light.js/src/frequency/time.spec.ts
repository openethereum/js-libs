// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as time from './time';
import testFrequency from '../utils/testHelpers/testFrequency';

Object.keys(time).forEach(key => testFrequency(key, time[key]));
