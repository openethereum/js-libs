// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as debug from 'debug';
import { exhaustMap } from 'rxjs/operators';
import { FrequencyObservableOptions } from '../../types';
import * as memoizee from 'memoizee';
import { Observable, Observer, timer, defer } from 'rxjs';

import { createApiFromProvider, getApi } from '../../api';
import { distinctReplayRefCountDelay } from '../../utils/operators/distinctReplayRefCountDelay';

// For unavailable pubsubs, poll every 1s instead
export const POLL_INTERVAL = 1000;

// Drop the pubsub connection or polling after 2s without subscribers
export const UNSUB_DELAY = 2000;

/**
 * Create a polling function, calls the `fallback` JSONRPC on each second, or
 * on previous call's result, whichever comes last.
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

    let observable;

    // There's a chance the provider doesn't support pubsub, for example
    // MetaMaskProvider. In this case, as suggested on their Github, the best
    // solution for now is to poll.
    if (!api.isPubSub) {
      debug('@parity/light.js:api')(
        `Pubsub not available for ${
          api.provider ? api.provider.constructor.name : 'current Api'
        } provider, polling "${fallback}" every ${POLL_INTERVAL}ms.`
      );

      observable = createPoll<T>(fallback, api);
    } else {
      observable = Observable.create((observer: Observer<T>) => {
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
      });
    }

    return observable.pipe(
      distinctReplayRefCountDelay(UNSUB_DELAY)
    ) as Observable<T>;
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
  // Evaluate api only once we subscribe
  return defer(() => {
    const api = provider ? createApiFromProvider(provider) : getApi();
    return createPubsubObservableWithApi<T>(pubsub, fallback, api);
  });
};

export default createPubsubObservable;
