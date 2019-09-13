// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import mockRpc$ from '../testHelpers/mockRpc';
import { rejectApi, resolveApi } from '../testHelpers/mockApi';
import { switchMapPromise } from './switchMapPromise';

it('should not error when the promise resolves with an error', done => {
  mockRpc$()
    .pipe(switchMapPromise(resolveApi({ error: 'bar' }).fake.method))
    .subscribe(undefined, () => done.fail('It should not error.'));

  // If after 0.1s, nothing has been called, then our Observable has not fired
  // any event, which is what we want
  setTimeout(done, 100);
});

it('should not error when the promise rejects', done => {
  mockRpc$()
    .pipe(switchMapPromise(rejectApi().fake.method))
    .subscribe(undefined, () => done.fail('It should not error.'));

  // If after 0.1s, nothing has been called, then our Observable has not fired
  // any event, which is what we want
  setTimeout(done, 100);
});

it('should fire an error when the promise resolves with an error', done => {
  mockRpc$()
    .pipe(
      switchMapPromise(rejectApi(new Error('boo')).fake.method, {
        emitErrors: true
      })
    )
    .subscribe(undefined, err => {
      expect(err).toEqual(new Error('boo'));
      done();
    });
});

it('should fire an error when the promise rejects', done => {
  mockRpc$()
    .pipe(
      switchMapPromise(rejectApi(new Error('boo')).fake.method, {
        emitErrors: true
      })
    )
    .subscribe(undefined, err => {
      expect(err).toEqual(new Error('boo'));
      done();
    });
});

it('should fire the correct value when the promise resolves', done => {
  mockRpc$()
    .pipe(switchMapPromise(resolveApi().fake.method))
    .subscribe(data => {
      expect(data).toBe('foo');
      done();
    });
});
