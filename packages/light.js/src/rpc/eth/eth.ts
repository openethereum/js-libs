// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Address } from '../../types';
import api from '../../api';
import createRpc$ from '../utils/createRpc';
import getFrequency from '../utils/getFrequency';
import { isNullOrLoading, RPC_LOADING } from '../../utils/isLoading';
import {
  onAccountsChanged$,
  onEvery2Blocks$,
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
 * @return {Observable<Array<String>>} - An Observable containing the list of
 * public addresses.
 */
export const accounts$ = createRpc$<Address[]>({
  calls: ['eth_accounts'],
  frequency: [onAccountsChanged$]
})(() => getFrequency(accounts$));

/**
 * Get the balance of a given account. Calls `eth_getBalance`.
 *
 * @param {String} address - The account address to query the balance.
 * @return {Observable<BigNumber>} - An Observable containing the balance.
 */
export const balanceOf$ = createRpc$<Object>({
  calls: ['eth_getBalance'],
  frequency: [onEvery2Blocks$, onStartup$]
})((address: Address) =>
  getFrequency(balanceOf$).pipe(
    switchMapPromise(() => api().eth.getBalance(address))
  )
);

/**
 * Get the default account managed by the light client.
 *
 * @return {Observable<Address>} - An Observable containing the public address
 * of the default account.
 */
export const defaultAccount$ = createRpc$<Address>({
  dependsOn: ['accounts$']
})(() => accounts$().pipe(map(accounts => accounts[0])));

/**
 * Get the current block height.
 *
 * @return {Observable<Number>} - An Observable containing the block height.
 */
export const height$ = createRpc$<number>({ frequency: [onEveryBlock$] })(() =>
  getFrequency(height$)
);

/**
 * Alias for {@link height$}.
 *
 * @return {Observable<Number>} - An Observable containing the block height.
 */
export const blockNumber$ = createRpc$<number>({ dependsOn: ['height$'] })(() =>
  height$()
);

/**
 * Alias for {@link defaultAccount$}.
 *
 * @return {Observable<Address>} - An Observable containing the public address
 * of the default account.
 */
export const me$ = createRpc$<Address>({
  dependsOn: ['defaultAccount$']
})(() => defaultAccount$());

/**
 * Shorthand for fetching the current account's balance.
 */
export const myBalance$ = createRpc$<Object>({
  dependsOn: ['balanceOf$', 'defaultAccount$']
})(() =>
  defaultAccount$().pipe(
    switchMap(
      defaultAccount =>
        isNullOrLoading(defaultAccount)
          ? of(RPC_LOADING)
          : balanceOf$(defaultAccount)
    )
  )
);

/**
 * Get the syncing state.
 *
 * @return {Observable<Object | Boolean>} - An Observable containing the
 * syncing state object, or false.
 */
export const syncing$ = createRpc$<Object | boolean>({
  frequency: [onSyncingChanged$]
})(() => getFrequency(syncing$));
