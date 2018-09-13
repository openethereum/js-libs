// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import isObservable from '../utils/isObservable';
import { resolveApi } from '../utils/testHelpers/mockApi';
import rpc from './rpc';
import { RpcKey, RpcMap, RpcObservable } from '../types';
import { setApi } from '../api';

/**
 * Helper function to make basic tests for RpcObservables.
 *
 * @ignore
 */
const testRpc = (name: string, rpc$: RpcObservable<any, any>) =>
  describe(`${name} rpc`, () => {
    beforeAll(() => {
      setApi(resolveApi());
    });

    it('should be a function', () => {
      expect(typeof rpc$).toBe('function');
    });

    it('function should return an Observable', () => {
      expect(isObservable(rpc$({}))).toBe(true);
    });

    it('function result Observable should be subscribable', () => {
      expect(() => rpc$({}).subscribe()).not.toThrow();
    });

    it('function result Observable should return values', done => {
      rpc$({}).subscribe(data => {
        expect(data).toBeTruthy();
        done();
      });
    });

    it('function should return the same Observable upon re-running (memoization)', () => {
      const initial$ = rpc$();
      expect(rpc$()).toBe(initial$);
    });

    it('function should not return the same Observable if options are passed', () => {
      const initial$ = rpc$();
      expect(rpc$({ withoutLoading: true })).not.toBe(initial$);
    });

    it('function should return the same Observable if same options are passed', () => {
      const initial$ = rpc$({ withoutLoading: true });
      expect(rpc$({ withoutLoading: true })).toBe(initial$);
    });
  });

Object.keys(rpc).forEach(key => testRpc(key, (rpc as RpcMap)[key as RpcKey]));
