// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Address } from '../../types';
import api from '../../api';
import createRpc$ from '../utils/createRpc';
import { isNullOrLoading, RPC_LOADING } from '../../utils/isLoading';
import {
  onAccountsChanged$,
  onEveryBlock$,
  onStartup$,
  onSyncingChanged$
} from '../../frequency';
import { switchMapPromise } from '../../utils/operators';

/**
 * Observable which contains the array of all addresses managed by the light
 * client.
 *
 * Calls eth_accounts.
 *
 * @return - An Observable containing the list of public addresses.
 */
export const accounts$ = createRpc$<Address[], Address[]>({
  frequency: [onAccountsChanged$],
  name: 'accounts$'
});

/**
 * Get the balance of a given account. Calls `eth_getBalance`.
 *
 * @param address - The account address to query the balance.
 * @return - An Observable containing the balance.
 */
export const balanceOf$ = createRpc$<any, BigNumber>({
  calls: ['eth_getBalance'],
  frequency: [onEveryBlock$, onStartup$],
  name: 'balanceOf$',
  pipes: (address: Address) => [
    switchMapPromise(() => api().eth.getBalance(address))
  ]
});

/**
 * Get the default account managed by the light client.
 *
 * @return - An Observable containing the public address
 * of the default account.
 */
export const defaultAccount$ = createRpc$<Address[], Address>({
  dependsOn: accounts$,
  name: 'defaultAccount$',
  pipes: () => [map(accounts => accounts[0])]
});

/**
 * Get the current block number.
 *
 * @return {Observable<Number>} - An Observable containing the block height.
 */
export const blockNumber$ = createRpc$<BigNumber, BigNumber>({
  frequency: [onEveryBlock$],
  name: 'blockNumber$'
});

/**
 * Shorthand for fetching the current account's balance.
 */
export const myBalance$ = createRpc$<Address, BigNumber>({
  calls: [`eth_getBalance`],
  dependsOn: defaultAccount$,
  name: 'myBalance$',
  pipes: () => [
    switchMap(
      defaultAccount =>
        isNullOrLoading(defaultAccount)
          ? of(RPC_LOADING)
          : balanceOf$(defaultAccount)
    )
  ]
});

/**
 * Get the syncStatus state.
 *
 * @return - An Observable containing the syncing state object, or false.
 */
export const syncStatus$ = createRpc$<object | boolean, object | boolean>({
  frequency: [onSyncingChanged$],
  name: 'syncStatus$'
});
