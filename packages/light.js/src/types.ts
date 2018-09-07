// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import BigNumber from 'bignumber.js';
import { Observable, OperatorFunction, ReplaySubject } from 'rxjs';

declare global {
  interface Window {
    parity: any;
  }
}

// TODO This should be on @parity/api
export type AccountsInfo = {
  name: String;
};

// TODO This should be on @parity/api
export type Address = string;

// TODO This should be on @parity/api
export type ApiValue = any;

export interface Metadata<Source, Out> {
  calledWithArgs?: {
    [key: string]: ReplaySubject<Out>;
  };
  calls?: string[];
  dependsOn?: RpcObservable<any, Source>;
  frequency?: FrequencyObservable<Source>[];
  name?: string;
  pipes?: (...args: any[]) => OperatorFunction<Source, Out>[];
}

export interface FrequencyObservable<T> {
  (): Observable<T>;
  metadata?: { calls?: string[]; name: string };
}

export interface RpcObservable<Source, Out> {
  (...args: any[]): Observable<Out>;
  metadata?: Metadata<Source, Out>;
  setFrequency?(frequency: FrequencyObservable<Source>[]): void; // post$, makeContract... don't have setFrequency
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
