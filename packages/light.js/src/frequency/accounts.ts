// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { AccountsInfo, Address, FrequencyObservableOptions } from '../types';
import createPubsubObservable from './utils/createPubsubObservable';

/**
 * Observable that emits each time the default account changes
 *
 * @param options - Options to pass to {@link FrequencyObservable}.
 */
export function onAccountsChanged$ (options?: FrequencyObservableOptions) {
  return createPubsubObservable<Address[]>('eth_accounts', options);
}

/**
 * Observable that emits each time the default account changes
 *
 * @param options - Options to pass to {@link FrequencyObservable}.
 */
export function onAccountsInfoChanged$ (options?: FrequencyObservableOptions) {
  return createPubsubObservable<AccountsInfo>('parity_accountsInfo', options);
}
