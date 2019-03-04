// Copyright 2015-2019 Parity Technologies (UK) Ltd.
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
import sleep from '../utils/testHelpers/sleep';

/*
 * Mock the Api of the RPC dependencies' observables
 *
 * Needed because the RPC observable passes the provider of the api (set e.g.
 * using setApi) to its RPC dependencies (e.g. frequency), which in turn call
 * createApiFromProvider to create a new Api based on that provider. Even if
 * the Api of the initial RPC observable is mocked, the Api from the dependency
 * observable isn't mocked as it is created from the provider, using @parity/api
 * Since we want to mock the Api and not just the provider for the dependencies,
 * we have to mock @parity/api
 * */
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
      // Mock the Api of the RPC observables (however, doesn't mock the Api of
      // their dependencies' observables)
      setApi(resolveApi());
    });

    const options = name === 'post$' ? { passphrase: 'passphrase' } : {};

    it('should be a function', () => {
      expect(typeof rpc$).toBe('function');
    });

    it('should return an Observable', () => {
      expect(isObservable(rpc$({}, options))).toBe(true);
    });

    it('result Observable should be subscribable', () => {
      expect(() => rpc$({}, options).subscribe()).not.toThrow();
    });

    it('result Observable should return values', done => {
      rpc$({}, options).subscribe(data => {
        expect(data).not.toBeNull();
        done();
      });
    });

    // Memoization tests don't concern post$
    if (name === 'post$' || name === 'postRaw$') {
      return;
    }
  });

Object.keys(rpc).forEach(key => testRpc(key, (rpc as RpcMap)[key as RpcKey]));
