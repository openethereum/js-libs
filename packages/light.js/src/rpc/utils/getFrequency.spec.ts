// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import getFrequency from './getFrequency';
import isObservable from '../../utils/isObservable';
import mockRpc$ from '../../utils/testHelpers/mockRpc';

it('should return the correct frequency', () => {
  expect(isObservable(getFrequency(mockRpc$))).toBe(true);
});
