// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { memoizeAll } from '../utils/memoizeAll';
import * as eth from './eth';

const rpc = { ...eth };

export default memoizeAll(rpc);
