// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { catchError, switchMap } from 'rxjs/operators';
import { empty, from, throwError, OperatorFunction } from 'rxjs';

interface SwitchMapPromiseOptions {
  emitErrors: boolean;
}

/**
 * RxJs operator that takes a promise as argument and switches the source
 * observable to the promise converted as an observable.
 *
 * @param options.emitErrors In case the promise errors, the observable will
 * error out (throw and abort) if emitErrors is `true`; otherwise the error will
 * just be logged.
 *
 * @ignore
 */
export const switchMapPromise = <T, U>(
  promise: () => Promise<U>,
  options: SwitchMapPromiseOptions = { emitErrors: false }
): OperatorFunction<T, U> =>
    switchMap(() =>
      from(
        promise().then(result => {
        // The result can sometimes be {id: 2, jsonrpc: "2.0", error: {...}}
          if ((result as any).error) {
            return Promise.reject(result);
          }
          return Promise.resolve(result);
        })
      ).pipe(
        catchError(err => {
          console.group();
          console.error({ call: promise.toString(), err });
          console.error(
            new Error(
              'Error while executing API call, see error log above for more information.'
            )
          );
          console.groupEnd();

          if (options.emitErrors) {
            return throwError(err);
          } else {
            return empty();
          }
        })
      )
    );
