// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import Abi, { AbiItem } from '@parity/abi';
import Func from '@parity/abi/lib/spec/function';
import { abiEncode } from '@parity/api/lib/util/encode';
import * as memoizee from 'memoizee';

import { Address } from '../../types';
import createRpc from '../utils/createRpc';
import { switchMapPromise } from '../../utils/operators';
import api from '../../api';
import { onEveryBlock$ } from '../../frequency';
import { post$ } from './post';

interface MakeContract {
  abi: Abi;
  address: string;
  readonly contractObject: any; // TODO from @parity/api
  [index: string]: Abi | string | ((...args: any[]) => any);
}

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
  (address: Address, abiJson: AbiItem[]) => api().newContract(abiJson, address),
  { length: 1 } // Only memoize by address
);

/**
 * Create a contract.
 *
 * @param address - The contract address.
 * @param - The contract abi.
 * @return - An object whose keys are all the functions of the
 * contract, and each function return an Observable which will fire when the
 * function resolves.
 */
export const makeContract = memoizee(
  (address: Address, abiJson: AbiItem[]) => {
    const abi = new Abi(abiJson);
    // Variable result will hold the final object to return
    const result: MakeContract = {
      abi,
      address,
      get contractObject() {
        return getContract(address, abiJson);
      }
    };

    // We then copy every key inside contract.instance into our `result` object,
    // replacing each the value by an Observable instead of a Promise.
    abi.functions.forEach(({ name }: Func) => {
      result[`${name}$`] = (...args: any[]) => {
        // We only get the contract when the function is called for the 1st
        // time. Note: getContract is memoized, won't create contract on each
        // call.
        const contract = getContract(address, abiJson);
        const method = contract.instance[name]; // Hold the method from the Abi

        // The last arguments in args can be an options object
        const options =
          args.length === method.inputs.length + 1 ? args.pop() : {};

        if (method.constant) {
          return createRpc({
            frequency: [onEveryBlock$],
            name,
            pipes: () => [
              switchMapPromise(() =>
                contract.instance[name].call(options, args)
              )
            ]
          })(...args);
        } else {
          return post$({
            to: address,
            data: abiEncode(
              method.name,
              method.inputs.map(({ kind: { type } }: any) => type), // TODO Use @parity/api types
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
