// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as Api from '@parity/api';

import { getApi, setApi, setProvider } from './api';
import { resolveApi } from './utils/testHelpers/mockApi';

it('should return the Null provider', () => {
  expect(getApi).toThrow();
});

it('should correctly set a new api', () => {
  const api = resolveApi();
  setApi(api);
  expect(getApi()).toBe(api);
});

it('should correctly set a new provider', () => {
  const provider = new Api.Provider.Ws('ws://127.0.0.1:8546');
  setProvider(provider);
  expect(getApi().provider).toBe(provider);
});
