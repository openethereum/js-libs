// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

const HEXDIGITS = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f'
];

export const isArray = (input: any): input is Array<any> =>
  Array.isArray(input);

export const isError = (input: any): input is Error => input instanceof Error;

export const isFunction = (input: any): input is Function =>
  typeof input === 'function';

export const isHex = (input: any): boolean => {
  if (!isString(input)) {
    return false;
  }

  if (input.substr(0, 2) === '0x') {
    return isHex(input.slice(2));
  }

  const lowerCaseInput = input.toLowerCase();
  let hex = true;

  for (let index = 0; hex && index < input.length; index++) {
    hex = HEXDIGITS.includes(lowerCaseInput[index]);
  }

  return hex;
};
export const isObject = (input: any): input is object =>
  Object.prototype.toString.call(input) === '[object Object]';

export const isString = (input: any): input is string =>
  typeof input === 'string';

export const isInstanceOf = (input: any, clazz: any) => input instanceof clazz;
