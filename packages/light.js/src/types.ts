// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';
import { Observable, OperatorFunction } from 'rxjs';

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

export type Metadata<Source, Out> = {
  calledWithArgs?: {
    [key: string]: any;
  };
  calls?: string[];
  dependsOn?: RpcObservable<any, Source>;
  frequency?: FrequencyObservable<Source>[];
  name?: string;
  pipes?: (...args: any[]) => OperatorFunction<any, any>[];
};

export interface FrequencyObservable<T> extends Observable<T> {
  metadata?: { calls?: string[]; name: string };
}

export interface RpcObservable<Source, Out> {
  (...args: any[]): Observable<Out>;
  metadata?: Metadata<Source, Out>;
  setFrequency?(frequency: Observable<any>[]): void; // post$, makeContract... don't have setFrequency
}

// TODO This should be on @parity/api
export type Tx = {
  from: Address;
  condition: any; // TODO Which type?
  to: Address;
};

export interface TxStatus {
  confirmed?: any; // TODO Receipt from @parity/api
  estimating?: boolean;
  estimated?: BigNumber;
  failed?: Error;
  requested?: string;
  schedule?: any;
  signed?: string;
}
