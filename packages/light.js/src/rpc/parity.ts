// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { AccountsInfo, RpcObservableOptions } from '../types';
import createRpc$ from './utils/createRpc';
import frequency from '../frequency';
import { switchMapPromise } from '../utils/operators';

/**
 * Get accounts info. Calls `parity_accountsInfo`. Works only with a Parity
 * node.
 *
 * @return - An Observable containing all info that can be
 * accessed by user concerning accounts.
 */
export function accountsInfo$(options?: RpcObservableOptions) {
  return createRpc$<AccountsInfo, AccountsInfo>({
    frequency: [frequency.onAccountsInfoChanged$],
    name: 'accountsInfo$'
  })()(options);
}

/**
 * Get the name of the current chain. Calls `parity_chain`. Works only with
 * a Parity node.
 *
 * @return - An Observable containing the name of the
 * current chain.
 */
export function chainName$(options?: RpcObservableOptions) {
  return createRpc$<any, string>({
    calls: ['parity_chain'],
    frequency: [frequency.onStartup$],
    name: 'chainName$',
    pipes: api => [switchMapPromise(() => api.parity.chain())]
  })(options)();
}
