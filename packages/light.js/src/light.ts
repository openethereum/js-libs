// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as Api from '@parity/api';

import * as frequency from './frequency';
import {
  Address,
  FrequencyKey,
  FrequencyMap,
  FrequencyObservable,
  MakeContract,
  RpcKey,
  RpcMap
} from './types';
import { makeContract } from './rpc/other/makeContract';
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

interface WithMakeContract {
  makeContract: (address: Address, abiJson: any[]) => MakeContract;
}

// https://stackoverflow.com/questions/48495665/extending-this-in-typescript-class-by-object-assign
interface Light extends RpcMap, WithMakeContract {}

/**
 * The Light class, `@parity/light.js`'s main export.
 */
class Light implements RpcMap, WithMakeContract {
  public api: any;
  public frequency: FrequencyMap;

  constructor(provider: any) {
    this.api = new Api(provider);

    // Add this.frequency and list all FrequencyObservables in there.
    this.frequency = createFrequencyMap(this.api);

    // Add all RpcObservables directly in this Light class, as mixins.
    const rpcObservables = createRpcMap(this.api, this.frequency);
    Object.assign(this, rpcObservables);

    // Add makeContract method
    this.makeContract = makeContract(this.api, this.frequency);
  }
}

export default Light;
