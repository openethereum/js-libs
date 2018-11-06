// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as Api from '@parity/api';

import isObservable from '../utils/isObservable';
import {
  MockProvider,
  rejectApi,
  resolveApi
} from '../utils/testHelpers/mockApi';
import rpc from './rpc';
import { RpcKey, RpcMap, RpcObservable } from '../types';
import { setApi } from '../api';

jest.mock('@parity/api');
Api.mockImplementation(() => resolveApi());

/**
 * Helper function to make basic tests for RpcObservables.
 *
 * @ignore
 */
const testRpc = (name: string, rpc$: RpcObservable<any, any>) =>
  describe(`${name} rpc`, () => {
    beforeEach(() => {
      setApi(resolveApi());
    });

    it('should be a function', () => {
      expect(typeof rpc$).toBe('function');
    });

    it('should return an Observable', () => {
      expect(isObservable(rpc$({}))).toBe(true);
    });

    it('result Observable should be subscribable', () => {
      expect(() => rpc$({}).subscribe()).not.toThrow();
    });

    it('result Observable should return values', done => {
      rpc$({}).subscribe(data => {
        expect(data).not.toBeNull();
        done();
      });
    });

    // Memoization tests don't concern post$
    if (name === 'post$') {
      return;
    }

    it('should return the same Observable upon re-running (memoization)', () => {
      const initial$ = rpc$();
      expect(rpc$()).toBe(initial$);
    });

    it('should not return the same Observable if we change Api', () => {
      const initial$ = rpc$();
      setApi(rejectApi());
      expect(rpc$()).not.toBe(initial$);
    });

    it('should not return the same Observable if options are passed', () => {
      const initial$ = rpc$();
      expect(rpc$({ provider: new MockProvider() })).not.toBe(initial$);
    });

    it('should return the same Observable if same options are passed', () => {
      const provider = new MockProvider();
      const initial$ = rpc$({ provider });
      expect(rpc$({ provider })).toBe(initial$);
    });
  });

Object.keys(rpc).forEach(key => testRpc(key, (rpc as RpcMap)[key as RpcKey]));
