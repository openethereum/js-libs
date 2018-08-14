// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { of } from 'rxjs';

import isObservable from './isObservable';

/**
 * Helper function to test isObservable.
 *
 * @param {String} name - A friendly name to show what we are testing.
 * @param {Any} input - The input to the isObservable function.
 * @param {Boolean} expected - The expected output.
 */
const testIsObservable = (name, input, expected) => {
  it(`should return ${expected} for a ${name}`, () => {
    expect(isObservable(input)).toBe(expected);
  });
};

testIsObservable('Observable', of(1), true);
testIsObservable('function', () => null, false);
testIsObservable('object', {}, false);
testIsObservable('null', null, false);
