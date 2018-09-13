// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as memoizee from 'memoizee';

interface FunctionMap {
  [key: string]: Function;
}

/**
 * Given an {@link RpcMap} of {@link RpcObservables}, memoize all the RpcObservables.
 *
 * @ignore
 * @param rpcMap - The input RpcMap to memoize.
 */
export const memoizeAll = <T extends FunctionMap>(rpcMap: T) =>
  Object.keys(rpcMap).reduce(
    (result, key) => {
      result[key] = memoizee(rpcMap[key]);
      return result;
    },
    {} as T
  );
