// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { setApi, setProvider } from './api';
import frequency from './frequency';
import { makeContract } from './rpc/other/makeContract';
import rpc from './rpc';

export * from './utils/isLoading';
export * from './types';
export { withoutLoading } from './utils/operators/withoutLoading';

export { frequency, makeContract }; // makeContract is a bit special, because it's not a RpcObservable
export const {
  accounts$,
  accountsInfo$,
  balanceOf$,
  blockNumber$,
  chainName$,
  defaultAccount$,
  myBalance$,
  peerCount$,
  syncStatus$
} = rpc;
export default { setApi, setProvider };
