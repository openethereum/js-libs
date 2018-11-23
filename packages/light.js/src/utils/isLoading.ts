// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

export const RPC_LOADING = Symbol('Fetching RPC...');

/**
 * Check if a rpc$ value is loading.
 *
 * @param {Any} value - The value to test.
 * @return {Boolean} - Returns true if it's loading.
 */
export function isLoading (value: any) {
  return value === RPC_LOADING;
}

/**
 * Check if a rpc$ value is `null, `undefined` or loading.
 *
 * @param {Any} value - The value to test.
 * @return {Boolean} - Returns true if it's `null, `undefined` or loading.
 */
export function isNullOrLoading (value: any) {
  return value == null || isLoading(value);
}
