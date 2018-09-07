// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { AccountsInfo, Address, FrequencyObservable } from '../types';
import api from '../api';
import createPubsubObservable from './utils/createPubsubObservable';

/**
 * Observable that emits each time the default account changes
 */
export const onAccountsChanged$ = (() =>
  createPubsubObservable('eth_accounts', api)) as FrequencyObservable<
  Address[]
>;
onAccountsChanged$.metadata = { name: 'onAccountsChanged$' };

/**
 * Observable that emits each time the default account changes
 */
export const onAccountsInfoChanged$ = (() =>
  createPubsubObservable('parity_accountsInfo', api)) as FrequencyObservable<
  AccountsInfo
>;
onAccountsInfoChanged$.metadata = { name: 'onAccountsInfoChanged$' };
