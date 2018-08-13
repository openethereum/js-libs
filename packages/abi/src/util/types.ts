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

export const isArray = (test: any): test is Array<any> => Array.isArray(test);

export const isError = (test: any): test is Error => test instanceof Error;

export const isFunction = (test: any): test is Function =>
  typeof test === 'function';

export const isHex = (test: any): boolean => {
  if (!isString(test)) {
    return false;
  }

  if (test.substr(0, 2) === '0x') {
    return isHex(test.slice(2));
  }

  const lowerCaseTest = test.toLowerCase();
  let hex = true;

  for (let index = 0; hex && index < test.length; index++) {
    hex = HEXDIGITS.includes(lowerCaseTest[index]);
  }

  return hex;
};
export const isObject = (test: any): test is object => typeof test === 'object';

export const isString = (test: any): test is string => typeof test === 'string';

export const isInstanceOf = (test: any, clazz: any) => test instanceof clazz;
