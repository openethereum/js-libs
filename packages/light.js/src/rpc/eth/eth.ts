// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Address, FrequencyMap } from '../../types';
import createRpc$ from '../utils/createRpc';
import { isNullOrLoading, RPC_LOADING } from '../../utils/isLoading';
import { switchMapPromise } from '../../utils/operators';

/**
 * Observable which contains the array of all addresses managed by the light
 * client.
 *
 * Calls eth_accounts.
 *
 * @param api - The Api object used to create this {@link RpcObservable}.
 * @param frequency - The FrequencyMap used to create this {@link RpcObservable}.
 * @return - An Observable containing the list of public addresses.
 */
export function accounts$(_: any, frequency: FrequencyMap) {
  return createRpc$<Address[], Address[]>({
    frequency: [frequency.onAccountsChanged$],
    name: 'accounts$'
  });
}

/**
 * Get the balance of a given account. Calls `eth_getBalance`.
 *
 * @param api - The Api object used to create this {@link RpcObservable}.
 * @param frequency - The FrequencyMap used to create this {@link RpcObservable}.
 * @return - An Observable containing the balance.
 */
export function balanceOf$(api: any, frequency: FrequencyMap) {
  return createRpc$<any, BigNumber>({
    calls: ['eth_getBalance'],
    frequency: [frequency.onEveryBlock$, frequency.onStartup$],
    name: 'balanceOf$',
    pipes: (address: Address) => [
      switchMapPromise(() => api.eth.getBalance(address))
    ]
  });
}

/**
 * Get the default account managed by the light client.
 *
 * @param api - The Api object used to create this {@link RpcObservable}.
 * @param frequency - The FrequencyMap used to create this {@link RpcObservable}.
 * @return - An Observable containing the public address
 * of the default account.
 */
export function defaultAccount$(api: any, frequency: FrequencyMap) {
  return createRpc$<Address[], Address>({
    dependsOn: accounts$(api, frequency),
    name: 'defaultAccount$',
    pipes: () => [map(accounts => accounts[0])]
  });
}

/**
 * Get the current block number.
 *
 * @param api - The Api object used to create this {@link RpcObservable}.
 * @param frequency - The FrequencyMap used to create this {@link RpcObservable}.
 * @return {Observable<Number>} - An Observable containing the block height.
 */
export function blockNumber$(_: any, frequency: FrequencyMap) {
  return createRpc$<BigNumber, BigNumber>({
    frequency: [frequency.onEveryBlock$],
    name: 'blockNumber$'
  });
}

/**
 * Shorthand for fetching the current account's balance.
 */
export function myBalance$(api: any, frequency: FrequencyMap) {
  return createRpc$<Address, BigNumber | Symbol>({
    calls: [`eth_getBalance`],
    dependsOn: defaultAccount$(api, frequency),
    name: 'myBalance$',
    pipes: () => [
      switchMap(
        defaultAccount =>
          isNullOrLoading(defaultAccount)
            ? of(RPC_LOADING)
            : balanceOf$(api, frequency)(defaultAccount)
      )
    ]
  });
}

/**
 * Get the syncStatus state.
 *
 * @param api - The Api object used to create this {@link RpcObservable}.
 * @param frequency - The FrequencyMap used to create this {@link RpcObservable}.
 * @return - An Observable containing the syncing state object, or false.
 */
export function syncStatus$(_: any, frequency: FrequencyMap) {
  return createRpc$<object | boolean, object | boolean>({
    frequency: [frequency.onSyncingChanged$],
    name: 'syncStatus$'
  });
}
