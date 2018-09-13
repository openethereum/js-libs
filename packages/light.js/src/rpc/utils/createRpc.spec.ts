// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { timer } from 'rxjs';

import createRpc from './createRpc';
import { resolveApi } from '../../utils/testHelpers/mockApi';
import { setApi } from '../../api';

beforeAll(() => {
  setApi(resolveApi());
});

it('should return a function', () => {
  expect(typeof createRpc({})).toBe('function');
});

it('should add empty metadata by default', () => {
  expect(createRpc({})().metadata).toEqual({});
});

it('should append input metadata', () => {
  expect(createRpc({ name: 'bar' })().metadata).toEqual({
    name: 'bar'
  });
});

it('should contain frequencyMixins', () => {
  expect(typeof createRpc({})().setFrequency).toBe('function');
});

it('should set correct frequency', () => {
  const frequency = () => timer(0, 1000);
  const rpc$ = createRpc({})();
  rpc$.setFrequency([frequency]);
  expect(rpc$.metadata.frequency).toEqual([frequency]);
});
