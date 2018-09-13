// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import {
  AccountsInfo,
  Address,
  FrequencyObservable,
  FrequencyObservableOptions
} from '../types';
import createPubsubObservable from './utils/createPubsubObservable';

/**
 * Observable that emits each time the default account changes
 *
 * @param options - Options to pass to {@link FrequencyObservable}.
 */
export const onAccountsChanged$: FrequencyObservable<Address[]> = (
  options?: FrequencyObservableOptions
) => createPubsubObservable('eth_accounts', options);
onAccountsChanged$.metadata = { name: 'onAccountsChanged$' };

/**
 * Observable that emits each time the default account changes
 *
 * @param options - Options to pass to {@link FrequencyObservable}.
 */
export const onAccountsInfoChanged$: FrequencyObservable<AccountsInfo> = (
  options?: FrequencyObservableOptions
) => createPubsubObservable('parity_accountsInfo', options);
onAccountsInfoChanged$.metadata = { name: 'onAccountsInfoChanged$' };
