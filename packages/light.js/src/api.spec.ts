// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { getApi, NullProvider, setApi, setProvider } from './api';
import { resolveApi } from './utils/testHelpers/mockApi';

it('should return the Null provider', () => {
  expect(getApi().provider instanceof NullProvider).toBe(true);
});

it('should correctly set a new api', () => {
  const api = resolveApi();
  setApi(api);
  expect(getApi()).toBe(api);
});

it('should correctly set a new provider', () => {
  const provider = new NullProvider();
  setProvider(provider);
  expect(getApi().provider).toBe(provider);
});
