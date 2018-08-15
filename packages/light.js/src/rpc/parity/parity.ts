// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { AccountsInfo } from '../../types';
import api from '../../api';
import createRpc$ from '../utils/createRpc';
import { onAccountsInfoChanged$, onStartup$ } from '../../frequency';
import { switchMapPromise } from '../../utils/operators';

/**
 * Get accounts info. Calls `parity_accountsInfo`.
 *
 * @return - An Observable containing all info that can be
 * accessed by user concerning accounts.
 */
export const accountsInfo$ = createRpc$<AccountsInfo, AccountsInfo>({
  frequency: [onAccountsInfoChanged$]
});

/**
 * Get the name of the current chain. Calls `parity_netChain`.
 *
 * @return - An Observable containing the name of the
 * current chain.
 */
export const chainName$ = createRpc$<any, string>({
  calls: ['parity_netChain'],
  frequency: [onStartup$],
  pipes: () => [switchMapPromise(() => api().parity.netChain())]
});
