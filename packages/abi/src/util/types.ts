// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as isHexNpm from 'is-hex';

export const isArray = (test: any): test is Array<any> => Array.isArray(test);

export const isError = (test: any): test is Error => test instanceof Error;

export const isFunction = (test: any): test is Function =>
  typeof test === 'function';

export const isHex = (test: any): boolean => isHexNpm(test);

export const isObject = (test: any): test is object => typeof test === 'object';

export const isString = (test: any): test is string => typeof test === 'string';

export const isInstanceOf = (test: any, clazz: any) => test instanceof clazz;
