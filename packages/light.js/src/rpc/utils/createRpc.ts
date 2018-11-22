// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { isFunction } from '@parity/api/lib/util/types';
// @ts-ignore Unfortunately no types for memoizee/weak.
import * as memoizeeWeak from 'memoizee/weak';
import { merge, Observable, OperatorFunction } from 'rxjs';

import { createApiFromProvider, getApi } from '../../api';
import { distinctReplayRefCount } from '../../utils/operators';
import {
  FrequencyObservable,
  Metadata,
  RpcObservableOptions
} from '../../types';

/**
 * Add metadata to an RpcObservable, and transform it into a ReplaySubject(1).
 * It's a currified function.
 * Pure function version of {@link createRpc}.
 *
 * @ignore
 * @param metadata - The metadata to add.
 * @example
 * createRpc(metadata)(options) returns a RpcObservable.
 * createRpc(metadata)(options)(someArgs) returns an Observable.
 */
const createRpcWithApi = memoizeeWeak(
  <Source, Out>(api: any, metadata: Metadata<Source, Out>, ...args: any[]) => {
    if (!metadata.dependsOn && !metadata.frequency) {
      throw new Error(
        `Rpc$ '${
          metadata.name
        }' needs either a 'dependsOn' or a 'frequency' field.`
      );
    }

    // The source Observable can either be another RpcObservable (in the
    // `dependsOn` field), or anObservable built by merging all the
    // FrequencyObservables
    const source$ = metadata.dependsOn
      ? metadata.dependsOn(...args, { provider: api.provider })
      : merge(
          ...(metadata.frequency as FrequencyObservable<Source>[]).map(f =>
            f({ provider: api.provider })
          )
        );

    // The pipes to add
    const pipes: OperatorFunction<any, any>[] = [];
    if (metadata.pipes && isFunction(metadata.pipes)) {
      pipes.push(...metadata.pipes(api));
    }
    pipes.push(distinctReplayRefCount());

    return source$.pipe(...pipes) as Observable<Out>;
  },
  {
    length: false, // Dynamic args length
    normalizer: (_: any, otherArgs: any) => {
      const [metadata, ...args] = Array.from(otherArgs);
      // Custom memoization function. The first argument (_, which is `api`),
      // is memoized by reference. For the rest of the arguments, we create an
      // unique id based on serialization.
      // https://github.com/medikoo/memoizee/issues/99#issuecomment-422155924
      return `${metadata.name}${JSON.stringify(args)}`;
    }
  }
);

/**
 * Add metadata to an RpcObservable, and transform it into a ReplaySubject(1).
 * It's a currified function.
 *
 * @ignore
 * @param metadata - The metadata to add.
 * @example
 * createRpc(metadata)(options) returns a RpcObservable.
 * createRpc(metadata)(options)(someArgs) returns an Observable.
 */
const createRpc = <Source, Out>(metadata: Metadata<Source, Out>) => (
  options: RpcObservableOptions = {}
) => (...args: any[]) => {
  const { provider } = options;
  const api = provider ? createApiFromProvider(provider) : getApi();

  return createRpcWithApi<Source, Out>(api, metadata, ...args) as Observable<
    Out
  >;
};

export default createRpc;
