// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';

export type Api = any;

export type Bytes = number[];

export type BlockNumber =
  | 'earliest'
  | 'latest'
  | 'pending'
  | number
  | BigNumber;

export type ContractInstance = any;

export interface Contract {
  instance: ContractInstance;
}

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

export type InputDeriveHashMap = {
  [key: string]: string | number
}

export type BlockInfo = {
  [key: string]: BlockNumber | Date | null
}

export type InputOptionsConditions = {
  [key: string]: BlockInfo | number
}

export type InputOptions = {
  [key: string]: Array<string | number | BlockNumber> | InputOptionsConditions | string | number | BlockNumber
}

export type InputTrace = Array<string> | string;

export type InputTraceHashMap = {
  [key: string]: BlockNumber | string | Array<string>;
}