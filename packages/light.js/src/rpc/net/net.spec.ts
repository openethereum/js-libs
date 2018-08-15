// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as net from './net';
import testRpc from '../../utils/testHelpers/testRpc';

Object.keys(net).forEach(key => testRpc(key, net[key]));
