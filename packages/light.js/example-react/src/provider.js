// Copyright 2015-2019 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import Api from '@parity/api';

export const currentProvider = window.web3 && window.web3.currentProvider;
export const localProvider = new Api.Provider.Ws('ws://127.0.0.1:8546');
export const infuraProvider = new Api.Provider.Ws(
  'wss://mainnet.infura.io/_ws'
);

const provider = currentProvider || localProvider;

export default provider;
