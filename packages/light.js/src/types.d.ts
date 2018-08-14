// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import { Observable } from 'rxjs';

declare global {
  interface Window {
    parity: any;
  }
}

export type Abi = Array<Object>; // TODO Better type?

// TODO This should be on @parity/api
export type AccountsInfo = {
  name: String;
};

// TODO This should be on @parity/api
export type Address = string;

export type Metadata = {
  calledWithArgs?: {
    [key: string]: any;
  };
  calls?: string[];
  dependsOn?: string[];
  frequency?: Observable<any>[];
  name?: string;
};

export interface FrequencyObservable<T> extends Observable<T> {
  metadata: { name: string };
}

export interface RpcObservable<T> {
  (...args: any[]): Observable<T>;
  metadata?: Metadata; // TODO All RpcObservables should have metadata?
  setFrequency? (frequency: Observable<any>[]): void; // post$, makeContract... don't have setFrequency
}

// TODO This should be on @parity/api
export type Tx = {
  from: Address;
  condition: any; // TODO Which type?
  to: Address;
};

export interface TxStatus {
  confirmed: any; // TODO Receipt from @parity/api
  estimating?: boolean;
  estimated?: any; // BigNumber
  requested?: string;
  signed?: string;
}

export interface WithError<T> {
  error;
}
