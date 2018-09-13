// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { createApiFromProvider } from '../api';
import frequency from './frequency';
import { FrequencyObservable, FrequencyKey, FrequencyMap } from '../types';
import isObservable from '../utils/isObservable';
import { resolveApi } from '../utils/testHelpers/mockApi';

/**
 * Helper function to make basic tests for frequency$ observables.
 *
 * @ignore
 */
const testFrequency = (name: string, frequency$: FrequencyObservable<any>) =>
  describe(`${name} rpc`, () => {
    it('should be an Observable', () => {
      expect(isObservable(frequency$())).toBe(true);
    });

    it('should be subscribable', () => {
      expect(() => frequency$().subscribe()).not.toThrow();
    });

    it('should contain a `metadata` field', () => {
      expect(frequency$.metadata).toBeTruthy();
    });

    it('should contain `name` in metadata', () => {
      const { metadata } = frequency$;
      expect(metadata.name).toBeTruthy();
    });
  });

Object.keys(frequency).forEach(key =>
  testFrequency(key, (frequency as FrequencyMap)[key as FrequencyKey])
);
