// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';

export type Bytes = number[];

export type BlockNumber =
  | 'earliest'
  | 'latest'
  | 'pending'
  | number
  | BigNumber
  | string;

export type EtherDenomination =
  | 'wei'
  | 'ada'
  | 'babbage'
  | 'shannon'
  | 'szabo'
  | 'finney'
  | 'ether'
  | 'kether'
  | 'mether'
  | 'gether'
  | 'tether';
