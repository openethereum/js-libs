// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import createRpc$, { UNSUB_DELAY } from './createRpc';
import { MockProvider } from '../../../lib/utils/testHelpers/mockApi';
import { Observable } from 'rxjs';
import { resolveApi } from '../../utils/testHelpers/mockApi';
import { RpcObservableOptions } from '../../types';
import { setApi } from '../../api';
import sleep from '../../utils/testHelpers/sleep';

describe('should manage source observable sparingly', () => {

  let unsubscribe = 0;

  // Returns an observable
  function rpc (options?: RpcObservableOptions) {
    return createRpc$<any, number>({
      frequency: [() => {
        return new Observable(subscriber => {
          let i = 0;
          subscriber.next(i++);
          const itl = setInterval(() => {
            subscriber.next(i++);
          }, 1000);
          return () => {
            clearInterval(itl);
            unsubscribe++;
          };
        });
      }],
      pipes: api => []
    })(options)();
  }

  let obs: Observable<number>;
  let subscription: any;
  it('should defer subscription to the source observable', async done => {
    obs = rpc();

    await sleep(500);
    setApi(resolveApi());
    subscription = obs.subscribe(n => {
      expect(n).toBe(0);
      done();
    });
  });

  it('should delay unsubscription to the source observable', async () => {
    await sleep(30); // t=30
    subscription.unsubscribe();

    await sleep(UNSUB_DELAY - 5); // t=30+(2000-5)=2025
    expect(unsubscribe).toEqual(0);

    // unsubscription to source observable at t = 30+2000 = 2030
    // source observable had emitted [0,1,2]

    await sleep(10);
    expect(unsubscribe).toEqual(1);
  });

  it('should re-emit previous value on observable subscription', async () => {
    let values: number[] = [];
    subscription = obs.subscribe(x => {
      values.push(x);
    });

    await sleep(5);
    expect(values).toEqual([2, 0]);
  });

  it('should use the same source observable when used twice', async () => {
    const obs2: Observable<number> = rpc();

    let values: number[] = [];

    await sleep(1000);

    obs2.subscribe(x => values.push(x));
    expect(values).toEqual([1]);
  });

  it('should not use the same source observable if we change api', async () => {
    setApi(resolveApi('foo'));
    const obs2: Observable<number> = rpc();

    let values: number[] = [];
    obs2.subscribe(x => values.push(x));

    await sleep(5);
    expect(values).toEqual([0]);
  });

  let obs3: Observable<number>;
  let provider = new MockProvider();
  it('should not use the same source observable if options are passed', async () => {
    obs3 = rpc({ provider });

    let values: number[] = [];
    obs3.subscribe(x => values.push(x));

    await sleep(5);
    expect(values).toEqual([0]);
  });

  it('should use the same source observable if the same options are passed', async () => {
    const obs4: Observable<number> = rpc({ provider });

    await sleep(1000);
    let values: number[] = [];
    obs4.subscribe(x => values.push(x));

    expect(values).toEqual([1]);
  });
});
