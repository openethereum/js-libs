// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import createPubsubObservable, { POLL_INTERVAL, UNSUB_DELAY } from './createPubsubObservable';
import isObservable from '../../utils/isObservable';
import { rejectApi, resolveApi } from '../../utils/testHelpers/mockApi';
import { setApi } from '../../api';
import sleep from '../../utils/testHelpers/sleep';
import { Observable } from 'rxjs';

// Nota: 'it' blocks are run sequentially. However, there is no guarantee as to
// the execution order of the rest of the body of the 'describe' blocks.

it('should return an Observable', () => {
  setApi(resolveApi());
  expect(
    isObservable(createPubsubObservable('eth_blockNumber', 'eth_blockNumber'))
  ).toBe(true);
});

it('should fire an event when pubsub publishes', done => {
  setApi(resolveApi());
  createPubsubObservable('eth_blockNumber', 'eth_blockNumber').subscribe(
    data => {
      expect(data).toBe('foo');
      done();
    }
  );
});

it('should fire an error when pubsub errors', done => {
  setApi(rejectApi());
  createPubsubObservable('eth_blockNumber', 'eth_blockNumber').subscribe(
    undefined,
    err => {
      expect(err).toEqual(new Error('bar'));
      done();
    }
  );
});

it('should fire an event when polling pubsub publishes', done => {
  setApi(resolveApi('foo', false));
  createPubsubObservable('eth_blockNumber', 'eth_blockNumber').subscribe(
    data => {
      expect(data).toBe('foo');
      done();
    }
  );
});

it('should fire an error when polling pubsub errors', done => {
  setApi(rejectApi(new Error('bar'), false));
  createPubsubObservable('eth_blockNumber', 'eth_blockNumber').subscribe(
    undefined,
    err => {
      expect(err).toEqual(new Error('bar'));
      done();
    }
  );
});

it('should fire an error when polling pubsub errors', done => {
  setApi(rejectApi(new Error('bar'), false));
  createPubsubObservable('eth_blockNumber', 'eth_blockNumber').subscribe(
    undefined,
    err => {
      expect(err).toEqual(new Error('bar'));
      done();
    }
  );
});

describe('should manage polling sparingly', () => {
  let called = 0;

  const initial$ = createPubsubObservable('eth_blockNumber', 'eth_blockNumber');
  const copy$ = createPubsubObservable('eth_blockNumber', 'eth_blockNumber');

  const sub1received: number[] = [];
  const sub2Received: number[] = [];
  let sub1: any;
  let sub2: any;

  it('should defer polling subscription', async () => {
    await sleep(50);
    expect(called).toBe(0);
  });

  it('should emit values and re-emit previous value on observable subscription', async () => {
    setApi(resolveApi(() => {
      return called++;
    }, false));

    sub1 = initial$.subscribe(i => { sub1received.push(i as number); });

    await sleep(POLL_INTERVAL - 5);
    sub2 = copy$.subscribe(i => { sub2Received.push(i as number); });

    await sleep(10);
    expect(sub1received).toEqual([0, 1]);
    expect(sub2Received).toEqual([0, 1]);
  });

  it('should unsubscribe', async () => {
    sub1.unsubscribe();
    sub2.unsubscribe();

    await sleep(UNSUB_DELAY);
    let previousCalled = called;

    await sleep(POLL_INTERVAL + 5);
    expect(called).toBe(previousCalled);
  });
});

describe('should manage pubsub connection sparingly', () => {
  let blockNumber = 10442873;
  const api = {
    isPubSub: true,
    pubsub:
    {
      eth: {
        blockNumber: async (next: any) => {
          expect(subscription).not.toBeUndefined();
          next(null, blockNumber++);
          return 5;
        }
      },
      unsubscribe: (_subscriptionId: any) => { return; }
    }
  };
  const pubsubUnsubSpy = jest.spyOn(api.pubsub, 'unsubscribe');

  let obs: Observable<number>;
  let subscription: any;
  it('should defer pubsub subscription', async done => {
    obs = createPubsubObservable('eth_blockNumber', 'eth_blockNumber');

    await sleep(500);
    setApi(api);
    subscription = obs.subscribe(n => {
      expect(n).toBe(10442873);
      done();
    });
  });

  it('should delay pubsub unsubscription', async () => {
    subscription.unsubscribe();

    await sleep(UNSUB_DELAY - 5);
    expect(pubsubUnsubSpy).toHaveBeenCalledTimes(0);

    await sleep(10);
    expect(pubsubUnsubSpy).toHaveBeenCalled();
  });

  it('should re-emit previous value on observable subscription', async () => {
    let values: number[] = [];
    subscription = obs.subscribe(x => values.push(x));

    await sleep(5);
    expect(values).toEqual([10442873, 10442874]);
  });

  it('should re-use the same pubsub when used twice', async () => {
    const obs2: Observable<number> = createPubsubObservable('eth_blockNumber', 'eth_blockNumber');

    let values: number[] = [];
    obs2.subscribe(x => values.push(x));
    expect(values).toEqual([10442874]);
  });
});
