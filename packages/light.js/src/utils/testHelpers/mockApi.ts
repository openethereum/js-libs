// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

// List of JSONRPCs we want to mock
const listOfMockRps: { [index: string]: string[] } = {
  eth: ['accounts', 'blockNumber', 'getBalance', 'syncing'],
  fake: ['method'],
  net: ['peerCount'],
  parity: ['accountsInfo', 'netChain', 'postTransaction']
};

/**
 * Create a mock api object from the listOfMockRps above.
 *
 * @ignore
 */
const createApi = (
  resolveWith: string | { error: string } | Error,
  isPubSub: boolean,
  isError: boolean
) => {
  const result = Object.keys(listOfMockRps).reduce(
    (apiObject, namespace: string) => {
      // Create methods on apiObject
      apiObject[namespace] = {};
      listOfMockRps[namespace].forEach(method => {
        apiObject[namespace][method] = isError
          ? () => Promise.reject(resolveWith)
          : () => Promise.resolve(resolveWith);
      });

      // Create pubsub on apiObject
      apiObject.pubsub = apiObject.pubsub || {
        unsubscribe: () => Promise.resolve()
      };
      apiObject.pubsub[namespace] = {};
      listOfMockRps[namespace].forEach(method => {
        apiObject.pubsub[namespace][method] = isError
          ? (callback: Function) => {
              callback(resolveWith, null);
              return Promise.resolve(1); // Resolves to subscriptionId
            }
          : (callback: Function) => {
              callback(null, resolveWith);
              return Promise.resolve(1); // Resolves to subscriptionId
            };
      });

      return apiObject;
    },
    {
      isPubSub,
      pollMethod() {
        return isError
          ? Promise.reject(resolveWith)
          : Promise.resolve(resolveWith);
      }
    } as { [index: string]: any }
  );

  return result;
};

/**
 * Mock api that resolves.
 *
 * @ignore
 */
export const rejectApi = (
  resolveWith = new Error('bar'),
  isPubsub: boolean = true
) => createApi(resolveWith, isPubsub, true);

/**
 * Mock api that resolves.
 *
 * @ignore
 */
export const resolveApi = (
  resolveWith: string | { error: string } = 'foo',
  isPubsub: boolean = true
) => createApi(resolveWith, isPubsub, false);
