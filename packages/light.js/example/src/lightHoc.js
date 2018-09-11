// Copyright 2015-2018 Parity Technologies (UK) Ltd.
// This file is part of Parity.
//
// SPDX-License-Identifier: MIT

import Api from '@parity/api';

import addHocToLight from './hoc';
import Light from './light.js';

export const currentProvider = window.web3 && window.web3.currentProvider;
export const localProvider = new Api.Provider.Ws('ws://127.0.0.1:8546');

const provider = currentProvider || localProvider;
const light = new Light(localProvider);

export default addHocToLight(light);
