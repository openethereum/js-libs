// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';
import { map, switchMap } from 'rxjs/operators';

import { Address, Block, RpcObservableOptions } from '../types';
import createRpc$ from './utils/createRpc';
import frequency from '../frequency';
import { switchMapPromise } from '../utils/operators';

/**
 * Observable containing the EIP155 chain ID used for transaction signing.
 * Calls `eth_chainId`
 *
 * @param options - Options to pass to {@link RpcObservableOptions}.
 * @return - An Observable containing the chain ID.
 */
export function chainId$ (options?: RpcObservableOptions) {
  return createRpc$<any, BigNumber | Symbol>({
    calls: ['eth_chainId'],
    frequency: [frequency.onStartup$],
    name: 'chainId$',
    pipes: api => [switchMapPromise(() => api.eth.chainId())]
  })(options)();
}

/**
 * Observable which contains the array of all addresses managed by the light
 * client.
 *
 * Calls eth_accounts.
 *
 * @param options - Options to pass to {@link RpcObservableOptions}.
 * @return - An Observable containing the list of public addresses.
 */
export function accounts$ (options?: RpcObservableOptions) {
  return createRpc$<Address[], Address[]>({
    frequency: [frequency.onAccountsChanged$],
    name: 'accounts$'
  })(options)();
}

/**
 * Get the balance of a given account. Calls `eth_getBalance`.
 *
 * @param address - The account address to query the balance.
 * @param options - Options to pass to {@link RpcObservableOptions}.
 * @return - An Observable containing the balance.
 */
export function balanceOf$ (address: Address, options?: RpcObservableOptions) {
  return createRpc$<any, BigNumber | Symbol>({
    calls: ['eth_getBalance'],
    frequency: [frequency.onEveryBlock$, frequency.onStartup$],
    name: 'balanceOf$',
    pipes: api => [switchMapPromise(() => api.eth.getBalance(address))]
  })(options)(address);
}

/**
 * Get the transaction count of a given account. Calls `eth_getTransactionCount`
 *
 * @param address - Address of the account whose transaction count we want to query.
 * @param options - Options to pass to {@link RpcObservableOptions}.
 * @return - An Observable containing the transaction count.
 */
export function transactionCountOf$ (address: Address, options?: RpcObservableOptions) {
  return createRpc$<any, BigNumber | Symbol>({
    calls: ['eth_getTransactionCount'],
    frequency: [frequency.onEveryBlock$, frequency.onStartup$],
    name: 'transactionCountOf$',
    pipes: api => [switchMapPromise(() => api.eth.getTransactionCount(address))]
  })(options)(address);
}

/**
 * Get the default account managed by the light client.
 *
 * @param options - Options to pass to {@link RpcObservableOptions}.
 * @return - An Observable containing the public address
 * of the default account.
 */
export function defaultAccount$ (options?: RpcObservableOptions) {
  return createRpc$<Address[], Address>({
    dependsOn: accounts$,
    name: 'defaultAccount$',
    pipes: () => [map(accounts => accounts[0])]
  })(options)();
}

/**
 * Get the current block number.
 *
 * @return {Observable<Number>} - An Observable containing the block height.
 */
export function blockNumber$ (options?: RpcObservableOptions) {
  return createRpc$<Block, BigNumber>({
    frequency: [frequency.onEveryBlock$],
    name: 'blockNumber$',
    pipes: () => [map(block => block.number)]
  })(options)();
}

/**
 * Shorthand for fetching the current account's balance.
 */
export function myBalance$ (options?: RpcObservableOptions) {
  return createRpc$<Address, BigNumber | Symbol>({
    calls: [`eth_getBalance`],
    dependsOn: defaultAccount$,
    name: 'myBalance$',
    pipes: () => [
      switchMap(defaultAccount =>
        balanceOf$(defaultAccount)
      )
    ]
  })(options)();
}

/**
 * Get the syncStatus state.
 *
 * @return - An Observable containing the syncing state object, or false.
 */
export function syncStatus$ (options?: RpcObservableOptions) {
  return createRpc$<object | boolean, object | boolean>({
    frequency: [frequency.onSyncingChanged$],
    name: 'syncStatus$'
  })(options)();
}
