// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as Api from '@parity/api';
import { isFunction } from '@parity/api/lib/util/types';
import { merge, ReplaySubject, Observable, OperatorFunction } from 'rxjs';
import { multicast, refCount } from 'rxjs/operators';
import * as prune from 'json-prune';

import { getApi, NullProvider } from '../../api';
import { Metadata, RpcObservable, RpcObservableOptions } from '../../types';
import {
  distinctValues,
  withoutLoading as withoutLoadingOperator
} from '../../utils/operators';

interface RpcObservableWithoutMetadata<_, Out> {
  (...args: any[]): Observable<Out>;
}

/**
 * Mixins that are added into an RpcObservable.
 *
 * @ignore
 */
const frequencyMixins = {
  /**
   * Change the frequency of a RPC Observable.
   *
   * @param frequency - An array of frequency Observables.
   * @example
   * balanceOf$.setFrequency([onEverySecond$, onStartup$]); // Will fetch
   * balance once on startup, and then every second.
   */
  setFrequency(frequency: Observable<any>[]) {
    // TODO Check that frequency is well-formed

    this.metadata.frequency = frequency;

    // If necessary, we clear the memoize cache
    if (typeof this.clear === 'function') {
      this.clear();
    }
  }
};

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
) => {
  const { provider, withoutLoading } = options;
  const api = provider ? new Api(provider) : getApi();
  // rpc$ will hold the RpcObservable minus its metadata
  const rpc$: RpcObservableWithoutMetadata<Source, Out> = (...args: any[]) => {
    // The source Observable can either be another RpcObservable (in the
    // `dependsOn` field), or anObservable built by merging all the
    // FrequencyObservables
    const source$ = metadata.dependsOn
      ? metadata.dependsOn(...args, options)
      : merge(...metadata.frequency.map(f => f(provider)));

    // A RpcObservable is: a source$ Observable, a single subject$ that
    // subscribes to this source, and this subject$ multicasts the fired values
    // to all Observers.
    const subject$ = new ReplaySubject<Out>(1);

    // The pipes to add
    const pipes: OperatorFunction<any, any>[] = [];
    if (metadata.pipes && isFunction(metadata.pipes)) {
      pipes.push(...metadata.pipes(api));
    }
    pipes.push(multicast(() => subject$), refCount());
    if (withoutLoading === true) {
      pipes.push(withoutLoadingOperator());
    }
    pipes.push(distinctValues());

    // Add a field in the calledWithArgs object, so that we know this function has
    // been called with these particular args in the app. See overview.js on
    // how this is used.
    if (!metadata.calledWithArgs) {
      metadata.calledWithArgs = {};
    }
    metadata.calledWithArgs[prune(args)] = subject$;

    return source$.pipe(...pipes);
  };

  Object.assign(rpc$, frequencyMixins, { metadata });

  return rpc$ as RpcObservable<Source, Out>;
};

export default createRpc;
