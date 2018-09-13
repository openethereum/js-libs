// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as memoizee from 'memoizee';
import { FrequencyObservableMetadata, Metadata } from '../types';

interface FunctionWithMetadata extends Function {
  metadata?: Metadata<any, any> | FrequencyObservableMetadata;
}

interface FunctionMap {
  [key: string]: FunctionWithMetadata;
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
      const metadata = rpcMap[key].metadata;
      result[key] = memoizee(rpcMap[key], { primitive: true }); // This operation does not copy the metadata of rpcMap[key].
      result[key].metadata = metadata;
      return result;
    },
    {} as T
  );
