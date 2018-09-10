// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { AccountsInfo, Address } from '../types';
import createPubsubObservable from './utils/createPubsubObservable';

/**
 * Observable that emits each time the default account changes
 */
export const onAccountsChanged$ = (api: any) =>
  createPubsubObservable<Address[]>(
    { calls: ['eth_accounts'], name: 'onAccountsChanged$' },
    api
  );

/**
 * Observable that emits each time the default account changes
 */
export const onAccountsInfoChanged$ = (api: any) =>
  createPubsubObservable<AccountsInfo>(
    { calls: ['parity_accountsInfo'], name: 'onAccountsInfoChanged$' },
    api
  );
