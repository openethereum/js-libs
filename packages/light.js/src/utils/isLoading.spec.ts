// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT
import { isNullOrLoading, RPC_LOADING } from './isLoading';

it('should return true for null', () =>
  expect(isNullOrLoading(null)).toBe(true));

it('should return true for RPC_LOADING', () =>
  expect(isNullOrLoading(RPC_LOADING)).toBe(true));

it('should return false for other values', () => {
  expect(isNullOrLoading('foo')).toBe(false);
});
