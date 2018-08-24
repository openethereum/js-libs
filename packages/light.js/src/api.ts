// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as Api from '@parity/api';
import * as debug from 'debug';
import * as EventEmitter from 'eventemitter3';

let api: any; // TODO @parity/api

/**
 * Use this null Api provider if the Api hasn't been set by the end user yet.
 *
 * @ignore
 */
export class NullProvider extends EventEmitter {
  send(method: string, params: any[]) {
    debug('@parity/light.js:api')(
      `Calling "${method}" rpc with params "${JSON.stringify(
        params
      )}", ignoring because Api object not set yet.`
    );
  }
}

/**
 * Sets a new Ethereum provider object.
 *
 * @param provider - An Ethereum provider object.
 */
export const setProvider = (provider: any) => {
  api = new Api(provider);
  if (!api.isPubSub) {
    console.warn(
      `Current provider does not support pubsub. @parity/light.js will poll every second to listen to changes.`
    );
  }
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
    api = new Api(new NullProvider());
  }
  return api;
};

export default getApi;
