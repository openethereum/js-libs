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
 * @return - An Observable containing the list of public addresses.
 */
export const accounts$ = (_: any, frequency: FrequencyMap) =>
  createRpc$<Address[], Address[]>({
    frequency: [frequency.onAccountsChanged$],
    name: 'accounts$'
  });

/**
 * Get the balance of a given account. Calls `eth_getBalance`.
 *
 * @param address - The account address to query the balance.
 * @return - An Observable containing the balance.
 */
export const balanceOf$ = (api: any, frequency: FrequencyMap) =>
  createRpc$<any, BigNumber>({
    calls: ['eth_getBalance'],
    frequency: [frequency.onEveryBlock$, frequency.onStartup$],
    name: 'balanceOf$',
    pipes: (address: Address) => [
      switchMapPromise(() => api.eth.getBalance(address))
    ]
  });

/**
 * Get the default account managed by the light client.
 *
 * @return - An Observable containing the public address
 * of the default account.
 */
export const defaultAccount$ = (api: any, frequency: FrequencyMap) =>
  createRpc$<Address[], Address>({
    dependsOn: accounts$(api, frequency),
    name: 'defaultAccount$',
    pipes: () => [map(accounts => accounts[0])]
  });

/**
 * Get the current block number.
 *
 * @return {Observable<Number>} - An Observable containing the block height.
 */
export const blockNumber$ = (_: any, frequency: FrequencyMap) =>
  createRpc$<BigNumber, BigNumber>({
    frequency: [frequency.onEveryBlock$],
    name: 'blockNumber$'
  });

/**
 * Shorthand for fetching the current account's balance.
 */
export const myBalance$ = (api: any, frequency: FrequencyMap) =>
  createRpc$<Address, BigNumber | Symbol>({
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

/**
 * Get the syncStatus state.
 *
 * @return - An Observable containing the syncing state object, or false.
 */
export const syncStatus$ = (_: any, frequency: FrequencyMap) =>
  createRpc$<object | boolean, object | boolean>({
    frequency: [frequency.onSyncingChanged$],
    name: 'syncStatus$'
  });
