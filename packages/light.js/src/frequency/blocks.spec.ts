// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as blocks from './blocks';
import testFrequency from '../utils/testHelpers/testFrequency';

Object.keys(blocks).forEach(key => testFrequency(key, blocks[key]));
