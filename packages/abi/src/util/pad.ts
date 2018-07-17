// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';
import { encode } from 'utf8';

import { Bytes } from '../types';
import { isArray } from './types';

const ZERO_64 =
  '0000000000000000000000000000000000000000000000000000000000000000';

/**
 * Pad an address with zeros on the left.
 *
 * @param input - The input address to pad.
 */
export const padAddress = (input: string) => {
  const inputWithout0x = input.startsWith('0x') ? input.substr(2) : input;

  return `${ZERO_64}${inputWithout0x}`.slice(-64);
};

/**
 * Pad a boolean with zeros on the left.
 *
 * @param input - The input address to pad.
 */
export const padBool = (input: boolean) => {
  return `${ZERO_64}${input ? '1' : '0'}`.slice(-64);
};

/**
 * Pad a u32 with zeros on the left.
 *
 * @param input - The input address to pad.
 */
export const padU32 = (input: string | number | BigNumber) => {
  let bn = new BigNumber(input);

  if (bn.isLessThan(0)) {
    bn = new BigNumber(
      'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
      16
    )
      .plus(bn)
      .plus(1);
  }

  return `${ZERO_64}${bn.toString(16)}`.slice(-64);
};

/**
 * Convert an input string to bytes.
 *
 * @param input - The input string to convert.
 */
export const stringToBytes = (input: string | Bytes) => {
  if (isArray(input)) {
    return <Bytes>input;
  } else if ((<string>input).startsWith('0x')) {
    const matches =
      (<string>input)
        .substr(2)
        .toLowerCase()
        .match(/.{1,2}/g) || [];

    return matches.map(value => parseInt(value, 16));
  } else {
    return (<string>input).split('').map(char => char.charCodeAt(0));
  }
};

/**
 * Pad bytes with zeros on the left.
 *
 * @param input - The input bytes to pad.
 */
export const padBytes = (input: string | Bytes) => {
  const inputBytes = stringToBytes(input);

  return `${padU32(inputBytes.length)}${padFixedBytes(inputBytes)}`;
};

/**
 * Pad fixed bytes.
 *
 * @param input - Input bytes to pad.
 */
export const padFixedBytes = (input: string | Bytes) => {
  const inputBytes = stringToBytes(input);
  const sinput = inputBytes
    .map(code => `0${code.toString(16)}`.slice(-2))
    .join('');
  const max = Math.floor((sinput.length + 63) / 64) * 64;

  return `${sinput}${ZERO_64}`.substr(0, max);
};

/**
 * Pad string.
 *
 * @param input - String to pad.
 */
export const padString = (input: string) => {
  const array = encode(input)
    .split('')
    .map(char => char.charCodeAt(0));

  return padBytes(array);
};
