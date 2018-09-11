// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { from } from 'rxjs';
import {
  compose,
  ComponentEnhancer,
  mapPropsStreamWithConfig
} from 'recompose';
import { map, switchMap } from 'rxjs/operators';
import Light, { RpcObservable } from '@parity/light.js';

interface ObservableMap {
  [key: string]: RpcObservable<any, any>;
}

interface LightWithHoc extends Light {
  hoc: (observables: ObservableMap) => ComponentEnhancer<{}, {}>;
}

/**
 * HOC which listens to one Observable, and update the React wrapped component
 * every time the Observable fires.
 *
 * @param key - The key to add the value in `this.props`, so that the value
 * will be accessible via `this.props[key]`.
 * @param rpc$ - The RpcObservable to listen to.
 */
export const withOneObservable = <OwnProps extends object, T>(
  key: string,
  rpc$: RpcObservable<any, T>
) =>
  mapPropsStreamWithConfig({
    // Converts a plain ES observable to an RxJS 6 observable
    fromESObservable: from,
    toESObservable: stream$ => stream$
  })(
    switchMap((props: OwnProps) =>
      rpc$(props).pipe(map(value => ({ ...(props as object), [key]: value })))
    )
  );

/**
 * HOC which listens to multiple Observables, and injects those emitted values
 * into `this.props`.
 *
 * @param observables - An object where the keys will be injected into
 * `this.props`, and the value of each key will be the value emitted by the
 * corresponding Observable.
 */
export const hoc = (observables: ObservableMap) =>
  compose(
    ...Object.keys(observables).map(key =>
      withOneObservable(key, observables[key])
    )
  );

/**
 * Add a `hoc` field on the Light class, which plays the role of a HOC.
 *
 * @param light - The base Light instance.
 */
const addHocToLight = (light: Light) => {
  (light as LightWithHoc).hoc = hoc;
  return light as LightWithHoc;
};

export default addHocToLight;
