// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { createFrequencyMap } from '../../light';
import isObservable from '../isObservable';
import { resolveApi } from './mockApi';
import { RpcObservable, FrequencyMap } from '../../types';

/**
 * Helper function to make basic tests for RpcObservables.
 *
 * @ignore
 */
const testRpc = (
  name: string,
  rpc: (api: any, frequency: FrequencyMap) => RpcObservable<any, any>
) => {
  const api = resolveApi();
  const frequency = createFrequencyMap(api);
  const rpc$ = rpc(api, frequency);

  describe(`${name} rpc`, () => {
    it('should be a function', () => {
      expect(typeof rpc$).toBe('function');
    });

    it('function should return an Observable', () => {
      expect(isObservable(rpc$())).toBe(true);
    });

    it('function result Observable should be subscribable', () => {
      expect(() => rpc$().subscribe()).not.toThrow();
    });

    it('function should return the same Observable upon re-running (memoization)', () => {
      const initial$ = rpc$();
      expect(rpc$()).toBe(initial$);
    });

    it('should contain a `metadata` field', () => {
      expect(rpc$.metadata).toBeTruthy();
    });

    it('should either contain a `frequency` or `dependsOn` field in metadata', () => {
      const { metadata } = rpc$;
      expect(
        (metadata.frequency && metadata.frequency.length) || metadata.dependsOn
      ).toBeTruthy();
    });
  });
};

export default testRpc;
