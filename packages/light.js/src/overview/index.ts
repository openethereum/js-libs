// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { ApiValue, RpcObservable } from '../types';
import * as rpc from '../rpc';

interface CalledWithArgsItem {
  currentValue: ApiValue;
  subscribersCount: number;
}

interface Overview {
  [index: string]: {
    calledWithArgs?: {
      [key: string]: CalledWithArgsItem;
    };
    calls?: string[];
    dependsOn?: string;
    frequency?: string[];
  };
}

/**
 * Add a property on window, so that the subscribed object can be viewed in the
 * JS console via `window.parity.rpcOverview()`
 */
if (typeof window !== 'undefined') {
  // == null means null or undefined
  if (window.parity == null) {
    window.parity = {};
  }

  window.parity.rpcOverview = () => {
    const overview: Overview = {};
    Object.keys(rpc).forEach(key => {
      // This one's more complex, we leave it for later
      if (key === 'makeContract') {
        return;
      }

      const rpc$: RpcObservable<any, ApiValue> = (rpc as any)[key];

      // If the rpc$ has not been called, then we don't show it
      if (!rpc$.metadata.calledWithArgs) {
        return;
      }

      // We populate the `calledWithArgs` field, in a human-readable way
      Object.keys(rpc$.metadata.calledWithArgs).map(calledWithArgsKey => {
        const subject$ = rpc$.metadata.calledWithArgs[calledWithArgsKey];

        // Don't show this calledWithArgs item if there are not active
        // subscribers.
        if (!subject$.observers.length) {
          return;
        }

        // Safely initialize the fields
        overview[key] = overview[key] || {};
        overview[key].calledWithArgs = overview[key].calledWithArgs || {};

        // Populate each arg the RpcObservable has been called with, with its
        // currentValue and subscribersCount
        overview[key].calledWithArgs[calledWithArgsKey] = {
          currentValue: subject$._events && subject$._events[0],
          subscribersCount: subject$.observers.length
        };
      });

      // Don't show this RpcObservable if it has no active subscribers on any
      // of its args.
      if (!overview[key] || !overview[key].calledWithArgs) {
        return;
      }

      // We add all calls of this RpcObservable
      if (rpc$.metadata.calls) {
        overview[key].calls = rpc$.metadata.calls;
      }

      // We add all dependsOn of this RpcObservable
      if (rpc$.metadata.dependsOn) {
        overview[key].dependsOn = rpc$.metadata.dependsOn.metadata.name;
      }

      // We add a human-readable version of `frequency` field
      if (rpc$.metadata.frequency) {
        overview[key].frequency = rpc$.metadata.frequency.map(
          frequency$ => frequency$.metadata.name
        );
      }
    });

    return overview;
  };
}
