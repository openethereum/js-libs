// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { setApi, setProvider } from './api';
import frequency from './frequency';
import { makeContract } from './rpc/other/makeContract';
import rpc from './rpc';

export * from './utils/isLoading';
export * from './types';

export { frequency, makeContract }; // makeContract is a bit special, because it's not a RpcObservable
export const {
  accounts$,
  accountsInfo$,
  balanceOf$,
  chainId$,
  transactionCountOf$,
  blockNumber$,
  chainName$,
  defaultAccount$,
  myBalance$,
  peerCount$,
  post$,
  postRaw$,
  syncStatus$
} = rpc;
export default { setApi, setProvider };
