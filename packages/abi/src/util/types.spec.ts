// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { isArray, isString, isInstanceOf } from './types';
import Token from '../token';

describe('util/types', () => {
  describe('isArray', () => {
    it('correctly identifies empty arrays as Array', () => {
      expect(isArray([])).toBe(true);
    });

    it('correctly identifies non-empty arrays as Array', () => {
      expect(isArray([1, 2, 3])).toBe(true);
    });

    it('correctly identifies strings as non-Array', () => {
      expect(isArray('not an array')).toBe(false);
    });

    it('correctly identifies objects as non-Array', () => {
      expect(isArray({})).toBe(false);
    });
  });

  describe('isString', () => {
    it('correctly identifies empty string as string', () => {
      expect(isString('')).toBe(true);
    });

    it('correctly identifies string as string', () => {
      expect(isString('123')).toBe(true);
    });
  });

  describe('isInstanceOf', () => {
    it('correctly identifies build-in instanceof', () => {
      expect(isInstanceOf(new String('123'), String)).toBe(true);
    });

    it('correctly identifies own instanceof', () => {
      expect(isInstanceOf(new Token('int', 123), Token)).toBe(true);
    });

    it('correctly reports false for own', () => {
      expect(isInstanceOf({ type: 'int' }, Token)).toBe(false);
    });
  });
});
