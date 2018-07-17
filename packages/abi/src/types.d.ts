// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';

export type Bytes = number[];

export type ParamTypeEnum =
  | 'address'
  | 'bool'
  | 'bytes'
  | 'string'
  | 'int'
  | 'uint'
  | 'fixedBytes'
  | 'fixedArray'
  | 'array';

export type Value = string | number | BigNumber;
