// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as debug from 'debug';
import { FrequencyObservableOptions } from '../../types';
import * as memoizee from 'memoizee';
import { exhaustMap } from 'rxjs/operators';
import { Observable, Observer, timer } from 'rxjs';

import { createApiFromProvider, getApi } from '../../api';
import { distinctReplayRefCount } from '../../utils/operators/distinctReplayRefCount';

const POLL_INTERVAL = 1000;

/**
 * Create a polling function.
 *
 * @ignore
 */
function createPoll<T> (
  fallback: string,
  api: any,
  pollInterval = POLL_INTERVAL
) {
  const [fallbackNamespace, fallbackMethod] = fallback.split('_');

  return timer(0, pollInterval).pipe(
    exhaustMap(() => api[fallbackNamespace][fallbackMethod]())
  ) as Observable<T>;
}

/**
 * Given an api, returns an Observable that emits on each pubsub event.
 * Pure function version of {@link createPubsubObservable}.
 *
 * @ignore
 * @param pubsub - The pubsub method to subscribe to.
 * @param fallback - If pubsub doesn't work, poll this method every
 * POLL_INTERVAL ms.
 */
const createPubsubObservableWithApi = memoizee(
  <T>(pubsub: string, fallback: string, api: any) => {
    const [namespace, method] = pubsub.split('_');

    // There's a chance the provider doesn't support pubsub, for example
    // MetaMaskProvider. In this case, as suggested on their Github, the best
    // solution for now is to poll.
    if (!api.isPubSub) {
      debug('@parity/light.js:api')(
        `Pubsub not available for ${
          api.provider ? api.provider.constructor.name : 'current Api'
        } provider, polling "${fallback}" every ${POLL_INTERVAL}ms.`
      );

      return createPoll<T>(fallback, api);
    }

    return Observable.create((observer: Observer<T>) => {
      const subscription = api.pubsub[namespace][method](
        (error: Error, result: any) => {
          // TODO use @parity/api type for result
          if (error) {
            observer.error(error);
          } else {
            observer.next(result);
          }
        }
      ).catch(() => {
        // If we get an error during subscription, then default to fallback.
        // TODO Should this be done on @parity/api?
        debug('@parity/light.js:api')(
          `Pubsub not available for method "${pubsub}", polling "${fallback}" every ${POLL_INTERVAL}ms`
        );

        createPoll<T>(fallback, api).subscribe(
          e => observer.next(e),
          e => observer.error(e),
          () => observer.complete()
        );
      });

      return () =>
        subscription.then((subscriptionId: string) =>
          subscriptionId
            ? api.pubsub.unsubscribe(subscriptionId)
            : Promise.resolve()
        );
    }).pipe(distinctReplayRefCount()) as Observable<T>;
  }
);

/**
 * Given a provider, returns an Observable that emits on each pubsub event.
 *
 * @ignore
 * @example onAccountsChanged$, onEveryBlock$...
 */
const createPubsubObservable = <T>(
  pubsub: string,
  fallback: string,
  { provider }: FrequencyObservableOptions = {}
) => {
  const api = provider ? createApiFromProvider(provider) : getApi();

  return createPubsubObservableWithApi<T>(pubsub, fallback, api);
};

export default createPubsubObservable;
