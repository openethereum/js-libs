// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import isObservable from '../isObservable';

/**
 * Helper function to make basic tests for frequency$ observables.
 *
 * @ignore
 */
const testFrequency = (name, frequency$) =>
  describe(`${name} rpc`, () => {
    it('should be an Observable', () => {
      expect(isObservable(frequency$)).toBe(true);
    });

    it('should be subscribable', () => {
      expect(() => frequency$.subscribe()).not.toThrow();
    });

    it('should contain a `metadata` field', () => {
      expect(frequency$.metadata).toBeTruthy();
    });

    it('should contain `name` in metadata', () => {
      const { metadata } = frequency$;
      expect(metadata.name).toBeTruthy();
    });
  });

export default testFrequency;
