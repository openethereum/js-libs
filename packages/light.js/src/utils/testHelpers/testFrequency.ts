// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { FrequencyObservable } from '../../types';
import isObservable from '../isObservable';
import { rejectApi, resolveApi } from './mockApi';

/**
 * Helper function to make basic tests for frequency observables.
 *
 * @ignore
 */
const testFrequency = (
  name: string,
  frequency: (api: any) => FrequencyObservable<any>
) =>
  describe(`${name} rpc`, () => {
    it('should be an Observable', () => {
      expect(isObservable(frequency(resolveApi))).toBe(true);
      expect(isObservable(frequency(rejectApi))).toBe(true);
    });

    it('should be subscribable', () => {
      expect(() => frequency(resolveApi).subscribe()).not.toThrow();
      expect(() => frequency(rejectApi).subscribe()).not.toThrow();
    });

    it('should contain a `metadata` field', () => {
      expect(frequency(resolveApi).metadata).toBeTruthy();
      expect(frequency(rejectApi).metadata).toBeTruthy();
    });

    it('should contain `name` in metadata', () => {
      const { metadata } = frequency(resolveApi);
      expect(metadata.name).toBeTruthy();
    });
  });

export default testFrequency;
