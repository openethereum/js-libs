// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { skip, take } from 'rxjs/operators';

import mockRpc$ from '../testHelpers/mockRpc';
import { rejectApi, resolveApi } from '../testHelpers/mockApi';
import { switchMapPromise } from './switchMapPromise';

it('should fire an error when the promise throws', done => {
  mockRpc$()
    .pipe(
      switchMapPromise(rejectApi(new Error('boo')).fake.method)
    )
    .subscribe(undefined, err => {
      expect(err).toEqual(new Error('boo'));
      done();
    });
});

it('should fire the correct value when the promise resolves', done => {
  mockRpc$()
    .pipe(
      switchMapPromise(resolveApi().fake.method)
    )
    .subscribe(data => {
      expect(data).toBe('foo');
      done();
    });
});
