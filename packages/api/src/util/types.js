// Copyright 2015-2018 Parity Technologies (UK) Ltd.
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

const HEXDIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

function isArray (test) {
  return Object.prototype.toString.call(test) === '[object Array]';
}

function isError (test) {
  return Object.prototype.toString.call(test) === '[object Error]';
}

function isFunction (test) {
  return Object.prototype.toString.call(test) === '[object Function]';
}

function isHex (_test) {
  if (!isString(_test)) {
    return false;
  }

  if (_test.substr(0, 2) === '0x') {
    return isHex(_test.slice(2));
  }

  const test = _test.toLowerCase();
  let hex = true;

  for (let index = 0; hex && index < test.length; index++) {
    hex = HEXDIGITS.includes(test[index]);
  }

  return hex;
}

function isObject (test) {
  return Object.prototype.toString.call(test) === '[object Object]';
}

function isString (test) {
  return Object.prototype.toString.call(test) === '[object String]';
}

function isInstanceOf (test, clazz) {
  return test instanceof clazz;
}

module.exports = {
  isArray,
  isError,
  isFunction,
  isHex,
  isInstanceOf,
  isObject,
  isString
};
