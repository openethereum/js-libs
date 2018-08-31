// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as apiutil from '@parity/api/lib/util';

import { ContractInstance } from '../types';

/**
 * @ignore
 */
const mockApi = (instance: ContractInstance) => ({
  eth: {
    getCode: jest.fn(() => Promise.resolve('0x123456'))
  },
  parity: {
    registryAddress: jest.fn(() => Promise.resolve('testRegistryAddress'))
  },
  util: apiutil,
  newContract: jest.fn(() => ({ instance }))
});

export default mockApi;
