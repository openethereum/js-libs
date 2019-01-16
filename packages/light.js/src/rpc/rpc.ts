// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as eth from './eth';
import * as net from './net';
import { post$, postRaw$ } from './other';
import * as parity from './parity';

const rpc = { ...eth, ...net, ...parity, post$, postRaw$ };

export default rpc;
