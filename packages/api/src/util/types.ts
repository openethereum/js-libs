// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

import * as isHexNpm from 'is-hex';

export const isArray = (test: any): test is Array<any> => Array.isArray(test);

export const isError = (test: any): test is Error => test instanceof Error;

export const isFunction = (test: any): test is Function =>
  typeof test === 'function';

export const isHex = (test: any): boolean => isHexNpm(test);

export const isObject = (test: any): test is object => typeof test === 'object';

export const isString = (test: any): test is string => typeof test === 'string';

export const isInstanceOf = (test: any, clazz: any) => test instanceof clazz;
