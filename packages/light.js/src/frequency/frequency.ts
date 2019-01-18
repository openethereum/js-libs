// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as accounts from './accounts';
import * as blocks from './blocks';
import * as health from './health';
import * as other from './other';
import * as time from './time';

const frequency = {
  ...accounts,
  ...blocks,
  ...health,
  ...other,
  ...time
};

export default frequency;
