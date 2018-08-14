// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { getApi, setApi } from './api';
import { resolveApi } from './utils/testHelpers/mockApi';

it('should return the default Api object', () => {
  expect(getApi().provider._url).toBe('ws://localhost:8546');
});

it('should correctly set a new Api', () => {
  const mockApi = resolveApi(undefined, false); // Pubsub
  setApi(mockApi);
  expect(getApi()).toBe(mockApi);
});

it('should correctly set a new Api', () => {
  const mockApi = resolveApi(undefined, false); // Not pubsub
  setApi(mockApi);
  expect(getApi()).toBe(mockApi);
});
