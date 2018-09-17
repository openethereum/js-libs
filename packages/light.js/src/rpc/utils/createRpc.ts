// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { isFunction } from '@parity/api/lib/util/types';
import * as memoizee from 'memoizee';
import { merge, ReplaySubject, Observable, OperatorFunction } from 'rxjs';
import { multicast, refCount } from 'rxjs/operators';

import { createApiFromProvider, getApi } from '../../api';
import { distinctValues } from '../../utils/operators';
import { Metadata, RpcObservableOptions } from '../../types';

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
const createRpcWithApi = memoizee(
  <Source, Out>(metadata: Metadata<Source, Out>, api: any, ...args: any[]) => {
    // The source Observable can either be another RpcObservable (in the
    // `dependsOn` field), or anObservable built by merging all the
    // FrequencyObservables
    const source$ = metadata.dependsOn
      ? metadata.dependsOn(...args, { provider: api.provider })
      : merge(...metadata.frequency.map(f => f({ provider: api.provider })));

    // A RpcObservable is: a source$ Observable, a single subject$ that
    // subscribes to this source, and this subject$ multicasts the fired values
    // to all Observers.
    const subject$ = new ReplaySubject<Out>(1);

    // The pipes to add
    const pipes: OperatorFunction<any, any>[] = [];
    if (metadata.pipes && isFunction(metadata.pipes)) {
      pipes.push(...metadata.pipes(api));
    }
    pipes.push(multicast(() => subject$), refCount(), distinctValues());

    return source$.pipe(...pipes) as Observable<Out>;
  },
  {
    length: 3,
    normalizer: (args: any) => {
      // Custom memoization function, i.e. create an unique id from the args.
      // `args` is arguments object as accessible in memoized function
      return `${args[0].name}${args[1].provider.id}${args[2]}${Array.from(
        args
      ).slice(3)}`;
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
  ...args: any[]
) => (options: RpcObservableOptions = {}) => {
  const { provider } = options;
  const api = provider ? createApiFromProvider(provider) : getApi();

  return createRpcWithApi<Source, Out>(metadata, api, ...args);
};

export default createRpc;
