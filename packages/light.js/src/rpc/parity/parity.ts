// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { AccountsInfo, FrequencyMap } from '../../types';
import createRpc$ from '../utils/createRpc';
import { switchMapPromise } from '../../utils/operators';

/**
 * Get accounts info. Calls `parity_accountsInfo`.
 *
 * @param api - The Api object used to create this {@link RpcObservable}.
 * @param frequency - The FrequencyMap used to create this {@link RpcObservable}.
 * @return - An Observable containing all info that can be
 * accessed by user concerning accounts.
 */
export function accountsInfo$(_: any, frequency: FrequencyMap) {
  return createRpc$<AccountsInfo, AccountsInfo>({
    frequency: [frequency.onAccountsInfoChanged$],
    name: 'accountsInfo$'
  });
}

/**
 * Get the name of the current chain. Calls `parity_netChain`.
 *
 * @param api - The Api object used to create this {@link RpcObservable}.
 * @param frequency - The FrequencyMap used to create this {@link RpcObservable}.
 * @return - An Observable containing the name of the
 * current chain.
 */
export function chainName$(api: any, frequency: FrequencyMap) {
  return createRpc$<any, string>({
    calls: ['parity_netChain'],
    frequency: [frequency.onStartup$],
    name: 'chainName$',
    pipes: () => [switchMapPromise(() => api.parity.netChain())]
  });
}
