// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';
import { concat, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';

import { distinctValues } from './distinctValues';

// Observable that fires 2 times
const fireTwice$ = () => concat(of(0), of(1));

/**
 * Test that distinctValues work on a specific value.
 *
 * @param value - A value to test
 */
const testValue = (value: any, type: string) =>
  it('should only fire once for `type`', done => {
    let numberOfTimesCalled = 0;
    fireTwice$()
      .pipe(
        mapTo(value),
        distinctValues()
      )
      .subscribe(() => {
        ++numberOfTimesCalled;
      });
    setTimeout(() => {
      expect(numberOfTimesCalled).toEqual(1);
      done();
    }, 100);
  });

testValue(2, 'number');
testValue('foo', 'string');
testValue({ foo: 'bar' }, 'object');
testValue(new BigNumber(2), 'BigNumber');

it('should only fire twice for difference values', done => {
  let numberOfTimesCalled = 0;
  fireTwice$().subscribe(() => {
    ++numberOfTimesCalled;
  });
  setTimeout(() => {
    expect(numberOfTimesCalled).toEqual(2);
    done();
  }, 100);
});
