// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as Api from '@parity/api';
import { take } from 'rxjs/operators';

import frequency from './frequency';
import { FrequencyObservable, FrequencyKey, FrequencyMap } from '../types';
import isObservable from '../utils/isObservable';
import {
  MockProvider,
  rejectApi,
  resolveApi
} from '../utils/testHelpers/mockApi';
import { setApi } from '@parity/light.js/src/api';

jest.mock('@parity/api');
Api.mockImplementation(() => resolveApi('4'));

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
    beforeEach(() => {
      setApi(resolveApi(resolveWith));
    });

    it('should be an Observable', () => {
      expect(isObservable(frequency$())).toBe(true);
    });

    it('should be subscribable', () => {
      expect(() => frequency$().subscribe()).not.toThrow();
    });

    it('should return the same Observable upon re-running (memoization)', () => {
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

    // Only the following FrequencyObservables are concerned with API changing
    if (
      [
        'onAccountsChanged',
        'onAccountsInfoChanged',
        'onEveryBlock$',
        'onEvery2Blocks$',
        'onSyncingChanged'
      ].includes(name)
    ) {
      it('should not return the same Observable if we change Api in between', () => {
        const initial$ = frequency$();
        setApi(rejectApi());
        expect(frequency$()).not.toBe(initial$);
      });

      it('should not return the same Observable if options are passed', () => {
        const initial$ = frequency$();
        expect(frequency$({ provider: new MockProvider() })).not.toBe(initial$);
      });

      it('should return the same Observable if same options are passed', () => {
        const provider = new MockProvider();
        const initial$ = frequency$({ provider });
        expect(frequency$({ provider })).toBe(initial$);
      });
    }
  });

Object.keys(frequency).forEach(key =>
  testFrequency(
    key,
    (frequency as FrequencyMap)[key as FrequencyKey],
    key.includes('Account') ? ['foo'] : 4 // Give string[] for accounts pubsub, or number elsewhere
  )
);
