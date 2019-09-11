// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { distinctReplayRefCountDelay } from './distinctReplayRefCountDelay';
import isObservable from '../isObservable';
import mockRpc$ from '../testHelpers/mockRpc';

it('should return an Observable', () => {
  expect(isObservable(mockRpc$().pipe(distinctReplayRefCountDelay(2000)))).toBe(
    true
  );
});
