// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as Abi from '@parity/abi';
import { abiEncode } from '@parity/api/lib/util/encode';
import * as memoizee from 'memoizee';

import {
  Address,
  FrequencyMap,
  MakeContract,
  RpcObservableOptions
} from '../../types';
import createRpc from '../utils/createRpc';
import { switchMapPromise } from '../../utils/operators';
import { post$ } from './post';

/**
 * Cache contracts, so that they are:
 * - only created after the first call/transaction to a contract has been made
 * - further calls/transactions to the same contract doesn't recreate the
 *   contract
 *
 * @param address - The contract address.
 * @param abiJson - The contract abi.
 * @return - The contract object as defined in @parity/api.
 */
const getContract = memoizee(
  (address: Address, abiJson: any[], api: any) =>
    api.newContract(abiJson, address), // TODO Use types from @parity/abi
  { length: 1 } // Only memoize by address
);

/**
 * Create a contract.
 *
 * @param api - The Api object used to create this {@link RpcObservable}.
 * @param frequency - The FrequencyMap used to create this {@link RpcObservable}.
 * @return - An object whose keys are all the functions of the
 * contract, and each function return an Observable which will fire when the
 * function resolves.
 */
export function makeContract(api: any, frequency: FrequencyMap) {
  return memoizee(
    (address: Address, abiJson: any[]) => {
      // TODO use types from @parity/abi
      const abi = new Abi(abiJson);
      // Variable result will hold the final object to return
      const result: MakeContract = {
        abi,
        address,
        get contractObject() {
          return getContract(address, abiJson, api);
        }
      };

      // We then copy every key inside contract.instance into our `result` object,
      // replacing each the value by an Observable instead of a Promise.
      abi.functions.forEach(({ name }: any) => {
        // use types from @parity/abi
        result[`${name}$`] = (...args: any[]) => {
          // We only get the contract when the function is called for the 1st
          // time. Note: getContract is memoized, won't create contract on each
          // call.
          const contract = getContract(address, abiJson, api);
          const method = contract.instance[name]; // Hold the method from the Abi

          // The last 2 arguments in args can be options object:
          // - the 1st one to pass to the contract call function (callOptions)
          // - the 2nd one is the { withoutLoading }, specific to @parity/light.js
          // TODO Make this clearer.
          let callOptions = {};
          let rpcOptions: RpcObservableOptions = {};
          if (args.length === method.inputs.length + 2) {
            rpcOptions = args.pop();
            callOptions = args.pop();
          } else if (args.length === method.inputs.length + 1) {
            const options = args.pop();
            if (options.withoutLoading) {
              rpcOptions = options;
            } else {
              callOptions = options;
            }
          }

          if (method.constant) {
            return createRpc({
              frequency: [frequency.onEveryBlock$],
              name,
              pipes: () => [
                switchMapPromise(() =>
                  contract.instance[name].call(callOptions, args)
                )
              ]
            })(...args, rpcOptions);
          } else {
            return post$(api, frequency)({
              to: address,
              data: abiEncode(
                method.name,
                method.inputs.map(({ kind: { type } }: any) => type), // TODO Use @parity/api types
                args
              ),
              ...callOptions
            });
          }
        };
      });

      return result;
    },
    { length: 1 } // Only memoize by address
  );
}
