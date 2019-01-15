// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';
import { of } from 'rxjs';
import { finalize, mapTo } from 'rxjs/operators';

import { distinctValues } from './distinctValues';

// Observable that fires twice
const fireTwice$ = () => of(0, 1);

it('should fire twice if values are different', done => {
  let numberOfTimesCalled = 0;
  fireTwice$()
    .pipe(
      finalize(() => {
        expect(numberOfTimesCalled).toEqual(2);
        done();
      })
    )
    .subscribe(() => {
      ++numberOfTimesCalled;
    });
});

/**
 * Test that distinctValues work on a specific value.
 *
 * @param value - A value to test.
 */
const testValue = (value: any, type: string) =>
  it(`should only fire once for ${type}`, done => {
    let numberOfTimesCalled = 0;
    fireTwice$()
      .pipe(
        mapTo(value),
        distinctValues(),
        finalize(() => {
          expect(numberOfTimesCalled).toEqual(1);
          done();
        })
      )
      .subscribe(() => {
        ++numberOfTimesCalled;
      });
  });

testValue(2, 'number');
testValue('foo', 'string');
testValue({ foo: 'bar' }, 'object');
testValue(new BigNumber(2), 'BigNumber');
testValue({ number: new BigNumber(2) }, 'Block');
