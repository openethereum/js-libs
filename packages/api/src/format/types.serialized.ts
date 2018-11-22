// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

import BigNumber from 'bignumber.js';

export interface SerializedAccountInfo {
  [address: string]: { meta?: string; name: string; uuid?: string };
}

export interface SerializedBlock {
  author?: string;
  miner?: string;
  difficulty?: string;
  extraData: string;
  gasLimit?: string;
  gasUsed?: string;
  nonce?: string;
  number?: string;
  totalDifficulty?: string;
  timestamp?: number | string;
}

export type SerializedBlockGap = (string | number)[];

export interface SerializedChainStatus {
  blockGap?: SerializedBlockGap | null;
}

export type SerializedCondition = {
  block?: number;
  time?: number;
};

export interface SerializedHistogram {
  bucketBounds: number[];
  counts: number[];
}

export interface SerializedHwAccountInfo {
  [address: string]: { [key: string]: any };
}

export interface SerializedLog {
  address: string;
  blockNumber: number;
  logIndex: number;
  transactionIndex: number;
}

export interface SerializedPeer {
  caps: string[];
  id: number;
  name: string;
  network: {
    localAddress: string;
    remoteAddress: string;
  };
  protocols: {
    par: {
      difficulty: number;
      head: number;
      version: number;
    };
  };
}

export interface SerializedPeers {
  active: number;
  connected: number;
  max: number;
  peers: SerializedPeer[];
}

export interface SerializedReceipt {
  contractAddress?: string;
  blockNumber: number;
  cumulativeGasUsed: number;
  gasUsed: number;
  transactionIndex: number;
  status: number;
}

export interface SerializedSignerRequest {
  id?: number;
  origin?: {
    [index: string]: string;
  };
  payload?: {
    decrypt?: SerializedSigningPayload;
    sign?: SerializedSigningPayload;
    signTransaction?: SerializedTransaction;
    sendTransaction?: SerializedTransaction;
  };
}

export interface SerializedSigningPayload {
  address?: string;
}

export interface SerializedTrace {
  action?: {
    gas?: number;
    value?: number;
    balance?: number;
    from?: string;
    to?: string;
    address?: string;
    refundAddress?: string;
  };
  result?: {
    address?: string;
    gasUsed?: number;
  };
  traceAddress?: number[];
  subtraces?: number;
  transactionPosition?: number;
  blockNumber?: number;
}

export interface SerializedTraceReplay {
  trace?: SerializedTrace[];
}

export interface SerializedTransaction {
  blockNumber?: number;
  creates?: string;
  extraData?: string;
  to?: string;
  from?: string;
  condition?: SerializedCondition | null;
  gas?: string;
  gasPrice?: string;
  transactionIndex?: number;
  value?: string;
  nonce?: string;
  data?: string;
}

export interface SerializedSyncing {
  currentBlock?: number;
  highestBlock?: number;
  startingBlock?: number;
  warpChunksAmount?: number;
  warpChunksProcessed?: number;
  blockGap?: SerializedBlockGap | null;
}

export type SerializedVaultMeta = string;
