// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { FrequencyObservable } from '../../types';
import { Observable, Observer, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { distinctReplayRefCount } from '../../utils/operators/distinctReplayRefCount';

/**
 * Observable that emits on each pubsub event.
 *
 * @ignore
 * @example onAccountsChanged$, onEveryBlock$...
 */
const createOnFromPubsub = <T>(
  pubsub: string,
  api: any // TODO @parity/api
): FrequencyObservable<T> => {
  const [namespace, method] = pubsub.split('_');

  // There's a chance the provider doesn't support pubsub, for example
  // MetaMaskProvider. In this case, as suggested on their Github, the best
  // solution for now is to poll.
  if (!api().isPubSub) {
    return timer(0, 1000).pipe(
      switchMap(() => api()[namespace][method]())
    ) as FrequencyObservable<T>;
  }

  return Observable.create((observer: Observer<T>) => {
    const subscription = api().pubsub[namespace][method](
      (error: Error, result: any) => {
        if (error) {
          observer.error(error);
        } else {
          observer.next(result);
        }
      }
    );
    return () =>
      subscription.then((subscriptionId: string) =>
        api().pubsub.unsubscribe(subscriptionId)
      );
  }).pipe(distinctReplayRefCount());
};

export default createOnFromPubsub;
