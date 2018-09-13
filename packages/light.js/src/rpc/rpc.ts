// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as eth from './eth';
import { memoizeAll } from '../utils/memoizeAll';

const rpc = memoizeAll({ ...eth });

export default rpc;
