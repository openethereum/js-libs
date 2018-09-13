// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { AccountsInfo, Address, FrequencyObservable } from '../types';
import createPubsubObservable from './utils/createPubsubObservable';

/**
 * Observable that emits each time the default account changes
 *
 * @param provider - The provider object with which to create this {@link FrequencyObservable}.
 */
export const onAccountsChanged$: FrequencyObservable<Address[]> = (
  provider?: any
) => createPubsubObservable('eth_accounts', provider);
onAccountsChanged$.metadata = { name: 'onAccountsChanged$' };

/**
 * Observable that emits each time the default account changes
 *
 * @param provider - The provider object with which to create this {@link FrequencyObservable}.
 */
export const onAccountsInfoChanged$: FrequencyObservable<AccountsInfo> = (
  provider?: any
) => createPubsubObservable('parity_accountsInfo', provider);
onAccountsInfoChanged$.metadata = { name: 'onAccountsInfoChanged$' };
