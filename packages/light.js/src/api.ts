// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as Api from '@parity/api';
import * as memoizee from 'memoizee';

// This is our global api object, to be used if no provider is passed to RpcObservables.
let api: any; // TODO @parity/api

/**
 * Like `return new Api(provider);`, but memoized.
 *
 * @ignore
 */
export const createApiFromProvider = memoizee(
  (provider?: any) => new Api(provider)
);

/**
 * Sets a new Api object.
 *
 * @param newApi - An Api object.
 */
export const setApi = (newApi: any) => {
  api = newApi;
};

/**
 * Sets a new Ethereum provider object.
 *
 * @param provider - An Ethereum provider object.
 */
export const setProvider = (provider?: any) => {
  setApi(createApiFromProvider(provider));
};

/**
 * We only ever use api() at call-time of functions; this allows the options
 * (particularly the transport option) to be changed dynamically and the
 * data structure to be reused.
 *
 * @return - The current Api object.
 */
export const getApi = () => {
  if (!api) {
    throw new Error('Please define a provider before using any RpcObservable.');
  }
  return api;
};

export default getApi;
