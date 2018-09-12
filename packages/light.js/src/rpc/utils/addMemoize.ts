// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as memoizee from 'memoizee';

import { RpcKey, RpcMap } from '../../types';

/**
 * Given an {@link RpcMap} of {@link RpcObservables}, memoize all the RpcObservables.
 *
 * @ignore
 * @param rpcMap - The input RpcMap to memoize.
 */
export const memoizeAll = (rpcMap: RpcMap) =>
  Object.keys(rpcMap).reduce(
    (result, key) => {
      (result as RpcMap)[key as RpcKey] = memoizee(rpcMap[key as RpcKey]);
      return result;
    },
    {} as RpcMap
  );
