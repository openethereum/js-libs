// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';

import Token from './token';

export interface AbiInput {
  indexed?: boolean;
  name: string;
  type: TokenTypeEnum;
}

export type AbiItemType = 'function' | 'event' | 'constructor' | 'fallback';

export type MediateType = 'raw' | 'prefixed' | 'fixedArray' | 'array';

// Elementary types
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

// TS types for each of the above type's values
export type AddressValue = string; // '0x123...'
export type BoolValue = boolean | string; // true or '1'
export type BytesValue = string | number[]; // '0x123' or [34, 35, 36]
export type StringValue = string; // 'foo'
export type IntValue = number | string | BigNumber; // -1
export type UintValue = IntValue; // 1
export type FixedBytesValue = BytesValue; // '0x123'
export type FixedArrayValue = (boolean | string | number | BigNumber | Token)[];
export type ArrayValue = FixedArrayValue;

export type TokenValue =
  | AddressValue
  | Boolean
  | BytesValue
  | StringValue
  | IntValue
  | UintValue
  | FixedBytesValue
  | FixedArrayValue
  | ArrayValue;

export interface AbiItem {
  anonymous?: boolean;
  constant?: boolean;
  inputs: AbiInput[];
  name?: string;
  payable?: boolean;
  outputs?: AbiInput[];
  type: AbiItemType;
}

export type AbiObject = AbiItem[];
