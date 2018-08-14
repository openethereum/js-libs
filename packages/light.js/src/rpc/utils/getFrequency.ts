// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { merge } from 'rxjs';

import { RpcObservable } from '../../types';

/**
 * Get the frequency Observable of a RPC Observable, which represents how often
 * this RPC Observable gets updated. Each RPC Observable has a metadata field
 * with an array of Observables, the frequency Observable is constructed by
 * merging (as in Observable.merge) these Observables.
 *
 * @ignore
 * @param {String} rpc$ - The RPC Observable.
 * @return {Observable} - An Observable that represents the frequency.
 */
const getFrequency = <T>(rpc$: RpcObservable<T>) => {
  return merge(...rpc$.metadata.frequency);
};

export default getFrequency;
