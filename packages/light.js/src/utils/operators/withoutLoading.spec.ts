// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
import { finalize } from 'rxjs/operators';
import { of } from 'rxjs';

import { RPC_LOADING } from '../isLoading';
import { withoutLoading } from './withoutLoading';

test('should filter out the loading states', done => {
  let numberOfTimesCalled = 0;
  of(1, RPC_LOADING, 2)
    .pipe(
      withoutLoading(),
      finalize(() => {
        expect(numberOfTimesCalled).toBe(2);
        done();
      })
    )
    .subscribe(() => {
      ++numberOfTimesCalled;
    });
});
