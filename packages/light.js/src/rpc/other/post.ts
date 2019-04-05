// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import * as asyncRetry from 'async-retry';
import * as debug from 'debug';
import { Observable, Observer } from 'rxjs';

import { createApiFromProvider, getApi } from '../../api';
import { distinctReplayRefCountDelay } from '../../utils/operators';
import { RpcObservableOptions, Tx, TxStatus } from '../../types';

interface PostOptions extends RpcObservableOptions {
  estimate?: boolean;
  passphrase: String;
}

function getTransactionByHash (transactionHash: string, api: any) {
  // We poll `eth_getTransactionByHash` 20 times, until we get a valid
  // transaction included in a block.
  return asyncRetry(
    async (_, attempt) => {
      debug('@parity/light.js:getTransactionByHash')(
        `Attempt #${attempt} to eth_getTransactionByHash.`
      );
      const tx = await api.eth.getTransactionByHash(transactionHash);
      if (!tx || !tx.blockNumber || tx.blockNumber.eq(0)) {
        throw new Error('Transaction did not go through');
      }
      return tx;
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
 * `eth_sendRawTransaction` and `eth_getTransactionByHash` to get the status of
 * the transaction.
 *
 * @param tx - Transaction object
 * @param options - Options to pass to the {@link RpcObservable}.
 * @param options.passphrase - Passphrase of the account
 * @return - The status of the transaction: (estimated), signed, sent, confirmed
 */
export function post$ (tx: Tx, options: PostOptions) {
  if (!options || !options.passphrase) {
    throw new Error('The passphrase is missing from the options');
  }

  const { estimate, passphrase, provider } = options;
  const api = provider ? createApiFromProvider(provider) : getApi();

  const source$ = Observable.create(async (observer: Observer<TxStatus>) => {
    try {
      if (estimate) {
        observer.next({ estimating: true });
        const gas = await api.eth.estimateGas(tx);
        observer.next({ estimated: gas });
      }

      const signedTransaction = await api.personal.signTransaction(tx, passphrase);
      observer.next({ signed: signedTransaction.raw });
      postRaw$(signedTransaction.raw).subscribe(observer);

    } catch (error) {
      observer.next({ failed: error });
      observer.error(error);
    }
  });

  return source$;
}

/**
 * Post a raw (signed) transaction to the network.
 *
 * Calls, in this order, `eth_sendRawTransaction` and
 * `eth_getTransactionByHash` to get the status of the transaction.
 *
 * Note: if using parity-ethereum light client, this method only works with
 * >=v2.5.0. See https://github.com/paritytech/parity-ethereum/pull/10559 for
 * more info.
 *
 * @param rawTx - Raw transaction
 * @param options? - Options to pass to the {@link RpcObservable}.
 * @return - The status of the transaction: sent, confirmed
 */
export function postRaw$ (rawTx: string, options: RpcObservableOptions = {}) {
  const { provider } = options;
  const api = provider ? createApiFromProvider(provider) : getApi();

  const source$ = Observable.create(async (observer: Observer<TxStatus>) => {
    try {
      const transactionHash = await api.eth.sendRawTransaction(rawTx);
      observer.next({ sent: transactionHash });

      const receipt = await getTransactionByHash(transactionHash, api);
      observer.next({ confirmed: receipt });

      observer.complete();
    } catch (error) {
      observer.next({ failed: error });
      observer.error(error);
    }
  });

  return source$;
}
