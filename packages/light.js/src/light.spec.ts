// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { Observable } from 'rxjs';

import { FrequencyKey, RpcKey } from './types';
import Light, { createRpcMap, createFrequencyMap } from './light';
import { MockProvider, resolveApi } from './utils/testHelpers/mockApi';

const api = resolveApi();
const frequencyMap = createFrequencyMap(api);
const rpcMap = createRpcMap(api, frequencyMap);
const light = new Light(new MockProvider());

it('should correctly put all frequencies in createFrequencyMap', () => {
  expect(Object.keys(frequencyMap).sort()).toEqual([
    'onAccountsChanged$',
    'onAccountsInfoChanged$',
    'onEvery2Blocks$',
    'onEvery2Seconds$',
    'onEvery4Blocks$',
    'onEvery5Seconds$',
    'onEveryBlock$',
    'onEverySecond$',
    'onStartup$',
    'onSyncingChanged$'
  ]);
});

it('should have each object in frequencyMap as a FrequencyObservable', () => {
  Object.values(frequencyMap).forEach(f => {
    expect(f).toBeInstanceOf(Observable);
  });
});

it('should correctly put all rpcs in createRpcMap', () => {
  expect(Object.keys(rpcMap).sort()).toEqual([
    'accounts$',
    'accountsInfo$',
    'balanceOf$',
    'blockNumber$',
    'chainName$',
    'defaultAccount$',
    'makeContract',
    'myBalance$',
    'peerCount$',
    'post$',
    'syncStatus$'
  ]);
});

it('should have an api field', () => {
  expect(light).toHaveProperty('api');
});

it('should have a correct frequency field', () => {
  Object.keys(frequencyMap).forEach(frequency => {
    expect(light.frequency[frequency as FrequencyKey]).toBeTruthy();
  });
});

it('should have all rpc$ as methods', () => {
  Object.keys(rpcMap).forEach(rpc => {
    expect(light[rpc as RpcKey]).toBeTruthy();
  });
});
