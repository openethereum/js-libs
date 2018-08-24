// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { getApi, NullProvider, setProvider } from './api';
import { resolveApi } from './utils/testHelpers/mockApi';

it('should return the Null provider', () => {
  expect(getApi().provider instanceof NullProvider).toBe(true);
});

it('should correctly set a new Api', () => {
  const mockApi = resolveApi(undefined, false); // Pubsub
  setProvider(mockApi);
  expect(getApi()).toBe(mockApi);
});

it('should correctly set a new Api', () => {
  const mockApi = resolveApi(undefined, false); // Not pubsub
  setProvider(mockApi);
  expect(getApi()).toBe(mockApi);
});
