// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { take } from 'rxjs/operators';

import frequency from './frequency';
import { FrequencyObservable, FrequencyKey, FrequencyMap } from '../types';
import isObservable from '../utils/isObservable';
import { resolveApi } from '../utils/testHelpers/mockApi';
import { setApi } from '@parity/light.js/src/api';

/**
 * Helper function to make basic tests for frequency$ observables.
 *
 * @ignore
 */
const testFrequency = (
  name: string,
  frequency$: FrequencyObservable<any>,
  resolveWith: any = 'foo'
) =>
  describe(`${name} frequency`, () => {
    beforeAll(() => {
      setApi(resolveApi(resolveWith));
    });

    it('should be an Observable', () => {
      expect(isObservable(frequency$())).toBe(true);
    });

    it('should be subscribable', () => {
      expect(() => frequency$().subscribe()).not.toThrow();
    });

    it('function should return the same Observable upon re-running (memoization)', () => {
      const initial$ = frequency$();
      expect(frequency$()).toBe(initial$);
    });

    it('should return values', done => {
      frequency$()
        .pipe(take(1))
        .subscribe(data => {
          expect(data).not.toBeNull();
          done();
        });
    });
  });

Object.keys(frequency).forEach(key =>
  testFrequency(
    key,
    (frequency as FrequencyMap)[key as FrequencyKey],
    key.includes('Account') ? ['foo'] : 4 // Give string[] for accounts pubsub, or number elsewhere
  )
);
