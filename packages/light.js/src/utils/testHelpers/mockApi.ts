// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

/**
 * A pubsub Api object that rejects.
 *
 * @ignore
 */
export const rejectApi = (rejectWith = new Error('bar'), isPubSub = true) => ({
  fake: {
    method () {
      return Promise.reject(rejectWith);
    }
  },
  isPubSub,
  pubsub: {
    fake: {
      method (callback) {
        callback(rejectWith, null);
        return Promise.resolve(1); // Resolves to subscriptionId
      }
    },
    unsubscribe: () => Promise.resolve()
  }
});

/**
 * A pubsub Api object that resolves.
 *
 * @ignore
 */
export const resolveApi = (
  resolveWith: string | { error: string } = 'foo',
  isPubSub = true
) => ({
  fake: {
    method () {
      return Promise.resolve(resolveWith);
    }
  },
  isPubSub,
  pubsub: {
    fake: {
      method (callback) {
        callback(null, resolveWith);
        return Promise.resolve(1); // Resolves to subscriptionId
      }
    },
    unsubscribe: () => Promise.resolve()
  }
});
