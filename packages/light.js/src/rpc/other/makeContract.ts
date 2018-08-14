// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as Abi from '@parity/abi';
import { abiEncode } from '@parity/api/lib/util/encode';
import * as memoizee from 'memoizee';

import { Abi as AbiType, Address } from '../../types';
import {
  distinctReplayRefCount,
  switchMapPromise
} from '../../utils/operators';
import api from '../../api';
import getFrequency from '../utils/getFrequency';
import { onEveryBlock$ } from '../../frequency';
import { post$ } from './post';

/**
 * Cache contracts, so that they are:
 * - only created after the first call/transaction to a contract has been made
 * - further calls/transactions to the same contract doesn't recreate the
 *   contract
 *
 * @param {String} address - The contract address.
 * @param {Array<Object>} abiJson - The contract abi.
 * @return {Object} - The contract object as defined in @parity/api.
 */
const getContract = memoizee(
  (address: Address, abiJson: AbiType) => api().newContract(abiJson, address),
  { length: 1 } // Only memoize by address
);

/**
 * Create a contract.
 *
 * @param {Object} address - The contract address.
 * @param {Array<Object>} - The contract abi.
 * @return {Object} - An object whose keys are all the functions of the
 * contract, and each function return an Observable which will fire when the
 * function resolves.
 */
export const makeContract = memoizee(
  (address: Address, abiJson: AbiType) => {
    const abi = new Abi(abiJson);
    // Variable result will hold the final object to return
    const result = {
      abi: abi,
      address: address,
      get contractObject () {
        return getContract(address, abiJson);
      }
    };

    // We then copy every key inside contract.instance into our `result` object,
    // replacing each the value by an Observable instead of a Promise.
    abi.functions.forEach(({ name }) => {
      result[`${name}$`] = (...args) => {
        // We only get the contract when the function is called for the 1st
        // time. Note: getContract is memoized, won't create contract on each
        // call.
        const contract = getContract(address, abiJson);
        const method = contract.instance[name]; // Hold the method from the Abi

        // The last arguments in args can be an options object
        const options =
          args.length === method.inputs.length + 1 ? args.pop() : {};

        if (method.constant) {
          return getFrequency(makeContract).pipe(
            switchMapPromise(() => contract.instance[name].call(options, args)),
            distinctReplayRefCount()
          );
        } else {
          return post$({
            to: address,
            data: abiEncode(
              method.name,
              method.inputs.map(({ kind: { type } }) => type),
              args
            ),
            ...options
          });
        }
      };
    });

    return result;
  },
  { length: 1 } // Only memoize by address
);
makeContract.metadata = {
  calls: [],
  frequency: [onEveryBlock$]
};
