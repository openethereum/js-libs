// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { combineLatest, from, Observable } from 'rxjs';
import { compose, mapPropsStreamWithConfig } from 'recompose';
import { map, switchMap } from 'rxjs/operators';
import { RpcObservable } from '@parity/light.js';

interface Observables {
  [key: string]: RpcObservable<any, any>;
}

/**
 * HOC which listens to one Observable, and update the React wrapped component
 * every time the Observable fires.
 *
 * @param key - The key to add the value in `this.props`, so that the value
 * will be accessible via `this.props[key]`.
 * @param rpc$ - The RpcObservable to listen to.
 */
export const withOneObservable = <OwnProps, T>(
  key: string,
  rpc$: RpcObservable<any, T>
) =>
  mapPropsStreamWithConfig({
    // Converts a plain ES observable to an RxJS 6 observable
    fromESObservable: from,
    toESObservable: stream$ => stream$
  })(props$ =>
    combineLatest(
      props$,
      (props$ as Observable<OwnProps>).pipe(switchMap(rpc$))
    ).pipe(map(([props, value]) => ({ ...props, [key]: value })))
  );

/**
 * HOC which listens to multiple Observables, and injects those emitted values
 * into `this.props`.
 *
 * @param observables - An object where the keys will be injected into
 * `this.props`, and the value of each key will be the value emitted by the
 * corresponding Observable.
 */
const light = (observables: Observables) =>
  compose(
    ...Object.keys(observables).map(key =>
      withOneObservable(key, observables[key])
    )
  );

export default light;
