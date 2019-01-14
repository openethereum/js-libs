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

function getTransactionReceipt (transactionHash: string, api: any) {
  // We poll `eth_getTransactionReceipt` 20 times, until we get a valid receipt
  return asyncRetry(
    async (_, attempt) => {
      debug('@parity/light.js:getTransactionReceipt')(
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
}

/**
 * Post a transaction to the network.
 *
 * Calls, in this order, `eth_estimateGas`, `personal_signTransaction`,
 * `eth_sendRawTransaction` and `eth_getTransactionReceipt` to get the status of
 * the transaction.
 *
 * @param tx - Transaction object
 * @param passphrase - Passphrase of the account
 * @param options? - Options to pass to the {@link RpcObservable}.
 * @return - The status of the transaction.
 */
export function post$ (tx: Tx, passphrase: string, options: PostOptions = {}) {
  const { estimate, provider } = options;
  const api = provider ? createApiFromProvider(provider) : getApi();

  const source$ = Observable.create(async (observer: Observer<TxStatus>) => {
    try {
      if (estimate) {
        observer.next({ estimating: true });
        const gas = await api.eth.estimateGas(tx);
        observer.next({ estimated: gas });
      }

      const signedTransaction = await api.personal.signTransaction(tx, passphrase);
      postRaw$(signedTransaction.raw).subscribe(observer);

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
 * @param rawTx - Raw transaction
 * @param options? - Options to pass to the {@link RpcObservable}.
 * @return - The status of the transaction.
 */
export function postRaw$ (rawTx: string, options: PostOptions = {}) {
  const { provider } = options;
  const api = provider ? createApiFromProvider(provider) : getApi();

  const source$ = Observable.create(async (observer: Observer<TxStatus>) => {
    try {
      const transactionHash = await api.eth.sendRawTransaction(rawTx);
      observer.next({ signed: transactionHash });

      const receipt = await getTransactionReceipt(transactionHash, api);
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
