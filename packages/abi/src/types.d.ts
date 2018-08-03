// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';

export type Bytes = number[];

export type MediateType = 'raw' | 'prefixed' | 'fixedArray' | 'array';

export type TokenTypeEnum =
  | 'address'
  | 'bool'
  | 'bytes'
  | 'string'
  | 'int'
  | 'uint'
  | 'fixedBytes'
  | 'fixedArray'
  | 'array';

export type TokenValue =
  | boolean
  | string
  | number
  | BigNumber
  | string[]
  | number[]
  | BigNumber[];
