// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as asyncRetry from 'async-retry';
import * as debug from 'debug';
import { Observable, Observer } from 'rxjs';

import { createApiFromProvider, getApi } from '../../api';
import { distinctReplayRefCount } from '../../utils/operators';
import { RpcObservableOptions, Tx, TxStatus } from '../../types';

interface PostOptions extends RpcObservableOptions {
  estimate?: boolean;
}

/**
 * Post a transaction to the network.
 *
 * Calls, in this order, `eth_estimateGas`, `parity_postTransaction`,
 * `parity_checkRequest` and `eth_getTransactionReceipt` to get the status of
 * the transaction.
 *
 * @param options? - Options to pass to the {@link RpcObservable}.
 * @return - The status of the transaction.
 */
export function post$ (tx: Tx, options: PostOptions = {}) {
  const { estimate, provider } = options;
  const api = provider ? createApiFromProvider(provider) : getApi();

  const source$ = Observable.create(async (observer: Observer<TxStatus>) => {
    try {
      if (estimate) {
        observer.next({ estimating: true });
        const gas = await api.eth.estimateGas(tx);
        observer.next({ estimated: gas });
      }
      const signerRequestId = await api.parity.postTransaction(tx);
      observer.next({ requested: signerRequestId });
      const transactionHash = await api.pollMethod(
        'parity_checkRequest',
        signerRequestId
      );
      if (tx.condition) {
        observer.next({ signed: transactionHash, schedule: tx.condition });
      } else {
        observer.next({ signed: transactionHash });

        // We poll `eth_getTransactionReceipt` for 20s, until we get a valid receipt
        const receipt = await asyncRetry(
          async (_, attempt) => {
            debug('@parity/light.js:post$')(
              `Attempt #${attempt} to eth_getTransactionReceipt.`
            );
            const rcpt = await api.eth.getTransactionReceipt(transactionHash);
            if (!rcpt || !rcpt.blockNumber || rcpt.blockNumber.eq(0)) {
              throw new Error('Receipt is invalid.');
            }
            return rcpt;
          },
          {
            retries: 20
          }
        );

        observer.next({ confirmed: receipt });
      }

      observer.complete();
    } catch (error) {
      observer.next({ failed: error });
      observer.error(error);
    }
  }).pipe(distinctReplayRefCount());

  source$.subscribe(); // Run this Observable immediately;
  return source$ as Observable<TxStatus>;
}

/**
 * Post a raw (signed) transaction to the network.
 *
 * Calls, in this order, `eth_sendRawTransaction` and
 * `eth_getTransactionReceipt` to get the status of the transaction.
 *
 * @param options? - Options to pass to the {@link RpcObservable}.
 * @return - The status of the transaction.
 */
export function postRaw$(tx: string, options: PostOptions = {}) {
  const { estimate, provider } = options;
  const api = provider ? createApiFromProvider(provider) : getApi();

  const source$ = Observable.create(async (observer: Observer<TxStatus>) => {
    try {
      if (estimate) {
        throw new Error('Requested gas estimation, but it is not supported in postRaw$');
      }
      const transactionHash = await api.eth.sendRawTransaction(tx);

      observer.next({ signed: transactionHash });

      // We poll `eth_getTransactionReceipt` for 20s, until we get a valid receipt
      const receipt = await asyncRetry(
        async (_, attempt) => {
          debug('@parity/light.js:postRaw$')(
            `Attempt #${attempt} to eth_getTransactionReceipt.`
          );
          const rcpt = await api.eth.getTransactionReceipt(transactionHash);
          if (!rcpt || !rcpt.blockNumber || rcpt.blockNumber.eq(0)) {
            throw new Error('Receipt is invalid.');
          }
          return rcpt;
        },
        {
          retries: 20
        }
      );

      observer.next({ confirmed: receipt });

      observer.complete();
    } catch (error) {
      observer.next({ failed: error });
      observer.error(error);
    }
  }).pipe(distinctReplayRefCount());

  source$.subscribe(); // Run this Observable immediately;
  return source$ as Observable<TxStatus>;
}