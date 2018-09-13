// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { finalize, skip, take } from 'rxjs/operators';

import mockRpc$ from '../testHelpers/mockRpc';
import { rejectApi, resolveApi } from '../testHelpers/mockApi';
import { RPC_LOADING } from '../isLoading';
import { switchMapPromise } from './switchMapPromise';

it('should not error when the promise resolves with an error', done => {
  mockRpc$()
    .pipe(switchMapPromise(resolveApi({ error: 'bar' }).fake.method))
    .subscribe(null, () => done.fail('It should not error.'));

  // If after 0.1s, nothing has been called, then our Observable has not fired
  // any event, which is what we want
  setTimeout(done, 100);
});

it('should not error when the promise rejects', done => {
  mockRpc$()
    .pipe(switchMapPromise(rejectApi().fake.method))
    .subscribe(null, () => done.fail('It should not error.'));

  // If after 0.1s, nothing has been called, then our Observable has not fired
  // any event, which is what we want
  setTimeout(done, 100);
});

it('should fire a loading state frist', done => {
  mockRpc$()
    .pipe(
      switchMapPromise(resolveApi().fake.method),
      take(1)
    )
    .subscribe(data => {
      expect(data).toBe(RPC_LOADING);
      done();
    });
});

it('should fire the correct value when the promise resolves', done => {
  mockRpc$()
    .pipe(
      switchMapPromise(resolveApi().fake.method),
      skip(1) // Skip the RPC_LOADING
    )
    .subscribe(data => {
      expect(data).toBe('foo');
      done();
    });
});
