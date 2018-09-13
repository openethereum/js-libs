// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import createPubsubObservable from './createPubsubObservable';
import isObservable from '../../utils/isObservable';
import { rejectApi, resolveApi } from '../../utils/testHelpers/mockApi';

it('should return an Observable', () => {
  expect(
    isObservable(createPubsubObservable('fake_method', resolveApi()))
  ).toBe(true);
});

it('should fire an event when pubsub publishes', done => {
  createPubsubObservable('fake_method', resolveApi()).subscribe(data => {
    expect(data).toBe('foo');
    done();
  });
});

it('should fire an error when pubsub errors', done => {
  createPubsubObservable('fake_method', rejectApi()).subscribe(null, err => {
    expect(err).toEqual(new Error('bar'));
    done();
  });
});

it('should fire an event when polling pubsub publishes', done => {
  createPubsubObservable('fake_method', resolveApi('foo', false)).subscribe(
    data => {
      expect(data).toBe('foo');
      done();
    }
  );
});

it('should fire an error when polling pubsub errors', done => {
  createPubsubObservable(
    'fake_method',
    rejectApi(new Error('bar'), false)
  ).subscribe(null, err => {
    expect(err).toEqual(new Error('bar'));
    done();
  });
});
