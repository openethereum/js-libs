// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { AccountsInfo, Address } from '../types';
import createPubsubObservable from './utils/createPubsubObservable';

/**
 * Observable that emits each time the default account changes
 *
 * @param api - The api object with which to create this {@link FrequencyObservable}.
 */
export function onAccountsChanged$(api: any) {
  return createPubsubObservable<Address[]>(
    { calls: ['eth_accounts'], name: 'onAccountsChanged$' },
    api
  );
}

/**
 * Observable that emits each time the default account changes
 *
 * @param api - The api object with which to create this {@link FrequencyObservable}.
 */
export function onAccountsInfoChanged$(api: any) {
  return createPubsubObservable<AccountsInfo>(
    { calls: ['parity_accountsInfo'], name: 'onAccountsInfoChanged$' },
    api
  );
}
