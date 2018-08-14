// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import createOnFromPubsub from './createOnFromPubsub';
import isObservable from '../../utils/isObservable';
import { rejectApi, resolveApi } from '../../utils/testHelpers/mockApi';

it('should return an Observable', () => {
  expect(isObservable(createOnFromPubsub('fake_method', resolveApi))).toBe(
    true
  );
});

it('should fire an event when pubsub publishes', done => {
  createOnFromPubsub('fake_method', resolveApi).subscribe(data => {
    expect(data).toBe('foo');
    done();
  });
});

it('should fire an error when pubsub errors', done => {
  createOnFromPubsub('fake_method', rejectApi).subscribe(null, err => {
    expect(err).toEqual(new Error('bar'));
    done();
  });
});

it('should fire an event when polling pubsub  publishes', done => {
  createOnFromPubsub('fake_method', () =>
    resolveApi(undefined, false)
  ).subscribe(data => {
    expect(data).toBe('foo');
    done();
  });
});

it('should fire an error when polling pubsub errors', done => {
  createOnFromPubsub('fake_method', () =>
    rejectApi(undefined, false)
  ).subscribe(null, err => {
    expect(err).toEqual(new Error('bar'));
    done();
  });
});
