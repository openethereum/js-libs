// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as Api from '@parity/api';

import * as frequency from './frequency';
import {
  FrequencyKey,
  FrequencyMap,
  FrequencyObservable,
  RpcKey,
  RpcMap
} from './types';
import * as rpc from './rpc';

// Type of `frequency` in `import * as frequency from './frequency';`
type FrequencyModule = {
  [index in FrequencyKey]: (api: any) => FrequencyObservable<any>
};

/**
 * Given an `Api` object, create a map of all FrequencyObservables we have.
 *
 * @ignore
 */
export const createFrequencyMap = (api: any) =>
  Object.keys(frequency).reduce(
    (result, currentKey) => {
      result[currentKey as FrequencyKey] = (frequency as FrequencyModule)[
        currentKey as FrequencyKey
      ](api);
      return result;
    },
    {} as FrequencyMap
  );

/**
 * Given an `Api` object and a FrequencyMap, create a map of all RpcObservables we have.
 *
 * @ignore
 */
export const createRpcMap = (api: any, frequency: FrequencyMap) =>
  Object.keys(rpc).reduce(
    (result, currentKey) => {
      result[currentKey as RpcKey] = rpc[currentKey as RpcKey](api, frequency);
      return result;
    },
    {} as RpcMap
  );

// https://stackoverflow.com/questions/48495665/extending-this-in-typescript-class-by-object-assign
interface Light extends RpcMap {}

/**
 * The Light class, `@parity/light.js`'s main export.
 */
class Light implements RpcMap {
  private _api: any;
  private _frequency: FrequencyMap;

  constructor(provider: any) {
    this._api = new Api(provider);

    // Add this.frequency and list all FrequencyObservables in there.
    this._frequency = createFrequencyMap(this._api);

    // Add all RpcObservables directly in this Light class, as mixins.
    const rpcObservables = createRpcMap(this._api, this._frequency);
    Object.assign(this, rpcObservables);
  }

  get api() {
    return this._api;
  }

  get frequency() {
    return this._frequency;
  }
}

export default Light;
