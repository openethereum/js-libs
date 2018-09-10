// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as Api from '@parity/api';

import * as frequency from './frequency';
import {
  FrequencyKey,
  FrequencyObject,
  FrequencyObservable,
  RpcKey,
  RpcObject
} from './types';
import * as rpc from './rpc';

type Frequencies = {
  [index in FrequencyKey]: (api: any) => FrequencyObservable<any>
};

class Light {
  private _api: any;
  private _frequency: FrequencyObject;

  constructor(provider: any) {
    this._api = new Api(provider);

    // Add this.frequency and list all FrequencyObservables in there.
    this._frequency = Object.keys(frequency).reduce(
      (result, currentKey) => {
        result[currentKey as FrequencyKey] = (frequency as Frequencies)[
          currentKey as FrequencyKey
        ](this._api);
        return result;
      },
      {} as FrequencyObject
    );

    // Add all RpcObservables directly in this Light class, as mixins.
    const rpcObservables = Object.keys(rpc).reduce(
      (result, currentKey) => {
        result[currentKey as RpcKey] = rpc[currentKey as RpcKey](
          this._api,
          this._frequency
        );
        return result;
      },
      {} as RpcObject
    );
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
