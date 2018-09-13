// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as eth from './eth';
import { memoizeAll } from '../utils/memoizeAll';
import * as net from './net';
import * as parity from './parity';

const rpc = { ...eth, ...net, ...parity };

export default memoizeAll(rpc);